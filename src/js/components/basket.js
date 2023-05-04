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

  let cartCost = localStorage.getItem(BASKET_KEYS.TotalCost);

  if (cartItems && Object.keys(cartItems).length > 0 && refs.productsInBasket) {
    refs.productsContainerInBasket.style.display = 'block';
    refs.containerBasket.style.display = 'none';

    refs.productsInBasket.innerHTML = '';

    Object.values(cartItems).map(item => {
      refs.productsInBasket.innerHTML += `
        <div class="product" data-id=${item.id}>
          <button class="btn-icon" type="button" data-delete>
            <svg class="icon-delete-product">
              ${iconDeleteProduct}
            </svg>
          </button>
          <img width="30" height="30" src=${item.image}>
          <span class="product-name">${item.name}</span>
        </div>
        <div class="price">${item.price},00 грн</div>
        <div class="quantity" data-id=${item.id}>
          <button class="btn-icon-arrow" data-remove type="button">
            <svg class="icon-action icon-action-remove">
              ${removeQuantity}
            </svg>
          </button>
          <span class="quantity-cart">${item.inCart}</span>
          <button class="btn-icon-arrow" data-add type="button">
            <svg class="icon-action">
              ${addQuantity}
            </svg>
          </button>
        </div>
        <div class="total">${item.inCart * item.price},00 грн</div>
        `;
    });

    refs.productsInBasket.innerHTML += `
    <div class="basket-total-container">
      <h4 class="basket-total-title">Загальна вартість</h4>
      <h4 class="basket-total">${cartCost},00 грн</h4>
    </div>`;
  } else {
    refs.productsContainerInBasket.style.display = 'none';
    refs.containerBasket.style.display = 'flex';
  }
}

/* ВИДАЛЕННЯ ТА ОНОВЛЕННЯ ТОВАРІВ У КОШИКУ */

/* Функція для видалення товару з кошика */
function removeProductFromCart(id) {
  const cartItems =
    JSON.parse(localStorage.getItem(BASKET_KEYS.ProductsInCart)) || {};
  delete cartItems[id];
  localStorage.setItem(BASKET_KEYS.ProductsInCart, JSON.stringify(cartItems));
}

/* Оновлення вартості товарів в корзині та збереження в локальне сховище */
function updateTotalCost() {
  const cartItems =
    JSON.parse(localStorage.getItem(BASKET_KEYS.ProductsInCart)) || {};

  if (cartItems) {
    const totalCost = Object.values(cartItems).reduce(
      (acc, item) => (acc += item.price * item.inCart),
      0
    );
    localStorage.setItem(BASKET_KEYS.TotalCost, totalCost);
  }
}

/* Оновлення кількості товарів в кошику, збереження в локальне сховище та виведення на загальну сторінку*/
function updateCartNumbers() {
  const cartItems =
    JSON.parse(localStorage.getItem(BASKET_KEYS.ProductsInCart)) || {};

  if (cartItems) {
    const cartNumbers = Object.values(cartItems).reduce(
      (acc, item) => (acc += item.inCart),
      0
    );
    localStorage.setItem(BASKET_KEYS.CartNumbers, cartNumbers);
    refs.basketQuantity.textContent = cartNumbers;
  }
}

/* Подія "click" на весь список продуктів в кошику */
refs.productsInBasket.addEventListener('click', deleteProductFromCart);

function deleteProductFromCart(e) {
  // Перевірка, чи була натиснута кнопка видалення
  const buttonDelete = e.target.closest('button[data-delete]');
  if (buttonDelete) {
    // Видалення товару з кошика по id та оновлення вмісту кошика на сторінці
    const idProduct = buttonDelete.parentNode.dataset.id;
    removeProductFromCart(idProduct);
    updateTotalCost();
    updateCartNumbers();
    displayCart();
  }
}

/* РЕАЛІЗАЦІЯ КНОПОК ДОДАВАННЯ/ВІДНІМАННЯ КІЛЬКОСТІ ТОВАРІВ В КОШИКУ */

/* Функція збільшення на одиницю продуктів в кошику */
function incrementProduct(id) {
  let cartItems =
    JSON.parse(localStorage.getItem(BASKET_KEYS.ProductsInCart)) || {};
  cartItems[id].inCart += 1;
  localStorage.setItem(BASKET_KEYS.ProductsInCart, JSON.stringify(cartItems));
}

/* Функція зменшення на одиницю продуктів в кошику */
function decrementProduct(id) {
  let cartItems =
    JSON.parse(localStorage.getItem(BASKET_KEYS.ProductsInCart)) || {};
  cartItems[id].inCart -= 1;
  if (cartItems[id].inCart === 0) {
    return;
  }
  localStorage.setItem(BASKET_KEYS.ProductsInCart, JSON.stringify(cartItems));
}

/* Подія "click" на весь список продуктів в кошику */
refs.productsInBasket.addEventListener('click', updateQuantityProductInCart);

function updateQuantityProductInCart(e) {
  // Перевірка, чи була натиснута відповідна кнопка
  const buttonAdd = e.target.closest('button[data-add]');
  const buttonRemove = e.target.closest('button[data-remove]');
  if (buttonAdd) {
    // Додавання одиниці товару в кошик по id та оновлення кількості, вартості та загальної вартості
    const idProduct = buttonAdd.parentNode.dataset.id;
    incrementProduct(idProduct);
    updateTotalCost();
    updateCartNumbers();
    displayCart();
  }
  if (buttonRemove) {
    // Додавання одиниці товару в кошик по id та оновлення кількості, вартості та загальної вартості
    const idProduct = buttonRemove.parentNode.dataset.id;
    decrementProduct(idProduct);
    updateTotalCost();
    updateCartNumbers();
    displayCart();
  }
}

onLoadCardNumbers();
// displayCart();
