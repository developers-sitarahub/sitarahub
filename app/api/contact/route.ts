import { NextResponse } from 'next/server';
import { sendToSheet, backupToCsv } from '@/lib/sheets';

// Google Apps Script web app that appends each enquiry to the contact sheet.
const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyOVLhULF-hrcWwsA8Gvy3yPv9sU1UapSpBNLRvHUag6HcJXd7A2gtiW1pSpnUbgWlvzg/exec';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, phone, message } = body;

    // Validate required fields
    if (!name || !email || !service || !phone || !message) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Get timestamp in India Standard Time (IST)
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 1. Google Sheets is the source of truth: if it fails, tell the visitor instead of losing the lead.
    try {
      await sendToSheet(GOOGLE_SHEETS_WEBHOOK_URL, {
        timestamp,
        name,
        email,
        company: company || '',
        service,
        phone,
        message,
      });
    } catch (err) {
      console.error('Contact form: Google Sheets sync failed:', err);
      return NextResponse.json(
        { error: 'We couldn’t save your message just now. Please try again, or email developers@sitarahub.com.' },
        { status: 502 }
      );
    }

    // 2. Local CSV copy (best effort; skipped on read-only hosts).
    backupToCsv(
      'projects.csv',
      'Timestamp,Full Name,Email Address,Company Name,Service Required,Phone Number,Project Brief',
      [timestamp, name, email, company || '', service, phone, message]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error handling contact form submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
