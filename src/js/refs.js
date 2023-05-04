export default function getRefs() {
  return {
    body: document.querySelector('body'),
    delivery: document.querySelector('.js-delivery'),
    galleryList: document.querySelector('.js-gallery-list'),
    catalog: document.querySelector('.js-catalog'),
    hamburger: document.querySelector('[data-menu-button]'),
    navigation: document.querySelector('[data-menu]'),
    navLink: document.querySelectorAll('[data-menu] .js-nav-link'),
    reviews: document.querySelector('.js-reviews'),
    formReviews: document.querySelector('#form-reviews'),
    spinner: document.querySelector('.spinner'),
    addToBasket: document.querySelectorAll('js-add-to-basket'),
    basketQuantity: document.querySelector('.basket span'),
    productsContainerInBasket: document.querySelector('.products-container'),
    containerBasket: document.querySelector('.container-basket'),
    modalbackdrop: document.querySelector('.backdrop'),
    btnToBasket: document.querySelector('.js-button-toBasket'),
    productsInBasket: document.querySelector('.products'),
  };
}
