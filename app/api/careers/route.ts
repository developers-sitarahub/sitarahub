import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ==========================================
// GOOGLE SHEETS CONFIGURATION FOR CAREERS
// Paste your Google Apps Script Web App URL below to sync submissions online:
// Example: 'https://script.google.com/macros/s/AKfycbz.../exec'
// ==========================================
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

    // 1. Save Resume File Locally
    const resumesDir = path.join(process.cwd(), 'resumes');
    if (!fs.existsSync(resumesDir)) {
      fs.mkdirSync(resumesDir, { recursive: true });
    }

    // Create a safe, unique name on filesystem
    const sanitizedFilename = resumeFilename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const localFileName = `${Date.now()}_${sanitizedFilename}`;
    const localFilePath = path.join(resumesDir, localFileName);

    // Convert Base64 back to binary and save
    const base64Data = resumeBase64.replace(/^data:.*;base64,/, '');
    fs.writeFileSync(localFilePath, Buffer.from(base64Data, 'base64'));

    // 2. Write details to careers.csv
    const filePath = path.join(process.cwd(), 'careers.csv');
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const escapeCsv = (val: string) => {
      const escaped = String(val).replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const row = [
      escapeCsv(timestamp),
      escapeCsv(name),
      escapeCsv(email),
      escapeCsv(phone),
      escapeCsv(department),
      escapeCsv(message),
      escapeCsv(resumeFilename),
      escapeCsv(`resumes/${localFileName}`)
    ].join(',');

    let fileExists = false;
    try {
      fs.accessSync(filePath);
      fileExists = true;
    } catch {
      // File does not exist
    }

    if (!fileExists) {
      const headers = 'Timestamp,Full Name,Email Address,Phone Number,Expected Department,Cover Letter,Resume Filename,Local Resume Path\n';
      fs.writeFileSync(filePath, headers + row + '\n', 'utf8');
    } else {
      fs.appendFileSync(filePath, row + '\n', 'utf8');
    }

    // 3. Sync to Google Sheets online if Webhook URL is configured
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp,
            name,
            email,
            phone,
            department,
            message,
            resumeBase64,
            resumeFilename,
            resumeMimeType
          }),
          mode: 'no-cors'
        });
      } catch (err) {
        console.error('Failed to sync to Google Sheets online (Careers):', err);
        // Do not fail request since local backup file and resume were saved successfully
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error handling careers application:', error);
    return NextResponse.json(
      { error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
