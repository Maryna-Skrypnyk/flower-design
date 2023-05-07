import getRefs from '../refs';
import { BASKET_KEYS } from '../../data/data';

const refs = getRefs();

refs.btnOrder.addEventListener('click', onOrder);

function onOrder(e) {
  refs.btnContinueShopping.style.display = 'none';
  e.target.style.display = 'none';
  refs.formOrder.style.display = 'block';
  displayCartOrder();
}

function displayCartOrder() {
  let cartItems = JSON.parse(localStorage.getItem(BASKET_KEYS.ProductsInCart));
  let cartCost = localStorage.getItem(BASKET_KEYS.TotalCost);

  if (cartItems && Object.keys(cartItems).length > 0 && refs.productsInBasket) {
    refs.productsContainerInBasket.style.display = 'block';
    // refs.containerBasket.style.display = 'none';

    refs.productsInBasket.innerHTML = '';

    Object.values(cartItems).map(item => {
      refs.productsInBasket.innerHTML += `
            <div class="product">
              <img width="30" height="30" src=${item.image}>
              <span class="product-name">${item.name}</span>
            </div>
            <div class="price">${item.price},00 грн</div>
            <div class="quantity" data-id=${item.id}>
              <span class="quantity-cart">${item.inCart}</span>
            </div>
            <div class="total">${item.inCart * item.price},00 грн</div>
            `;
    });

    refs.productsInBasket.innerHTML += `
        <div class="basket-total-container">
            <h4 class="basket-total-title">Загальна вартість</h4>
            <h4 class="basket-total">${cartCost},00 грн</h4>
        </div>`;
    refs.productsInBasket.insertAdjacentElement('afterend', refs.formOrder);
  }
}
