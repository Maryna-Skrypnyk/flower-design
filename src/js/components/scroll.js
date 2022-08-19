// на JQUERY

// import 'jquery';

$(document).on('click', 'nav a', '.footer__item a', function (e) {
  e.preventDefault();
  var id = $(this).attr('href');

  var top = $(id).offset().top; // получаем координаты блока, узнаем высоту от начала страницы до блока на который ссылается якорь
  $('body, html').animate({ scrollTop: top - 65 }, 1000); // плавно переходим к блоку

  //   trigger1 = $('.menu-container');
  //   trigger1.removeClass('is-open');
  //   trigger2 = $('.hamburger');
  //   trigger2.removeClass('is-open');
});

$(document).on('click', '.footer__item a', function (e) {
  e.preventDefault();
  var id = $(this).attr('href');

  var top = $(id).offset().top; // получаем координаты блока, узнаем высоту от начала страницы до блока на который ссылается якорь
  $('body, html').animate({ scrollTop: top - 65 }, 1000); // плавно переходим к блоку

  //   trigger1 = $('.menu-container');
  //   trigger1.removeClass('is-open');
  //   trigger2 = $('.hamburger');
  //   trigger2.removeClass('is-open');
});

// // на чистому JS
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
