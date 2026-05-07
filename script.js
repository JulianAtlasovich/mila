const emailJsConfig = {
  publicKey: '',
  serviceId: '',
  templateId: ''
};

function openModal() {
  document.getElementById('videoModal').classList.add('active');
  const video = document.getElementById('videoFrame');
  video.play();
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('videoModal')) {
    return;
  }

  document.getElementById('videoModal').classList.remove('active');
  const video = document.getElementById('videoFrame');
  video.pause();
  video.currentTime = 0;
  document.body.style.overflow = '';
}

function toggleDonate(btn) {
  btn.classList.toggle('open');
  const body = document.getElementById('donateBody');
  body.classList.toggle('open');
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) {
    return;
  }

  if (window.scrollY > 60) {
    header.style.boxShadow = '0 4px 32px rgba(0,0,0,0.35)';
  } else {
    header.style.boxShadow = 'none';
  }
});

const contactForm = document.getElementById('contactForm');

if (contactForm && window.emailjs) {
  window.emailjs.init({
    publicKey: emailJsConfig.publicKey
  });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (emailJsConfig.publicKey === 'REEMPLAZAR_CON_TU_PUBLIC_KEY') {
      alert('Falta configurar la public key de EmailJS en script.js');
      return;
    }

    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton.childNodes[0].textContent;

    submitButton.disabled = true;
    submitButton.childNodes[0].textContent = 'Enviando... ';

    try {
      await window.emailjs.sendForm(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        contactForm
      );

      alert('Mensaje enviado correctamente.');
      contactForm.reset();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('No se pudo enviar el mensaje. Revisa la configuracion de EmailJS.');
    } finally {
      submitButton.disabled = false;
      submitButton.childNodes[0].textContent = originalText;
    }
  });
}

/*
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) {
      return;
    }

    e.preventDefault();
    const offset = 72;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});*/
