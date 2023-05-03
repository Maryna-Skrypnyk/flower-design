import getRefs from '../refs';
import ApiService from './service-api';
import { iconDeleteProduct, addQuantity, removeQuantity } from './icons';
import { openModal } from './modal-basket';
const refs = getRefs();

const productApiService = new ApiService();

const BASKET_KEYS = {
  ProductsInCart: 'productsInCart',
  CartNumbers: 'cartNumbers',
  TotalCost: 'totalCost',
};

const HIT_PRODUCT_ID = '0';

/* Знаходження об'єкту товару по id та додавання в корзину */
refs.catalog.addEventListener('click', async e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  } else {
    const idProduct = e.target.dataset.id;
    const productById = await productApiService.getFullProductInfo(idProduct);
    cartNumbers(productById);
    totalCost(productById);
    openModal();
  }
});

refs.btnToBasket.addEventListener('click', async e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  } else {
    const productById = await productApiService.getFullProductInfo(
      HIT_PRODUCT_ID
    );
    cartNumbers(productById);
    totalCost(productById);
    openModal();
  }
});

/* Відображення кількості товарів з локального сховища при першому завантаженні*/
function onLoadCardNumbers() {
  let productNumbers = localStorage.getItem(BASKET_KEYS.CartNumbers);
  if (productNumbers) {
    refs.basketQuantity.textContent = productNumbers;
  }
}

/* Встановлення і зміна кількості товарів в кошику, збереження в локальне сховище */
function cartNumbers(product) {
  let productNumbers = localStorage.getItem(BASKET_KEYS.CartNumbers);
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem(BASKET_KEYS.CartNumbers, productNumbers + 1);
    refs.basketQuantity.textContent = productNumbers + 1;
  } else {
    localStorage.setItem(BASKET_KEYS.CartNumbers, 1);
    refs.basketQuantity.textContent = 1;
  }
  setItems(product);
}

/* Додавання об'єктів товару до локального сховища по id, або зміна кількості доданого */
function setItems(product) {
  let cartItems = localStorage.getItem(BASKET_KEYS.ProductsInCart);
  cartItems = JSON.parse(cartItems);
  if (cartItems !== null) {
    if (cartItems[product.id] === undefined) {
      cartItems = {
        ...cartItems,
        [product.id]: product,
      };
    }
    cartItems[product.id].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.id]: product,
    };
  }
  localStorage.setItem(BASKET_KEYS.ProductsInCart, JSON.stringify(cartItems));
}

/* Підрахунок вартості товарів в корзині та зберігаємо в локальне сховище */
function totalCost(product) {
  let cartCost = localStorage.getItem(BASKET_KEYS.TotalCost);
  if (cartCost) {
    cartCost = parseInt(cartCost);
    localStorage.setItem(BASKET_KEYS.TotalCost, cartCost + product.price);
  } else {
    localStorage.setItem(BASKET_KEYS.TotalCost, product.price);
  }
}

/* Відображення розмітки корзини */
export function displayCart() {
  let cartItems = localStorage.getItem(BASKET_KEYS.ProductsInCart);
  cartItems = JSON.parse(cartItems);

  const productsInBasket = document.querySelector('.products');

  let cartCost = localStorage.getItem(BASKET_KEYS.TotalCost);

  if (cartItems && productsInBasket) {
    refs.productsContainerInBasket.style.display = 'block';
    refs.containerBasket.style.display = 'none';

    productsInBasket.innerHTML = '';

    Object.values(cartItems).map(item => {
      productsInBasket.innerHTML += `
        <div class="product">
          <button class="btn-icon" type="button">
            <svg class="icon-delete-product">
              ${iconDeleteProduct}
            </svg>
          </button>
          <img width="30" height="30" src=${item.image}>
          <span class="product-name">${item.name}</span>
        </div>
        <div class="price">${item.price},00 грн</div>
        <div class="quantity">
          <button class="btn-icon-arrow" type="button">
            <svg class="icon-action">
              ${removeQuantity}
            </svg>
          </button>
          <span class="quantity-cart">${item.inCart}</span>
          <button class="btn-icon-arrow" type="button">
            <svg class="icon-action">
              ${addQuantity}
            </svg>
          </button>
        </div>
        <div class="total">${item.inCart * item.price},00 грн</div>
        `;
    });

    productsInBasket.innerHTML += `
    <div class="basket-total-container">
      <h4 class="basket-total-title">Загальна вартість</h4>
      <h4 class="basket-total">${cartCost},00 грн</h4>
    </div>
    <div class="buttons-container">
      <button href="#catalog" type="button" class="button-fourthly continue-shopping">
          Продовжити покупки
      </button>
      <button type="submit" class="button-secondary">Оформити замовлення</button>
    </div>`;
  } else {
    refs.productsContainerInBasket.style.display = 'none';
  }
}

onLoadCardNumbers();
// displayCart();
