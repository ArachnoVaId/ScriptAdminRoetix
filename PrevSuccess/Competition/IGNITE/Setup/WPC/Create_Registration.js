// IGNITE WPC - Registration Phase & Add 33 Fields
// 1. Navigate to the WPC timeline page
// 2. Click "Add Phase" button FIRST
// 3. Wait for the new phase form to appear
// 4. Paste this script in browser console
// 5. Script fills phase details + adds 33 fields
// 6. Click "Save Timeline" to save

var FIELDS = [
  // Team Data
  { key: 'TeamName_registration', label: 'Team name', type: 'text', required: true,
    notes: 'If applying for PDEC, the team name has to differ from the product\'s name. The team name is only allowed to consist of latin letters and numbers, and does not contain symbols. Team name must not be offensive to any ethnicity, religion, race, and/or intergroup relations. Disobeyment to this rule will result in immediate disqualification.' },
  { key: 'NationOfOrigin_registration', label: 'Nation of origin', type: 'text', required: true },
  { key: 'UniversityName_registration', label: 'University name', type: 'text', required: true },
  // Team Leader
  { key: 'LeaderFullName_registration', label: 'Leader Full name', type: 'text', required: true },
  { key: 'LeaderSex_registration', label: 'Leader Sex', type: 'multiple_choice', required: true,
    options: ['Male', 'Female'] },
  { key: 'LeaderMajor_registration', label: 'Leader Major', type: 'text', required: true },
  { key: 'LeaderBatch_registration', label: 'Leader Batch', type: 'text', required: true,
    notes: 'Desc: Enrollment year. Example: 2023' },
  { key: 'LeaderPhoneNumber_registration', label: 'Leader Active phone number', type: 'phone', required: true,
    notes: 'Desc: Include country code. Example (Indonesia): +62xxxxxxxxxxx' },
  { key: 'LeaderEmail_registration', label: 'Leader Email', type: 'email', required: true },
  { key: 'LeaderTwibbonLink_registration', label: 'Leader Twibbon link', type: 'link', required: true },
  // First Member
  { key: 'Member1FullName_registration', label: 'Member 1 Full name', type: 'text', required: true },
  { key: 'Member1Sex_registration', label: 'Member 1 Sex', type: 'multiple_choice', required: true,
    options: ['Male', 'Female'] },
  { key: 'Member1Major_registration', label: 'Member 1 Major', type: 'text', required: true },
  { key: 'Member1Batch_registration', label: 'Member 1 Batch', type: 'text', required: true,
    notes: 'Desc: Enrollment year. Example: 2023' },
  { key: 'Member1PhoneNumber_registration', label: 'Member 1 Active phone number', type: 'phone', required: true,
    notes: 'Desc: Include country code.' },
  { key: 'Member1Email_registration', label: 'Member 1 Email', type: 'email', required: true },
  { key: 'Member1TwibbonLink_registration', label: 'Member 1 Twibbon link', type: 'link', required: true },
  // Second Member
  { key: 'Member2FullName_registration', label: 'Member 2 Full name', type: 'text', required: true },
  { key: 'Member2Sex_registration', label: 'Member 2 Sex', type: 'multiple_choice', required: true,
    options: ['Male', 'Female'] },
  { key: 'Member2Major_registration', label: 'Member 2 Major', type: 'text', required: true },
  { key: 'Member2Batch_registration', label: 'Member 2 Batch', type: 'text', required: true,
    notes: 'Desc: Enrollment year. Example: 2023' },
  { key: 'Member2PhoneNumber_registration', label: 'Member 2 Active phone number', type: 'phone', required: true,
    notes: 'Desc: Include country code.' },
  { key: 'Member2Email_registration', label: 'Member 2 Email', type: 'email', required: true },
  { key: 'Member2TwibbonLink_registration', label: 'Member 2 Twibbon link', type: 'link', required: true },
  // Attachments
  { key: 'StudentIDCard_registration', label: 'Student ID card', type: 'file', required: true,
    notes: 'Desc: Scan each member\'s ID card, compile into single file' },
  { key: 'PosterRepost_registration', label: 'Poster repost', type: 'file', required: true,
    notes: 'Desc: Screenshot each member\'s repost, compile into single file' },
  { key: 'Twibbon_registration', label: 'Twibbon', type: 'file', required: true,
    notes: 'Desc: Screenshot each member\'s twibbon, compile into single file' },
  { key: 'StatementOfOriginality_registration', label: 'Statement of Originality', type: 'file', required: true,
    notes: 'Desc: Attach filled statement from template' },
  // Additional Info
  { key: 'InfoIGNITEFrom_registration', label: 'How did you know about IGNITE?', type: 'multiple_choice', required: true,
    options: ['Social media', 'Campus announcement', 'Friends/word of mouth', 'Lecturer/faculty recommendation', 'Others'] },
  // Agreement
  { key: 'AgreementRules_registration', label: 'Agrees to comply with the rules and guidelines of IGNITE 2026.', type: 'multiple_choice', required: true,
    options: ['Yes'] },
  { key: 'AgreementAccurate_registration', label: 'Confirms that all the information you provided is accurate.', type: 'multiple_choice', required: true,
    options: ['Yes'] },
  { key: 'AgreementResponsibility_registration', label: 'Accepts full responsibility, including receiving consequences if information provided is untrue.', type: 'multiple_choice', required: true,
    options: ['Yes'] },
  // Payment
  { key: 'PaymentProof_registration', label: 'Payment proof', type: 'file', required: true }
];

