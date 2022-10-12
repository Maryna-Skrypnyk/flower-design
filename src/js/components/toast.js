import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const toast = text => {
  return Toastify({
    text,
    duration: 3000,
    offset: {
      y: 58,
    },
    position: 'center',
    style: {
      background: '#ffc2c7',
    },
    close: true,
  }).showToast();
};
