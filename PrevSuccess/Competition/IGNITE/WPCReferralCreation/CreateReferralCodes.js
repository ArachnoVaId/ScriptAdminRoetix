// WPC - Referral Code Bulk Creator
// 1. Login at https://admin.roetix.com first
// 2. Open DevTools Console (F12) on ANY admin.roetix.com page
// 3. Paste this entire script and press Enter
//
// Uses: https://competition.roetix.com/api/v1/events/:slug/referrals
// Auth: Bearer token from localStorage("competitionAdminToken")

const EVENT_SLUG = 'wpc';
const API_BASE = 'https://competition.roetix.com';
const TOTAL_CODES = 50;
const DISCOUNT_VALUE = 29900;
const QUOTA = 1;

function generateCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  let code = '';
  for (let i = 0; i < 3; i++) code += letters[Math.floor(Math.random() * letters.length)];
  for (let i = 0; i < 3; i++) code += digits[Math.floor(Math.random() * digits.length)];
  return code;
}

function generateUniqueCodes(count) {
  const codes = new Set();
  while (codes.size < count) {
    codes.add(generateCode());
  }
  return [...codes];
}

const REFERRAL_CODES = generateUniqueCodes(TOTAL_CODES).map(code => ({
  code,
  discountValue: DISCOUNT_VALUE,
  quota: QUOTA,
}));

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
    discountType: 'flat',
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
    console.log(`[${i + 1}/${REFERRAL_CODES.length}] Creating: ${item.code} (flat ${item.discountValue}, quota ${item.quota})...`);

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
