'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _upperFirst2 = require('lodash/upperFirst');

var _upperFirst3 = _interopRequireDefault(_upperFirst2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _functionNames = require('./functionNames');

var _functionNames2 = _interopRequireDefault(_functionNames);

var _eventNames = require('./eventNames');

var _eventNames2 = _interopRequireDefault(_eventNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YouTubePlayer = {};

/**
 * Construct an object that defines an event handler for all of the YouTube
 * player events. Proxy captured events through an event emitter.
 *
 * @todo Capture event parameters.
 * @see https://developers.google.com/youtube/iframe_api_reference#Events
 * @param {Sister} emitter
 * @returns {Object}
 */
YouTubePlayer.proxyEvents = function (emitter) {
  var events = {};

  (0, _forEach3.default)(_eventNames2.default, function (eventName) {
    var onEventName = 'on' + (0, _upperFirst3.default)(eventName);

    events[onEventName] = function (event) {
      emitter.trigger(eventName, event);
    };
  });

  return events;
};

/**
 * Delays player API method execution until player state is ready.
 *
 * @todo Proxy all of the methods using Object.keys.
 * @todo See TRICKY below.
 * @param {Promise} playerAPIReady Promise that resolves when player is ready.
 * @returns {Object}
 */
YouTubePlayer.promisifyPlayer = function (playerAPIReady) {
  var functions = {};

  (0, _forEach3.default)(_functionNames2.default, function (functionName) {
    functions[functionName] = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var player;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return playerAPIReady;

            case 2:
              player = _context.sent;
              return _context.abrupt('return', player[functionName].apply(null, args));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  });

  return functions;
};

exports.default = YouTubePlayer;
module.exports = exports['default'];