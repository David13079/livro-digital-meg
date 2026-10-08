// MEG 21ª EDIÇÃO (FNQ) DIGITAL E-READER - JAVASCRIPT CONTROLLER

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('meg-theme') || 'dark-theme';
  body.className = savedTheme;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('meg-theme', 'light-theme');
      } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('meg-theme', 'dark-theme');
      }
    });
  }

  // 2. Global Search and Keyboard Shortcut
  const globalSearch = document.getElementById('globalSearch');
  
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (globalSearch) {
        globalSearch.focus();
        globalSearch.select();
      }
    }
  });

  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const sections = document.querySelectorAll('.book-section');

      if (!term) {
        sections.forEach(s => s.style.display = 'block');
        return;
      }

      sections.forEach(sec => {
        const text = sec.textContent.toLowerCase();
        if (text.includes(term)) {
          sec.style.display = 'block';
        } else {
          sec.style.display = 'none';
        }
      });
    });
  }

  // 3. Glossary Filter
  const glossarySearch = document.getElementById('glossarySearch');
  const glossaryContainer = document.getElementById('glossaryContainer');

  if (glossarySearch && glossaryContainer) {
    glossarySearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const cards = glossaryContainer.querySelectorAll('.glossary-card');

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(q)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 4. Tab Navigation Pills
  const navPills = document.querySelectorAll('.nav-pill');
  navPills.forEach(pill => {
    pill.addEventListener('click', () => {
      navPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const targetTab = pill.getAttribute('data-tab');
      if (targetTab === 'tab-tangram') {
        document.getElementById('cap1-tangram')?.scrollIntoView({ behavior: 'smooth' });
      } else if (targetTab === 'tab-fundamentos') {
        document.getElementById('detalhe-fundamentos')?.scrollIntoView({ behavior: 'smooth' });
      } else if (targetTab === 'tab-glossario') {
        document.getElementById('cap3-glossarios')?.scrollIntoView({ behavior: 'smooth' });
      } else if (targetTab === 'tab-notebooklm') {
        document.getElementById('notebooklm-section')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // 5. Active TOC Item on Scroll
  const tocItems = document.querySelectorAll('.toc-item');
  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.style.fontWeight = '700';
            item.style.color = 'var(--accent-cyan)';
          } else {
            item.style.fontWeight = '400';
            item.style.color = 'var(--text-secondary)';
          }
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('.book-section, .fundamento-block').forEach(el => {
    observer.observe(el);
  });
});
