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

// Demande de service : champs selon le profil, puis e-mail ou WhatsApp déjà rédigé
const form = document.getElementById('ask-form');
if (form) {
  const help = document.getElementById('ask-help');
  const emailOpt = form.querySelector('[data-email-opt]');
  const field = (name) => form.elements[name];
  const type = () => form.querySelector('input[name="type"]:checked').value;
  const sync = () => {
    const t = type();
    form.querySelectorAll('[data-only]').forEach((el) => {
      const on = el.dataset.only === 'org' ? t !== 'Particulier' : el.dataset.only === t;
      el.hidden = !on;
      el.querySelectorAll('input, select, textarea').forEach((i) => { i.disabled = !on; });
    });
    field('structure').required = t !== 'Particulier';
    field('email').required = t === 'Entreprise';
    if (emailOpt) emailOpt.hidden = t === 'Entreprise';
    field('nom').previousElementSibling.textContent = t === 'Particulier' ? 'Nom et prénom' : 'Votre nom et prénom';
  };
  form.querySelectorAll('input[name="type"]').forEach((r) => r.addEventListener('change', sync));
  sync();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const via = e.submitter && e.submitter.value === 'whatsapp' ? 'whatsapp' : 'email';
    const required = ['structure', 'nom', 'telephone', 'email', 'projet'].map(field).filter((i) => i && !i.disabled);
    let firstBad = null;
    required.forEach((i) => {
      const ok = i.checkValidity() && (!i.required || i.value.trim() !== '');
      i.setAttribute('aria-invalid', String(!ok));
      if (!ok) { i.setAttribute('aria-describedby', 'ask-help'); if (!firstBad) firstBad = i; } else { i.removeAttribute('aria-describedby'); }
    });
    if (firstBad) {
      const label = firstBad.labels && firstBad.labels[0] ? firstBad.labels[0].textContent.replace(/\s*\(.*\)\s*/, '').trim() : 'Ce champ';
      help.dataset.state = 'error';
      help.textContent = firstBad.type === 'email' && firstBad.value ? 'Cette adresse e-mail semble incomplète. Écrivez-la sous la forme nom@exemple.com.' : '« ' + label + ' » est à remplir avant l’envoi.';
      firstBad.focus();
      return;
    }
    const t = type();
    const services = [...form.querySelectorAll('input[name="services"]:checked')].map((c) => c.value);
    const v = (n) => (field(n) && !field(n).disabled ? field(n).value.trim() : '');
    const lines = [
      'Demande de service (' + t + ')', '',
      (v('structure') ? 'Structure\u00a0: ' + v('structure') : null),
      'Nom\u00a0: ' + v('nom'),
      (v('fonction') ? 'Fonction\u00a0: ' + v('fonction') : null),
      (v('secteur') ? 'Secteur\u00a0: ' + v('secteur') : null),
      (v('employes') ? 'Employés\u00a0: ' + v('employes') : null),
      (v('rccm_nif') ? 'RCCM ou NIF\u00a0: ' + v('rccm_nif') : null),
      'Téléphone\u00a0: ' + v('telephone'),
      (v('email') ? 'E-mail\u00a0: ' + v('email') : null),
      'Besoin\u00a0: ' + (services.length ? services.join(', ') : 'à préciser'),
      'Délai\u00a0: ' + v('delai'),
      (v('budget') ? 'Budget\u00a0: ' + v('budget') + ' FCFA' : null),
      '', 'Projet\u00a0:', v('projet'),
    ].filter((l) => l !== null);
    const text = lines.join('\n');
    help.dataset.state = '';
    if (via === 'whatsapp') {
      window.open('https://wa.me/22370997781?text=' + encodeURIComponent(text), '_blank', 'noopener');
      help.textContent = 'WhatsApp s’ouvre avec votre demande rédigée. Elle ne part qu’une fois que vous l’envoyez dans WhatsApp.';
    } else {
      const subject = 'Demande de service, ' + t + (v('structure') ? ', ' + v('structure') : '');
      window.location.href = 'mailto:abdrahamanealy2.0@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
      help.textContent = 'Votre messagerie s’ouvre avec la demande rédigée. Elle ne part qu’une fois que vous l’envoyez. Rien ne s’ouvre ? Écrivez à abdrahamanealy2.0@gmail.com.';
    }
  });
}
