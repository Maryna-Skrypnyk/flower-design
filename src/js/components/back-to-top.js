import { addBackToTop } from 'vanilla-back-to-top';

if (window.matchMedia('(max-width: 479px)').matches) {
  addBackToTop({
    diameter: 40,
    backgroundColor: 'rgba(255, 194, 199, .9)',
    innerHTML:
      '<svg viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>',
    textColor: '#fff',
    scrollDuration: 250,
    cornerOffset: 10,
  });
}

if (window.matchMedia('(min-width: 480px)').matches) {
  addBackToTop({
    diameter: 42,
    backgroundColor: 'rgba(255, 194, 199, .9)',
    innerHTML:
      '<svg viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>',
    textColor: '#fff',
    scrollDuration: 250,
    cornerOffset: 20,
  });
}
