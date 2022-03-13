'use strict';

module.exports = function (/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: 'Epocha',
    short_name: 'Epocha',
    description: 'Easy epoch and timestamp converter.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      { src: '/img/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/img/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    ms: {
      tileColor: '#fff',
    },
  };
};
