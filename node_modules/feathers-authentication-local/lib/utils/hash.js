'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasher;

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasher(password) {
  return new Promise(function (resolve, reject) {
    _bcryptjs2.default.genSalt(10, function (error, salt) {
      if (error) {
        return reject(error);
      }

      _bcryptjs2.default.hash(password, salt, function (error, hashedPassword) {
        if (error) {
          return reject(error);
        }

        resolve(hashedPassword);
      });
    });
  });
}
module.exports = exports['default'];