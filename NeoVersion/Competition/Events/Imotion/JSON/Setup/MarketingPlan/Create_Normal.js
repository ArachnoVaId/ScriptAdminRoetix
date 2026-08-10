// IMOTION Marketing Plan Competition - Normal Phase & Add 30 Fields
// 1. Navigate to the Marketing Plan Competition timeline page
// 2. Click "Add Phase" button FIRST
// 3. Wait for the new phase form to appear
// 4. Paste this script in browser console
// 5. Script fills phase details + adds 31 fields
// 6. Click "Save Timeline" to save
//
// NOTE: startDate/endDate below are PLACEHOLDERS — isi tanggal asli sebelum paste ke console.
// NOTE: Section mapping (REVISED): 1=Team Data+Leader, 2=Second Member, 3=Third Member,
// 4=Fourth Member (opsional), 5=Attachments (AdminProof), 6=Additional Info (InfoIMOTIONFrom),
// 7=Support Package+Payment. "How did you find out" dipindah ke section terpisah (6) per revisi.
// NOTE: Section "IMOTION Support Package" bersifat conditional/branching di form asli — field-field
// di bawah adalah interpretasi terbaik dari RAW, mohon verifikasi manual sebelum Save Timeline.
// NOTE: Ini timeline Normal — lihat Create_Extend.js untuk timeline Extend (field sama, suffix _extend).
// NOTE: Tidak ada field/setting teknis untuk membatasi tipe file upload jadi PDF-only di FIELDS
// schema kita (lihat Keterangan AdminProof) — kalau dashboard Roetix punya field khusus untuk itu,
// beri tahu nama field-nya supaya bisa diotomatisasi juga.

