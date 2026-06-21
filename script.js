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
  // 4. Scroll Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
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

  // ==========================================
  // 7. Dynamic GitHub Projects Fetching
  // ==========================================
  async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    try {
      const response = await fetch('data/projects.json');
      if (!response.ok) throw new Error("Failed to load projects.json");
      const data = await response.json();
      const projects = data.projects;
      
      projectsGrid.innerHTML = ''; // Clear spinner
      
      for (let i = 0; i < projects.length; i++) {
        const proj = projects[i];
        
        // Extract owner and repo from 'gitub' url
        const cleanUrl = proj.gitub.replace('https://github.com/', '').replace(/\/$/, '');
        const urlParts = cleanUrl.split('/');
        const owner = urlParts[0];
        const repo = urlParts[1];
        
        const card = document.createElement('div');
        card.className = `project-card glass-card reveal reveal-delay-${i % 3}`;
        
        // Render initial card layout with loading states
        card.innerHTML = `
          <div class="proj-img-container">
            <div class="proj-overlay-glow"></div>
            <span class="proj-badge">Fetching...</span>
            <div style="display:flex; justify-content:center; align-items:center; height:100%;"><div class="spinner" style="border: 3px solid rgba(255,255,255,0.1); border-top: 3px solid #ff4b2b; border-radius:50%; width:30px; height:30px; animation: spin 1s linear infinite;"></div></div>
          </div>
          <div class="proj-content">
            <h3>${proj.name}</h3>
            <p class="proj-desc" style="color: var(--text-muted);">Retrieving repository details from GitHub...</p>
            <div class="proj-tags" style="min-height: 25px;"></div>
            <div class="proj-actions">
              <a href="${proj.gitub}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-outline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                GitHub
              </a>
              ${proj.live ? `<a href="${proj.live}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-primary">Live Demo</a>` : ''}
            </div>
          </div>
        `;
        
        projectsGrid.appendChild(card);
        revealObserver.observe(card);
        
        // Fetch details from GitHub API asynchronously
        fetchRepoDetails(owner, repo, card, proj);
      }
    } catch (err) {
      console.error("Error loading projects.json:", err);
      projectsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #f87171;">
          <p>Failed to load projects. Please verify your connection.</p>
        </div>
      `;
    }
  }

  async function fetchRepoDetails(owner, repo, cardElement, proj) {
    try {
      const [repoRes, langRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${owner}/${repo}`),
        fetch(`https://api.github.com/repos/${owner}/${repo}/languages`)
      ]);
      
      if (!repoRes.ok) throw new Error(`Failed to fetch repo ${owner}/${repo}`);
      
      const repoData = await repoRes.json();
      const langData = await langRes.json();
      
      // OG image
      const ogImgUrl = `https://opengraph.githubassets.com/1/${owner}/${repo}`;
      
      // Description
      const description = repoData.description || "No description provided.";
      
      // Calculate language percentages
      let totalBytes = 0;
      for (const bytes of Object.values(langData)) {
        totalBytes += bytes;
      }
      
      let languageTags = [];
      let mainLanguage = "Code";
      let maxBytes = 0;
      
      for (const [lang, bytes] of Object.entries(langData)) {
        if (bytes > maxBytes) {
          maxBytes = bytes;
          mainLanguage = lang;
        }
        const pct = totalBytes > 0 ? ((bytes / totalBytes) * 100).toFixed(1) : 0;
        languageTags.push(`<span class="proj-tag">${lang} (${pct}%)</span>`);
      }
      
      if (languageTags.length === 0 && repoData.language) {
        languageTags.push(`<span class="proj-tag">${repoData.language}</span>`);
        mainLanguage = repoData.language;
      }
      
      // Update HTML content
      const imgContainer = cardElement.querySelector('.proj-img-container');
      const descElement = cardElement.querySelector('.proj-desc');
      const tagsContainer = cardElement.querySelector('.proj-tags');
      
      imgContainer.innerHTML = `
        <div class="proj-overlay-glow"></div>
        <span class="proj-badge">${mainLanguage}</span>
        <img src="${ogImgUrl}" alt="${proj.name}" class="proj-img" loading="lazy">
      `;
      
      descElement.textContent = description;
      descElement.style.color = ''; // Reset color
      tagsContainer.innerHTML = languageTags.join('');
      
    } catch (err) {
      console.error(`Error populating details for ${owner}/${repo}:`, err);
      // Fallback display
      const imgContainer = cardElement.querySelector('.proj-img-container');
      const descElement = cardElement.querySelector('.proj-desc');
      
      imgContainer.innerHTML = `
        <div class="proj-overlay-glow"></div>
        <span class="proj-badge">Repository</span>
        <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect width='800' height='500' fill='%230b071a'/><text x='50%25' y='50%25' fill='%23746d88' font-family='sans-serif' font-size='24' dy='.3em' text-anchor='middle'>GitHub Repo</text></svg>" alt="Repository" class="proj-img" loading="lazy">
      `;
      descElement.textContent = "Offline or rate-limited. Click the buttons below to open GitHub.";
    }
  }

  // Trigger load projects
  loadProjects();

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
