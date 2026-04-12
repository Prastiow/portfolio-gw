/* script.js */

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger Menu Logic
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  // Scroll Actions
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
  
  // INI YANG DIBENERIN BIAR GAMBAR COVER DI POPUP MUNCUL
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