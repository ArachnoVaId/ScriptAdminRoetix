// EXTRACT GOOGLE FORM -> RAW txt / Tabled md / SECTIONS js
//
// Mengotomasi langkah pertama pipeline repo ini (Gform -> RAW -> Tabled -> Create_*.js) yang selama ini
// dikerjakan manual copy-paste. Lihat Context/1.RAWtoTabledCompetition.md untuk langkah berikutnya.
//
// CARA PAKAI:
//   1. Buka link PUBLIK form panitia: https://docs.google.com/forms/d/e/.../viewform
//      (BUKAN /edit, BUKAN halaman Responses - keduanya tidak punya FB_PUBLIC_LOAD_DATA_)
//   2. Buka DevTools console, tempel seluruh file ini, Enter.
//   3. Ambil hasilnya: copy(__GFORM_OUT.raw) / copy(__GFORM_OUT.tabled) / copy(__GFORM_OUT.js)
//
// KENAPA PARSE FB_PUBLIC_LOAD_DATA_, BUKAN SCRAPE DOM:
//   Form multi-halaman (yang punya tombol "Next") hanya merender halaman aktif di DOM, jadi scraping DOM
//   cuma dapat sebagian pertanyaan. Variabel global ini berisi definisi SELURUH form sekaligus - semua
//   halaman, opsi, dan flag required - tanpa perlu mengklik apa pun.
//
// OUTPUT (3 sekaligus, tercetak di console + tersimpan di window.__GFORM_OUT):
//   1. RAW    -> Events/<Event>/RAW/RAW_<Fase>_<Event>.txt
//   2. TABLED -> Events/<Event>/RAW/Tabled_<Fase>_<Event>.md
//   3. JS     -> array SECTIONS siap tempel ke JSON/Create_*.js (format NewAdminUI)
//
// !!! WAJIB REVIEW OUTPUT: yang ditandai (?) atau TODO_REVIEW adalah TEBAKAN, bukan data asli form.
// Google Form TIDAK menyimpan "ini email / ini nomor HP" untuk short-answer yang validasinya tidak
// diaktifkan panitia - jadi tipe email/phone/link ditebak dari kata kunci judul pertanyaan.

