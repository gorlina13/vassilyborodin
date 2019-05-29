'use strict';

(function () {
  var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');

  function openNav() {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    navToggle.setAttribute('aria-expanded', true);
  }

  function closeNav() {
    navMain.classList.remove('main-nav--opened');
    navMain.classList.add('main-nav--closed');
    navToggle.setAttribute('aria-expanded', false);
  }

  function onNavToggleClick() {
    if (navMain.classList.contains('main-nav--closed')) {
      openNav();
    } else {
      closeNav();
    }
  }

  function handleNav() {
    navMain.classList.remove('main-nav--nojs');
    closeNav();

    navToggle.addEventListener('click', onNavToggleClick);
  }

  if (navMain !== null && navToggle !== null) {
    handleNav();
  }
})();
