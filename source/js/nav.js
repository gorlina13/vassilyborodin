'use strict';

(function () {
  function makeNav() {
    var nav = document.querySelector('.main-nav');
    var navToggle = nav.querySelector('.main-nav__toggle');

    if (nav && navToggle) {
      var mainNav = new MainNav(nav, navToggle);
      mainNav.setup();
    }
  }

  function MainNav(nav, navToggle) {
    this.nav = nav;
    this.navToggle = navToggle;
  }

  MainNav.prototype.open = function () {
    this.nav.classList.remove('main-nav--closed');
    this.nav.classList.add('main-nav--opened');
    this.navToggle.setAttribute('aria-expanded', true);
  };

  MainNav.prototype.close = function () {
    this.nav.classList.remove('main-nav--opened');
    this.nav.classList.add('main-nav--closed');
    this.navToggle.setAttribute('aria-expanded', false);
  };

  MainNav.prototype.setup = function () {
    var self = this;

    function onNavToggleClick() {
      if (self.nav.classList.contains('main-nav--closed')) {
        self.open();
      } else {
        self.close();
      }
    }

    this.nav.classList.remove('main-nav--nojs');
    this.close();
    this.navToggle.addEventListener('click', onNavToggleClick);
  };

  makeNav();
})();
