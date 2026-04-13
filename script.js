/* script.js */

// --- GENERATIVE PRELOADER LOGIC ---
(function() {
  const preloader = document.getElementById('generative-preloader');
  if (!preloader) return;

  if (sessionStorage.getItem('visitedBefore')) {
    preloader.style.display = 'none'; 
    document.body.style.overflow = 'auto'; 
    return;
  }

  document.body.style.overflow = 'hidden'; 

  const preloaderText = document.getElementById('preloader-text');
  const preloaderBar = document.getElementById('preloader-bar');
  const finalString = "INITIATING_SYSTEM...";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  
  let progress = 0;
  let textIterations = 0;

  const textInterval = setInterval(() => {
    preloaderText.innerText = finalString.split("").map((char, index) => {
      if (index < textIterations) return finalString[index];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");

    if (textIterations >= finalString.length) clearInterval(textInterval);
    textIterations += 1 / 2;
  }, 40);

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
           sessionStorage.setItem('visitedBefore', 'true');
        }, 400);
      }, 300);
    }
  }, 100);
})();


document.addEventListener('DOMContentLoaded', function() {

  // --- MAGNETIC BUTTON LOGIC ---
  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach((elem) => {
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    elem.addEventListener('mouseleave', () => {
      elem.style.transform = 'translate(0px, 0px)';
    });
  });
  
  // --- RAW MODE TOGGLE LOGIC (WITH UI SOUND) ---
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const body = document.body;

  const switchSound = new Audio('switch.mp3'); 
  switchSound.volume = 0.4; 

  function setRawMode(isRaw, playSound = true) {
    if (playSound) {
      switchSound.currentTime = 0;
      switchSound.play().catch(err => console.log("Audio blocked", err));
    }

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

  if (localStorage.getItem('theme') === 'raw') {
    setRawMode(true, false); 
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isCurrentlyRaw = body.classList.contains('raw-mode');
      setRawMode(!isCurrentlyRaw, true);
    });
  }

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', function(e) {
      e.preventDefault();
      const isCurrentlyRaw = body.classList.contains('raw-mode');
      setRawMode(!isCurrentlyRaw, true);
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

  // --- MOBILE ASSETS DROPDOWN ---
  var mobileAssetsToggle = document.getElementById('mobileAssetsToggle');
  var mobileAssetsMenu = document.getElementById('mobileAssetsMenu');

  if (mobileAssetsToggle && mobileAssetsMenu) {
    mobileAssetsToggle.addEventListener('click', function() {
      var isOpen = mobileAssetsToggle.classList.toggle('open');
      mobileAssetsMenu.style.maxHeight = isOpen ? mobileAssetsMenu.scrollHeight + 'px' : '0';
    });
  }

  // --- PROJECT FILTER LOGIC ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectRows = document.querySelectorAll('.project-row');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        projectRows.forEach(row => {
          if (filterValue === 'all' || row.getAttribute('data-category') === filterValue) {
            row.classList.remove('hide');
          } else {
            row.classList.add('hide');
          }
        });
      });
    });
  }

  // --- SCROLL ACTIONS & PROGRESS BAR ---
  var mobileCta = document.getElementById('mobileCta');
  var backToTop = document.getElementById('backToTop');
  var heroElement = document.querySelector('.hero') || document.querySelector('.about-hero');
  var scrollProgressBar = document.getElementById('scrollProgressBar'); 

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

    if (scrollProgressBar) {
      var totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrollPercent = (totalScroll / windowHeight) * 100;
      scrollProgressBar.style.width = scrollPercent + '%';
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- DYNAMIC TAB TITLE LOGIC ---
  const originalTitle = document.title;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.title = "Hey, come back! 👀";
    } else {
      document.title = originalTitle;
    }
  });

});

