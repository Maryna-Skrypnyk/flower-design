import getRefs from '../refs';
import { BASKET_KEYS } from '../../data/data';

const refs = getRefs();

// оновлення вигляду корзин в продукті каталогу при додаванні його в корзину при першій загрузці
export function updateProductBasketInCatalog(catalogInfo) {
  catalogInfo.forEach(el => {
    const btnProductCatalogById = refs.catalog.querySelector(
      `.button-primary--catalog[data-id="${el.id}"]`
    );
    const numberProductInBasket = refs.catalog.querySelector(
      `.basket-catalog__count[data-id="${el.id}"]`
    );

    let cartItems = localStorage.getItem(BASKET_KEYS.ProductsInCart);

    if (cartItems && cartItems !== '{}') {
      cartItems = JSON.parse(cartItems);
      const arrayProducts = Object.keys(cartItems);
      if (arrayProducts.includes(el.id)) {
        const product = Object.values(cartItems).find(
          product => product.id === el.id
        );
        // console.log('Product ', product);
        btnProductCatalogById.childNodes[
          btnProductCatalogById.childNodes.length - 1
        ].nodeValue = 'В кошику';
        btnProductCatalogById.setAttribute('data-in-cart', true);
        numberProductInBasket.textContent = product.inCart;
      } else {
        btnProductCatalogById.childNodes[
          btnProductCatalogById.childNodes.length - 1
        ].nodeValue = 'В кошик';
        btnProductCatalogById.setAttribute('data-in-cart', false);
        numberProductInBasket.textContent = '0';
      }
    }
    if (cartItems === null || cartItems === '{}') {
      btnProductCatalogById.childNodes[
        btnProductCatalogById.childNodes.length - 1
      ].nodeValue = 'В кошик';
      btnProductCatalogById.setAttribute('data-in-cart', false);
      numberProductInBasket.textContent = '0';
    }
  });
}

// оновлення вигляду корзини в продукті каталогу при додаванні його в корзину по ID
export function updateProductBasketInCatalogById(productId) {
  const btnProductCatalogById = refs.catalog.querySelector(
    `.button-primary--catalog[data-id="${productId}"]`
  );
  const numberProductInBasket = refs.catalog.querySelector(
    `.basket-catalog__count[data-id="${productId}"]`
  );

  let cartItems = localStorage.getItem(BASKET_KEYS.ProductsInCart);

  if (cartItems && cartItems !== '{}') {
    cartItems = JSON.parse(cartItems);
    const arrayProducts = Object.keys(cartItems);
    if (arrayProducts.includes(productId)) {
      const product = Object.values(cartItems).find(
        product => product.id === productId
      );
      btnProductCatalogById.childNodes[
        btnProductCatalogById.childNodes.length - 1
      ].nodeValue = 'В кошику';
      btnProductCatalogById.setAttribute('data-in-cart', true);
      numberProductInBasket.textContent = product.inCart;
    } else {
      btnProductCatalogById.childNodes[
        btnProductCatalogById.childNodes.length - 1
      ].nodeValue = 'В кошик';
      btnProductCatalogById.setAttribute('data-in-cart', false);
      numberProductInBasket.textContent = '0';
    }
  }
  if (cartItems === null || cartItems === '{}') {
    btnProductCatalogById.childNodes[
      btnProductCatalogById.childNodes.length - 1
    ].nodeValue = 'В кошик';
    btnProductCatalogById.setAttribute('data-in-cart', false);
    numberProductInBasket.textContent = '0';
  }
}

// window.addEventListener('storage', e => {
//   if (e.key === BASKET_KEYS.ProductsInCart) {
//     let cartItems = localStorage.getItem(BASKET_KEYS.ProductsInCart);
//     if (cartItems !== null && cartItems !== '{}') {
//       cartItems = JSON.parse(cartItems);

//       const productButtons = refs.catalog.querySelectorAll(
//         '.button-primary--catalog'
//       );
//       productButtons.forEach(button => {
//         const productId = button.dataset.id;

//         const arrayProducts = Object.values(cartItems);
//         if (arrayProducts.includes(productId)) {
//           const product = arrayProducts.find(
//             product => product.id === productId
//           );
//           button.childNodes[
//             btnProductCatalogById.childNodes.length - 1
//           ].nodeValue = 'В кошику';
//           button.setAttribute('data-in-cart', true);
//           button.querySelector('span[data-id]').textContent = product.inCart;
//         } else {
//           button.childNodes[
//             btnProductCatalogById.childNodes.length - 1
//           ].nodeValue = 'В кошик';
//           button.setAttribute('data-in-cart', false);
//           button.querySelector('span[data-id]').textContent = '0';
//         }
//       });
//     }
//   }
// });
