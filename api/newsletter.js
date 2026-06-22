import { Resend } from "resend";
import { isSupabaseAdminConfigured, upsertSupabaseRow } from "./_supabase.js";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "Raj@redmconsulting.com";
const CONFIGURED_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Raj Mali Website <onboarding@resend.dev>";
const FALLBACK_FROM_EMAIL =
  process.env.RESEND_FALLBACK_FROM_EMAIL || "Raj Mali Website <onboarding@resend.dev>";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL_VERIFIED === "true"
    ? CONFIGURED_FROM_EMAIL
    : FALLBACK_FROM_EMAIL;
const TEST_TO_EMAIL =
  process.env.RESEND_TEST_TO_EMAIL || process.env.RESEND_ACCOUNT_EMAIL || "";

const clean = (value) => String(value || "").trim();
const sleep = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

async function sendEmail(payload) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send(payload);

  if (error) {
    const message = error.message || "Resend rejected the email request";
    throw new Error(message);
  }

  return data;
}

async function sendEmailWithFallback(payload) {
  let retryPayload = payload;
  let testModeRecipient = null;

  try {
    return await sendEmail(retryPayload);
  } catch (error) {
    const message = error.message || "";

    if (
      retryPayload.from !== FALLBACK_FROM_EMAIL &&
      message.toLowerCase().includes("domain is not verified")
    ) {
      console.warn("Primary sender domain is not verified. Retrying with fallback sender.");
      retryPayload = { ...retryPayload, from: FALLBACK_FROM_EMAIL };
    } else {
      const testingRecipient =
        TEST_TO_EMAIL || message.match(/own email address \(([^)]+)\)/i)?.[1];

      if (
        testingRecipient &&
        retryPayload.to !== testingRecipient &&
        message.toLowerCase().includes("only send testing emails")
      ) {
        console.warn("Resend account is in testing mode. Retrying with verified test recipient.");
        await sleep(700);
        testModeRecipient = testingRecipient;
        retryPayload = {
          ...retryPayload,
          to: testingRecipient,
          subject: `[Forward to ${retryPayload.to}] ${retryPayload.subject}`,
        };
      } else {
        throw error;
      }
    }
  }

  try {
    const data = await sendEmail(retryPayload);
    return testModeRecipient ? { ...data, testModeRecipient } : data;
  } catch (error) {
    const message = error.message || "";
    if (
      retryPayload.from !== FALLBACK_FROM_EMAIL &&
      message.toLowerCase().includes("domain is not verified")
    ) {
      console.warn("Primary sender domain is not verified. Retrying with fallback sender.");
      await sleep(700);
      return sendEmail({ ...retryPayload, from: FALLBACK_FROM_EMAIL });
    }

    const testingRecipient =
      TEST_TO_EMAIL || message.match(/own email address \(([^)]+)\)/i)?.[1];

    if (
      testingRecipient &&
      retryPayload.to !== testingRecipient &&
      message.toLowerCase().includes("only send testing emails")
    ) {
      console.warn("Resend account is in testing mode. Retrying with verified test recipient.");
      await sleep(700);
      const data = await sendEmail({
        ...retryPayload,
        to: testingRecipient,
        subject: `[Forward to ${retryPayload.to}] ${retryPayload.subject}`,
      });

      return { ...data, testModeRecipient: testingRecipient };
    }

    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Resend is not configured" });
  }

  const email = clean(req.body?.email);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    if (isSupabaseAdminConfigured) {
      const { error } = await upsertSupabaseRow(
        "newsletter_subscribers",
        { email },
        "email",
      );

      if (error) {
        console.error("Supabase newsletter upsert error:", error);
      }
    }

    await sendEmailWithFallback({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: "Newsletter subscription request",
      text: `Please add ${email} to the Raj Mali mailing list.`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend newsletter error:", error);
    return res.status(500).json({ error: "Unable to send subscription request" });
  }
}
