'use strict';

(function () {

  function findAudios() {
    var archiveAudios = document.querySelectorAll('.audio--archive');
    var bandcampAudios = document.querySelectorAll('.audio--bandcamp');
    var archive = Source.createFromArchive();
    var bandcamp = Source.createFromBandcamp();

    for (var i = 0; i < archiveAudios.length; i++) {
      setupAudio(archiveAudios[i], archive);
    }

    for (var i = 0; i < bandcampAudios.length; i++) {
      setupAudio(bandcampAudios[i], bandcamp);
    }
  }

  function Source() {
    var self = this;

    function generateURL(id, start, end) {
      return self[start] + id  + self[end];
    }

    this.createIframe = function (id) {
      var iframe = document.createElement('iframe');

      iframe.src = generateURL(id, 'URL_START', 'URL_END');

      for (var key in this.additionalAttrs) {
        iframe.setAttribute(key, this.additionalAttrs[key]);
      }

      iframe.classList.add('audio__media');

      return iframe;
    }
  }

  Source.createFromArchive = function () {
    var source = new Source();
    source.URL_START = 'https://archive.org/embed/';
    source.URL_END = '&playlist=1';
    source.additionalAttrs = {
      'allowfullscreen': ''
    };

    source.getId = function (link) {
      return parseLinkURL(link);
    };

    return source;
  }

  Source.createFromBandcamp = function () {
    var source = new Source();
    var ALBUMS = {
      '5': 201651664,
      '-': 1118350219,
      '--2': 570357022,
      '--3': 1218095868,
      '2018': 3882505198
    };
    source.URL_START = 'https://bandcamp.com/EmbeddedPlayer/album=';
    source.URL_END = '/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/';
    source.additionalAttrs = {
      'seamless': ''
    };

    source.getId = function (link) {
      var key = parseLinkURL(link);
      return ALBUMS[key];
    };

    return source;
  }

  function setupAudio(audio, source) {
    var link = audio.querySelector('.audio__link');
    var media = audio.querySelector('.audio__media');
    var button = audio.querySelector('.audio__button');
    var id = source.getId(link);


    function onAudioChildrenClick() {
      var iframe = source.createIframe(id);

      button.parentElement.removeChild(button);
      link.parentElement.removeChild(link);
      audio.appendChild(iframe);
    }

    link.addEventListener('click', onAudioChildrenClick);
    button.addEventListener('click', onAudioChildrenClick);
    link.removeAttribute('href');
    audio.classList.add('audio--enabled');
  }

  function parseLinkURL(link) {
    var url = link.href;

    return url.split('/').pop();
  }

  findAudios();
})();
