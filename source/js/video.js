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

    function generateURL(id) {
      var QUERY = '?rel=0&showinfo=0&autoplay=1';
      return 'https://www.youtube.com/embed/' + id + QUERY;
    }

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
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
    var id = this.parseLinkURL(link);
    var handler = onVideoClick.bind(this);

    function onVideoClick() {
      var iframe = this.createIframe(id);

      link.parentElement.removeChild(link);
      button.parentElement.removeChild(button);
      video.appendChild(iframe);
      video.removeEventListener('click', handler);
    }

    video.addEventListener('click', handler);
    link.removeAttribute('href');
    video.classList.add('video--enabled');
  };

  findVideos();
})();
