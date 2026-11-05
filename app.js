var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// (disabled):../node_modules/object-inspect/util.inspect
var require_util = __commonJS({
  "(disabled):../node_modules/object-inspect/util.inspect"() {
  }
});

// ../node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "../node_modules/object-inspect/index.js"(exports, module2) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = require_util();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    var quotes = {
      __proto__: null,
      "double": '"',
      single: "'"
    };
    var quoteREs = {
      __proto__: null,
      "double": /(["\\])/g,
      single: /(['\\])/g
    };
    module2.exports = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect2(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect2);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect2);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect2);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect2(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function(value, key) {
            mapParts.push(inspect2(key, obj, true) + " => " + inspect2(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect2(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect2(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect2(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect2(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect2);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
      var style = opts.quoteStyle || defaultStyle;
      var quoteChar = quotes[style];
      return quoteChar + s + quoteChar;
    }
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    function canTrustToString(obj) {
      return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && canTrustToString(obj);
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && canTrustToString(obj);
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && canTrustToString(obj);
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && canTrustToString(obj);
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && canTrustToString(obj);
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var quoteRE = quoteREs[opts.quoteStyle || "single"];
      quoteRE.lastIndex = 0;
      var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect2) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect2(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect2(key, obj) + ": " + inspect2(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect2(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// ../node_modules/@midnight-ntwrk/compact-runtime/dist/error.js
var import_object_inspect = __toESM(require_object_inspect(), 1);
var CompactError = class extends Error {
  constructor(msg) {
    super(msg);
    this.name = "CompactError";
  }
};
function assert(b, s) {
  if (!b) {
    const msg = `failed assert: ${s}`;
    throw new CompactError(msg);
  }
}
function typeError(who, what, where, type, x) {
  const msg = `type error: ${who} ${what} at ${where}; expected value of type ${type} but received ${(0, import_object_inspect.default)(x)}`;
  throw new CompactError(msg);
}

// ../node_modules/@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm_bg.js
var midnight_onchain_runtime_wasm_bg_exports = {};
__export(midnight_onchain_runtime_wasm_bg_exports, {
  ChargedState: () => ChargedState,
  ContractMaintenanceAuthority: () => ContractMaintenanceAuthority,
  ContractOperation: () => ContractOperation,
  ContractState: () => ContractState,
  CostModel: () => CostModel,
  IntoUnderlyingByteSource: () => IntoUnderlyingByteSource,
  IntoUnderlyingSink: () => IntoUnderlyingSink,
  IntoUnderlyingSource: () => IntoUnderlyingSource,
  QueryContext: () => QueryContext,
  QueryResults: () => QueryResults,
  StateBoundedMerkleTree: () => StateBoundedMerkleTree,
  StateMap: () => StateMap,
  StateValue: () => StateValue,
  VmResults: () => VmResults,
  VmStack: () => VmStack,
  __wbg_BigInt_40a77d45cca49470: () => __wbg_BigInt_40a77d45cca49470,
  __wbg_BigInt_6adbfd8eb0f7ec07: () => __wbg_BigInt_6adbfd8eb0f7ec07,
  __wbg_Error_e17e777aac105295: () => __wbg_Error_e17e777aac105295,
  __wbg_Number_998bea33bd87c3e0: () => __wbg_Number_998bea33bd87c3e0,
  __wbg_String_8f0eb39a4a4c2f66: () => __wbg_String_8f0eb39a4a4c2f66,
  __wbg_buffer_8d40b1d762fb3c66: () => __wbg_buffer_8d40b1d762fb3c66,
  __wbg_byobRequest_2c036bceca1e6037: () => __wbg_byobRequest_2c036bceca1e6037,
  __wbg_byteLength_331a6b5545834024: () => __wbg_byteLength_331a6b5545834024,
  __wbg_byteOffset_49a5b5608000358b: () => __wbg_byteOffset_49a5b5608000358b,
  __wbg_call_13410aac570ffff7: () => __wbg_call_13410aac570ffff7,
  __wbg_call_a5400b25a865cfd8: () => __wbg_call_a5400b25a865cfd8,
  __wbg_close_cccada6053ee3a65: () => __wbg_close_cccada6053ee3a65,
  __wbg_close_d71a78219dc23e91: () => __wbg_close_d71a78219dc23e91,
  __wbg_contractstate_new: () => __wbg_contractstate_new,
  __wbg_crypto_86f2631e91b51511: () => __wbg_crypto_86f2631e91b51511,
  __wbg_done_75ed0ee6dd243d9d: () => __wbg_done_75ed0ee6dd243d9d,
  __wbg_enqueue_452bc2343d1c2ff9: () => __wbg_enqueue_452bc2343d1c2ff9,
  __wbg_entries_2be2f15bd5554996: () => __wbg_entries_2be2f15bd5554996,
  __wbg_from_88bc52ce20ba6318: () => __wbg_from_88bc52ce20ba6318,
  __wbg_getRandomValues_b3f15fcbfabb0f8b: () => __wbg_getRandomValues_b3f15fcbfabb0f8b,
  __wbg_get_0da715ceaecea5c8: () => __wbg_get_0da715ceaecea5c8,
  __wbg_get_458e874b43b18b25: () => __wbg_get_458e874b43b18b25,
  __wbg_get_5ee3191755594360: () => __wbg_get_5ee3191755594360,
  __wbg_getwithrefkey_1dc361bd10053bfe: () => __wbg_getwithrefkey_1dc361bd10053bfe,
  __wbg_instanceof_ArrayBuffer_67f3012529f6a2dd: () => __wbg_instanceof_ArrayBuffer_67f3012529f6a2dd,
  __wbg_instanceof_Map_ebb01a5b6b5ffd0b: () => __wbg_instanceof_Map_ebb01a5b6b5ffd0b,
  __wbg_instanceof_Uint8Array_9a8378d955933db7: () => __wbg_instanceof_Uint8Array_9a8378d955933db7,
  __wbg_isArray_030cce220591fb41: () => __wbg_isArray_030cce220591fb41,
  __wbg_isSafeInteger_1c0d1af5542e102a: () => __wbg_isSafeInteger_1c0d1af5542e102a,
  __wbg_iterator_f370b34483c71a1c: () => __wbg_iterator_f370b34483c71a1c,
  __wbg_keys_822161a7faf55538: () => __wbg_keys_822161a7faf55538,
  __wbg_length_186546c51cd61acd: () => __wbg_length_186546c51cd61acd,
  __wbg_length_6bb7e81f9d7713e4: () => __wbg_length_6bb7e81f9d7713e4,
  __wbg_msCrypto_d562bbe83e0d4b91: () => __wbg_msCrypto_d562bbe83e0d4b91,
  __wbg_new_19c25a3f2fa63a02: () => __wbg_new_19c25a3f2fa63a02,
  __wbg_new_1f3a344cf3123716: () => __wbg_new_1f3a344cf3123716,
  __wbg_new_2e3c58a15f39f5f9: () => __wbg_new_2e3c58a15f39f5f9,
  __wbg_new_2ff1f68f3676ea53: () => __wbg_new_2ff1f68f3676ea53,
  __wbg_new_638ebfaedbf32a5e: () => __wbg_new_638ebfaedbf32a5e,
  __wbg_new_da9dc54c5db29dfa: () => __wbg_new_da9dc54c5db29dfa,
  __wbg_newfromslice_074c56947bd43469: () => __wbg_newfromslice_074c56947bd43469,
  __wbg_newnoargs_254190557c45b4ec: () => __wbg_newnoargs_254190557c45b4ec,
  __wbg_newwithbyteoffsetandlength_e8f53910b4d42b45: () => __wbg_newwithbyteoffsetandlength_e8f53910b4d42b45,
  __wbg_newwithlength_a167dcc7aaa3ba77: () => __wbg_newwithlength_a167dcc7aaa3ba77,
  __wbg_next_5b3530e612fde77d: () => __wbg_next_5b3530e612fde77d,
  __wbg_next_692e82279131b03c: () => __wbg_next_692e82279131b03c,
  __wbg_node_e1f24f89a7336c2e: () => __wbg_node_e1f24f89a7336c2e,
  __wbg_process_3975fd6c72f520aa: () => __wbg_process_3975fd6c72f520aa,
  __wbg_prototypesetcall_3d4a26c1ed734349: () => __wbg_prototypesetcall_3d4a26c1ed734349,
  __wbg_push_330b2eb93e4e1212: () => __wbg_push_330b2eb93e4e1212,
  __wbg_queueMicrotask_25d0739ac89e8c88: () => __wbg_queueMicrotask_25d0739ac89e8c88,
  __wbg_queueMicrotask_4488407636f5bf24: () => __wbg_queueMicrotask_4488407636f5bf24,
  __wbg_randomFillSync_f8c153b79f285817: () => __wbg_randomFillSync_f8c153b79f285817,
  __wbg_require_b74f47fc2d022fd6: () => __wbg_require_b74f47fc2d022fd6,
  __wbg_resolve_4055c623acdd6a1b: () => __wbg_resolve_4055c623acdd6a1b,
  __wbg_respond_6c2c4e20ef85138e: () => __wbg_respond_6c2c4e20ef85138e,
  __wbg_set_1353b2a5e96bc48c: () => __wbg_set_1353b2a5e96bc48c,
  __wbg_set_3f1d0b984ed272ed: () => __wbg_set_3f1d0b984ed272ed,
  __wbg_set_90f6c0f7bd8c0415: () => __wbg_set_90f6c0f7bd8c0415,
  __wbg_set_b7f1cf4fae26fe2a: () => __wbg_set_b7f1cf4fae26fe2a,
  __wbg_set_wasm: () => __wbg_set_wasm,
  __wbg_statevalue_new: () => __wbg_statevalue_new,
  __wbg_static_accessor_GLOBAL_8921f820c2ce3f12: () => __wbg_static_accessor_GLOBAL_8921f820c2ce3f12,
  __wbg_static_accessor_GLOBAL_THIS_f0a4409105898184: () => __wbg_static_accessor_GLOBAL_THIS_f0a4409105898184,
  __wbg_static_accessor_SELF_995b214ae681ff99: () => __wbg_static_accessor_SELF_995b214ae681ff99,
  __wbg_static_accessor_WINDOW_cde3890479c675ea: () => __wbg_static_accessor_WINDOW_cde3890479c675ea,
  __wbg_subarray_70fd07feefe14294: () => __wbg_subarray_70fd07feefe14294,
  __wbg_then_e22500defe16819f: () => __wbg_then_e22500defe16819f,
  __wbg_toString_7268338f40012a03: () => __wbg_toString_7268338f40012a03,
  __wbg_toString_d8f537919ef401d6: () => __wbg_toString_d8f537919ef401d6,
  __wbg_value_dd9372230531eade: () => __wbg_value_dd9372230531eade,
  __wbg_versions_4e31226f5e8dc909: () => __wbg_versions_4e31226f5e8dc909,
  __wbg_view_91cc97d57ab30530: () => __wbg_view_91cc97d57ab30530,
  __wbg_wbindgenbigintgetasi64_ac743ece6ab9bba1: () => __wbg_wbindgenbigintgetasi64_ac743ece6ab9bba1,
  __wbg_wbindgenbooleanget_3fe6f642c7d97746: () => __wbg_wbindgenbooleanget_3fe6f642c7d97746,
  __wbg_wbindgencbdrop_eb10308566512b88: () => __wbg_wbindgencbdrop_eb10308566512b88,
  __wbg_wbindgendebugstring_99ef257a3ddda34d: () => __wbg_wbindgendebugstring_99ef257a3ddda34d,
  __wbg_wbindgenin_d7a1ee10933d2d55: () => __wbg_wbindgenin_d7a1ee10933d2d55,
  __wbg_wbindgenisbigint_ecb90cc08a5a9154: () => __wbg_wbindgenisbigint_ecb90cc08a5a9154,
  __wbg_wbindgenisfunction_8cee7dce3725ae74: () => __wbg_wbindgenisfunction_8cee7dce3725ae74,
  __wbg_wbindgenisnull_f3037694abe4d97a: () => __wbg_wbindgenisnull_f3037694abe4d97a,
  __wbg_wbindgenisobject_307a53c6bd97fbf8: () => __wbg_wbindgenisobject_307a53c6bd97fbf8,
  __wbg_wbindgenisstring_d4fa939789f003b0: () => __wbg_wbindgenisstring_d4fa939789f003b0,
  __wbg_wbindgenisundefined_c4b71d073b92f3c5: () => __wbg_wbindgenisundefined_c4b71d073b92f3c5,
  __wbg_wbindgenjsvaleq_e6f2ad59ccae1b58: () => __wbg_wbindgenjsvaleq_e6f2ad59ccae1b58,
  __wbg_wbindgenjsvallooseeq_9bec8c9be826bed1: () => __wbg_wbindgenjsvallooseeq_9bec8c9be826bed1,
  __wbg_wbindgennumberget_f74b4c7525ac05cb: () => __wbg_wbindgennumberget_f74b4c7525ac05cb,
  __wbg_wbindgenshr_7d2aae6044c0dab1: () => __wbg_wbindgenshr_7d2aae6044c0dab1,
  __wbg_wbindgenstringget_0f16a6ddddef376f: () => __wbg_wbindgenstringget_0f16a6ddddef376f,
  __wbg_wbindgenthrow_451ec1a8469d7eb6: () => __wbg_wbindgenthrow_451ec1a8469d7eb6,
  __wbindgen_cast_21820e4b948a0575: () => __wbindgen_cast_21820e4b948a0575,
  __wbindgen_cast_2241b6af4c4b2941: () => __wbindgen_cast_2241b6af4c4b2941,
  __wbindgen_cast_4625c577ab2ec9ee: () => __wbindgen_cast_4625c577ab2ec9ee,
  __wbindgen_cast_9ae0607507abb057: () => __wbindgen_cast_9ae0607507abb057,
  __wbindgen_cast_cb9088102bce6b30: () => __wbindgen_cast_cb9088102bce6b30,
  __wbindgen_cast_d6cd19b81560fd6e: () => __wbindgen_cast_d6cd19b81560fd6e,
  __wbindgen_cast_e7b45dd881f38ce3: () => __wbindgen_cast_e7b45dd881f38ce3,
  __wbindgen_init_externref_table: () => __wbindgen_init_externref_table,
  bigIntModFr: () => bigIntModFr,
  bigIntToValue: () => bigIntToValue,
  communicationCommitment: () => communicationCommitment,
  communicationCommitmentRandomness: () => communicationCommitmentRandomness,
  decodeCoinPublicKey: () => decodeCoinPublicKey,
  decodeContractAddress: () => decodeContractAddress,
  decodeQualifiedShieldedCoinInfo: () => decodeQualifiedShieldedCoinInfo,
  decodeRawTokenType: () => decodeRawTokenType,
  decodeShieldedCoinInfo: () => decodeShieldedCoinInfo,
  decodeUserAddress: () => decodeUserAddress,
  degradeToTransient: () => degradeToTransient,
  dummyContractAddress: () => dummyContractAddress,
  dummyUserAddress: () => dummyUserAddress,
  ecAdd: () => ecAdd,
  ecMul: () => ecMul,
  ecMulGenerator: () => ecMulGenerator,
  encodeCoinPublicKey: () => encodeCoinPublicKey,
  encodeContractAddress: () => encodeContractAddress,
  encodeQualifiedShieldedCoinInfo: () => encodeQualifiedShieldedCoinInfo,
  encodeRawTokenType: () => encodeRawTokenType,
  encodeShieldedCoinInfo: () => encodeShieldedCoinInfo,
  encodeUserAddress: () => encodeUserAddress,
  entryPointHash: () => entryPointHash,
  hashToCurve: () => hashToCurve,
  leafHash: () => leafHash,
  maxAlignedSize: () => maxAlignedSize,
  maxField: () => maxField,
  persistentCommit: () => persistentCommit,
  persistentHash: () => persistentHash,
  proofDataIntoSerializedPreimage: () => proofDataIntoSerializedPreimage,
  rawTokenType: () => rawTokenType,
  runProgram: () => runProgram,
  runtimeCoinCommitment: () => runtimeCoinCommitment,
  runtimeCoinNullifier: () => runtimeCoinNullifier,
  sampleContractAddress: () => sampleContractAddress,
  sampleRawTokenType: () => sampleRawTokenType,
  sampleSigningKey: () => sampleSigningKey,
  sampleUserAddress: () => sampleUserAddress,
  signData: () => signData,
  signatureVerifyingKey: () => signatureVerifyingKey,
  signingKeyFromBip340: () => signingKeyFromBip340,
  transientCommit: () => transientCommit,
  transientHash: () => transientHash,
  upgradeFromTransient: () => upgradeFromTransient,
  valueToBigInt: () => valueToBigInt,
  verifySignature: () => verifySignature
});
var wasm;
function __wbg_set_wasm(val) {
  wasm = val;
}
function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_export_2.set(idx, obj);
  return idx;
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
var MAX_SAFARI_DECODE_BYTES = 2146435072;
var numBytesDecoded = 0;
function decodeText(ptr, len) {
  numBytesDecoded += len;
  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return decodeText(ptr, len);
}
var WASM_VECTOR_LEN = 0;
var cachedTextEncoder = new TextEncoder();
if (!("encodeInto" in cachedTextEncoder)) {
  cachedTextEncoder.encodeInto = function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
}
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
var CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry(
  (state) => {
    wasm.__wbindgen_export_5.get(state.dtor)(state.a, state.b);
  }
);
function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_5.get(state.dtor)(a, state.b);
        CLOSURE_DTORS.unregister(state);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_export_2.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}
function transientHash(align, val) {
  const ret = wasm.transientHash(align, val);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function runtimeCoinNullifier(coin, sender_evidence) {
  const ret = wasm.runtimeCoinNullifier(coin, sender_evidence);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function rawTokenType(domain_sep, contract) {
  let deferred3_0;
  let deferred3_1;
  try {
    const ptr0 = passStringToWasm0(contract, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.rawTokenType(domain_sep, ptr0, len0);
    var ptr2 = ret[0];
    var len2 = ret[1];
    if (ret[3]) {
      ptr2 = 0;
      len2 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred3_0 = ptr2;
    deferred3_1 = len2;
    return getStringFromWasm0(ptr2, len2);
  } finally {
    wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
  }
}
function leafHash(value) {
  const ret = wasm.leafHash(value);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function sampleContractAddress() {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.sampleContractAddress();
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function ecMul(a, b) {
  const ret = wasm.ecMul(a, b);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function upgradeFromTransient(transient) {
  const ret = wasm.upgradeFromTransient(transient);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function bigIntToValue(x) {
  const ret = wasm.bigIntToValue(x);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function sampleRawTokenType() {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.sampleRawTokenType();
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function ecMulGenerator(val) {
  const ret = wasm.ecMulGenerator(val);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function ecAdd(a, b) {
  const ret = wasm.ecAdd(a, b);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function valueToBigInt(x) {
  const ret = wasm.valueToBigInt(x);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function dummyContractAddress() {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.dummyContractAddress();
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function signData(key, data) {
  let deferred3_0;
  let deferred3_1;
  try {
    const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.signData(ptr0, len0, data);
    var ptr2 = ret[0];
    var len2 = ret[1];
    if (ret[3]) {
      ptr2 = 0;
      len2 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred3_0 = ptr2;
    deferred3_1 = len2;
    return getStringFromWasm0(ptr2, len2);
  } finally {
    wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
  }
}
function hashToCurve(align, val) {
  const ret = wasm.hashToCurve(align, val);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function persistentCommit(align, val, opening) {
  const ret = wasm.persistentCommit(align, val, opening);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function dummyUserAddress() {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.dummyUserAddress();
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function entryPointHash(entry_point) {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.entryPointHash(entry_point);
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function sampleUserAddress() {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.sampleUserAddress();
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function runtimeCoinCommitment(coin, recipient) {
  const ret = wasm.runtimeCoinCommitment(coin, recipient);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function maxAlignedSize(alignment) {
  const ret = wasm.maxAlignedSize(alignment);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return BigInt.asUintN(64, ret[0]);
}
function maxField() {
  const ret = wasm.maxField();
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function communicationCommitment(input, output, rand) {
  let deferred3_0;
  let deferred3_1;
  try {
    const ptr0 = passStringToWasm0(rand, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.communicationCommitment(input, output, ptr0, len0);
    var ptr2 = ret[0];
    var len2 = ret[1];
    if (ret[3]) {
      ptr2 = 0;
      len2 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred3_0 = ptr2;
    deferred3_1 = len2;
    return getStringFromWasm0(ptr2, len2);
  } finally {
    wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
  }
}
function proofDataIntoSerializedPreimage(input, output, public_transcript, private_transcript_outputs, key_location) {
  var ptr0 = isLikeNone(key_location) ? 0 : passStringToWasm0(key_location, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  const ret = wasm.proofDataIntoSerializedPreimage(input, output, public_transcript, private_transcript_outputs, ptr0, len0);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function signingKeyFromBip340(bytes) {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.signingKeyFromBip340(bytes);
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function verifySignature(key, data, signature) {
  const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  const ptr1 = passStringToWasm0(signature, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len1 = WASM_VECTOR_LEN;
  const ret = wasm.verifySignature(ptr0, len0, data, ptr1, len1);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return ret[0] !== 0;
}
function communicationCommitmentRandomness() {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.communicationCommitmentRandomness();
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function signatureVerifyingKey(key) {
  let deferred3_0;
  let deferred3_1;
  try {
    const ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.signatureVerifyingKey(ptr0, len0);
    var ptr2 = ret[0];
    var len2 = ret[1];
    if (ret[3]) {
      ptr2 = 0;
      len2 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred3_0 = ptr2;
    deferred3_1 = len2;
    return getStringFromWasm0(ptr2, len2);
  } finally {
    wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
  }
}
function bigIntModFr(x) {
  const ret = wasm.bigIntModFr(x);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function transientCommit(align, val, opening) {
  const ret = wasm.transientCommit(align, val, opening);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function persistentHash(align, val) {
  const ret = wasm.persistentHash(align, val);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function sampleSigningKey() {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.sampleSigningKey();
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function degradeToTransient(persistent) {
  const ret = wasm.degradeToTransient(persistent);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function encodeContractAddress(addr) {
  const ptr0 = passStringToWasm0(addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.encodeContractAddress(ptr0, len0);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function decodeUserAddress(addr) {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.decodeUserAddress(addr);
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function encodeShieldedCoinInfo(coin) {
  const ret = wasm.encodeShieldedCoinInfo(coin);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function decodeQualifiedShieldedCoinInfo(coin) {
  const ret = wasm.decodeQualifiedShieldedCoinInfo(coin);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function decodeRawTokenType(tt) {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.decodeRawTokenType(tt);
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function decodeShieldedCoinInfo(coin) {
  const ret = wasm.decodeShieldedCoinInfo(coin);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function encodeRawTokenType(tt) {
  const ptr0 = passStringToWasm0(tt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.encodeRawTokenType(ptr0, len0);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function encodeQualifiedShieldedCoinInfo(coin) {
  const ret = wasm.encodeQualifiedShieldedCoinInfo(coin);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function encodeUserAddress(addr) {
  const ptr0 = passStringToWasm0(addr, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.encodeUserAddress(ptr0, len0);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function decodeContractAddress(addr) {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.decodeContractAddress(addr);
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function encodeCoinPublicKey(pk) {
  const ptr0 = passStringToWasm0(pk, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.encodeCoinPublicKey(ptr0, len0);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return takeFromExternrefTable0(ret[0]);
}
function decodeCoinPublicKey(pk) {
  let deferred2_0;
  let deferred2_1;
  try {
    const ret = wasm.decodeCoinPublicKey(pk);
    var ptr1 = ret[0];
    var len1 = ret[1];
    if (ret[3]) {
      ptr1 = 0;
      len1 = 0;
      throw takeFromExternrefTable0(ret[2]);
    }
    deferred2_0 = ptr1;
    deferred2_1 = len1;
    return getStringFromWasm0(ptr1, len1);
  } finally {
    wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
  }
}
function _assertClass(instance2, klass) {
  if (!(instance2 instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}
function runProgram(initial, ops, cost_model, gas_limit) {
  _assertClass(initial, VmStack);
  _assertClass(cost_model, CostModel);
  const ret = wasm.runProgram(initial.__wbg_ptr, ops, cost_model.__wbg_ptr, gas_limit);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return VmResults.__wrap(ret[0]);
}
function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getDataViewMemory0();
  const result = [];
  for (let i = ptr; i < ptr + 4 * len; i += 4) {
    result.push(wasm.__wbindgen_export_2.get(mem.getUint32(i, true)));
  }
  wasm.__externref_drop_slice(ptr, len);
  return result;
}
function __wbg_adapter_14(arg0, arg1, arg2) {
  wasm.closure710_externref_shim(arg0, arg1, arg2);
}
function __wbg_adapter_288(arg0, arg1, arg2, arg3) {
  wasm.closure750_externref_shim(arg0, arg1, arg2, arg3);
}
var __wbindgen_enum_ReadableStreamType = ["bytes"];
var ChargedStateFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_chargedstate_free(ptr >>> 0, 1));
var ChargedState = class _ChargedState {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ChargedState.prototype);
    obj.__wbg_ptr = ptr;
    ChargedStateFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ChargedStateFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_chargedstate_free(ptr, 0);
  }
  /**
   * @param {StateValue} state
   */
  constructor(state) {
    _assertClass(state, StateValue);
    const ret = wasm.chargedstate_new(state.__wbg_ptr);
    this.__wbg_ptr = ret >>> 0;
    ChargedStateFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {StateValue}
   */
  get state() {
    const ret = wasm.chargedstate_state(this.__wbg_ptr);
    return StateValue.__wrap(ret);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.chargedstate_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) ChargedState.prototype[Symbol.dispose] = ChargedState.prototype.free;
var ContractMaintenanceAuthorityFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_contractmaintenanceauthority_free(ptr >>> 0, 1));
var ContractMaintenanceAuthority = class _ContractMaintenanceAuthority {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ContractMaintenanceAuthority.prototype);
    obj.__wbg_ptr = ptr;
    ContractMaintenanceAuthorityFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ContractMaintenanceAuthorityFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_contractmaintenanceauthority_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} raw
   * @returns {ContractMaintenanceAuthority}
   */
  static deserialize(raw) {
    const ret = wasm.contractmaintenanceauthority_deserialize(raw);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _ContractMaintenanceAuthority.__wrap(ret[0]);
  }
  /**
   * @param {Array<any>} committee
   * @param {number} threshold
   * @param {bigint | null} [counter]
   */
  constructor(committee, threshold, counter) {
    const ret = wasm.contractmaintenanceauthority_new(committee, threshold, isLikeNone(counter) ? 0 : addToExternrefTable0(counter));
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    ContractMaintenanceAuthorityFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {bigint}
   */
  get counter() {
    const ret = wasm.contractmaintenanceauthority_counter(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {Array<any>}
   */
  get committee() {
    const ret = wasm.contractmaintenanceauthority_committee(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {any}
   */
  serialize() {
    const ret = wasm.contractmaintenanceauthority_serialize(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {number}
   */
  get threshold() {
    const ret = wasm.contractmaintenanceauthority_threshold(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.contractmaintenanceauthority_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) ContractMaintenanceAuthority.prototype[Symbol.dispose] = ContractMaintenanceAuthority.prototype.free;
var ContractOperationFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_contractoperation_free(ptr >>> 0, 1));
var ContractOperation = class _ContractOperation {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ContractOperation.prototype);
    obj.__wbg_ptr = ptr;
    ContractOperationFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ContractOperationFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_contractoperation_free(ptr, 0);
  }
  /**
   * @param {Uint8Array} raw
   * @returns {ContractOperation}
   */
  static deserialize(raw) {
    const ret = wasm.contractoperation_deserialize(raw);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _ContractOperation.__wrap(ret[0]);
  }
  /**
   * @returns {any}
   */
  get verifierKey() {
    const ret = wasm.contractoperation_verifier_key(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {Uint8Array} key
   */
  set verifierKey(key) {
    const ret = wasm.contractoperation_set_verifier_key(this.__wbg_ptr, key);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  constructor() {
    const ret = wasm.contractoperation_new();
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    ContractOperationFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any}
   */
  serialize() {
    const ret = wasm.contractoperation_serialize(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.contractoperation_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) ContractOperation.prototype[Symbol.dispose] = ContractOperation.prototype.free;
var ContractStateFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_contractstate_free(ptr >>> 0, 1));
var ContractState = class _ContractState {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_ContractState.prototype);
    obj.__wbg_ptr = ptr;
    ContractStateFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ContractStateFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_contractstate_free(ptr, 0);
  }
  /**
   * @returns {any[]}
   */
  operations() {
    const ret = wasm.contractstate_operations(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @param {Uint8Array} raw
   * @returns {ContractState}
   */
  static deserialize(raw) {
    const ret = wasm.contractstate_deserialize(raw);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _ContractState.__wrap(ret[0]);
  }
  /**
   * @param {Map<any, any>} value_map
   */
  set balance(value_map) {
    const ret = wasm.contractstate_set_balance(this.__wbg_ptr, value_map);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @param {any} operation
   * @param {ContractOperation} value
   */
  setOperation(operation, value) {
    _assertClass(value, ContractOperation);
    const ret = wasm.contractstate_setOperation(this.__wbg_ptr, operation, value.__wbg_ptr);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @returns {ContractMaintenanceAuthority}
   */
  get maintenanceAuthority() {
    const ret = wasm.contractstate_maintenance_authority(this.__wbg_ptr);
    return ContractMaintenanceAuthority.__wrap(ret);
  }
  /**
   * @param {ContractMaintenanceAuthority} authority
   */
  set maintenanceAuthority(authority) {
    _assertClass(authority, ContractMaintenanceAuthority);
    wasm.contractstate_set_maintenance_authority(this.__wbg_ptr, authority.__wbg_ptr);
  }
  constructor() {
    const ret = wasm.contractstate_new();
    this.__wbg_ptr = ret >>> 0;
    ContractStateFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {ChargedState}
   */
  get data() {
    const ret = wasm.contractstate_data(this.__wbg_ptr);
    return ChargedState.__wrap(ret);
  }
  /**
   * @param {any} query
   * @param {CostModel} cost_model
   * @returns {any}
   */
  query(query, cost_model) {
    _assertClass(cost_model, CostModel);
    const ret = wasm.contractstate_query(this.__wbg_ptr, query, cost_model.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {Map<any, any>}
   */
  get balance() {
    const ret = wasm.contractstate_balance(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {ChargedState} data
   */
  set data(data) {
    _assertClass(data, ChargedState);
    wasm.contractstate_set_data(this.__wbg_ptr, data.__wbg_ptr);
  }
  /**
   * @param {any} operation
   * @returns {ContractOperation | undefined}
   */
  operation(operation) {
    const ret = wasm.contractstate_operation(this.__wbg_ptr, operation);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] === 0 ? void 0 : ContractOperation.__wrap(ret[0]);
  }
  /**
   * @returns {any}
   */
  serialize() {
    const ret = wasm.contractstate_serialize(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.contractstate_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) ContractState.prototype[Symbol.dispose] = ContractState.prototype.free;
var CostModelFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_costmodel_free(ptr >>> 0, 1));
var CostModel = class _CostModel {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_CostModel.prototype);
    obj.__wbg_ptr = ptr;
    CostModelFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    CostModelFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_costmodel_free(ptr, 0);
  }
  /**
   * @returns {CostModel}
   */
  static initialCostModel() {
    const ret = wasm.costmodel_initialCostModel();
    return _CostModel.__wrap(ret);
  }
  constructor() {
    const ret = wasm.costmodel_new();
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    CostModelFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.costmodel_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) CostModel.prototype[Symbol.dispose] = CostModel.prototype.free;
var IntoUnderlyingByteSourceFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));
var IntoUnderlyingByteSource = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingByteSourceFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get autoAllocateChunkSize() {
    const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {ReadableByteStreamController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
    return ret;
  }
  /**
   * @param {ReadableByteStreamController} controller
   */
  start(controller) {
    wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
  }
  /**
   * @returns {ReadableStreamType}
   */
  get type() {
    const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
    return __wbindgen_enum_ReadableStreamType[ret];
  }
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingbytesource_cancel(ptr);
  }
};
if (Symbol.dispose) IntoUnderlyingByteSource.prototype[Symbol.dispose] = IntoUnderlyingByteSource.prototype.free;
var IntoUnderlyingSinkFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));
var IntoUnderlyingSink = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSinkFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsink_free(ptr, 0);
  }
  /**
   * @param {any} reason
   * @returns {Promise<any>}
   */
  abort(reason) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_abort(ptr, reason);
    return ret;
  }
  /**
   * @returns {Promise<any>}
   */
  close() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_close(ptr);
    return ret;
  }
  /**
   * @param {any} chunk
   * @returns {Promise<any>}
   */
  write(chunk) {
    const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
    return ret;
  }
};
if (Symbol.dispose) IntoUnderlyingSink.prototype[Symbol.dispose] = IntoUnderlyingSink.prototype.free;
var IntoUnderlyingSourceFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));
var IntoUnderlyingSource = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSourceFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsource_free(ptr, 0);
  }
  /**
   * @param {ReadableStreamDefaultController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
    return ret;
  }
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingsource_cancel(ptr);
  }
};
if (Symbol.dispose) IntoUnderlyingSource.prototype[Symbol.dispose] = IntoUnderlyingSource.prototype.free;
var QueryContextFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_querycontext_free(ptr >>> 0, 1));
var QueryContext = class _QueryContext {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_QueryContext.prototype);
    obj.__wbg_ptr = ptr;
    QueryContextFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    QueryContextFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_querycontext_free(ptr, 0);
  }
  /**
   * @returns {any}
   */
  get comIndices() {
    const ret = wasm.querycontext_com_indices(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {any} effects
   */
  set effects(effects) {
    const ret = wasm.querycontext_set_effects(this.__wbg_ptr, effects);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @returns {VmStack}
   */
  toVmStack() {
    const ret = wasm.querycontext_toVmStack(this.__wbg_ptr);
    return VmStack.__wrap(ret);
  }
  /**
   * @param {any} transcript
   * @param {CostModel} cost_model
   * @returns {QueryContext}
   */
  runTranscript(transcript, cost_model) {
    _assertClass(cost_model, CostModel);
    const ret = wasm.querycontext_runTranscript(this.__wbg_ptr, transcript, cost_model.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _QueryContext.__wrap(ret[0]);
  }
  /**
   * @param {string} comm
   * @param {bigint} index
   * @returns {QueryContext}
   */
  insertCommitment(comm, index) {
    const ptr0 = passStringToWasm0(comm, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.querycontext_insertCommitment(this.__wbg_ptr, ptr0, len0, index);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _QueryContext.__wrap(ret[0]);
  }
  /**
   * @param {ChargedState} state
   * @param {string} address
   */
  constructor(state, address) {
    _assertClass(state, ChargedState);
    const ptr0 = passStringToWasm0(address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.querycontext_new(state.__wbg_ptr, ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    QueryContextFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any}
   */
  get block() {
    const ret = wasm.querycontext_block(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {any} ops
   * @param {CostModel} cost_model
   * @param {any} gas_limit
   * @returns {QueryResults}
   */
  query(ops, cost_model, gas_limit) {
    _assertClass(cost_model, CostModel);
    const ret = wasm.querycontext_query(this.__wbg_ptr, ops, cost_model.__wbg_ptr, gas_limit);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return QueryResults.__wrap(ret[0]);
  }
  /**
   * @returns {ChargedState}
   */
  get state() {
    const ret = wasm.querycontext_state(this.__wbg_ptr);
    return ChargedState.__wrap(ret);
  }
  /**
   * @returns {string}
   */
  get address() {
    let deferred2_0;
    let deferred2_1;
    try {
      const ret = wasm.querycontext_address(this.__wbg_ptr);
      var ptr1 = ret[0];
      var len1 = ret[1];
      if (ret[3]) {
        ptr1 = 0;
        len1 = 0;
        throw takeFromExternrefTable0(ret[2]);
      }
      deferred2_0 = ptr1;
      deferred2_1 = len1;
      return getStringFromWasm0(ptr1, len1);
    } finally {
      wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
  }
  /**
   * @returns {any}
   */
  get effects() {
    const ret = wasm.querycontext_effects(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {any} coin
   * @returns {any}
   */
  qualify(coin) {
    const ret = wasm.querycontext_qualify(this.__wbg_ptr, coin);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {any} block
   */
  set block(block) {
    const ret = wasm.querycontext_set_block(this.__wbg_ptr, block);
    if (ret[1]) {
      throw takeFromExternrefTable0(ret[0]);
    }
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.querycontext_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) QueryContext.prototype[Symbol.dispose] = QueryContext.prototype.free;
var QueryResultsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_queryresults_free(ptr >>> 0, 1));
var QueryResults = class _QueryResults {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_QueryResults.prototype);
    obj.__wbg_ptr = ptr;
    QueryResultsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    QueryResultsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_queryresults_free(ptr, 0);
  }
  constructor() {
    const ret = wasm.queryresults_new();
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    QueryResultsFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any}
   */
  get events() {
    const ret = wasm.queryresults_events(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {QueryContext}
   */
  get context() {
    const ret = wasm.queryresults_context(this.__wbg_ptr);
    return QueryContext.__wrap(ret);
  }
  /**
   * @returns {any}
   */
  get gasCost() {
    const ret = wasm.queryresults_gas_cost(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.queryresults_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) QueryResults.prototype[Symbol.dispose] = QueryResults.prototype.free;
var StateBoundedMerkleTreeFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_stateboundedmerkletree_free(ptr >>> 0, 1));
var StateBoundedMerkleTree = class _StateBoundedMerkleTree {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_StateBoundedMerkleTree.prototype);
    obj.__wbg_ptr = ptr;
    StateBoundedMerkleTreeFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    StateBoundedMerkleTreeFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_stateboundedmerkletree_free(ptr, 0);
  }
  /**
   * @param {bigint} index
   * @param {any} leaf
   * @returns {any}
   */
  pathForLeaf(index, leaf) {
    const ret = wasm.stateboundedmerkletree_pathForLeaf(this.__wbg_ptr, index, leaf);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {any} leaf
   * @param {bigint | null} [index_start]
   * @param {bigint | null} [index_end]
   * @param {boolean | null} [already_hashed]
   * @returns {any}
   */
  findPathForLeaf(leaf, index_start, index_end, already_hashed) {
    const ret = wasm.stateboundedmerkletree_findPathForLeaf(this.__wbg_ptr, leaf, !isLikeNone(index_start), isLikeNone(index_start) ? BigInt(0) : index_start, !isLikeNone(index_end), isLikeNone(index_end) ? BigInt(0) : index_end, isLikeNone(already_hashed) ? 16777215 : already_hashed ? 1 : 0);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {any}
   */
  root() {
    const ret = wasm.stateboundedmerkletree_root(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {number} height
   */
  constructor(height) {
    const ret = wasm.stateboundedmerkletree_blank(height);
    this.__wbg_ptr = ret >>> 0;
    StateBoundedMerkleTreeFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {number}
   */
  get height() {
    const ret = wasm.stateboundedmerkletree_height(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {StateBoundedMerkleTree}
   */
  rehash() {
    const ret = wasm.stateboundedmerkletree_rehash(this.__wbg_ptr);
    return _StateBoundedMerkleTree.__wrap(ret);
  }
  /**
   * @param {bigint} index
   * @param {any} leaf
   * @returns {StateBoundedMerkleTree}
   */
  update(index, leaf) {
    const ret = wasm.stateboundedmerkletree_update(this.__wbg_ptr, index, leaf);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateBoundedMerkleTree.__wrap(ret[0]);
  }
  /**
   * @param {bigint} start
   * @param {bigint} end
   * @returns {StateBoundedMerkleTree}
   */
  collapse(start2, end) {
    const ret = wasm.stateboundedmerkletree_collapse(this.__wbg_ptr, start2, end);
    return _StateBoundedMerkleTree.__wrap(ret);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.stateboundedmerkletree_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) StateBoundedMerkleTree.prototype[Symbol.dispose] = StateBoundedMerkleTree.prototype.free;
var StateMapFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_statemap_free(ptr >>> 0, 1));
var StateMap = class _StateMap {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_StateMap.prototype);
    obj.__wbg_ptr = ptr;
    StateMapFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    StateMapFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_statemap_free(ptr, 0);
  }
  /**
   * @param {any} key
   * @returns {StateValue | undefined}
   */
  get(key) {
    const ret = wasm.statemap_get(this.__wbg_ptr, key);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] === 0 ? void 0 : StateValue.__wrap(ret[0]);
  }
  constructor() {
    const ret = wasm.statemap_new();
    this.__wbg_ptr = ret >>> 0;
    StateMapFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {any[]}
   */
  keys() {
    const ret = wasm.statemap_keys(this.__wbg_ptr);
    if (ret[3]) {
      throw takeFromExternrefTable0(ret[2]);
    }
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @param {any} key
   * @param {StateValue} value
   * @returns {StateMap}
   */
  insert(key, value) {
    _assertClass(value, StateValue);
    const ret = wasm.statemap_insert(this.__wbg_ptr, key, value.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateMap.__wrap(ret[0]);
  }
  /**
   * @param {any} key
   * @returns {StateMap}
   */
  remove(key) {
    const ret = wasm.statemap_remove(this.__wbg_ptr, key);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateMap.__wrap(ret[0]);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.statemap_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) StateMap.prototype[Symbol.dispose] = StateMap.prototype.free;
var StateValueFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_statevalue_free(ptr >>> 0, 1));
var StateValue = class _StateValue {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_StateValue.prototype);
    obj.__wbg_ptr = ptr;
    StateValueFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    StateValueFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_statevalue_free(ptr, 0);
  }
  /**
   * @param {StateValue} value
   * @returns {StateValue}
   */
  arrayPush(value) {
    _assertClass(value, _StateValue);
    const ret = wasm.statevalue_arrayPush(this.__wbg_ptr, value.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateValue.__wrap(ret[0]);
  }
  /**
   * @returns {StateBoundedMerkleTree | undefined}
   */
  asBoundedMerkleTree() {
    const ret = wasm.statevalue_asBoundedMerkleTree(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] === 0 ? void 0 : StateBoundedMerkleTree.__wrap(ret[0]);
  }
  /**
   * @param {StateBoundedMerkleTree} tree
   * @returns {StateValue}
   */
  static newBoundedMerkleTree(tree) {
    _assertClass(tree, StateBoundedMerkleTree);
    const ret = wasm.statevalue_newBoundedMerkleTree(tree.__wbg_ptr);
    return _StateValue.__wrap(ret);
  }
  constructor() {
    const ret = wasm.statevalue_new();
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    this.__wbg_ptr = ret[0] >>> 0;
    StateValueFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @returns {string}
   */
  type() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.statevalue_type(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {StateMap | undefined}
   */
  asMap() {
    const ret = wasm.statevalue_asMap(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] === 0 ? void 0 : StateMap.__wrap(ret[0]);
  }
  /**
   * @param {any} value
   * @returns {StateValue}
   */
  static decode(value) {
    const ret = wasm.statevalue_decode(value);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateValue.__wrap(ret[0]);
  }
  /**
   * @returns {any}
   */
  encode() {
    const ret = wasm.statevalue_encode(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {any}
   */
  asCell() {
    const ret = wasm.statevalue_asCell(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {StateMap} map
   * @returns {StateValue}
   */
  static newMap(map) {
    _assertClass(map, StateMap);
    const ret = wasm.statevalue_newMap(map.__wbg_ptr);
    return _StateValue.__wrap(ret);
  }
  /**
   * @returns {any[] | undefined}
   */
  asArray() {
    const ret = wasm.statevalue_asArray(this.__wbg_ptr);
    if (ret[3]) {
      throw takeFromExternrefTable0(ret[2]);
    }
    let v1;
    if (ret[0] !== 0) {
      v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
      wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    }
    return v1;
  }
  /**
   * @returns {number}
   */
  logSize() {
    const ret = wasm.statevalue_logSize(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {any} value
   * @returns {StateValue}
   */
  static newCell(value) {
    const ret = wasm.statevalue_newCell(value);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _StateValue.__wrap(ret[0]);
  }
  /**
   * @returns {StateValue}
   */
  static newNull() {
    const ret = wasm.statevalue_newNull();
    return _StateValue.__wrap(ret);
  }
  /**
   * @returns {StateValue}
   */
  static newArray() {
    const ret = wasm.statevalue_newArray();
    return _StateValue.__wrap(ret);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.statevalue_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) StateValue.prototype[Symbol.dispose] = StateValue.prototype.free;
var VmResultsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_vmresults_free(ptr >>> 0, 1));
var VmResults = class _VmResults {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_VmResults.prototype);
    obj.__wbg_ptr = ptr;
    VmResultsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    VmResultsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_vmresults_free(ptr, 0);
  }
  constructor() {
    const ret = wasm.vmresults_new();
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return StateValue.__wrap(ret[0]);
  }
  /**
   * @returns {VmStack}
   */
  get stack() {
    const ret = wasm.vmresults_stack(this.__wbg_ptr);
    return VmStack.__wrap(ret);
  }
  /**
   * @returns {any}
   */
  get events() {
    const ret = wasm.vmresults_events(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @returns {any}
   */
  get gasCost() {
    const ret = wasm.vmresults_gas_cost(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.vmresults_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) VmResults.prototype[Symbol.dispose] = VmResults.prototype.free;
var VmStackFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_vmstack_free(ptr >>> 0, 1));
var VmStack = class _VmStack {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_VmStack.prototype);
    obj.__wbg_ptr = ptr;
    VmStackFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    VmStackFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_vmstack_free(ptr, 0);
  }
  removeLast() {
    wasm.vmstack_removeLast(this.__wbg_ptr);
  }
  /**
   * @param {number} idx
   * @returns {StateValue | undefined}
   */
  get(idx) {
    const ret = wasm.vmstack_get(this.__wbg_ptr, idx);
    return ret === 0 ? void 0 : StateValue.__wrap(ret);
  }
  constructor() {
    const ret = wasm.vmstack_new();
    this.__wbg_ptr = ret >>> 0;
    VmStackFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {StateValue} value
   * @param {boolean} is_strong
   */
  push(value, is_strong) {
    _assertClass(value, StateValue);
    wasm.vmstack_push(this.__wbg_ptr, value.__wbg_ptr, is_strong);
  }
  /**
   * @returns {number}
   */
  length() {
    const ret = wasm.vmstack_length(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} idx
   * @returns {boolean | undefined}
   */
  isStrong(idx) {
    const ret = wasm.vmstack_isStrong(this.__wbg_ptr, idx);
    return ret === 16777215 ? void 0 : ret !== 0;
  }
  /**
   * @param {boolean | null} [compact]
   * @returns {string}
   */
  toString(compact) {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.vmstack_toString(this.__wbg_ptr, isLikeNone(compact) ? 16777215 : compact ? 1 : 0);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
};
if (Symbol.dispose) VmStack.prototype[Symbol.dispose] = VmStack.prototype.free;
function __wbg_BigInt_40a77d45cca49470() {
  return handleError(function(arg0) {
    const ret = BigInt(arg0);
    return ret;
  }, arguments);
}
function __wbg_BigInt_6adbfd8eb0f7ec07(arg0) {
  const ret = BigInt(arg0);
  return ret;
}
function __wbg_Error_e17e777aac105295(arg0, arg1) {
  const ret = Error(getStringFromWasm0(arg0, arg1));
  return ret;
}
function __wbg_Number_998bea33bd87c3e0(arg0) {
  const ret = Number(arg0);
  return ret;
}
function __wbg_String_8f0eb39a4a4c2f66(arg0, arg1) {
  const ret = String(arg1);
  const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
function __wbg_buffer_8d40b1d762fb3c66(arg0) {
  const ret = arg0.buffer;
  return ret;
}
function __wbg_byobRequest_2c036bceca1e6037(arg0) {
  const ret = arg0.byobRequest;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_byteLength_331a6b5545834024(arg0) {
  const ret = arg0.byteLength;
  return ret;
}
function __wbg_byteOffset_49a5b5608000358b(arg0) {
  const ret = arg0.byteOffset;
  return ret;
}
function __wbg_call_13410aac570ffff7() {
  return handleError(function(arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
  }, arguments);
}
function __wbg_call_a5400b25a865cfd8() {
  return handleError(function(arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
  }, arguments);
}
function __wbg_close_cccada6053ee3a65() {
  return handleError(function(arg0) {
    arg0.close();
  }, arguments);
}
function __wbg_close_d71a78219dc23e91() {
  return handleError(function(arg0) {
    arg0.close();
  }, arguments);
}
function __wbg_contractstate_new(arg0) {
  const ret = ContractState.__wrap(arg0);
  return ret;
}
function __wbg_crypto_86f2631e91b51511(arg0) {
  const ret = arg0.crypto;
  return ret;
}
function __wbg_done_75ed0ee6dd243d9d(arg0) {
  const ret = arg0.done;
  return ret;
}
function __wbg_enqueue_452bc2343d1c2ff9() {
  return handleError(function(arg0, arg1) {
    arg0.enqueue(arg1);
  }, arguments);
}
function __wbg_entries_2be2f15bd5554996(arg0) {
  const ret = Object.entries(arg0);
  return ret;
}
function __wbg_from_88bc52ce20ba6318(arg0) {
  const ret = Array.from(arg0);
  return ret;
}
function __wbg_getRandomValues_b3f15fcbfabb0f8b() {
  return handleError(function(arg0, arg1) {
    arg0.getRandomValues(arg1);
  }, arguments);
}
function __wbg_get_0da715ceaecea5c8(arg0, arg1) {
  const ret = arg0[arg1 >>> 0];
  return ret;
}
function __wbg_get_458e874b43b18b25() {
  return handleError(function(arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
  }, arguments);
}
function __wbg_get_5ee3191755594360(arg0, arg1) {
  const ret = arg0.get(arg1);
  return ret;
}
function __wbg_getwithrefkey_1dc361bd10053bfe(arg0, arg1) {
  const ret = arg0[arg1];
  return ret;
}
function __wbg_instanceof_ArrayBuffer_67f3012529f6a2dd(arg0) {
  let result;
  try {
    result = arg0 instanceof ArrayBuffer;
  } catch (_) {
    result = false;
  }
  const ret = result;
  return ret;
}
function __wbg_instanceof_Map_ebb01a5b6b5ffd0b(arg0) {
  let result;
  try {
    result = arg0 instanceof Map;
  } catch (_) {
    result = false;
  }
  const ret = result;
  return ret;
}
function __wbg_instanceof_Uint8Array_9a8378d955933db7(arg0) {
  let result;
  try {
    result = arg0 instanceof Uint8Array;
  } catch (_) {
    result = false;
  }
  const ret = result;
  return ret;
}
function __wbg_isArray_030cce220591fb41(arg0) {
  const ret = Array.isArray(arg0);
  return ret;
}
function __wbg_isSafeInteger_1c0d1af5542e102a(arg0) {
  const ret = Number.isSafeInteger(arg0);
  return ret;
}
function __wbg_iterator_f370b34483c71a1c() {
  const ret = Symbol.iterator;
  return ret;
}
function __wbg_keys_822161a7faf55538(arg0) {
  const ret = arg0.keys();
  return ret;
}
function __wbg_length_186546c51cd61acd(arg0) {
  const ret = arg0.length;
  return ret;
}
function __wbg_length_6bb7e81f9d7713e4(arg0) {
  const ret = arg0.length;
  return ret;
}
function __wbg_msCrypto_d562bbe83e0d4b91(arg0) {
  const ret = arg0.msCrypto;
  return ret;
}
function __wbg_new_19c25a3f2fa63a02() {
  const ret = new Object();
  return ret;
}
function __wbg_new_1f3a344cf3123716() {
  const ret = new Array();
  return ret;
}
function __wbg_new_2e3c58a15f39f5f9(arg0, arg1) {
  try {
    var state0 = { a: arg0, b: arg1 };
    var cb0 = (arg02, arg12) => {
      const a = state0.a;
      state0.a = 0;
      try {
        return __wbg_adapter_288(a, state0.b, arg02, arg12);
      } finally {
        state0.a = a;
      }
    };
    const ret = new Promise(cb0);
    return ret;
  } finally {
    state0.a = state0.b = 0;
  }
}
function __wbg_new_2ff1f68f3676ea53() {
  const ret = /* @__PURE__ */ new Map();
  return ret;
}
function __wbg_new_638ebfaedbf32a5e(arg0) {
  const ret = new Uint8Array(arg0);
  return ret;
}
function __wbg_new_da9dc54c5db29dfa(arg0, arg1) {
  const ret = new Error(getStringFromWasm0(arg0, arg1));
  return ret;
}
function __wbg_newfromslice_074c56947bd43469(arg0, arg1) {
  const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
  return ret;
}
function __wbg_newnoargs_254190557c45b4ec(arg0, arg1) {
  const ret = new Function(getStringFromWasm0(arg0, arg1));
  return ret;
}
function __wbg_newwithbyteoffsetandlength_e8f53910b4d42b45(arg0, arg1, arg2) {
  const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
  return ret;
}
function __wbg_newwithlength_a167dcc7aaa3ba77(arg0) {
  const ret = new Uint8Array(arg0 >>> 0);
  return ret;
}
function __wbg_next_5b3530e612fde77d(arg0) {
  const ret = arg0.next;
  return ret;
}
function __wbg_next_692e82279131b03c() {
  return handleError(function(arg0) {
    const ret = arg0.next();
    return ret;
  }, arguments);
}
function __wbg_node_e1f24f89a7336c2e(arg0) {
  const ret = arg0.node;
  return ret;
}
function __wbg_process_3975fd6c72f520aa(arg0) {
  const ret = arg0.process;
  return ret;
}
function __wbg_prototypesetcall_3d4a26c1ed734349(arg0, arg1, arg2) {
  Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
}
function __wbg_push_330b2eb93e4e1212(arg0, arg1) {
  const ret = arg0.push(arg1);
  return ret;
}
function __wbg_queueMicrotask_25d0739ac89e8c88(arg0) {
  queueMicrotask(arg0);
}
function __wbg_queueMicrotask_4488407636f5bf24(arg0) {
  const ret = arg0.queueMicrotask;
  return ret;
}
function __wbg_randomFillSync_f8c153b79f285817() {
  return handleError(function(arg0, arg1) {
    arg0.randomFillSync(arg1);
  }, arguments);
}
function __wbg_require_b74f47fc2d022fd6() {
  return handleError(function() {
    const ret = module.require;
    return ret;
  }, arguments);
}
function __wbg_resolve_4055c623acdd6a1b(arg0) {
  const ret = Promise.resolve(arg0);
  return ret;
}
function __wbg_respond_6c2c4e20ef85138e() {
  return handleError(function(arg0, arg1) {
    arg0.respond(arg1 >>> 0);
  }, arguments);
}
function __wbg_set_1353b2a5e96bc48c(arg0, arg1, arg2) {
  arg0.set(getArrayU8FromWasm0(arg1, arg2));
}
function __wbg_set_3f1d0b984ed272ed(arg0, arg1, arg2) {
  arg0[arg1] = arg2;
}
function __wbg_set_90f6c0f7bd8c0415(arg0, arg1, arg2) {
  arg0[arg1 >>> 0] = arg2;
}
function __wbg_set_b7f1cf4fae26fe2a(arg0, arg1, arg2) {
  const ret = arg0.set(arg1, arg2);
  return ret;
}
function __wbg_statevalue_new(arg0) {
  const ret = StateValue.__wrap(arg0);
  return ret;
}
function __wbg_static_accessor_GLOBAL_8921f820c2ce3f12() {
  const ret = typeof global === "undefined" ? null : global;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_static_accessor_GLOBAL_THIS_f0a4409105898184() {
  const ret = typeof globalThis === "undefined" ? null : globalThis;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_static_accessor_SELF_995b214ae681ff99() {
  const ret = typeof self === "undefined" ? null : self;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_static_accessor_WINDOW_cde3890479c675ea() {
  const ret = typeof window === "undefined" ? null : window;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_subarray_70fd07feefe14294(arg0, arg1, arg2) {
  const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
  return ret;
}
function __wbg_then_e22500defe16819f(arg0, arg1) {
  const ret = arg0.then(arg1);
  return ret;
}
function __wbg_toString_7268338f40012a03() {
  return handleError(function(arg0, arg1) {
    const ret = arg0.toString(arg1);
    return ret;
  }, arguments);
}
function __wbg_toString_d8f537919ef401d6(arg0) {
  const ret = arg0.toString();
  return ret;
}
function __wbg_value_dd9372230531eade(arg0) {
  const ret = arg0.value;
  return ret;
}
function __wbg_versions_4e31226f5e8dc909(arg0) {
  const ret = arg0.versions;
  return ret;
}
function __wbg_view_91cc97d57ab30530(arg0) {
  const ret = arg0.view;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
function __wbg_wbindgenbigintgetasi64_ac743ece6ab9bba1(arg0, arg1) {
  const v = arg1;
  const ret = typeof v === "bigint" ? v : void 0;
  getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
}
function __wbg_wbindgenbooleanget_3fe6f642c7d97746(arg0) {
  const v = arg0;
  const ret = typeof v === "boolean" ? v : void 0;
  return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
}
function __wbg_wbindgencbdrop_eb10308566512b88(arg0) {
  const obj = arg0.original;
  if (obj.cnt-- == 1) {
    obj.a = 0;
    return true;
  }
  const ret = false;
  return ret;
}
function __wbg_wbindgendebugstring_99ef257a3ddda34d(arg0, arg1) {
  const ret = debugString(arg1);
  const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
function __wbg_wbindgenin_d7a1ee10933d2d55(arg0, arg1) {
  const ret = arg0 in arg1;
  return ret;
}
function __wbg_wbindgenisbigint_ecb90cc08a5a9154(arg0) {
  const ret = typeof arg0 === "bigint";
  return ret;
}
function __wbg_wbindgenisfunction_8cee7dce3725ae74(arg0) {
  const ret = typeof arg0 === "function";
  return ret;
}
function __wbg_wbindgenisnull_f3037694abe4d97a(arg0) {
  const ret = arg0 === null;
  return ret;
}
function __wbg_wbindgenisobject_307a53c6bd97fbf8(arg0) {
  const val = arg0;
  const ret = typeof val === "object" && val !== null;
  return ret;
}
function __wbg_wbindgenisstring_d4fa939789f003b0(arg0) {
  const ret = typeof arg0 === "string";
  return ret;
}
function __wbg_wbindgenisundefined_c4b71d073b92f3c5(arg0) {
  const ret = arg0 === void 0;
  return ret;
}
function __wbg_wbindgenjsvaleq_e6f2ad59ccae1b58(arg0, arg1) {
  const ret = arg0 === arg1;
  return ret;
}
function __wbg_wbindgenjsvallooseeq_9bec8c9be826bed1(arg0, arg1) {
  const ret = arg0 == arg1;
  return ret;
}
function __wbg_wbindgennumberget_f74b4c7525ac05cb(arg0, arg1) {
  const obj = arg1;
  const ret = typeof obj === "number" ? obj : void 0;
  getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
}
function __wbg_wbindgenshr_7d2aae6044c0dab1(arg0, arg1) {
  const ret = arg0 >> arg1;
  return ret;
}
function __wbg_wbindgenstringget_0f16a6ddddef376f(arg0, arg1) {
  const obj = arg1;
  const ret = typeof obj === "string" ? obj : void 0;
  var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
function __wbg_wbindgenthrow_451ec1a8469d7eb6(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}
function __wbindgen_cast_21820e4b948a0575(arg0, arg1) {
  const ret = makeMutClosure(arg0, arg1, 709, __wbg_adapter_14);
  return ret;
}
function __wbindgen_cast_2241b6af4c4b2941(arg0, arg1) {
  const ret = getStringFromWasm0(arg0, arg1);
  return ret;
}
function __wbindgen_cast_4625c577ab2ec9ee(arg0) {
  const ret = BigInt.asUintN(64, arg0);
  return ret;
}
function __wbindgen_cast_9ae0607507abb057(arg0) {
  const ret = arg0;
  return ret;
}
function __wbindgen_cast_cb9088102bce6b30(arg0, arg1) {
  const ret = getArrayU8FromWasm0(arg0, arg1);
  return ret;
}
function __wbindgen_cast_d6cd19b81560fd6e(arg0) {
  const ret = arg0;
  return ret;
}
function __wbindgen_cast_e7b45dd881f38ce3(arg0, arg1) {
  const ret = BigInt.asUintN(64, arg0) | BigInt.asUintN(64, arg1) << BigInt(64);
  return ret;
}
function __wbindgen_init_externref_table() {
  const table = wasm.__wbindgen_export_2;
  const offset = table.grow(4);
  table.set(0, void 0);
  table.set(offset + 0, void 0);
  table.set(offset + 1, null);
  table.set(offset + 2, true);
  table.set(offset + 3, false);
  ;
}

// onchain-runtime:onchain-runtime-v3
var response = await fetch(new URL("./onchain_runtime_bg.wasm", import.meta.url));
if (!response.ok) throw new Error("could not load onchain_runtime_bg.wasm: HTTP " + response.status);
var { instance } = await WebAssembly.instantiate(await response.arrayBuffer(), {
  "./midnight_onchain_runtime_wasm_bg.js": midnight_onchain_runtime_wasm_bg_exports
});
__wbg_set_wasm(instance.exports);
instance.exports.__wbindgen_start();

// ../node_modules/@midnight-ntwrk/compact-runtime/dist/constants.js
var MAX_FIELD = maxField();
var DUMMY_ADDRESS = dummyContractAddress();

// ../node_modules/@midnight-ntwrk/compact-runtime/dist/version.js
var versionString = "0.16.0";
var checkRuntimeVersion = (expectedRuntimeVersionString) => {
  const expectedRuntimeVersion = expectedRuntimeVersionString.split("-")[0].split(".").map(Number);
  const actualRuntimeVersion = versionString.split("-")[0].split(".").map(Number);
  if (expectedRuntimeVersion[0] !== actualRuntimeVersion[0] || actualRuntimeVersion[0] === 0 && expectedRuntimeVersion[1] !== actualRuntimeVersion[1] || expectedRuntimeVersion[1] > actualRuntimeVersion[1] || expectedRuntimeVersion[1] === actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]) {
    throw new CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${versionString}`);
  }
  const MAX_FIELD2 = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (MAX_FIELD2 !== MAX_FIELD) {
    throw new CompactError(`Maximum field mismatch: compiled code uses ${MAX_FIELD2}, runtime uses ${MAX_FIELD}`);
  }
};

// ../node_modules/@midnight-ntwrk/compact-runtime/dist/compact-types.js
var CompactTypeField = {
  alignment() {
    return [{ tag: "atom", value: { tag: "field" } }];
  },
  fromValue(value) {
    const val = value.shift();
    if (val == void 0) {
      throw new CompactError("expected Field");
    } else {
      return valueToBigInt([val]);
    }
  },
  toValue(value) {
    return bigIntToValue(value);
  }
};
var CompactTypeEnum = class {
  maxValue;
  length;
  constructor(maxValue, length) {
    this.maxValue = maxValue;
    this.length = length;
  }
  alignment() {
    return [{ tag: "atom", value: { tag: "bytes", length: this.length } }];
  }
  fromValue(value) {
    const val = value.shift();
    if (val == void 0) {
      throw new CompactError(`expected Enum[<=${this.maxValue}]`);
    } else {
      let res = 0;
      for (let i = 0; i < val.length; i++) {
        res += (1 << 8 * i) * val[i];
      }
      if (res > this.maxValue) {
        throw new CompactError(`expected UnsignedInteger[<=${this.maxValue}]`);
      }
      return res;
    }
  }
  toValue(value) {
    return CompactTypeField.toValue(BigInt(value));
  }
};
var CompactTypeUnsignedInteger = class {
  maxValue;
  length;
  constructor(maxValue, length) {
    this.maxValue = maxValue;
    this.length = length;
  }
  alignment() {
    return [{ tag: "atom", value: { tag: "bytes", length: this.length } }];
  }
  fromValue(value) {
    const val = value.shift();
    if (val == void 0) {
      throw new CompactError(`expected UnsignedInteger[<=${this.maxValue}]`);
    } else {
      let res = 0n;
      for (let i = 0; i < val.length; i++) {
        res += (1n << 8n * BigInt(i)) * BigInt(val[i]);
      }
      if (res > this.maxValue) {
        throw new CompactError(`expected UnsignedInteger[<=${this.maxValue}]`);
      }
      return res;
    }
  }
  toValue(value) {
    return CompactTypeField.toValue(value);
  }
};
var CompactTypeVector = class {
  length;
  type;
  constructor(length, type) {
    this.length = length;
    this.type = type;
  }
  alignment() {
    const inner = this.type.alignment();
    let res = [];
    for (let i = 0; i < this.length; i++) {
      res = res.concat(inner);
    }
    return res;
  }
  fromValue(value) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
      res.push(this.type.fromValue(value));
    }
    return res;
  }
  toValue(value) {
    if (value.length != this.length) {
      throw new CompactError(`expected ${this.length}-element array`);
    }
    let res = [];
    for (let i = 0; i < this.length; i++) {
      res = res.concat(this.type.toValue(value[i]));
    }
    return res;
  }
};
var CompactTypeBoolean = {
  alignment() {
    return [{ tag: "atom", value: { tag: "bytes", length: 1 } }];
  },
  fromValue(value) {
    const val = value.shift();
    if (val == void 0 || val.length > 1 || val.length == 1 && val[0] != 1) {
      throw new CompactError("expected Boolean");
    }
    return val.length == 1;
  },
  toValue(value) {
    if (value) {
      return [new Uint8Array([1])];
    } else {
      return [new Uint8Array(0)];
    }
  }
};
var CompactTypeBytes = class {
  length;
  constructor(length) {
    this.length = length;
  }
  alignment() {
    return [{ tag: "atom", value: { tag: "bytes", length: this.length } }];
  }
  fromValue(value) {
    const val = value.shift();
    if (val == void 0 || val.length > this.length) {
      throw new CompactError(`expected Bytes[${this.length}]`);
    }
    if (val.length == this.length) {
      return val;
    }
    const res = new Uint8Array(this.length);
    res.set(val, 0);
    return res;
  }
  toValue(value) {
    let end = value.length;
    while (end > 0 && value[end - 1] == 0) {
      end -= 1;
    }
    return [value.slice(0, end)];
  }
};
var Bytes32Descriptor = new CompactTypeBytes(32);
var MaxUint8Descriptor = new CompactTypeUnsignedInteger(18446744073709551615n, 8);

// ../node_modules/@midnight-ntwrk/compact-runtime/dist/built-ins.js
var FIELD_MODULUS = MAX_FIELD + 1n;
function persistentHash2(rtType, value) {
  const wrapped = persistentHash(rtType.alignment(), rtType.toValue(value))[0];
  const res = new Uint8Array(32);
  res.set(wrapped, 0);
  return res;
}
function persistentCommit2(rtType, value, opening) {
  if (opening.length != 32) {
    throw new CompactError("Expected 32-byte string");
  }
  const wrapped = persistentCommit(rtType.alignment(), rtType.toValue(value), [opening])[0];
  const res = new Uint8Array(32);
  res.set(wrapped, 0);
  return res;
}

// ../node_modules/@midnight-ntwrk/compact-runtime/dist/zswap.js
var emptyZswapLocalState = (coinPublicKey) => ({
  coinPublicKey: typeof coinPublicKey === "string" ? { bytes: encodeCoinPublicKey(coinPublicKey) } : coinPublicKey,
  currentIndex: 0n,
  inputs: [],
  outputs: []
});
var encodeRecipient = ({ is_left, left, right }) => ({
  is_left,
  left: { bytes: encodeCoinPublicKey(left) },
  right: { bytes: encodeContractAddress(right) }
});
var encodeZswapLocalState = (state) => ({
  coinPublicKey: { bytes: encodeCoinPublicKey(state.coinPublicKey) },
  currentIndex: state.currentIndex,
  inputs: state.inputs.map(encodeQualifiedShieldedCoinInfo),
  outputs: state.outputs.map(({ coinInfo, recipient }) => ({
    coinInfo: encodeShieldedCoinInfo(coinInfo),
    recipient: encodeRecipient(recipient)
  }))
});

// ../node_modules/@midnight-ntwrk/compact-runtime/dist/constructor-context.js
var createConstructorContext = (initialPrivateState, coinPublicKey) => ({
  initialPrivateState,
  initialZswapLocalState: emptyZswapLocalState(coinPublicKey)
});

// ../node_modules/@midnight-ntwrk/compact-runtime/dist/circuit-context.js
var coerceToChargedState = (contractState) => {
  let state;
  if (contractState instanceof ChargedState) {
    state = contractState;
  } else if (contractState instanceof ContractState) {
    state = contractState.data;
  } else if (contractState instanceof StateValue) {
    state = new ChargedState(contractState);
  } else {
    throw new CompactError(`'contractState' parameter ${contractState} has unexpected type`);
  }
  return state;
};
var createInitialQueryContext = (contractState, contractAddress, time) => {
  const initialQueryContext = new QueryContext(coerceToChargedState(contractState), contractAddress);
  const balance = contractState instanceof ContractState ? contractState.balance : /* @__PURE__ */ new Map();
  initialQueryContext.block = {
    ...initialQueryContext.block,
    balance,
    ownAddress: contractAddress,
    secondsSinceEpoch: BigInt(time ?? Math.floor(Date.now() / 1e3))
  };
  return initialQueryContext;
};
var isZswapLocalState = (value) => {
  return typeof value === "object" && value !== null && "coinPublicKey" in value && typeof value.coinPublicKey === "string" && "currentIndex" in value && "inputs" in value && "outputs" in value;
};
var isEncodedZswapLocalState = (value) => {
  return typeof value === "object" && value !== null && "coinPublicKey" in value && typeof value.coinPublicKey === "object" && value.coinPublicKey !== null && "bytes" in value.coinPublicKey && "currentIndex" in value && "inputs" in value && "outputs" in value;
};
var createCircuitContext = (contractAddress, coinPublicKeyOrZswapState, contractState, privateState, gasLimit, costModel, time) => {
  const initialQueryContext = createInitialQueryContext(contractState, contractAddress, time);
  let zswapLocalState;
  if (isZswapLocalState(coinPublicKeyOrZswapState)) {
    zswapLocalState = encodeZswapLocalState(coinPublicKeyOrZswapState);
  } else if (isEncodedZswapLocalState(coinPublicKeyOrZswapState)) {
    zswapLocalState = coinPublicKeyOrZswapState;
  } else {
    zswapLocalState = emptyZswapLocalState(coinPublicKeyOrZswapState);
  }
  return {
    currentPrivateState: privateState,
    currentZswapLocalState: zswapLocalState,
    currentQueryContext: initialQueryContext,
    costModel: costModel ?? CostModel.initialCostModel(),
    gasLimit
  };
};
var emptyRunningCost = () => ({
  readTime: 0n,
  computeTime: 0n,
  bytesWritten: 0n,
  bytesDeleted: 0n
});
var queryLedgerState = (circuitContext, partialProofData, program) => {
  try {
    const res = circuitContext.currentQueryContext.query(program, circuitContext.costModel, circuitContext.gasLimit);
    circuitContext.currentQueryContext = res.context;
    circuitContext["gasCost"] = res.gasCost;
    const reads = res.events.filter((e) => e.tag === "read");
    let i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(program.map((op) => typeof op === "object" && "popeq" in op ? {
      popeq: {
        ...op.popeq,
        result: reads[i++].content
      }
    } : op));
    if (res.events.length === 1) {
      const event = res.events[0];
      if (event.tag === "read") {
        return event.content;
      }
    }
    return res.events;
  } catch (err) {
    if (err instanceof Error) {
      throw new CompactError(err.toString());
    }
    throw err;
  }
};

// ../node_modules/@midnight-ntwrk/compact-runtime/dist/witness.js
function createWitnessContext(ledger2, privateState, contractAddress) {
  return {
    ledger: ledger2,
    privateState,
    contractAddress
  };
}

// ../contract/dist/managed/disclosure-ledger/contract/index.js
checkRuntimeVersion("0.16.0");
var Status;
(function(Status2) {
  Status2[Status2["committed"] = 0] = "committed";
  Status2[Status2["disclosed"] = 1] = "disclosed";
  Status2[Status2["resolved"] = 2] = "resolved";
  Status2[Status2["withdrawn"] = 3] = "withdrawn";
})(Status || (Status = {}));
var _descriptor_0 = new CompactTypeBytes(32);
var _descriptor_1 = new CompactTypeUnsignedInteger(18446744073709551615n, 8);
var _descriptor_2 = new CompactTypeEnum(3, 1);
var _Entry_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment()))));
  }
  fromValue(value_0) {
    return {
      owner: _descriptor_0.fromValue(value_0),
      ordinal: _descriptor_1.fromValue(value_0),
      notAfter: _descriptor_1.fromValue(value_0),
      status: _descriptor_2.fromValue(value_0),
      digest: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.owner).concat(_descriptor_1.toValue(value_0.ordinal).concat(_descriptor_1.toValue(value_0.notAfter).concat(_descriptor_2.toValue(value_0.status).concat(_descriptor_0.toValue(value_0.digest)))));
  }
};
var _descriptor_3 = new _Entry_0();
var _descriptor_4 = CompactTypeBoolean;
var _descriptor_5 = new CompactTypeUnsignedInteger(65535n, 2);
var _ReportOpening_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return {
      digest: _descriptor_0.fromValue(value_0),
      salt: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.digest).concat(_descriptor_0.toValue(value_0.salt));
  }
};
var _descriptor_6 = new _ReportOpening_0();
var _descriptor_7 = new CompactTypeVector(3, _descriptor_0);
var _Either_0 = class {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_4.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
};
var _descriptor_8 = new _Either_0();
var _descriptor_9 = new CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);
var _ContractAddress_0 = class {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
};
var _descriptor_10 = new _ContractAddress_0();
var _descriptor_11 = new CompactTypeUnsignedInteger(255n, 1);
var Contract = class {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof witnesses_0 !== "object") {
      throw new CompactError("first (witnesses) argument to Contract constructor is not an object");
    }
    if (typeof witnesses_0.localSecretKey !== "function") {
      throw new CompactError("first (witnesses) argument to Contract constructor does not contain a function-valued field named localSecretKey");
    }
    if (typeof witnesses_0.draftReport !== "function") {
      throw new CompactError("first (witnesses) argument to Contract constructor does not contain a function-valued field named draftReport");
    }
    if (typeof witnesses_0.reportOpening !== "function") {
      throw new CompactError("first (witnesses) argument to Contract constructor does not contain a function-valued field named reportOpening");
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      reportCommitment(context, ...args_1) {
        return { result: pureCircuits.reportCommitment(...args_1), context };
      },
      ownerKey(context, ...args_1) {
        return { result: pureCircuits.ownerKey(...args_1), context };
      },
      commitReport: (...args_1) => {
        if (args_1.length !== 2) {
          throw new CompactError(`commitReport: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const notAfter_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          typeError(
            "commitReport",
            "argument 1 (as invoked from Typescript)",
            "disclosure-ledger.compact line 110 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof notAfter_0 === "bigint" && notAfter_0 >= 0n && notAfter_0 <= 18446744073709551615n)) {
          typeError(
            "commitReport",
            "argument 1 (argument 2 as invoked from Typescript)",
            "disclosure-ledger.compact line 110 char 1",
            "Uint<0..18446744073709551616>",
            notAfter_0
          );
        }
        const context = { ...contextOrig_0, gasCost: emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(notAfter_0),
            alignment: _descriptor_1.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._commitReport_0(
          context,
          partialProofData,
          notAfter_0
        );
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      proveMatch: (...args_1) => {
        if (args_1.length !== 3) {
          throw new CompactError(`proveMatch: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const commitment_0 = args_1[1];
        const vendorDigest_0 = args_1[2];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          typeError(
            "proveMatch",
            "argument 1 (as invoked from Typescript)",
            "disclosure-ledger.compact line 133 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(commitment_0.buffer instanceof ArrayBuffer && commitment_0.BYTES_PER_ELEMENT === 1 && commitment_0.length === 32)) {
          typeError(
            "proveMatch",
            "argument 1 (argument 2 as invoked from Typescript)",
            "disclosure-ledger.compact line 133 char 1",
            "Bytes<32>",
            commitment_0
          );
        }
        if (!(vendorDigest_0.buffer instanceof ArrayBuffer && vendorDigest_0.BYTES_PER_ELEMENT === 1 && vendorDigest_0.length === 32)) {
          typeError(
            "proveMatch",
            "argument 2 (argument 3 as invoked from Typescript)",
            "disclosure-ledger.compact line 133 char 1",
            "Bytes<32>",
            vendorDigest_0
          );
        }
        const context = { ...contextOrig_0, gasCost: emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(commitment_0).concat(_descriptor_0.toValue(vendorDigest_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._proveMatch_0(
          context,
          partialProofData,
          commitment_0,
          vendorDigest_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      markResolved: (...args_1) => {
        if (args_1.length !== 2) {
          throw new CompactError(`markResolved: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const commitment_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          typeError(
            "markResolved",
            "argument 1 (as invoked from Typescript)",
            "disclosure-ledger.compact line 148 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(commitment_0.buffer instanceof ArrayBuffer && commitment_0.BYTES_PER_ELEMENT === 1 && commitment_0.length === 32)) {
          typeError(
            "markResolved",
            "argument 1 (argument 2 as invoked from Typescript)",
            "disclosure-ledger.compact line 148 char 1",
            "Bytes<32>",
            commitment_0
          );
        }
        const context = { ...contextOrig_0, gasCost: emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(commitment_0),
            alignment: _descriptor_0.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._markResolved_0(
          context,
          partialProofData,
          commitment_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      withdraw: (...args_1) => {
        if (args_1.length !== 2) {
          throw new CompactError(`withdraw: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const commitment_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          typeError(
            "withdraw",
            "argument 1 (as invoked from Typescript)",
            "disclosure-ledger.compact line 156 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(commitment_0.buffer instanceof ArrayBuffer && commitment_0.BYTES_PER_ELEMENT === 1 && commitment_0.length === 32)) {
          typeError(
            "withdraw",
            "argument 1 (argument 2 as invoked from Typescript)",
            "disclosure-ledger.compact line 156 char 1",
            "Bytes<32>",
            commitment_0
          );
        }
        const context = { ...contextOrig_0, gasCost: emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(commitment_0),
            alignment: _descriptor_0.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._withdraw_0(
          context,
          partialProofData,
          commitment_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      commitReport: this.circuits.commitReport,
      proveMatch: this.circuits.proveMatch,
      markResolved: this.circuits.markResolved,
      withdraw: this.circuits.withdraw
    };
    this.provableCircuits = {
      commitReport: this.circuits.commitReport,
      proveMatch: this.circuits.proveMatch,
      markResolved: this.circuits.markResolved,
      withdraw: this.circuits.withdraw
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof constructorContext_0 !== "object") {
      throw new CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!("initialPrivateState" in constructorContext_0)) {
      throw new CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!("initialZswapLocalState" in constructorContext_0)) {
      throw new CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof constructorContext_0.initialZswapLocalState !== "object") {
      throw new CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new ContractState();
    let stateValue_0 = StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(StateValue.newNull());
    state_0.data = new ChargedState(stateValue_0);
    state_0.setOperation("commitReport", new ContractOperation());
    state_0.setOperation("proveMatch", new ContractOperation());
    state_0.setOperation("markResolved", new ContractOperation());
    state_0.setOperation("withdraw", new ContractOperation());
    const context = createCircuitContext(dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: void 0,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    queryLedgerState(
      context,
      partialProofData,
      [
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_11.toValue(0n),
            alignment: _descriptor_11.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newMap(
            new StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } }
      ]
    );
    queryLedgerState(
      context,
      partialProofData,
      [
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_11.toValue(1n),
            alignment: _descriptor_11.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_1.toValue(0n),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } }
      ]
    );
    state_0.data = new ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    };
  }
  _blockTimeLt_0(context, partialProofData, time_0) {
    return _descriptor_4.fromValue(queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_11.toValue(2n),
                alignment: _descriptor_11.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_1.toValue(time_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        "lt",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value);
  }
  _persistentHash_0(value_0) {
    const result_0 = persistentHash2(_descriptor_7, value_0);
    return result_0;
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = persistentCommit2(
      _descriptor_0,
      value_0,
      rand_0
    );
    return result_0;
  }
  _localSecretKey_0(context, partialProofData) {
    const witnessContext_0 = createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.localSecretKey(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      typeError(
        "localSecretKey",
        "return value",
        "disclosure-ledger.compact line 66 char 1",
        "Bytes<32>",
        result_0
      );
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _draftReport_0(context, partialProofData) {
    const witnessContext_0 = createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.draftReport(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof result_0 === "object" && result_0.digest.buffer instanceof ArrayBuffer && result_0.digest.BYTES_PER_ELEMENT === 1 && result_0.digest.length === 32 && result_0.salt.buffer instanceof ArrayBuffer && result_0.salt.BYTES_PER_ELEMENT === 1 && result_0.salt.length === 32)) {
      typeError(
        "draftReport",
        "return value",
        "disclosure-ledger.compact line 68 char 1",
        "struct ReportOpening<digest: Bytes<32>, salt: Bytes<32>>",
        result_0
      );
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_6.toValue(result_0),
      alignment: _descriptor_6.alignment()
    });
    return result_0;
  }
  _reportOpening_0(context, partialProofData, commitment_0) {
    const witnessContext_0 = createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.reportOpening(
      witnessContext_0,
      commitment_0
    );
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof result_0 === "object" && result_0.digest.buffer instanceof ArrayBuffer && result_0.digest.BYTES_PER_ELEMENT === 1 && result_0.digest.length === 32 && result_0.salt.buffer instanceof ArrayBuffer && result_0.salt.BYTES_PER_ELEMENT === 1 && result_0.salt.length === 32)) {
      typeError(
        "reportOpening",
        "return value",
        "disclosure-ledger.compact line 70 char 1",
        "struct ReportOpening<digest: Bytes<32>, salt: Bytes<32>>",
        result_0
      );
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_6.toValue(result_0),
      alignment: _descriptor_6.alignment()
    });
    return result_0;
  }
  _reportCommitment_0(digest_0, salt_0) {
    return this._persistentCommit_0(digest_0, salt_0);
  }
  _ownerKey_0(sk_0, commitment_0) {
    return this._persistentHash_0([
      new Uint8Array([100, 105, 115, 99, 108, 111, 115, 117, 114, 101, 45, 108, 101, 100, 103, 101, 114, 58, 111, 119, 110, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0]),
      commitment_0,
      sk_0
    ]);
  }
  _ownedEntry_0(context, partialProofData, commitment_0) {
    assert(
      _descriptor_4.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_11.toValue(0n),
                  alignment: _descriptor_11.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: StateValue.newCell({
              value: _descriptor_0.toValue(commitment_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "Unknown commitment"
    );
    const entry_0 = _descriptor_3.fromValue(queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_11.toValue(0n),
                alignment: _descriptor_11.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(commitment_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    assert(
      this._equal_0(
        entry_0.owner,
        this._ownerKey_0(
          this._localSecretKey_0(
            context,
            partialProofData
          ),
          commitment_0
        )
      ),
      "Only the researcher who committed this report can change it"
    );
    return entry_0;
  }
  _withStatus_0(entry_0, status_0, digest_0) {
    return {
      owner: entry_0.owner,
      ordinal: entry_0.ordinal,
      notAfter: entry_0.notAfter,
      status: status_0,
      digest: digest_0
    };
  }
  _commitReport_0(context, partialProofData, notAfter_0) {
    const deadline_0 = notAfter_0;
    assert(
      this._blockTimeLt_0(
        context,
        partialProofData,
        deadline_0
      ),
      "Deadline has already passed"
    );
    const draft_0 = this._draftReport_0(context, partialProofData);
    const commitment_0 = this._reportCommitment_0(draft_0.digest, draft_0.salt);
    assert(
      !_descriptor_4.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_11.toValue(0n),
                  alignment: _descriptor_11.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: StateValue.newCell({
              value: _descriptor_0.toValue(commitment_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "This report is already committed"
    );
    const tmp_0 = 1n;
    queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_11.toValue(1n),
                alignment: _descriptor_11.alignment()
              }
            }
          ]
        } },
        { addi: { immediate: parseInt(valueToBigInt(
          {
            value: _descriptor_5.toValue(tmp_0),
            alignment: _descriptor_5.alignment()
          }.value
        )) } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_1 = {
      owner: this._ownerKey_0(
        this._localSecretKey_0(
          context,
          partialProofData
        ),
        commitment_0
      ),
      ordinal: _descriptor_1.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_11.toValue(1n),
                  alignment: _descriptor_11.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      notAfter: deadline_0,
      status: 0,
      digest: new Uint8Array(32)
    };
    queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_11.toValue(0n),
                alignment: _descriptor_11.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_0.toValue(commitment_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_3.toValue(tmp_1),
            alignment: _descriptor_3.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return commitment_0;
  }
  _proveMatch_0(context, partialProofData, commitment_0, vendorDigest_0) {
    const c_0 = commitment_0;
    const entry_0 = this._ownedEntry_0(context, partialProofData, c_0);
    assert(
      entry_0.status === 0,
      "Report is not in the committed state"
    );
    const opening_0 = this._reportOpening_0(context, partialProofData, c_0);
    assert(
      this._equal_1(
        this._reportCommitment_0(
          opening_0.digest,
          opening_0.salt
        ),
        c_0
      ),
      "Private opening does not match the commitment"
    );
    assert(
      this._equal_2(opening_0.digest, vendorDigest_0),
      "Committed report does not match the vendor-supplied digest"
    );
    const tmp_0 = this._withStatus_0(entry_0, 1, vendorDigest_0);
    queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_11.toValue(0n),
                alignment: _descriptor_11.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_0.toValue(c_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_3.toValue(tmp_0),
            alignment: _descriptor_3.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _markResolved_0(context, partialProofData, commitment_0) {
    const c_0 = commitment_0;
    const entry_0 = this._ownedEntry_0(context, partialProofData, c_0);
    assert(
      entry_0.status === 1,
      "Only a disclosed report can be resolved"
    );
    const tmp_0 = this._withStatus_0(entry_0, 2, entry_0.digest);
    queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_11.toValue(0n),
                alignment: _descriptor_11.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_0.toValue(c_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_3.toValue(tmp_0),
            alignment: _descriptor_3.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _withdraw_0(context, partialProofData, commitment_0) {
    const c_0 = commitment_0;
    const entry_0 = this._ownedEntry_0(context, partialProofData, c_0);
    assert(
      entry_0.status === 0,
      "Only a committed report can be withdrawn"
    );
    const tmp_0 = this._withStatus_0(entry_0, 3, entry_0.digest);
    queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_11.toValue(0n),
                alignment: _descriptor_11.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: StateValue.newCell({
            value: _descriptor_0.toValue(c_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: StateValue.newCell({
            value: _descriptor_3.toValue(tmp_0),
            alignment: _descriptor_3.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
};
function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof StateValue ? new ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new QueryContext(chargedState, dummyContractAddress()),
    costModel: CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: void 0,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    entries: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_11.toValue(0n),
                    alignment: _descriptor_11.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: StateValue.newCell({
                value: _descriptor_1.toValue(0n),
                alignment: _descriptor_1.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_11.toValue(0n),
                    alignment: _descriptor_11.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          typeError(
            "member",
            "argument 1",
            "disclosure-ledger.compact line 60 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_4.fromValue(queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_11.toValue(0n),
                    alignment: _descriptor_11.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          typeError(
            "lookup",
            "argument 1",
            "disclosure-ledger.compact line 60 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_3.fromValue(queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_11.toValue(0n),
                    alignment: _descriptor_11.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(key_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_3.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get entryCount() {
      return _descriptor_1.fromValue(queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_11.toValue(1n),
                  alignment: _descriptor_11.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value);
    }
  };
}
var _emptyContext = {
  currentQueryContext: new QueryContext(new ContractState().data, dummyContractAddress())
};
var _dummyContract = new Contract({
  localSecretKey: (...args) => void 0,
  draftReport: (...args) => void 0,
  reportOpening: (...args) => void 0
});
var pureCircuits = {
  reportCommitment: (...args_0) => {
    if (args_0.length !== 2) {
      throw new CompactError(`reportCommitment: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const digest_0 = args_0[0];
    const salt_0 = args_0[1];
    if (!(digest_0.buffer instanceof ArrayBuffer && digest_0.BYTES_PER_ELEMENT === 1 && digest_0.length === 32)) {
      typeError(
        "reportCommitment",
        "argument 1",
        "disclosure-ledger.compact line 74 char 1",
        "Bytes<32>",
        digest_0
      );
    }
    if (!(salt_0.buffer instanceof ArrayBuffer && salt_0.BYTES_PER_ELEMENT === 1 && salt_0.length === 32)) {
      typeError(
        "reportCommitment",
        "argument 2",
        "disclosure-ledger.compact line 74 char 1",
        "Bytes<32>",
        salt_0
      );
    }
    return _dummyContract._reportCommitment_0(digest_0, salt_0);
  },
  ownerKey: (...args_0) => {
    if (args_0.length !== 2) {
      throw new CompactError(`ownerKey: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    const commitment_0 = args_0[1];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      typeError(
        "ownerKey",
        "argument 1",
        "disclosure-ledger.compact line 78 char 1",
        "Bytes<32>",
        sk_0
      );
    }
    if (!(commitment_0.buffer instanceof ArrayBuffer && commitment_0.BYTES_PER_ELEMENT === 1 && commitment_0.length === 32)) {
      typeError(
        "ownerKey",
        "argument 2",
        "disclosure-ledger.compact line 78 char 1",
        "Bytes<32>",
        commitment_0
      );
    }
    return _dummyContract._ownerKey_0(sk_0, commitment_0);
  }
};

// ../contract/dist/bytes.js
var toHex2 = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
var randomBytes = (length) => {
  const out = new Uint8Array(length);
  globalThis.crypto.getRandomValues(out);
  return out;
};
var isZero = (bytes) => bytes.every((b) => b === 0);

// ../contract/dist/witnesses.js
var createPrivateState = (secretKey) => ({
  secretKey,
  draft: null,
  reports: {}
});
var withDraft = (state, draft) => ({ ...state, draft });
var witnesses = {
  localSecretKey: ({ privateState }) => [
    privateState,
    privateState.secretKey
  ],
  /*
   * Hands the staged draft to the circuit and, in the same step, files its
   * opening under the commitment it is about to produce. The new private state
   * is only kept if the transaction succeeds, so a failed commit leaves the
   * draft in place.
   */
  draftReport: ({ privateState }) => {
    const draft = privateState.draft;
    if (draft === null) {
      throw new Error("No draft report in private state: stage one with withDraft()");
    }
    const commitment = toHex2(pureCircuits.reportCommitment(draft.digest, draft.salt));
    return [
      {
        ...privateState,
        draft: null,
        reports: { ...privateState.reports, [commitment]: draft }
      },
      draft
    ];
  },
  reportOpening: ({ privateState }, commitment) => {
    const opening = privateState.reports[toHex2(commitment)];
    if (opening === void 0) {
      throw new Error(`No private opening for commitment ${toHex2(commitment)}`);
    }
    return [privateState, opening];
  }
};

// ../contract/dist/report.js
var sha256 = async (data) => {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
  const hash = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return new Uint8Array(hash);
};
var prepareReport = async (report, salt = randomBytes(32)) => ({ digest: await sha256(report), salt });
var commitmentOf = (opening) => pureCircuits.reportCommitment(opening.digest, opening.salt);
var verifyOpening = (state, opening) => {
  const commitment = commitmentOf(opening);
  if (!state.entries.member(commitment)) {
    return { found: false, commitment };
  }
  const entry = state.entries.lookup(commitment);
  return {
    found: true,
    commitment,
    ordinal: entry.ordinal,
    notAfter: entry.notAfter,
    status: entry.status,
    publicDigest: isZero(entry.digest) ? null : entry.digest
  };
};
var earliestCommitment = (state, openings) => {
  let best = -1;
  let bestOrdinal = 0n;
  openings.forEach((opening, i) => {
    const v = verifyOpening(state, opening);
    if (!v.found || v.status === Status.withdrawn)
      return;
    if (best === -1 || v.ordinal < bestOrdinal) {
      best = i;
      bestOrdinal = v.ordinal;
    }
  });
  return best;
};

// ../contract/dist/simulator.js
var nowSeconds = () => BigInt(Math.floor(Date.now() / 1e3));
var DisclosureLedgerSimulator = class {
  contract;
  circuitContext;
  wallets = /* @__PURE__ */ new Map();
  currentUser;
  constructor(user = "alice", secretKey = randomBytes(32), blockTime = nowSeconds()) {
    this.contract = new Contract(witnesses);
    const { currentPrivateState, currentContractState, currentZswapLocalState } = this.contract.initialState(createConstructorContext(createPrivateState(secretKey), "0".repeat(64)));
    this.circuitContext = createCircuitContext(sampleContractAddress(), currentZswapLocalState, currentContractState, currentPrivateState);
    this.currentUser = user;
    this.setBlockTime(blockTime);
  }
  // ---- users and private state -------------------------------------------
  get user() {
    return this.currentUser;
  }
  /** Switch to another researcher, creating their private state on first use. */
  as(user, secretKey) {
    if (user === this.currentUser)
      return this;
    this.wallets.set(this.currentUser, this.circuitContext.currentPrivateState);
    const next = this.wallets.get(user) ?? createPrivateState(secretKey ?? randomBytes(32));
    this.circuitContext = { ...this.circuitContext, currentPrivateState: next };
    this.currentUser = user;
    return this;
  }
  getPrivateState() {
    return this.circuitContext.currentPrivateState;
  }
  /** Replace the current user's private state (tests use it to simulate tampering). */
  setPrivateState(state) {
    this.circuitContext = { ...this.circuitContext, currentPrivateState: state };
    return this;
  }
  /** Stage a report in the current user's private state. */
  stage(opening) {
    this.circuitContext = {
      ...this.circuitContext,
      currentPrivateState: withDraft(this.circuitContext.currentPrivateState, opening)
    };
    return this;
  }
  // ---- chain environment --------------------------------------------------
  /** Set the block time (UNIX seconds) that blockTimeLt() is checked against. */
  setBlockTime(seconds) {
    const qc = this.circuitContext.currentQueryContext;
    qc.block = { ...qc.block, secondsSinceEpoch: seconds };
    return this;
  }
  getBlockTime() {
    return this.circuitContext.currentQueryContext.block.secondsSinceEpoch;
  }
  getLedger() {
    return ledger(this.circuitContext.currentQueryContext.state);
  }
  getEntry(commitment) {
    return this.getLedger().entries.lookup(commitment);
  }
  // ---- circuits -----------------------------------------------------------
  commitReport(notAfter) {
    const time = this.getBlockTime();
    const { result, context } = this.contract.impureCircuits.commitReport(this.circuitContext, notAfter);
    this.circuitContext = context;
    this.setBlockTime(time);
    return result;
  }
  proveMatch(commitment, vendorDigest) {
    return this.run((ctx) => this.contract.impureCircuits.proveMatch(ctx, commitment, vendorDigest).context);
  }
  markResolved(commitment) {
    return this.run((ctx) => this.contract.impureCircuits.markResolved(ctx, commitment).context);
  }
  withdraw(commitment) {
    return this.run((ctx) => this.contract.impureCircuits.withdraw(ctx, commitment).context);
  }
  ownerKey(commitment) {
    return this.contract.circuits.ownerKey(this.circuitContext, this.getPrivateState().secretKey, commitment).result;
  }
  run(step) {
    const time = this.getBlockTime();
    this.circuitContext = step(this.circuitContext);
    this.setBlockTime(time);
    return this.getLedger();
  }
};

// src/main.ts
var $ = (id) => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing #${id}`);
  return el;
};
var esc = (s) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
var short = (b, n = 12) => `${toHex2(b).slice(0, n)}\u2026`;
var when = (s) => new Date(Number(s) * 1e3).toISOString().replace("T", " ").replace(".000Z", "Z");
var statusName = (s) => Status[s] ?? String(s);
var DEFAULT_ALICE = "Vault.withdraw() is re-entrant: the balance is zeroed after the external call, so a malicious receiver can withdraw repeatedly.";
var DEFAULT_BOB = "Re-entrancy in Vault withdraw (independent finding).";
var fresh = (aliceText = DEFAULT_ALICE, bobText = DEFAULT_BOB) => {
  const t0 = BigInt(Math.floor(Date.now() / 1e3));
  const sim = new DisclosureLedgerSimulator("alice", void 0, t0);
  return {
    sim,
    t0,
    views: { alice: sim.getPrivateState() },
    aliceText,
    bobText,
    done: /* @__PURE__ */ new Set(),
    log: [],
    results: {}
  };
};
var S = fresh();
var remember = () => {
  S.views[S.sim.user] = S.sim.getPrivateState();
};
var call = (actor, label, fn) => {
  try {
    const detail = fn();
    S.log.unshift({ actor, call: label, ok: true, detail });
    S.lastError = void 0;
    return true;
  } catch (e) {
    const msg = e.message;
    S.log.unshift({ actor, call: label, ok: false, detail: `rejected: ${msg}` });
    S.lastError = msg;
    return false;
  } finally {
    remember();
  }
};
var story = [
  {
    id: "commit-alice",
    actor: "Alice",
    title: "Commit the report privately",
    explain: "sha256(report) and a random salt go into private state. commitReport(notAfter) publishes only the commitment, an unlinkable owner key, an ordinal and the deadline.",
    needs: [],
    run: async () => {
      S.alice = await prepareReport(S.aliceText);
      const sim = S.sim.as("alice");
      const notAfter = sim.getBlockTime() + 600n;
      call("Alice", `commitReport(notAfter = ${when(notAfter)})`, () => {
        S.ca = sim.stage(S.alice).commitReport(notAfter);
        return `commitment ${short(S.ca)} is entry #${sim.getEntry(S.ca).ordinal}`;
      });
      S.highlight = S.ca && toHex2(S.ca);
    }
  },
  {
    id: "commit-bob",
    actor: "Bob",
    title: "One hour later, Bob commits the same bug",
    explain: "Bob has his own secret key and his own wording. On the ledger the two entries look unrelated: nobody can tell they describe the same bug, or who made them.",
    needs: ["commit-alice"],
    run: async () => {
      S.bob = await prepareReport(S.bobText);
      const sim = S.sim.as("bob");
      sim.setBlockTime(S.t0 + 3600n);
      const notAfter = sim.getBlockTime() + 600n;
      call("Bob", `commitReport(notAfter = ${when(notAfter)})`, () => {
        S.cb = sim.stage(S.bob).commitReport(notAfter);
        return `commitment ${short(S.cb)} is entry #${sim.getEntry(S.cb).ordinal}`;
      });
      S.highlight = S.cb && toHex2(S.cb);
    }
  },
  {
    id: "vendor-verify",
    actor: "Vendor",
    title: "Vendor checks priority, off-chain",
    explain: "Bob reported first, so the vendor says 'duplicate'. Alice privately sends the vendor her report and salt. The vendor hashes the report itself, recomputes the commitment and reads the ledger. No transaction.",
    needs: ["commit-bob"],
    run: async () => {
      const before = S.sim.getLedger().entryCount;
      const digest = await sha256(S.aliceText);
      const opening = { digest, salt: S.alice.salt };
      const v = verifyOpening(S.sim.getLedger(), opening);
      const first = earliestCommitment(S.sim.getLedger(), [S.bob, opening]);
      S.vendor = {
        digest,
        commitment: v.commitment,
        found: v.found,
        ordinal: v.found ? v.ordinal : void 0,
        notAfter: v.found ? v.notAfter : void 0,
        status: v.found ? v.status : void 0,
        earliest: first === 1 ? "Alice" : first === 0 ? "Bob" : "none",
        entriesBefore: before,
        entriesAfter: S.sim.getLedger().entryCount
      };
      S.log.unshift({
        actor: "Vendor",
        call: "verifyOpening(report, salt)  [local computation, not a circuit call]",
        ok: v.found,
        detail: v.found ? `found entry #${v.ordinal}, on chain before ${when(v.notAfter)}; earliest of the two = ${S.vendor.earliest}` : "no such commitment on the ledger"
      });
      S.highlight = toHex2(v.commitment);
    }
  },
  {
    id: "prove-match",
    actor: "Alice",
    title: "Disclose selectively: proveMatch",
    explain: "The vendor publishes sha256 of the report. Alice's circuit checks, against her private opening, that her entry opens to exactly that digest. The salt and the report stay private.",
    needs: ["vendor-verify"],
    run: async () => {
      const sim = S.sim.as("alice");
      sim.setBlockTime(S.t0 + 86400n);
      const digest = S.vendor.digest;
      call("Alice", `proveMatch(${short(S.ca, 8)}, vendorDigest = ${short(digest, 8)})`, () => {
        sim.proveMatch(S.ca, digest);
        return `entry #${sim.getEntry(S.ca).ordinal} is now ${statusName(sim.getEntry(S.ca).status)}`;
      });
      S.highlight = toHex2(S.ca);
    }
  },
  {
    id: "bob-tamper",
    actor: "Bob",
    title: "Bob tries to close Alice's entry",
    explain: "Owner-only circuits re-derive the owner key from the caller's secret key inside the circuit. Bob's key gives a different owner key, so the assert fails.",
    needs: ["prove-match"],
    run: async () => {
      const sim = S.sim.as("bob");
      call("Bob", `markResolved(${short(S.ca, 8)})`, () => {
        sim.markResolved(S.ca);
        return "resolved (this should not happen)";
      });
      S.highlight = toHex2(S.ca);
    }
  },
  {
    id: "resolve",
    actor: "Alice",
    title: "Fixed and paid: Alice closes the entry",
    explain: "markResolved moves Alice's entry from disclosed to resolved. Only she can do it.",
    needs: ["prove-match"],
    run: async () => {
      const sim = S.sim.as("alice");
      call("Alice", `markResolved(${short(S.ca, 8)})`, () => {
        sim.markResolved(S.ca);
        return `entry #${sim.getEntry(S.ca).ordinal} is now ${statusName(sim.getEntry(S.ca).status)}`;
      });
      S.highlight = toHex2(S.ca);
    }
  }
];
var attacks = [
  {
    id: "x-wrong-digest",
    actor: "Bob",
    title: "Bob claims his entry matches Alice's digest",
    explain: "proveMatch(Bob's entry, Alice's digest): his private opening has a different digest.",
    needs: ["vendor-verify"],
    run: async () => {
      const sim = S.sim.as("bob");
      call("Bob", `proveMatch(${short(S.cb, 8)}, vendorDigest = ${short(S.vendor.digest, 8)})`, () => {
        sim.proveMatch(S.cb, S.vendor.digest);
        return "disclosed (this should not happen)";
      });
      S.highlight = toHex2(S.cb);
    }
  },
  {
    id: "x-late-commit",
    actor: "Bob",
    title: "Bob back-dates a new commitment",
    explain: "commitReport with notAfter one second in the past: blockTimeLt(notAfter) fails.",
    needs: ["commit-alice"],
    run: async () => {
      const sim = S.sim.as("bob");
      const saved = sim.getPrivateState();
      const draft = await prepareReport("A back-dated claim");
      const notAfter = sim.getBlockTime() - 1n;
      call("Bob", `commitReport(notAfter = ${when(notAfter)})`, () => {
        sim.stage(draft).commitReport(notAfter);
        return "committed (this should not happen)";
      });
      sim.setPrivateState(saved);
      remember();
    }
  }
];
var allActions = [...story, ...attacks];
var byId = (id) => {
  const a = allActions.find((x) => x.id === id);
  if (!a) throw new Error(`unknown action ${id}`);
  return a;
};
var ready = (a) => !S.done.has(a.id) && a.needs.every((n) => S.done.has(n));
var busy = false;
var perform = async (id) => {
  const a = byId(id);
  if (!ready(a)) throw new Error(`action ${id} is not available yet`);
  if (id === "commit-alice") {
    S.aliceText = document.getElementById("alice-text")?.value ?? S.aliceText;
    S.bobText = document.getElementById("bob-text")?.value ?? S.bobText;
  }
  const logged = S.log.length;
  await a.run();
  if (S.log.length > logged) S.results[id] = S.log[0];
  S.done.add(id);
  render();
};
var renderSteps = () => {
  const cards = story.map((a, i) => {
    const state = S.done.has(a.id) ? "done" : ready(a) ? "ready" : "locked";
    return `<div class="step ${state}">
        <div class="num">${i + 1}</div>
        <div class="actor ${a.actor.toLowerCase()}">${a.actor}</div>
        <div class="title">${esc(a.title)}</div>
        <p>${esc(a.explain)}</p>
        <button data-action="${a.id}" ${state === "ready" && !busy ? "" : "disabled"}>${state === "done" ? "Done" : "Run"}</button>
      </div>`;
  }).join("");
  $("steps").innerHTML = `<div class="controls">
      <button id="play" ${busy ? "disabled" : ""}>Play the whole story</button>
      <button id="reset" ${busy ? "disabled" : ""}>Reset</button>
      <span class="clock">block time: ${when(S.sim.getBlockTime())}</span>
    </div><div class="cards">${cards}</div>`;
};
var renderPrivate = () => {
  const person = (name, key, text, opening) => {
    const ps = S.views[key];
    const reports = ps ? Object.entries(ps.reports) : [];
    const editable = !S.done.has("commit-alice");
    return `<div class="person ${key}">
      <h3>${name}</h3>
      <label>Report text <small>(stays local; only sha256 of it enters private state)</small></label>
      ${editable ? `<textarea id="${key}-text" rows="3">${esc(text)}</textarea>` : `<div class="report">${esc(text)}</div>`}
      <dl>
        <dt>secret key</dt><dd>${ps ? `${short(ps.secretKey, 8)} <i>(32 bytes, hidden)</i>` : "<i>created on first use</i>"}</dd>
        <dt>digest</dt><dd>${opening ? short(opening.digest, 24) : "<i>-</i>"}</dd>
        <dt>salt</dt><dd>${opening ? short(opening.salt, 24) : "<i>-</i>"}</dd>
        <dt>openings</dt><dd>${reports.length ? reports.map(([c]) => `commitment ${c.slice(0, 12)}\u2026`).join("<br>") : "<i>none</i>"}</dd>
      </dl>
    </div>`;
  };
  $("private").innerHTML = person("Alice", "alice", S.aliceText, S.alice) + person("Bob", "bob", S.bobText, S.bob);
};
var renderChain = () => {
  const ledger2 = S.sim.getLedger();
  const rows = [...ledger2.entries];
  rows.sort((a, b) => Number(a[1].ordinal - b[1].ordinal));
  const body = rows.length ? rows.map(([c, e]) => {
    const hex = toHex2(c);
    const zero = e.digest.every((x) => x === 0);
    return `<tr class="${S.highlight === hex ? "hl" : ""}">
            <td>#${e.ordinal}</td>
            <td><code>${hex.slice(0, 16)}\u2026</code></td>
            <td><code>${short(e.owner, 10)}</code></td>
            <td>${when(e.notAfter)}</td>
            <td><span class="status s-${statusName(e.status)}">${statusName(e.status)}</span></td>
            <td>${zero ? "<i>hidden</i>" : `<code>${short(e.digest, 10)}</code>`}</td>
          </tr>`;
  }).join("") : `<tr><td colspan="6" class="empty">no entries yet</td></tr>`;
  $("chain").innerHTML = `<table>
      <thead><tr><th>ordinal</th><th>commitment</th><th>owner key</th><th>committed before</th><th>status</th><th>digest</th></tr></thead>
      <tbody>${body}</tbody>
    </table>
    <p class="count">entryCount = ${ledger2.entryCount}. Report text, salts and secret keys appear nowhere in this table.</p>`;
  $("attacks").innerHTML = attacks.map((a) => {
    const state = S.done.has(a.id) ? "done" : ready(a) ? "ready" : "locked";
    const r = S.results[a.id];
    return `<div class="attack ${state}">
        <button data-action="${a.id}" ${state === "ready" && !busy ? "" : "disabled"}>${esc(a.title)}</button>
        <span>${esc(a.explain)}</span>
        ${r ? `<div class="result ${r.ok ? "ok" : "bad"}">${esc(r.detail)}</div>` : ""}
      </div>`;
  }).join("");
};
var renderVendor = () => {
  const v = S.vendor;
  if (!v) {
    $("vendor").innerHTML = `<p class="muted">The vendor has received two reports of the same bug.
      Bob's arrived first. Alice says she found it earlier. Step 3 shows how the vendor settles it
      without anything being published.</p>`;
    return;
  }
  $("vendor").innerHTML = `<dl class="prose">
      <dt>received from Alice</dt><dd>report text + salt, over a private channel</dd>
      <dt>sha256(report)</dt><dd><code>${short(v.digest, 24)}</code><br><small>any tool works: <code>sha256sum report.md</code></small></dd>
      <dt>recomputed commitment</dt><dd><code>${short(v.commitment, 24)}</code></dd>
      <dt>on the ledger?</dt><dd>${v.found ? `<b class="ok">yes: entry #${v.ordinal}, committed before ${when(v.notAfter)}</b>` : `<b class="bad">no</b>`}</dd>
      <dt>duplicate dispute</dt><dd><b>earliest valid commitment: ${v.earliest}</b> (lowest ordinal, withdrawn entries ignored)</dd>
      <dt>chain writes</dt><dd>none (entryCount ${v.entriesBefore} before, ${v.entriesAfter} after)</dd>
    </dl>`;
};
var renderLog = () => {
  $("log").innerHTML = S.log.map(
    (l) => `<li class="${l.ok ? "ok" : "bad"}"><span class="actor ${l.actor.toLowerCase()}">${l.actor}</span>
        <code>${esc(l.call)}</code> <span class="arrow">\u2192</span> ${esc(l.detail)}</li>`
  ).join("");
};
var render = () => {
  renderSteps();
  renderPrivate();
  renderChain();
  renderVendor();
  renderLog();
};
var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
document.addEventListener("click", (ev) => {
  const t = ev.target;
  if (!(t instanceof HTMLButtonElement) || t.disabled) return;
  if (t.dataset.action) {
    void perform(t.dataset.action);
  } else if (t.id === "reset") {
    S = fresh(S.aliceText, S.bobText);
    render();
  } else if (t.id === "play") {
    void (async () => {
      busy = true;
      render();
      try {
        for (const a of story) {
          if (S.done.has(a.id)) continue;
          await perform(a.id);
          await sleep(1200);
        }
      } finally {
        busy = false;
        render();
      }
    })();
  }
});
var expect = (cond, what) => {
  if (!cond) throw new Error(`selftest: ${what}`);
};
var selftest = async () => {
  const ids = [...story.map((a) => a.id)];
  for (const id of ids) await perform(id);
  const tamper = S.log.find((l) => l.call.startsWith("markResolved") && l.actor === "Bob");
  expect(!!tamper && !tamper.ok && tamper.detail.includes("Only the researcher"), "Bob's tamper must be rejected by the ownership assert");
  await perform("x-wrong-digest");
  expect(S.lastError?.includes("does not match the vendor-supplied digest") ?? false, "wrong digest must be rejected");
  await perform("x-late-commit");
  expect(S.lastError?.includes("Deadline has already passed") ?? false, "late commit must be rejected");
  const ledger2 = S.sim.getLedger();
  expect(ledger2.entryCount === 2n, `entryCount should be 2, got ${ledger2.entryCount}`);
  const ea = ledger2.entries.lookup(S.ca);
  const eb = ledger2.entries.lookup(S.cb);
  expect(ea.ordinal === 1n && eb.ordinal === 2n, "ordinals 1 and 2");
  expect(ea.status === Status.resolved, `Alice's entry should be resolved, is ${statusName(ea.status)}`);
  expect(eb.status === Status.committed, "Bob's entry should still be committed");
  expect(toHex2(ea.digest) === toHex2(await sha256(S.aliceText)), "published digest = sha256(Alice's report)");
  expect(eb.digest.every((x) => x === 0), "Bob's digest must stay hidden");
  expect(S.vendor?.earliest === "Alice" && S.vendor.entriesAfter === S.vendor.entriesBefore, "vendor check: Alice first, no writes");
  expect(Object.keys(S.views.bob?.reports ?? {}).length === 1, "Bob's failed transactions left his private state unchanged");
};
var start = async () => {
  render();
  const params = new URLSearchParams(location.search);
  try {
    if (params.has("selftest")) {
      await selftest();
      document.body.dataset.selftest = "pass";
      console.log("SELFTEST PASS");
    } else if (params.has("run")) {
      const n = Number(params.get("run"));
      for (const a of story.slice(0, n)) await perform(a.id);
    } else if (params.has("play")) {
      for (const id of (params.get("play") ?? "").split(",").filter(Boolean)) await perform(id);
    }
  } catch (e) {
    document.body.dataset.selftest = `fail: ${e.message}`;
    console.error("SELFTEST FAIL", e);
  }
  document.body.dataset.ready = "1";
};
void start();
//# sourceMappingURL=app.js.map
