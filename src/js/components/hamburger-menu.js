import getRefs from '../refs';

const refs = getRefs();

const onToggleHamburgerMenu = e => {
  const expanded = refs.hamburger.toggleAttribute('aria-expanded');
  //   const expanded =
  //     refs.hamburger.getAttribute('aria-expanded') === 'true' || false;

  refs.hamburger.classList.toggle('is-open');
  refs.hamburger.setAttribute('aria-expanded', expanded);

  document.body.classList.toggle('menu-open');
  refs.navigation.classList.toggle('is-open');
};

refs.navLink.forEach(link =>
  link.addEventListener('click', e => {
    refs.hamburger.classList.remove('is-open');
    refs.hamburger.setAttribute('aria-expanded', false);

    document.body.classList.remove('menu-open');
    refs.navigation.classList.remove('is-open');
  })
);

const onCloseNavMenu = e => {
  if (e.target === e.currentTarget) {
    onToggleHamburgerMenu();
  }
};

refs.hamburger.addEventListener('click', onToggleHamburgerMenu);
refs.navigation.addEventListener('click', onCloseNavMenu);
