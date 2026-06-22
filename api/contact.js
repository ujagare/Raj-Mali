import { Resend } from "resend";
import { insertSupabaseRow, isSupabaseAdminConfigured } from "./_supabase.js";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "Raj@redmconsulting.com";
const BCC_EMAILS = (process.env.CONTACT_BCC_EMAILS || "")
  .split(",")
  .map((email) => String(email || "").trim())
  .filter(Boolean);
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

function getBody(req) {
  if (!req.body || typeof req.body !== "string") {
    return req.body || {};
  }

  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
}

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
    return res.status(503).json({ error: "Email service is not configured" });
  }

  const body = getBody(req);
  const name = clean(body?.name) || "Website Visitor";
  const email = clean(body?.email);
  const mobile = clean(body?.mobile);
  const message = clean(body?.message);

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required" });
  }

  try {
    if (isSupabaseAdminConfigured) {
      const { error } = await insertSupabaseRow("contact_messages", {
        name,
        email,
        mobile: mobile || null,
        message,
      });

      if (error) {
        console.error("Supabase contact insert error:", error);
      }
    }

    const notificationEmail = await sendEmailWithFallback({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      ...(BCC_EMAILS.length ? { bcc: BCC_EMAILS } : {}),
      replyTo: email,
      subject: `Website enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        mobile ? `Mobile: ${mobile}` : "",
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (notificationEmail?.testModeRecipient) {
      return res.status(200).json({ ok: true, id: notificationEmail?.id });
    }

    try {
      await sendEmailWithFallback({
        from: FROM_EMAIL,
        to: email,
        replyTo: TO_EMAIL,
        subject: "Thank you for reaching out to Raj Mali",
        text: [
          `Hello ${name},`,
          "",
          "Thank you for getting in touch with Raj Mali.",
          "Your message has been received, and we will get back to you soon.",
          "",
          "For reference, here is a copy of your message:",
          "",
          message,
          "",
          "Warm regards,",
          "Raj Mali Website",
        ].join("\n"),
      });
    } catch (error) {
      console.error("Resend contact auto-reply error:", error);
    }

    return res.status(200).json({ ok: true, id: notificationEmail?.id });
  } catch (error) {
    console.error("Resend contact error:", error);
    return res.status(500).json({
      error: error.message || "Unable to send message",
    });
  }
}
