interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request): Promise<Response> {
  let body: ContactPayload = {};
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: 'Invalid JSON request body.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !subject || !message) {
    return Response.json(
      { error: 'Please complete your name, email address, subject, and message.' },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || 'rgksrt10@gmail.com';
  const resendApiKey = process.env.RESEND_API_KEY?.trim();

  if (resendApiKey) {
    try {
      const fromEmail =
        process.env.CONTACT_FROM_EMAIL || 'Portfolio Inquiry <onboarding@resend.dev>';
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipient],
          reply_to: email,
          subject: `[Portfolio Contact] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        }),
      });

      if (!response.ok) {
        return Response.json(
          { error: 'Email relay failed to deliver your message. Please use direct email instead.' },
          { status: 502 }
        );
      }

      return Response.json({ delivered: true, configured: true, recipient }, { status: 200 });
    } catch {
      return Response.json(
        { error: 'Unable to reach the email relay service. Please email directly.' },
        { status: 502 }
      );
    }
  }

  const mailtoSubject = encodeURIComponent(subject);
  const mailtoBody = encodeURIComponent(
    `Hello Gokula Kannan,\n\n${message}\n\nBest regards,\n${name}\n(${email})`
  );
  const mailtoUrl = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return Response.json(
    {
      delivered: false,
      configured: false,
      recipient,
      mailtoUrl,
    },
    { status: 200 }
  );
}
