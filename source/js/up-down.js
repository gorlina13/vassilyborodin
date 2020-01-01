'use strict';

(function () {
  function makeUpDownButton() {
    var button = document.querySelector('.up-down');

    if (button) {
      var upDownButton = new UpDownButton(button);
      upDownButton.setup();
    }
  }

  function UpDownButton(button) {
    this.button = button;
    this.currentState = '';
    this.pageYLabel = 0;
  }

  UpDownButton.prototype.turnPointerUp = function () {
    this.button.classList.remove('up-down--down');
    this.button.classList.add('up-down--up');
    this.currentState = 'up';
  };

  UpDownButton.prototype.turnPointerDown = function () {
    this.button.classList.remove('up-down--up');
    this.button.classList.add('up-down--down');
    this.currentState = 'down';
  };

  UpDownButton.prototype.hide = function () {
    this.button.classList.remove('up-down--up');
    this.button.classList.remove('up-down--down');
    this.currentState = '';
  };

  UpDownButton.prototype.goUp = function (pageY) {
    this.pageYLabel = pageY;
    window.scrollTo(0, 0);
    this.turnPointerDown();
  };

  UpDownButton.prototype.goDown = function () {
    window.scrollTo(0, this.pageYLabel);
    this.turnPointerUp();
  };

  UpDownButton.prototype.setup = function () {
    var self = this;

    function onButtonClick() {
      var pageY = window.pageYOffset || document.documentElement.scrollTop;

      switch (self.currentState) {
        case 'up':
          self.goUp(pageY);
          break;

        case 'down':
          self.goDown();
          break;
      }
    }

    function onWindowScroll() {
      var pageY = window.pageYOffset || document.documentElement.scrollTop;
      var innerHeight = document.documentElement.clientHeight;

      switch (self.currentState) {
        case '':
          if (pageY > innerHeight) {
            self.turnPointerUp();
          }
          break;

        case 'up':
          if (pageY < innerHeight) {
            self.hide();
          }
          break;

        case 'down':
          if (pageY > innerHeight) {
            self.turnPointerUp();
          }
          break;
      }
    }

    window.addEventListener('scroll', onWindowScroll);
    this.button.addEventListener('click', onButtonClick);
  };

  makeUpDownButton();
})();
