import fs from 'fs';
import path from 'path';

/**
 * Post a submission to a Google Apps Script web app and confirm it was written.
 * The script replies {"result":"success"}; anything else (error page, quota, renamed sheet) is a failure.
 */
export async function sendToSheet(url: string, payload: Record<string, unknown>): Promise<void> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let result: unknown;
  try {
    result = JSON.parse(text)?.result;
  } catch {
    // Apps Script error pages are HTML, not JSON.
  }
  if (!res.ok || result !== 'success') {
    throw new Error(`Google Sheets rejected the submission (HTTP ${res.status}): ${text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').slice(0, 200)}`);
  }
}

/** Best-effort local CSV backup. Never throws: hosts like Vercel have a read-only filesystem. */
export function backupToCsv(file: string, headers: string, values: string[]): void {
  try {
    const filePath = path.join(process.cwd(), file);
    const row = values.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',') + '\n';
    if (fs.existsSync(filePath)) fs.appendFileSync(filePath, row, 'utf8');
    else fs.writeFileSync(filePath, headers + '\n' + row, 'utf8');
  } catch (err) {
    console.warn(`Local backup to ${file} skipped:`, (err as Error).message);
  }
}
