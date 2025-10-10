'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    emberData: {
      deprecations: {
        // New projects can safely leave this deprecation disabled.
        // If upgrading, to opt-into the deprecated behavior, set this to true and then follow:
        // https://deprecations.emberjs.com/id/ember-data-deprecate-store-extends-ember-object
        // before upgrading to Ember Data 6.0
        DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false,
      },
    },
    // Add options here
    'ember-bootstrap': {
      importBootstrapTheme: true,
      bootstrapVersion: 5,
      importBootstrapCSS: true,
      importBootstrapFont: false,
    },
    'asset-cache': {
      include: ['assets/**/*', 'img/**/*', 'fonts/**/*'],
    },
    // Enable jQuery integration for Bootstrap compatibility
    'jquery-integration': true,
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Bootstrap 5 JavaScript is handled by ember-bootstrap addon
  // app.import('node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js');

  return app.toTree();
};
