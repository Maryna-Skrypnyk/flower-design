import getRefs from '../refs';
import ApiService from './service-api';
import { updateProductBasketInCatalogById } from './product-basket';
import { iconDeleteProduct, addQuantity, removeQuantity } from './icons';
import { openModal } from './modal-basket';
import { BASKET_KEYS, HIT_PRODUCT_ID } from '../../data/data';

const refs = getRefs();

const productApiService = new ApiService();

/* Оновлення даних по id під час додавання в корзину */
async function updateAfterAddToBasket(idProduct) {
  const productById = await productApiService.getFullProductInfo(idProduct);
  cartNumbers(productById);
  totalCost(productById);
  openModal();
  updateProductBasketInCatalogById(idProduct);
}

/* Знаходження об'єкту товару по id та додавання в корзину */
function addToBasket(e) {
  const buttonContent = e.target.closest('.button-primary--catalog');
  const buttonHero = e.target.closest('.js-button-toBasket');
  if (buttonContent || buttonHero) {
    const idProduct = buttonContent?.dataset.id || HIT_PRODUCT_ID;
    updateAfterAddToBasket(idProduct);
  } else {
    return;
  }
}

refs.catalog.addEventListener('click', addToBasket);
refs.btnToBasket.addEventListener('click', addToBasket);

/* Відображення кількості товарів з локального сховища при першому завантаженні */
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
    // window.dispatchEvent(new Event('storage'));
    refs.basketQuantity.textContent = productNumbers + 1;
  } else {
    localStorage.setItem(BASKET_KEYS.CartNumbers, 1);
    // window.dispatchEvent(new Event('storage'));
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
  // window.dispatchEvent(new Event('storage'));
}

/* Підрахунок вартості товарів в корзині та зберігаємо в локальне сховище */
function totalCost(product) {
  let cartCost = localStorage.getItem(BASKET_KEYS.TotalCost);
  if (cartCost) {
    cartCost = parseInt(cartCost);
    localStorage.setItem(BASKET_KEYS.TotalCost, cartCost + product.price);
    // window.dispatchEvent(new Event('storage'));
  } else {
    localStorage.setItem(BASKET_KEYS.TotalCost, product.price);
    // window.dispatchEvent(new Event('storage'));
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
          <img src=${item.image}>
          <span class="product-name">${item.name}</span>
        </div>
        <div class="price">${item.price},00 &#8372;</div>
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
        <div class="total">${item.inCart * item.price},00 &#8372;</div>
        `;
    });

    refs.productsInBasket.innerHTML += `
    <div class="basket-total-container">
      <button class="btn-icon btn-icon-deleteAll" type="button" data-delete-all>
          <svg class="icon-delete-product">
              ${iconDeleteProduct}
          </svg>
      </button>
        <h4 class="basket-total-title">Загальна вартість</h4>
        <h4 class="basket-total">${cartCost},00 &#8372;</h4>
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
  // window.dispatchEvent(new Event('storage'));
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
    // window.dispatchEvent(new Event('storage'));
  }
}

/* Оновлення кількості товарів в кошику, збереження в локальне сховище та виведення на загальну сторінку*/
function updateCartNumbers() {
  const cartItems = JSON.parse(
    localStorage.getItem(BASKET_KEYS.ProductsInCart)
  );

  if (cartItems) {
    const cartNumbers = Object.values(cartItems).reduce(
      (acc, item) => (acc += item.inCart),
      0
    );
    localStorage.setItem(BASKET_KEYS.CartNumbers, cartNumbers);
    // window.dispatchEvent(new Event('storage'));
    refs.basketQuantity.textContent = cartNumbers;
  }
}

/* Подія "click" на весь список продуктів в кошику */
refs.productsInBasket.addEventListener('click', deleteProductFromCart);

function updateCartAfterDelete(idProduct) {
  updateTotalCost();
  updateCartNumbers();
  displayCart();
  updateProductBasketInCatalogById(idProduct);
}

export function deleteProductFromCart(e) {
  // Перевірка, чи була натиснута кнопка видалення
  const buttonDelete = e.target.closest('button[data-delete]');
  if (buttonDelete) {
    // Видалення товару з кошика по id та оновлення вмісту кошика на сторінці
    const idProduct = buttonDelete.parentNode.dataset.id;
    removeProductFromCart(idProduct);
    updateCartAfterDelete(idProduct);
  } else {
    return;
  }
}

/* РЕАЛІЗАЦІЯ КНОПОК ДОДАВАННЯ/ВІДНІМАННЯ КІЛЬКОСТІ ТОВАРІВ В КОШИКУ */
function updateMarkupAfterChangeCount(productId) {}

/* Функція збільшення на одиницю продуктів в кошику */
async function incrementProduct(id) {
  let cartItems =
    JSON.parse(localStorage.getItem(BASKET_KEYS.ProductsInCart)) || {};
  cartItems[id].inCart += 1;
  localStorage.setItem(BASKET_KEYS.ProductsInCart, JSON.stringify(cartItems));

  const productById = await productApiService.getFullProductInfo(id);
  updateProductBasketInCatalogById(productById.id);
}

/* Функція зменшення на одиницю продуктів в кошику */
async function decrementProduct(id) {
  let cartItems =
    JSON.parse(localStorage.getItem(BASKET_KEYS.ProductsInCart)) || {};
  cartItems[id].inCart -= 1;
  if (cartItems[id].inCart === 0) {
    return;
  }
  localStorage.setItem(BASKET_KEYS.ProductsInCart, JSON.stringify(cartItems));

  const productById = await productApiService.getFullProductInfo(id);
  updateProductBasketInCatalogById(productById.id);
}

/* Подія "click" на весь список продуктів в кошику */
refs.productsInBasket.addEventListener('click', updateQuantityProductInCart);

export function updateQuantityProductInCart(e) {
  // Перевірка, чи була натиснута відповідна кнопка
  const buttonAdd = e.target.closest('button[data-add]');
  const buttonRemove = e.target.closest('button[data-remove]');
  if (buttonAdd) {
    // Додавання одиниці товару в кошик по id та оновлення кількості, вартості та загальної вартості
    const idProduct = buttonAdd.parentNode.dataset.id;
    incrementProduct(idProduct);
  }
  if (buttonRemove) {
    // Додавання одиниці товару в кошик по id та оновлення кількості, вартості та загальної вартості
    const idProduct = buttonRemove.parentNode.dataset.id;
    decrementProduct(idProduct);
  }
  updateTotalCost();
  updateCartNumbers();
  displayCart();
}

/* Очищення корзини */
refs.productsInBasket.addEventListener('click', deleteAllProductsFromBasket);

function updateMarkupAfterDeleteAll() {
  const productButtons = refs.catalog.querySelectorAll(
    '.button-primary--catalog'
  );
  Array.from(productButtons).map(button => {
    button.childNodes[button.childNodes.length - 1].nodeValue = 'В кошик';
    button.setAttribute('data-in-cart', false);
    button.querySelector('span[data-id]').textContent = '0';
  });
}

export function deleteAllProductsFromBasket(e) {
  const buttonDeleteAll = e.target.closest('button[data-delete-all]');

  if (buttonDeleteAll) {
    clearBasket();
    displayCart();
  }
}

export async function clearBasket() {
  localStorage.removeItem(BASKET_KEYS.ProductsInCart);
  localStorage.removeItem(BASKET_KEYS.CartNumbers);
  localStorage.removeItem(BASKET_KEYS.TotalCost);

  refs.basketQuantity.textContent = 0;
  updateMarkupAfterDeleteAll();
}

onLoadCardNumbers();
// displayCart();
