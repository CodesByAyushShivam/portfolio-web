/* ==========================================================================
   Ayush Shivam - Space Glass Portfolio JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mobile Menu Toggle
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Active Link on Scroll & Header Styling
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Header background change on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll progress indicator
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
    }

    // Nav link active state highlighting
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });


  // ==========================================
  // 2. Typewriter Effect
  // ==========================================
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'Python Developer',
    'AI & ML Enthusiast',
    'BTech CSE Student'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Deleting is faster
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    // Logical transitions
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Brief pause before starting next word
    }

    setTimeout(type, typeSpeed);
  }

  if (typewriterElement) {
    type();
  }


  // ==========================================
  // 3. Canvas Starfield Background
  // ==========================================
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  let stars = [];
  const starCount = 150;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  class Star {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height; // Spread initially
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.size = Math.random() * 1.8 + 0.2;
      this.speed = Math.random() * 0.5 + 0.1;
      this.opacity = Math.random() * 0.8 + 0.2;
      // Slightly different velocities for depth parallax
      this.parallaxFactor = this.size * 0.15;
    }

    update() {
      this.y += this.speed;
      
      // Horizontal mouse drift parallax
      const dx = (mouse.x - canvas.width / 2) * this.parallaxFactor * 0.05;
      this.x += dx * 0.1;

      // Wrap-around checking
      if (this.y > canvas.height) {
        this.reset();
      }
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
    }

    draw() {
      ctx.fillStyle = `rgba(243, 241, 246, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
  }

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Smooth mouse coordinates interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    stars.forEach(star => {
      star.update();
      star.draw();
    });

    requestAnimationFrame(animateStars);
  }

  if (canvas) {
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    });

    resizeCanvas();
    animateStars();
  }


  // ==========================================
  // 4. Scroll Reveal & Skill Progress Animation
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-progress-bar');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // If the entry is a skill category card, trigger child skill progress animations
        if (entry.target.classList.contains('skill-category')) {
          const barsInCard = entry.target.querySelectorAll('.skill-progress-bar');
          barsInCard.forEach(bar => {
            bar.style.width = bar.getAttribute('data-level');
          });
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before item is in view
  });

  revealElements.forEach(elem => {
    revealObserver.observe(elem);
  });


  // ==========================================
  // 5. Dynamic Certifications Loading
  // ==========================================
  const certifications = [
    {
      title: "Unleashing the Power of AI Agents",
      organization: "IBM SkillsBuild",
      orgUrl: "https://skillsbuild.org?utm_source=chatgpt.com",
      issued: "June 2026",
      image: "certificates/IBM-Unleashing-the-power-of-AI-Agents.png"
    },
    {
      title: "Effective Leadership",
      organization: "HP LIFE",
      orgUrl: "https://www.life-global.org?utm_source=chatgpt.com",
      issued: "January 2026",
      image: "certificates/hp-life-foundation-effective-leadership.png"
    }
  ];

  const certsGrid = document.getElementById('certs-grid');
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function renderCertifications() {
    if (!certsGrid) return;

    certsGrid.innerHTML = '';
    certifications.forEach((cert, idx) => {
      const card = document.createElement('div');
      card.className = `cert-card glass-card reveal reveal-delay-${idx % 3}`;
      card.innerHTML = `
        <div class="cert-img-container">
          <img src="${cert.image}" alt="${cert.title}" class="cert-img" loading="lazy">
          <div class="cert-overlay">
            <button class="btn btn-primary view-cert-btn" data-img="${cert.image}">View Certificate</button>
          </div>
        </div>
        <div class="cert-content">
          <div>
            <div class="cert-org">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <a href="${cert.orgUrl}" target="_blank" rel="noopener noreferrer">${cert.organization}</a>
            </div>
            <h3>${cert.title}</h3>
          </div>
          <div class="cert-date">Issued: ${cert.issued}</div>
        </div>
      `;
      certsGrid.appendChild(card);
      revealObserver.observe(card);
    });

    // Attach click listeners to view buttons
    document.querySelectorAll('.view-cert-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const imgSrc = e.target.getAttribute('data-img');
        openModal(imgSrc);
      });
    });
  }

  function openModal(imgSrc) {
    if (modal && modalImg) {
      modalImg.src = imgSrc;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop page scrolling
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (modalImg) modalImg.src = '';
      }, 300);
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  renderCertifications();


  // ==========================================
  // 6. Contact Form Validation & API Submission
  // ==========================================
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function setInvalid(inputElement, isValid) {
    const parent = inputElement.parentElement;
    if (isValid) {
      parent.classList.remove('invalid');
    } else {
      parent.classList.add('invalid');
    }
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear status
      formStatus.style.display = 'none';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      // Validate inputs
      const isNameValid = nameInput.value.trim().length > 0;
      const isEmailValid = validateEmail(emailInput.value.trim());
      const isMessageValid = messageInput.value.trim().length > 0;

      setInvalid(nameInput, isNameValid);
      setInvalid(emailInput, isEmailValid);
      setInvalid(messageInput, isMessageValid);

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        return;
      }

      // If valid, send POST request
      submitBtn.disabled = true;
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `Sending... <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>`;

      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
      };

      try {
        const response = await fetch('https://portfolio.ayushshivam7245.workers.dev/forms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          formStatus.textContent = "Message sent successfully! Thank you for reaching out.";
          formStatus.classList.add('success');
          formStatus.style.display = 'block';
          form.reset();
          
          // Force floating labels reset by triggering input events
          nameInput.dispatchEvent(new Event('input'));
          emailInput.dispatchEvent(new Event('input'));
          messageInput.dispatchEvent(new Event('input'));
        } else {
          throw new Error('Server returned an error');
        }
      } catch (err) {
        formStatus.textContent = "Oops! Something went wrong while sending your message. Please try again later.";
        formStatus.classList.add('error');
        formStatus.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });

    // Add input event listeners to clear error states on type
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length > 0) {
        setInvalid(nameInput, true);
      }
    });
    emailInput.addEventListener('input', () => {
      if (validateEmail(emailInput.value.trim())) {
        setInvalid(emailInput, true);
      }
    });
    messageInput.addEventListener('input', () => {
      if (messageInput.value.trim().length > 0) {
        setInvalid(messageInput, true);
      }
    });
  }

});

// Spinner CSS Animation injected dynamically
const styleElement = document.createElement('style');
styleElement.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(styleElement);
