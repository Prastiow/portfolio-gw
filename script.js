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

  // --- MAGNETIC BUTTON LOGIC (OPTIMIZED) ---
  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach((elem) => {
    let rect;
    elem.addEventListener('mouseenter', () => {
      rect = elem.getBoundingClientRect(); // Cache rect on hover
    });

    elem.addEventListener('mousemove', (e) => {
      if (!rect) rect = elem.getBoundingClientRect(); // Fallback
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    elem.addEventListener('mouseleave', () => {
      elem.style.transform = 'translate(0px, 0px)';
      rect = null;
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
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  // --- PROJECT FILTER LOGIC ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectRows = document.querySelectorAll('.project-card');

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

  // --- SCROLL ACTIONS & PROGRESS BAR (THROTTLED) ---
  const mobileCta = document.getElementById('mobileCta');
  const backToTop = document.getElementById('backToTop');
  const heroElement = document.querySelector('.hero') || document.querySelector('.about-hero');
  const scrollProgressBar = document.getElementById('scrollProgressBar'); 

  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrollPos = window.scrollY;
        const triggerHeight = heroElement ? heroElement.offsetHeight : 300;

        if (mobileCta) {
          if (scrollPos > triggerHeight) mobileCta.classList.add('visible');
          else mobileCta.classList.remove('visible');
        }

        if (backToTop) {
          if (scrollPos > 500) backToTop.classList.add('visible');
          else backToTop.classList.remove('visible');
        }

        if (scrollProgressBar) {
          const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
          const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrollPercent = (totalScroll / windowHeight) * 100;
          scrollProgressBar.style.width = scrollPercent + '%';
        }
        ticking = false;
      });
      ticking = true;
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

  // --- ASCII GENERATIVE EFFECT ---
  const asciiContainer = document.getElementById('asciiEffect');
  if (asciiContainer) {
    const chars = "01<>{}[]@#$%&*/\\ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charCount = 65; 
    
    for (let i = 0; i < charCount; i++) {
      let span = document.createElement('span');
      span.className = 'ascii-char';
      span.innerText = chars[Math.floor(Math.random() * chars.length)];
      
      span.style.left = (Math.random() * 100) + '%';
      span.style.top = (Math.random() * 100) + '%';
      
      span.style.animationDelay = (Math.random() * 4) + 's';
      span.style.animationDuration = (Math.random() * 2 + 2) + 's';
      span.style.fontSize = (Math.random() * 14 + 8) + 'px';
      
      asciiContainer.appendChild(span);
    }

    setInterval(() => {
      const spans = asciiContainer.getElementsByTagName('span');
      const randomSpan = spans[Math.floor(Math.random() * spans.length)];
      if (randomSpan) {
        randomSpan.innerText = chars[Math.floor(Math.random() * chars.length)];
      }
    }, 60); 
  }

});

// --- SVG ICON TEMPLATE UNTUK TOMBOL ---
const externalLinkIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;

// --- PROJECT DATA ---
const projects = [
  {
    tag: 'UI/UX Design',
    title: 'Journey of <em>Immigrants</em>',
    sub: 'Transforming a poignant narrative about detained immigrant families into a richly immersive interactive experience for Kompas ID.',
    year: '2023',
    role: 'UI/UX Designer',
    tools: 'Figma',
    cover: 'thumbnail_1.webp',
    link: 'https://interaktif.kompas.id/baca/kisah-keluarga-imigran-tahanan-pbb/',
    linkText: `Visit Live Site ${externalLinkIcon}`,
    body: '<h2>The Context</h2><p>In 2023, a Kompas ID journalist wanted to elevate his written narrative about a detained immigrant family under UNHCR into an interactive format. The goal was twofold: create a deeply emotional, immersive experience for the Indonesian public, and strategically drive premium subscription growth for the platform.</p><h2>The Challenge</h2><p>We operated on a strict <strong>one month timeline</strong>, with only <strong>12 days allocated for the design phase</strong>. The core challenge was finding the perfect balance, integrating rich multimedia (sound and visuals) without overshadowing the extensive journalistic text, while aligning the Editorial, Multimedia, and Tech teams.</p><h2>Design Decisions</h2><ul><li><strong>Dark Theme UI:</strong> Chosen based on user research to specifically reduce eye strain and improve focus during long form reading sessions.</li><li><strong>Sectioned Storytelling:</strong> I divided the extensive narrative into digestible, paced segments, allowing users to navigate and absorb the heavy story comfortably.</li><li><strong>Seamless Integration:</strong> Rapidly prototyped and integrated all audio visual assets by day 12, ensuring a harmonious blend that enhanced emotional resonance.</li></ul><h2>The Impact</h2><p>The interactive feature successfully drew over <strong>82,000 readers</strong> within its first month of release. The engaging format validated our design approach, directly contributing to a <strong>5% increase in subscription revenue</strong> for Kompas ID. Readers specifically highlighted the improved readability and the powerful immersive experience.</p>'
  },
  {
    tag: 'UI/UX Design',
    title: 'Gamified Article: <em>Film Day</em>',
    sub: 'An interactive gamified experience for Kompas.id to boost engagement and premium subscriptions through educational play.',
    year: '2022',
    role: 'UI/UX Designer',
    tools: 'Figma',
    cover: 'thumbnail_2.webp',
    link: 'https://interaktif.kompas.id/baca/ketahui-fakta-film-nasional/',
    linkText: `Visit Live Site ${externalLinkIcon}`,
    body: '<h2>The Context</h2><p>To celebrate National Film Day, Kompas.id aimed to create premium interactive content that not only engaged users but also drove subscription revenue. As the dedicated UI/UX Designer for the Technical Squad, I was tasked with conceptualizing and designing this experience from the ground up.</p><h2>The Challenge</h2><p>With a strict one month timeline for both design and development, the initial phase started with zero existing data or predefined directions. I had to rapidly research, ideate, and validate concepts while ensuring technical feasibility with the developers.</p><h2>Design Process & Decisions</h2><ul><li><strong>Gamification Strategy:</strong> After pitching five different concepts, we proceeded with a film guessing game. It was designed to be intuitive, educational, and highly engaging.</li><li><strong>Seamless Integration:</strong> Integrated clear, prominent subscription offers within the game flow without disrupting the user experience.</li><li><strong>Cross Device Accessibility:</strong> Ensured flawless gameplay and readability across desktop, tablet, and mobile platforms.</li></ul><h2>The Impact</h2><p>The interactive gamified article attracted over <strong>40,000 users</strong> within just two weeks of launch. More importantly, it successfully drove a <strong>4% increase in subscription growth</strong>, proving the effectiveness of gamification in journalistic platforms.</p>'
  },
  {
    tag: 'Visual Art',
    title: 'Real Time Audio Visualizer & <em>Blob Tracking System</em>',
    sub: 'An interactive audio visual experiment that responds to motion and sound in real time.',
    year: '2024',
    role: 'Creative Technologist',
    tools: 'TouchDesigner',
    cover: 'thumbnail_3.mp4',
    body: '<h2>Context</h2><p>I wanted to explore the relationship between physical movement and digital soundscapes. The goal was to build a system where the <strong>Real Time Audio Visualizer & Blob Tracking System</strong> acts as a digital mirror to human interaction.</p><h2>The Fix</h2><p>I built a custom setup using TouchDesigner that processes two live inputs simultaneously:</p><ul><li><strong>Optical Blob Tracking:</strong> Taking live camera feeds to map out human silhouettes and motion data.</li><li><strong>Audio Reactivity:</strong> Analyzing sound frequencies to distort and drive the 3D geometries and particle behaviors in real time.</li></ul><h2>Impact</h2><p>The result is a highly immersive, tactile experience that bridges the physical and digital worlds. It proves how complex node based systems can translate into organic, fluid visual art.</p>'
  },
  {
    tag: 'UI/UX Design',
    title: 'Kompas <em>NFT</em> Platform',
    sub: 'Designing the launchpad for Kompas Daily\'s debut NFT collections, bridging 57 years of journalistic history with Web3 enthusiasts.',
    year: '2022',
    role: 'UI/UX Designer',
    tools: 'Figma',
    cover: 'thumbnail_4.webp',
    link: 'https://nft.kompas.id/',
    linkText: `Visit Live Site ${externalLinkIcon}`,
    body: '<h2>The Context</h2><p>To coincide with its 57th anniversary, Kompas Daily launched its first ever NFT collections: "Indonesia/57 Peristiwa" (historical front pages) and "Kompas X Rakajana" (exclusive illustrations). The goal was to connect traditional journalism with the booming Web3 market and establish a new digital revenue stream.</p><h2>The Challenge</h2><p>I had exactly <strong>12 days to design the entire platform</strong> before development handoff. The project required intense cross functional coordination between Business, Editorial, Multimedia, and a split squad of 7 developers managing concurrent projects.</p><h2>Research & Strategy</h2><p>I conducted competitive analyses on major media NFT platforms. To tailor the experience, I developed three distinct user personas ranging from early adopter Gen Z flippers to millennial startup executives. This helped prioritize key information: project utility, purchasing guides, and community trust building.</p><h2>Design Decisions</h2><ul><li><strong>Information Architecture:</strong> Focused heavily on clarity showcasing the collections, detailing the NFTs, providing step by step purchasing guides, and routing users to the OpenSea page and Discord community.</li><li><strong>Responsive & Accessible:</strong> Built a robust, multi device UI that maintained aesthetic integrity whether viewed on a massive desktop monitor or a smartphone.</li></ul><h2>The Impact</h2><p>The platform successfully launched on schedule, resulting in <strong>2 out of the 3 digital NFT collections completely selling out</strong>. Furthermore, it successfully onboarded a new demographic into the newly established Kompas NFT Discord community.</p>'
  },
  {
    tag: 'Graphic Design',
    title: 'Gam3 Day 2025: <em>Event Production</em>',
    sub: 'Crafting a cohesive visual identity, merchandise, and environmental graphics for a major Web3 & gaming event by Coinfest Asia.',
    year: '2025',
    role: 'Graphic Designer',
    tools: 'Adobe CC, Figma',
    cover: 'thumbnail_5.webp',
    link: 'GAM3_F3ST_Production_Items.pdf',
    linkText: `See Detail (PDF) ${externalLinkIcon}`,
    body: '<h2>The Context</h2><p>Coinfest Asia hosted "Gam3 Day", an outdoor crypto and blockchain event in Jakarta targeting corporate executives and developers. The challenge was to create production-ready environmental designs that translated complex Web3 concepts into a digestible, engaging visual experience for both technical and non-technical attendees.</p><h2>The Challenge</h2><p>Designing for an outdoor event requires practical problem-solving. I needed to craft production items—ranging from photobooth backdrops and flag banners to wayfinding signages and merchandise—while strictly adhering to a complex outdoor event map and maintaining a retro-gaming brand identity.</p><h2>Design Decisions & Execution</h2><ul><li><strong>Wayfinding & Signages:</strong> Designed clear, high-contrast floor stickers equipped with QR codes for instant event map access. Additionally, I crafted standing and hanging signages tailored to specific outdoor zones (VIP, Camp, Main Stage) to guide visitors effectively.</li><li><strong>Merchandise:</strong> Created minimalist, elegant apparel (T-shirts and caps) that reflect the personality of tech developers and corporate executives, ensuring the merchandise felt premium and cool enough for everyday wear.</li><li><strong>Visual Direction:</strong> Utilized a sleek dark theme with vibrant neon green accents and pixel-art motifs (inspired by classic arcade games) to instantly communicate the "gaming" identity while preserving a professional, modern tech conference aesthetic.</li></ul>'
  }
];

function openProject(idx) {
  const overlay = document.getElementById('projectOverlay');
  if (!overlay) return;
  const p = projects[idx];
  document.getElementById('overlayTag').textContent = p.tag;
  document.getElementById('overlayTitle').innerHTML = p.title;
  document.getElementById('overlayTitleNav').innerHTML = p.title;
  document.getElementById('overlaySub').textContent = p.sub;
  document.getElementById('overlayYear').textContent = p.year;
  document.getElementById('overlayRole').textContent = p.role;
  document.getElementById('overlayTools').textContent = p.tools;
  
  // Logic untuk tombol Link/PDF
  const linkBtn = document.getElementById('overlayLinkBtn');
  if (p.link) {
    linkBtn.href = p.link;
    linkBtn.innerHTML = p.linkText || `Visit Live Site ${externalLinkIcon}`;
    linkBtn.style.display = 'inline-flex'; // Ubah dari inline-block agar icon rapi di tengah
  } else {
    linkBtn.style.display = 'none';
  }
  
  const coverElement = document.getElementById('overlayCover');
  if (p.cover.endsWith('.mp4') || p.cover.endsWith('.webm')) {
    coverElement.innerHTML = 
      '<video id="overlayVideo" src="' + p.cover + '" autoplay loop muted playsinline></video>' +
      '<button id="muteToggleBtn" class="video-mute-btn">Unmute</button>';
      
    const videoEl = document.getElementById('overlayVideo');
    const muteBtn = document.getElementById('muteToggleBtn');
    
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
  const overlay = document.getElementById('projectOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    const videoEl = document.getElementById('overlayVideo');
    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute('src'); 
      videoEl.load();
    }
  }
}