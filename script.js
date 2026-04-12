/* script.js */

// --- GENERATIVE PRELOADER LOGIC ---
(function() {
  const preloader = document.getElementById('generative-preloader');
  if (!preloader) return;

  // 1. Cek apakah di session ini sudah pernah muncul preloader
  if (sessionStorage.getItem('visitedBefore')) {
    preloader.style.display = 'none'; // Langsung hilangkan tanpa animasi
    document.body.style.overflow = 'auto'; // Pastikan bisa scroll
    return;
  }

  // 2. Jika baru pertama kali buka (dalam session ini), jalankan animasi
  document.body.style.overflow = 'hidden'; // Kunci scroll

  const preloaderText = document.getElementById('preloader-text');
  const preloaderBar = document.getElementById('preloader-bar');
  const finalString = "INITIATING_SYSTEM...";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  
  let progress = 0;
  let textIterations = 0;

  // Animasi Glitch Text
  const textInterval = setInterval(() => {
    preloaderText.innerText = finalString.split("").map((char, index) => {
      if (index < textIterations) return finalString[index];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");

    if (textIterations >= finalString.length) clearInterval(textInterval);
    textIterations += 1 / 2;
  }, 40);

  // Fake Loading Progress
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15; 
    if (progress > 100) progress = 100;
    preloaderBar.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(progressInterval);
      
      setTimeout(() => {
        preloaderText.innerText = "SYSTEM_READY";
        
        setTimeout(() => {
           preloader.classList.add('hidden');
           document.body.style.overflow = 'auto';
           // 3. SET TANDA: Sudah pernah load di session ini
           sessionStorage.setItem('visitedBefore', 'true');
        }, 400);
      }, 300);
    }
  }, 100);
})();

// ... (SISA KODE LU SEPERTI BIASA) ...

/* script.js */

document.addEventListener('DOMContentLoaded', function() {

  // --- MAGNETIC BUTTON LOGIC ---
  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach((elem) => {
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      
      // Hitung posisi mouse relatif terhadap titik tengah elemen
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // x * 0.3 dan y * 0.3 itu kekuatan tarikannya. 
      // Makin gede angkanya, makin jauh tombolnya ketarik.
      elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    elem.addEventListener('mouseleave', () => {
      // Balikin ke posisi center (0,0) secara mulus pas mouse keluar
      elem.style.transform = 'translate(0px, 0px)';
    });
  });
  
  // --- RAW MODE TOGGLE LOGIC ---
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const body = document.body;

  function setRawMode(isRaw) {
    if (isRaw) {
      body.classList.add('raw-mode');
      localStorage.setItem('theme', 'raw');
      if (themeToggle) themeToggle.textContent = 'Clean Mode';
      if (themeToggleMobile) themeToggleMobile.textContent = 'Clean Mode';
    } else {
      body.classList.remove('raw-mode');
      localStorage.setItem('theme', 'clean');
      if (themeToggle) themeToggle.textContent = 'Raw Mode';
      if (themeToggleMobile) themeToggleMobile.textContent = 'Toggle Raw Mode';
    }
  }

  // Cek apakah user sebelumnya udah milih raw mode
  if (localStorage.getItem('theme') === 'raw') {
    setRawMode(true);
  }

  // Event listener desktop
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isCurrentlyRaw = body.classList.contains('raw-mode');
      setRawMode(!isCurrentlyRaw);
    });
  }

  // Event listener mobile menu
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', function(e) {
      e.preventDefault();
      const isCurrentlyRaw = body.classList.contains('raw-mode');
      setRawMode(!isCurrentlyRaw);
    });
  }

  // --- HAMBURGER MENU LOGIC ---
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  // --- SCROLL ACTIONS ---
  var mobileCta = document.getElementById('mobileCta');
  var backToTop = document.getElementById('backToTop');
  var heroElement = document.querySelector('.hero') || document.querySelector('.about-hero');

  window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY;
    var triggerHeight = heroElement ? heroElement.offsetHeight : 300;

    if (mobileCta) {
      if (scrollPos > triggerHeight) mobileCta.classList.add('visible');
      else mobileCta.classList.remove('visible');
    }

    if (backToTop) {
      if (scrollPos > 500) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

var projects = [
  {
    tag: 'UI/UX Design',
    title: 'Kompas <em>NFT</em>',
    sub: 'Case study for the Kompas NFT project, focusing on UI/UX design, competitor analysis, and seamless integration for Kompas Daily.',
    year: '2022',
    role: 'Sole UI/UX Designer',
    tools: 'Figma',
    cover: 'thumbnail_1.jpg',
    body: '<h2>Overview</h2><p>Designed the end to end UI/UX for the Kompas NFT project within the Product and Development division at Kompas Daily.</p><h2>Process</h2><p>Conducted extensive competitor analysis, established the core design system, and collaborated seamlessly with the engineering team to ensure high fidelity implementation.</p><h2>Outcome</h2><p>Successfully launched the platform, delivering a smooth and intuitive experience for users navigating the NFT ecosystem.</p>'
  },
  {
    tag: 'Website Design',
    title: 'Nama Project <em>Kedua</em>',
    sub: 'A detailed overview of this website design project, the strategy, visual language, and execution that brought it to life.',
    year: '2025',
    role: 'UI/UX Designer',
    tools: 'Figma, Webflow',
    cover: 'thumbnail_2.jpg',
    body: '<h2>Overview</h2><p>Describe the project context and goals here.</p><h2>Process</h2><p>Walk through your design process.</p><h2>Outcome</h2><p>What was the final result?</p>'
  },
  {
    tag: 'Motion Design',
    title: 'Nama Project <em>Ketiga</em>',
    sub: 'A motion design project exploring dynamic storytelling through animation and visual rhythm.',
    year: '2024',
    role: 'Motion Designer',
    tools: 'After Effects, Rive',
    cover: 'thumbnail_3.jpg',
    body: '<h2>Overview</h2><p>Describe the project context and goals here.</p><h2>Process</h2><p>Walk through your design process.</p><h2>Outcome</h2><p>What was the final result?</p>'
  },
  {
    tag: 'Mobile Design',
    title: 'Nama Project <em>Keempat</em>',
    sub: 'A mobile app design project focused on delightful micro interactions and seamless user flows.',
    year: '2024',
    role: 'Product Designer',
    tools: 'Figma, Principle',
    cover: 'thumbnail_4.jpg',
    body: '<h2>Overview</h2><p>Describe the project context and goals here.</p><h2>Process</h2><p>Walk through your design process.</p><h2>Outcome</h2><p>What was the final result?</p>'
  }
];

function openProject(idx) {
  var overlay = document.getElementById('projectOverlay');
  if (!overlay) return;
  
  var p = projects[idx];
  document.getElementById('overlayTag').textContent = p.tag;
  document.getElementById('overlayTitle').innerHTML = p.title;
  document.getElementById('overlayTitleNav').innerHTML = p.title;
  document.getElementById('overlaySub').textContent = p.sub;
  document.getElementById('overlayYear').textContent = p.year;
  document.getElementById('overlayRole').textContent = p.role;
  document.getElementById('overlayTools').textContent = p.tools;
  
  document.getElementById('overlayCover').innerHTML = '<img src="' + p.cover + '" alt="Project Cover">';
  
  document.getElementById('overlayBody').innerHTML = p.body;
  
  overlay.classList.add('active');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  var overlay = document.getElementById('projectOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function toggleFaq(item) {
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(el) { el.classList.remove('open'); });
  if (!isOpen) item.classList.add('open');
}