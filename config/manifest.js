'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: "epocha",
    short_name: "epocha",
    description: "",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
    ],
    ms: {
      tileColor: '#fff'
    }
  };
}
