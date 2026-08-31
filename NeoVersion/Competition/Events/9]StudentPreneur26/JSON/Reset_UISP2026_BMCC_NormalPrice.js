// RESET SCRIPT - The 16th UI Studentpreneurs - BMCC Registration (subevent NORMAL PRICE, event ID UISP2026BMCCNP)
// Run this WHEN Create_UISP2026_BMCC_NormalPrice.js already produced duplicate sections/fields (i.e. you
// pasted it into the console more than once into an already-filled wizard, so "Add section"/"Add field"
// stacked on top of existing ones instead of replacing them).
//
// Logic di bawah ini generic (cuma clear localStorage draft key + reload, tidak spesifik per-event) - file
// kembar Reset_UISP2026_BMCC.js (Early Bird) dan Reset_UISP2026_BMCC_LateBird.js isinya identik.
//
// WHY this approach instead of deleting individual duplicate sections:
//   - NewAdminUI/README.md only confirms a DELETE mechanism for FIELDS (button.title === 'Delete',
//     inside div.group.rounded-lg.border.bg-card). There is NO confirmed/verified DOM pattern for
//     deleting a whole SECTION - guessing at a selector risks clicking the wrong control.
//   - The wizard NEVER saves anything to the server until you click "Create event" on Step 7 Review.
//     Everything up to that point lives in `localStorage['roetix:competition-draft']` only.
//   - So the safe, already-documented way to guarantee zero duplicates is to wipe that local draft and
//     reload -> wizard comes back completely empty -> re-paste Create_UISP2026_BMCC_NormalPrice.js ONCE
//     and every section/field is created fresh, no dedup logic needed.
//
// HOW TO USE:
//   1. If you want to revise a field, edit it directly in Create_UISP2026_BMCC_NormalPrice.js's SECTIONS
//      arrays first.
//   2. Paste THIS script into the console and press Enter. It clears the draft and reloads the page.
//   3. After the page reloads, log in again if prompted, navigate to /events/create, then paste the
//      (edited) Create_UISP2026_BMCC_NormalPrice.js ONCE. It will fill everything from a clean slate.
//   4. Manually re-verify Step 7 Review + every Time-Price cell + both Phase's Completion messages before
//      clicking "Create event", same as any other run.
//
// NOTE: this clears ONLY the competition-draft key, never localStorage.clear() (that would also wipe
// your login/session token and force a re-login) - see README.md "Bahaya localStorage".

(function resetDraft() {
  var before = document.querySelectorAll('button').length;
  localStorage.removeItem('roetix:competition-draft');
  console.log('%cDraft cleared (roetix:competition-draft). Reloading...', 'color:#f59e0b;font-weight:bold');
  location.reload();
})();
