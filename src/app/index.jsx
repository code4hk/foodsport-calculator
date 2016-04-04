var React = require('react');
var ReactDOM = require('react-dom');

//require('normalize.css')
require('lib/semantic/semantic.css');
require('lib/smoothscroll.js');
// require('lib/justfont.js');

require('src/spritesmith-generated/sprite.css');
require('src/spritesmith-generated/sprite.png');

require('src/app/index.css');
console.log("test");


ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
