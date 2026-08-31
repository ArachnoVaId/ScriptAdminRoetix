// IESCUnpad ISCAAS (International) - Abstract Phase & Add 11 Fields (Free)
// 1. Navigate to the ISCAAS Mahasiswa International timeline page
// 2. Click "Add Phase" button FIRST
// 3. Wait for the new phase form to appear
// 4. Paste this script in browser console
// 5. Script fills phase details + adds 11 fields
// 6. Click "Save Timeline" to save

var FIELDS = [
  { key: 'Email_abstract', label: 'Email', type: 'email', required: true },
  { key: 'TeamName_abstract', label: 'Team Name', type: 'text', required: true,
    notes: 'ex. Three Musketeers' },
  { key: 'Institution_abstract', label: 'Institution', type: 'text', required: true,
    notes: 'ex. Universitas Padjadjaran' },
  { key: 'ContactPerson_abstract', label: 'Contact Person (LINE ID / WhatsApp Number)', type: 'text', required: true,
    notes: 'ex. @anindytavthrni / 082xxxx' },
  { key: 'TeamMember1_abstract', label: 'Team Member 1', type: 'text', required: true },
  { key: 'TeamMember2_abstract', label: 'Team Member 2 (If Any)', type: 'text', required: false },
  { key: 'TeamMember3_abstract', label: 'Team Member 3 (If Any)', type: 'text', required: false },
  { key: 'FollowProof_abstract', label: 'Proof of Following Instagram @iescunpad', type: 'file', required: true,
    notes: 'Upload 1 supported file. Max 10 MB.' },
  { key: 'PosterSharingProof_abstract', label: 'Proof of Sharing the Poster', type: 'file', required: true,
    notes: 'Share the event poster either in a group or on your Instagram story. Upload 1 supported file. Max 10 MB.' },
  { key: 'StudentIDCard_abstract', label: 'Proof of Student ID Card (KTM)', type: 'file', required: true,
    notes: 'Upload 1 supported file. Max 10 MB.' },
  { key: 'Abstract_abstract', label: 'Abstract Submission', type: 'file', required: true,
    notes: 'Upload 1 supported file. Max 10 MB.' }
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

(function run() {
  console.log('Phase index: ' + PHASE_INDEX);
  fill(byName('timelines.' + PHASE_INDEX + '.name'), 'Abstract');
  fill(byName('timelines.' + PHASE_INDEX + '.startDate'), '2026-08-09T00:00');
  fill(byName('timelines.' + PHASE_INDEX + '.endDate'), '2026-09-10T23:59');

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
    console.log('Requires Payment: OFF');
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
      await sleep(500);

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
        var fieldContainer = keyInput ? keyInput.closest('.space-y-2') : null;
        if (fieldContainer) {
          addChoices(fieldContainer, field.options);
        }
        await sleep(200);
      }

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
    console.log('%c═══ Done! Click "Save Timeline" ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
  })();
})();
