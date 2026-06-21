import { Resend } from "resend";
import { isSupabaseAdminConfigured, supabaseAdmin } from "./_supabase.js";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@rajmali.com";
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

  const email = clean(req.body?.email);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    if (isSupabaseAdminConfigured) {
      const { error } = await supabaseAdmin
        .from("newsletter_subscribers")
        .upsert({ email }, { onConflict: "email" });

      if (error) {
        console.error("Supabase newsletter upsert error:", error);
      }
    }

    await resend.emails.send({
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