(function () {
  'use strict';

  var D = window.FB_PUBLIC_LOAD_DATA_;
  if (!D) {
    console.error('%cFB_PUBLIC_LOAD_DATA_ tidak ada di halaman ini.', 'color:#ef4444;font-weight:bold');
    console.error('Pastikan yang dibuka adalah link /viewform publik (bukan /edit, bukan halaman Responses).');
    console.error('Kalau memang sudah di /viewform tapi tetap tidak ada, form ini memakai renderer baru - ekstrak manual.');
    return;
  }

  // ===================== STRUKTUR FB_PUBLIC_LOAD_DATA_ =====================
  // D[1][0] = deskripsi form, D[1][1] = array item, D[1][8] = judul form
  // item  = [id, title, description, typeInt, entries]
  // entry = [entryId, options, requiredInt, rowLabel?]   (option = [text, ...])
  var form = D[1] || [];
  var FORM_TITLE = form[8] || D[3] || 'Untitled form';
  var FORM_DESC = form[0] || '';
  var ITEMS = form[1] || [];

  var T = {
    SHORT: 0, PARAGRAPH: 1, RADIO: 2, DROPDOWN: 3, CHECKBOX: 4, SCALE: 5,
    HEADER: 6, GRID: 7, PAGE_BREAK: 8, DATE: 9, TIME: 10, IMAGE: 11, VIDEO: 12, FILE: 13
  };
  var TYPE_NAME = {
    0: 'short answer', 1: 'paragraph', 2: 'multiple choice', 3: 'dropdown', 4: 'checkboxes',
    5: 'linear scale', 6: 'header', 7: 'grid', 8: 'page break', 9: 'date', 10: 'time',
    11: 'image', 12: 'video', 13: 'file upload'
  };

  // ===================== HEURISTIK TIPE (short answer / paragraph saja) =====================

  function guessTextType(title) {
    var t = (title || '').toLowerCase();
    if (/e-?mail|surel/.test(t)) return { type: 'email', guessed: true };
    if (/whats\s?app|wa aktif|no\.? ?hp|nomor hp|no\.? ?telp|telepon|phone|kontak aktif/.test(t)) return { type: 'phone', guessed: true };
    if (/\blink\b|\burl\b|tautan|drive\.google|google drive/.test(t)) return { type: 'link', guessed: true };
    return { type: 'text', guessed: false };
  }

  function mapType(gType, title) {
    switch (gType) {
      case T.SHORT:
      case T.PARAGRAPH:
        return guessTextType(title);
      case T.RADIO:
      case T.DROPDOWN:
        return { type: 'multiple_choice', guessed: false };
      case T.CHECKBOX:
        return { type: 'multiple_choice', guessed: true, note: 'GForm checkboxes (multi-jawaban) - New Admin UI hanya single-select' };
      case T.SCALE:
        return { type: 'multiple_choice', guessed: true, note: 'GForm linear scale - dijadikan pilihan angka' };
      case T.GRID:
        return { type: 'multiple_choice', guessed: true, note: 'GForm grid - tiap baris jadi 1 field terpisah, cek manual' };
      case T.DATE:
        return { type: 'date', guessed: false };
      case T.TIME:
        return { type: 'text', guessed: true, note: 'GForm time - New Admin UI tidak punya tipe time' };
      case T.FILE:
        return { type: 'file', guessed: false };
      default:
        return { type: 'text', guessed: true, note: 'tipe GForm tidak dikenal (' + gType + ')' };
    }
  }

  // ===================== PARSE ITEM -> FIELD =====================

  function cleanText(s) {
    return s ? String(s).replace(/\r/g, '').trim() : '';
  }

  function readOptions(entry) {
    var values = (entry[1] || []).map(function (o) { return (o && o[0] != null) ? String(o[0]) : ''; });
    return {
      options: values.filter(function (v) { return v !== ''; }),
      hasOther: values.some(function (v) { return v === ''; })   // opsi "Other" tersimpan sebagai string kosong
    };
  }

  function buildField(item, entry, labelOverride) {
    var mapped = mapType(item[3], item[1]);
    var opts = readOptions(entry);
    var notes = [];
    if (item[2]) notes.push(cleanText(item[2]).replace(/\s+/g, ' '));
    if (mapped.note) notes.push('TODO_REVIEW: ' + mapped.note);

    return {
      label: labelOverride || cleanText(item[1]) || '(tanpa judul)',
      type: mapped.type,
      guessed: !!mapped.guessed,
      required: entry[2] === 1,
      description: notes.join(' | '),
      options: opts.options,
      hasOther: opts.hasOther,
      gTypeName: TYPE_NAME[item[3]] || ('unknown(' + item[3] + ')')
    };
  }

  function fieldsFromItem(item) {
    var entries = item[4] || [];
    if (!entries.length) return [];
    // Grid: 1 entry per BARIS, label baris ada di entry[3][0]
    if (item[3] === T.GRID && entries.length > 1) {
      return entries.map(function (e) {
        var row = (e[3] && e[3][0]) ? String(e[3][0]) : '';
        return buildField(item, e, cleanText(item[1]) + (row ? ' - ' + row : ''));
      });
    }
    return [buildField(item, entries[0])];
  }

  // ===================== PARSE FORM -> SECTIONS =====================
  // Batas section = page break (8) ATAU header block (6). Keduanya secara semantik "mulai grup baru",
  // dan itu persis arti section di New Admin UI (judul + deskripsi + daftar field).

  function parseSections() {
    var sections = [];
    // Section implisit sebelum page break pertama. Deskripsi FORM sengaja TIDAK dipakai di sini - itu
    // header dokumen, bukan deskripsi section; kalau dipasang di sini form yang diawali page break akan
    // menghasilkan section kosong palsu di urutan pertama.
    var current = { title: FORM_TITLE, description: '', fields: [] };

    ITEMS.forEach(function (item) {
      var gType = item[3];
      if (gType === T.PAGE_BREAK || gType === T.HEADER) {
        sections.push(current);
        current = {
          title: cleanText(item[1]) || 'Section ' + (sections.length + 1),
          description: cleanText(item[2]),
          fields: []
        };
        return;
      }
      if (gType === T.IMAGE || gType === T.VIDEO) return;   // tidak ada padanannya di form builder Roetix
      Array.prototype.push.apply(current.fields, fieldsFromItem(item));
    });

    sections.push(current);
    return sections.filter(function (s) { return s.fields.length || s.description; });
  }

  // ===================== KEY (konvensi Context/1.RAWtoTabledCompetition.md) =====================

  function sectionPrefix(title) {
    var t = (title || '').toLowerCase();
    if (/leader|ketua/.test(t)) return 'Leader';
    var m = t.match(/(member|anggota|peserta)\s*(\d+)/);
    return m ? 'Member' + m[2] : '';
  }

  function toPascal(label) {
    var words = String(label).replace(/[^A-Za-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
    var key = words.map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join('');
    return key.slice(0, 40) || 'Field';
  }

  // Label sering sudah mengulang nama section ("Team Leader Full Name" di section "Team Leader Data").
  // Dibuang dulu supaya key jadi LeaderFullName, bukan LeaderTeamLeaderFullName.
  var PREFIX_WORDS = /(team\s+leader|leader|ketua(\s+tim)?|member\s*\d+|anggota\s*\d+|peserta\s*\d+)/i;

  function stripPrefixWords(label, prefix) {
    if (!prefix) return label;
    return String(label)
      .replace(new RegExp('^\\s*' + PREFIX_WORDS.source + "['’]?s?\\s*", 'i'), '')
      .replace(new RegExp('\\s*\\(\\s*' + PREFIX_WORDS.source + '\\s*\\)', 'i'), '')
      .trim() || label;
  }

  function assignKeys(sections) {
    var used = {};
    sections.forEach(function (s) {
      var prefix = sectionPrefix(s.title);
      s.fields.forEach(function (f) {
        var base = prefix + toPascal(stripPrefixWords(f.label, prefix));
        var key = base, n = 2;
        while (used[key]) { key = base + n; n++; }
        used[key] = true;
        f.key = key;
      });
    });
    return sections;
  }

  // ===================== OUTPUT 1: RAW txt =====================
  // Memakai kata kunci "Keterangan" yang dikenali Context/1.RAWtoTabledCompetition.md.

  function keteranganOf(f) {
    if (f.type === 'multiple_choice') {
      return 'Multiple choice: ' + f.options.join(' / ') + (f.hasOther ? ' / Other' : '');
    }
    if (f.type === 'file') return 'File upload';
    if (f.type === 'date') return 'Tanggal';
    if (f.type === 'link') return 'Link' + (f.guessed ? ' (?)' : '');
    if (f.type === 'email') return 'Isian singkat, validasi email' + (f.guessed ? ' (?)' : '');
    if (f.type === 'phone') return 'Isian singkat, validasi nomor' + (f.guessed ? ' (?)' : '');
    return 'Isian singkat';
  }

  function buildRaw(sections) {
    var out = [];
    out.push('# Sumber: Google Form "' + FORM_TITLE + '"');
    out.push('# Diekstrak otomatis oleh Tools/Extract_GForm.js - baris bertanda (?) adalah TEBAKAN tipe, verifikasi manual.');
    out.push('');
    if (FORM_DESC) { out.push(cleanText(FORM_DESC)); out.push(''); }

    sections.forEach(function (s, i) {
      out.push('Section ' + (i + 1) + ': ' + s.title);
      if (s.description) out.push(s.description);
      s.fields.forEach(function (f) {
        out.push(f.label + (f.required ? '' : ' (opsional)'));
        out.push(keteranganOf(f) + (f.description ? ' - ' + f.description : ''));
      });
      out.push('');
    });
    return out.join('\n');
  }

  // ===================== OUTPUT 2: Tabled md =====================

  function mdEscape(s) { return String(s || '').replace(/\|/g, '\\|').replace(/\n+/g, ' '); }

  function buildSectionTables(s) {
    var out = [];
    var plain = s.fields.filter(function (f) { return f.type !== 'multiple_choice'; });
    var mc = s.fields.filter(function (f) { return f.type === 'multiple_choice'; });
    var n = 0;

    if (plain.length) {
      out.push('| # | Key | Label | Type | Required | Notes |');
      out.push('|---|-----|-------|------|----------|-------|');
      plain.forEach(function (f) {
        n++;
        out.push('| ' + n + ' | ' + f.key + ' | ' + mdEscape(f.label) + ' | ' + f.type + (f.guessed ? ' (?)' : '')
          + ' | ' + f.required + ' | ' + mdEscape(f.description) + ' |');
      });
      out.push('');
    }
    if (mc.length) {
      out.push('| # | Key | Label | Type | Required | Notes | Options |');
      out.push('|---|-----|-------|------|----------|-------|---------|');
      mc.forEach(function (f) {
        n++;
        var opts = f.options.join(', ') + (f.hasOther ? ', Other' : '');
        out.push('| ' + n + ' | ' + f.key + ' | ' + mdEscape(f.label) + ' | multiple_choice | ' + f.required
          + ' | ' + mdEscape(f.description) + ' | ' + mdEscape(opts) + ' |');
      });
      out.push('');
    }
    return out;
  }

  function buildTabled(sections) {
    var out = [];
    out.push('# RAW — ' + FORM_TITLE);
    out.push('');
    out.push('Source: Google Form (diekstrak otomatis oleh `Tools/Extract_GForm.js`).');
    out.push('');
    out.push('> **Notes:**');
    out.push('> - Tipe `email` / `phone` / `link` pada short-answer adalah TEBAKAN dari kata kunci judul — Google Form tidak menyimpannya kecuali panitia mengaktifkan validasi. Verifikasi manual.');
    out.push('> - Baris ber-`TODO_REVIEW` di kolom Notes butuh keputusan manusia (checkbox multi-jawaban, grid, linear scale, tipe tak dikenal).');
    out.push('');
    if (FORM_DESC) {
      out.push('## Deskripsi form (dari Google Form)');
      out.push('');
      out.push(cleanText(FORM_DESC));
      out.push('');
    }

    sections.forEach(function (s, i) {
      out.push('## Section ' + (i + 1) + ': ' + s.title);
      out.push('');
      if (s.description) { out.push(s.description); out.push(''); }
      if (!s.fields.length) { out.push('_Info-only section (tanpa field)._'); out.push(''); return; }
      Array.prototype.push.apply(out, buildSectionTables(s));
    });
    return out.join('\n');
  }

  // ===================== OUTPUT 3: SECTIONS js (format NewAdminUI) =====================

  function jsStr(s) {
    return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
  }

  function buildFieldLine(f, isLast) {
    var parts = ['label: ' + jsStr(f.label), 'type: ' + jsStr(f.type), 'required: ' + f.required];
    if (f.description) parts.push('description: ' + jsStr(f.description));
    if (f.type === 'multiple_choice') {
      var opts = f.options.slice();
      if (f.hasOther) opts.push('Other');
      parts.push('options: [' + opts.map(jsStr).join(', ') + ']');
    }
    return '      { ' + parts.join(', ') + ' }' + (isLast ? '' : ',') + (f.guessed ? ' /* ? verifikasi tipe */' : '');
  }

  function buildJs(sections) {
    var out = [];
    out.push('// Digenerate dari Google Form "' + FORM_TITLE + '" oleh Tools/Extract_GForm.js');
    out.push('// Tempel ke Create_<Event>.js. Tipe bertanda /* ? */ adalah tebakan - verifikasi manual.');
    out.push('var SECTIONS = [');
    sections.forEach(function (s, si) {
      out.push('  {');
      out.push('    title: ' + jsStr(s.title) + ',');
      if (s.description) out.push('    description: ' + jsStr(s.description) + ',');
      if (!s.fields.length) {
        out.push('    fields: []');
      } else {
        out.push('    fields: [');
        s.fields.forEach(function (f, fi) { out.push(buildFieldLine(f, fi === s.fields.length - 1)); });
        out.push('    ]');
      }
      out.push('  }' + (si < sections.length - 1 ? ',' : ''));
    });
    out.push('];');
    return out.join('\n');
  }

  // ===================== RUN =====================

  var sections = assignKeys(parseSections());
  var fieldCount = sections.reduce(function (a, s) { return a + s.fields.length; }, 0);
  var guessed = [];
  sections.forEach(function (s) {
    s.fields.forEach(function (f) { if (f.guessed) guessed.push(f.label + '  ->  ' + f.type + ' (' + f.gTypeName + ')'); });
  });

  var out = {
    title: FORM_TITLE,
    sections: sections,
    raw: buildRaw(sections),
    tabled: buildTabled(sections),
    js: buildJs(sections)
  };
  window.__GFORM_OUT = out;

  console.log('%c═══ ' + FORM_TITLE + ' ═══', 'color:#6366f1;font-weight:bold;font-size:14px');
  console.log(sections.length + ' section, ' + fieldCount + ' field.');
  console.log('%c--- 1. RAW txt ---', 'color:#6366f1;font-weight:bold');
  console.log(out.raw);
  console.log('%c--- 2. Tabled md ---', 'color:#6366f1;font-weight:bold');
  console.log(out.tabled);
  console.log('%c--- 3. SECTIONS js ---', 'color:#6366f1;font-weight:bold');
  console.log(out.js);

  if (guessed.length) {
    console.warn('%c' + guessed.length + ' tipe ditebak dari kata kunci - VERIFIKASI MANUAL:', 'color:#f59e0b;font-weight:bold');
    guessed.forEach(function (g) { console.warn('  ' + g); });
  }
  console.log('%cAmbil hasil: copy(__GFORM_OUT.raw) / copy(__GFORM_OUT.tabled) / copy(__GFORM_OUT.js)', 'color:#22c55e;font-weight:bold');
  try {
    copy(out.tabled);
    console.log('(Tabled md sudah disalin ke clipboard.)');
  } catch (e) {
    // copy() hanya tersedia di DevTools console - diabaikan kalau script dijalankan dari tempat lain
  }
})();
