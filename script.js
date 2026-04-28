const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
const navLinks = [...document.querySelectorAll('.nav-list a')];
const sections = [...document.querySelectorAll('main section[id]')];
const yearEl = document.getElementById('year');
const revealEls = document.querySelectorAll('.reveal');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
};

updateHeader();
window.addEventListener('scroll', updateHeader);

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((element) => revealObserver.observe(element));

const activateNav = () => {
  let currentId = '';
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140 && rect.bottom >= 140) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};

activateNav();
window.addEventListener('scroll', activateNav);

(function initEmailJs() {
  if (window.emailjs) {
    window.emailjs.init('i3EQ1T80MaHezU6yr');
  }
})();

const form = document.getElementById('contactForm');
const statusBox = document.getElementById('form-status');
const sendBtn = document.getElementById('sendBtn');

if (form && statusBox && sendBtn) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!window.emailjs) {
      statusBox.textContent = 'Email service is not available right now. Contact me through Telegram or Instagram.';
      statusBox.className = 'form-status error';
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    statusBox.className = 'form-status';
    statusBox.textContent = '';

    try {
      await window.emailjs.sendForm('service_tp5tqzf', 'template_71uy5yn', form);
      form.reset();
      statusBox.textContent = 'Message sent successfully. I will get back to you soon.';
      statusBox.className = 'form-status success';
    } catch (error) {
      statusBox.textContent = 'Message failed to send. Use Telegram or try again later.';
      statusBox.className = 'form-status error';
      console.error(error);
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send Message';
    }
  });
}
