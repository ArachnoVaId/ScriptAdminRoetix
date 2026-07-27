(async () => {
  const TIERS = [
    { name: 'Kioku Lantai 2 Timur',       color: '#93C47D', maxCap: 832,  quota: 512 },
    { name: 'Kioku Lantai 2 Barat',       color: '#93C47D', maxCap: 690,  quota: 370 },
    { name: 'Kizuna Lantai 1 Timur',      color: '#CC0000', maxCap: 242,  quota: 167 },
    { name: 'Kizuna Lantai 1 Barat',      color: '#CC0000', maxCap: 242,  quota: 167 },
    { name: 'Tomodachi Lantai 2 Utara',   color: '#FFD966', maxCap: 1075, quota: 880 },
    { name: 'Tomodachi Lantai 2 Selatan', color: '#FFD966', maxCap: 1110, quota: 915 },
    { name: 'Nakama Lantai 1 Utara',      color: '#6D9EEB', maxCap: 362,  quota: 272 },
    { name: 'Nakama Lantai 1 Selatan',    color: '#6D9EEB', maxCap: 362,  quota: 272 },
  ];

  const TERMS = `<ol>
    <li>Untuk batas waktu pembayaran maksimal 3 jam. Jika melebihi jangka waktu tersebut, maka pesanan akan otomatis dibatalkan dan silakan melakukan pemesanan ulang.</li>
    <li>Entry Pass yang valid adalah yang dibeli melalui platform Roetix.</li>
    <li>Satu Entry Pass berlaku untuk satu orang.</li>
    <li>Panitia dan Promotor tidak bertanggung jawab serta tidak memberikan penggantian kerugian atas pembelian tiket acara melalui calo, tempat, kanal, platform, atau pihak yang bukan mitra resmi penjualan tiket Anime in Symphony.</li>
    <li>Tiket yang hilang atau dicuri tidak akan diganti atau diterbitkan ulang meskipun memiliki bukti pembelian. Tiket merupakan tanggung jawab pembeli.</li>
    <li>Panitia acara, Promotor, dan Pengisi Acara tidak bertanggung jawab atas biaya transportasi maupun akomodasi yang telah dikeluarkan penonton apabila acara dibatalkan atau dipindahkan ke hari dan/atau waktu lain.</li>
    <li>Dalam keadaan kahar seperti bencana alam, kerusuhan, perang, wabah, dan keadaan darurat lainnya yang diumumkan secara resmi oleh Pemerintah, Panitia/Penyelenggara/Promotor berhak membatalkan dan/atau mengubah waktu acara maupun tata letak tempat tanpa pemberitahuan sebelumnya.</li>
    <li>Panitia/Penyelenggara/Promotor berhak merevisi waktu acara, tata letak tempat, dan kapasitas penonton tanpa pemberitahuan sebelumnya.</li>
    <li>Jika acara dibatalkan, Promotor akan mengembalikan dana pembelian tiket dalam jangka waktu yang akan diinformasikan lebih lanjut. Pengembalian dana dapat dikenakan potongan biaya bank, biaya administrasi, dan biaya lain yang timbul dalam proses transfer dana kepada pelanggan.</li>
    <li>Panitia acara, penanggung jawab tempat acara, Promotor, dan Pengisi Acara tidak bertanggung jawab atas kehilangan barang pribadi maupun kejadian yang mengakibatkan cedera selama acara berlangsung.</li>
    <li>Harap membawa kartu identitas asli dan e-Ticket dari Roetix saat melakukan penukaran tiket.</li>
    <li>Kami menyarankan para penonton menggunakan transportasi online saat datang ke GOR UNY.</li>
    <li>
        Promotor berhak untuk:
        <ul>
            <li>Melarang penonton masuk jika Entry Pass telah digunakan oleh orang lain.</li>
            <li>Melarang penonton masuk ke area GOR UNY jika Entry Pass yang digunakan tidak valid.</li>
            <li>Memproses atau mengajukan tindakan hukum, baik perdata maupun pidana, terhadap pengunjung yang memperoleh Entry Pass secara tidak sah, termasuk pemalsuan, penggandaan, atau perolehan Entry Pass yang tidak sesuai prosedur.</li>
            <li>Mengeluarkan pengunjung dari area GOR UNY apabila tidak mematuhi protokol kesehatan yang berlaku.</li>
        </ul>
    </li>
    <li>
        Barang yang diperbolehkan dibawa ke dalam venue:
        <ul>
            <li>Kartu identitas dan uang pribadi.</li>
            <li>Bukti tiket atau tanda masuk.</li>
            <li>Masker dan hand sanitizer.</li>
            <li>Obat-obatan pribadi.</li>
            <li>Jas hujan.</li>
            <li>Handphone atau perangkat elektronik lainnya.</li>
        </ul>
    </li>
    <li>
        Barang yang tidak diperbolehkan dibawa ke dalam GOR UNY:
        <ul>
            <li>Makanan dan minuman dari luar.</li>
            <li>Kamera profesional seperti Drone, SLR, dan DSLR.</li>
            <li>Tongsis atau selfie stick.</li>
            <li>Minuman beralkohol, obat-obatan terlarang, psikotropika, atau barang yang mengandung zat berbahaya lainnya.</li>
            <li>Senjata tajam, senjata api, bahan peledak, dan benda lain yang dilarang oleh peraturan perundang-undangan yang berlaku.</li>
            <li>Cairan dan benda yang mudah terbakar.</li>
            <li>Tas atau ransel berukuran besar.</li>
            <li>Laser dan pointer.</li>
            <li>Rokok, vape, rokok elektrik, dan sejenisnya.</li>
            <li>Barang yang berbahaya bagi diri sendiri maupun orang lain meskipun tidak disebutkan secara eksplisit pada daftar di atas.</li>
        </ul>
    </li>
    <li>Pihak Promotor/Penyelenggara berhak mengambil, menyita, dan tidak mengembalikan barang terlarang yang ditemukan saat pemeriksaan barang.</li>
    <li>Dilarang merokok di dalam area GOR UNY.</li>
    <li>Dilarang membuat kerusuhan dalam situasi apa pun di dalam area GOR UNY.</li>
    <li><strong>Saya telah membaca dan memahami syarat dan ketentuan pembelian serta penggunaan Entry Pass di atas. Apabila terdapat perubahan aturan dari Promotor, informasi akan diumumkan melalui akun media sosial resmi Promotor. Dengan ini saya menyatakan setuju untuk terikat secara hukum dengan seluruh syarat dan ketentuan yang berlaku.</strong></li>
</ol>`;

  const PRIVACY = `<li>
    <strong>Privasi Data dan Dokumentasi Acara</strong>
    <ul>
        <li>
            Dengan membeli tiket Anime in Symphony, pembeli menyetujui bahwa data pribadi yang diserahkan, termasuk namun tidak terbatas pada nama lengkap, alamat email, nomor telepon, dan data identitas, akan dikumpulkan dan disimpan oleh platform tiket (Roetix) dan pihak penyelenggara (Rumah Orkestra Jogja) untuk keperluan verifikasi serta administrasi acara.
        </li>
        <li>
            Penyelenggara menjamin bahwa data pribadi pembeli tidak akan diperjualbelikan kepada pihak ketiga. Data hanya akan digunakan untuk komunikasi terkait acara, pengiriman e-Ticket, serta pemberitahuan keadaan darurat yang berkaitan dengan penyelenggaraan acara.
        </li>
        <li>
            Dengan menghadiri acara di GOR UNY, penonton memberikan persetujuan kepada penyelenggara untuk mengambil foto, video, maupun rekaman suara selama acara berlangsung. Penyelenggara berhak menggunakan materi dokumentasi tersebut yang dapat menampilkan wajah, suara, atau citra penonton untuk keperluan promosi, publikasi, dokumentasi, dan kegiatan komersial lainnya di masa mendatang tanpa kewajiban memberikan kompensasi dalam bentuk apa pun kepada penonton.
        </li>
    </ul>
</li>`;

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  function log(msg) { console.log(`[Tier+Terms] ${msg}`); }

  function findTierGrid() {
    const grids = [...document.querySelectorAll('div[class*="grid"]')];
    return grids.find(g => {
      const t = g.textContent;
      return t.includes('Tier Name') && t.includes('Color') && t.includes('Max Capacity') && t.includes('Sales Quota') && g.querySelector('button');
    });
  }

  function setInputValue(input, value) {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function setColorValue(input, value) {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function injectReactValue(elementId, value) {
    const el = document.getElementById(elementId);
    if (!el) return false;
    const key = Object.keys(el).find(k => k.startsWith('__reactFiber$'));
    if (!key) return false;
    let fiber = el[key];
    let depth = 0;
    while (fiber && depth < 30) {
      const props = fiber.memoizedProps || {};
      if (props.onChange) {
        props.onChange({ target: { value } });
        return true;
      }
      fiber = fiber.return;
      depth++;
    }
    return false;
  }

  // ========== STEP 1: ADD TIERS ==========
  log('Adding 8 ticket tiers...');
  for (const tier of TIERS) {
    const grid = findTierGrid();
    if (!grid) { log(`ERROR: Tier grid not found for "${tier.name}"`); continue; }

    const divs = grid.querySelectorAll(':scope > div');
    const nameInput = divs[0]?.querySelector('input');
    const colorInput = divs[1]?.querySelector('input');
    const maxCapInput = divs[2]?.querySelector('input');
    const salesQuotaInput = divs[3]?.querySelector('input');
    const addBtn = grid.querySelector('button');

    if (!nameInput || !addBtn) { log(`ERROR: Inputs not found for "${tier.name}"`); continue; }

    setInputValue(nameInput, tier.name);
    await sleep(200);
    setColorValue(colorInput, tier.color);
    await sleep(200);
    setInputValue(maxCapInput, String(tier.maxCap));
    await sleep(200);
    setInputValue(salesQuotaInput, String(tier.quota));
    await sleep(500);

    for (let attempt = 0; attempt < 3; attempt++) {
      if (!addBtn.disabled) break;
      setInputValue(nameInput, '');
      await sleep(200);
      setInputValue(nameInput, tier.name);
      await sleep(500);
    }

    if (!addBtn.disabled) {
      addBtn.click();
      log(`  + ${tier.name} (${tier.color}, cap:${tier.maxCap}, quota:${tier.quota})`);
    } else {
      log(`  ERROR: Add button still disabled for "${tier.name}"`);
    }

    await sleep(2000);
  }

  // ========== STEP 2: SAVE CATEGORIES ==========
  log('Clicking "Save Categories"...');
  const saveCatBtn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Save Categories');
  if (saveCatBtn && !saveCatBtn.disabled) {
    saveCatBtn.click();
    log('  -> Save Categories clicked');
    await sleep(3000);
  } else {
    log('  -> Save Categories button not found or disabled');
  }

  // ========== STEP 3: TERMS & CONDITIONS ==========
  log('Setting Terms & Conditions...');
  const tncOk = injectReactValue('TNC', TERMS);
  log(`  -> TNC: ${tncOk ? 'injected' : 'fallback (native setter)'}`);
  if (!tncOk) {
    const ta = document.getElementById('TNC');
    if (ta) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      setter.call(ta, TERMS);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  // ========== STEP 4: PRIVACY POLICY ==========
  log('Setting Privacy Policy...');
  const ppOk = injectReactValue('privacy_policy', PRIVACY);
  log(`  -> Privacy Policy: ${ppOk ? 'injected' : 'fallback (native setter)'}`);
  if (!ppOk) {
    const ta = document.getElementById('privacy_policy');
    if (ta) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      setter.call(ta, PRIVACY);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  await sleep(1000);

  // ========== STEP 5: SAVE CHANGES ==========
  log('Clicking "Save Changes"...');
  const saveBtn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Save Changes');
  if (saveBtn && !saveBtn.disabled) {
    saveBtn.click();
    log('  -> Save Changes clicked');
    await sleep(3000);
  } else {
    log('  -> Save Changes button disabled or not found - may need manual save');
  }

  log('=== DONE! ===');
})();
