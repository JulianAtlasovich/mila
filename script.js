function openModal() {
  document.getElementById('videoModal').classList.add('active');
  document.getElementById('videoFrame').src = 'https://www.youtube.com/embed/?autoplay=1';
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('videoModal')) {
    return;
  }

  document.getElementById('videoModal').classList.remove('active');
  document.getElementById('videoFrame').src = '';
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
});
