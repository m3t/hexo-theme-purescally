require('../vendors/modernizr.js');
require('../vendors/yepnope/src/yepnope.js');

// Output: polyfills-[nope]-[nope2].js
yepnope.urlFormatter = function(url, tests) {
  var parts = url.split('.');
  var extension = parts.pop();
  var filename = parts.join('.');
  var passes = [];

  if (tests) {
    for(var testname in tests) {
      if (tests.hasOwnProperty(testname) && ! tests[testname]) {
        passes.push(testname);
      }
    }
  }
  if (passes.length) {
    return filename + '-' + passes.join('-') + '.' + extension;
  }
  return url;
};

// A request for polyfills-[nope]-[nope2].js would be made
// https://modernizr.com/docs#features
yepnope('/javascripts/polyfills/polyfills.js', {
  boxsizing: Modernizr.boxsizing,
  cssunits: Modernizr.cssremunit,
  mediaqueries: Modernizr.mediaqueries,
  promises: Modernizr.promises,
  unknownelements: Modernizr.unknownelements,
  svg: Modernizr.inlinesvg
});

// https://helloanselm.com/2015/using-webfonts-in-2015
//  https://viget.com/extend/the-font-face-dilemma
//   http://codepen.io/cwmanning/pen/bdqYeb
var FontFaceObserver = require('../vendors/fontfaceobserver/fontfaceobserver.standalone.js');

var fontObservers = [];
var fontFamilies = {
  'Lato': [
    {
      weight: 400
    },
    {
      weight: 700
    }
  ]
}

Object.keys(fontFamilies).forEach(function(family) {
  fontObservers.push(fontFamilies[family].map(function(config) {
    return new FontFaceObserver(family, config).check()
  }));
});

Promise.all(fontObservers)
    .then(function() {
        //Debugging (delay):
        //setTimeout(function(){ document.documentElement.classList.add('webfont-loaded'); }, 3000);
        document.documentElement.classList.add('webfont-loaded');
    }, function() {
        console.info('Web fonts could not be loaded in time. Falling back to system fonts.');
});

