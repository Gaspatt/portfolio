// Typed effect
const roles = ['PHP Developer', 'React Developer', 'Full Stack Developer', 'Software Engineer'];
let ri = 0, ci = 0, deleting = false;
const el = document.getElementById('typed');
function type() {
  if (!el) return;
  const cur = roles[ri];
  el.textContent = deleting ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
  deleting ? ci-- : ci++;
  if (!deleting && ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
  if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, deleting ? 55 : 85);
}
type();

// Menu mobile
const btn = document.getElementById('menuBtn');
const links = document.getElementById('navLinks');
if (btn && links) {
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', false);
  }));
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Reveal on scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.07 });
document.querySelectorAll('.section, .project-card, .about-card, .stack-card, .exp-card, .contato-card').forEach(el => {
  el.classList.add('reveal'); obs.observe(el);
});

// Animate skill bars when visible
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach(b => {
        const w = b.style.width; b.style.width = '0';
        requestAnimationFrame(() => setTimeout(() => { b.style.width = w; }, 100));
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stack-card').forEach(c => barObs.observe(c));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--text)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => secObs.observe(s));
