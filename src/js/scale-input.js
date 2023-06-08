export function scaleInput() {
  document.addEventListener('touchstart', e => {
    const isInputFocused = Array.from(
      document.querySelectorAll('input, textarea')
    ).some(el => {
      return el === e.target || el.contains(e.target);
    });
    // if (isInputFocused) {
    //   e.preventDefault();
    // }
    if (!isInputFocused) {
      const focused = document.querySelector('input:focus, textarea:focus');
      if (focused) {
        focused.blur();
      }
    }
  });
}

scaleInput();
