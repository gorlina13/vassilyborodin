'use strict';

(function () {
  var upDownElem = document.querySelector('.up-down');
  upDownElem.currentState = '';
  var pageYLabel = 0;

  function pointerUp() {
    upDownElem.classList.remove('up-down--down');
    upDownElem.classList.add('up-down--up');
    upDownElem.setAttribute('aria-label', 'Вернуться наверх');
    upDownElem.currentState = 'up';
  }

  function pointerDown() {
    upDownElem.classList.remove('up-down--up');
    upDownElem.classList.add('up-down--down');
    upDownElem.setAttribute('aria-label', 'Вернуться вниз');
    upDownElem.currentState = 'down';
  }

  function hideUpDownElem() {
    upDownElem.classList.remove('up-down--up');
    upDownElem.classList.remove('up-down--down');
    upDownElem.removeAttribute('aria-label');
    upDownElem.currentState = '';
  }

  function onUpDownClick() {
    var pageY = window.pageYOffset || document.documentElement.scrollTop;

    switch (this.currentState) {
      case 'up':
        pageYLabel = pageY;
        window.scrollTo(0, 0);
        pointerDown();
        break;

      case 'down':
        window.scrollTo(0, pageYLabel);
        pointerUp();
    }
  }

  function onWindowScroll() {
    var pageY = window.pageYOffset || document.documentElement.scrollTop;
    var innerHeight = document.documentElement.clientHeight;

    switch (upDownElem.currentState) {
      case '':
        if (pageY > innerHeight) {
          pointerUp();
        }
        break;

      case 'up':
        if (pageY < innerHeight) {
          hideUpDownElem();
        }
        break;

      case 'down':
        if (pageY > innerHeight) {
          pointerUp();
        }
        break;
    }
  }

  function handleUpDownElem() {
    window.addEventListener('scroll', onWindowScroll);
    upDownElem.addEventListener('click', onUpDownClick);
  }

  if (upDownElem !== null) {
    handleUpDownElem();
  }
})();
