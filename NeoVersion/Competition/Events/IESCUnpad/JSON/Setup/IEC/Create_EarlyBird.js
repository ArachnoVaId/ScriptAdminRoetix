// IESCUnpad IEC - Early Bird Phase & Add 10 Fields (Rp 119.000)
// 1. Navigate to the IEC timeline page
// 2. Click "Add Phase" button FIRST
// 3. Wait for the new phase form to appear
// 4. Paste this script in browser console
// 5. Script fills phase details + adds 10 fields
// 6. Click "Save Timeline" to save

var FIELDS = [
  { key: 'Email_earlybird', label: 'Email', type: 'email', required: true },
  { key: 'HighSchoolName_earlybird', label: 'High School Name', type: 'text', required: true },
  { key: 'TeamName_earlybird', label: 'Team Name', type: 'text', required: true },
  { key: 'LeaderFullName_earlybird', label: 'Team Leader', type: 'text', required: true },
  { key: 'LeaderPhoneNumber_earlybird', label: 'Team Leader’s Phone Number', type: 'phone', required: true,
    notes: 'Example: +62 812-3456-7899' },
  { key: 'Member1FullName_earlybird', label: 'Member 1', type: 'text', required: true },
  { key: 'Member2FullName_earlybird', label: 'Member 2', type: 'text', required: true },
  { key: 'StudentID_earlybird', label: 'Student ID', type: 'file', required: true,
    notes: 'Student IDs for all team members' },
  { key: 'PosterSharingProof_earlybird', label: 'Proof of Poster Sharing for IEC 2025 on Instagram', type: 'file', required: true,
    notes: 'Submit proof of poster sharing on your Instagram account’s story. Submission Format: "Poster_[Team Name]". Example: Poster_AMAZING' },
  { key: 'FollowProof_earlybird', label: 'Proof of Following Instagram Accounts for IESC', type: 'file', required: true,
    notes: 'Follow @iescunpad. Submission Format: "Follow_[Team Name]". Example: Follow_AMAZING' }
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
  fill(byName('timelines.' + PHASE_INDEX + '.name'), 'Early Bird');
  fill(byName('timelines.' + PHASE_INDEX + '.startDate'), '2026-09-01T00:00');
  fill(byName('timelines.' + PHASE_INDEX + '.endDate'), '2026-09-13T23:59');
  fill(byName('timelines.' + PHASE_INDEX + '.price'), '119000');

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
  if (phaseCheckboxes.length >= 2 && !phaseCheckboxes[1].checked) {
    phaseCheckboxes[1].click();
    console.log('Requires Payment -> ON');
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
