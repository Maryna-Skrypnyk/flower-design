const spinnerRef = document.querySelector('.spinner');

function showSpinner() {
  spinnerRef.classList.add('is-open');
}

function hideSpinner() {
  setTimeout(function () {
    spinnerRef.classList.remove('is-open');
  }, 200);
}

export { showSpinner, hideSpinner };
