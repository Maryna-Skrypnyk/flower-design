import getRefs from '../refs';
import ApiService from './service-api';

const refs = getRefs();

const productApiService = new ApiService();

refs.catalog.addEventListener('click', async e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  } else {
    const idProduct = e.target.dataset.id;
    const productById = await productApiService.getFullProductInfo(idProduct);
    cartNumbers(productById);
    totalCost(productById);
  }
});

function onLoadCardNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.basket span').textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.basket span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.basket span').textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.id] == undefined) {
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
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');

  if (cartCost) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
}

export function displayCart() {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector('.products');

  let cartCost = localStorage.getItem('totalCost');

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="product">
        <ion-icon name="close-circle"></ion-icon>
        <img width="30" height="30" src=${item.image}>
        <span class="product-name">${item.name}</span>
      </div>
      <div class="price">${item.price},00 грн</div>
      <div class="quantity">
        <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
        <span>${item.inCart}</span>
        <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
      </div>
      <div class="total">${item.inCart * item.price},00 грн</div>
      `;
    });

    productContainer.innerHTML += `
    <div class="basket-total-container">
      <h4 class="basket-total-title">Загальна вартість</h4>
      <h4 class="basket-total">${cartCost},00 грн</h4>
    </div>`;
  }
}

onLoadCardNumbers();
// displayCart();