var FIELDS = [
  // Team Data
  { key: 'TeamName_normal', label: 'Nama Tim', type: 'text', required: true },
  // Team Leader (Ketua Tim / Anggota Pertama)
  { key: 'LeaderFullName_normal', label: 'Nama Ketua Tim (Anggota Pertama)', type: 'text', required: true },
  { key: 'LeaderInstitution_normal', label: 'Team Leader Institution (First Member)', type: 'text', required: true,
    notes: 'Contoh: Universitas Indonesia' },
  { key: 'LeaderMajorBatch_normal', label: 'Team Leader Major and Batch (First Member)', type: 'text', required: true,
    notes: 'Contoh: Manajemen 2025' },
  { key: 'LeaderEmail_normal', label: 'Email Ketua Tim (Anggota Pertama)', type: 'email', required: true },
  { key: 'LeaderPhoneNumber_normal', label: 'Team Leader Whatsapp Number (First Member)', type: 'phone', required: true },
  { key: 'LeaderLineID_normal', label: 'Team Leader LINE ID (First Member)', type: 'text', required: true },
  // Second Member (Anggota Kedua)
  { key: 'Member1FullName_normal', label: 'Nama Anggota Kedua', type: 'text', required: true },
  { key: 'Member1Institution_normal', label: 'Second Member Institution', type: 'text', required: true,
    notes: 'Contoh: Universitas Indonesia' },
  { key: 'Member1MajorBatch_normal', label: 'Second Member Major and Batch', type: 'text', required: true,
    notes: 'Contoh: Manajemen 2025' },
  { key: 'Member1Email_normal', label: 'Email Anggota Kedua', type: 'email', required: true },
  { key: 'Member1PhoneNumber_normal', label: 'Nomor WhatsApp Anggota Kedua', type: 'phone', required: true },
  { key: 'Member1LineID_normal', label: 'Second Member LINE ID', type: 'text', required: true },
  // Third Member (Anggota Ketiga)
  { key: 'Member2FullName_normal', label: 'Nama Anggota Ketiga', type: 'text', required: true },
  { key: 'Member2Institution_normal', label: 'Third Member Institution', type: 'text', required: true,
    notes: 'Contoh: Universitas Indonesia' },
  { key: 'Member2MajorBatch_normal', label: 'Third Member Major and Batch', type: 'text', required: true,
    notes: 'Contoh: Manajemen 2025' },
  { key: 'Member2Email_normal', label: 'Email Anggota Ketiga', type: 'email', required: true },
  { key: 'Member2PhoneNumber_normal', label: 'Nomor WhatsApp Anggota Ketiga', type: 'phone', required: true },
  { key: 'Member2LineID_normal', label: 'Third Member LINE ID', type: 'text', required: true },
  // Fourth Member (Anggota Keempat — Optional)
  { key: 'Member3FullName_normal', label: 'Nama Anggota Keempat (opsional)', type: 'text', required: false },
  { key: 'Member3Institution_normal', label: 'Fourth Member Institution (opsional)', type: 'text', required: false,
    notes: 'Contoh: Universitas Indonesia' },
  { key: 'Member3MajorBatch_normal', label: 'Fourth Member Major and Batch (opsional)', type: 'text', required: false,
    notes: 'Contoh: Manajemen 2025' },
  { key: 'Member3Email_normal', label: 'Email Anggota Keempat (opsional)', type: 'email', required: false },
  { key: 'Member3PhoneNumber_normal', label: 'Nomor WhatsApp Anggota Keempat (opsional)', type: 'phone', required: false },
  { key: 'Member3LineID_normal', label: 'Fourth Member LINE ID (opsional)', type: 'text', required: false },
  // Attachments
  { key: 'AdminProof_normal', label: 'Bukti Kelengkapan Administrasi', type: 'file', required: true,
    notes: 'Please upload one file using the provided template. Make sure the file contains the following documents: 1. Student Identity Card (KTM) of all team members. 2. Proof of following the Instagram account @imotionfebui. 3. Proof of following the TikTok account @imotionfebui. 4. Proof of following the X (Twitter) account @imotionfebui. 5. Proof of uploading The 20th IMOTION poster to Instagram Story and tagging the account @imotionfebui. 6. Proof of uploading The 20th IMOTION Twibbon to Instagram Feed. Download the registration proof template through the following link: https://bit.ly/CompiledProof20thIMOTION. Please make a copy of the template first before filling it out. File name: (Team Name)_Registration The 20th IMOTION_Compiled Proof. The file must be in PDF format only.' },
  // Additional Info
  { key: 'InfoIMOTIONFrom_normal', label: 'Bagaimana Anda mengetahui The 20th IMOTION?', type: 'multiple_choice', required: true,
    options: ['Media Sosial IMOTION (Instagram, TikTok, X, LinkedIn)', 'Website IMOTION', 'Media Partner', 'KOL/Content Creator', 'Teman', 'Other'] },
  // IMOTION Support Package (disederhanakan jadi 1 section: pertanyaan + 1 kolom bukti)
  { key: 'OutsideJabodetabek_normal', label: 'Apakah domisili tim anda atau salah satu anggota dari tim anda berasal dari LUAR JABODETABEK?', type: 'multiple_choice', required: true,
    options: ['Ya/Mau Mendaftar', 'Tidak'] },
  { key: 'SupportPackageProof_normal', label: 'Pengumpulan Bukti Formulir IMOTION Support Package', type: 'file', required: true,
    notes: 'Jika Ya atau ingin mendaftar untuk mendukung kebutuhan akomodasi selama pelaksanaan Final Round The 20th IMOTION, mohon membaca Terms & Conditions lalu mengisi form registrasi IMOTION Support Package yang keduanya ada pada link berikut: https://linktr.ee/20thIMOTIONSupportPackage. Lalu unggah tangkapan layar, gambar, atau berkas sebagai bukti bahwa tim Anda telah mengisi formulir IMOTION Support Package. Format penamaan file — Tim: (Team Name)_IMOTIONSupportPackage; Individu: (Team Name)_(Team Member)_IMOTIONSupportPackage. Jika Tidak, isi kolom ini dengan file/foto kosong (blank) dengan format nama file: TidakMendaftar. Disclaimer: IMOTION Support Package wajib diikuti oleh semua peserta yang berdomisili di luar wilayah Jabodetabek (kondisi tertentu dapat menyebabkan instruksi ini tidak berlaku). Info lebih lanjut/konfirmasi: Azwa - WhatsApp 081806294294 / LINE ae062512.' },
  // Payment
  { key: 'PaymentProof_normal', label: 'Bukti Pembayaran', type: 'file', required: false,
    notes: 'Nama file: (Team Name)_(Marketing Plan/Mini Marketing Case)_Proof of Payment' }
];

var SECTION_MAP = [
  1,                          // Section 1: Team Data (1)
  1,1,1,1,1,1,                // Section 1: Team Leader (6) = 7 total
  2,2,2,2,2,2,                // Section 2: Second Member (6)
  3,3,3,3,3,3,                // Section 3: Third Member (6)
  4,4,4,4,4,4,                // Section 4: Fourth Member (opsional) (6)
  5,                          // Section 5: Attachments (AdminProof) (1)
  6,                          // Section 6: Additional Info (InfoIMOTIONFrom) (1) — dipisah per revisi
  7,7,7                       // Section 7: Jabodetabek (1) + Support Package Proof (1, merged) + Payment (1) = 3
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
  console.log('%c═══ Marketing Plan Competition - Normal Phase + ' + FIELDS.length + ' Fields ═══', 'color:#6366f1;font-weight:bold');
  console.log('Phase index: ' + PHASE_INDEX);

  fill(byName('timelines.' + PHASE_INDEX + '.name'), 'Marketing Plan Competition Normal Registration');
  console.log('Phase Name -> Marketing Plan Competition Normal Registration');

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
