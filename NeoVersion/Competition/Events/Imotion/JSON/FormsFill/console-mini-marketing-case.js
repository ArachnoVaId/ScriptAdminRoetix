// IMOTION Mini Marketing Case - Autofill (paste in browser console on the registration form page)
// Works for: Normal / Extend (suffix auto-detected)
// Form has 6 Bagian (sections) (REVISED): 1=Team Data+Leader, 2=Second Member, 3=Third Member,
// 4=Attachments (AdminProof), 5=Additional Info (InfoIMOTIONFrom), 6=Support Package+Payment
// NOTE: Beda dari Marketing Plan — TIDAK ada section Fourth Member (Anggota Keempat).
//
// NOTE: Multiple_choice widget markup (InfoIMOTIONFrom, OutsideJabodetabek) belum dikonfirmasi
// persis (bisa <select>, button group, atau radio). chooseOption() coba beberapa strategi;
// kalau gagal, akan console.warn dan minta dipilih manual.
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
    if (!btn) { console.warn('  ✗ Next button NOT FOUND / disabled'); return false; }
    btn.click();
    return true;
  }

  function detectSuffix() {
    const names = [...document.querySelectorAll('input[name], select[name]')].map(el => el.name);
    if (names.some(n => n.endsWith('_extend'))) return '_extend';
    if (names.some(n => n.endsWith('_normal'))) return '_normal';
    return '_normal';
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
  const sf = detectSuffix();
  console.log(`%cUsing suffix: ${sf}`, 'color:#f59e0b;font-weight:bold');

  // ═══ SECTION 1: TEAM DATA + LEADER ═══
  console.log('%c═══ Bagian 1: Team Data + Leader ═══', 'color:#6366f1;font-weight:bold');
  fillByName(`TeamName${sf}`, `Tim Beta ${s}`);
  fillByName(`LeaderFullName${sf}`, 'Fajar Nugroho Saputra');
  fillByName(`LeaderInstitution${sf}`, 'Universitas Indonesia');
  fillByName(`LeaderMajorBatch${sf}`, 'Manajemen 2023');
  fillByName(`LeaderEmail${sf}`, `fajar.nugroho.${s}@testmail.com`);
  fillByName(`LeaderPhoneNumber${sf}`, '081234567891');
  fillByName(`LeaderLineID${sf}`, 'fajarnugroho_line');

  await sleep(900);
  console.log('  → Clicking Berikutnya...');
  clickNext();
  await sleep(3000);

  // ═══ SECTION 2: SECOND MEMBER (ANGGOTA KEDUA) ═══
  console.log('%c═══ Bagian 2: Second Member (Anggota Kedua) ═══', 'color:#6366f1;font-weight:bold');
  fillByName(`Member1FullName${sf}`, 'Kartika Sari Dewi');
  fillByName(`Member1Institution${sf}`, 'Universitas Indonesia');
  fillByName(`Member1MajorBatch${sf}`, 'Akuntansi 2023');
  fillByName(`Member1Email${sf}`, `kartika.sari.${s}@testmail.com`);
  fillByName(`Member1PhoneNumber${sf}`, '082345678902');
  fillByName(`Member1LineID${sf}`, 'kartikasari_line');

  await sleep(900);
  console.log('  → Clicking Berikutnya...');
  clickNext();
  await sleep(3000);

  // ═══ SECTION 3: THIRD MEMBER (ANGGOTA KETIGA) ═══
  console.log('%c═══ Bagian 3: Third Member (Anggota Ketiga) ═══', 'color:#6366f1;font-weight:bold');
  fillByName(`Member2FullName${sf}`, 'Reza Firmansyah');
  fillByName(`Member2Institution${sf}`, 'Universitas Indonesia');
  fillByName(`Member2MajorBatch${sf}`, 'Bisnis Digital 2023');
  fillByName(`Member2Email${sf}`, `reza.firmansyah.${s}@testmail.com`);
  fillByName(`Member2PhoneNumber${sf}`, '083456789013');
  fillByName(`Member2LineID${sf}`, 'rezafirmansyah_line');

  await sleep(900);
  console.log('  → Clicking Berikutnya...');
  clickNext();
  await sleep(3000);

  // ═══ SECTION 4: ATTACHMENTS ═══
  console.log('%c═══ Bagian 4: Attachments ═══', 'color:#6366f1;font-weight:bold');
  uploadFile(`AdminProof${sf}`);

  await sleep(900);
  console.log('  → Clicking Berikutnya...');
  clickNext();
  await sleep(3000);

  // ═══ SECTION 5: ADDITIONAL INFO ═══
  console.log('%c═══ Bagian 5: Additional Info ═══', 'color:#6366f1;font-weight:bold');
  chooseOption(`InfoIMOTIONFrom${sf}`, 'Media Sosial IMOTION (Instagram, TikTok, X, LinkedIn)');

  await sleep(900);
  console.log('  → Clicking Berikutnya...');
  clickNext();
  await sleep(3000);

  // ═══ SECTION 6: IMOTION SUPPORT PACKAGE + PAYMENT ═══
  console.log('%c═══ Bagian 6: IMOTION Support Package + Payment ═══', 'color:#6366f1;font-weight:bold');
  chooseOption(`OutsideJabodetabek${sf}`, 'Tidak');
  uploadFile(`SupportPackageProof${sf}`);
  uploadFile(`PaymentProof${sf}`);

  console.log('\n%c═══ Done! Review setiap bagian sebelum submit ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
  console.log('Dummy PDF sudah dipasang di semua file field yang ditemukan.');
  console.log('Multiple_choice yang gagal auto-select (lihat warning di atas) perlu dipilih manual.');
})();
