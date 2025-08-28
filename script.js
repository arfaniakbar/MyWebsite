/* ============================
   Utility selector helpers
   ============================ */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* NAV mobile toggle */
const hamburger = $('#hamburger');
const mobileMenu = $('#mobileMenu');
hamburger?.addEventListener('click', () => {
  const open = mobileMenu.getAttribute('aria-hidden') === 'false';
  mobileMenu.style.display = open ? 'none' : 'block';
  mobileMenu.setAttribute('aria-hidden', String(!open));
});
$$('.mobile-link').forEach(a => a.addEventListener('click', ()=> {
  mobileMenu.style.display = 'none';
}));

/* Smooth scroll for nav links and active highlight */
$$('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const el = document.querySelector(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

/* Observe sections for active nav */
const sectionEls = Array.from(document.querySelectorAll('main section, #home'));
const navLinks = $$('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.id;
      navLinks.forEach(n => n.classList.toggle('active', n.getAttribute('href') === '#'+id));
    }
  });
}, {threshold: 0.35});
sectionEls.forEach(s => sectionObserver.observe(s));

/* HERO parallax subtle */
const heroBg = $('#heroBg');
window.addEventListener('scroll', () => {
  const sc = window.scrollY;
  if(heroBg) heroBg.style.transform = `translateY(${sc * -0.08}px) scale(1.03)`;
  // back to top
  const bt = $('#backTop');
  if(bt) bt.style.display = sc > 400 ? 'block' : 'none';
});

/* TYPING EFFECT (hero) */
const typedEl = $('#typed');
const phrases = [
  "Membangun website modern, cepat, dan responsif",
  "Menghadirkan solusi digital yang kreatif dan inovatif",
  "Membantu bisnis Anda tampil lebih profesional di dunia online",
  "Desain elegan dipadukan dengan strategi digital efektif",
  "Solusi web yang mendukung pertumbuhan bisnis Anda"
];
let pi = 0, ci = 0, deleting = false;
function typingLoop(){
  const current = phrases[pi];
  if(!deleting){
    ci++;
    typedEl.textContent = current.substring(0, ci);
    if(ci === current.length){
      deleting = true;
      setTimeout(typingLoop, 1200);
      return;
    }
  } else {
    ci--;
    typedEl.textContent = current.substring(0, ci);
    if(ci === 0){
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(typingLoop, deleting ? 40 : 80);
}
typingLoop();

/* REVEAL ON SCROLL */
const reveals = $$('.reveal');
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(en => {
    if(en.isIntersecting){
      en.target.classList.add('visible');
      obs.unobserve(en.target);
    }
  });
}, {threshold:0.12});
reveals.forEach(r => revealObserver.observe(r));

/* BACKGROUND SWITCHER */
const bgPanel = $('#bgPanel');
const bgOpen = $('#bgOpen');
bgOpen.addEventListener('click', () => {
  const vis = bgPanel.style.display === 'block';
  bgPanel.style.display = vis ? 'none' : 'block';
});
bgPanel.querySelectorAll('button[data-type]').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    const src = btn.dataset.src;
    if(type === 'image'){
      heroBg.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.35)), url('${src}')`;
    } else if(type === 'gradient'){
      heroBg.style.backgroundImage = src;
    } else if(type === 'pattern'){
      if(src === 'pattern-1'){
        heroBg.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.35)), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.02), transparent 2px), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.015), transparent 2px)`;
      }
    } else if(type === 'reset'){
      heroBg.style.backgroundImage = "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1503424886309-7f3a3c7d5d6b?q=80&w=1600&auto=format&fit=crop')";
    }
    // close panel after selection
    bgPanel.style.display = 'none';
  });
});

/* LIGHTBOX for portfolio */
const projects = $$('.project');
const lightbox = $('#lightbox');
const lbImg = $('#lbImg');
const lbTitle = $('#lbTitle');
const lbDesc = $('#lbDesc');
const lbClose = $('#lbClose');
projects.forEach(p => {
  p.addEventListener('click', () => {
    const img = p.dataset.img;
    const title = p.dataset.title;
    const desc = p.dataset.desc;
    lbImg.src = img;
    $('#lbTitle').textContent = title;
    $('#lbDesc').textContent = desc;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  });
});
lbClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
function closeLightbox(){ lightbox.classList.remove('show'); lightbox.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }

/* Testimonials / slider can be added similarly if needed */

/* CONTACT FORM */
const contactForm = $('#contactForm');
const toast = $('#formToast');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#cfName').value.trim();
  const email = $('#cfEmail').value.trim();
  const msg = $('#cfMsg').value.trim();
  if(!name || !email || !msg){
    showToast('Mohon isi semua kolom', 'error');
    return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    showToast('Format email tidak valid', 'error');
    return;
  }
  showToast('Mengirim pesan...', 'info');
  setTimeout(()=> {
    showToast('Pesan terkirim, terima kasih!', 'success');
    contactForm.reset();
  }, 900);
});
$('#formReset')?.addEventListener('click', ()=>{ contactForm.reset(); showToast('Form direset', 'info'); });

function showToast(msg, type='info'){
  if(!toast) return;
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transition = 'all .3s ease';
  toast.style.color = type === 'error' ? '#ffb3b3' : (type === 'success' ? '#b3ffcc' : '#cfe9ff');
  setTimeout(()=> toast.style.opacity = '0', 2600);
}

/* BACK TO TOP */
$('#backTop')?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

/* THEME toggle (dark/light) */
const themeToggle = $('#themeToggle');
themeToggle?.addEventListener('click', ()=> {
  document.documentElement.classList.toggle('light-mode');
  const isLight = document.documentElement.classList.contains('light-mode');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
});

/* small accessibility: Escape to close panels */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    closeLightbox();
    bgPanel.style.display = 'none';
    mobileMenu.style.display = 'none';
  }
});




