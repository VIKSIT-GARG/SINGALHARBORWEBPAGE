(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveals = [...document.querySelectorAll('.reveal')];
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    reveals.forEach(node => observer.observe(node));
    document.documentElement.classList.add('js-motion');
    reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { document.documentElement.classList.remove('js-motion'); observer.disconnect(); } });
  }
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#nav-links');
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open); });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  const command = document.querySelector('#setup-command');
  const status = document.querySelector('#copy-status');
  const copy = document.querySelector('#copy-command');
  const base = 'git clone https://github.com/VIKSIT-GARG/SurgeScout.git SignalHarbor && cd SignalHarbor && ';
  document.querySelectorAll('.os-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.os-tab').forEach(button => { button.classList.toggle('selected', button === tab); button.setAttribute('aria-pressed', String(button === tab)); });
    const windows = tab.dataset.os === 'windows';
    command.textContent = base + (windows ? 'setup.cmd' : 'bash setup.sh');
    document.querySelector('#shell-label').textContent = windows ? 'Run in Windows Command Prompt (cmd.exe)' : 'Run in Bash on Linux or macOS';
    status.textContent = '';
  }));
  copy.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(command.textContent);
      status.textContent = 'Command copied. Paste it into your terminal.';
    } catch {
      const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(command); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Command selected. Press Ctrl+C (or ⌘C) to copy.';
    }
  });
  const progress = document.querySelector('.scroll-progress');
  const header = document.querySelector('.site-header');
  const art = document.querySelector('.signal-art');
  let queued = false;
  const updateScroll = () => {
    const length = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${length > 0 ? Math.min(1, Math.max(0, window.scrollY / length)) : 0})`;
    header.classList.toggle('scrolled', window.scrollY > 20);
    if (!reducedMotion.matches && window.scrollY < 1200) art.style.setProperty('--parallax', `${Math.min(10, window.scrollY * 0.025)}px`);
    queued = false;
  };
  window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  window.addEventListener('resize', updateScroll); updateScroll();
})();
