import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ==========================================
// GOOGLE SHEETS CONFIGURATION
// Paste your Google Apps Script Web App URL below to sync submissions online:
// Example: 'https://script.google.com/macros/s/AKfycbz.../exec'
// ==========================================
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

    const filePath = path.join(process.cwd(), 'projects.csv');

    // Get timestamp in India Standard Time (IST)
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Helper to escape values for CSV compatibility in Excel
    const escapeCsv = (val: string) => {
      const escaped = String(val).replace(/"/g, '""');
      return `"${escaped}"`;
    };

    const row = [
      escapeCsv(timestamp),
      escapeCsv(name),
      escapeCsv(email),
      escapeCsv(company || ''),
      escapeCsv(service),
      escapeCsv(phone),
      escapeCsv(message)
    ].join(',');

    // 1. Save locally to CSV (Backup)
    let fileExists = false;
    try {
      fs.accessSync(filePath);
      fileExists = true;
    } catch {
      // File does not exist
    }

    if (!fileExists) {
      const headers = 'Timestamp,Full Name,Email Address,Company Name,Service Required,Phone Number,Project Brief\n';
      fs.writeFileSync(filePath, headers + row + '\n', 'utf8');
    } else {
      fs.appendFileSync(filePath, row + '\n', 'utf8');
    }

    // 2. Sync to Google Sheets online if URL is configured
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp,
            name,
            email,
            company: company || '',
            service,
            phone,
            message
          }),
          mode: 'no-cors' // Prevent CORS preflight issues
        });
      } catch (err) {
        console.error('Failed to sync to Google Sheets online:', err);
        // We do not fail the request if Google Sheets is down, since local backup succeeded
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error handling contact form submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
