// MATRIX UI - Casual Essay Full Paper Phase & Add 9 Fields
// 1. Navigate to the Essay Competition timeline page
// 2. Click "Add Phase" button FIRST
// 3. Wait for the new phase form to appear
// 4. Paste this script in browser console
// 5. Script fills phase details + adds 9 fields
// 6. Click "Save Timeline" to save

var FIELDS = [
  // Team Data
  { key: 'TeamName_fullpaper', label: 'Team name', type: 'text', required: true },
  { key: 'LeaderInstitution_fullpaper', label: 'Institution (Team Leader)', type: 'text', required: true },
  // Team Leader
  { key: 'LeaderName_fullpaper', label: 'Leader Name', type: 'text', required: true,
    notes: 'Format: name/contact' },
  { key: 'LeaderPhoneNumber_fullpaper', label: 'Leader Whatsapp Contact', type: 'phone', required: true },
  // Members
  { key: 'Member1Name_fullpaper', label: 'Member 1 Name', type: 'text', required: true },
  { key: 'Member1PhoneNumber_fullpaper', label: 'Member 1 Contact', type: 'phone', required: true },
  { key: 'Member2Name_fullpaper', label: 'Member 2 Name', type: 'text', required: true },
  { key: 'Member2PhoneNumber_fullpaper', label: 'Member 2 Contact', type: 'phone', required: true },
  // Payment
  { key: 'PaymentProof_fullpaper', label: 'Setelah ini, pendaftar akan melakukan pembayaran QRIS dan melakukan screenshot bukti pembayaran', type: 'multiple_choice', required: true,
    options: ['Setuju'] }
];

var SECTION_MAP = [
  1,1,1,1,
  2,2,
  3,3,
  4
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
  console.log('%c═══ MATRIX UI - Casual Essay Full Paper Phase + ' + FIELDS.length + ' Fields ═══', 'color:#6366f1;font-weight:bold');
  console.log('Phase index: ' + PHASE_INDEX);

  fill(byName('timelines.' + PHASE_INDEX + '.name'), 'Casual Essay Full Paper');
  console.log('Phase Name -> Casual Essay Full Paper');

  fill(byName('timelines.' + PHASE_INDEX + '.startDate'), '2026-09-17');
  console.log('Start Date -> 2026-09-17');

  fill(byName('timelines.' + PHASE_INDEX + '.endDate'), '2026-10-07');
  console.log('End Date -> 2026-10-07');

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
    return b.textContent && b.textContent.includes('Add Field');
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
