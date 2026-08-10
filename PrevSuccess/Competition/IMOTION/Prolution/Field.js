const FIELDS = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'Email',
    desc: 'Please enter your active email address.',
  },
  {
    name: 'full_name',
    label: 'Full Name',
    type: 'Text',
    desc: 'Please enter your full name. Example: Andi Pratama',
  },
  {
    name: 'current_status',
    label: 'Current Status',
    type: 'Multiple Choice',
    desc: '',
    options: 'Undergraduate Student, High School Student, Fresh Graduate, Employee, General Public, Other',
  },
  {
    name: 'institution',
    label: 'Institution',
    type: 'Text',
    desc: 'Please enter the name of your university, school, company, or institution. Example: Universitas Indonesia',
  },
  {
    name: 'whatsapp_number',
    label: 'WhatsApp Number',
    type: 'Phone',
    desc: 'Please enter your active WhatsApp number to receive further information regarding PROLUTION. Example: 081234567890',
  },
  {
    name: 'interest_marketing_competition',
    label: 'Are You Interested in Joining The 20th IMOTION Marketing Competition?',
    type: 'Multiple Choice',
    desc: 'This competition is open to undergraduate students.',
    options: 'Yes, I am interested, Maybe, I would like to learn more, No, thank you',
  },
];

const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function fill(el, val) {
  if (!el) return false;
  el.focus();
  if (setter) setter.call(el, val);
  else el.value = val;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}

function setCheckbox(el, checked) {
  if (!el) return false;
  if (el.checked !== checked) el.click();
  return true;
}

function findInputByPlaceholder(row, placeholder) {
  return [...row.querySelectorAll('input')].find(i => i.placeholder === placeholder) || null;
}

function findCheckboxByLabelText(row, text) {
  const label = [...row.querySelectorAll('label')].find(l => l.textContent?.trim().includes(text));
  return label?.querySelector('input[type="checkbox"]') || null;
}

async function run() {
  console.log('%c═══ Registration Form Fields ═══', 'color:#6366f1;font-weight:bold');
  const sections = document.querySelectorAll('section');
  let section = null;
  for (const sec of sections) {
    const h = sec.querySelector('h1, h2, h3, h4');
    if (h?.textContent?.trim() === 'Registration Form') { section = sec; break; }
  }
  if (!section) { console.error('Registration Form section not found'); return; }
  const addBtn = [...section.querySelectorAll('button')].find(b => b.textContent?.includes('Add Field'));
  console.log('Add Field button:', !!addBtn);

  for (let i = 0; i < FIELDS.length; i++) {
    const field = FIELDS[i];
    const container = section.querySelector('.space-y-3');
    const existingRows = container ? container.children.length : 0;
    if (i >= existingRows) {
      addBtn?.click();
      await sleep(600);
    }
    const rows = section.querySelectorAll('.space-y-3')[0]?.children;
    if (!rows || !rows[i]) { console.warn('⚠ Row', i + 1, 'not created'); continue; }
    const row = rows[i];

    // Name + Label (these placeholders are static regardless of type)
    fill(findInputByPlaceholder(row, 'e.g. full_name'), field.name);
    console.log('✓ Field', i + 1, 'Name →', field.name);
    fill(findInputByPlaceholder(row, 'e.g. Full Name'), field.label);
    console.log('✓ Field', i + 1, 'Label →', field.label);

    // Type — set this before touching Options, since choosing
    // Multiple Choice/Select re-renders the row and adds the Options input
    const sel = row.querySelector('select');
    const match = sel ? [...sel.options].find(o => o.text === field.type) : null;
    if (match) {
      sel.value = match.value;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      console.log('✓ Field', i + 1, 'Type →', field.type);
      await sleep(300);
    } else {
      console.warn('⚠ Field', i + 1, 'type not found in dropdown:', field.type);
    }

    // Keterangan (description)
    if (field.desc) {
      fill(findInputByPlaceholder(row, 'Helper text shown below the field'), field.desc);
      console.log('✓ Field', i + 1, 'Keterangan →', field.desc);
    }

    // Options (only present after type is set to Multiple Choice / Select)
    if (field.options) {
      const optionsInput = findInputByPlaceholder(row, 'Option A, Option B, Option C');
      if (optionsInput) {
        fill(optionsInput, field.options);
        console.log('✓ Field', i + 1, 'Options →', field.options);
      } else {
        console.warn('⚠ Field', i + 1, 'Options input not found — check the Type was applied');
      }
    }

    // Required — every field in this form is required
    const requiredCheckbox = findCheckboxByLabelText(row, 'Required');
    setCheckbox(requiredCheckbox, true);
    console.log('✓ Field', i + 1, 'Required → true');

    await sleep(200);
  }
  console.log('%c═══ Done! Click "Save Form Fields" to save ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
}

run();
