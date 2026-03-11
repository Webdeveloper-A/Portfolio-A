/* custom cursor */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
(function animRing() {
  rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.service-card,.project-card').forEach(el => {
  el.addEventListener('mouseenter',()=>{
    cursor.style.transform='translate(-50%,-50%) scale(2)';
    ring.style.width='60px'; ring.style.height='60px';
  });
  el.addEventListener('mouseleave',()=>{
    cursor.style.transform='translate(-50%,-50%) scale(1)';
    ring.style.width='36px'; ring.style.height='36px';
  });
});

/* header scroll */
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 60);
});

/* hamburger */
const ham = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');
ham.addEventListener('click', () => navList.classList.toggle('open'));
navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));

/* smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* reveal on scroll */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      /* animate skill bars */
      e.target.querySelectorAll && e.target.querySelectorAll('.skill-bar-fill').forEach(b => b.classList.add('animate'));
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* also trigger skill bars when about section is visible */
const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(b => {
        b.style.transform = `scaleX(${b.style.getPropertyValue('--w') || 1})`;
      });
    }
  });
}, { threshold: 0.3 });
const aboutSection = document.querySelector('.about');
if (aboutSection) aboutObserver.observe(aboutSection);

/* skill bars */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(b => b.classList.add('animate'));
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skills-section').forEach(el => skillObserver.observe(el));

/* EmailJS (requires email.min.js loaded before this script) */
(function() { emailjs.init("i3EQ1T80MaHezU6yr"); })();

const form = document.getElementById('contactForm');
const status = document.getElementById('form-status');
const btn = document.getElementById('sendBtn');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  btn.disabled = true;
  btn.textContent = 'Sending...';
  status.className = '';

  emailjs.sendForm('service_tp5tqzf', 'template_71uy5yn', this)
    .then(() => {
      status.textContent = '✓ Message sent successfully!';
      status.className = 'success';
      form.reset();
    }, () => {
      status.textContent = '✕ Something went wrong. Please try again.';
      status.className = 'error';
    })
    .finally(() => {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
    });
});
