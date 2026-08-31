// IMOTION Pre-Event: PROLUTION - Registration Phase & Add 16 Fields
// 1. Navigate to the PROLUTION timeline page
// 2. Click "Add Phase" button FIRST
// 3. Wait for the new phase form to appear
// 4. Paste this script in browser console
// 5. Script fills phase details + adds 16 fields (12 in Section 1, 2 in Section 2, 2 in Section 3)
// 6. Click "Save Timeline" to save
//
// NOTE: startDate/endDate below use the datetime-local format (YYYY-MM-DDTHH:mm) required by
// the dashboard. Times default to 00:00 (start) / 23:59 (end) — edit if the real cutoff differs.
// NOTE: The "SUBMISSION CONFIRMATION" thank-you text itself is still NOT a registration field and
// still has no known dashboard field/engine, so it stays excluded.
// NOTE: This form is individual (not team-based), so keys have no Leader/Member prefix.
// NOTE (2026-08-10 revision): AttendanceOffline_prolution / AttendanceOnline_prolution moved from
// Section 2 -> Section 3, with Label/Keterangan updated to match the live dashboard (Label now
// carries the WhatsApp link, Keterangan now carries date/time/venue instead of the link).
// competitioninfo1 / competitioninfo2 added to Section 2 (promo questions for the Marketing Plan /
// Mini Marketing Case competition), matching fields already added manually on the dashboard.
// Batch_prolution / NPM_prolution added to Section 1, positioned right before ProofIGFollow_prolution.
// NOTE: "number only" for NPM has no dedicated `type` in this engine's schema (valid types are text,
// phone, email, link, file, multiple_choice, text_area — see 2.TabledtoJsCompetition.md), so NPM uses
// `type: 'text'` like other numeric-looking short-answer fields (e.g. Batch/Major fields elsewhere).
// NPM is intentionally `required: false` per spec (optional, only needed for KUM/UI students).
// NOTE: The dashboard also has an "Admin Column Key" field (competitioninfo1/competitioninfo2 have
// it set to their own key) and an "Allow other (free text)" checkbox — there is no known/confirmed
// selector for either in this codebase yet, so BOTH are NOT automated here. Fill them manually after
// running this script, or provide their `name` attribute so they can be added to the engine.
// NOTE: "Required" checked=true is ASSUMED for competitioninfo1/2 and AttendanceOffline/Online below
// (matches the rest of this form) — the pasted dashboard text didn't show checkbox checked-state, so
// verify manually.

