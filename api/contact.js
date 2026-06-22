import { Resend } from "resend";
import { isSupabaseAdminConfigured, supabaseAdmin } from "./_supabase.js";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "Raj@redmconsulting.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Raj Mali Website <onboarding@resend.dev>";

const clean = (value) => String(value || "").trim();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Resend is not configured" });
  }

  const name = clean(req.body?.name) || "Website Visitor";
  const email = clean(req.body?.email);
  const mobile = clean(req.body?.mobile);
  const message = clean(req.body?.message);

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required" });
  }

  try {
    if (isSupabaseAdminConfigured) {
      const { error } = await supabaseAdmin.from("contact_messages").insert({
        name,
        email,
        mobile: mobile || null,
        message,
      });

      if (error) {
        console.error("Supabase contact insert error:", error);
      }
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
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

    await resend.emails.send({
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

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend contact error:", error);
    return res.status(500).json({ error: "Unable to send message" });
  }
}
