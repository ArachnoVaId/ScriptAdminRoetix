// IMOTION Pre-Event: PROLUTION - Autofill (paste in browser console on the registration form page)
// Single phase only — suffix is always "_prolution" (no Normal/Extend variant like Marketing Plan/Mini Marketing Case).
// Form has 3 Bagian (sections), matching SECTION_MAP in Create_Registration.js:
// 1=Participant Information (10 fields), 2=Competition Promo (competitioninfo1/2, 2 fields),
// 3=Attendance Confirmation (WhatsApp Group, 2 fields)
//
// NOTE: competitioninfo1/competitioninfo2 keys have NO "_prolution" suffix (matches the live
// dashboard field Keys exactly) — every other field below still uses `${sf}`.
// NOTE: Multiple_choice widget markup (CurrentStatus, InterestMarketingCompetition, competitioninfo1/2,
// AttendanceOffline, AttendanceOnline) belum dikonfirmasi persis (bisa <select>, button group, atau
// radio). chooseOption() coba beberapa strategi; kalau gagal, akan console.warn dan minta dipilih manual.
// NOTE: Belum dikonfirmasi apakah form publik PROLUTION ini benar-benar 3 halaman terpisah (wizard/stepper
// seperti Marketing Plan & Mini Marketing Case) atau 1 halaman scroll panjang. Script ini mengasumsikan
// wizard 3 langkah (mengikuti pola form IMOTION lain) — clickNext() akan no-op dengan warning kalau
// ternyata semua field ada di 1 halaman, jadi aman dicoba di kedua kasus.
(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

  function fillByName(name, value) {
    const el = document.querySelector(`input[name="${name}"], textarea[name="${name}"]`);
    if (!el) { console.warn(`  ✗ input[name="${name}"] NOT FOUND`); return false; }
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.focus();
    if (setter) setter.call(el, value); else el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    console.log(`  ✓ ${name} = ${value}`);
    return true;
  }

  function chooseOption(name, optionText) {
    const sel = document.querySelector(`select[name="${name}"]`);
    if (sel) {
      const opt = [...sel.options].find(o => o.value === optionText || o.text.trim() === optionText);
      if (opt) {
        sel.value = opt.value;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(`  ✓ ${name} (select) = ${optionText}`);
        return true;
      }
    }
    const marker = document.querySelector(`[name="${name}"]`);
    const scope = marker ? (marker.closest('.group\\/field') || marker.closest('div') || document) : document;
    const btn = [...scope.querySelectorAll('button, [role="button"], label')]
      .find(b => (b.textContent || '').trim() === optionText);
    if (btn) {
      btn.click();
      console.log(`  ✓ ${name} (button/label) = ${optionText}`);
      return true;
    }
    console.warn(`  ✗ Could not auto-select "${optionText}" for ${name} — pilih manual`);
    return false;
  }

  function clickNext() {
    const btn = [...document.querySelectorAll('button')].find(b =>
      ['Berikutnya', 'Selanjutnya', 'Lanjutkan', 'Next', 'Continue'].includes((b.textContent || '').trim())
      && b.offsetParent !== null
      && !b.disabled
    );
    if (!btn) { console.warn('  ✗ Next button NOT FOUND / disabled (mungkin form 1 halaman — aman diabaikan)'); return false; }
    btn.click();
    return true;
  }

  function createDummyPdfFile(label) {
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT /F1 18 Tf 72 760 Td (Dummy Upload File) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000010 00000 n
0000000064 00000 n
0000000122 00000 n
0000000212 00000 n
trailer
<< /Root 1 0 R /Size 5 >>
startxref
304
%%EOF`;
    const bytes = new TextEncoder().encode(pdfContent);
    return new File([bytes], `${label || 'Dummy'}.pdf`, { type: 'application/pdf' });
  }

  function uploadFile(name) {
    const input = document.querySelector(`input[type="file"][name="${name}"]`);
    if (!input) { console.warn(`  ✗ file input [name="${name}"] NOT FOUND`); return false; }
    input.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    const dt = new DataTransfer();
    dt.items.add(createDummyPdfFile(name));
    input.files = dt.files;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    console.log(`  ✓ Uploaded dummy file to [name="${name}"]`);
    return true;
  }

  const s = Math.random().toString(36).substring(2, 6);
  const sf = '_prolution';

  // ═══ SECTION 1: PARTICIPANT INFORMATION ═══
  console.log('%c═══ Bagian 1: Participant Information ═══', 'color:#6366f1;font-weight:bold');
  fillByName(`Email${sf}`, `andi.pratama.${s}@testmail.com`);
  fillByName(`FullName${sf}`, 'Andi Pratama');
  chooseOption(`CurrentStatus${sf}`, 'Undergraduate Student');
  fillByName(`Institution${sf}`, 'Universitas Indonesia');
  fillByName(`WhatsAppNumber${sf}`, '081234567890');
  chooseOption(`Batch${sf}`, '2026');
  fillByName(`NPM${sf}`, '2606586433');
  uploadFile(`ProofIGFollow${sf}`);
  uploadFile(`ProofTikTokFollow${sf}`);
  uploadFile(`ProofXFollow${sf}`);
  uploadFile(`ProofPosterIGStory${sf}`);
  chooseOption(`InterestMarketingCompetition${sf}`, 'Yes, I am interested');

  await sleep(900);
  console.log('  → Clicking Berikutnya...');
  clickNext();
  await sleep(3000);

  // ═══ SECTION 2: COMPETITION PROMO ═══
  console.log('%c═══ Bagian 2: Competition Promo ═══', 'color:#6366f1;font-weight:bold');
  chooseOption('competitioninfo1', "Yes, I'm interested");
  chooseOption('competitioninfo2', "Yes, i'm goitng to register");

  await sleep(900);
  console.log('  → Clicking Berikutnya...');
  clickNext();
  await sleep(3000);

  // ═══ SECTION 3: ATTENDANCE CONFIRMATION (WHATSAPP GROUP) ═══
  console.log('%c═══ Bagian 3: Attendance Confirmation (WhatsApp Group) ═══', 'color:#6366f1;font-weight:bold');
  chooseOption(`AttendanceOffline${sf}`, "Yes, I'm gonna attend offline");
  chooseOption(`AttendanceOnline${sf}`, "No, I'm gonna attend offline");

  console.log('\n%c═══ Done! Review setiap bagian sebelum submit ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
  console.log('Dummy PDF sudah dipasang di semua file field yang ditemukan.');
  console.log('Multiple_choice yang gagal auto-select (lihat warning di atas) perlu dipilih manual.');
})();
