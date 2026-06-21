// Resend HTTP API — replaces nodemailer SMTP (which requires Node.js net/tls).
// Free tier: 3,000 emails/month. Sign up at https://resend.com
// IMPORTANT: The 'from' domain must be verified via DNS in your Resend dashboard.
// Until then you can only send to your own Resend account email (testing only).

export interface ContactEmailData {
  name: string;
  email: string;
  project_type?: string | null;
  budget?: string | null;
  message: string;
}

function buildHtml(data: ContactEmailData): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:#B7CB45;padding:24px 32px;">
        <h1 style="margin:0;color:#000;font-size:22px;font-weight:900;letter-spacing:-0.02em;">New Contact Form Submission</h1>
        <p style="margin:6px 0 0;color:#00000088;font-size:13px;">Pixel Party — pixelpartysrilanka@gmail.com</p>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #ffffff11;color:#B7CB45;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;width:140px;">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #ffffff11;color:#fff;font-size:14px;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #ffffff11;color:#B7CB45;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #ffffff11;font-size:14px;"><a href="mailto:${data.email}" style="color:#B7CB45;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #ffffff11;color:#B7CB45;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Project Type</td>
            <td style="padding:10px 0;border-bottom:1px solid #ffffff11;color:#fff;font-size:14px;">${data.project_type ?? '—'}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #ffffff11;color:#B7CB45;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Budget</td>
            <td style="padding:10px 0;border-bottom:1px solid #ffffff11;color:#fff;font-size:14px;">${data.budget ?? '—'}</td>
          </tr>
          <tr>
            <td style="padding:16px 0 0;color:#B7CB45;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;vertical-align:top;">Message</td>
            <td style="padding:16px 0 0;color:#fff;font-size:14px;line-height:1.65;">${data.message.replace(/\n/g, '<br/>')}</td>
          </tr>
        </table>
      </div>
      <div style="padding:20px 32px;border-top:1px solid #ffffff0d;color:#ffffff33;font-size:11px;">
        Submitted via Pixel Party contact form
      </div>
    </div>
  `;
}

export async function sendContactEmail(
  data: ContactEmailData,
  resendApiKey: string
): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: 'Pixel Party Contact <contact@YOUR_VERIFIED_DOMAIN.com>',
      to: ['pixelpartysrilanka@gmail.com'],
      reply_to: data.email,
      subject: `New Enquiry from ${data.name}${data.project_type ? ` — ${data.project_type}` : ''}`,
      html: buildHtml(data),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend API error ${response.status}: ${body}`);
  }
}