// --- PROJECT DATA ---
var projects = [
  {
    tag: 'UI/UX Design',
    title: 'Kompas <em>NFT</em>',
    sub: 'Case study for the Kompas NFT project, focusing on UI/UX design, competitor analysis, and seamless integration for Kompas Daily.',
    year: '2022',
    role: 'Sole UI/UX Designer',
    tools: 'Figma',
    cover: 'thumbnail_1.jpg',
    body: '<h2>Context</h2><p>Designed the end to end UI/UX for the Kompas NFT project within the Product and Development division at Kompas Daily.</p><h2>The Fix</h2><p>Conducted extensive competitor analysis, established the core design system, and collaborated seamlessly with the engineering team to ensure high fidelity implementation.</p><h2>Impact</h2><p>Successfully launched the platform, delivering a smooth and intuitive experience for users navigating the NFT ecosystem.</p>'
  },
  {
    tag: 'Graphic Design',
    title: 'Brand <em>Identity</em>',
    sub: 'A detailed overview of this graphic design project, the strategy, visual language, and execution that brought it to life.',
    year: '2025',
    role: 'Graphic Designer',
    tools: 'Illustrator, Photoshop',
    cover: 'thumbnail_2.jpg',
    body: '<h2>Context</h2><p>Describe the project context and goals here.</p><h2>The Fix</h2><p>Walk through your design process and visual strategy.</p><h2>Impact</h2><p>What was the final result and client reception?</p>'
  },
  {
    tag: 'Visual Art',
    title: 'Real Time Audio Visualizer & <em>Blob Tracking System</em>',
    sub: 'An interactive audio visual experiment that responds to motion and sound in real-time.',
    year: '2024',
    role: 'Creative Technologist',
    tools: 'TouchDesigner',
    cover: 'thumbnail_3.mp4',
    body: '<h2>Context</h2><p>I wanted to explore the relationship between physical movement and digital soundscapes. The goal was to build a system where the <strong>Real Time Audio Visualizer & Blob Tracking System</strong> acts as a digital mirror to human interaction.</p><h2>The Fix</h2><p>I built a custom setup using TouchDesigner that processes two live inputs simultaneously:</p><ul><li><strong>Optical Blob Tracking:</strong> Taking live camera feeds to map out human silhouettes and motion data.</li><li><strong>Audio Reactivity:</strong> Analyzing sound frequencies to distort and drive the 3D geometries and particle behaviors in real-time.</li></ul><h2>Impact</h2><p>The result is a highly immersive, tactile experience that bridges the physical and digital worlds. It proves how complex node-based systems can translate into organic, fluid visual art.</p>'
  },
  {
    tag: 'UI/UX Design',
    title: 'Mobile App <em>Flow</em>',
    sub: 'A mobile app design project focused on delightful micro-interactions and seamless user flows.',
    year: '2024',
    role: 'Product Designer',
    tools: 'Figma, Principle',
    cover: 'thumbnail_4.jpg',
    body: '<h2>Context</h2><p>Describe the problem users were facing with the mobile app.</p><h2>The Fix</h2><p>Explain how you simplified the flow and integrated micro-interactions.</p><h2>Impact</h2><p>Did engagement or completion rates improve?</p>'
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
  
  var coverElement = document.getElementById('overlayCover');
  if (p.cover.endsWith('.mp4') || p.cover.endsWith('.webm')) {
    coverElement.innerHTML = 
      '<video id="overlayVideo" src="' + p.cover + '" autoplay loop muted playsinline></video>' +
      '<button id="muteToggleBtn" class="video-mute-btn">Unmute</button>';
      
    var videoEl = document.getElementById('overlayVideo');
    var muteBtn = document.getElementById('muteToggleBtn');
    
    muteBtn.addEventListener('click', function() {
      videoEl.muted = !videoEl.muted;
      if(videoEl.muted) {
        muteBtn.textContent = 'Unmute';
      } else {
        muteBtn.textContent = 'Mute';
      }
    });

  } else {
    coverElement.innerHTML = '<img src="' + p.cover + '" alt="Project Cover">';
  }
  
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
    
    var videoEl = document.getElementById('overlayVideo');
    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute('src'); 
      videoEl.load();
    }
  }
}

function toggleFaq(item) {
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(el) { el.classList.remove('open'); });
  if (!isOpen) item.classList.add('open');
}