var SECTION_MAP = [
  1,1,1, 1,1,1,1,1,1,1,
  2,2,2, 2,2,2,2,
  3,3,3, 3,3,3,3,
  4,4,4, 4, 4,4,4, 4,4
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

function findFieldContainer(prefix) {
  var keyInput = byName(prefix + '.name');
  if (!keyInput) return null;
  return keyInput.closest('.space-y-2') || keyInput.parentElement;
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
  return null;
}

function addChoicesToField(container, choices) {
  if (!container || !choices || choices.length === 0) return;
  var choiceInput = container.querySelector('input[placeholder="Add choice…"]');
  if (!choiceInput) {
    console.warn('  Choices input not found');
    return;
  }
  var addBtn = choiceInput.parentElement.querySelector('button[type="button"]');
  if (!addBtn) {
    console.warn('  Choices add button not found');
    return;
  }
  choices.forEach(function(c) {
    fill(choiceInput, c);
    addBtn.click();
    console.log('  Choice added: ' + c);
  });
}

(function run() {
  console.log('%c═══ WPC - Registration Phase + ' + FIELDS.length + ' Fields ═══', 'color:#6366f1;font-weight:bold');
  console.log('Phase index: ' + PHASE_INDEX);

  fill(byName('timelines.' + PHASE_INDEX + '.name'), 'Registration');
  console.log('Phase Name -> Registration');

  fill(byName('timelines.' + PHASE_INDEX + '.startDate'), '2026-05-11');
  console.log('Start Date -> 2026-05-11');

  fill(byName('timelines.' + PHASE_INDEX + '.endDate'), '2026-06-16');
  console.log('End Date -> 2026-06-16');

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

  if (phaseCheckboxes.length >= 1) {
    var gate = phaseCheckboxes[0];
    if (gate.checked) {
      gate.click();
      console.log('Registration Gate -> OFF');
    }
  }

  if (phaseCheckboxes.length >= 2) {
    var payment = phaseCheckboxes[1];
    if (!payment.checked) {
      payment.click();
      console.log('Requires Payment -> ON');
    }
  }

  console.log('%c=== Adding ' + FIELDS.length + ' Fields ===', 'color:#6366f1;font-weight:bold');

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
      await sleep(400);

      // 3. Label
      var labelInput = byName(prefix + '.label');
      if (labelInput) {
        fill(labelInput, field.label);
        console.log('  Label: ' + field.label);
      }
      await sleep(200);

      // 4. Notes / Keterangan
      if (field.notes) {
        var keteranganInput = byName(prefix + '.keterangan');
        if (keteranganInput) {
          fill(keteranganInput, field.notes);
          console.log('  Notes: ' + field.notes.substring(0, 50) + '...');
        }
        await sleep(200);
      }

      // 5. Choices (for multiple_choice type)
      if (field.type === 'multiple_choice' && field.options && field.options.length > 0) {
        var container = findFieldContainer(prefix);
        if (container) {
          addChoicesToField(container, field.options);
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
