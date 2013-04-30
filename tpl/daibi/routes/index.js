var getRoutes = require('../lib/getRoutes');

module.exports = function (app) {
  getRoutes(app,require('./main'));
  getRoutes(app,require('./movie'));
};
