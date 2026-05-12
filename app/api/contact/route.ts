import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

interface ContactPayload {
  name: string;
  phone: string;
  service: string;
  about: string;
  locale?: string;
}

function isNonEmpty(value: unknown, max = 1000): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const phone = (body.phone ?? '').trim();
  const service = (body.service ?? '').trim();
  const about = (body.about ?? '').trim();
  const locale = (body.locale ?? 'az').toString().slice(0, 5);

  if (!isNonEmpty(name, 200) || !isNonEmpty(phone, 50)) {
    return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }
  if (about.length > 4000 || service.length > 200) {
    return NextResponse.json({ ok: false, error: 'too_long' }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO ?? user;

  if (!user || !pass || !to) {
    return NextResponse.json({ ok: false, error: 'server_not_configured' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const subject = `Yeni sorğu — ${name}`;
  const text = [
    `Ad: ${name}`,
    `Telefon: ${phone}`,
    `Xidmət: ${service || '—'}`,
    `Dil: ${locale}`,
    '',
    'Layihə haqqında:',
    about || '—',
  ].join('\n');

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.55">
      <h2 style="margin:0 0 16px;font-size:18px">Yeni sorğu — ideainshaat.az</h2>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 12px 6px 0;color:#666">Ad</td><td><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666">Telefon</td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666">Xidmət</td><td>${escapeHtml(service || '—')}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666">Dil</td><td>${escapeHtml(locale)}</td></tr>
      </table>
      <div style="margin-top:18px">
        <div style="color:#666;font-size:13px;margin-bottom:6px">Layihə haqqında</div>
        <div style="white-space:pre-wrap;padding:12px;background:#f6f4ef;border-radius:8px">${escapeHtml(about || '—')}</div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"İdea İnşaat sayt" <${user}>`,
      to,
      replyTo: `${name} <${user}>`,
      subject,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'send_failed';
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
