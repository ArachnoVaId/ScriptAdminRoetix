// IGNITE WPC - Semifinal (Full Paper) Phase & Add 5 Fields
// 1. Navigate to the WPC timeline page
// 2. Click "Add Phase" button FIRST
// 3. Wait for the new phase form to appear
// 4. Paste this script in browser console
// 5. Script fills phase details + adds 5 fields
// 6. Click "Save Timeline" to save

var FIELDS = [
  { key: 'TeamName_semifinal', label: 'Team name', type: 'text', required: true },
  { key: 'LeaderFullName_semifinal', label: 'Team leader\'s full name', type: 'text', required: true },
  { key: 'LeaderEmail_semifinal', label: 'Team leader\'s email', type: 'email', required: true },
  { key: 'LeaderPhoneNumber_semifinal', label: 'Team leader\'s active phone number', type: 'phone', required: true },
  { key: 'FullPaper_semifinal', label: 'Full Paper', type: 'file', required: true }
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

function addChoices(fieldEl, choices) {
  var container = fieldEl.closest('.space-y-2');
  if (!container) return;
  var choiceInput = container.querySelector('input[placeholder="Add choice…"]');
  if (!choiceInput) return;
  var plusBtn = choiceInput.parentElement.querySelector('button[type="button"]');
  if (!plusBtn) return;
  choices.forEach(function(c) {
    fill(choiceInput, c);
    plusBtn.click();
    console.log('    Choice: ' + c);
  });
}

(function run() {
  console.log('Phase index: ' + PHASE_INDEX);
  fill(byName('timelines.' + PHASE_INDEX + '.name'), 'Semifinal');
  fill(byName('timelines.' + PHASE_INDEX + '.startDate'), '2026-07-01');
  fill(byName('timelines.' + PHASE_INDEX + '.endDate'), '2026-07-07');

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

  if (phaseCheckboxes.length >= 1 && phaseCheckboxes[0].checked) {
    phaseCheckboxes[0].click();
    console.log('Registration Gate: OFF');
  }
  if (phaseCheckboxes.length >= 2 && !phaseCheckboxes[1].checked) {
    phaseCheckboxes[1].click();
    console.log('Requires Payment: ON');
  }

  var addFieldBtns = [].filter.call(document.querySelectorAll('button'), function(b) {
    return b.textContent && b.textContent.trim() === 'Add Field';
  });
  var addFieldBtn = addFieldBtns[addFieldBtns.length - 1];

  (async function addAllFields() {
    for (var i = 0; i < FIELDS.length; i++) {
      addFieldBtn.click();
      await sleep(800);

      var field = FIELDS[i];
      var prefix = 'timelines.' + PHASE_INDEX + '.fields.' + i;

      var keyInput = byName(prefix + '.name');
      if (keyInput) {
        fill(keyInput, field.key);
        console.log((i + 1) + '/' + FIELDS.length + ' Key: ' + field.key);
      }
      await sleep(200);

      var typeSelect = byName(prefix + '.type');
      if (typeSelect) {
        typeSelect.value = field.type;
        typeSelect.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('  Type: ' + field.type);
      }
      await sleep(400);

      var labelInput = byName(prefix + '.label');
      if (labelInput) {
        fill(labelInput, field.label);
        console.log('  Label: ' + field.label);
      }
      await sleep(200);

      if (field.notes) {
        var ketInput = byName(prefix + '.keterangan');
        if (ketInput) {
          fill(ketInput, field.notes);
          console.log('  Keterangan: ' + field.notes);
        }
        await sleep(200);
      }

      if (field.type === 'multiple_choice' && field.options && field.options.length > 0) {
        var mcEl = keyInput ? keyInput.closest('.space-y-2') : null;
        if (mcEl) {
          addChoices(mcEl, field.options);
        }
        await sleep(200);
      }
    }
    console.log('%c═══ All ' + FIELDS.length + ' fields added! Click "Save Timeline" ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
  })();
})();
