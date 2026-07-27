var FIELDS = [
  { key: 'TeamName_normal', label: 'Team Name', type: 'text', required: true },
  { key: 'FullName_normal', label: 'Full Name', type: 'text', required: true },
  { key: 'Nationality_normal', label: 'Nationality', type: 'text', required: true },
  { key: 'University_normal', label: 'University', type: 'text', required: true },
  { key: 'Faculty_normal', label: 'Faculty', type: 'text', required: true },
  { key: 'Major_normal', label: 'Major', type: 'text', required: true },
  { key: 'Domicile_normal', label: 'Domicile', type: 'text', required: true },
  { key: 'PhoneNumber_normal', label: 'Phone Number', type: 'phone', required: true },
  { key: 'Email_normal', label: 'Email', type: 'email', required: true },
  { key: 'Linkedin_normal', label: 'Linkedin', type: 'text', required: false },
  { key: 'CV_normal', label: 'CV', type: 'file', required: true },
  { key: 'LinkTwibbon_normal', label: 'Link Twibbon', type: 'link', required: true },
  { key: 'FotoKTM_normal', label: 'Foto KTM', type: 'file', required: true },
  { key: 'FullNameAnggota1_normal', label: 'Full Name', type: 'text', required: true },
  { key: 'NationalityAnggota1_normal', label: 'Nationality', type: 'text', required: true },
  { key: 'UniversityAnggota1_normal', label: 'University', type: 'text', required: true },
  { key: 'FacultyAnggota1_normal', label: 'Faculty', type: 'text', required: true },
  { key: 'MajorAnggota1_normal', label: 'Major', type: 'text', required: true },
  { key: 'DomicileAnggota1_normal', label: 'Domicile', type: 'text', required: true },
  { key: 'PhoneNumberAnggota1_normal', label: 'Phone Number', type: 'phone', required: true },
  { key: 'EmailAnggota1_normal', label: 'Email', type: 'email', required: true },
  { key: 'LinkedinAnggota1_normal', label: 'Linkedin', type: 'text', required: false },
  { key: 'CVAnggota1_normal', label: 'CV', type: 'file', required: true },
  { key: 'LinkTwibbonAnggota1_normal', label: 'Link Twibbon', type: 'link', required: true },
  { key: 'FotoKTMAnggota1_normal', label: 'Foto KTM', type: 'file', required: true },
  { key: 'FullNameAnggota2_normal', label: 'Full Name', type: 'text', required: true },
  { key: 'NationalityAnggota2_normal', label: 'Nationality', type: 'text', required: true },
  { key: 'UniversityAnggota2_normal', label: 'University', type: 'text', required: true },
  { key: 'FacultyAnggota2_normal', label: 'Faculty', type: 'text', required: true },
  { key: 'MajorAnggota2_normal', label: 'Major', type: 'text', required: true },
  { key: 'DomicileAnggota2_normal', label: 'Domicile', type: 'text', required: true },
  { key: 'PhoneNumberAnggota2_normal', label: 'Phone Number', type: 'phone', required: true },
  { key: 'EmailAnggota2_normal', label: 'Email', type: 'email', required: true },
  { key: 'LinkedinAnggota2_normal', label: 'Linkedin', type: 'text', required: false },
  { key: 'CVAnggota2_normal', label: 'CV', type: 'file', required: true },
  { key: 'LinkTwibbonAnggota2_normal', label: 'Link Twibbon', type: 'link', required: true },
  { key: 'FotoKTMAnggota2_normal', label: 'Foto KTM', type: 'file', required: true },
  { key: 'ProofKTM_normal', label: 'Proof of Active Students Card', type: 'file', required: true },
  { key: 'ProofFollowing_normal', label: 'Proof Following @gmbcc_ugm', type: 'file', required: true },
  { key: 'ProofTwibbonUpload_normal', label: 'Proof Twibbon Upload', type: 'link', required: true },
  { key: 'ProofPosterRepost_normal', label: 'Proof Poster Repost', type: 'link', required: true },
  { key: 'ProofTag_normal', label: 'Proof tag 3 friends on poster comment section', type: 'link', required: true },
  { key: 'InfoGMBCCFrom_normal', label: 'How do you know about GMBCC?', type: 'multiple_choice', required: true },
  { key: 'InfoAffiliatedOrganizations_normal', label: 'Are you involved in any organizations related to business case competitions or consulting?', type: 'text', required: false }
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
(function run() {
  console.log('Phase index: ' + PHASE_INDEX);
  fill(byName('timelines.' + PHASE_INDEX + '.name'), 'Normal');
  fill(byName('timelines.' + PHASE_INDEX + '.startDate'), '2026-05-01');
  fill(byName('timelines.' + PHASE_INDEX + '.endDate'), '2026-05-11');
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
      await sleep(200);
      var labelInput = byName(prefix + '.label');
      if (labelInput) {
        fill(labelInput, field.label);
        console.log('  Label: ' + field.label);
      }
      await sleep(200);
    }
    console.log('Done! Click Save Timeline');
  })();
})();
