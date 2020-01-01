'use strict';

(function () {
  function handleAudios() {
    var archiveAudios = document.querySelectorAll('.audio--archive');
    var bandcampAudios = document.querySelectorAll('.audio--bandcamp');
    var archivePlayer = new ArchivePlayer();
    var bandcampPlayer = new BandcampPlayer();

    Array.prototype.forEach.call(archiveAudios, function (archiveAudio) {
      archivePlayer.setup(archiveAudio);
    });

    Array.prototype.forEach.call(bandcampAudios, function (bandcampAudio) {
      bandcampPlayer.setup(bandcampAudio);
    });
  }

  function Player(options) {
    this.URL_START = options.urlStart;
    this.URL_END = options.urlEnd;
    this._additionalAttrs = options.additionalAttrs;
  }

  Player.prototype.createIframe = function (id) {
    var iframe = document.createElement('iframe');

    iframe.src = this.URL_START + id + this.URL_END;

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
      'allow': 'fullscreen',
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

  handleAudios();
})();
