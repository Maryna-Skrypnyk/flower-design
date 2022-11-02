import getRefs from '../refs';
const refs = getRefs();

function showSpinner() {
  refs.spinner.classList.add('is-open');
}

function hideSpinner() {
  setTimeout(function () {
    refs.spinner.classList.remove('is-open');
  }, 200);
}

export { showSpinner, hideSpinner };
