import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',  // Change to your verified domain later
        to: process.env.NEXT_PUBLIC_MY_EMAIL!,
        subject: `New message from ${name}`,
    html: `
    <p><strong>Name:</strong> ${name}</p>
     <p><strong>Email:</strong> ${email}</p>
     <p><strong>Message:</strong></p>
     <p>${message}</p>
    `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
