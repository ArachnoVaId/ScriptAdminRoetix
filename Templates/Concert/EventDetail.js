// {{EVENT_NAME}} - Event Create Page Filler (Step 1: Event Details)
// Paste in browser console at /roetix-events/create
const SUFFIX = Math.random().toString(36).substring(2, 6);
const DATA = {
  eventName: '{{EVENT_NAME}}',
  slug: `{{SLUG}}-${SUFFIX}`,
  eventType: '{{EVENT_TYPE}}',
  location: '{{LOCATION}}',
  ticketSalesStart: '{{TICKET_SALES_START}}',
  eventDate: '{{EVENT_DATE}}',
  flatAmount: '{{FLAT_AMOUNT}}',
  percentage: '{{PERCENTAGE}}',
  feeBearer: '{{FEE_BEARER}}',
  organizer: '{{ORGANIZER}}',
  description: '{{DESCRIPTION}}',
};
const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
const taSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
function fill(el, val) {
  if (!el) return console.warn('⚠ NOT FOUND');
  el.focus();
  if (el.tagName === 'TEXTAREA' && taSetter) taSetter.call(el, val);
  else if (el.tagName === 'SELECT') { el.value = val; }
  else if (setter) setter.call(el, val);
  else el.value = val;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  console.log('✓', (el.name || el.id || el.type), '→', String(val).substring(0, 60));
}
function byId(id) { return document.getElementById(id); }
function byName(n) { return document.querySelector(`[name="${n}"]`); }
function byLabel(text) {
  const l = [...document.querySelectorAll('label')].find(l => l.textContent.includes(text));
  return l?.closest('div')?.querySelector('input,select,textarea');
}
console.log('%c═══ {{EVENT_NAME}} - Step 1: Event Details ═══', 'color:#6366f1;font-weight:bold');
console.log('Slug:', DATA.slug);
fill(byId('name') || byName('name') || byLabel('Event Name'), DATA.eventName);
fill(byId('slug') || byName('slug') || byLabel('Slug'), DATA.slug);
const typeSelect = byId('event_type') || byName('event_type') || document.querySelector('select');
const typeOpts = typeSelect ? [...typeSelect.options].map(o => o.text) : [];
const typeMatch = typeOpts.find(o => o.toLowerCase().startsWith(DATA.feeBearer.toLowerCase()));
if (typeSelect) {
  const seatOpt = [...typeSelect.options].find(o => o.text === DATA.eventType);
  if (seatOpt) { typeSelect.value = seatOpt.value; typeSelect.dispatchEvent(new Event('change', { bubbles: true })); console.log('✓ Event Type →', DATA.eventType); }
}
fill(byId('location') || byName('location') || byLabel('Location'), DATA.location);
fill(byId('start_date') || byName('start_date') || byLabel('Ticket Sales Start'), DATA.ticketSalesStart);
fill(byId('event_date') || byName('event_date') || byLabel('Event Date'), DATA.eventDate);
fill(byId('flat_amount') || byName('flatAmount') || byLabel('Flat Amount'), DATA.flatAmount);
fill(byId('percentage') || byName('percentage') || byLabel('Percentage'), DATA.percentage);
const feeSelect = byId('fee_bearer') || byName('feeBearer') || byLabel('Fee Bearer');
if (feeSelect && feeSelect.tagName === 'SELECT') {
  const opts = [...feeSelect.options];
  const m = opts.find(o => o.text.toLowerCase().startsWith(DATA.feeBearer.toLowerCase()));
  if (m) { feeSelect.value = m.value; feeSelect.dispatchEvent(new Event('change', { bubbles: true })); console.log('✓ Fee Bearer →', m.text); }
}
fill(byId('organizer') || byName('organizer') || byLabel('Organizer'), DATA.organizer);
fill(byId('description') || byName('description') || byLabel('Description'), DATA.description);
console.log('%c═══ Done! Review fields then click Next ═══', 'color:#22c55e;font-weight:bold;font-size:13px');
