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
const escapeHtml = (value) =>
  clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
const sleep = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

function buildNewsletterNotificationHtml(email) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>Newsletter subscription request</title>
  </head>
  <body style="margin:0;background:#f5f1ea;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1d2433;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(email)} asked to join the Raj Mali mailing list.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f1ea;padding:32px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#fffaf3;border:1px solid #e6d8c6;border-radius:28px;overflow:hidden;box-shadow:0 24px 70px rgba(29,36,51,0.12);">
            <tr>
              <td style="background:#17213a;padding:34px 34px 28px;">
                <div style="font-size:12px;line-height:18px;letter-spacing:2px;text-transform:uppercase;color:#d9b36f;font-weight:800;">Newsletter</div>
                <h1 style="margin:12px 0 0;font-family:Georgia,Times New Roman,serif;font-size:34px;line-height:40px;color:#fff8ec;font-weight:700;">New subscriber request</h1>
                <p style="margin:14px 0 0;font-size:15px;line-height:24px;color:#dbe2f0;">Someone asked to receive updates from Raj Mali.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 34px 34px;">
                <div style="background:#fff;border:1px solid #efe4d5;border-radius:20px;padding:22px;">
                  <div style="font-size:12px;line-height:18px;letter-spacing:1.6px;text-transform:uppercase;color:#9b7a45;font-weight:800;">Email Address</div>
                  <a href="mailto:${escapeHtml(email)}" style="display:block;margin-top:10px;font-size:20px;line-height:30px;color:#17213a;text-decoration:none;font-weight:800;">${escapeHtml(email)}</a>
                </div>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:26px;">
                  <tr>
                    <td style="border-radius:999px;background:#d9b36f;">
                      <a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:13px 22px;color:#17213a;text-decoration:none;font-weight:800;font-size:14px;">Email subscriber</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#fbf4e8;border-top:1px solid #eadcca;padding:22px 34px;">
                <p style="margin:0;font-size:12px;line-height:20px;color:#7a6d5d;">Sent securely from the Raj Mali website newsletter form.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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
      html: buildNewsletterNotificationHtml(email),
      text: `Please add ${email} to the Raj Mali mailing list.`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend newsletter error:", error);
    return res.status(500).json({ error: "Unable to send subscription request" });
  }
}
