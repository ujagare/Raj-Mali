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
const escapeHtml = (value) =>
  clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
const formatMessageHtml = (value) => escapeHtml(value).replace(/\n/g, "<br />");
const sleep = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

function buildEmailShell({ eyebrow, title, preview, children, footer }) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:#f5f1ea;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1d2433;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f1ea;padding:32px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#fffaf3;border:1px solid #e6d8c6;border-radius:28px;overflow:hidden;box-shadow:0 24px 70px rgba(29,36,51,0.12);">
            <tr>
              <td style="background:#17213a;padding:34px 34px 28px;">
                <div style="font-size:12px;line-height:18px;letter-spacing:2px;text-transform:uppercase;color:#d9b36f;font-weight:800;">${escapeHtml(eyebrow)}</div>
                <h1 style="margin:12px 0 0;font-family:Georgia,Times New Roman,serif;font-size:34px;line-height:40px;color:#fff8ec;font-weight:700;">${escapeHtml(title)}</h1>
                <p style="margin:14px 0 0;font-size:15px;line-height:24px;color:#dbe2f0;">${escapeHtml(preview)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 34px 34px;">
                ${children}
              </td>
            </tr>
            <tr>
              <td style="background:#fbf4e8;border-top:1px solid #eadcca;padding:22px 34px;">
                <p style="margin:0;font-size:12px;line-height:20px;color:#7a6d5d;">${escapeHtml(footer)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildContactNotificationHtml({ name, email, mobile, message }) {
  const detailRow = (label, value) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #efe4d5;width:120px;font-size:12px;line-height:18px;letter-spacing:1px;text-transform:uppercase;color:#9b7a45;font-weight:800;vertical-align:top;">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #efe4d5;font-size:15px;line-height:23px;color:#1d2433;font-weight:700;">${value}</td>
    </tr>`;

  return buildEmailShell({
    eyebrow: "New Website Enquiry",
    title: "A new conversation is waiting",
    preview: `${name} sent a message from rajmali.com.`,
    footer: "Sent securely from the Raj Mali website contact form.",
    children: `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;background:#fff;border:1px solid #efe4d5;border-radius:20px;padding:8px 22px;">
        ${detailRow("Name", escapeHtml(name))}
        ${detailRow("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#17213a;text-decoration:none;">${escapeHtml(email)}</a>`)}
        ${mobile ? detailRow("Mobile", `<a href="tel:${escapeHtml(mobile)}" style="color:#17213a;text-decoration:none;">${escapeHtml(mobile)}</a>`) : ""}
      </table>
      <div style="background:#17213a;border-radius:22px;padding:24px;">
        <div style="font-size:12px;line-height:18px;letter-spacing:1.6px;text-transform:uppercase;color:#d9b36f;font-weight:800;">Message</div>
        <div style="margin-top:12px;font-size:17px;line-height:29px;color:#fff8ec;">${formatMessageHtml(message)}</div>
      </div>
      <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:26px;">
        <tr>
          <td style="border-radius:999px;background:#d9b36f;">
            <a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:13px 22px;color:#17213a;text-decoration:none;font-weight:800;font-size:14px;">Reply to ${escapeHtml(name)}</a>
          </td>
        </tr>
      </table>`,
  });
}

function buildContactAutoReplyHtml({ name, message }) {
  return buildEmailShell({
    eyebrow: "Raj Mali",
    title: "Thank you for reaching out",
    preview: "Your message has been received. Raj will get back to you soon.",
    footer: "This is an automatic confirmation from rajmali.com. You can reply to this email to continue the conversation.",
    children: `
      <p style="margin:0 0 16px;font-size:17px;line-height:28px;color:#1d2433;">Hello ${escapeHtml(name)},</p>
      <p style="margin:0 0 22px;font-size:16px;line-height:27px;color:#40506b;">Thank you for getting in touch with Raj Mali. Your message has reached the right inbox, and we will get back to you soon.</p>
      <div style="background:#fff;border:1px solid #efe4d5;border-radius:20px;padding:22px;">
        <div style="font-size:12px;line-height:18px;letter-spacing:1.6px;text-transform:uppercase;color:#9b7a45;font-weight:800;">Your Message</div>
        <div style="margin-top:12px;font-size:15px;line-height:26px;color:#1d2433;">${formatMessageHtml(message)}</div>
      </div>
      <p style="margin:24px 0 0;font-size:16px;line-height:27px;color:#40506b;">Warm regards,<br /><strong style="color:#17213a;">Raj Mali Website</strong></p>`,
  });
}

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
      html: buildContactNotificationHtml({ name, email, mobile, message }),
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
        html: buildContactAutoReplyHtml({ name, message }),
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
