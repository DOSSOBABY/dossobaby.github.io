// Année du pied de page
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Carte du système : suivre le chemin d'un projet
const svg = document.querySelector('.diagram');
const buttons = document.querySelectorAll('.seg [data-project]');
const legends = document.querySelectorAll('[data-legend]');
function show(project) {
  if (!svg) return;
  svg.classList.add('is-focused');
  svg.dataset.project = project;
  svg.querySelectorAll('[data-p]').forEach((el) => el.classList.toggle('on', el.dataset.p.split(' ').includes(project)));
  svg.querySelectorAll('[data-n]').forEach((el) => el.classList.toggle('on', el.dataset.n.split(' ').includes(project)));
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.project === project)));
  legends.forEach((l) => { l.hidden = l.dataset.legend !== project; });
}
buttons.forEach((b) => b.addEventListener('click', () => show(b.dataset.project)));
if (buttons.length) show('fadis');
