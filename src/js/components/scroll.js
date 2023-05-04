/////////// на JQUERY

// import 'jquery';

$(document).on(
  'click',
  'nav a, .hero__buttons .btn-catalog, .footer__item a, .buttons-container button, .start-shopping, button[data-type]',
  function (e) {
    e.preventDefault();
    var id = $(this).attr('href');

    var top = $(id).offset().top; // отримуємо координати блоку, дізнаємось висоту від початку сторінки до блоку, на який посилається якір
    $('body, html').animate({ scrollTop: top - 65 }, 1000); // плавно переходимо до блоку

    //   trigger1 = $('.menu-container');
    //   trigger1.removeClass('is-open');
    //   trigger2 = $('.hamburger');
    //   trigger2.removeClass('is-open');
  }
);

/////////////// на vanilla JS
// const anchors = document.querySelectorAll('a[href*="#"]');
// anchors.forEach(anchor => {
//   anchor.addEventListener('click', e => {
//     e.preventDefault();
//     const blockID = anchor.getAttribute('href');
//     document.querySelector(` ${blockID}`).scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   });
// });

//////////////

export const makeScrollIntoAnchors = set => {
  const anchors = document.querySelectorAll(`button[data-${set}*="#"]`);

  anchors.forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const blockID = anchor.getAttribute(`data-${set}`);
      document.querySelector(`${blockID}`).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
};
