'use strict';

(function () {
  function findButton() {
    var button = document.querySelector('.up-down');

    if (button !== null) {
      var upDownButton = new UpDownButton(button);
      upDownButton.run();
    }
  }

  function UpDownButton(button) {
    this.button = button;
    this.currentState = '';
    this.pageYLabel = 0;
  }

  UpDownButton.prototype.pointerUp = function () {
    this.button.classList.remove('up-down--down');
    this.button.classList.add('up-down--up');
    this.currentState = 'up';
  };

  UpDownButton.prototype.pointerDown = function () {
    this.button.classList.remove('up-down--up');
    this.button.classList.add('up-down--down');
    this.currentState = 'down';
  };

  UpDownButton.prototype.hideButton = function () {
    this.button.classList.remove('up-down--up');
    this.button.classList.remove('up-down--down');
    this.currentState = '';
  };

  UpDownButton.prototype.run = function () {
    var self = this;

    function onButtonClick() {
      var pageY = window.pageYOffset || document.documentElement.scrollTop;

      switch (self.currentState) {
        case 'up':
          self.pageYLabel = pageY;
          window.scrollTo(0, 0);
          self.pointerDown();
          break;

        case 'down':
          window.scrollTo(0, self.pageYLabel);
          self.pointerUp();
      }
    }

    function onWindowScroll() {
      var pageY = window.pageYOffset || document.documentElement.scrollTop;
      var innerHeight = document.documentElement.clientHeight;

      switch (self.currentState) {
        case '':
          if (pageY > innerHeight) {
            self.pointerUp();
          }
          break;

        case 'up':
          if (pageY < innerHeight) {
            self.hideButton();
          }
          break;

        case 'down':
          if (pageY > innerHeight) {
            self.pointerUp();
          }
          break;
      }
    }

    window.addEventListener('scroll', onWindowScroll);
    this.button.addEventListener('click', onButtonClick);
  };

  findButton();
})();
