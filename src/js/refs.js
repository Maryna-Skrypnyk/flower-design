export default function getRefs() {
  return {
    body: document.querySelector('body'),
    delivery: document.querySelector('.js-delivery'),
    catalog: document.querySelector('.js-catalog'),
    hamburger: document.querySelector('.hamburger'),
  };
}
