// Competition Referral Code Bulk Creator - TEMPLATE
// 1. Login at https://admin.roetix.com first
// 2. Open DevTools Console (F12) on ANY admin.roetix.com page
// 3. Paste this entire script and press Enter
//
// Uses: https://competition.roetix.com/api/v1/events/:slug/referrals
// Auth: Bearer token from localStorage("competitionAdminToken")

const EVENT_SLUG = 'YOUR_EVENT_SLUG';
const API_BASE = 'https://competition.roetix.com';

const REFERRAL_CODES = [
  // { code: 'CODE001', discountType: 'flat', discountValue: 15000, quota: 2 },
  // { code: 'CODE002', discountType: 'flat', discountValue: 15000, quota: 2 },
  // { code: 'PERCENT01', discountType: 'percentage', discountValue: 50, quota: 1 },
];

function getToken() {
  let token = localStorage.getItem('competitionAdminToken');
  if (!token) {
    console.warn('competitionAdminToken not found, trying access_token...');
    token = localStorage.getItem('access_token');
  }
  if (!token) {
    console.error('No auth token found. Please login at admin.roetix.com first.');
    return null;
  }
  return token;
}

function buildPayload(item) {
  return {
    referralName: item.code,
    referralCode: item.code,
    discountType: item.discountType || 'flat',
    discountValue: item.discountValue,
    quota: item.quota,
  };
}

async function createReferralCode(token, item) {
  const response = await fetch(`${API_BASE}/api/v1/events/${EVENT_SLUG}/referrals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(buildPayload(item)),
  });

  let data;
  try { data = await response.json(); } catch { data = {}; }

  if (!response.ok) {
    const errMsg = data.message || data.error || data.msg || JSON.stringify(data) || response.statusText;
    return { success: false, error: `HTTP ${response.status}: ${errMsg}` };
  }

  return { success: true, data };
}

async function createAllReferralCodes() {
  const token = getToken();
  if (!token) {
    console.error('Authentication required');
    console.log('Please login at https://admin.roetix.com first');
    return;
  }

  console.log('=== Referral Code Bulk Creator ===');
  console.log(`Event Slug: ${EVENT_SLUG}`);
  console.log(`Total codes: ${REFERRAL_CODES.length}`);
  console.log('');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < REFERRAL_CODES.length; i++) {
    const item = REFERRAL_CODES[i];
    console.log(`[${i + 1}/${REFERRAL_CODES.length}] Creating: ${item.code} (${item.discountType || 'flat'} ${item.discountValue}, quota ${item.quota})...`);

    const result = await createReferralCode(token, item);

    if (result.success) {
      successCount++;
      console.log(`  Success: ${item.code}`);
    } else {
      failCount++;
      console.error(`  Failed: ${item.code} - ${result.error}`);
    }

    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log('');
  console.log('==========================================');
  console.log('SUMMARY');
  console.log(`Success: ${successCount}`);
  console.log(`Failed:  ${failCount}`);
  console.log(`Total:   ${REFERRAL_CODES.length}`);
  console.log('==========================================');
}

createAllReferralCodes();
