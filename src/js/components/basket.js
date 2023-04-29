import getRefs from '../refs';
const refs = getRefs();

refs.catalog.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  } else {
    cartNumbers();
  }
});

function onLoadCardNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.basket span').textContent = productNumbers;
  }
}

function cartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.basket span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.basket span').textContent = 1;
  }
}

onLoadCardNumbers();
