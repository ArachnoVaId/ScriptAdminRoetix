// {{EVENT_NAME}} - {{CATEGORY_NAME}} - {{PHASE_NAME}} Phase & Add {{FIELD_COUNT}} Fields
// 1. Navigate to {{DASHBOARD_URL}}
// 2. Click "Add Phase" button{{ADD_PHASE_INSTRUCTION}}
// 3. Wait for the new phase form to appear
// 4. Paste this script in browser console
// 5. Script fills phase details + adds {{FIELD_COUNT}} fields
// 6. Click "Save Timeline" to save

var FIELDS = [
  {{FIELD_DEFINITIONS}}
];

{{PHASE_INDEX_LOGIC}}
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

function addChoices(fieldContainer, choices) {
  var choiceInput = fieldContainer.querySelector('input[placeholder="Add choice…"]');
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
  console.log('%c═══ {{EVENT_NAME}} - {{CATEGORY_NAME}} - {{PHASE_NAME}} Phase ═══', 'color:#6366f1;font-weight:bold');

  fill(byName('timelines.' + {{PHASE_IDX_EXPR}} + '.name'), '{{PHASE_NAME}}');
  console.log('Phase Name -> {{PHASE_NAME}}');

  fill(byName('timelines.' + {{PHASE_IDX_EXPR}} + '.startDate'), '{{START_DATE}}');
  console.log('Start Date -> {{START_DATE}}');

  fill(byName('timelines.' + {{PHASE_IDX_EXPR}} + '.endDate'), '{{END_DATE}}');
  console.log('End Date -> {{END_DATE}}');

  {{CHECKBOX_LOGIC}}

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
      var prefix = 'timelines.' + {{PHASE_IDX_EXPR}} + '.fields.' + i;

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
        var keteranganInput = byName(prefix + '.keterangan');
        if (keteranganInput) {
          fill(keteranganInput, field.notes);
          console.log('  Notes: ' + field.notes.substring(0, 50) + (field.notes.length > 50 ? '...' : ''));
        }
        await sleep(200);
      }

      // 5. Choices (for multiple_choice type)
      if (field.type === 'multiple_choice' && field.options && field.options.length > 0) {
        var fieldContainer = keyInput ? keyInput.closest('.space-y-2') : null;
        if (fieldContainer) {
          addChoices(fieldContainer, field.options);
        } else {
          console.warn('  Field container not found for choices');
        }
        await sleep(200);
      }
    }

    console.log('%c═══ All ' + FIELDS.length + ' fields added! Click "Save Timeline" ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
  })();
})();
