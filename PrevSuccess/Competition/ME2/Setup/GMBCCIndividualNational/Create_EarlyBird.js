var FIELDS = [
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
  { key: 'ProofKTM_EB', label: 'Proof KTM', type: 'file', required: true },
  { key: 'ProofFollowing_EB', label: 'Proof Following', type: 'file', required: true },
  { key: 'ProofTwibbonUpload_EB', label: 'Proof Twibbon Upload', type: 'link', required: true },
  { key: 'ProofPosterRepost_EB', label: 'Proof Poster Repost', type: 'link', required: true },
  { key: 'ProofTag_EB', label: 'Proof Tag', type: 'link', required: true },
  { key: 'InfoGMBCCFrom_EB', label: 'Info GMBCC From', type: 'multiple_choice', required: true },
  { key: 'InfoAffiliatedOrganizations_EB', label: 'Info Affiliated Organizations', type: 'text', required: false }
];

var _desc = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
var setter = _desc && _desc.set;

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
  console.log('%c═══ GMBCCIndividualNational - Early Bird Phase ═══', 'color:#6366f1;font-weight:bold');

  fill(byName('timelines.0.name'), 'Early Bird');
  fill(byName('timelines.0.startDate'), '2026-04-18');
  fill(byName('timelines.0.endDate'), '2026-04-30');

  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  if (checkboxes.length >= 1) {
    var gateChecked = checkboxes[0].checked;
    if (gateChecked) checkboxes[0].click();
    console.log('  → registrationGate: off');
  }
  if (checkboxes.length >= 2) {
    var payChecked = checkboxes[1].checked;
    if (!payChecked) checkboxes[1].click();
    console.log('  → requiresPayment: on');
  }

  var addFieldBtns = [].filter.call(document.querySelectorAll('button'), function(b) {
    return b.textContent && b.textContent.trim() === 'Add Field';
  });
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

    console.log('%c═══ Done! Click "Save Timeline" ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
  })();
})();
