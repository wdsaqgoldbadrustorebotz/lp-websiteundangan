/**
 * Website Undangan Digital - App JS
 * Version: 1.0.0
 * Features:
 * 1. Catalog Tab Filter Switcher (Instant & Smooth)
 * 2. Studio Modal Live Demo (Fluid Fullstage Desktop & Realistic iPhone Simulator + Direct External Link)
 * 3. Step Accordion
 * 4. Mobile App Bottom Navigation Active Scroll Observer
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Tab Filter Katalog Tema
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-cap-btn, .tab-pill, .tab-btn');
  const catalogGroups = document.querySelectorAll('.catalog-group');

  if (tabButtons.length > 0 && catalogGroups.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetGroup = button.getAttribute('data-target');

        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show/Hide catalog groups with display grid
        catalogGroups.forEach(group => {
          if (group.id === targetGroup) {
            group.style.display = 'grid';
          } else {
            group.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
     2. Studio Modal Live Demo Switcher (Desktop & Mobile Simulator)
     ========================================================================== */
  const modalOverlay = document.getElementById('demoModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const previewStage = document.getElementById('previewStage');
  const demoIframe = document.getElementById('demoIframe');
  const modalThemeTitle = document.getElementById('modalThemeTitle');
  const modalOrderBtn = document.getElementById('modalOrderBtn');
  const modalExternalLink = document.getElementById('modalExternalLink');
  const deviceBtns = document.querySelectorAll('.device-tab-btn, .device-btn');
  const demoTriggerBtns = document.querySelectorAll('.btn-open-demo, .btn-card-demo');

  // Open Modal function
  function openDemoModal(url, title) {
    if (!modalOverlay || !demoIframe) return;

    if (modalThemeTitle) modalThemeTitle.textContent = title || 'Live Demo Preview';
    if (modalOrderBtn) {
      modalOrderBtn.href = `https://wa.me/6282258041628?text=Halo%20Admin,%20saya%20tertarik%20dengan%20tema%20${encodeURIComponent(title || 'Pilihan')}`;
    }

    if (modalExternalLink && url) {
      modalExternalLink.href = url;
    }

    if (url) {
      demoIframe.src = url;
    }

    // Open overlay
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  // Close Modal function
  function closeDemoModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Unlock background scroll
    
    // Clear iframe src after transition to save memory
    setTimeout(() => {
      if (demoIframe) demoIframe.src = 'about:blank';
    }, 250);
  }

  // Bind Demo Trigger Buttons
  demoTriggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const demoUrl = btn.getAttribute('data-demo-url');
      const themeTitle = btn.getAttribute('data-theme-title');
      if (demoUrl) {
        openDemoModal(demoUrl, themeTitle);
      }
    });
  });

  // Bind Close Buttons & Overlay click
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDemoModal();
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeDemoModal();
      }
    });
  }

  // Escape Key to Close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeDemoModal();
    }
  });

  // Device Switcher (Desktop Full Viewport vs Mobile Phone Frame)
  deviceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const mode = btn.getAttribute('data-device'); // 'desktop' or 'mobile'
      deviceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (previewStage) {
        if (mode === 'mobile') {
          previewStage.classList.remove('desktop-view');
          previewStage.classList.add('mobile-view');
        } else {
          previewStage.classList.remove('mobile-view');
          previewStage.classList.add('desktop-view');
        }
      }
    });
  });

  /* ==========================================================================
     3. Step Accordion
     ========================================================================== */
  const orderCards = document.querySelectorAll('.order-pill-card');

  orderCards.forEach(card => {
    const header = card.querySelector('.order-pill-header');
    const body = card.querySelector('.order-pill-body');

    if (header && body) {
      header.addEventListener('click', () => {
        const isHidden = body.style.display === 'none';
        body.style.display = isHidden ? 'block' : 'none';
      });
    }
  });

  /* ==========================================================================
     4. Mobile Bottom Dock Scroll Observer
     ========================================================================== */
  const dockBtns = document.querySelectorAll('.dock-btn:not(.cta-dock)');
  const sections = document.querySelectorAll('section[id], header[id], aside[id]');

  if ('IntersectionObserver' in window && dockBtns.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          dockBtns.forEach(item => {
            const itemHref = item.getAttribute('href');
            if (itemHref === `#${currentId}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: 0.25
    });

    sections.forEach(sec => observer.observe(sec));
  }
});
