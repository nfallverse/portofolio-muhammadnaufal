// ==========================================================================
// TAILWIND CONFIGURATION & THEMING
// ==========================================================================
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        obsidian: {
          950: '#0c0a09',
          900: '#14110f',
          850: '#1a1613',
          800: '#221d19',
          700: '#2d2722',
        },
        chalk: {
          50: '#faf7f4',
          100: '#f3ede6',
          200: '#e7ded4',
          300: '#d7cbbd',
          800: '#38322c',
          900: '#1a1714',
        },
        ember: {
          300: '#fba76a',
          400: '#f58a47',
          500: '#e86a33',
          600: '#c24d1a',
          700: '#943812',
          800: '#5a2109',
        }
      }
    }
  }
};

// ==========================================================================
// DARK / LIGHT THEME TOGGLE SYSTEM
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    updateThemeIcons(false);
  } else if (savedTheme === 'dark' || prefersDark || !savedTheme) {
    document.documentElement.classList.add('dark');
    updateThemeIcons(true);
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcons(isDark);
  if (typeof resizeSculptureCanvas === 'function') {
    resizeSculptureCanvas();
  }
}

function updateThemeIcons(isDark) {
  const sunIcons = document.querySelectorAll('.theme-sun-icon');
  const moonIcons = document.querySelectorAll('.theme-moon-icon');
  
  sunIcons.forEach(el => el.classList.toggle('hidden', !isDark));
  moonIcons.forEach(el => el.classList.toggle('hidden', isDark));
}

// ==========================================================================
// MOBILE DRAWER NAVIGATION
// ==========================================================================
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.toggle('hidden');
}

// ==========================================================================
// SCROLLSPY / ACTIVE NAV HIGHLIGHT
// ==========================================================================
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 140;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-ember-500', 'font-semibold');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('text-ember-500', 'font-semibold');
      }
    });
  }, { passive: true });
}

// ==========================================================================
// DATA PROYEK (DALAM BAHASA INDONESIA)
// ==========================================================================
const projectsData = [
  {
    index: "01 // HARDWARE & CASING 3D",
    title: "Jam Digital IoT Running-Text",
    desc: "Pemodelan 3D jam meja digital berbasis IoT dengan layar matriks LED running-text. Dirancang langsung di Blender dengan bentuk casing ergonomis kustom, slot dudukan baut dan modul mikrokontroler internal, serta topologi yang rapi siap untuk cetak 3D maupun showcase interaktif.",
    stack: "Blender • Desain Casing 3D • Model IoT • Enclosure Low-Poly",
    specs: "Casing Kustom • Layar LED Running-Text • Topologi Quad Rapi"
  },
  {
    index: "02 // KUMPULAN MODEL 3D LOW-POLY",
    title: "Koleksi Objek Low-Poly Sehari-hari",
    desc: "Paket aset 3D low-poly bergaya stylized: botol air mineral bertekstur transparan, gelas kaca, bungkus snack makanan ringan, keranjang buah anyaman, dan buah apel segar. Dibuat dengan jumlah poligon minimal agar sangat ringan dibuka di web maupun game.",
    stack: "Blender • Model Low-Poly • Palet Warna Stylized • Ekspor GLTF",
    specs: "Di Bawah 500 Tris per Objek • Sangat Ringan • Siap Pakai"
  },
  {
    index: "03 // MODEL KENDARAAN 3D",
    title: "Mobil Cruiser Bergaya Low-Poly",
    desc: "Model 3D kendaraan low-poly dengan garis bodi tegas dan aerodinamis. Memiliki hierarki struktur roda terpisah sehingga siap digerakkan atau dianimasikan pada viewport web 3D dan game tanpa membebani performa perangkat.",
    stack: "Blender • Kendaraan Low-Poly • Hierarki Roda Rapi • Pewarnaan PBR",
    specs: "Geometri Ringan • Roda Modular • Lancar 60 FPS di Web"
  }
];

function openProjectModal(idx) {
  const p = projectsData[idx];
  if (!p) return;
  
  document.getElementById('modalProjectIndex').textContent = p.index;
  document.getElementById('modalProjectTitle').textContent = p.title;
  document.getElementById('modalProjectDesc').textContent = p.desc;
  document.getElementById('modalProjectStack').textContent = p.stack;
  document.getElementById('modalProjectSpecs').textContent = p.specs;
  
  const modal = document.getElementById('projectModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function openHireModal() {
  const feedback = document.getElementById('contactFeedback');
  if (feedback) feedback.classList.add('hidden');
  
  const modal = document.getElementById('hireModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

// Menutup modal dengan tombol Escape pada keyboard
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal('projectModal');
    closeModal('hireModal');
  }
});

