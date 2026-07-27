// IGNITE - Deactivate All Active Vouchers (Browser Console Script)
// ─────────────────────────────────────────────────────────────
// 1. Login at https://admin.roetix.com
// 2. Open DevTools Console (F12) on ANY admin.roetix.com page
// 3. Paste this entire script → Press Enter
// 4. Wait for DONE summary
// ─────────────────────────────────────────────────────────────
//
// Endpoint: PATCH /api/admin/events/:eventId/vouchers/:voucherId/status
// Body:     { "status": "draft" }

const EVENT_ID = '69dc71acbc364e3f89d9d6a9';
const API_BASE = 'https://event.roetix.com';
const BATCH    = 5;

function getToken() {
  const token = localStorage.getItem('competitionAdminToken') || localStorage.getItem('access_token');
  if (!token) {
    console.error('%c✗ No auth token. Please login at admin.roetix.com first.', 'color:red;font-weight:bold');
    return null;
  }
  return token;
}

async function fetchAllVouchers(token) {
  const res = await fetch(`${API_BASE}/api/admin/events/${EVENT_ID}/vouchers`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Fetch failed: HTTP ${res.status}`);
  const data = await res.json();
  return data?.data?.vouchers || [];
}

async function deactivateVoucher(token, v) {
  const res = await fetch(`${API_BASE}/api/admin/events/${EVENT_ID}/vouchers/${v.id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status: 'draft' }),
  });
  let data = {};
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const msg = data?.message || data?.error || JSON.stringify(data) || res.statusText;
    return { success: false, error: `HTTP ${res.status}: ${msg}` };
  }
  return { success: true };
}

async function deactivateAll() {
  console.log('%c══════════════════════════════════════════════════', 'color:#ef4444;font-weight:bold');
  console.log('%c   IGNITE — Deactivate All Active Vouchers       ', 'color:#ef4444;font-weight:bold');
  console.log('%c══════════════════════════════════════════════════', 'color:#ef4444;font-weight:bold');

  const token = getToken();
  if (!token) return;

  // ── Step 1: Fetch all vouchers ─────────────────────────────
  console.log('%c\n⏳ Fetching vouchers...', 'color:#f87171');
  let vouchers;
  try {
    vouchers = await fetchAllVouchers(token);
  } catch (err) {
    console.error(`%c✗ ${err.message}`, 'color:#ef4444');
    return;
  }

  const actives  = vouchers.filter(v => v.status === 'active');
  const drafts   = vouchers.filter(v => v.status !== 'active');
  console.log(`%c   Total      : ${vouchers.length}`, 'color:#f87171');
  console.log(`%c   Active     : ${actives.length}`,  'color:#10b981');
  console.log(`%c   Already off: ${drafts.length}`,    'color:#6b7280');

  if (actives.length === 0) {
    console.log('%c\n✓ All vouchers already inactive — nothing to do!', 'color:#10b981;font-weight:bold');
    return;
  }

  // ── Step 2: Deactivate in batches ───────────────────────────
  console.log(`%c\n🚫 Deactivating ${actives.length} vouchers (${BATCH} at a time)...`, 'color:#f87171;font-weight:bold');

  let successCount = 0;
  let failCount    = 0;

  for (let i = 0; i < actives.length; i += BATCH) {
    const batch   = actives.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(v => deactivateVoucher(token, v)));

    results.forEach((result, j) => {
      const v   = batch[j];
      const num = i + j + 1;
      if (result.success) {
        successCount++;
        console.log(`%c  ✓ [${num}/${actives.length}] ${v.code}`, 'color:#10b981');
      } else {
        failCount++;
        console.error(`%c  ✗ [${num}/${actives.length}] ${v.code} — ${result.error}`, 'color:#ef4444');
        if (result.error.includes('401') || result.error.includes('403')) {
          console.error('%c  ⛔ Auth failed — stopping. Please re-login.', 'color:red;font-weight:bold');
        }
      }
    });

    if (i + BATCH < actives.length) await new Promise(r => setTimeout(r, 200));
  }

  // ── Step 3: Summary ────────────────────────────────────────
  const allOk = failCount === 0;
  console.log('%c\n══════════════════════════════════════════════════', `color:${allOk ? '#10b981' : '#ef4444'};font-weight:bold`);
  console.log(`%c  ✓ Deactivated : ${successCount}`, 'color:#10b981;font-weight:bold');
  console.log(`%c  ✗ Failed      : ${failCount}`,    failCount === 0 ? 'color:#10b981;font-weight:bold' : 'color:#ef4444;font-weight:bold');
  console.log(`%c  Total         : ${actives.length}`, 'color:#f87171;font-weight:bold');
  console.log('%c══════════════════════════════════════════════════', `color:${allOk ? '#10b981' : '#ef4444'};font-weight:bold`);

  if (allOk) {
    console.log('%c\n🎉 All done! Refresh the page to confirm.', 'color:#10b981;font-weight:bold');
  } else {
    console.log('%c\n⚠ Some failed — paste script again to retry.', 'color:#f59e0b;font-weight:bold');
  }
}

deactivateAll();
