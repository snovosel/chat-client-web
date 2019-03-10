var path = require('path');

var rootDir = path.resolve(__dirname, '../../src');

module.exports = {
  components: path.resolve(__dirname, `${rootDir}/components`),
  Blocks: path.resolve(__dirname, `${rootDir}/components/Blocks`),
  Inputs: path.resolve(__dirname, `${rootDir}/components/Inputs`),
  Layout: path.resolve(__dirname, `${rootDir}/components/Layout`),
  Index: path.resolve(__dirname, `${rootDir}/components/Index`),
  Landing: path.resolve(__dirname, `${rootDir}/Landing`),
};
