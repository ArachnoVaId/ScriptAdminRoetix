// GMBCC Team National - Create Early Bird Phase & Add 44 Fields
// 1. Navigate to https://admin.roetix.com/events/1teamnational/timeline
// 2. Click "Add Phase" button
// 3. Paste this script in browser console
// 4. Script fills phase details + adds 44 fields
// 5. Click "Save Timeline" to save

var FIELDS = [
  { key: 'TeamName_EB', label: 'Team Name', type: 'text', required: true },
  { key: 'FullName_EB', label: 'Full Name', type: 'text', required: true },
  { key: 'Nationality_EB', label: 'Nationality', type: 'text', required: true },
  { key: 'University_EB', label: 'University', type: 'text', required: true },
  { key: 'Faculty_EB', label: 'Faculty', type: 'text', required: true },
  { key: 'Major_EB', label: 'Major', type: 'text', required: true },
  { key: 'Domicile_EB', label: 'Domicile', type: 'text', required: true },
  { key: 'PhoneNumber_EB', label: 'Phone Number', type: 'phone', required: true },
  { key: 'Email_EB', label: 'Email', type: 'email', required: true },
  { key: 'Linkedin_EB', label: 'Linkedin', type: 'text', required: false },
  { key: 'CV_EB', label: 'CV', type: 'file', required: true },
  { key: 'LinkTwibbon_EB', label: 'Link Twibbon', type: 'link', required: true },
  { key: 'FotoKTM_EB', label: 'Foto KTM', type: 'file', required: true },
  { key: 'FullNameAnggota1_EB', label: 'Full Name', type: 'text', required: true },
  { key: 'NationalityAnggota1_EB', label: 'Nationality', type: 'text', required: true },
  { key: 'UniversityAnggota1_EB', label: 'University', type: 'text', required: true },
  { key: 'FacultyAnggota1_EB', label: 'Faculty', type: 'text', required: true },
  { key: 'MajorAnggota1_EB', label: 'Major', type: 'text', required: true },
  { key: 'DomicileAnggota1_EB', label: 'Domicile', type: 'text', required: true },
  { key: 'PhoneNumberAnggota1_EB', label: 'Phone Number', type: 'phone', required: true },
  { key: 'EmailAnggota1_EB', label: 'Email', type: 'email', required: true },
  { key: 'LinkedinAnggota1_EB', label: 'Linkedin', type: 'text', required: false },
  { key: 'CVAnggota1_EB', label: 'CV', type: 'file', required: true },
  { key: 'LinkTwibbonAnggota1_EB', label: 'Link Twibbon', type: 'link', required: true },
  { key: 'FotoKTMAnggota1_EB', label: 'Foto KTM', type: 'file', required: true },
  { key: 'FullNameAnggota2_EB', label: 'Full Name', type: 'text', required: true },
  { key: 'NationalityAnggota2_EB', label: 'Nationality', type: 'text', required: true },
  { key: 'UniversityAnggota2_EB', label: 'University', type: 'text', required: true },
  { key: 'FacultyAnggota2_EB', label: 'Faculty', type: 'text', required: true },
  { key: 'MajorAnggota2_EB', label: 'Major', type: 'text', required: true },
  { key: 'DomicileAnggota2_EB', label: 'Domicile', type: 'text', required: true },
  { key: 'PhoneNumberAnggota2_EB', label: 'Phone Number', type: 'phone', required: true },
  { key: 'EmailAnggota2_EB', label: 'Email', type: 'email', required: true },
  { key: 'LinkedinAnggota2_EB', label: 'Linkedin', type: 'text', required: false },
  { key: 'CVAnggota2_EB', label: 'CV', type: 'file', required: true },
  { key: 'LinkTwibbonAnggota2_EB', label: 'Link Twibbon', type: 'link', required: true },
  { key: 'FotoKTMAnggota2_EB', label: 'Foto KTM', type: 'file', required: true },
  { key: 'ProofKTM_EB', label: 'Proof of Active Students Card', type: 'file', required: true },
  { key: 'ProofFollowing_EB', label: 'Proof Following @gmbcc_ugm', type: 'file', required: true },
  { key: 'ProofTwibbonUpload_EB', label: 'Proof Twibbon Upload', type: 'link', required: true },
  { key: 'ProofPosterRepost_EB', label: 'Proof Poster Repost', type: 'link', required: true },
  { key: 'ProofTag_EB', label: 'Proof tag 3 friends on poster comment section', type: 'link', required: true },
  { key: 'InfoGMBCCFrom_EB', label: 'How do you know about GMBCC?', type: 'multiple_choice', required: true },
  { key: 'InfoAffiliatedOrganizations_EB', label: 'Are you involved in any organizations related to business case competitions or consulting?', type: 'text', required: false }
];

var setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

function sleep(ms) {
  return new Promise(function(r) { setTimeout(r, ms); });
}

function fill(el, val) {
  if (!el) return console.warn('⚠ NOT FOUND');
  el.focus();
  if (setter) setter.call(el, val);
  else el.value = val;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

function byName(n) {
  return document.querySelector('[name="' + n + '"]');
}

(function run() {
  console.log('%c═══ GMBCC Team National - Create Early Bird + 44 Fields ═══', 'color:#6366f1;font-weight:bold');

  // Step 1: Fill phase details
  console.log('%c=== Step 1: Fill Phase Details ===', 'color:#6366f1;font-weight:bold');

  fill(byName('timelines.0.name'), 'Early Bird');
  console.log('✓ Phase Name → Early Bird');

  fill(byName('timelines.0.startDate'), '2026-04-18');
  console.log('✓ Start Date → 2026-04-18');

  fill(byName('timelines.0.endDate'), '2026-04-30');
  console.log('✓ End Date → 2026-04-30');

  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  console.log('Checkboxes found:', checkboxes.length);

  if (checkboxes.length >= 1) {
    var gate = checkboxes[0];
    if (gate.checked) {
      gate.click();
      console.log('✓ Registration Gate → OFF');
    }
  }

  if (checkboxes.length >= 2) {
    var payment = checkboxes[1];
    if (!payment.checked) {
      payment.click();
      console.log('✓ Requires Payment → ON');
    }
  }

  // Step 2: Add fields
  console.log('%c=== Step 2: Add ' + FIELDS.length + ' Fields ===', 'color:#6366f1;font-weight:bold');

  var addFieldBtns = [...document.querySelectorAll('button')].filter(function(b) {
    return b.textContent?.trim() === 'Add Field';
  });
  console.log('Add Field buttons found:', addFieldBtns.length);

  if (addFieldBtns.length === 0) {
    console.error('Add Field button not found');
    return;
  }

  var addFieldBtn = addFieldBtns[0];

  (async function addAllFields() {
    for (var i = 0; i < FIELDS.length; i++) {
      addFieldBtn.click();
      await sleep(800);

      var field = FIELDS[i];
      var prefix = 'timelines.0.fields.' + i;

      var keyInput = byName(prefix + '.name');
      if (keyInput) {
        fill(keyInput, field.key);
        console.log('✓ ' + (i + 1) + '/' + FIELDS.length + ' Key: ' + field.key);
      } else {
        console.warn('⚠ ' + (i + 1) + ' Key input not found: ' + prefix + '.name');
      }
      await sleep(200);

      var typeSelect = byName(prefix + '.type');
      if (typeSelect) {
        typeSelect.value = field.type;
        typeSelect.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('  → Type: ' + field.type);
      }
      await sleep(200);

      var labelInput = byName(prefix + '.label');
      if (labelInput) {
        fill(labelInput, field.label);
        console.log('  → Label: ' + field.label);
      }
      await sleep(200);
    }

    console.log('%c═══ All ' + FIELDS.length + ' fields added! Click "Save Timeline" ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
  })();
})();