// Menutup modal jika area luar (backdrop) diklik
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      backdrop.classList.add('hidden');
      backdrop.classList.remove('flex');
      document.body.style.overflow = '';
    }
  });
});

// Fitur Salin Email Cepat dengan Clipboard API
async function copyEmail() {
  const email = document.getElementById('emailText').textContent.trim();
  const btn = document.getElementById('copyEmailBtn');
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
    } else {
      const tempInput = document.createElement('input');
      tempInput.value = email;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    }
    
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="text-ember-400 font-bold">✓ Tersalin!</span>`;
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2200);
  } catch (err) {
    console.error('Gagal menyalin: ', err);
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  const feedback = document.getElementById('contactFeedback');
  if (feedback) feedback.classList.remove('hidden');
  e.target.reset();
}

// ==========================================================================
// FILTER PROYEK
// ==========================================================================
function filterCreations(tag, btnEl) {
  const cards = document.querySelectorAll('.creation-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const tags = card.getAttribute('data-tags') || '';
    if (tag === 'all' || tags.includes(tag)) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(b => {
    b.classList.remove('bg-ember-500/20', 'border-ember-500/50', 'text-ember-400', 'font-semibold');
    b.classList.add('text-secondary');
  });

  if (btnEl) {
    btnEl.classList.add('bg-ember-500/20', 'border-ember-500/50', 'text-ember-400', 'font-semibold');
  }

  const countBadge = document.getElementById('projectCountLabel');
  if (countBadge) {
    countBadge.textContent = `0${visibleCount} Proyek`;
  }
}

// ==========================================================================
// ALUR KERJA (PIPELINE) DALAM BAHASA INDONESIA
// ==========================================================================
const pipelineDescriptions = [
  "Pemodelan 3D di Blender: Membentuk siluet objek low-poly yang rapi (botol, gelas, snack, mobil, hingga casing jam IoT) dengan sebaran titik yang teratur dan efisien.",
  "Vibe Coding Berbantuan AI: Menerjemahkan ide dan rancangan visual secara cepat ke dalam kode HTML, Tailwind CSS, dan JavaScript modern dengan bantuan alur kerja AI cerdas.",
  "Optimasi Palet & Aset: Menjaga jumlah poligon tetap minimal, mengatur palet warna yang menarik, dan mengekspor ke format GLTF/GLB yang super ringan untuk web.",
  "Terus Meningkatkan Keahlian: Selalu meluangkan waktu untuk belajar teknik baru, mulai dari kerapian topologi hard-surface, pencahayaan, hingga integrasi 3D ke web."
];

function activatePipelineNode(index) {
  for (let i = 0; i < 4; i++) {
    const node = document.getElementById(`pNode-${i}`);
    const dot = document.getElementById(`pDot-${i}`);
    const indicator = document.getElementById(`pStepIndicator-${i}`);
    if (!node) continue;
    
    if (i === index) {
      node.className = 'pipeline-btn sculpted-card p-5 text-left border-ember-500 bg-ember-500/10 shadow-md cursor-pointer transition-all duration-300 flex flex-col justify-between';
      if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-ember-500 shadow-[0_0_8px_#e86a33]';
      if (indicator) indicator.className = 'w-3.5 h-3.5 rounded-full bg-ember-500 ring-4 ring-ember-500/25 transition-all';
    } else {
      node.className = 'pipeline-btn sculpted-card p-5 text-left border-neutral-300 dark:border-neutral-800 cursor-pointer transition-all duration-300 flex flex-col justify-between';
      if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-neutral-400';
      if (indicator) indicator.className = 'w-3 h-3 rounded-full bg-neutral-400 dark:bg-neutral-700 transition-all';
    }
  }
  
  const textEl = document.getElementById('pipelineDetailText');
  if (textEl) {
    textEl.textContent = pipelineDescriptions[index];
  }
}

// ==========================================================================
// INTERACTIVE 3D CANVAS SANDBOX (ENGINE MATEMATIKA 3D DI ATAS CANVAS 2D)
// ==========================================================================
let sculptureCanvas = null;
let sCtx = null;
let rotY = 0.65;
let rotX = 0.42;
let autoSpin = true;
let renderMode = 'shaded';
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

function resizeSculptureCanvas() {
  if (!sculptureCanvas || !sCtx) return;
  const parent = sculptureCanvas.parentElement;
  if (!parent) return;
  
  const rect = parent.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  sculptureCanvas.width = rect.width * dpr;
  sculptureCanvas.height = rect.height * dpr;
  sCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function setSculptureMode(mode) {
  renderMode = mode;
  const shadedBtn = document.getElementById('modeShadedBtn');
  const wireBtn = document.getElementById('modeWireBtn');
  
  if (mode === 'shaded') {
    if (shadedBtn) shadedBtn.className = 'px-3.5 py-2 rounded-xl text-xs font-mono bg-ember-500/20 border border-ember-500 text-ember-400 font-medium cursor-pointer transition-all';
    if (wireBtn) wireBtn.className = 'px-3.5 py-2 rounded-xl text-xs font-mono btn-ghost text-xs cursor-pointer transition-all';
  } else {
    if (wireBtn) wireBtn.className = 'px-3.5 py-2 rounded-xl text-xs font-mono bg-ember-500/20 border border-ember-500 text-ember-400 font-medium cursor-pointer transition-all';
    if (shadedBtn) shadedBtn.className = 'px-3.5 py-2 rounded-xl text-xs font-mono btn-ghost text-xs cursor-pointer transition-all';
  }
}

function toggleAutoSpin() {
  autoSpin = !autoSpin;
  const btn = document.getElementById('spinToggleBtn');
  if (btn) {
    btn.textContent = `Putar Otomatis: ${autoSpin ? 'AKTIF' : 'NONAKTIF'}`;
  }
}

function init3DCanvas() {
  sculptureCanvas = document.getElementById('sculptureCanvas');
  if (sculptureCanvas && typeof sculptureCanvas.getContext === 'function') {
    sCtx = sculptureCanvas.getContext('2d');

    // Penanganan Pointer & Sentuhan Layar HP (Touch Event)
    sculptureCanvas.addEventListener('pointerdown', (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      try { sculptureCanvas.setPointerCapture(e.pointerId); } catch (_) {}
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.011;
      rotX = Math.max(-1.15, Math.min(1.15, rotX + dy * 0.011));
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    const stopDrag = (e) => {
      if (isDragging) {
        isDragging = false;
        try { sculptureCanvas.releasePointerCapture(e.pointerId); } catch (_) {}
      }
    };
    window.addEventListener('pointerup', stopDrag);
    window.addEventListener('pointercancel', stopDrag);

    resizeSculptureCanvas();
    animateSculpture();
  }
}

function project3D(x, y, z, cx, cy, scale) {
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const y2 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  const fov = 4.4;
  const factor = fov / (fov + z2);
  return {
    x: cx + x1 * scale * factor,
    y: cy + y2 * scale * factor,
    z: z2
  };
}

function drawCube(cx, cy, scale, ox, oy, oz, size, palette, isDark) {
  const s = size / 2;
  const verts = [
    [ox - s, oy - s, oz - s], [ox + s, oy - s, oz - s],
    [ox + s, oy + s, oz - s], [ox - s, oy + s, oz - s],
    [ox - s, oy - s, oz + s], [ox + s, oy - s, oz + s],
    [ox + s, oy + s, oz + s], [ox - s, oy + s, oz + s]
  ].map(v => project3D(v[0], v[1], v[2], cx, cy, scale));

  const faces = [
    { idx: [0, 1, 2, 3], color: palette.front },
    { idx: [1, 5, 6, 2], color: palette.right },
    { idx: [5, 4, 7, 6], color: palette.back },
    { idx: [4, 0, 3, 7], color: palette.left },
    { idx: [4, 5, 1, 0], color: palette.top },
    { idx: [3, 2, 6, 7], color: palette.bottom }
  ];

  faces.sort((a, b) => {
    const za = a.idx.reduce((sum, i) => sum + verts[i].z, 0) / 4;
    const zb = b.idx.reduce((sum, i) => sum + verts[i].z, 0) / 4;
    return zb - za;
  });

  faces.forEach(f => {
    sCtx.beginPath();
    f.idx.forEach((vi, k) => {
      if (k === 0) sCtx.moveTo(verts[vi].x, verts[vi].y);
      else sCtx.lineTo(verts[vi].x, verts[vi].y);
    });
    sCtx.closePath();

    if (renderMode === 'shaded') {
      sCtx.fillStyle = f.color;
      sCtx.fill();
      sCtx.strokeStyle = isDark ? 'rgba(245, 240, 235, 0.22)' : 'rgba(25, 22, 20, 0.15)';
      sCtx.lineWidth = 1;
      sCtx.stroke();
    } else {
      sCtx.fillStyle = isDark ? 'rgba(232, 106, 51, 0.08)' : 'rgba(217, 88, 41, 0.06)';
      sCtx.fill();
      sCtx.strokeStyle = '#e86a33';
      sCtx.lineWidth = 1.3;
      sCtx.stroke();
    }
  });
}

function animateSculpture() {
  if (!sculptureCanvas || !sCtx) return;
  const rect = sculptureCanvas.parentElement.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  sCtx.clearRect(0, 0, w, h);

  if (autoSpin && !isDragging) {
    rotY += 0.007;
  }

  const isDark = document.documentElement.classList.contains('dark');
  const cx = w / 2;
  const cy = h / 2 + 8;
  const scale = Math.min(w, h) * 0.35;

  // Efek aura radial pada background
  const grad = sCtx.createRadialGradient(cx, cy, 10, cx, cy, scale * 1.6);
  if (isDark) {
    grad.addColorStop(0, 'rgba(232, 106, 51, 0.25)');
    grad.addColorStop(0.6, 'rgba(184, 88, 34, 0.06)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    grad.addColorStop(0, 'rgba(232, 106, 51, 0.18)');
    grad.addColorStop(0.6, 'rgba(232, 106, 51, 0.04)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, w, h);

  // Palet menyesuaikan tema Gelap & Terang
  const warmMarble = isDark
    ? { top: '#ebe2d8', front: '#d98a5b', right: '#9e532b', left: '#c4b5a7', back: '#59331e', bottom: '#261b15' }
    : { top: '#ffffff', front: '#e89c72', right: '#b86333', left: '#d4c4b5', back: '#7a4224', bottom: '#42281a' };

  const emberAccent = isDark
    ? { top: '#fba76a', front: '#e86a33', right: '#9e461b', left: '#d45e28', back: '#542008', bottom: '#291005' }
    : { top: '#ff9d5c', front: '#d95829', right: '#8c3311', left: '#b8461b', back: '#542008', bottom: '#291005' };

  const basePlinth = isDark
    ? { top: '#382d27', front: '#29201b', right: '#1c1613', left: '#302621', back: '#171210', bottom: '#120e0c' }
    : { top: '#dcd2c7', front: '#b8a99c', right: '#948375', left: '#c5b5a7', back: '#7d6e60', bottom: '#5c4e42' };

  // Alas tumpuan (Pedestal)
  drawCube(cx, cy, scale, 0, 0.72, 0, 1.35, basePlinth, isDark);
  // Balok utama
  drawCube(cx, cy, scale, 0, 0.05, 0, 0.92, warmMarble, isDark);

  // Balok satelit melayang
  const floatOffset = Math.sin(Date.now() * 0.0028) * 0.075;
  drawCube(cx, cy, scale, -0.78, -0.24 + floatOffset, 0.45, 0.34, emberAccent, isDark);
  drawCube(cx, cy, scale, 0.76, -0.42 - floatOffset, -0.35, 0.36, warmMarble, isDark);
  drawCube(cx, cy, scale, 0.16, -0.76 + floatOffset * 0.7, 0.35, 0.42, emberAccent, isDark);

  requestAnimationFrame(animateSculpture);
}

// ==========================================================================
// THUMBNAIL KANVAS KHUSUS KARYA USER
// ==========================================================================
function renderThumbnails() {
  // 1. Thumbnail Jam Digital IoT Running-Text dengan casing kustom
  const c1 = document.getElementById('thumbNeon');
  if (c1 && typeof c1.getContext === 'function') {
    c1.width = 440; c1.height = 260;
    const ctx = c1.getContext('2d');
    
    // Latar belakang gradient
    const bg = ctx.createLinearGradient(0, 0, 440, 260);
    bg.addColorStop(0, '#100d14');
    bg.addColorStop(0.6, '#18131e');
    bg.addColorStop(1, '#0e0b12');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 440, 260);

    // Permukaan meja
    const desk = ctx.createLinearGradient(0, 185, 0, 260);
    desk.addColorStop(0, '#1a1422');
    desk.addColorStop(1, '#0c0910');
    ctx.fillStyle = desk;
    ctx.fillRect(0, 185, 440, 75);

    // Bayangan objek jam
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.ellipse(220, 205, 140, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bodi Casing 3D Kustom
    ctx.fillStyle = '#221a2c';
    ctx.strokeStyle = '#e86a33';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(75, 75, 290, 115, 16);
    ctx.fill();
    ctx.stroke();

    // Bingkai Layar Display
    ctx.fillStyle = '#0a080e';
    ctx.strokeStyle = 'rgba(232, 106, 51, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(95, 92, 250, 78, 8);
    ctx.fill();
    ctx.stroke();

    // Teks Running-Text LED Oranye
    ctx.shadowBlur = 16;
    ctx.shadowColor = '#f97316';
    ctx.fillStyle = '#fb923c';
    ctx.font = '600 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText("08:45  [IOT AKTIF]", 220, 138);

    // Titik matriks LED tipis
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(251, 146, 60, 0.15)';
    for (let x = 105; x < 335; x += 14) {
      for (let y = 102; y < 162; y += 10) {
        ctx.fillRect(x, y, 2.5, 2.5);
      }
    }

    // Tombol kontrol atas pada casing
    ctx.fillStyle = '#e86a33';
    ctx.fillRect(180, 67, 80, 8);
  }

  // 2. Thumbnail Aset Low-Poly (Botol Mineral, Gelas, Snack, Keranjang & Apel)
  const c2 = document.getElementById('thumbCanyon');
  if (c2 && typeof c2.getContext === 'function') {
    c2.width = 440; c2.height = 260;
    const ctx = c2.getContext('2d');
    
    // Suasana studio hangat
    const sky = ctx.createLinearGradient(0, 0, 0, 260);
    sky.addColorStop(0, '#261b15');
    sky.addColorStop(0.7, '#42281b');
    sky.addColorStop(1, '#1a110b');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 440, 260);

    // Permukaan meja
    ctx.fillStyle = '#1c130d';
    ctx.beginPath();
    ctx.moveTo(30, 200);
    ctx.lineTo(410, 200);
    ctx.lineTo(440, 260);
    ctx.lineTo(0, 260);
    ctx.fill();

    // Bayangan objek
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(130, 205, 35, 12, 0, 0, Math.PI * 2);
    ctx.ellipse(220, 212, 50, 15, 0, 0, Math.PI * 2);
    ctx.ellipse(320, 208, 40, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Botol Air Mineral Low-Poly (Kiri)
    ctx.fillStyle = '#38bdf8';
    ctx.strokeStyle = '#7dd3fc';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(115, 195);
    ctx.lineTo(145, 195);
    ctx.lineTo(148, 120);
    ctx.lineTo(138, 95);
    ctx.lineTo(138, 80);
    ctx.lineTo(122, 80);
    ctx.lineTo(122, 95);
    ctx.lineTo(112, 120);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Tutup botol
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(120, 75, 20, 10);

    // Keranjang Anyam & Apel Low-Poly (Tengah)
    ctx.fillStyle = '#b45309';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(175, 175);
    ctx.lineTo(265, 175);
    ctx.lineTo(250, 215);
    ctx.lineTo(190, 215);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Buah Apel
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(220, 168, 20, 0, Math.PI * 2);
    ctx.fill();
    // Tangkai apel
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(220, 150);
    ctx.lineTo(223, 138);
    ctx.stroke();

    // Bungkus Snack & Gelas (Kanan)
    ctx.fillStyle = '#ea580c';
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(290, 110, 50, 85, 4);
    ctx.fill();
    ctx.stroke();
    // Label snack
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(298, 130, 34, 18);

    // Gelas kaca
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.strokeStyle = '#f5f5f4';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(355, 195);
    ctx.lineTo(390, 195);
    ctx.lineTo(398, 130);
    ctx.lineTo(348, 130);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

// ==========================================================================
// SCROLL REVEAL OBSERVER
// ==========================================================================
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements || elements.length === 0) return;
  
  document.documentElement.classList.add('js-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ==========================================================================
// INISIALISASI
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  try { initTheme(); } catch (e) { console.error('initTheme error:', e); }
  try { initScrollspy(); } catch (e) { console.error('initScrollspy error:', e); }
  try { initScrollReveal(); } catch (e) { console.error('initScrollReveal error:', e); }
  try { init3DCanvas(); } catch (e) { console.error('init3DCanvas error:', e); }
  try { renderThumbnails(); } catch (e) { console.error('renderThumbnails error:', e); }
});

window.addEventListener('resize', () => {
  if (typeof resizeSculptureCanvas === 'function') {
    resizeSculptureCanvas();
  }
});
