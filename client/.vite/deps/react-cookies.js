import {
  require_object_assign
} from "./chunk-DLEYXF2G.js";
import {
  __commonJS
} from "./chunk-UXIASGQL.js";

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var pairSplitRegExp = /; */;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var pairs = str.split(pairSplitRegExp);
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var eq_idx = pair.indexOf("=");
        if (eq_idx < 0) {
          continue;
        }
        var key = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        if ('"' == val[0]) {
          val = val.slice(1, -1);
        }
        if (void 0 == obj[key]) {
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge))
          throw new Error("maxAge should be a Number");
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/react-cookies/build/cookie.js
var require_cookie2 = __commonJS({
  "node_modules/react-cookies/build/cookie.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    exports.load = load;
    exports.loadAll = loadAll;
    exports.select = select;
    exports.save = save;
    exports.remove = remove;
    exports.setRawCookie = setRawCookie;
    exports.plugToRequest = plugToRequest;
    var _cookie = require_cookie();
    var _cookie2 = _interopRequireDefault(_cookie);
    var _objectAssign = require_object_assign();
    var _objectAssign2 = _interopRequireDefault(_objectAssign);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var IS_NODE = typeof document === "undefined" || typeof process !== "undefined" && process.env && false;
    var _rawCookie = {};
    var _res = void 0;
    function _isResWritable() {
      return _res && !_res.headersSent;
    }
    function load(name, doNotParse) {
      var cookies = IS_NODE ? _rawCookie : _cookie2.default.parse(document.cookie);
      var cookieVal = cookies && cookies[name];
      if (typeof doNotParse === "undefined") {
        doNotParse = !cookieVal || cookieVal[0] !== "{" && cookieVal[0] !== "[";
      }
      if (!doNotParse) {
        try {
          cookieVal = JSON.parse(cookieVal);
        } catch (err) {
        }
      }
      return cookieVal;
    }
    function loadAll(doNotParse) {
      var cookies = IS_NODE ? _rawCookie : _cookie2.default.parse(document.cookie);
      var cookieVal = cookies;
      if (typeof doNotParse === "undefined") {
        doNotParse = !cookieVal || cookieVal[0] !== "{" && cookieVal[0] !== "[";
      }
      if (!doNotParse) {
        try {
          cookieVal = JSON.parse(cookieVal);
        } catch (err) {
        }
      }
      return cookieVal;
    }
    function select(regex) {
      var cookies = IS_NODE ? _rawCookie : _cookie2.default.parse(document.cookie);
      if (!cookies) {
        return {};
      }
      if (!regex) {
        return cookies;
      }
      return Object.keys(cookies).reduce(function(accumulator, name) {
        if (!regex.test(name)) {
          return accumulator;
        }
        var newCookie = {};
        newCookie[name] = cookies[name];
        return (0, _objectAssign2.default)({}, accumulator, newCookie);
      }, {});
    }
    function save(name, val, opt) {
      _rawCookie[name] = val;
      if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
        _rawCookie[name] = JSON.stringify(val);
      }
      if (!IS_NODE) {
        document.cookie = _cookie2.default.serialize(name, _rawCookie[name], opt);
      }
      if (_isResWritable() && _res.cookie) {
        _res.cookie(name, val, opt);
      }
    }
    function remove(name, opt) {
      delete _rawCookie[name];
      if (typeof opt === "undefined") {
        opt = {};
      } else if (typeof opt === "string") {
        opt = { path: opt };
      } else {
        opt = (0, _objectAssign2.default)({}, opt);
      }
      if (typeof document !== "undefined") {
        opt.expires = new Date(1970, 1, 1, 0, 0, 1);
        opt.maxAge = 0;
        document.cookie = _cookie2.default.serialize(name, "", opt);
      }
      if (_isResWritable() && _res.clearCookie) {
        _res.clearCookie(name, opt);
      }
    }
    function setRawCookie(rawCookie) {
      if (rawCookie) {
        _rawCookie = _cookie2.default.parse(rawCookie);
      } else {
        _rawCookie = {};
      }
    }
    function plugToRequest(req, res) {
      if (req.cookie) {
        _rawCookie = req.cookie;
      } else if (req.cookies) {
        _rawCookie = req.cookies;
      } else if (req.headers && req.headers.cookie) {
        setRawCookie(req.headers.cookie);
      } else {
        _rawCookie = {};
      }
      _res = res;
      return function unplug() {
        _res = null;
        _rawCookie = {};
      };
    }
    exports.default = {
      setRawCookie,
      load,
      loadAll,
      select,
      save,
      remove,
      plugToRequest
    };
  }
});
export default require_cookie2();
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=react-cookies.js.map
