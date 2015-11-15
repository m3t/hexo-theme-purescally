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
yepnope('polyfills/polyfills.js', {
  boxsizing: Modernizr.boxsizing,
  mediaqueries: Modernizr.mediaqueries,
  cssunits: Modernizr.cssremunit,
  unknownelements: Modernizr.unknownelements,
  svg: Modernizr.inlinesvg
});
