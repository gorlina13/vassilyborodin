'use strict';

(function () {
  function findVideos() {
    var videos = document.querySelectorAll('.video');
    var youTubePlayer = new YouTubePlayer();

    for (var i = 0; i < videos.length; i++) {
      youTubePlayer.setup(videos[i]);
    }
  }

  function YouTubePlayer() {}

  YouTubePlayer.prototype.createIframe = function (id) {
    var iframe = document.createElement('iframe');

    function generateURL() {
      var QUERY = '?rel=0&showinfo=0&autoplay=1';
      return 'https://www.youtube.com/embed/' + id + QUERY;
    }

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL());
    iframe.classList.add('video__media');

    return iframe;
  };

  YouTubePlayer.prototype.parseLinkURL = function (link) {
    var regexp = /youtu\.be\/([a-zA-Z0-9_-]+)/i;
    var url = link.href;
    var match = url.match(regexp);

    return match[1];
  };

  YouTubePlayer.prototype.setup = function (video) {
    var link = video.querySelector('.video__link');
    var button = video.querySelector('.video__button');
    var self = this;
    var id = this.parseLinkURL(link);

    function onVideoClick() {
      var iframe = self.createIframe(id);

      link.parentElement.removeChild(link);
      button.parentElement.removeChild(button);
      video.appendChild(iframe);
      video.removeEventListener('click', onVideoClick);
    }

    video.addEventListener('click', onVideoClick);
    link.removeAttribute('href');
    video.classList.add('video--enabled');
  };

  findVideos();
})();
