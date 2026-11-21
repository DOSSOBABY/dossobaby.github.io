// Demande de devis par WhatsApp : le même formulaire, vérifié par assets/system.js,
// puis un message déjà rédigé ouvert dans WhatsApp.
const form = document.getElementById('devis-form');
const wa = form && form.querySelector('[data-whatsapp]');
if (wa) {
  wa.addEventListener('click', () => {
    if (!form.checkValidity()) { form.requestSubmit(); return; }
    const v = (name) => (form.elements[name].value || '').trim();
    const lines = [
      'Bonjour, je souhaite un devis.',
      `Profil : ${v('profil')}`,
      `Nom : ${v('nom')}`,
      `Téléphone : ${v('telephone')}`,
      v('email') ? `E-mail : ${v('email')}` : null,
      `Besoin : ${v('besoin')}`,
      '',
      v('projet'),
    ].filter((l) => l !== null);
    window.open(`https://wa.me/${wa.dataset.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  });
}
