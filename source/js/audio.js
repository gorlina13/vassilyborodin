'use strict';

(function () {
  function findAudios() {
    var archiveAudios = document.querySelectorAll('.audio--archive');
    var bandcampAudios = document.querySelectorAll('.audio--bandcamp');
    var archivePlayer = new ArchivePlayer();
    var bandcampPlayer = new BandcampPlayer();

    for (var i = 0; i < archiveAudios.length; i++) {
      archivePlayer.setup(archiveAudios[i]);
    }

    for (var j = 0; j < bandcampAudios.length; j++) {
      bandcampPlayer.setup(bandcampAudios[j]);
    }
  }

  function Player() {
    this.URL_START = '';
    this.URL_END = '';
    this._additionalAttrs = {};
  }

  Player.prototype.createIframe = function (id) {
    var self = this;
    var iframe = document.createElement('iframe');

    function generateURL(start, end) {
      return self[start] + id + self[end];
    }

    iframe.src = generateURL('URL_START', 'URL_END');

    for (var key in this._additionalAttrs) {
      if (!this._additionalAttrs.hasOwnProperty(key)) {
        continue;
      }
      iframe.setAttribute(key, this._additionalAttrs[key]);
    }

    iframe.classList.add('audio__media');

    return iframe;
  };

  Player.prototype.getId = function (link) {
    var url = link.href;
    return url.split('/').pop();
  };

  Player.prototype.setup = function (audio) {
    var link = audio.querySelector('.audio__link');
    var id = this.getId(link);

    if (id) {
      var self = this;
      var button = audio.querySelector('.audio__button');

      audio.addEventListener('click', onAudioClick);
      link.removeAttribute('href');
      audio.classList.add('audio--enabled');
    }

    function onAudioClick(evt) {
      var target = evt.target;

      while (target !== audio) {
        if (target === button || target === link) {
          var iframe = self.createIframe(id);

          button.parentElement.removeChild(button);
          link.parentElement.removeChild(link);
          audio.appendChild(iframe);
          audio.removeEventListener('click', onAudioClick);
          return;
        }

        target = target.parentElement;
      }
    }
  };

  function ArchivePlayer() {
    this.URL_START = 'https://archive.org/embed/';
    this.URL_END = '&playlist=1';
    this._additionalAttrs = {
      'allowfullscreen': ''
    };
  }

  ArchivePlayer.prototype = Object.create(Player.prototype);
  ArchivePlayer.prototype.constructor = ArchivePlayer;

  function BandcampPlayer() {
    this.ALBUMS = {
      '5': 201651664,
      '-': 1118350219,
      '--2': 570357022,
      '--3': 1218095868,
      '2018': 3882505198
    };

    this.URL_START = 'https://bandcamp.com/EmbeddedPlayer/album=';
    this.URL_END = '/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/';
    this._additionalAttrs = {
      'seamless': ''
    };
  }

  BandcampPlayer.prototype = Object.create(Player.prototype);
  BandcampPlayer.prototype.constructor = BandcampPlayer;

  BandcampPlayer.prototype.getId = function (link) {
    var key = Player.prototype.getId(link);
    return this.ALBUMS[key];
  };

  findAudios();
})();
