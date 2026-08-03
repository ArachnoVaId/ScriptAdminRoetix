// IMOTION Mini Marketing Case - Extend Phase & Add 25 Fields
// 1. Navigate to the Mini Marketing Case timeline page
// 2. Click "Add Phase" button FIRST
// 3. Wait for the new phase form to appear
// 4. Paste this script in browser console
// 5. Script fills phase details + adds 25 fields
// 6. Click "Save Timeline" to save
//
// NOTE: startDate/endDate below are PLACEHOLDERS — isi tanggal asli sebelum paste ke console.
// NOTE: Section mapping: 1=Team Data+Leader, 2=Second Member, 3=Third Member,
// 4=Attachments+Additional Info, 5=Support Package+Payment.
// NOTE: Mini Marketing Case TIDAK punya Anggota Keempat (tim max 3 orang) — beda dari Marketing Plan.
// NOTE: Section "IMOTION Support Package" bersifat conditional/branching di form asli — field-field
// di bawah adalah interpretasi terbaik dari RAW, mohon verifikasi manual sebelum Save Timeline.
// NOTE: Ini timeline kedua (Extend) untuk sub-kompetisi yang sama — field sama persis dengan
// Create_Normal.js, key diberi suffix _extend supaya tidak duplikat dengan timeline Normal.

var FIELDS = [
  // Team Data
  { key: 'TeamName_extend', label: 'Nama Tim', type: 'text', required: true },
  // Team Leader (Ketua Tim / Anggota Pertama)
  { key: 'LeaderFullName_extend', label: 'Nama Ketua Tim (Anggota Pertama)', type: 'text', required: true },
  { key: 'LeaderInstitution_extend', label: 'Leader Institusi', type: 'text', required: true,
    notes: 'Contoh: Universitas Indonesia' },
  { key: 'LeaderMajorBatch_extend', label: 'Leader Jurusan dan Angkatan', type: 'text', required: true,
    notes: 'Contoh: Manajemen 2025' },
  { key: 'LeaderEmail_extend', label: 'Email Ketua Tim (Anggota Pertama)', type: 'email', required: true },
  { key: 'LeaderPhoneNumber_extend', label: 'Nomor WhatsApp Ketua Tim (Anggota Pertama)', type: 'phone', required: true },
  { key: 'LeaderLineID_extend', label: 'LINE ID Ketua Tim (Anggota Pertama)', type: 'text', required: true },
  // Second Member (Anggota Kedua)
  { key: 'Member1FullName_extend', label: 'Nama Anggota Kedua', type: 'text', required: true },
  { key: 'Member1Institution_extend', label: 'Member 1 Institusi', type: 'text', required: true,
    notes: 'Contoh: Universitas Indonesia' },
  { key: 'Member1MajorBatch_extend', label: 'Member 1 Jurusan dan Angkatan', type: 'text', required: true,
    notes: 'Contoh: Manajemen 2025' },
  { key: 'Member1Email_extend', label: 'Email Anggota Kedua', type: 'email', required: true },
  { key: 'Member1PhoneNumber_extend', label: 'Nomor WhatsApp Anggota Kedua', type: 'phone', required: true },
  { key: 'Member1LineID_extend', label: 'LINE ID Anggota Kedua', type: 'text', required: true },
  // Third Member (Anggota Ketiga)
  { key: 'Member2FullName_extend', label: 'Nama Anggota Ketiga', type: 'text', required: true },
  { key: 'Member2Institution_extend', label: 'Member 2 Institusi', type: 'text', required: true,
    notes: 'Contoh: Universitas Indonesia' },
  { key: 'Member2MajorBatch_extend', label: 'Member 2 Jurusan dan Angkatan', type: 'text', required: true,
    notes: 'Contoh: Manajemen 2025' },
  { key: 'Member2Email_extend', label: 'Email Anggota Ketiga', type: 'email', required: true },
  { key: 'Member2PhoneNumber_extend', label: 'Nomor WhatsApp Anggota Ketiga', type: 'phone', required: true },
  { key: 'Member2LineID_extend', label: 'LINE ID Anggota Ketiga', type: 'text', required: true },
  // Attachments
  { key: 'AdminProof_extend', label: 'Bukti Kelengkapan Administrasi', type: 'file', required: true,
    notes: 'Desc: Satu file berisi: (1) KTM seluruh anggota tim, (2) bukti follow IG @imotionfebui, (3) bukti follow TikTok @imotionfebui, (4) bukti follow X @imotionfebui, (5) bukti upload poster The 20th IMOTION di IG Story + tag @imotionfebui, (6) bukti upload Twibbon The 20th IMOTION di IG Feed. Akses poster & twibbon: https://bit.ly/ParticipantEssentialsThe20thIMOTION. Template compiled proof (CompiledProof20thIMOTION): https://docs.google.com/document/d/1Qv6xVp2H1TyXORJK2aaTtbcaxHV2u2fmCyQezcpMWa8/edit?tab=t.0 - WAJIB Make a copy dulu sebelum mengisi. Nama file: (Team Name)_Registration The 20th IMOTION_Compiled Proof. Max 100 MB.' },
  // Additional Info
  { key: 'InfoIMOTIONFrom_extend', label: 'Bagaimana Anda mengetahui The 20th IMOTION?', type: 'multiple_choice', required: true,
    options: ['Media Sosial IMOTION (Instagram, TikTok, X, LinkedIn)', 'Website IMOTION', 'Media Partner', 'KOL/Content Creator', 'Teman', 'Other'] },
  // IMOTION Support Package (conditional/branching — verifikasi manual; semua optional kecuali pertanyaan JABODETABEK)
  { key: 'OutsideJabodetabek_extend', label: 'Apakah kampus tim anda/kampus salah satu anggota tim anda ada yang berasal dari LUAR JABODETABEK?', type: 'multiple_choice', required: true,
    notes: 'Tim/anggota di luar JABODETABEK wajib daftar Support Package; tim dari JABODETABEK opsional.',
    options: ['Tidak (seluruh tim dalam jabodetabek)', 'Ya (seluruh tim di luar jabodetabek)', 'Individu (Ada beberapa anggota yang di luar jabodetabek)'] },
  { key: 'SupportPackageTeamForm_extend', label: 'Berkas Formulir IMOTION Support Package (Tim)', type: 'file', required: false,
    notes: 'Jika Ya, mohon membaca terms and conditions dan mengisi form registrasi IMOTION Support Package di: https://linktr.ee/20thIMOTIONSupportPackage. Lalu unggah tangkapan layar/gambar/berkas sebagai bukti bahwa tim Anda telah mengisi formulir Paket Dukungan IMOTION. Nama file: (Team Name)_IMOTIONSupportPackage.' },
  { key: 'SupportPackageIndividualForm_extend', label: 'Berkas Formulir IMOTION Support Package (Individu)', type: 'file', required: false,
    notes: 'Jika Ya, mohon membaca terms and conditions dan mengisi form registrasi IMOTION Support Package di: https://linktr.ee/20thIMOTIONSupportPackage. Lalu unggah tangkapan layar/gambar/berkas sebagai bukti bahwa tim Anda telah mengisi formulir IMOTION Support Package. Nama file: (Team Name)_(Team Member)_IMOTIONSupportPackage.' },
  // Payment
  { key: 'PaymentProof_extend', label: 'Bukti Pembayaran', type: 'file', required: false,
    notes: 'Nama file: (Team Name)_(Marketing Plan/Mini Marketing Case)_Proof of Payment' }
];

