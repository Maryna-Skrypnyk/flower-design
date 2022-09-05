export default function getRefs() {
  return {
    body: document.querySelector('body'),
    delivery: document.querySelector('.js-delivery'),
    catalog: document.querySelector('.js-catalog'),
    hamburger: document.querySelector('[data-menu-button]'),
    navigation: document.querySelector('[data-menu]'),
    navLink: document.querySelectorAll('[data-menu] .js-nav-link'),
    reviews: document.querySelector('.js-reviews'),
    paginationNumbers: document.getElementById('pagination-numbers'),
  };
}
