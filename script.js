// Année du pied de page
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Carte du système : suivre le chemin d'un projet
const svg = document.querySelector('.diagram');
const buttons = document.querySelectorAll('.seg [data-project]');
const legends = document.querySelectorAll('[data-legend]');
const chain = {
  fadis: ['Navigateur (Next.js)', 'NestJS', 'PostgreSQL', 'Orange Money, Moov Money'],
  order: ['Navigateur (Next.js)', 'NestJS', 'PostgreSQL, Redis', 'Orange Money, Moov Money, Wave, espèces'],
  mali: ['Application, web, SMS, USSD', 'Node.js et Express', 'Firestore', 'Orange Money'],
  asdd: ['Navigateur, USSD *144#', 'Python et Flask', 'SQLite (démo)', 'Orange Money, Moov Money, Wave (simulés)'],
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

// La zone de la carte ne prend le focus clavier que si elle défile vraiment
const scroller = document.querySelector('.diagram-scroll');
const syncScroller = () => {
  if (!scroller) return;
  const scrolls = scroller.scrollWidth > scroller.clientWidth + 1 && scroller.offsetParent !== null;
  if (scrolls) scroller.setAttribute('tabindex', '0'); else scroller.removeAttribute('tabindex');
};
syncScroller();
addEventListener('resize', syncScroller, { passive: true });

// Demande de devis : champs selon le profil, erreurs sous chaque champ,
// puis un e-mail ou un message WhatsApp déjà rédigé
const form = document.getElementById('ask-form');
if (form) {
  const help = document.getElementById('ask-help');
  const emailOpt = form.querySelector('[data-email-opt]');
  const field = (name) => form.elements[name];
  const type = () => form.querySelector('input[name="type"]:checked').value;
  const errOf = (input) => document.getElementById('err-' + input.id);
  const clearErr = (input) => {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    const e = errOf(input); if (e) { e.hidden = true; e.textContent = ''; }
  };
  const setErr = (input, msg) => {
    input.setAttribute('aria-invalid', 'true');
    const e = errOf(input);
    if (e) { e.textContent = msg; e.hidden = false; input.setAttribute('aria-describedby', e.id); }
  };
  const sync = () => {
    const t = type();
    form.querySelectorAll('[data-only]').forEach((el) => {
      const on = el.dataset.only === 'org' ? t !== 'Particulier' : el.dataset.only === t;
      el.hidden = !on;
      el.querySelectorAll('input, select, textarea').forEach((i) => { i.disabled = !on; if (!on) clearErr(i); });
    });
    field('structure').required = t !== 'Particulier';
    field('email').required = t === 'Entreprise';
    if (emailOpt) emailOpt.hidden = t === 'Entreprise';
    field('nom').labels[0].textContent = t === 'Particulier' ? 'Nom et prénom' : 'Votre nom et prénom';
  };
  form.querySelectorAll('input[name="type"]').forEach((r) => r.addEventListener('change', sync));
  form.querySelectorAll('input, textarea').forEach((i) => i.addEventListener('input', () => { if (i.getAttribute('aria-invalid')) clearErr(i); }));
  sync();

  const check = (input) => {
    if (!input || input.disabled) return true;
    const value = input.value.trim();
    if (input.required && value === '') { setErr(input, 'À remplir avant l’envoi.'); return false; }
    if (input.type === 'email' && value !== '' && !input.checkValidity()) { setErr(input, 'Adresse incomplète. Écrivez-la sous la forme nom@exemple.com.'); return false; }
    if (input.type === 'tel' && value !== '') {
      const digits = value.replace(/\D/g, '');
      if (!/^[+\d\s().-]+$/.test(value) || digits.length < 8) { setErr(input, 'Numéro incomplet. Écrivez au moins 8 chiffres, par exemple +223 70 00 00 00.'); return false; }
    }
    clearErr(input);
    return true;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const via = e.submitter && e.submitter.value === 'whatsapp' ? 'whatsapp' : 'email';
    const inputs = ['structure', 'nom', 'telephone', 'email', 'projet'].map(field);
    const bad = inputs.filter((i) => !check(i));
    if (bad.length) {
      help.dataset.state = 'error';
      help.textContent = bad.length === 1 ? 'Un champ est à corriger avant l’envoi.' : bad.length + ' champs sont à corriger avant l’envoi.';
      bad[0].focus();
      return;
    }
    const t = type();
    const services = [...form.querySelectorAll('input[name="services"]:checked')].map((c) => c.value);
    const v = (n) => (field(n) && !field(n).disabled ? field(n).value.trim() : '');
    const line = (label, n, suffix = '') => (v(n) ? label + ' : ' + v(n) + suffix : null);
    const text = [
      'Demande de devis (' + t + ')', '',
      line('Structure', 'structure'),
      'Nom : ' + v('nom'),
      line('Fonction', 'fonction'),
      line('Secteur', 'secteur'),
      line('Employés', 'employes'),
      line('RCCM ou NIF', 'rccm_nif'),
      'Téléphone : ' + v('telephone'),
      line('E-mail', 'email'),
      'Besoin : ' + (services.length ? services.join(', ') : 'à préciser'),
      'Délai : ' + v('delai'),
      line('Budget', 'budget', ' FCFA'),
      '', 'Projet :', v('projet'),
    ].filter((l) => l !== null).join('\n');
    help.dataset.state = '';
    if (via === 'whatsapp') {
      window.open('https://wa.me/22370997781?text=' + encodeURIComponent(text), '_blank', 'noopener');
      help.textContent = 'WhatsApp s’ouvre avec votre demande rédigée. Elle ne part qu’une fois que vous l’envoyez dans WhatsApp.';
    } else {
      const subject = 'Demande de devis, ' + t + (v('structure') ? ', ' + v('structure') : '');
      window.location.href = 'mailto:abdrahamanealy2.0@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
      help.textContent = 'Votre messagerie s’ouvre avec la demande rédigée. Elle ne part qu’une fois que vous l’envoyez. Rien ne s’ouvre ? Écrivez à abdrahamanealy2.0@gmail.com.';
    }
  });
}