var SECTION_MAP = [
  1,                          // Section 1: Team Data (1)
  1,1,1,1,1,1,                // Section 1: Team Leader (6) = 7 total
  2,2,2,2,2,2,                // Section 2: Second Member (6)
  3,3,3,3,3,3,                // Section 3: Third Member (6)
  4,4,                        // Section 4: Attachments (1) + Additional Info (1) = 2
  5,5,5,5                     // Section 5: Support Package (2, merged) + Payment (1) + Jabodetabek (1) = 4
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
  console.log('%c═══ Mini Marketing Case - Extend Phase + ' + FIELDS.length + ' Fields ═══', 'color:#6366f1;font-weight:bold');
  console.log('Phase index: ' + PHASE_INDEX);

  fill(byName('timelines.' + PHASE_INDEX + '.name'), 'Extend');
  console.log('Phase Name -> Extend');

  fill(byName('timelines.' + PHASE_INDEX + '.startDate'), 'YYYY-MM-DD');
  console.log('Start Date -> YYYY-MM-DD (PLACEHOLDER, isi tanggal asli)');

  fill(byName('timelines.' + PHASE_INDEX + '.endDate'), 'YYYY-MM-DD');
  console.log('End Date -> YYYY-MM-DD (PLACEHOLDER, isi tanggal asli)');

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
    if (!gate.checked) {
      gate.click();
      console.log('Registration Gate -> ON');
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