var FIELDS = [
  { key: 'Email_prolution', label: 'Email Address', type: 'email', required: true,
    notes: 'Please enter your active email address.' },
  { key: 'FullName_prolution', label: 'Full Name', type: 'text', required: true,
    notes: 'Please enter your full name. Example: Andi Pratama' },
  { key: 'CurrentStatus_prolution', label: 'Current Status', type: 'multiple_choice', required: true,
    options: ['Undergraduate Student', 'High School Student', 'Fresh Graduate', 'Employee', 'General Public', 'Other'] },
  { key: 'Institution_prolution', label: 'Institution', type: 'text', required: true,
    notes: 'Please enter the name of your university, school, company, or institution. Example: Universitas Indonesia' },
  { key: 'WhatsAppNumber_prolution', label: 'WhatsApp Number', type: 'phone', required: true,
    notes: 'Please enter your active WhatsApp number to receive further information regarding PROLUTION. Example: 081234567890' },
  { key: 'Batch_prolution', label: 'Batch', type: 'multiple_choice', required: true,
    notes: 'For UI students only',
    options: ['2026', '2025', '2024 and earlier', 'Non UI students'] },
  { key: 'NPM_prolution', label: 'NPM', type: 'text', required: false,
    notes: 'Write your NPM to receive KUM. Example: 2606586433' },
  { key: 'ProofIGFollow_prolution', label: 'Proof of Following @imotionfebui on Instagram', type: 'file', required: true,
    notes: 'Please upload a screenshot showing that you have followed @imotionfebui on Instagram.' },
  { key: 'ProofTikTokFollow_prolution', label: 'Proof of Following @imotionfebui on TikTok', type: 'file', required: true,
    notes: 'Please upload a screenshot showing that you have followed @imotionfebui on TikTok.' },
  { key: 'ProofXFollow_prolution', label: 'Proof of Following @imotion_febui on X', type: 'file', required: true,
    notes: 'Please upload a screenshot showing that you have followed @imotion_febui on X.' },
  { key: 'ProofPosterIGStory_prolution', label: 'Proof of Uploading the PROLUTION Poster on Instagram Story', type: 'file', required: true,
    notes: 'Please upload the PROLUTION poster to your Instagram Story and tag @imotionfebui. Then, upload a screenshot as proof. Poster Access: [Insert Poster Link]' },
  { key: 'InterestMarketingCompetition_prolution', label: 'Are You Interested in Joining The 20th IMOTION Marketing Competition?', type: 'multiple_choice', required: true,
    notes: 'This competition is open to undergraduate students.',
    options: ['Yes, I am interested', 'Maybe, I would like to learn more', 'No, thank you'] },
  // Section 2: Marketing Plan / Mini Marketing Case competition promo (adminColumnKey NOT automated — see NOTE above)
  { key: 'competitioninfo1', label: '📢 Calling All Marketing Enthusiasts! Registration for The 20th IMOTION Marketing Plan and Mini Marketing Case Competition is now open! Turn your brightest ideas into impactful marketing solutions and compete with university students from across Indonesia.', type: 'multiple_choice', required: true,
    notes: 'Competition Booklet: https://linktr.ee/imotioncompetition',
    options: ['Yes, I\'m interested', 'No, i\'m not intersted'] },
  { key: 'competitioninfo2', label: 'Register Your Team: https://linktr.ee/imotioncompetition', type: 'multiple_choice', required: true,
    options: ['Yes, i\'m goitng to register', 'no, maybe next time'] },
  // Section 3: Attendance Confirmation (WhatsApp Group)
  { key: 'AttendanceOffline_prolution', label: 'For offline participants, please join our WhatsApp group to stay updated and connected: https://chat.whatsapp.com/Hh5oy5k2j6TC4yG6qbkupS?s=cl&p=i&mlu=4', type: 'multiple_choice', required: true,
    notes: '🗓️ Date: Tuesday, August 18, 2026 ⏱️ Time: 13:00-17:00 WIB 🏢 Venue: Soeria Atmadja Auditorium, FEB Universitas Indonesia (Offline)',
    options: ['Yes, I\'m gonna attend offline', 'No, I\'m gonna attend online'] },
  { key: 'AttendanceOnline_prolution', label: 'For online participants, please join the WhatsApp group through this link: https://chat.whatsapp.com/Eg9W60pSf25AXi6hbaKy6q?s=cl&p=i&mlu=4', type: 'multiple_choice', required: true,
    notes: '🗓️ Date: Tuesday, August 18, 2026 ⏱️ Time: 13:00-17:00 WIB 🏢 Venue: Soeria Atmadja Auditorium, 💻 Online: via YouTube Streaming',
    options: ['Yes, I\'m gonna attend online', 'No, I\'m gonna attend offline'] }
];

var SECTION_MAP = [
  1,1,1,1,1,1,1,1,1,1,1,1,   // Section 1: Participant Information (12 fields — added Batch, NPM before ProofIGFollow)
  2,2,                       // Section 2: Competition promo (competitioninfo1, competitioninfo2)
  3,3                        // Section 3: Attendance Confirmation (2 fields)
];

var PHASE_INDEX = Array.from(document.querySelectorAll('[name^="timelines."]'))
  .map(function(el) { return parseInt(el.name.split('.')[1]); })
  .filter(function(n) { return !isNaN(n); });
PHASE_INDEX = PHASE_INDEX.length > 0 ? Math.max.apply(null, PHASE_INDEX) : 0;

var _desc = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
var setter = _desc && _desc.set;

function sleep(ms) {
  return new Promise(function(r) { setTimeout(r, ms); });
}

