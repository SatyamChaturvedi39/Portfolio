import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "satyamchaturvedi39@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `New message from your portfolio:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#111;border-bottom:2px solid #eee;padding-bottom:12px">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#888;width:80px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#888">Subject</td><td style="padding:8px 0">${subject}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f9f9f9;border-radius:8px;white-space:pre-wrap">${message}</div>
          <p style="margin-top:20px;font-size:12px;color:#aaa">Sent via your portfolio contact form. Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
