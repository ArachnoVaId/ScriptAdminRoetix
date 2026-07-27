// IDEAS Lean Canvas - Autofill (paste in browser console)
(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

  function fillByName(name, value) {
    const el = document.querySelector(`input[name="${name}"], textarea[name="${name}"]`);
    if (!el) { console.warn(`  ✗ input[name="${name}"] NOT FOUND`); return; }
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.focus();
    if (setter) setter.call(el, value); else el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    console.log(`  ✓ ${name} = ${value}`);
  }

  function selectOption(value) {
    const sel = document.querySelector('select');
    if (!sel) return;
    const opt = [...sel.options].find(o => o.value === value || o.text === value);
    if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change', { bubbles: true })); console.log(`  ✓ Selected: ${opt.text}`); }
  }

  function clickBtn(text) {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent?.trim() === text && b.offsetParent !== null && !b.disabled);
    if (btn) { btn.click(); return true; }
    return false;
  }

  const s = Math.random().toString(36).substring(2, 6);

  // ═══ SECTION 1 ═══
  console.log('%c═══ Section 1: Data Ketua ═══', 'color:#6366f1;font-weight:bold');
  fillByName('nama_tim', `Team Gamma ${s}`);
  fillByName('nama_lengkap', 'Rina Agustina');
  fillByName('asal_instansi', 'Universitas Gadjah Mada');
  fillByName('hp', '081298765432');
  fillByName('email', `rina.${s}@testmail.com`);
  fillByName('link_twibbon', 'https://instagram.com/p/example_twibbon_ideas_1');
  fillByName('entepreneur_organization', 'No');
  selectOption('Informasi dari teman, dosen, atau keluarga');
  console.log('  ℹ Upload: #file-foto_KTM, #file-Screenshot_follow_strativate');

  await sleep(800);
  clickBtn('Berikutnya');
  await sleep(3000);

  // ═══ SECTION 2 ═══
  console.log('%c═══ Section 2: Anggota 1 ═══', 'color:#6366f1;font-weight:bold');
  fillByName('nama_lengkap_anggota1', 'Hendra Setiawan');
  fillByName('asal_instansi_anggota1', 'Universitas Gadjah Mada');
  fillByName('hp__anggota1', '082345671234');
  fillByName('email__anggota1', `hendra.${s}@testmail.com`);
  fillByName('link_twibbon_anggota1', 'https://instagram.com/p/example_twibbon_ideas_2');
  console.log('  ℹ Upload: #file-foto_formal_anggota1');

  await sleep(800);
  clickBtn('Berikutnya');
  await sleep(3000);

  // ═══ SECTION 3 ═══
  console.log('%c═══ Section 3: Anggota 2 ═══', 'color:#6366f1;font-weight:bold');
  fillByName('nama_lengkap_anggota2', 'Maya Indah Permatasari');
  fillByName('asal_instansi__anggota2', 'Universitas Gadjah Mada');
  fillByName('hp_anggota2', '083456782345');
  fillByName('email_anggota2', `maya.${s}@testmail.com`);
  fillByName('link_twibbon__anggota2', 'https://instagram.com/p/example_twibbon_ideas_3');
  console.log('  ℹ Upload: #file-foto_formal_anggota2');

  await sleep(800);
  clickBtn('Berikutnya');
  await sleep(3000);

  // ═══ SECTION 4 ═══
  console.log('%c═══ Section 4: Bukti ═══', 'color:#6366f1;font-weight:bold');
  fillByName('bukti_twibbon', 'https://instagram.com/p/example_bukti_twibbon');
  fillByName('bukti_poster', 'https://instagram.com/p/example_bukti_poster');
  fillByName('bukti_tag', 'https://instagram.com/p/example_bukti_tag');
  console.log('  ℹ Upload: #file-bukti_follow');

  console.log('\n%c═══ Done! Upload files then click Lanjutkan ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
})();
