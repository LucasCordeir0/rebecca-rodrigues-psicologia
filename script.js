/**
 * Script principal da Landing Page - Rebecca Rodrigues Psicóloga
 * Funcionalidades: navbar dinâmica, scroll suave, animações, FAQ accordion
 */

document.addEventListener('DOMContentLoaded', function() {
  // ============================================
  // NAVBAR DINÂMICA
  // ============================================
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  let lastScrollY = window.scrollY;
  let ticking = false;

  // Efeito de scroll na navbar
  function updateHeader() {
    const currentScrollY = window.scrollY;

    // Adiciona classe 'scrolled' quando rola para baixo
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Esconde/mostra navbar baseado na direção do scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

  // Toggle menu mobile
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');

    // Animação do ícone hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Fechar menu ao clicar em um link
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  function updateProgressBar() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgressBar.style.width = scrolled + '%';
  }

  window.addEventListener('scroll', updateProgressBar);

  // ============================================
  // ANIMAÇÕES AO ROLAR (INTERSECTION OBSERVER)
  // ============================================
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2');

  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Parar de observar após animação
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(function(element) {
    fadeObserver.observe(element);
  });

  // ============================================
  // FAQ ACCORDION
  // ============================================
  const faqButtons = document.querySelectorAll('.faq-button');

  faqButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const content = button.nextElementSibling;

      // Fecha todos os outros itens
      faqButtons.forEach(function(otherButton) {
        if (otherButton !== button) {
          otherButton.setAttribute('aria-expanded', 'false');
          otherButton.nextElementSibling.style.maxHeight = null;
        }
      });

      // Toggle do item atual
      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        button.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // ============================================
  // SCROLL SUAVE PARA LINKS ÂNCORA
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Ignora se for apenas "#"
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // EFEITO PARALLAX SUAVE NO HERO
  // ============================================
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  if (hero && heroContent) {
    window.addEventListener('scroll', function() {
      const scrolled = window.scrollY;
      const heroHeight = hero.offsetHeight;

      if (scrolled < heroHeight) {
        // Move o conteúdo em velocidade diferente do scroll
        heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        heroContent.style.opacity = 1 - (scrolled / heroHeight);
      }
    });
  }

  // ============================================
  // DESTACAR LINK ATIVO NO MENU
  // ============================================
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveLink() {
    const scrollPos = window.scrollY + header.offsetHeight + 100;

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink);
  highlightActiveLink(); // Chama uma vez ao carregar

  // ============================================
  // BOTÃO WHATSAPP - ANIMAÇÃO AO CLICAR
  // ============================================
  const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .whatsapp-float');

  whatsappButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      // Adiciona efeito de ripple
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);

      setTimeout(function() {
        ripple.remove();
      }, 600);
    });
  });

  // ============================================
  // ADICIONA CSS DA ANIMAÇÃO RIPPLE
  // ============================================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // LAZY LOADING PARA IMAGENS (se houver)
  // ============================================
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // ============================================
  // CONSOLE LOG - Página carregada
  // ============================================
  console.log('Landing Page Rebecca Rodrigues - Carregada com sucesso!');
});
