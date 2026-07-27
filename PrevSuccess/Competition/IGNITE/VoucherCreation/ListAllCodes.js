// IGNITE - List All Voucher Codes (Browser Console Script)
// ─────────────────────────────────────────────────────────
// 1. Login at https://admin.roetix.com
// 2. Open DevTools Console (F12) on ANY admin.roetix.com page
// 3. Paste this entire script → Press Enter
// 4. Copy the code list from console output into your spreadsheet
// ─────────────────────────────────────────────────────────

const EVENT_ID = '69dc71acbc364e3f89d9d6a9';
const API_BASE = 'https://event.roetix.com';

async function listCodes() {
  const token = localStorage.getItem('competitionAdminToken') || localStorage.getItem('access_token');
  if (!token) {
    console.error('%c✗ No auth token. Please login at admin.roetix.com first.', 'color:red;font-weight:bold');
    return;
  }

  console.log('%c══════════════════════════════════════════════════', 'color:#6366f1;font-weight:bold');
  console.log('%c   IGNITE — All Voucher Codes (Copy-Paste Ready)  ', 'color:#6366f1;font-weight:bold');
  console.log('%c══════════════════════════════════════════════════', 'color:#6366f1;font-weight:bold');

  const res = await fetch(`${API_BASE}/api/admin/events/${EVENT_ID}/vouchers`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) { console.error(`HTTP ${res.status}`); return; }

  const data     = await res.json();
  const vouchers = data?.data?.vouchers || [];

  const sorted  = [...vouchers].sort((a, b) => a.code.localeCompare(b.code));
  const active  = sorted.filter(v => v.status === 'active');
  const draft   = sorted.filter(v => v.status !== 'active');

  console.log(`%c\n  Total   : ${sorted.length}`, 'color:#a78bfa;font-weight:bold');
  console.log(`%c  Active  : ${active.length}`,  'color:#10b981;font-weight:bold');
  console.log(`%c  Draft   : ${draft.length}`,   draft.length > 0 ? 'color:#f59e0b;font-weight:bold' : 'color:#10b981;font-weight:bold');

  if (draft.length > 0) {
    console.log(`%c\n⚠ ${draft.length} vouchers still DRAFT — run ActivateAllVouchers.js first!`, 'color:#f59e0b;font-weight:bold');
  }

  // ── ONE CODE PER LINE — paste directly into a spreadsheet column ──────────
  console.log('%c\n▼▼▼ COPY FROM HERE ▼▼▼', 'color:#a78bfa;font-weight:bold;font-size:14px');
  console.log(sorted.map(v => v.code).join('\n'));
  console.log('%c▲▲▲ TO HERE ▲▲▲', 'color:#a78bfa;font-weight:bold;font-size:14px');

  console.log(`%c\n  Total codes listed: ${sorted.length}`, 'color:#10b981;font-weight:bold');
  console.log('%c══════════════════════════════════════════════════', 'color:#6366f1;font-weight:bold');
}

listCodes();
