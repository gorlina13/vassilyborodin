'use strict';

(function () {
  function findVideos() {
    var videos = document.querySelectorAll('.video');

    for (var i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }

  function setupVideo(video) {
    var link = video.querySelector('.video__link');
    var media = video.querySelector('.video__media');
    var button = video.querySelector('.video__button');
    var id = parseLinkURL(link);

    function onVideoClick() {
      var iframe = createIframe(id);

      link.parentElement.removeChild(link);
      button.parentElement.removeChild(button);
      video.appendChild(iframe);
      video.removeEventListener('click', onVideoClick);
    }

    video.addEventListener('click', onVideoClick);
    link.removeAttribute('href');
    video.classList.add('video--enabled');
  }

  function parseLinkURL(link) {
    var regexp = /youtu\.be\/([a-zA-Z0-9_-]+)/i;
    var url = link.href;
    var match = url.match(regexp);

    return match[1];
  }﻿

  function generateURL(id) {
    var query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  }

  function createIframe(id) {
    var iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  }

  findVideos();
})();