function fill(el, val) {
  if (!el) return console.warn('NOT FOUND');
  el.focus();
  if (setter) setter.call(el, val);
  else el.value = val;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

function byName(n) {
  return document.querySelector('[name="' + n + '"]');
}

function getFieldContainer(prefix) {
  var keyInput = byName(prefix + '.name');
  if (!keyInput) return null;
  var el = keyInput;
  for (var d = 0; d < 20; d++) {
    if (!el.parentElement) break;
    el = el.parentElement;
    if (el.querySelector('[name="' + prefix + '.section"]')) return el;
  }
  return keyInput.closest('.space-y-2') || keyInput.parentElement;
}

function addChoices(fieldContainer, choices) {
  var choiceInput = fieldContainer.querySelector('input[placeholder="Add choice…"]');
  var addBtn = choiceInput ? choiceInput.nextElementSibling : null;
  if (!choiceInput || !addBtn) {
    console.warn('  Choices input or + button not found');
    return;
  }
  choices.forEach(function(c) {
    fill(choiceInput, c);
    addBtn.click();
    console.log('  Choice added: ' + c);
  });
}

(function run() {
  console.log('%c═══ PROLUTION - Registration Phase + ' + FIELDS.length + ' Fields ═══', 'color:#6366f1;font-weight:bold');
  console.log('Phase index: ' + PHASE_INDEX);

  fill(byName('timelines.' + PHASE_INDEX + '.name'), 'PROLUTION Registration');
  fill(byName('timelines.' + PHASE_INDEX + '.startDate'), '2026-08-10T00:00');
  fill(byName('timelines.' + PHASE_INDEX + '.endDate'), '2026-08-18T23:59');

  var allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  var phaseCheckboxes = [];
  var phaseSection = byName('timelines.' + PHASE_INDEX + '.name');

  if (phaseSection) {
    var parent = phaseSection.closest('[class*="phase"], [class*="timeline"], fieldset, section, div');
    if (parent) {
      parent.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
        phaseCheckboxes.push(cb);
      });
    }
  }

  if (phaseCheckboxes.length === 0) {
    var offset = PHASE_INDEX * 2;
    if (allCheckboxes.length > offset) phaseCheckboxes.push(allCheckboxes[offset]);
    if (allCheckboxes.length > offset + 1) phaseCheckboxes.push(allCheckboxes[offset + 1]);
  }

  if (phaseCheckboxes.length >= 1 && !phaseCheckboxes[0].checked) {
    phaseCheckboxes[0].click();
    console.log('Registration Gate -> ON');
  }
  if (phaseCheckboxes.length >= 2 && phaseCheckboxes[1].checked) {
    phaseCheckboxes[1].click();
    console.log('Requires Payment -> OFF');
  }

  var addFieldBtns = [].filter.call(document.querySelectorAll('button'), function(b) {
    return b.textContent && b.textContent.trim() === 'Add Field';
  });
  console.log('Add Field buttons found:', addFieldBtns.length);

  if (addFieldBtns.length === 0) {
    console.error('Add Field button not found');
    return;
  }

  var addFieldBtn = addFieldBtns[addFieldBtns.length - 1];

  (async function addAllFields() {
    for (var i = 0; i < FIELDS.length; i++) {
      addFieldBtn.click();
      await sleep(800);

      var field = FIELDS[i];
      var prefix = 'timelines.' + PHASE_INDEX + '.fields.' + i;

      // 1. Key
      var keyInput = byName(prefix + '.name');
      if (keyInput) {
        fill(keyInput, field.key);
        console.log((i + 1) + '/' + FIELDS.length + ' Key: ' + field.key);
      } else {
        console.warn((i + 1) + ' Key input not found: ' + prefix + '.name');
      }
      await sleep(200);

      // 2. Type
      var typeSelect = byName(prefix + '.type');
      if (typeSelect) {
        typeSelect.value = field.type;
        typeSelect.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('  Type: ' + field.type);
      }
      await sleep(500);

      // 3. Label
      var labelInput = byName(prefix + '.label');
      if (labelInput) {
        fill(labelInput, field.label);
        console.log('  Label: ' + field.label);
      }
      await sleep(200);

      // 4. Notes / Keterangan
      if (field.notes) {
        var ketInput = byName(prefix + '.keterangan');
        if (ketInput) {
          fill(ketInput, field.notes);
          console.log('  Keterangan: ' + field.notes);
        }
        await sleep(200);
      }

      // 5. Choices (for multiple_choice type)
      if (field.type === 'multiple_choice' && field.options && field.options.length > 0) {
        var fieldContainer = keyInput ? keyInput.closest('.space-y-2') : null;
        if (fieldContainer) {
          addChoices(fieldContainer, field.options);
        }
        await sleep(200);
      }

      // 6. Section dropdown
      var sectionVal = SECTION_MAP[i] || '';
      if (sectionVal) {
        var sectionSelect = byName(prefix + '.section');
        if (sectionSelect) {
          var optExists = Array.from(sectionSelect.options).some(function(o) { return o.value === String(sectionVal); });
          if (optExists) {
            sectionSelect.value = String(sectionVal);
            sectionSelect.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('  Section: ' + sectionVal);
          } else {
            console.warn('  Section ' + sectionVal + ' option not yet available');
          }
        }
        await sleep(200);
      }

      // 7. Required checkbox
      if (field.required) {
        var fc = getFieldContainer(prefix);
        if (fc) {
          var allLabels = fc.querySelectorAll('label');
          for (var li = 0; li < allLabels.length; li++) {
            if (allLabels[li].textContent.trim() === 'Required') {
              var reqCb = allLabels[li].querySelector('input[type="checkbox"]');
              if (reqCb && !reqCb.checked) {
                reqCb.click();
                console.log('  Required: ON');
              }
              break;
            }
          }
        }
        await sleep(100);
      }
    }

    console.log('%c═══ All ' + FIELDS.length + ' fields added! Click "Save Timeline" ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
  })();
})();
