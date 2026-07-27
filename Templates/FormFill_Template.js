// {{EVENT_NAME}} - {{CATEGORY_NAME}} - Autofill (paste in browser console on the registration form page)
// Works for: {{PHASE_LIST}}
(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

  function fillByName(name, value) {
    const el = document.querySelector(`input[name="${name}"], textarea[name="${name}"]`);
    if (!el) { console.warn(`  x input[name="${name}"] NOT FOUND`); return false; }
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.focus();
    if (setter) setter.call(el, value); else el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    console.log(`  + ${name} = ${value}`);
    return true;
  }

  function selectOption(value) {
    const sel = document.querySelector('select');
    if (!sel) { console.warn('  x <select> NOT FOUND'); return false; }
    const opt = [...sel.options].find(o => o.value === value || o.text === value);
    if (!opt) { console.warn(`  x Option "${value}" NOT FOUND in select`); return false; }
    sel.value = opt.value;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    console.log(`  + Selected: ${opt.text}`);
    return true;
  }

  function clickNext() {
    const btn = [...document.querySelectorAll('button')].find(b =>
      ['Berikutnya', 'Selanjutnya', 'Next', 'Continue', 'Lanjutkan'].includes((b.textContent || '').trim())
      && b.offsetParent !== null
      && !b.disabled
    );
    if (!btn) { console.warn('  x Next button NOT FOUND / disabled'); return false; }
    btn.click();
    return true;
  }

  {{DETECT_SUFFIX_BLOCK}}

  function createDummyPdfFile() {
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
    return new File([bytes], 'Bab 1 #1 Draft Awal.docx.pdf', { type: 'application/pdf' });
  }

  function uploadDummyById(id) {
    const input = document.querySelector(`#${id}`);
    if (!input) { console.warn(`  x #${id} NOT FOUND`); return false; }
    if (input.tagName !== 'INPUT' || input.type !== 'file') {
      console.warn(`  x #${id} is not input[type="file"]`);
      return false;
    }
    input.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    const dt = new DataTransfer();
    dt.items.add(createDummyPdfFile());
    input.files = dt.files;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    console.log(`  + Uploaded dummy file to #${id}`);
    return true;
  }

  function uploadSectionFiles(fileIds) {
    let ok = true;
    for (const id of fileIds) ok = uploadDummyById(id) && ok;
    return ok;
  }

  function uploadAllVisibleFileInputs() {
    const visibleInputs = [...document.querySelectorAll('input[type="file"]')]
      .filter(el => el.offsetParent !== null && !el.disabled);
    if (!visibleInputs.length) {
      console.warn('  x No visible file inputs found in this section');
      return false;
    }
    let ok = true;
    for (const input of visibleInputs) {
      const id = input.id;
      if (id) {
        ok = uploadDummyById(id) && ok;
      } else {
        input.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        const dt = new DataTransfer();
        dt.items.add(createDummyPdfFile());
        input.files = dt.files;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new Event('blur', { bubbles: true }));
        console.log('  + Uploaded dummy file to unnamed file input');
      }
    }
    return ok;
  }

  const s = Math.random().toString(36).substring(2, 6);
  {{SUFFIX_VARIABLE}}

  // {{SECTION_1_COMMENT}}
  console.log('%c{{SECTION_1_HEADER}}', 'color:#6366f1;font-weight:bold');
  {{SECTION_1_FIELDS}}

  await sleep(900);
  console.log('  -> Clicking Berikutnya...');
  clickNext();
  await sleep(3000);

  {{ADDITIONAL_SECTIONS}}

  console.log('\n%c=== Done! ===', 'color:#22c55e;font-weight:bold;font-size:13px');
  console.log('Dummy PDF already attached to all visible file fields.');
  console.log('If your backend strictly validates binary content, switch this run to Playwright setInputFiles with your local path.');
})();
