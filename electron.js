/* jshint node: true */

var electron = require('electron');
var menubar = require('menubar');

var app = electron.app;
var mainWindow = null;
var BrowserWindow = electron.BrowserWindow;

electron.crashReporter.start();

var mb = menubar({
    index: 'file://' + __dirname + '/dist/index.html',
    height:500,
    preloadWindow: true,
    icon: 'iconTemplate.png'
});



app.on('window-all-closed', function onWindowAllClosed() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

mb.on('ready', function onReady() {


    // If you want to open up dev tools programmatically, call
    // mainWindow.openDevTools();

    // By default, we'll open the Ember App by directly going to the
    // file system.
    //
    // Please ensure that you have set the locationType option in the
    // config/environment.js file to 'hash'. For more information,
    // please consult the ember-electron readme.

});
