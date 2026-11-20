import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendToSheet, backupToCsv } from '@/lib/sheets';

// Google Apps Script web app that appends each application (and stores the CV) for the careers sheet.
const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzTdS4p6BIAUSxgUxACa_dYvHLvTj46FGl-faBAditW9-E3CCcAdTsQRHMXy7BFgYvdeA/exec';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, department, message, resumeBase64, resumeFilename, resumeMimeType } = body;

    // Validate required fields
    if (!name || !email || !phone || !department || !message || !resumeBase64 || !resumeFilename) {
      return NextResponse.json(
        { error: 'Required fields or resume file are missing.' },
        { status: 400 }
      );
    }

    // Validate phone number format (optional country code prefix + 10 digits)
    const phoneRegex = /^(\+[0-9]{1,4})?[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Must be a 10-digit number with optional country code.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 1. Google Sheets is the source of truth: if it fails, tell the applicant instead of losing the application.
    try {
      await sendToSheet(GOOGLE_SHEETS_WEBHOOK_URL, {
        timestamp,
        name,
        email,
        phone,
        department,
        message,
        resumeBase64,
        resumeFilename,
        resumeMimeType,
      });
    } catch (err) {
      console.error('Careers form: Google Sheets sync failed:', err);
      return NextResponse.json(
        { error: 'We couldn’t save your application just now. Please try again, or email your CV to developers@sitarahub.com.' },
        { status: 502 }
      );
    }

    // 2. Local copies of the CV and row (best effort; skipped on read-only hosts like Vercel).
    let localPath = '';
    try {
      const resumesDir = path.join(process.cwd(), 'resumes');
      fs.mkdirSync(resumesDir, { recursive: true });
      // Create a safe, unique name on filesystem
      const localFileName = `${Date.now()}_${resumeFilename.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
      const base64Data = resumeBase64.replace(/^data:.*;base64,/, '');
      fs.writeFileSync(path.join(resumesDir, localFileName), Buffer.from(base64Data, 'base64'));
      localPath = `resumes/${localFileName}`;
    } catch (err) {
      console.warn('Local CV backup skipped:', (err as Error).message);
    }
    backupToCsv(
      'careers.csv',
      'Timestamp,Full Name,Email Address,Phone Number,Expected Department,Cover Letter,Resume Filename,Local Resume Path',
      [timestamp, name, email, phone, department, message, resumeFilename, localPath]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error handling careers application:', error);
    return NextResponse.json(
      { error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
