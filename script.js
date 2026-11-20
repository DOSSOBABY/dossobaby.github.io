// Année du pied de page
document.getElementById('year').textContent = new Date().getFullYear();

// Thème clair / sombre
const root = document.documentElement;
document.querySelector('.theme').addEventListener('click', () => {
  const current = root.dataset.theme ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Menu mobile
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');
const setMenu = (open) => {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  menu.classList.toggle('is-open', open);
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Bordure de la barre de navigation au défilement
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Filtre des projets
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
chips.forEach((chip) => chip.addEventListener('click', () => {
  chips.forEach((c) => { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-pressed', String(c === chip)); });
  const f = chip.dataset.filter;
  projects.forEach((p) => { p.hidden = f !== 'all' && !p.dataset.cat.split(' ').includes(f); });
}));

// Lien actif dans le menu + apparition des sections
const links = [...menu.querySelectorAll('a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('is-current', l.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visible'); reveal.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section, .project, .card').forEach((el) => { el.classList.add('reveal'); reveal.observe(el); });
}
