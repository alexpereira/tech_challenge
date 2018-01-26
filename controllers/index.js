const fs = require('fs');
const join = require('path').join;

let controllers = {};

fs.readdirSync(join(__dirname)).forEach(function (file) {
  if (~file.indexOf('.js') && file !== 'index.js') {
    let name = file.substring(0, file.indexOf('.'));
    controllers[name] = require(join(__dirname, file));
  }
});

module.exports = controllers
