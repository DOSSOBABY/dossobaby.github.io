// Année du pied de page
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Carte du système : suivre le chemin d'un projet
const svg = document.querySelector('.diagram');
const buttons = document.querySelectorAll('.seg [data-project]');
const legends = document.querySelectorAll('[data-legend]');
const chain = {
  fadis: ['Navigateur (Next.js)', 'NestJS', 'PostgreSQL', 'Orange Money, Moov Money'],
  order: ['Navigateur (Next.js)', 'NestJS', 'PostgreSQL, Redis', 'Caisse du restaurant'],
  mali: ['Application, web, SMS, USSD', 'Node.js et Express', 'Firestore', 'Orange Money'],
  asdd: ['Navigateur, USSD *144#', 'Python et Flask', 'SQLite (démo)', 'Orange Money, Moov, Wave (simulés)'],
  kalanso: ['Application installable', 'Node.js et Express', 'PostgreSQL', 'Wave, Orange Money'],
  esgic: ['Navigateur', 'Aucun, site statique', 'Aucune', 'Aucun'],
};
function show(project) {
  if (!svg) return;
  svg.classList.add('is-focused');
  svg.dataset.project = project;
  svg.querySelectorAll('[data-p]').forEach((el) => el.classList.toggle('on', el.dataset.p.split(' ').includes(project)));
  svg.querySelectorAll('[data-n]').forEach((el) => el.classList.toggle('on', el.dataset.n.split(' ').includes(project)));
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.project === project)));
  legends.forEach((l) => { l.hidden = l.dataset.legend !== project; });
  document.querySelectorAll('[data-chain]').forEach((el) => { el.textContent = chain[project][Number(el.dataset.chain)]; });
}
buttons.forEach((b) => b.addEventListener('click', () => show(b.dataset.project)));
document.querySelectorAll('[data-show]').forEach((a) => a.addEventListener('click', () => show(a.dataset.show)));
if (buttons.length) show('fadis');

// Rail des écrans : précédent et suivant pour la souris
const rail = document.getElementById('rail');
document.querySelectorAll('[data-rail]').forEach((b) => b.addEventListener('click', () => {
  if (!rail) return;
  const item = rail.querySelector('li');
  const step = item ? item.getBoundingClientRect().width + 32 : 300;
  const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  rail.scrollBy({ left: Number(b.dataset.rail) * step * 2, behavior: smooth ? 'smooth' : 'auto' });
}));
