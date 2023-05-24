(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-profile-picker"] = factory(require("vue"));
	else
		root["vue-profile-picker"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__7203__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 6077:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 5787:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isPrototypeOf = __webpack_require__(7976);

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw $TypeError('Incorrect invocation');
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 3013:
/***/ (function(module) {

// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';


/***/ }),

/***/ 260:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__(3013);
var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var hasOwn = __webpack_require__(2597);
var classof = __webpack_require__(648);
var tryToString = __webpack_require__(6330);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineBuiltInAccessor = __webpack_require__(7045);
var isPrototypeOf = __webpack_require__(7976);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var wellKnownSymbol = __webpack_require__(5112);
var uid = __webpack_require__(9711);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor = function (it) {
  var proto = getPrototypeOf(it);
  if (!isObject(proto)) return;
  var state = getInternalState(proto);
  return (state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineBuiltInAccessor(TypedArrayPrototype, TO_STRING_TAG, {
    configurable: true,
    get: function () {
      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
    }
  });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  getTypedArrayConstructor: getTypedArrayConstructor,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ 7745:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var lengthOfArrayLike = __webpack_require__(6244);

module.exports = function (Constructor, list) {
  var index = 0;
  var length = lengthOfArrayLike(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 3658:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(9781);
var isArray = __webpack_require__(3157);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 1843:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var lengthOfArrayLike = __webpack_require__(6244);

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
module.exports = function (O, C) {
  var len = lengthOfArrayLike(O);
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = O[len - k - 1];
  return A;
};


/***/ }),

/***/ 1572:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var lengthOfArrayLike = __webpack_require__(6244);
var toIntegerOrInfinity = __webpack_require__(9303);

var $RangeError = RangeError;

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
module.exports = function (O, C, index, value) {
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
  if (actualIndex >= len || actualIndex < 0) throw $RangeError('Incorrect index');
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
  return A;
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8544:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 7045:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var makeBuiltIn = __webpack_require__(6339);
var defineProperty = __webpack_require__(3070);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ 8052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var definePropertyModule = __webpack_require__(3070);
var makeBuiltIn = __webpack_require__(6339);
var defineGlobalProperty = __webpack_require__(3072);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 3072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 4154:
/***/ (function(module) {

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 7207:
/***/ (function(module) {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 3678:
/***/ (function(module) {

module.exports = {
  IndexSizeError: { s: 'INDEX_SIZE_ERR', c: 1, m: 1 },
  DOMStringSizeError: { s: 'DOMSTRING_SIZE_ERR', c: 2, m: 0 },
  HierarchyRequestError: { s: 'HIERARCHY_REQUEST_ERR', c: 3, m: 1 },
  WrongDocumentError: { s: 'WRONG_DOCUMENT_ERR', c: 4, m: 1 },
  InvalidCharacterError: { s: 'INVALID_CHARACTER_ERR', c: 5, m: 1 },
  NoDataAllowedError: { s: 'NO_DATA_ALLOWED_ERR', c: 6, m: 0 },
  NoModificationAllowedError: { s: 'NO_MODIFICATION_ALLOWED_ERR', c: 7, m: 1 },
  NotFoundError: { s: 'NOT_FOUND_ERR', c: 8, m: 1 },
  NotSupportedError: { s: 'NOT_SUPPORTED_ERR', c: 9, m: 1 },
  InUseAttributeError: { s: 'INUSE_ATTRIBUTE_ERR', c: 10, m: 1 },
  InvalidStateError: { s: 'INVALID_STATE_ERR', c: 11, m: 1 },
  SyntaxError: { s: 'SYNTAX_ERR', c: 12, m: 1 },
  InvalidModificationError: { s: 'INVALID_MODIFICATION_ERR', c: 13, m: 1 },
  NamespaceError: { s: 'NAMESPACE_ERR', c: 14, m: 1 },
  InvalidAccessError: { s: 'INVALID_ACCESS_ERR', c: 15, m: 1 },
  ValidationError: { s: 'VALIDATION_ERR', c: 16, m: 0 },
  TypeMismatchError: { s: 'TYPE_MISMATCH_ERR', c: 17, m: 1 },
  SecurityError: { s: 'SECURITY_ERR', c: 18, m: 1 },
  NetworkError: { s: 'NETWORK_ERR', c: 19, m: 1 },
  AbortError: { s: 'ABORT_ERR', c: 20, m: 1 },
  URLMismatchError: { s: 'URL_MISMATCH_ERR', c: 21, m: 1 },
  QuotaExceededError: { s: 'QUOTA_EXCEEDED_ERR', c: 22, m: 1 },
  TimeoutError: { s: 'TIMEOUT_ERR', c: 23, m: 1 },
  InvalidNodeTypeError: { s: 'INVALID_NODE_TYPE_ERR', c: 24, m: 1 },
  DataCloneError: { s: 'DATA_CLONE_ERR', c: 25, m: 1 }
};


/***/ }),

/***/ 8113:
/***/ (function(module) {

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 1060:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineGlobalProperty = __webpack_require__(3072);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 5668:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var aCallable = __webpack_require__(9662);

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ 1702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);
var isNullOrUndefined = __webpack_require__(8554);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || this || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 9587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(4811);
var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 3157:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(4326);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ 4067:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(648);

module.exports = function (it) {
  var klass = classof(it);
  return klass == 'BigInt64Array' || klass == 'BigUint64Array';
};


/***/ }),

/***/ 614:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var $documentAll = __webpack_require__(4154);

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 8554:
/***/ (function(module) {

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var $documentAll = __webpack_require__(4154);

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var DESCRIPTORS = __webpack_require__(9781);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 4758:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 6277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(1340);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 9518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var isCallable = __webpack_require__(614);
var toObject = __webpack_require__(7908);
var sharedKey = __webpack_require__(6200);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(5668);
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 4488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isNullOrUndefined = __webpack_require__(8554);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var defineGlobalProperty = __webpack_require__(3072);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.30.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.30.2/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 6293:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 4599:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);

var $TypeError = TypeError;

// `ToBigInt` abstract operation
// https://tc39.es/ecma262/#sec-tobigint
module.exports = function (argument) {
  var prim = toPrimitive(argument, 'number');
  if (typeof prim == 'number') throw $TypeError("Can't convert number to bigint");
  // eslint-disable-next-line es/no-bigint -- safe
  return BigInt(prim);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trunc = __webpack_require__(4758);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(4488);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(648);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 6330:
/***/ (function(module) {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(6293);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 4811:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(6293);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 7658:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var toObject = __webpack_require__(7908);
var lengthOfArrayLike = __webpack_require__(6244);
var setArrayLength = __webpack_require__(3658);
var doesNotExceedSafeInteger = __webpack_require__(7207);
var fails = __webpack_require__(7293);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 and Safari <= 15.4, FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ 1439:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var arrayToReversed = __webpack_require__(1843);
var ArrayBufferViewCore = __webpack_require__(260);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;

// `%TypedArray%.prototype.toReversed` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
exportTypedArrayMethod('toReversed', function toReversed() {
  return arrayToReversed(aTypedArray(this), getTypedArrayConstructor(this));
});


/***/ }),

/***/ 7585:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(260);
var uncurryThis = __webpack_require__(1702);
var aCallable = __webpack_require__(9662);
var arrayFromConstructorAndList = __webpack_require__(7745);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var sort = uncurryThis(ArrayBufferViewCore.TypedArrayPrototype.sort);

// `%TypedArray%.prototype.toSorted` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSorted
exportTypedArrayMethod('toSorted', function toSorted(compareFn) {
  if (compareFn !== undefined) aCallable(compareFn);
  var O = aTypedArray(this);
  var A = arrayFromConstructorAndList(getTypedArrayConstructor(O), O);
  return sort(A, compareFn);
});


/***/ }),

/***/ 5315:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var arrayWith = __webpack_require__(1572);
var ArrayBufferViewCore = __webpack_require__(260);
var isBigIntArray = __webpack_require__(4067);
var toIntegerOrInfinity = __webpack_require__(9303);
var toBigInt = __webpack_require__(4599);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var PROPER_ORDER = !!function () {
  try {
    // eslint-disable-next-line no-throw-literal, es/no-typed-arrays, es/no-array-prototype-with -- required for testing
    new Int8Array(1)['with'](2, { valueOf: function () { throw 8; } });
  } catch (error) {
    // some early implementations, like WebKit, does not follow the final semantic
    // https://github.com/tc39/proposal-change-array-by-copy/pull/86
    return error === 8;
  }
}();

// `%TypedArray%.prototype.with` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
exportTypedArrayMethod('with', { 'with': function (index, value) {
  var O = aTypedArray(this);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
  return arrayWith(O, getTypedArrayConstructor(O), relativeIndex, actualValue);
} }['with'], !PROPER_ORDER);


/***/ }),

/***/ 3767:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(1439);


/***/ }),

/***/ 8585:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(7585);


/***/ }),

/***/ 8696:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(5315);


/***/ }),

/***/ 2801:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var createPropertyDescriptor = __webpack_require__(9114);
var defineProperty = (__webpack_require__(3070).f);
var hasOwn = __webpack_require__(2597);
var anInstance = __webpack_require__(5787);
var inheritIfRequired = __webpack_require__(9587);
var normalizeStringArgument = __webpack_require__(6277);
var DOMExceptionConstants = __webpack_require__(3678);
var clearErrorStack = __webpack_require__(1060);
var DESCRIPTORS = __webpack_require__(9781);
var IS_PURE = __webpack_require__(1913);

var DOM_EXCEPTION = 'DOMException';
var Error = getBuiltIn('Error');
var NativeDOMException = getBuiltIn(DOM_EXCEPTION);

var $DOMException = function DOMException() {
  anInstance(this, DOMExceptionPrototype);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0]);
  var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error');
  var that = new NativeDOMException(message, name);
  var error = Error(message);
  error.name = DOM_EXCEPTION;
  defineProperty(that, 'stack', createPropertyDescriptor(1, clearErrorStack(error.stack, 1)));
  inheritIfRequired(that, this, $DOMException);
  return that;
};

var DOMExceptionPrototype = $DOMException.prototype = NativeDOMException.prototype;

var ERROR_HAS_STACK = 'stack' in Error(DOM_EXCEPTION);
var DOM_EXCEPTION_HAS_STACK = 'stack' in new NativeDOMException(1, 2);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var descriptor = NativeDOMException && DESCRIPTORS && Object.getOwnPropertyDescriptor(global, DOM_EXCEPTION);

// Bun ~ 0.1.1 DOMException have incorrect descriptor and we can't redefine it
// https://github.com/Jarred-Sumner/bun/issues/399
var BUGGY_DESCRIPTOR = !!descriptor && !(descriptor.writable && descriptor.configurable);

var FORCED_CONSTRUCTOR = ERROR_HAS_STACK && !BUGGY_DESCRIPTOR && !DOM_EXCEPTION_HAS_STACK;

// `DOMException` constructor patch for `.stack` where it's required
// https://webidl.spec.whatwg.org/#es-DOMException-specialness
$({ global: true, constructor: true, forced: IS_PURE || FORCED_CONSTRUCTOR }, { // TODO: fix export logic
  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
});

var PolyfilledDOMException = getBuiltIn(DOM_EXCEPTION);
var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;

if (PolyfilledDOMExceptionPrototype.constructor !== PolyfilledDOMException) {
  if (!IS_PURE) {
    defineProperty(PolyfilledDOMExceptionPrototype, 'constructor', createPropertyDescriptor(1, PolyfilledDOMException));
  }

  for (var key in DOMExceptionConstants) if (hasOwn(DOMExceptionConstants, key)) {
    var constant = DOMExceptionConstants[key];
    var constantName = constant.s;
    if (!hasOwn(PolyfilledDOMException, constantName)) {
      defineProperty(PolyfilledDOMException, constantName, createPropertyDescriptor(6, constant.c));
    }
  }
}


/***/ }),

/***/ 7203:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__7203__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/VueProfilePicker.vue?vue&type=template&id=4665ae9b&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('label', {
    style: this.disabled == false ? 'cursor:pointer' : ''
  }, [_vm._t("default"), _c('input', {
    attrs: {
      "disabled": this.disabled,
      "type": "file",
      "hidden": "",
      "name": "profile",
      "accept": "image/*"
    },
    on: {
      "change": _vm.onFileSelected
    }
  })], 2), _c('transition', [_vm.show ? _c('div', {
    staticClass: "mod"
  }, [_c('div', {
    staticClass: "mod-content"
  }, [_c('section', {
    staticClass: "mod-header"
  }, [_c('p', {
    staticClass: "mod-header-title",
    domProps: {
      "textContent": _vm._s(this.title)
    }
  }), _c('span', {
    staticClass: "close",
    on: {
      "click": function ($event) {
        _vm.show = false;
      }
    }
  }, [_vm._v("×")])]), this.img != '' ? _c('section', {}, [_c('cropper', {
    ref: "cropper",
    staticClass: "cropper",
    attrs: {
      "imageRestriction": "fill-area",
      "stencil-props": {
        aspectRatio: 1 / 1
      },
      "image-restriction": "fit-area",
      "default-boundaries": "fill",
      "image-class": "cropper__image",
      "resize-image": {
        adjustStencil: true
      },
      "src": _vm.img
    },
    on: {
      "change": _vm.change
    }
  })], 1) : _vm._e(), _c('section', {
    staticClass: "mod-buttons"
  }, [_c('button', {
    staticClass: "mod-button confirm",
    domProps: {
      "textContent": _vm._s(this.confirm)
    },
    on: {
      "click": function ($event) {
        _vm.$emit('change', _vm.final_image);
        _vm.show = false;
      }
    }
  })])])]) : _vm._e()])], 1);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-exception.stack.js
var web_dom_exception_stack = __webpack_require__(2801);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.typed-array.to-reversed.js
var esnext_typed_array_to_reversed = __webpack_require__(3767);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.typed-array.to-sorted.js
var esnext_typed_array_to_sorted = __webpack_require__(8585);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.typed-array.with.js
var esnext_typed_array_with = __webpack_require__(8696);
// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(7203);
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);
;// CONCATENATED MODULE: ./node_modules/vue-advanced-cropper/dist/index.es.js






function e(t, e) {
  var i = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function (e) {
      return Object.getOwnPropertyDescriptor(t, e).enumerable;
    })), i.push.apply(i, n);
  }
  return i;
}
function i(t) {
  for (var i = 1; i < arguments.length; i++) {
    var s = null != arguments[i] ? arguments[i] : {};
    i % 2 ? e(Object(s), !0).forEach(function (e) {
      n(t, e, s[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(s)) : e(Object(s)).forEach(function (e) {
      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(s, e));
    });
  }
  return t;
}
function n(t, e, i) {
  return e in t ? Object.defineProperty(t, e, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = i, t;
}
function s(t, e) {
  if (null == t) return {};
  var i,
    n,
    s = function (t, e) {
      if (null == t) return {};
      var i,
        n,
        s = {},
        o = Object.keys(t);
      for (n = 0; n < o.length; n++) i = o[n], e.indexOf(i) >= 0 || (s[i] = t[i]);
      return s;
    }(t, e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    for (n = 0; n < o.length; n++) i = o[n], e.indexOf(i) >= 0 || Object.prototype.propertyIsEnumerable.call(t, i) && (s[i] = t[i]);
  }
  return s;
}
function o(t) {
  return function (t) {
    if (Array.isArray(t)) return r(t);
  }(t) || function (t) {
    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t);
  }(t) || function (t, e) {
    if (!t) return;
    if ("string" == typeof t) return r(t, e);
    var i = Object.prototype.toString.call(t).slice(8, -1);
    "Object" === i && t.constructor && (i = t.constructor.name);
    if ("Map" === i || "Set" === i) return Array.from(t);
    if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return r(t, e);
  }(t) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function r(t, e) {
  (null == e || e > t.length) && (e = t.length);
  for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i];
  return n;
}
var a,
  h,
  c,
  l = (a = function (t) {
    /*!
      Copyright (c) 2018 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */
    !function () {
      var e = {}.hasOwnProperty;
      function i() {
        for (var t = [], n = 0; n < arguments.length; n++) {
          var s = arguments[n];
          if (s) {
            var o = typeof s;
            if ("string" === o || "number" === o) t.push(s);else if (Array.isArray(s)) {
              if (s.length) {
                var r = i.apply(null, s);
                r && t.push(r);
              }
            } else if ("object" === o) if (s.toString === Object.prototype.toString) for (var a in s) e.call(s, a) && s[a] && t.push(a);else t.push(s.toString());
          }
        }
        return t.join(" ");
      }
      t.exports ? (i.default = i, t.exports = i) : window.classNames = i;
    }();
  }, a(c = {
    path: h,
    exports: {},
    require: function (t, e) {
      return function () {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == e && c.path);
    }
  }, c.exports), c.exports),
  d = function (t) {
    return function (e, i) {
      if (!e) return t;
      var n;
      "string" == typeof e ? n = e : i = e;
      var s = t;
      return n && (s += "__" + n), s + (i ? Object.keys(i).reduce(function (t, e) {
        var n = i[e];
        return n && (t += " " + ("boolean" == typeof n ? s + "--" + e : s + "--" + e + "_" + n)), t;
      }, "") : "");
    };
  };
function u(t, e, i) {
  var n, s, o, r, a;
  function h() {
    var c = Date.now() - r;
    c < e && c >= 0 ? n = setTimeout(h, e - c) : (n = null, i || (a = t.apply(o, s), o = s = null));
  }
  null == e && (e = 100);
  var c = function () {
    o = this, s = arguments, r = Date.now();
    var c = i && !n;
    return n || (n = setTimeout(h, e)), c && (a = t.apply(o, s), o = s = null), a;
  };
  return c.clear = function () {
    n && (clearTimeout(n), n = null);
  }, c.flush = function () {
    n && (a = t.apply(o, s), o = s = null, clearTimeout(n), n = null);
  }, c;
}
u.debounce = u;
var m = u,
  f = function () {
    return f = Object.assign || function (t) {
      for (var e, i = 1, n = arguments.length; i < n; i++) for (var s in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
      return t;
    }, f.apply(this, arguments);
  };
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function p(t, e) {
  var i, n;
  return t && e ? (i = "" + t + e[0].toUpperCase() + e.slice(1), n = t + "-" + e) : (i = t || e, n = t || e), {
    name: i,
    classname: n
  };
}
function g(t) {
  return /^blob:/.test(t);
}
function v(t) {
  return g(t) || function (t) {
    return /^data:/.test(t);
  }(t);
}
function b(t) {
  return !!(t && t.constructor && t.call && t.apply);
}
function w(t) {
  return void 0 === t;
}
function y(t) {
  return "object" == typeof t && null !== t;
}
function z(t, e, i) {
  var n = {};
  return y(t) ? (Object.keys(e).forEach(function (s) {
    w(t[s]) ? n[s] = e[s] : y(e[s]) ? y(t[s]) ? n[s] = z(t[s], e[s], i[s]) : n[s] = t[s] ? e[s] : i[s] : !0 === e[s] || !1 === e[s] ? n[s] = Boolean(t[s]) : n[s] = t[s];
  }), n) : t ? e : i;
}
function R(t) {
  var e = Number(t);
  return Number.isNaN(e) ? t : e;
}
function A(t) {
  return typeof ("number" == t || function (t) {
    return "object" == typeof t && null !== t;
  }(t) && "[object Number]" == toString.call(t)) && !S(t);
}
function S(t) {
  return t != t;
}
function x(t, e) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
var M = function (t, e) {
    void 0 === t && (t = {}), void 0 === e && (e = {}), this.type = "manipulateImage", this.move = t, this.scale = e;
  },
  C = function (t, e) {
    void 0 === e && (e = {}), this.type = "resize", this.directions = t, this.params = e;
  },
  E = function (t) {
    this.type = "move", this.directions = t;
  },
  W = function () {
    function t(t, e, i, n, s) {
      this.type = "drag", this.nativeEvent = t, this.position = i, this.previousPosition = n, this.element = e, this.anchor = s;
    }
    return t.prototype.shift = function () {
      var t = this,
        e = t.element,
        i = t.anchor,
        n = t.position,
        s = e.getBoundingClientRect(),
        o = s.left,
        r = s.top;
      return {
        left: n.left - o - i.left,
        top: n.top - r - i.top
      };
    }, t;
  }();
function T(t, e, i, n, s, o, r, a, h, c) {
  "boolean" != typeof r && (h = a, a = r, r = !1);
  const l = "function" == typeof i ? i.options : i;
  let d;
  if (t && t.render && (l.render = t.render, l.staticRenderFns = t.staticRenderFns, l._compiled = !0, s && (l.functional = !0)), n && (l._scopeId = n), o ? (d = function (t) {
    (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), e && e.call(this, h(t)), t && t._registeredComponents && t._registeredComponents.add(o);
  }, l._ssrRegister = d) : e && (d = r ? function (t) {
    e.call(this, c(t, this.$root.$options.shadowRoot));
  } : function (t) {
    e.call(this, a(t));
  }), d) if (l.functional) {
    const t = l.render;
    l.render = function (e, i) {
      return d.call(i), t(e, i);
    };
  } else {
    const t = l.beforeCreate;
    l.beforeCreate = t ? [].concat(t, d) : [d];
  }
  return i;
}
var O = T({
    render: function () {
      var t = this,
        e = t.$createElement;
      return (t._self._c || e)("div", {
        ref: "draggable",
        class: t.classname,
        on: {
          touchstart: t.onTouchStart,
          mousedown: t.onMouseDown,
          mouseover: t.onMouseOver,
          mouseleave: t.onMouseLeave
        }
      }, [t._t("default")], 2);
    },
    staticRenderFns: []
  }, undefined, {
    name: "DraggableElement",
    mixins: [{
      beforeMount: function () {
        window.addEventListener("mouseup", this.onMouseUp, {
          passive: !1
        }), window.addEventListener("mousemove", this.onMouseMove, {
          passive: !1
        }), window.addEventListener("touchmove", this.onTouchMove, {
          passive: !1
        }), window.addEventListener("touchend", this.onTouchEnd, {
          passive: !1
        });
      },
      beforeDestroy: function () {
        window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
      },
      mounted: function () {
        if (!this.$refs.draggable) throw new Error('You should add ref "draggable" to your root element to use draggable mixin');
        this.touches = [], this.hovered = !1;
      },
      methods: {
        onMouseOver: function () {
          this.hovered || (this.hovered = !0, this.$emit("enter"));
        },
        onMouseLeave: function () {
          this.hovered && !this.touches.length && (this.hovered = !1, this.$emit("leave"));
        },
        onTouchStart: function (t) {
          t.cancelable && !this.disabled && 1 === t.touches.length && (this.touches = o(t.touches), this.hovered || (this.$emit("enter"), this.hovered = !0), t.touches.length && this.initAnchor(this.touches.reduce(function (e, i) {
            return {
              clientX: e.clientX + i.clientX / t.touches.length,
              clientY: e.clientY + i.clientY / t.touches.length
            };
          }, {
            clientX: 0,
            clientY: 0
          })), t.preventDefault && t.preventDefault(), t.stopPropagation());
        },
        onTouchEnd: function () {
          this.processEnd();
        },
        onTouchMove: function (t) {
          this.touches.length && (this.processMove(t, t.touches), t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation());
        },
        onMouseDown: function (t) {
          if (!this.disabled && 0 === t.button) {
            var e = {
              fake: !0,
              clientX: t.clientX,
              clientY: t.clientY
            };
            this.touches = [e], this.initAnchor(e), t.stopPropagation();
          }
        },
        onMouseMove: function (t) {
          this.touches.length && (this.processMove(t, [{
            fake: !0,
            clientX: t.clientX,
            clientY: t.clientY
          }]), t.preventDefault && t.preventDefault());
        },
        onMouseUp: function () {
          this.processEnd();
        },
        initAnchor: function (t) {
          var e = this.$refs.draggable.getBoundingClientRect(),
            i = e.left,
            n = e.right,
            s = e.bottom,
            o = e.top;
          this.anchor = {
            left: t.clientX - i,
            top: t.clientY - o,
            bottom: s - t.clientY,
            right: n - t.clientX
          };
        },
        processMove: function (t, e) {
          var i = o(e);
          if (this.touches.length) {
            if (1 === this.touches.length && 1 === i.length) {
              var n = this.$refs.draggable;
              this.$emit("drag", new W(t, n, {
                left: i[0].clientX,
                top: i[0].clientY
              }, {
                left: this.touches[0].clientX,
                top: this.touches[0].clientY
              }, this.anchor));
            }
            this.touches = i;
          }
        },
        processEnd: function () {
          this.touches.length && this.$emit("drag-end"), this.hovered && (this.$emit("leave"), this.hovered = !1), this.touches = [];
        }
      }
    }],
    props: {
      classname: {
        type: String
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0),
  $ = d("vue-handler-wrapper"),
  H = T({
    render: function () {
      var t = this,
        e = t.$createElement,
        i = t._self._c || e;
      return i("div", {
        class: t.classes.root
      }, [i("DraggableElement", {
        class: t.classes.draggable,
        on: {
          drag: function (e) {
            return t.$emit("drag", e);
          },
          "drag-end": function (e) {
            return t.$emit("drag-end");
          },
          leave: function (e) {
            return t.$emit("leave");
          },
          enter: function (e) {
            return t.$emit("enter");
          }
        }
      }, [t._t("default")], 2)], 1);
    },
    staticRenderFns: []
  }, undefined, {
    name: "HandlerWrapper",
    components: {
      DraggableElement: O
    },
    props: {
      horizontalPosition: {
        type: String
      },
      verticalPosition: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: !1
      }
    },
    computed: {
      classes: function () {
        var t;
        if (this.horizontalPosition || this.verticalPosition) {
          var e,
            i = p(this.horizontalPosition, this.verticalPosition);
          t = $((n(e = {}, i.classname, !0), n(e, "disabled", this.disabled), e));
        } else t = $({
          disabled: this.disabled
        });
        return {
          root: t,
          draggable: $("draggable")
        };
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0),
  j = d("vue-line-wrapper"),
  P = T({
    render: function () {
      var t = this,
        e = t.$createElement;
      return (t._self._c || e)("DraggableElement", {
        class: t.classname,
        on: {
          drag: function (e) {
            return t.$emit("drag", e);
          },
          "drag-end": function (e) {
            return t.$emit("drag-end");
          },
          leave: function (e) {
            return t.$emit("leave");
          },
          enter: function (e) {
            return t.$emit("enter");
          }
        }
      }, [t._t("default")], 2);
    },
    staticRenderFns: []
  }, undefined, {
    name: "LineWrapper",
    components: {
      DraggableElement: O
    },
    props: {
      position: {
        type: String,
        required: !0
      },
      disabled: {
        type: Boolean,
        default: !1
      }
    },
    computed: {
      classname: function () {
        var t;
        return j((n(t = {}, this.position, !0), n(t, "disabled", this.disabled), t));
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0),
  D = ["left", "right", "top", "bottom"],
  L = ["left", "right"],
  I = ["top", "bottom"],
  B = ["left", "top"],
  _ = ["fill-area", "fit-area", "stencil", "none"],
  F = {
    left: 0,
    top: 0,
    width: 0,
    height: 0
  };
function X(t, e, i) {
  return !(i = i || ["width", "height", "left", "top"]).some(function (i) {
    return t[i] !== e[i];
  });
}
function Y(t) {
  return {
    left: t.left,
    top: t.top,
    right: t.left + t.width,
    bottom: t.top + t.height
  };
}
function k(t, e) {
  return {
    left: t.left - e.left,
    top: t.top - e.top
  };
}
function U(t) {
  return {
    left: t.left + t.width / 2,
    top: t.top + t.height / 2
  };
}
function N(t, e) {
  var i = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  };
  return D.forEach(function (n) {
    var s = e[n],
      o = Y(t)[n];
    i[n] = void 0 !== s && void 0 !== o ? "left" === n || "top" === n ? Math.max(0, s - o) : Math.max(0, o - s) : 0;
  }), i;
}
function V(t, e) {
  return {
    left: t.left - e.left,
    top: t.top - e.top,
    width: t.width + e.left + e.right,
    height: t.height + e.top + e.bottom
  };
}
function Z(t) {
  return {
    left: -t.left,
    top: -t.top
  };
}
function q(t, e) {
  return f(f({}, t), {
    left: t.left + e.left,
    top: t.top + e.top
  });
}
function G(t, e, i, n) {
  if (1 !== e) {
    if (i) {
      var s = U(t);
      return {
        width: t.width * e,
        height: t.height * e,
        left: t.left + t.width * (1 - e) / 2 + (i.left - s.left) * (n || 1 - e),
        top: t.top + t.height * (1 - e) / 2 + (i.top - s.top) * (n || 1 - e)
      };
    }
    return {
      width: t.width * e,
      height: t.height * e,
      left: t.left + t.width * (1 - e) / 2,
      top: t.top + t.height * (1 - e) / 2
    };
  }
  return t;
}
function Q(t) {
  return t.width / t.height;
}
function K(t, e) {
  return Math.min(void 0 !== e.right && void 0 !== e.left ? (e.right - e.left) / t.width : 1 / 0, void 0 !== e.bottom && void 0 !== e.top ? (e.bottom - e.top) / t.height : 1 / 0);
}
function J(t, e) {
  var i = {
      left: 0,
      top: 0
    },
    n = N(t, e);
  return n.left && n.left > 0 ? i.left = n.left : n.right && n.right > 0 && (i.left = -n.right), n.top && n.top > 0 ? i.top = n.top : n.bottom && n.bottom > 0 && (i.top = -n.bottom), i;
}
function tt(t, e) {
  var i;
  return e.minimum && t < e.minimum ? i = e.minimum : e.maximum && t > e.maximum && (i = e.maximum), i;
}
function et(t, e) {
  var i = Q(t),
    n = Q(e);
  return e.width < 1 / 0 && e.height < 1 / 0 ? i > n ? {
    width: e.width,
    height: e.width / i
  } : {
    width: e.height * i,
    height: e.height
  } : e.width < 1 / 0 ? {
    width: e.width,
    height: e.width / i
  } : e.height < 1 / 0 ? {
    width: e.height * i,
    height: e.height
  } : t;
}
function it(t, e) {
  var i = e * Math.PI / 180;
  return {
    width: Math.abs(t.width * Math.cos(i)) + Math.abs(t.height * Math.sin(i)),
    height: Math.abs(t.width * Math.sin(i)) + Math.abs(t.height * Math.cos(i))
  };
}
function nt(t, e) {
  var i = e * Math.PI / 180;
  return {
    left: t.left * Math.cos(i) - t.top * Math.sin(i),
    top: t.left * Math.sin(i) + t.top * Math.cos(i)
  };
}
function st(t, e) {
  var i = N(ot(t, e), e);
  return i.left + i.right + i.top + i.bottom ? i.left + i.right > i.top + i.bottom ? Math.min((t.width + i.left + i.right) / t.width, K(t, e)) : Math.min((t.height + i.top + i.bottom) / t.height, K(t, e)) : 1;
}
function ot(t, e, i) {
  void 0 === i && (i = !1);
  var n = J(t, e);
  return q(t, i ? Z(n) : n);
}
function rt(t) {
  return {
    width: void 0 !== t.right && void 0 !== t.left ? t.right - t.left : 1 / 0,
    height: void 0 !== t.bottom && void 0 !== t.top ? t.bottom - t.top : 1 / 0
  };
}
function at(t, e) {
  return f(f({}, t), {
    minWidth: Math.min(e.width, t.minWidth),
    minHeight: Math.min(e.height, t.minHeight),
    maxWidth: Math.min(e.width, t.maxWidth),
    maxHeight: Math.min(e.height, t.maxHeight)
  });
}
function ht(t, e, i) {
  void 0 === i && (i = !0);
  var n = {};
  return D.forEach(function (s) {
    var o = t[s],
      r = e[s];
    void 0 !== o && void 0 !== r ? n[s] = "left" === s || "top" === s ? i ? Math.max(o, r) : Math.min(o, r) : i ? Math.min(o, r) : Math.max(o, r) : void 0 !== r ? n[s] = r : void 0 !== o && (n[s] = o);
  }), n;
}
function ct(t, e) {
  return ht(t, e, !0);
}
function lt(t) {
  var e = t.size,
    i = t.aspectRatio,
    n = t.ignoreMinimum,
    s = t.sizeRestrictions;
  return Boolean((e.correctRatio || Q(e) >= i.minimum && Q(e) <= i.maximum) && e.height <= s.maxHeight && e.width <= s.maxWidth && e.width && e.height && (n || e.height >= s.minHeight && e.width >= s.minWidth));
}
function dt(t, e) {
  return Math.pow(t.width - e.width, 2) + Math.pow(t.height - e.height, 2);
}
function ut(t) {
  var e = t.width,
    i = t.height,
    n = t.sizeRestrictions,
    s = {
      minimum: t.aspectRatio && t.aspectRatio.minimum || 0,
      maximum: t.aspectRatio && t.aspectRatio.maximum || 1 / 0
    },
    o = {
      width: Math.max(n.minWidth, Math.min(n.maxWidth, e)),
      height: Math.max(n.minHeight, Math.min(n.maxHeight, i))
    };
  function r(t, o) {
    return void 0 === o && (o = !1), t.reduce(function (t, r) {
      return lt({
        size: r,
        aspectRatio: s,
        sizeRestrictions: n,
        ignoreMinimum: o
      }) && (!t || dt(r, {
        width: e,
        height: i
      }) < dt(t, {
        width: e,
        height: i
      })) ? r : t;
    }, null);
  }
  var a = [];
  s && [s.minimum, s.maximum].forEach(function (t) {
    t && a.push({
      width: o.width,
      height: o.width / t,
      correctRatio: !0
    }, {
      width: o.height * t,
      height: o.height,
      correctRatio: !0
    });
  }), lt({
    size: o,
    aspectRatio: s,
    sizeRestrictions: n
  }) && a.push(o);
  var h = r(a) || r(a, !0);
  return h && {
    width: h.width,
    height: h.height
  };
}
function mt(t) {
  var e = t.event,
    i = t.coordinates,
    n = t.positionRestrictions,
    s = void 0 === n ? {} : n,
    o = q(i, e.directions);
  return q(o, J(o, s));
}
function ft(t) {
  var e = t.coordinates,
    i = t.transform,
    n = t.imageSize,
    s = t.sizeRestrictions,
    o = t.positionRestrictions,
    r = t.aspectRatio,
    a = t.visibleArea,
    h = function (t, e) {
      return mt({
        coordinates: t,
        positionRestrictions: o,
        event: new E({
          left: e.left - t.left,
          top: e.top - t.top
        })
      });
    },
    c = f({}, e);
  return (Array.isArray(i) ? i : [i]).forEach(function (t) {
    var e = {};
    w((e = "function" == typeof t ? t({
      coordinates: c,
      imageSize: n,
      visibleArea: a
    }) : t).width) && w(e.height) || (c = function (t, e) {
      var i = f(f(f({}, t), ut({
        width: e.width,
        height: e.height,
        sizeRestrictions: s,
        aspectRatio: r
      })), {
        left: 0,
        top: 0
      });
      return h(i, {
        left: t.left,
        top: t.top
      });
    }(c, f(f({}, c), e))), w(e.left) && w(e.top) || (c = h(c, f(f({}, c), e)));
  }), c;
}
function pt(t) {
  t.event;
  var e = t.getAreaRestrictions,
    i = t.boundaries,
    n = t.coordinates,
    s = t.visibleArea;
  t.aspectRatio;
  var o = t.stencilSize,
    r = t.sizeRestrictions,
    a = t.positionRestrictions;
  t.stencilReference;
  var h,
    c,
    l,
    d = f({}, n),
    u = f({}, s),
    m = f({}, o);
  h = Q(m), c = Q(d), void 0 === l && (l = .001), (0 === h || 0 === c ? Math.abs(c - h) < l : Math.abs(c / h) < 1 + l && Math.abs(c / h) > 1 - l) || (d = f(f({}, d), ut({
    sizeRestrictions: r,
    width: d.width,
    height: d.height,
    aspectRatio: {
      minimum: Q(m),
      maximum: Q(m)
    }
  })));
  var p = st(u = G(u, d.width * i.width / (u.width * m.width)), e({
    visibleArea: u,
    type: "resize"
  }));
  return 1 !== p && (u = G(u, p), d = G(d, p)), u = ot(u = q(u, k(U(d), U(u))), e({
    visibleArea: u,
    type: "move"
  })), {
    coordinates: d = ot(d, ct(Y(u), a)),
    visibleArea: u
  };
}
function gt(t) {
  var e = t.event,
    i = t.getAreaRestrictions,
    n = t.boundaries,
    s = t.coordinates,
    o = t.visibleArea;
  t.aspectRatio, t.stencilSize, t.sizeRestrictions;
  var r = t.positionRestrictions;
  t.stencilReference;
  var a = f({}, s),
    h = f({}, o);
  if (s && o && "manipulateImage" !== e.type) {
    var c = {
      width: 0,
      height: 0
    };
    h.width, n.width, Q(n) > Q(a) ? (c.height = .8 * n.height, c.width = c.height * Q(a)) : (c.width = .8 * n.width, c.height = c.width * Q(a));
    var l = st(h = G(h, a.width * n.width / (h.width * c.width)), i({
      visibleArea: h,
      type: "resize"
    }));
    h = G(h, l), 1 !== l && (c.height /= l, c.width /= l), h = ot(h = q(h, k(U(a), U(h))), i({
      visibleArea: h,
      type: "move"
    })), a = ot(a, ct(Y(h), r));
  }
  return {
    coordinates: a,
    visibleArea: h
  };
}
function vt(t) {
  var e = t.event,
    i = t.coordinates,
    n = t.visibleArea,
    s = t.getAreaRestrictions,
    o = f({}, n),
    r = f({}, i);
  if ("setCoordinates" === e.type) {
    var a = Math.max(0, r.width - o.width),
      h = Math.max(0, r.height - o.height);
    a > h ? o = G(o, Math.min(r.width / o.width, K(o, s({
      visibleArea: o,
      type: "resize"
    })))) : h > a && (o = G(o, Math.min(r.height / o.height, K(o, s({
      visibleArea: o,
      type: "resize"
    }))))), o = ot(o = q(o, Z(J(r, Y(o)))), s({
      visibleArea: o,
      type: "move"
    }));
  }
  return {
    visibleArea: o,
    coordinates: r
  };
}
function bt(t) {
  var e = t.imageSize,
    i = t.visibleArea,
    n = t.aspectRatio,
    s = t.sizeRestrictions,
    o = i || e,
    r = Math.min(n.maximum || 1 / 0, Math.max(n.minimum || 0, Q(o))),
    a = o.width < o.height ? {
      width: .8 * o.width,
      height: .8 * o.width / r
    } : {
      height: .8 * o.height,
      width: .8 * o.height * r
    };
  return ut(f(f({}, a), {
    aspectRatio: n,
    sizeRestrictions: s
  }));
}
function wt(t) {
  var e,
    i,
    n = t.imageSize,
    s = t.visibleArea,
    o = t.boundaries,
    r = t.aspectRatio,
    a = t.sizeRestrictions,
    h = t.stencilSize,
    c = s || n;
  return Q(c) > Q(o) ? i = (e = h.height * c.height / o.height) * Q(h) : e = (i = h.width * c.width / o.width) / Q(h), ut({
    width: i,
    height: e,
    aspectRatio: r,
    sizeRestrictions: a
  });
}
function yt(t, e) {
  return ht(t, Y(e));
}
function zt(t) {
  var e = t.event,
    i = t.coordinates,
    n = t.visibleArea,
    s = t.sizeRestrictions,
    o = t.getAreaRestrictions,
    r = t.positionRestrictions,
    a = t.adjustStencil,
    h = e.scale,
    c = e.move,
    l = f({}, n),
    d = f({}, i),
    u = 1,
    m = 1,
    p = h.factor && Math.abs(h.factor - 1) > .001;
  l = q(l, {
    left: c.left || 0,
    top: c.top || 0
  });
  var g = {
    stencil: {
      minimum: Math.max(s.minWidth ? s.minWidth / d.width : 0, s.minHeight ? s.minHeight / d.height : 0),
      maximum: Math.min(s.maxWidth ? s.maxWidth / d.width : 1 / 0, s.maxHeight ? s.maxHeight / d.height : 1 / 0, K(d, r))
    },
    area: {
      maximum: K(l, o({
        visibleArea: l,
        type: "resize"
      }))
    }
  };
  h.factor && p && (h.factor < 1 ? (m = Math.max(h.factor, g.stencil.minimum)) > 1 && (m = 1) : h.factor > 1 && (m = Math.min(h.factor, Math.min(g.area.maximum, g.stencil.maximum))) < 1 && (m = 1)), m && (l = G(l, m, h.center));
  var v = i.left - n.left,
    b = n.width + n.left - (i.width + i.left),
    w = i.top - n.top,
    y = n.height + n.top - (i.height + i.top);
  return l = ot(l = q(l, J(l, {
    left: void 0 !== r.left ? r.left - v * m : void 0,
    top: void 0 !== r.top ? r.top - w * m : void 0,
    bottom: void 0 !== r.bottom ? r.bottom + y * m : void 0,
    right: void 0 !== r.right ? r.right + b * m : void 0
  })), o({
    visibleArea: l,
    type: "move"
  })), d.width = d.width * m, d.height = d.height * m, d.left = l.left + v * m, d.top = l.top + w * m, d = ot(d, ct(Y(l), r)), h.factor && p && a && (h.factor > 1 ? u = Math.min(g.area.maximum, h.factor) / m : h.factor < 1 && (u = Math.max(d.height / l.height, d.width / l.width, h.factor / m)), 1 !== u && (l = q(l = ot(l = G(l, u, h.factor > 1 ? h.center : U(d)), o({
    visibleArea: l,
    type: "move"
  })), Z(J(d, Y(l)))))), {
    coordinates: d,
    visibleArea: l
  };
}
function Rt(t) {
  var e = t.aspectRatio,
    i = t.getAreaRestrictions,
    n = t.coordinates,
    s = t.visibleArea,
    o = t.sizeRestrictions,
    r = t.positionRestrictions,
    a = t.imageSize,
    h = t.previousImageSize,
    c = t.angle,
    l = f({}, n),
    d = f({}, s),
    u = nt(U(f({
      left: 0,
      top: 0
    }, h)), c);
  return (l = f(f({}, ut({
    sizeRestrictions: o,
    aspectRatio: e,
    width: l.width,
    height: l.height
  })), nt(U(l), c))).left -= u.left - a.width / 2 + l.width / 2, l.top -= u.top - a.height / 2 + l.height / 2, d = G(d, st(d, i({
    visibleArea: d,
    type: "resize"
  }))), {
    coordinates: l = ot(l, r),
    visibleArea: d = ot(d = q(d, k(U(l), U(n))), i({
      visibleArea: d,
      type: "move"
    }))
  };
}
function At(t) {
  var e = t.flip,
    i = t.previousFlip,
    n = t.rotate;
  t.aspectRatio;
  var s = t.getAreaRestrictions,
    o = t.coordinates,
    r = t.visibleArea,
    a = t.imageSize,
    h = f({}, o),
    c = f({}, r),
    l = i.horizontal !== e.horizontal,
    d = i.vertical !== e.vertical;
  if (l || d) {
    var u = nt({
        left: a.width / 2,
        top: a.height / 2
      }, -n),
      m = nt(U(h), -n),
      p = nt({
        left: l ? u.left - (m.left - u.left) : m.left,
        top: d ? u.top - (m.top - u.top) : m.top
      }, n);
    h = q(h, k(p, U(h))), m = nt(U(c), -n), c = ot(c = q(c, k(p = nt({
      left: l ? u.left - (m.left - u.left) : m.left,
      top: d ? u.top - (m.top - u.top) : m.top
    }, n), U(c))), s({
      visibleArea: c,
      type: "move"
    }));
  }
  return {
    coordinates: h,
    visibleArea: c
  };
}
function St(t) {
  var e = t.directions,
    i = t.coordinates,
    n = t.positionRestrictions,
    s = void 0 === n ? {} : n,
    o = t.sizeRestrictions,
    r = t.preserveRatio,
    a = t.compensate,
    h = f({}, e),
    c = V(i, h).width,
    l = V(i, h).height;
  c < 0 && (h.left < 0 && h.right < 0 ? (h.left = -(i.width - o.minWidth) / (h.left / h.right), h.right = -(i.width - o.minWidth) / (h.right / h.left)) : h.left < 0 ? h.left = -(i.width - o.minWidth) : h.right < 0 && (h.right = -(i.width - o.minWidth))), l < 0 && (h.top < 0 && h.bottom < 0 ? (h.top = -(i.height - o.minHeight) / (h.top / h.bottom), h.bottom = -(i.height - o.minHeight) / (h.bottom / h.top)) : h.top < 0 ? h.top = -(i.height - o.minHeight) : h.bottom < 0 && (h.bottom = -(i.height - o.minHeight)));
  var d = N(V(i, h), s);
  a && (d.left && d.left > 0 && 0 === d.right ? (h.right += d.left, h.left -= d.left) : d.right && d.right > 0 && 0 === d.left && (h.left += d.right, h.right -= d.right), d.top && d.top > 0 && 0 === d.bottom ? (h.bottom += d.top, h.top -= d.top) : d.bottom && d.bottom > 0 && 0 === d.top && (h.top += d.bottom, h.bottom -= d.bottom), d = N(V(i, h), s));
  var u = {
    width: 1 / 0,
    height: 1 / 0,
    left: 1 / 0,
    right: 1 / 0,
    top: 1 / 0,
    bottom: 1 / 0
  };
  if (D.forEach(function (t) {
    var e = d[t];
    e && h[t] && (u[t] = Math.max(0, 1 - e / h[t]));
  }), r) {
    var m = Math.min.apply(null, D.map(function (t) {
      return u[t];
    }));
    m !== 1 / 0 && D.forEach(function (t) {
      h[t] *= m;
    });
  } else D.forEach(function (t) {
    u[t] !== 1 / 0 && (h[t] *= u[t]);
  });
  if (c = V(i, h).width, l = V(i, h).height, h.right + h.left && (c > o.maxWidth ? u.width = (o.maxWidth - i.width) / (h.right + h.left) : c < o.minWidth && (u.width = (o.minWidth - i.width) / (h.right + h.left))), h.bottom + h.top && (l > o.maxHeight ? u.height = (o.maxHeight - i.height) / (h.bottom + h.top) : l < o.minHeight && (u.height = (o.minHeight - i.height) / (h.bottom + h.top))), r) {
    var p = Math.min(u.width, u.height);
    p !== 1 / 0 && D.forEach(function (t) {
      h[t] *= p;
    });
  } else u.width !== 1 / 0 && L.forEach(function (t) {
    h[t] *= u.width;
  }), u.height !== 1 / 0 && I.forEach(function (t) {
    h[t] *= u.height;
  });
  return h;
}
function xt(t, e, i) {
  return 0 == e && 0 == i ? t / 2 : 0 == e ? 0 : 0 == i ? t : t * Math.abs(e / (e + i));
}
var Mt = d("vue-simple-handler"),
  Ct = d("vue-simple-handler-wrapper"),
  Et = T({
    render: function () {
      var t = this,
        e = t.$createElement,
        i = t._self._c || e;
      return i("HandlerWrapper", {
        class: t.classes.wrapper,
        attrs: {
          "vertical-position": t.verticalPosition,
          "horizontal-position": t.horizontalPosition,
          disabled: t.disabled
        },
        on: {
          drag: t.onDrag,
          "drag-end": t.onDragEnd,
          enter: t.onEnter,
          leave: t.onLeave
        }
      }, [i("div", {
        class: t.classes.default
      })]);
    },
    staticRenderFns: []
  }, undefined, {
    name: "SimpleHandler",
    components: {
      HandlerWrapper: H
    },
    props: {
      defaultClass: {
        type: String
      },
      hoverClass: {
        type: String
      },
      wrapperClass: {
        type: String
      },
      horizontalPosition: {
        type: String
      },
      verticalPosition: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: !1
      }
    },
    data: function () {
      return {
        hover: !1
      };
    },
    computed: {
      classes: function () {
        var t,
          e = (n(t = {}, this.horizontalPosition, Boolean(this.horizontalPosition)), n(t, this.verticalPosition, Boolean(this.verticalPosition)), n(t, "".concat(this.horizontalPosition, "-").concat(this.verticalPosition), Boolean(this.verticalPosition && this.horizontalPosition)), n(t, "hover", this.hover), t);
        return {
          default: l(Mt(e), this.defaultClass, this.hover && this.hoverClass),
          wrapper: l(Ct(e), this.wrapperClass)
        };
      }
    },
    methods: {
      onDrag: function (t) {
        this.$emit("drag", t);
      },
      onEnter: function () {
        this.hover = !0;
      },
      onLeave: function () {
        this.hover = !1;
      },
      onDragEnd: function () {
        this.$emit("drag-end");
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0),
  Wt = d("vue-simple-line"),
  Tt = d("vue-simple-line-wrapper"),
  Ot = T({
    render: function () {
      var t = this,
        e = t.$createElement,
        i = t._self._c || e;
      return i("LineWrapper", {
        class: t.classes.wrapper,
        attrs: {
          position: t.position,
          disabled: t.disabled
        },
        on: {
          drag: t.onDrag,
          "drag-end": t.onDragEnd,
          enter: t.onEnter,
          leave: t.onLeave
        }
      }, [i("div", {
        class: t.classes.root
      })]);
    },
    staticRenderFns: []
  }, undefined, {
    name: "SimpleLine",
    components: {
      LineWrapper: P
    },
    props: {
      defaultClass: {
        type: String
      },
      hoverClass: {
        type: String
      },
      wrapperClass: {
        type: String
      },
      position: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: !1
      }
    },
    data: function () {
      return {
        hover: !1
      };
    },
    computed: {
      classes: function () {
        return {
          root: l(Wt(n({}, this.position, !0)), this.defaultClass, this.hover && this.hoverClass),
          wrapper: l(Tt(n({}, this.position, !0)), this.wrapperClass)
        };
      }
    },
    methods: {
      onDrag: function (t) {
        this.$emit("drag", t);
      },
      onEnter: function () {
        this.hover = !0;
      },
      onLeave: function () {
        this.hover = !1;
      },
      onDragEnd: function () {
        this.$emit("drag-end");
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0),
  $t = d("vue-bounding-box"),
  Ht = ["east", "west", null],
  jt = ["south", "north", null],
  Pt = T({
    render: function () {
      var t = this,
        e = t.$createElement,
        i = t._self._c || e;
      return i("div", {
        ref: "box",
        class: t.classes.root,
        style: t.style
      }, [t._t("default"), t._v(" "), i("div", t._l(t.lineNodes, function (e) {
        return i(e.component, {
          key: e.name,
          tag: "component",
          attrs: {
            "default-class": e.class,
            "hover-class": e.hoverClass,
            "wrapper-class": e.wrapperClass,
            position: e.name,
            disabled: e.disabled
          },
          on: {
            drag: function (i) {
              return t.onHandlerDrag(i, e.horizontalDirection, e.verticalDirection);
            },
            "drag-end": function (e) {
              return t.onEnd();
            }
          }
        });
      }), 1), t._v(" "), t._l(t.handlerNodes, function (e) {
        return i("div", {
          key: e.name,
          class: e.wrapperClass,
          style: e.wrapperStyle
        }, [i(e.component, {
          tag: "component",
          attrs: {
            "default-class": e.class,
            "hover-class": e.hoverClass,
            "wrapper-class": e.wrapperClass,
            "horizontal-position": e.horizontalDirection,
            "vertical-position": e.verticalDirection,
            disabled: e.disabled
          },
          on: {
            drag: function (i) {
              return t.onHandlerDrag(i, e.horizontalDirection, e.verticalDirection);
            },
            "drag-end": function (e) {
              return t.onEnd();
            }
          }
        })], 1);
      })], 2);
    },
    staticRenderFns: []
  }, undefined, {
    name: "BoundingBox",
    props: {
      width: {
        type: Number
      },
      height: {
        type: Number
      },
      transitions: {
        type: Object
      },
      handlers: {
        type: Object,
        default: function () {
          return {
            eastNorth: !0,
            north: !0,
            westNorth: !0,
            west: !0,
            westSouth: !0,
            south: !0,
            eastSouth: !0,
            east: !0
          };
        }
      },
      handlersComponent: {
        type: [Object, String],
        default: function () {
          return Et;
        }
      },
      handlersClasses: {
        type: Object,
        default: function () {
          return {};
        }
      },
      handlersWrappersClasses: {
        type: Object,
        default: function () {
          return {};
        }
      },
      lines: {
        type: Object,
        default: function () {
          return {
            west: !0,
            north: !0,
            east: !0,
            south: !0
          };
        }
      },
      linesComponent: {
        type: [Object, String],
        default: function () {
          return Ot;
        }
      },
      linesClasses: {
        type: Object,
        default: function () {
          return {};
        }
      },
      linesWrappersClasses: {
        type: Object,
        default: function () {
          return {};
        }
      },
      resizable: {
        type: Boolean,
        default: !0
      }
    },
    data: function () {
      var t = [];
      return Ht.forEach(function (e) {
        jt.forEach(function (i) {
          if (e !== i) {
            var n = p(e, i),
              s = n.name,
              o = n.classname;
            t.push({
              name: s,
              classname: o,
              verticalDirection: i,
              horizontalDirection: e
            });
          }
        });
      }), {
        points: t
      };
    },
    computed: {
      style: function () {
        var t = {};
        return this.width && this.height && (t.width = "".concat(this.width, "px"), t.height = "".concat(this.height, "px"), this.transitions && this.transitions.enabled && (t.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction))), t;
      },
      classes: function () {
        var t = this.handlersClasses,
          e = this.handlersWrappersClasses,
          i = this.linesClasses,
          n = this.linesWrappersClasses;
        return {
          root: $t(),
          handlers: t,
          handlersWrappers: e,
          lines: i,
          linesWrappers: n
        };
      },
      lineNodes: function () {
        var t = this,
          e = [];
        return this.points.forEach(function (i) {
          i.horizontalDirection && i.verticalDirection || !t.lines[i.name] || e.push({
            name: i.name,
            component: t.linesComponent,
            class: l(t.classes.lines.default, t.classes.lines[i.name], !t.resizable && t.classes.lines.disabled),
            wrapperClass: l(t.classes.linesWrappers.default, t.classes.linesWrappers[i.name], !t.resizable && t.classes.linesWrappers.disabled),
            hoverClass: t.classes.lines.hover,
            verticalDirection: i.verticalDirection,
            horizontalDirection: i.horizontalDirection,
            disabled: !t.resizable
          });
        }), e;
      },
      handlerNodes: function () {
        var t = this,
          e = [],
          i = this.width,
          s = this.height;
        return this.points.forEach(function (o) {
          if (t.handlers[o.name]) {
            var r = {
              name: o.name,
              component: t.handlersComponent,
              class: l(t.classes.handlers.default, t.classes.handlers[o.name]),
              wrapperClass: l(t.classes.handlersWrappers.default, t.classes.handlersWrappers[o.name]),
              hoverClass: t.classes.handlers.hover,
              verticalDirection: o.verticalDirection,
              horizontalDirection: o.horizontalDirection,
              disabled: !t.resizable
            };
            if (i && s) {
              var a = o.horizontalDirection,
                h = o.verticalDirection,
                c = "east" === a ? i : "west" === a ? 0 : i / 2,
                d = "south" === h ? s : "north" === h ? 0 : s / 2;
              r.wrapperClass = $t("handler"), r.wrapperStyle = {
                transform: "translate(".concat(c, "px, ").concat(d, "px)")
              }, t.transitions && t.transitions.enabled && (r.wrapperStyle.transition = "".concat(t.transitions.time, "ms ").concat(t.transitions.timingFunction));
            } else r.wrapperClass = $t("handler", n({}, o.classname, !0));
            e.push(r);
          }
        }), e;
      }
    },
    beforeMount: function () {
      window.addEventListener("mouseup", this.onMouseUp, {
        passive: !1
      }), window.addEventListener("mousemove", this.onMouseMove, {
        passive: !1
      }), window.addEventListener("touchmove", this.onTouchMove, {
        passive: !1
      }), window.addEventListener("touchend", this.onTouchEnd, {
        passive: !1
      });
    },
    beforeDestroy: function () {
      window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
    },
    mounted: function () {
      this.touches = [];
    },
    methods: {
      onEnd: function () {
        this.$emit("resize-end");
      },
      onHandlerDrag: function (t, e, i) {
        var n,
          s = t.shift(),
          o = s.left,
          r = s.top,
          a = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          };
        "west" === e ? a.left -= o : "east" === e && (a.right += o), "north" === i ? a.top -= r : "south" === i && (a.bottom += r), !i && e ? n = "width" : i && !e && (n = "height"), this.resizable && this.$emit("resize", new C(a, {
          allowedDirections: {
            left: "west" === e || !e,
            right: "east" === e || !e,
            bottom: "south" === i || !i,
            top: "north" === i || !i
          },
          preserveAspectRatio: t.nativeEvent && t.nativeEvent.shiftKey,
          respectDirection: n
        }));
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0),
  Dt = d("vue-draggable-area"),
  Lt = T({
    render: function () {
      var t = this,
        e = t.$createElement;
      return (t._self._c || e)("div", {
        ref: "container",
        on: {
          touchstart: t.onTouchStart,
          mousedown: t.onMouseDown
        }
      }, [t._t("default")], 2);
    },
    staticRenderFns: []
  }, undefined, {
    name: "DraggableArea",
    props: {
      movable: {
        type: Boolean,
        default: !0
      },
      activationDistance: {
        type: Number,
        default: 20
      }
    },
    computed: {
      classnames: function () {
        return {
          default: Dt()
        };
      }
    },
    beforeMount: function () {
      window.addEventListener("mouseup", this.onMouseUp, {
        passive: !1
      }), window.addEventListener("mousemove", this.onMouseMove, {
        passive: !1
      }), window.addEventListener("touchmove", this.onTouchMove, {
        passive: !1
      }), window.addEventListener("touchend", this.onTouchEnd, {
        passive: !1
      });
    },
    beforeDestroy: function () {
      window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
    },
    mounted: function () {
      this.touches = [], this.touchStarted = !1;
    },
    methods: {
      onTouchStart: function (t) {
        if (t.cancelable) {
          var e = this.movable && 1 === t.touches.length;
          e && (this.touches = o(t.touches)), (this.touchStarted || e) && (t.preventDefault(), t.stopPropagation());
        }
      },
      onTouchEnd: function () {
        this.touchStarted = !1, this.processEnd();
      },
      onTouchMove: function (t) {
        this.touches.length >= 1 && (this.touchStarted ? (this.processMove(t, t.touches), t.preventDefault(), t.stopPropagation()) : x({
          x: this.touches[0].clientX,
          y: this.touches[0].clientY
        }, {
          x: t.touches[0].clientX,
          y: t.touches[0].clientY
        }) > this.activationDistance && (this.initAnchor({
          clientX: t.touches[0].clientX,
          clientY: t.touches[0].clientY
        }), this.touchStarted = !0));
      },
      onMouseDown: function (t) {
        if (this.movable && 0 === t.button) {
          var e = {
            fake: !0,
            clientX: t.clientX,
            clientY: t.clientY
          };
          this.touches = [e], this.initAnchor(e), t.stopPropagation();
        }
      },
      onMouseMove: function (t) {
        this.touches.length && (this.processMove(t, [{
          fake: !0,
          clientX: t.clientX,
          clientY: t.clientY
        }]), t.preventDefault && t.cancelable && t.preventDefault(), t.stopPropagation());
      },
      onMouseUp: function () {
        this.processEnd();
      },
      initAnchor: function (t) {
        var e = this.$refs.container.getBoundingClientRect(),
          i = e.left,
          n = e.top;
        this.anchor = {
          x: t.clientX - i,
          y: t.clientY - n
        };
      },
      processMove: function (t, e) {
        var i = o(e);
        if (this.touches.length) {
          var n = this.$refs.container.getBoundingClientRect(),
            s = n.left,
            r = n.top;
          1 === this.touches.length && 1 === i.length && this.$emit("move", new E({
            left: i[0].clientX - (s + this.anchor.x),
            top: i[0].clientY - (r + this.anchor.y)
          }));
        }
      },
      processEnd: function () {
        this.touches.length && this.$emit("move-end"), this.touches = [];
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0);
function It(t) {
  var e, i;
  return {
    rotate: t.rotate || 0,
    flip: {
      horizontal: (null === (e = null == t ? void 0 : t.flip) || void 0 === e ? void 0 : e.horizontal) || !1,
      vertical: (null === (i = null == t ? void 0 : t.flip) || void 0 === i ? void 0 : i.vertical) || !1
    }
  };
}
function Bt(t) {
  return new Promise(function (e, i) {
    try {
      if (t) {
        if (/^data:/i.test(t)) e(function (t) {
          t = t.replace(/^data:([^;]+);base64,/gim, "");
          for (var e = atob(t), i = e.length, n = new ArrayBuffer(i), s = new Uint8Array(n), o = 0; o < i; o++) s[o] = e.charCodeAt(o);
          return n;
        }(t));else if (/^blob:/i.test(t)) {
          var n = new FileReader();
          n.onload = function (t) {
            e(t.target.result);
          }, o = t, r = function (t) {
            n.readAsArrayBuffer(t);
          }, (a = new XMLHttpRequest()).open("GET", o, !0), a.responseType = "blob", a.onload = function () {
            200 != this.status && 0 !== this.status || r(this.response);
          }, a.send();
        } else {
          var s = new XMLHttpRequest();
          s.onreadystatechange = function () {
            4 === s.readyState && (200 === s.status || 0 === s.status ? e(s.response) : i("Warning: could not load an image to parse its orientation"), s = null);
          }, s.onprogress = function () {
            "image/jpeg" !== s.getResponseHeader("content-type") && s.abort();
          }, s.withCredentials = !1, s.open("GET", t, !0), s.responseType = "arraybuffer", s.send(null);
        }
      } else i("Error: the image is empty");
    } catch (t) {
      i(t);
    }
    var o, r, a;
  });
}
function _t(t) {
  var e = t.rotate,
    i = t.flip,
    n = t.scaleX,
    s = t.scaleY,
    o = "";
  return o += " rotate(" + e + "deg) ", o += " scaleX(" + n * (i.horizontal ? -1 : 1) + ") ", o += " scaleY(" + s * (i.vertical ? -1 : 1) + ") ";
}
function Ft(t) {
  try {
    var e,
      i = new DataView(t),
      n = void 0,
      s = void 0,
      o = void 0,
      r = void 0;
    if (255 === i.getUint8(0) && 216 === i.getUint8(1)) for (var a = i.byteLength, h = 2; h + 1 < a;) {
      if (255 === i.getUint8(h) && 225 === i.getUint8(h + 1)) {
        o = h;
        break;
      }
      h++;
    }
    if (o && (n = o + 10, "Exif" === function (t, e, i) {
      var n,
        s = "";
      for (n = e, i += e; n < i; n++) s += String.fromCharCode(t.getUint8(n));
      return s;
    }(i, o + 4, 4))) {
      var c = i.getUint16(n);
      if (((s = 18761 === c) || 19789 === c) && 42 === i.getUint16(n + 2, s)) {
        var l = i.getUint32(n + 4, s);
        l >= 8 && (r = n + l);
      }
    }
    if (r) for (var d = i.getUint16(r, s), u = 0; u < d; u++) {
      h = r + 12 * u + 2;
      if (274 === i.getUint16(h, s)) {
        h += 8, e = i.getUint16(h, s), i.setUint16(h, 1, s);
        break;
      }
    }
    return e;
  } catch (t) {
    return null;
  }
}
var Xt = d("vue-preview-result"),
  Yt = T({
    render: function () {
      var t = this,
        e = t.$createElement,
        i = t._self._c || e;
      return i("div", {
        class: t.classes.root
      }, [i("div", {
        ref: "wrapper",
        class: t.classes.wrapper,
        style: t.wrapperStyle
      }, [i("img", {
        ref: "image",
        class: t.classes.image,
        style: t.imageStyle,
        attrs: {
          src: t.image.src
        }
      })])]);
    },
    staticRenderFns: []
  }, undefined, {
    name: "PreviewResult",
    props: {
      image: {
        type: Object
      },
      transitions: {
        type: Object
      },
      stencilCoordinates: {
        type: Object,
        default: function () {
          return {
            width: 0,
            height: 0,
            left: 0,
            top: 0
          };
        }
      },
      imageClass: {
        type: String
      }
    },
    computed: {
      classes: function () {
        return {
          root: Xt(),
          wrapper: Xt("wrapper"),
          imageWrapper: Xt("image-wrapper"),
          image: l(Xt("image"), this.imageClass)
        };
      },
      wrapperStyle: function () {
        var t = {
          width: "".concat(this.stencilCoordinates.width, "px"),
          height: "".concat(this.stencilCoordinates.height, "px"),
          left: "calc(50% - ".concat(this.stencilCoordinates.width / 2, "px)"),
          top: "calc(50% - ".concat(this.stencilCoordinates.height / 2, "px)")
        };
        return this.transitions && this.transitions.enabled && (t.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction)), t;
      },
      imageStyle: function () {
        var t = this.image.transforms,
          e = it({
            width: this.image.width,
            height: this.image.height
          }, t.rotate),
          i = {
            width: "".concat(this.image.width, "px"),
            height: "".concat(this.image.height, "px"),
            left: "0px",
            top: "0px"
          },
          n = {
            left: (this.image.width - e.width) * t.scaleX / 2,
            top: (this.image.height - e.height) * t.scaleY / 2
          },
          s = {
            left: (1 - t.scaleX) * this.image.width / 2,
            top: (1 - t.scaleY) * this.image.height / 2
          };
        return i.transform = "translate(\n\t\t\t\t".concat(-this.stencilCoordinates.left - t.translateX - n.left - s.left, "px,").concat(-this.stencilCoordinates.top - t.translateY - n.top - s.top, "px) ") + _t(t), this.transitions && this.transitions.enabled && (i.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction)), i;
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0);
function kt(t, e) {
  var i = e.getBoundingClientRect(),
    n = i.left,
    s = i.top,
    o = {
      left: 0,
      top: 0
    },
    r = 0;
  return t.forEach(function (e) {
    o.left += (e.clientX - n) / t.length, o.top += (e.clientY - s) / t.length;
  }), t.forEach(function (t) {
    r += x({
      x: o.left,
      y: o.top
    }, {
      x: t.clientX - n,
      y: t.clientY - s
    });
  }), {
    centerMass: o,
    spread: r,
    count: t.length
  };
}
var Ut = T({
    render: function () {
      var t = this,
        e = t.$createElement;
      return (t._self._c || e)("div", {
        ref: "container",
        on: {
          touchstart: t.onTouchStart,
          mousedown: t.onMouseDown,
          wheel: t.onWheel
        }
      }, [t._t("default")], 2);
    },
    staticRenderFns: []
  }, undefined, {
    props: {
      touchMove: {
        type: Boolean,
        required: !0
      },
      mouseMove: {
        type: Boolean,
        required: !0
      },
      touchResize: {
        type: Boolean,
        required: !0
      },
      wheelResize: {
        type: [Boolean, Object],
        required: !0
      },
      eventsFilter: {
        type: Function,
        required: !1
      }
    },
    beforeMount: function () {
      window.addEventListener("mouseup", this.onMouseUp, {
        passive: !1
      }), window.addEventListener("mousemove", this.onMouseMove, {
        passive: !1
      }), window.addEventListener("touchmove", this.onTouchMove, {
        passive: !1
      }), window.addEventListener("touchend", this.onTouchEnd, {
        passive: !1
      });
    },
    beforeDestroy: function () {
      window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
    },
    created: function () {
      this.transforming = !1, this.debouncedProcessEnd = m(this.processEnd), this.touches = [];
    },
    methods: {
      processMove: function (t, e) {
        if (this.touches.length) {
          if (1 === this.touches.length && 1 === e.length) this.$emit("move", new M({
            left: this.touches[0].clientX - e[0].clientX,
            top: this.touches[0].clientY - e[0].clientY
          }));else if (this.touches.length > 1 && this.touchResize) {
            var i = kt(e, this.$refs.container),
              n = this.oldGeometricProperties;
            n.count === i.count && n.count > 1 && this.$emit("resize", new M({
              left: n.centerMass.left - i.centerMass.left,
              top: n.centerMass.top - i.centerMass.top
            }, {
              factor: n.spread / i.spread,
              center: i.centerMass
            })), this.oldGeometricProperties = i;
          }
          this.touches = e;
        }
      },
      processEnd: function () {
        this.transforming && (this.transforming = !1, this.$emit("transform-end"));
      },
      processStart: function () {
        this.transforming = !0, this.debouncedProcessEnd.clear();
      },
      processEvent: function (t) {
        return this.eventsFilter ? !1 !== this.eventsFilter(t, this.transforming) : (t.preventDefault(), t.stopPropagation(), !0);
      },
      onTouchStart: function (t) {
        if (t.cancelable && (this.touchMove || this.touchResize && t.touches.length > 1) && this.processEvent(t)) {
          var e = this.$refs.container,
            i = e.getBoundingClientRect(),
            n = i.left,
            s = i.top,
            r = i.bottom,
            a = i.right;
          this.touches = o(t.touches).filter(function (t) {
            return t.clientX > n && t.clientX < a && t.clientY > s && t.clientY < r;
          }), this.oldGeometricProperties = kt(this.touches, e);
        }
      },
      onTouchEnd: function (t) {
        0 === t.touches.length && (this.touches = [], this.processEnd());
      },
      onTouchMove: function (t) {
        var e = this;
        if (this.touches.length) {
          var i = o(t.touches).filter(function (t) {
            return !t.identifier || e.touches.find(function (e) {
              return e.identifier === t.identifier;
            });
          });
          this.processEvent(t) && (this.processMove(t, i), this.processStart());
        }
      },
      onMouseDown: function (t) {
        if (this.mouseMove && "buttons" in t && 1 === t.buttons && this.processEvent(t)) {
          var e = {
            fake: !0,
            clientX: t.clientX,
            clientY: t.clientY
          };
          this.touches = [e], this.processStart();
        }
      },
      onMouseMove: function (t) {
        this.touches.length && this.processEvent(t) && this.processMove(t, [{
          clientX: t.clientX,
          clientY: t.clientY
        }]);
      },
      onMouseUp: function () {
        this.touches = [], this.processEnd();
      },
      onWheel: function (t) {
        if (this.wheelResize && this.processEvent(t)) {
          var e = this.$refs.container.getBoundingClientRect(),
            i = e.left,
            n = e.top,
            s = 1 + this.wheelResize.ratio * (r = t.deltaY || t.detail || t.wheelDelta, 0 === (a = +r) || S(a) ? a : a > 0 ? 1 : -1),
            o = {
              left: t.clientX - i,
              top: t.clientY - n
            };
          this.$emit("resize", new M({}, {
            factor: s,
            center: o
          })), this.touches.length || this.debouncedProcessEnd();
        }
        var r, a;
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0),
  Nt = T({
    render: function () {
      var t = this,
        e = t.$createElement;
      return (t._self._c || e)("transformable-image", {
        attrs: {
          "touch-move": t.touchMove,
          "touch-resize": t.touchResize,
          "mouse-move": t.mouseMove,
          "wheel-resize": t.wheelResize
        },
        on: {
          move: function (e) {
            return t.$emit("move", e);
          },
          resize: function (e) {
            return t.$emit("resize", e);
          }
        }
      }, [t._t("default")], 2);
    },
    staticRenderFns: []
  }, undefined, {
    components: {
      TransformableImage: Ut
    },
    props: {
      touchMove: {
        type: Boolean,
        required: !0
      },
      mouseMove: {
        type: Boolean,
        required: !0
      },
      touchResize: {
        type: Boolean,
        required: !0
      },
      wheelResize: {
        type: [Boolean, Object],
        required: !0
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0),
  Vt = d("vue-preview"),
  Zt = T({
    render: function () {
      var t = this,
        e = t.$createElement,
        i = t._self._c || e;
      return i("div", {
        ref: "root",
        class: t.classes.root,
        style: t.style
      }, [i("div", {
        ref: "wrapper",
        class: t.classes.wrapper,
        style: t.wrapperStyle
      }, [i("img", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: t.image && t.image.src,
          expression: "image && image.src"
        }],
        ref: "image",
        class: t.classes.image,
        style: t.imageStyle,
        attrs: {
          src: t.image && t.image.src
        }
      })])]);
    },
    staticRenderFns: []
  }, undefined, {
    props: {
      coordinates: {
        type: Object
      },
      transitions: {
        type: Object
      },
      image: {
        type: Object,
        default: function () {
          return {};
        }
      },
      imageClass: {
        type: String
      },
      width: {
        type: Number
      },
      height: {
        type: Number
      },
      fill: {
        type: Boolean
      }
    },
    data: function () {
      return {
        calculatedImageSize: {
          width: 0,
          height: 0
        },
        calculatedSize: {
          width: 0,
          height: 0
        }
      };
    },
    computed: {
      classes: function () {
        return {
          root: Vt({
            fill: this.fill
          }),
          wrapper: Vt("wrapper"),
          imageWrapper: Vt("image-wrapper"),
          image: l(Vt("image"), this.imageClass)
        };
      },
      style: function () {
        if (this.fill) return {};
        var t = {};
        return this.width && (t.width = "".concat(this.size.width, "px")), this.height && (t.height = "".concat(this.size.height, "px")), this.transitions && this.transitions.enabled && (t.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction)), t;
      },
      wrapperStyle: function () {
        var t = {
          width: "".concat(this.size.width, "px"),
          height: "".concat(this.size.height, "px"),
          left: "calc(50% - ".concat(this.size.width / 2, "px)"),
          top: "calc(50% - ".concat(this.size.height / 2, "px)")
        };
        return this.transitions && this.transitions.enabled && (t.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction)), t;
      },
      imageStyle: function () {
        if (this.coordinates && this.image) {
          var t = this.coordinates.width / this.size.width,
            e = i(i({
              rotate: 0,
              flip: {
                horizontal: !1,
                vertical: !1
              }
            }, this.image.transforms), {}, {
              scaleX: 1 / t,
              scaleY: 1 / t
            }),
            n = this.imageSize.width,
            s = this.imageSize.height,
            o = it({
              width: n,
              height: s
            }, e.rotate),
            r = {
              width: "".concat(n, "px"),
              height: "".concat(s, "px"),
              left: "0px",
              top: "0px"
            },
            a = {
              rotate: {
                left: (n - o.width) * e.scaleX / 2,
                top: (s - o.height) * e.scaleY / 2
              },
              scale: {
                left: (1 - e.scaleX) * n / 2,
                top: (1 - e.scaleY) * s / 2
              }
            };
          return r.transform = "translate(\n\t\t\t\t".concat(-this.coordinates.left / t - a.rotate.left - a.scale.left, "px,").concat(-this.coordinates.top / t - a.rotate.top - a.scale.top, "px) ") + _t(e), this.transitions && this.transitions.enabled && (r.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction)), r;
        }
        return {};
      },
      size: function () {
        return {
          width: this.width || this.calculatedSize.width,
          height: this.height || this.calculatedSize.height
        };
      },
      imageSize: function () {
        return {
          width: this.image.width || this.calculatedImageSize.width,
          height: this.image.height || this.calculatedImageSize.height
        };
      }
    },
    watch: {
      image: function (t) {
        (t.width || t.height) && this.onChangeImage();
      }
    },
    mounted: function () {
      var t = this;
      this.onChangeImage(), this.$refs.image.addEventListener("load", function () {
        t.refreshImage();
      }), window.addEventListener("resize", this.refresh), window.addEventListener("orientationchange", this.refresh);
    },
    destroyed: function () {
      window.removeEventListener("resize", this.refresh), window.removeEventListener("orientationchange", this.refresh);
    },
    methods: {
      refreshImage: function () {
        var t = this.$refs.image;
        this.calculatedImageSize.height = t.naturalHeight, this.calculatedImageSize.width = t.naturalWidth;
      },
      refresh: function () {
        var t = this.$refs.root;
        this.width || (this.calculatedSize.width = t.clientWidth), this.height || (this.calculatedSize.height = t.clientHeight);
      },
      onChangeImage: function () {
        var t = this.$refs.image;
        t && t.complete && this.refreshImage(), this.refresh();
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0),
  qt = T({
    render: function () {
      var t = this,
        e = t.$createElement;
      return (t._self._c || e)("preview", t._b({
        attrs: {
          fill: !0
        }
      }, "preview", t.$attrs, !1));
    },
    staticRenderFns: []
  }, undefined, {
    components: {
      Preview: Zt
    },
    inheritAttrs: !1
  }, undefined, false, undefined, !1, void 0, void 0, void 0),
  Gt = d("vue-rectangle-stencil"),
  Qt = T({
    render: function () {
      var t = this,
        e = t.$createElement,
        i = t._self._c || e;
      return i("div", {
        class: t.classes.stencil,
        style: t.style
      }, [i("bounding-box", {
        class: t.classes.boundingBox,
        attrs: {
          width: t.stencilCoordinates.width,
          height: t.stencilCoordinates.height,
          transitions: t.transitions,
          handlers: t.handlers,
          "handlers-component": t.handlersComponent,
          "handlers-classes": t.handlersClasses,
          "handlers-wrappers-classes": t.handlersWrappersClasses,
          lines: t.lines,
          "lines-component": t.linesComponent,
          "lines-classes": t.linesClasses,
          "lines-wrappers-classes": t.linesWrappersClasses,
          resizable: t.resizable
        },
        on: {
          resize: t.onResize,
          "resize-end": t.onResizeEnd
        }
      }, [i("draggable-area", {
        attrs: {
          movable: t.movable
        },
        on: {
          move: t.onMove,
          "move-end": t.onMoveEnd
        }
      }, [i("stencil-preview", {
        class: t.classes.preview,
        attrs: {
          image: t.image,
          coordinates: t.coordinates,
          width: t.stencilCoordinates.width,
          height: t.stencilCoordinates.height,
          transitions: t.transitions
        }
      })], 1)], 1)], 1);
    },
    staticRenderFns: []
  }, undefined, {
    name: "RectangleStencil",
    components: {
      StencilPreview: qt,
      BoundingBox: Pt,
      DraggableArea: Lt
    },
    props: {
      image: {
        type: Object
      },
      coordinates: {
        type: Object
      },
      stencilCoordinates: {
        type: Object
      },
      handlers: {
        type: Object
      },
      handlersComponent: {
        type: [Object, String],
        default: function () {
          return Et;
        }
      },
      lines: {
        type: Object
      },
      linesComponent: {
        type: [Object, String],
        default: function () {
          return Ot;
        }
      },
      aspectRatio: {
        type: [Number, String]
      },
      minAspectRatio: {
        type: [Number, String]
      },
      maxAspectRatio: {
        type: [Number, String]
      },
      movable: {
        type: Boolean,
        default: !0
      },
      resizable: {
        type: Boolean,
        default: !0
      },
      transitions: {
        type: Object
      },
      movingClass: {
        type: String
      },
      resizingClass: {
        type: String
      },
      previewClass: {
        type: String
      },
      boundingBoxClass: {
        type: String
      },
      linesClasses: {
        type: Object,
        default: function () {
          return {};
        }
      },
      linesWrappersClasses: {
        type: Object,
        default: function () {
          return {};
        }
      },
      handlersClasses: {
        type: Object,
        default: function () {
          return {};
        }
      },
      handlersWrappersClasses: {
        type: Object,
        default: function () {
          return {};
        }
      }
    },
    data: function () {
      return {
        moving: !1,
        resizing: !1
      };
    },
    computed: {
      classes: function () {
        return {
          stencil: l(Gt({
            movable: this.movable,
            moving: this.moving,
            resizing: this.resizing
          }), this.moving && this.movingClass, this.resizing && this.resizingClass),
          preview: l(Gt("preview"), this.previewClass),
          boundingBox: l(Gt("bounding-box"), this.boundingBoxClass)
        };
      },
      style: function () {
        var t = this.stencilCoordinates,
          e = t.height,
          i = t.width,
          n = t.left,
          s = t.top,
          o = {
            width: "".concat(i, "px"),
            height: "".concat(e, "px"),
            transform: "translate(".concat(n, "px, ").concat(s, "px)")
          };
        return this.transitions && this.transitions.enabled && (o.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction)), o;
      }
    },
    methods: {
      onMove: function (t) {
        this.$emit("move", t), this.moving = !0;
      },
      onMoveEnd: function () {
        this.$emit("move-end"), this.moving = !1;
      },
      onResize: function (t) {
        this.$emit("resize", t), this.resizing = !0;
      },
      onResizeEnd: function () {
        this.$emit("resize-end"), this.resizing = !1;
      },
      aspectRatios: function () {
        return {
          minimum: this.aspectRatio || this.minAspectRatio,
          maximum: this.aspectRatio || this.maxAspectRatio
        };
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0),
  Kt = d("vue-circle-stencil"),
  Jt = T({
    render: function () {
      var t = this,
        e = t.$createElement,
        i = t._self._c || e;
      return i("div", {
        class: t.classes.stencil,
        style: t.style
      }, [i("bounding-box", {
        class: t.classes.boundingBox,
        attrs: {
          width: t.stencilCoordinates.width,
          height: t.stencilCoordinates.height,
          transitions: t.transitions,
          handlers: t.handlers,
          "handlers-component": t.handlersComponent,
          "handlers-classes": t.handlersClasses,
          "handlers-wrappers-classes": t.handlersWrappersClasses,
          lines: t.lines,
          "lines-component": t.linesComponent,
          "lines-classes": t.linesClasses,
          "lines-wrappers-classes": t.linesWrappersClasses,
          resizable: t.resizable
        },
        on: {
          resize: t.onResize,
          "resize-end": t.onResizeEnd
        }
      }, [i("draggable-area", {
        attrs: {
          movable: t.movable
        },
        on: {
          move: t.onMove,
          "move-end": t.onMoveEnd
        }
      }, [i("stencil-preview", {
        class: t.classes.preview,
        attrs: {
          image: t.image,
          coordinates: t.coordinates,
          width: t.stencilCoordinates.width,
          height: t.stencilCoordinates.height,
          transitions: t.transitions
        }
      })], 1)], 1)], 1);
    },
    staticRenderFns: []
  }, undefined, {
    components: {
      StencilPreview: qt,
      BoundingBox: Pt,
      DraggableArea: Lt
    },
    props: {
      image: {
        type: Object
      },
      coordinates: {
        type: Object
      },
      stencilCoordinates: {
        type: Object
      },
      handlers: {
        type: Object,
        default: function () {
          return {
            eastNorth: !0,
            westNorth: !0,
            westSouth: !0,
            eastSouth: !0
          };
        }
      },
      handlersComponent: {
        type: [Object, String],
        default: function () {
          return Et;
        }
      },
      handlersClasses: {
        type: Object,
        default: function () {
          return {};
        }
      },
      handlersWrappersClasses: {
        type: Object,
        default: function () {
          return {};
        }
      },
      lines: {
        type: Object
      },
      linesComponent: {
        type: [Object, String],
        default: function () {
          return Ot;
        }
      },
      linesClasses: {
        type: Object,
        default: function () {
          return {};
        }
      },
      linesWrappersClasses: {
        type: Object,
        default: function () {
          return {};
        }
      },
      movable: {
        type: Boolean,
        default: !0
      },
      resizable: {
        type: Boolean,
        default: !0
      },
      transitions: {
        type: Object
      },
      movingClass: {
        type: String
      },
      resizingClass: {
        type: String
      },
      previewClass: {
        type: String
      },
      boundingBoxClass: {
        type: String
      }
    },
    data: function () {
      return {
        moving: !1,
        resizing: !1
      };
    },
    computed: {
      classes: function () {
        return {
          stencil: l(Kt({
            movable: this.movable,
            moving: this.moving,
            resizing: this.resizing
          }), this.moving && this.movingClass, this.resizing && this.resizingClass),
          preview: l(Kt("preview"), this.previewClass),
          boundingBox: l(Kt("bounding-box"), this.boundingBoxClass)
        };
      },
      style: function () {
        var t = this.stencilCoordinates,
          e = t.height,
          i = t.width,
          n = t.left,
          s = t.top,
          o = {
            width: "".concat(i, "px"),
            height: "".concat(e, "px"),
            transform: "translate(".concat(n, "px, ").concat(s, "px)")
          };
        return this.transitions && this.transitions.enabled && (o.transition = "".concat(this.transitions.time, "ms ").concat(this.transitions.timingFunction)), o;
      }
    },
    methods: {
      onMove: function (t) {
        this.$emit("move", t), this.moving = !0;
      },
      onMoveEnd: function () {
        this.$emit("move-end"), this.moving = !1;
      },
      onResize: function (t) {
        this.$emit("resize", t), this.resizing = !0;
      },
      onResizeEnd: function () {
        this.$emit("resize-end"), this.resizing = !1;
      },
      aspectRatios: function () {
        return {
          minimum: 1,
          maximum: 1
        };
      }
    }
  }, undefined, false, undefined, !1, void 0, void 0, void 0);
var te = ["transitions"],
  ee = d("vue-advanced-cropper"),
  ie = {
    name: "Cropper",
    components: {
      BackgroundWrapper: Nt
    },
    props: {
      src: {
        type: String,
        default: null
      },
      stencilComponent: {
        type: [Object, String],
        default: function () {
          return Qt;
        }
      },
      backgroundWrapperComponent: {
        type: [Object, String],
        default: function () {
          return Nt;
        }
      },
      stencilProps: {
        type: Object,
        default: function () {
          return {};
        }
      },
      autoZoom: {
        type: Boolean,
        default: !1
      },
      imageClass: {
        type: String
      },
      boundariesClass: {
        type: String
      },
      backgroundClass: {
        type: String
      },
      foregroundClass: {
        type: String
      },
      minWidth: {
        type: [Number, String]
      },
      minHeight: {
        type: [Number, String]
      },
      maxWidth: {
        type: [Number, String]
      },
      maxHeight: {
        type: [Number, String]
      },
      debounce: {
        type: [Boolean, Number],
        default: 500
      },
      transitions: {
        type: Boolean,
        default: !0
      },
      checkOrientation: {
        type: Boolean,
        default: !0
      },
      canvas: {
        type: [Object, Boolean],
        default: !0
      },
      crossOrigin: {
        type: [Boolean, String],
        default: void 0
      },
      transitionTime: {
        type: Number,
        default: 300
      },
      imageRestriction: {
        type: String,
        default: "fit-area",
        validator: function (t) {
          return -1 !== _.indexOf(t);
        }
      },
      roundResult: {
        type: Boolean,
        default: !0
      },
      defaultSize: {
        type: [Function, Object]
      },
      defaultPosition: {
        type: [Function, Object],
        default: function (t) {
          var e = t.imageSize,
            i = t.visibleArea,
            n = t.coordinates,
            s = i || e;
          return {
            left: (i ? i.left : 0) + s.width / 2 - n.width / 2,
            top: (i ? i.top : 0) + s.height / 2 - n.height / 2
          };
        }
      },
      defaultVisibleArea: {
        type: [Function, Object],
        default: function (t) {
          var e = t.getAreaRestrictions,
            i = t.coordinates,
            n = t.imageSize,
            s = Q(t.boundaries);
          if (i) {
            var o = {
                height: Math.max(i.height, n.height),
                width: Math.max(i.width, n.width)
              },
              r = et({
                width: Q(o) > s ? o.width : o.height * s,
                height: Q(o) > s ? o.width / s : o.height
              }, rt(e())),
              a = {
                left: i.left + i.width / 2 - r.width / 2,
                top: i.top + i.height / 2 - r.height / 2,
                width: r.width,
                height: r.height
              },
              h = N(i, Y(f({
                left: 0,
                top: 0
              }, n))),
              c = {};
            return !h.left && !h.right && a.width <= n.width && (c.left = 0, c.right = n.width), !h.top && !h.bottom && a.height <= n.height && (c.top = 0, c.bottom = n.height), ot(a, c);
          }
          var l = Q(n);
          return r = {
            height: l > s ? n.height : n.width / s,
            width: l > s ? n.height * s : n.width
          }, {
            left: n.width / 2 - r.width / 2,
            top: n.height / 2 - r.height / 2,
            width: r.width,
            height: r.height
          };
        }
      },
      defaultTransforms: {
        type: [Function, Object]
      },
      defaultBoundaries: {
        type: [Function, String],
        validator: function (t) {
          return !("string" == typeof t && "fill" !== t && "fit" !== t);
        }
      },
      priority: {
        type: String,
        default: "coordinates"
      },
      stencilSize: {
        type: [Object, Function]
      },
      resizeImage: {
        type: [Boolean, Object],
        default: !0
      },
      moveImage: {
        type: [Boolean, Object],
        default: !0
      },
      autoZoomAlgorithm: {
        type: Function
      },
      resizeAlgorithm: {
        type: Function,
        default: function (t) {
          var e = t.event,
            i = t.coordinates,
            n = t.aspectRatio,
            s = t.positionRestrictions,
            o = t.sizeRestrictions,
            r = f(f({}, i), {
              right: i.left + i.width,
              bottom: i.top + i.height
            }),
            a = e.params || {},
            h = f({}, e.directions),
            c = a.allowedDirections || {
              left: !0,
              right: !0,
              bottom: !0,
              top: !0
            };
          o.widthFrozen && (h.left = 0, h.right = 0), o.heightFrozen && (h.top = 0, h.bottom = 0), D.forEach(function (t) {
            c[t] || (h[t] = 0);
          });
          var l = V(r, h = St({
              coordinates: r,
              directions: h,
              sizeRestrictions: o,
              positionRestrictions: s
            })).width,
            d = V(r, h).height,
            u = a.preserveRatio ? Q(r) : tt(l / d, n);
          if (u) {
            var m = a.respectDirection;
            if (m || (m = r.width >= r.height || 1 === u ? "width" : "height"), "width" === m) {
              var p = l / u - r.height;
              if (c.top && c.bottom) {
                var g = h.top,
                  v = h.bottom;
                h.bottom = xt(p, v, g), h.top = xt(p, g, v);
              } else c.bottom ? h.bottom = p : c.top ? h.top = p : c.right ? h.right = 0 : c.left && (h.left = 0);
            } else if ("height" === m) {
              var b = r.width - d * u;
              if (c.left && c.right) {
                var w = h.left,
                  y = h.right;
                h.left = -xt(b, w, y), h.right = -xt(b, y, w);
              } else c.left ? h.left = -b : c.right ? h.right = -b : c.top ? h.top = 0 : c.bottom && (h.bottom = 0);
            }
            h = St({
              directions: h,
              coordinates: r,
              sizeRestrictions: o,
              positionRestrictions: s,
              preserveRatio: !0,
              compensate: a.compensate
            });
          }
          return l = V(r, h).width, d = V(r, h).height, (u = a.preserveRatio ? Q(r) : tt(l / d, n)) && Math.abs(u - l / d) > .001 && D.forEach(function (t) {
            c[t] || (h[t] = 0);
          }), mt({
            event: new E({
              left: -h.left,
              top: -h.top
            }),
            coordinates: {
              width: i.width + h.right + h.left,
              height: i.height + h.top + h.bottom,
              left: i.left,
              top: i.top
            },
            positionRestrictions: s
          });
        }
      },
      moveAlgorithm: {
        type: Function,
        default: mt
      },
      initStretcher: {
        type: Function,
        default: function (t) {
          var e = t.stretcher,
            i = t.imageSize,
            n = Q(i);
          e.style.width = i.width + "px", e.style.height = e.clientWidth / n + "px", e.style.width = e.clientWidth + "px";
        }
      },
      fitCoordinates: {
        type: Function,
        default: function (t) {
          var e = t.visibleArea,
            i = t.coordinates,
            n = t.aspectRatio,
            s = t.sizeRestrictions,
            o = t.positionRestrictions,
            r = f(f({}, i), ut({
              width: i.width,
              height: i.height,
              aspectRatio: n,
              sizeRestrictions: {
                maxWidth: e.width,
                maxHeight: e.height,
                minHeight: Math.min(e.height, s.minHeight),
                minWidth: Math.min(e.width, s.minWidth)
              }
            }));
          return r = ot(r = q(r, k(U(i), U(r))), ct(Y(e), o));
        }
      },
      fitVisibleArea: {
        type: Function,
        default: function (t) {
          var e = t.visibleArea,
            i = t.boundaries,
            n = t.getAreaRestrictions,
            s = t.coordinates,
            o = f({}, e);
          o.height = o.width / Q(i), o.top += (e.height - o.height) / 2, (s.height - o.height > 0 || s.width - o.width > 0) && (o = G(o, Math.max(s.height / o.height, s.width / o.width)));
          var r = Z(J(s, Y(o = G(o, st(o, n({
            visibleArea: o,
            type: "resize"
          }))))));
          return o.width < s.width && (r.left = 0), o.height < s.height && (r.top = 0), o = ot(o = q(o, r), n({
            visibleArea: o,
            type: "move"
          }));
        }
      },
      areaRestrictionsAlgorithm: {
        type: Function,
        default: function (t) {
          var e = t.visibleArea,
            i = t.boundaries,
            n = t.imageSize,
            s = t.imageRestriction,
            o = t.type,
            r = {};
          return "fill-area" === s ? r = {
            left: 0,
            top: 0,
            right: n.width,
            bottom: n.height
          } : "fit-area" === s && (Q(i) > Q(n) ? (r = {
            top: 0,
            bottom: n.height
          }, e && "move" === o && (e.width > n.width ? (r.left = -(e.width - n.width) / 2, r.right = n.width - r.left) : (r.left = 0, r.right = n.width))) : (r = {
            left: 0,
            right: n.width
          }, e && "move" === o && (e.height > n.height ? (r.top = -(e.height - n.height) / 2, r.bottom = n.height - r.top) : (r.top = 0, r.bottom = n.height)))), r;
        }
      },
      sizeRestrictionsAlgorithm: {
        type: Function,
        default: function (t) {
          return {
            minWidth: t.minWidth,
            minHeight: t.minHeight,
            maxWidth: t.maxWidth,
            maxHeight: t.maxHeight
          };
        }
      },
      positionRestrictionsAlgorithm: {
        type: Function,
        default: function (t) {
          var e = t.imageSize,
            i = {};
          return "none" !== t.imageRestriction && (i = {
            left: 0,
            top: 0,
            right: e.width,
            bottom: e.height
          }), i;
        }
      }
    },
    data: function () {
      return {
        transitionsActive: !1,
        imageLoaded: !1,
        imageAttributes: {
          width: null,
          height: null,
          crossOrigin: !1,
          src: null
        },
        defaultImageTransforms: {
          rotate: 0,
          flip: {
            horizontal: !1,
            vertical: !1
          }
        },
        appliedImageTransforms: {
          rotate: 0,
          flip: {
            horizontal: !1,
            vertical: !1
          }
        },
        boundaries: {
          width: 0,
          height: 0
        },
        visibleArea: null,
        coordinates: i({}, F)
      };
    },
    computed: {
      image: function () {
        return {
          src: this.imageAttributes.src,
          width: this.imageAttributes.width,
          height: this.imageAttributes.height,
          transforms: this.imageTransforms
        };
      },
      imageTransforms: function () {
        return {
          rotate: this.appliedImageTransforms.rotate,
          flip: {
            horizontal: this.appliedImageTransforms.flip.horizontal,
            vertical: this.appliedImageTransforms.flip.vertical
          },
          translateX: this.visibleArea ? this.visibleArea.left / this.coefficient : 0,
          translateY: this.visibleArea ? this.visibleArea.top / this.coefficient : 0,
          scaleX: 1 / this.coefficient,
          scaleY: 1 / this.coefficient
        };
      },
      imageSize: function () {
        var t = function (t) {
          return t * Math.PI / 180;
        }(this.imageTransforms.rotate);
        return {
          width: Math.abs(this.imageAttributes.width * Math.cos(t)) + Math.abs(this.imageAttributes.height * Math.sin(t)),
          height: Math.abs(this.imageAttributes.width * Math.sin(t)) + Math.abs(this.imageAttributes.height * Math.cos(t))
        };
      },
      initialized: function () {
        return Boolean(this.visibleArea && this.imageLoaded);
      },
      settings: function () {
        var t = z(this.resizeImage, {
          touch: !0,
          wheel: {
            ratio: .1
          },
          adjustStencil: !0
        }, {
          touch: !1,
          wheel: !1,
          adjustStencil: !1
        });
        return {
          moveImage: z(this.moveImage, {
            touch: !0,
            mouse: !0
          }, {
            touch: !1,
            mouse: !1
          }),
          resizeImage: t
        };
      },
      coefficient: function () {
        return this.visibleArea ? this.visibleArea.width / this.boundaries.width : 0;
      },
      areaRestrictions: function () {
        return this.imageLoaded ? this.areaRestrictionsAlgorithm({
          imageSize: this.imageSize,
          imageRestriction: this.imageRestriction,
          boundaries: this.boundaries
        }) : {};
      },
      transitionsOptions: function () {
        return {
          enabled: this.transitionsActive,
          timingFunction: "ease-in-out",
          time: 350
        };
      },
      sizeRestrictions: function () {
        if (this.boundaries.width && this.boundaries.height && this.imageSize.width && this.imageSize.height) {
          var t = this.sizeRestrictionsAlgorithm({
            imageSize: this.imageSize,
            minWidth: w(this.minWidth) ? 0 : R(this.minWidth),
            minHeight: w(this.minHeight) ? 0 : R(this.minHeight),
            maxWidth: w(this.maxWidth) ? 1 / 0 : R(this.maxWidth),
            maxHeight: w(this.maxHeight) ? 1 / 0 : R(this.maxHeight)
          });
          if (t = function (t) {
            var e = t.areaRestrictions,
              i = t.sizeRestrictions;
            t.imageSize;
            var n = t.boundaries,
              s = t.positionRestrictions;
            t.imageRestriction;
            var o = f(f({}, i), {
              minWidth: void 0 !== i.minWidth ? i.minWidth : 0,
              minHeight: void 0 !== i.minHeight ? i.minHeight : 0,
              maxWidth: void 0 !== i.maxWidth ? i.maxWidth : 1 / 0,
              maxHeight: void 0 !== i.maxHeight ? i.maxHeight : 1 / 0
            });
            void 0 !== s.left && void 0 !== s.right && (o.maxWidth = Math.min(o.maxWidth, s.right - s.left)), void 0 !== s.bottom && void 0 !== s.top && (o.maxHeight = Math.min(o.maxHeight, s.bottom - s.top));
            var r = rt(e),
              a = et(n, r);
            return r.width < 1 / 0 && (!o.maxWidth || o.maxWidth > a.width) && (o.maxWidth = Math.min(o.maxWidth, a.width)), r.height < 1 / 0 && (!o.maxHeight || o.maxHeight > a.height) && (o.maxHeight = Math.min(o.maxHeight, a.height)), o.minWidth > o.maxWidth && (o.minWidth = o.maxWidth, o.widthFrozen = !0), o.minHeight > o.maxHeight && (o.minHeight = o.maxHeight, o.heightFrozen = !0), o;
          }({
            sizeRestrictions: t,
            areaRestrictions: this.getAreaRestrictions({
              visibleArea: this.visibleArea,
              type: "resize"
            }),
            imageSize: this.imageSize,
            boundaries: this.boundaries,
            positionRestrictions: this.positionRestrictions,
            imageRestriction: this.imageRestriction,
            visibleArea: this.visibleArea,
            stencilSize: this.getStencilSize()
          }), this.visibleArea && this.stencilSize) {
            var e = this.getStencilSize(),
              i = rt(this.getAreaRestrictions({
                visibleArea: this.visibleArea,
                type: "resize"
              }));
            t.maxWidth = Math.min(t.maxWidth, i.width * e.width / this.boundaries.width), t.maxHeight = Math.min(t.maxHeight, i.height * e.height / this.boundaries.height), t.maxWidth < t.minWidth && (t.minWidth = t.maxWidth), t.maxHeight < t.minHeight && (t.minHeight = t.maxHeight);
          }
          return t;
        }
        return {
          minWidth: 0,
          minHeight: 0,
          maxWidth: 0,
          maxHeight: 0
        };
      },
      positionRestrictions: function () {
        return this.positionRestrictionsAlgorithm({
          imageSize: this.imageSize,
          imageRestriction: this.imageRestriction
        });
      },
      classes: function () {
        return {
          cropper: ee(),
          image: l(ee("image"), this.imageClass),
          stencil: ee("stencil"),
          boundaries: l(ee("boundaries"), this.boundariesClass),
          stretcher: l(ee("stretcher")),
          background: l(ee("background"), this.backgroundClass),
          foreground: l(ee("foreground"), this.foregroundClass),
          imageWrapper: l(ee("image-wrapper")),
          cropperWrapper: l(ee("cropper-wrapper"))
        };
      },
      stencilCoordinates: function () {
        if (this.initialized) {
          var t = this.coordinates,
            e = t.width,
            i = t.height,
            n = t.left,
            s = t.top;
          return {
            width: e / this.coefficient,
            height: i / this.coefficient,
            left: (n - this.visibleArea.left) / this.coefficient,
            top: (s - this.visibleArea.top) / this.coefficient
          };
        }
        return this.defaultCoordinates();
      },
      boundariesStyle: function () {
        var t = {
          width: this.boundaries.width ? "".concat(Math.round(this.boundaries.width), "px") : "auto",
          height: this.boundaries.height ? "".concat(Math.round(this.boundaries.height), "px") : "auto",
          transition: "opacity ".concat(this.transitionTime, "ms"),
          pointerEvents: this.imageLoaded ? "all" : "none"
        };
        return this.imageLoaded || (t.opacity = "0"), t;
      },
      imageStyle: function () {
        var t = this.imageAttributes.width > this.imageAttributes.height ? {
            width: Math.min(1024, this.imageAttributes.width),
            height: Math.min(1024, this.imageAttributes.width) / (this.imageAttributes.width / this.imageAttributes.height)
          } : {
            height: Math.min(1024, this.imageAttributes.height),
            width: Math.min(1024, this.imageAttributes.height) * (this.imageAttributes.width / this.imageAttributes.height)
          },
          e = {
            left: (t.width - this.imageSize.width) / (2 * this.coefficient),
            top: (t.height - this.imageSize.height) / (2 * this.coefficient)
          },
          n = {
            left: (1 - 1 / this.coefficient) * t.width / 2,
            top: (1 - 1 / this.coefficient) * t.height / 2
          },
          s = i(i({}, this.imageTransforms), {}, {
            scaleX: this.imageTransforms.scaleX * (this.imageAttributes.width / t.width),
            scaleY: this.imageTransforms.scaleY * (this.imageAttributes.height / t.height)
          }),
          o = {
            width: "".concat(t.width, "px"),
            height: "".concat(t.height, "px"),
            left: "0px",
            top: "0px",
            transform: "translate(".concat(-e.left - n.left - this.imageTransforms.translateX, "px, ").concat(-e.top - n.top - this.imageTransforms.translateY, "px)") + _t(s)
          };
        return this.transitionsOptions.enabled && (o.transition = "".concat(this.transitionsOptions.time, "ms ").concat(this.transitionsOptions.timingFunction)), o;
      }
    },
    watch: {
      src: function () {
        this.onChangeImage();
      },
      stencilComponent: function () {
        var t = this;
        this.$nextTick(function () {
          t.resetCoordinates(), t.runAutoZoom("setCoordinates"), t.onChange();
        });
      },
      minWidth: function () {
        this.onPropsChange();
      },
      maxWidth: function () {
        this.onPropsChange();
      },
      minHeight: function () {
        this.onPropsChange();
      },
      maxHeight: function () {
        this.onPropsChange();
      },
      imageRestriction: function () {
        this.reset();
      },
      stencilProps: function (t, e) {
        ["aspectRatio", "minAspectRatio", "maxAspectRatio"].find(function (i) {
          return t[i] !== e[i];
        }) && this.$nextTick(this.onPropsChange);
      }
    },
    created: function () {
      this.debouncedUpdate = m(this.update, this.debounce), this.debouncedDisableTransitions = m(this.disableTransitions, this.transitionsOptions.time), this.awaiting = !1;
    },
    mounted: function () {
      this.$refs.image.addEventListener("load", this.onSuccessLoadImage), this.$refs.image.addEventListener("error", this.onFailLoadImage), this.onChangeImage(), window.addEventListener("resize", this.refresh), window.addEventListener("orientationchange", this.refresh);
    },
    destroyed: function () {
      window.removeEventListener("resize", this.refresh), window.removeEventListener("orientationchange", this.refresh), this.imageAttributes.revoke && this.imageAttributes.src && URL.revokeObjectURL(this.imageAttributes.src), this.debouncedUpdate.clear(), this.debouncedDisableTransitions.clear();
    },
    methods: {
      getResult: function () {
        var t = this.initialized ? this.prepareResult(i({}, this.coordinates)) : this.defaultCoordinates(),
          e = {
            rotate: this.imageTransforms.rotate % 360,
            flip: i({}, this.imageTransforms.flip)
          };
        if (this.src && this.imageLoaded) {
          var n = this;
          return {
            image: this.image,
            coordinates: t,
            visibleArea: this.visibleArea ? i({}, this.visibleArea) : null,
            imageTransforms: e,
            get canvas() {
              return n.canvas ? n.getCanvas() : void 0;
            }
          };
        }
        return {
          image: this.image,
          coordinates: t,
          visibleArea: this.visibleArea ? i({}, this.visibleArea) : null,
          canvas: void 0,
          imageTransforms: e
        };
      },
      zoom: function (t, e) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          n = i.transitions,
          s = void 0 === n || n;
        this.onManipulateImage(new M({}, {
          factor: 1 / t,
          center: e
        }), {
          normalize: !1,
          transitions: s
        });
      },
      move: function (t, e) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          n = i.transitions,
          s = void 0 === n || n;
        this.onManipulateImage(new M({
          left: t || 0,
          top: e || 0
        }), {
          normalize: !1,
          transitions: s
        });
      },
      setCoordinates: function (t) {
        var e = this,
          i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = i.autoZoom,
          s = void 0 === n || n,
          o = i.transitions,
          r = void 0 === o || o;
        this.$nextTick(function () {
          e.imageLoaded ? (e.transitionsActive || (r && e.enableTransitions(), e.coordinates = e.applyTransform(t), s && e.runAutoZoom("setCoordinates"), r && e.debouncedDisableTransitions()), e.onChange()) : e.delayedTransforms = t;
        });
      },
      refresh: function () {
        var t = this,
          e = this.$refs.image;
        if (this.src && e) return this.initialized ? this.updateVisibleArea().then(function () {
          t.onChange();
        }) : this.resetVisibleArea().then(function () {
          t.onChange();
        });
      },
      reset: function () {
        var t = this;
        return this.resetVisibleArea().then(function () {
          t.onChange(!1);
        });
      },
      awaitRender: function (t) {
        var e = this;
        this.awaiting || (this.awaiting = !0, this.$nextTick(function () {
          t(), e.awaiting = !1;
        }));
      },
      prepareResult: function (t) {
        return this.roundResult ? function (t) {
          var e = t.coordinates,
            i = t.sizeRestrictions,
            n = t.positionRestrictions,
            s = {
              width: Math.round(e.width),
              height: Math.round(e.height),
              left: Math.round(e.left),
              top: Math.round(e.top)
            };
          return s.width > i.maxWidth ? s.width = Math.floor(e.width) : s.width < i.minWidth && (s.width = Math.ceil(e.width)), s.height > i.maxHeight ? s.height = Math.floor(e.height) : s.height < i.minHeight && (s.height = Math.ceil(e.height)), ot(s, n);
        }(i(i({}, this.getPublicProperties()), {}, {
          positionRestrictions: yt(this.positionRestrictions, this.visibleArea),
          coordinates: t
        })) : t;
      },
      processAutoZoom: function (t, e, n, s) {
        var o = this.autoZoomAlgorithm;
        o || (o = this.stencilSize ? pt : this.autoZoom ? gt : vt);
        var r = o({
          event: {
            type: t,
            params: s
          },
          visibleArea: e,
          coordinates: n,
          boundaries: this.boundaries,
          aspectRatio: this.getAspectRatio(),
          positionRestrictions: this.positionRestrictions,
          getAreaRestrictions: this.getAreaRestrictions,
          sizeRestrictions: this.sizeRestrictions,
          stencilSize: this.getStencilSize()
        });
        return i(i({}, r), {}, {
          changed: !X(r.visibleArea, e) || !X(r.coordinates, n)
        });
      },
      runAutoZoom: function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          i = e.transitions,
          n = void 0 !== i && i,
          o = s(e, te),
          r = this.processAutoZoom(t, this.visibleArea, this.coordinates, o),
          a = r.visibleArea,
          h = r.coordinates,
          c = r.changed;
        n && c && this.enableTransitions(), this.visibleArea = a, this.coordinates = h, n && c && this.debouncedDisableTransitions();
      },
      normalizeEvent: function (t) {
        return function (t) {
          var e = t.event,
            i = t.visibleArea,
            n = t.coefficient;
          if ("manipulateImage" === e.type) return f(f({}, e), {
            move: {
              left: e.move && e.move.left ? n * e.move.left : 0,
              top: e.move && e.move.top ? n * e.move.top : 0
            },
            scale: {
              factor: e.scale && e.scale.factor ? e.scale.factor : 1,
              center: e.scale && e.scale.center ? {
                left: e.scale.center.left * n + i.left,
                top: e.scale.center.top * n + i.top
              } : null
            }
          });
          if ("resize" === e.type) {
            var s = f(f({}, e), {
              directions: f({}, e.directions)
            });
            return D.forEach(function (t) {
              s.directions[t] *= n;
            }), s;
          }
          if ("move" === e.type) {
            var o = f(f({}, e), {
              directions: f({}, e.directions)
            });
            return B.forEach(function (t) {
              o.directions[t] *= n;
            }), o;
          }
          return e;
        }(i(i({}, this.getPublicProperties()), {}, {
          event: t
        }));
      },
      getCanvas: function () {
        if (this.$refs.canvas) {
          var t = this.$refs.canvas,
            e = this.$refs.image,
            n = 0 !== this.imageTransforms.rotate || this.imageTransforms.flip.horizontal || this.imageTransforms.flip.vertical ? function (t, e, i) {
              var n = i.rotate,
                s = i.flip,
                o = {
                  width: e.naturalWidth,
                  height: e.naturalHeight
                },
                r = it(o, n),
                a = t.getContext("2d");
              t.height = r.height, t.width = r.width, a.save();
              var h = nt(U(f({
                left: 0,
                top: 0
              }, o)), n);
              return a.translate(-(h.left - r.width / 2), -(h.top - r.height / 2)), a.rotate(n * Math.PI / 180), a.translate(s.horizontal ? o.width : 0, s.vertical ? o.height : 0), a.scale(s.horizontal ? -1 : 1, s.vertical ? -1 : 1), a.drawImage(e, 0, 0, o.width, o.height), a.restore(), t;
            }(this.$refs.sourceCanvas, e, this.imageTransforms) : e,
            s = i({
              minWidth: 0,
              minHeight: 0,
              maxWidth: 1 / 0,
              maxHeight: 1 / 0,
              maxArea: this.maxCanvasSize,
              imageSmoothingEnabled: !0,
              imageSmoothingQuality: "high",
              fillColor: "transparent"
            }, this.canvas),
            o = function (t) {
              return t.find(function (t) {
                return e = t, !Number.isNaN(parseFloat(e)) && isFinite(e);
                var e;
              });
            },
            r = ut({
              sizeRestrictions: {
                minWidth: o([s.width, s.minWidth]) || 0,
                minHeight: o([s.height, s.minHeight]) || 0,
                maxWidth: o([s.width, s.maxWidth]) || 1 / 0,
                maxHeight: o([s.height, s.maxHeight]) || 1 / 0
              },
              width: this.coordinates.width,
              height: this.coordinates.height,
              aspectRatio: {
                minimum: this.coordinates.width / this.coordinates.height,
                maximum: this.coordinates.width / this.coordinates.height
              }
            });
          if (s.maxArea && r.width * r.height > s.maxArea) {
            var a = Math.sqrt(s.maxArea / (r.width * r.height));
            r = {
              width: Math.round(a * r.width),
              height: Math.round(a * r.height)
            };
          }
          return function (t, e, i, n, s) {
            t.width = n ? n.width : i.width, t.height = n ? n.height : i.height;
            var o = t.getContext("2d");
            o.clearRect(0, 0, t.width, t.height), s && (s.imageSmoothingEnabled && (o.imageSmoothingEnabled = s.imageSmoothingEnabled), s.imageSmoothingQuality && (o.imageSmoothingQuality = s.imageSmoothingQuality), s.fillColor && (o.fillStyle = s.fillColor, o.fillRect(0, 0, t.width, t.height), o.save()));
            var r = i.left < 0 ? -i.left : 0,
              a = i.top < 0 ? -i.top : 0;
            o.drawImage(e, i.left + r, i.top + a, i.width, i.height, r, a, t.width, t.height);
          }(t, n, this.coordinates, r, s), t;
        }
      },
      update: function () {
        this.$emit("change", this.getResult());
      },
      applyTransform: function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          i = this.visibleArea && e ? at(this.sizeRestrictions, this.visibleArea) : this.sizeRestrictions,
          n = this.visibleArea && e ? yt(this.positionRestrictions, this.visibleArea) : this.positionRestrictions;
        return ft({
          transform: t,
          coordinates: this.coordinates,
          imageSize: this.imageSize,
          sizeRestrictions: i,
          positionRestrictions: n,
          aspectRatio: this.getAspectRatio(),
          visibleArea: this.visibleArea
        });
      },
      resetCoordinates: function () {
        var t = this;
        if (this.$refs.image) {
          this.$refs.cropper, this.$refs.image;
          var e = this.defaultSize;
          e || (e = this.stencilSize ? wt : bt);
          var n = this.sizeRestrictions;
          n.minWidth, n.minHeight, n.maxWidth, n.maxHeight;
          var s = [b(e) ? e({
            boundaries: this.boundaries,
            imageSize: this.imageSize,
            aspectRatio: this.getAspectRatio(),
            sizeRestrictions: this.sizeRestrictions,
            stencilSize: this.getStencilSize(),
            visibleArea: this.visibleArea
          }) : e, function (e) {
            var n = e.coordinates;
            return i({}, b(t.defaultPosition) ? t.defaultPosition({
              coordinates: n,
              imageSize: t.imageSize,
              visibleArea: t.visibleArea
            }) : t.defaultPosition);
          }];
          this.delayedTransforms && s.push.apply(s, o(Array.isArray(this.delayedTransforms) ? this.delayedTransforms : [this.delayedTransforms])), this.coordinates = this.applyTransform(s, !0), this.delayedTransforms = null;
        }
      },
      clearImage: function () {
        var t = this;
        this.imageLoaded = !1, setTimeout(function () {
          var e = t.$refs.stretcher;
          e && (e.style.height = "auto", e.style.width = "auto"), t.coordinates = t.defaultCoordinates(), t.boundaries = {
            width: 0,
            height: 0
          };
        }, this.transitionTime);
      },
      enableTransitions: function () {
        this.transitions && (this.transitionsActive = !0);
      },
      disableTransitions: function () {
        this.transitionsActive = !1;
      },
      updateBoundaries: function () {
        var t = this,
          e = this.$refs.stretcher,
          i = this.$refs.cropper;
        return this.initStretcher({
          cropper: i,
          stretcher: e,
          imageSize: this.imageSize
        }), this.$nextTick().then(function () {
          var e = {
            cropper: i,
            imageSize: t.imageSize
          };
          if (b(t.defaultBoundaries) ? t.boundaries = t.defaultBoundaries(e) : "fit" === t.defaultBoundaries ? t.boundaries = function (t) {
            var e = t.cropper,
              i = t.imageSize,
              n = e.clientHeight,
              s = e.clientWidth,
              o = n,
              r = i.width * n / i.height;
            return r > s && (r = s, o = i.height * s / i.width), {
              width: r,
              height: o
            };
          }(e) : t.boundaries = function (t) {
            var e = t.cropper;
            return {
              width: e.clientWidth,
              height: e.clientHeight
            };
          }(e), !t.boundaries.width || !t.boundaries.height) throw new Error("It's impossible to fit the cropper in the current container");
        });
      },
      resetVisibleArea: function () {
        var t = this;
        return this.appliedImageTransforms = i(i({}, this.defaultImageTransforms), {}, {
          flip: i({}, this.defaultImageTransforms.flip)
        }), this.updateBoundaries().then(function () {
          var e, i, n, s, o, r;
          "visible-area" !== t.priority && (t.visibleArea = null, t.resetCoordinates()), t.visibleArea = b(t.defaultVisibleArea) ? t.defaultVisibleArea({
            imageSize: t.imageSize,
            boundaries: t.boundaries,
            coordinates: "visible-area" !== t.priority ? t.coordinates : null,
            getAreaRestrictions: t.getAreaRestrictions,
            stencilSize: t.getStencilSize()
          }) : t.defaultVisibleArea, t.visibleArea = (e = {
            visibleArea: t.visibleArea,
            boundaries: t.boundaries,
            getAreaRestrictions: t.getAreaRestrictions
          }, i = e.visibleArea, n = e.boundaries, s = e.getAreaRestrictions, o = f({}, i), r = Q(n), o.width / o.height !== r && (o.height = o.width / r), ot(o, s({
            visibleArea: o,
            type: "move"
          }))), "visible-area" === t.priority ? t.resetCoordinates() : t.coordinates = t.fitCoordinates({
            visibleArea: t.visibleArea,
            coordinates: t.coordinates,
            aspectRatio: t.getAspectRatio(),
            positionRestrictions: t.positionRestrictions,
            sizeRestrictions: t.sizeRestrictions
          }), t.runAutoZoom("resetVisibleArea");
        }).catch(function () {
          t.visibleArea = null;
        });
      },
      updateVisibleArea: function () {
        var t = this;
        return this.updateBoundaries().then(function () {
          t.visibleArea = t.fitVisibleArea({
            imageSize: t.imageSize,
            boundaries: t.boundaries,
            visibleArea: t.visibleArea,
            coordinates: t.coordinates,
            getAreaRestrictions: t.getAreaRestrictions
          }), t.coordinates = t.fitCoordinates({
            visibleArea: t.visibleArea,
            coordinates: t.coordinates,
            aspectRatio: t.getAspectRatio(),
            positionRestrictions: t.positionRestrictions,
            sizeRestrictions: t.sizeRestrictions
          }), t.runAutoZoom("updateVisibleArea");
        }).catch(function () {
          t.visibleArea = null;
        });
      },
      onChange: function () {
        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        this.$listeners && this.$listeners.change && (t && this.debounce ? this.debouncedUpdate() : this.update());
      },
      onChangeImage: function () {
        var t,
          e = this;
        if (this.imageLoaded = !1, this.delayedTransforms = null, this.src) {
          if (function (t) {
            if (v(t)) return !1;
            var e = window.location,
              i = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/.exec(t) || [],
              n = {
                protocol: i[1] || "",
                host: i[2] || "",
                port: i[3] || ""
              },
              s = function (t) {
                return t.port || ("http" === (t.protocol || e.protocol) ? 80 : 433);
              };
            return !(!n.protocol && !n.host && !n.port || Boolean(n.protocol && n.protocol == e.protocol && n.host && n.host == e.host && n.host && s(n) == s(e)));
          }(this.src)) {
            var i = w(this.crossOrigin) ? this.canvas : this.crossOrigin;
            !0 === i && (i = "anonymous"), this.imageAttributes.crossOrigin = i;
          }
          if (this.checkOrientation) {
            var n = (t = this.src, new Promise(function (e) {
              Bt(t).then(function (i) {
                var n = Ft(i);
                e(i ? {
                  source: t,
                  arrayBuffer: i,
                  orientation: n
                } : {
                  source: t,
                  arrayBuffer: null,
                  orientation: null
                });
              }).catch(function (i) {
                console.warn(i), e({
                  source: t,
                  arrayBuffer: null,
                  orientation: null
                });
              });
            }));
            setTimeout(function () {
              n.then(e.onParseImage);
            }, this.transitionTime);
          } else setTimeout(function () {
            e.onParseImage({
              source: e.src
            });
          }, this.transitionTime);
        } else this.clearImage();
      },
      onFailLoadImage: function () {
        this.imageAttributes.src && (this.clearImage(), this.$emit("error"));
      },
      onSuccessLoadImage: function () {
        var t = this,
          e = this.$refs.image;
        e && !this.imageLoaded && (this.imageAttributes.height = e.naturalHeight, this.imageAttributes.width = e.naturalWidth, this.imageLoaded = !0, this.resetVisibleArea().then(function () {
          t.$emit("ready"), t.onChange(!1);
        }));
      },
      onParseImage: function (t) {
        var e = this,
          n = t.source,
          s = t.arrayBuffer,
          o = t.orientation;
        this.imageAttributes.revoke && this.imageAttributes.src && URL.revokeObjectURL(this.imageAttributes.src), this.imageAttributes.revoke = !1, s && o && o > 1 ? g(n) || !v(n) ? (this.imageAttributes.src = URL.createObjectURL(new Blob([s])), this.imageAttributes.revoke = !0) : this.imageAttributes.src = function (t) {
          for (var e = [], i = new Uint8Array(t); i.length > 0;) {
            var n = i.subarray(0, 8192);
            e.push(String.fromCharCode.apply(null, Array.from ? Array.from(n) : n.slice())), i = i.subarray(8192);
          }
          return "data:image/jpeg;base64," + btoa(e.join(""));
        }(s) : this.imageAttributes.src = n, b(this.defaultTransforms) ? this.appliedImageTransforms = It(this.defaultTransforms()) : y(this.defaultTransforms) ? this.appliedImageTransforms = It(this.defaultTransforms) : this.appliedImageTransforms = function (t) {
          var e = It({});
          if (t) switch (t) {
            case 2:
              e.flip.horizontal = !0;
              break;
            case 3:
              e.rotate = -180;
              break;
            case 4:
              e.flip.vertical = !0;
              break;
            case 5:
              e.rotate = 90, e.flip.vertical = !0;
              break;
            case 6:
              e.rotate = 90;
              break;
            case 7:
              e.rotate = 90, e.flip.horizontal = !0;
              break;
            case 8:
              e.rotate = -90;
          }
          return e;
        }(o), this.defaultImageTransforms = i(i({}, this.appliedImageTransforms), {}, {
          flip: i({}, this.appliedImageTransforms.flip)
        }), this.$nextTick(function () {
          var t = e.$refs.image;
          t && t.complete && (!function (t) {
            return Boolean(t.naturalWidth);
          }(t) ? e.onFailLoadImage() : e.onSuccessLoadImage());
        });
      },
      onResizeEnd: function () {
        this.runAutoZoom("resize", {
          transitions: !0
        });
      },
      onMoveEnd: function () {
        this.runAutoZoom("move", {
          transitions: !0
        });
      },
      onMove: function (t) {
        var e = this;
        this.transitionsOptions.enabled || this.awaitRender(function () {
          e.coordinates = e.moveAlgorithm(i(i({}, e.getPublicProperties()), {}, {
            positionRestrictions: yt(e.positionRestrictions, e.visibleArea),
            coordinates: e.coordinates,
            event: e.normalizeEvent(t)
          })), e.onChange();
        });
      },
      onResize: function (t) {
        var e = this;
        this.transitionsOptions.enabled || this.stencilSize && !this.autoZoom || this.awaitRender(function () {
          var n = e.sizeRestrictions,
            s = Math.min(e.coordinates.width, e.coordinates.height, 20 * e.coefficient);
          e.coordinates = e.resizeAlgorithm(i(i({}, e.getPublicProperties()), {}, {
            positionRestrictions: yt(e.positionRestrictions, e.visibleArea),
            sizeRestrictions: {
              maxWidth: Math.min(n.maxWidth, e.visibleArea.width),
              maxHeight: Math.min(n.maxHeight, e.visibleArea.height),
              minWidth: Math.max(n.minWidth, s),
              minHeight: Math.max(n.minHeight, s)
            },
            event: e.normalizeEvent(t)
          })), e.onChange(), e.ticking = !1;
        });
      },
      onManipulateImage: function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!this.transitionsOptions.enabled) {
          var n = e.transitions,
            s = void 0 !== n && n,
            o = e.normalize,
            r = void 0 === o || o;
          s && this.enableTransitions();
          var a = zt(i(i({}, this.getPublicProperties()), {}, {
              event: r ? this.normalizeEvent(t) : t,
              getAreaRestrictions: this.getAreaRestrictions,
              imageRestriction: this.imageRestriction,
              adjustStencil: !this.stencilSize && this.settings.resizeImage.adjustStencil
            })),
            h = a.visibleArea,
            c = a.coordinates;
          this.visibleArea = h, this.coordinates = c, this.runAutoZoom("manipulateImage"), this.onChange(), s && this.debouncedDisableTransitions();
        }
      },
      onPropsChange: function () {
        this.coordinates = this.applyTransform(this.coordinates, !0), this.onChange(!1);
      },
      getAreaRestrictions: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = t.visibleArea,
          i = t.type,
          n = void 0 === i ? "move" : i;
        return this.areaRestrictionsAlgorithm({
          boundaries: this.boundaries,
          imageSize: this.imageSize,
          imageRestriction: this.imageRestriction,
          visibleArea: e,
          type: n
        });
      },
      getAspectRatio: function (t) {
        var e,
          i,
          n = this.stencilProps,
          s = n.aspectRatio,
          o = n.minAspectRatio,
          r = n.maxAspectRatio;
        if (this.$refs.stencil && this.$refs.stencil.aspectRatios) {
          var a = this.$refs.stencil.aspectRatios();
          e = a.minimum, i = a.maximum;
        }
        if (w(e) && (e = w(s) ? o : s), w(i) && (i = w(s) ? r : s), !t && (w(e) || w(i))) {
          var h = this.getStencilSize(),
            c = h ? Q(h) : null;
          w(e) && (e = A(c) ? c : void 0), w(i) && (i = A(c) ? c : void 0);
        }
        return {
          minimum: e,
          maximum: i
        };
      },
      getStencilSize: function () {
        if (this.stencilSize) return t = {
          currentStencilSize: {
            width: this.stencilCoordinates.width,
            height: this.stencilCoordinates.height
          },
          stencilSize: this.stencilSize,
          boundaries: this.boundaries,
          coefficient: this.coefficient,
          coordinates: this.coordinates,
          aspectRatio: this.getAspectRatio(!0)
        }, e = t.boundaries, i = t.stencilSize, n = t.aspectRatio, tt(Q(s = b(i) ? i({
          boundaries: e,
          aspectRatio: n
        }) : i), n) && (s = ut({
          sizeRestrictions: {
            maxWidth: e.width,
            maxHeight: e.height,
            minWidth: 0,
            minHeight: 0
          },
          width: s.width,
          height: s.height,
          aspectRatio: {
            minimum: n.minimum,
            maximum: n.maximum
          }
        })), (s.width > e.width || s.height > e.height) && (s = ut({
          sizeRestrictions: {
            maxWidth: e.width,
            maxHeight: e.height,
            minWidth: 0,
            minHeight: 0
          },
          width: s.width,
          height: s.height,
          aspectRatio: {
            minimum: Q(s),
            maximum: Q(s)
          }
        })), s;
        var t, e, i, n, s;
      },
      getPublicProperties: function () {
        return {
          coefficient: this.coefficient,
          visibleArea: this.visibleArea,
          coordinates: this.coordinates,
          boundaries: this.boundaries,
          sizeRestrictions: this.sizeRestrictions,
          positionRestrictions: this.positionRestrictions,
          aspectRatio: this.getAspectRatio(),
          imageRestriction: this.imageRestriction
        };
      },
      defaultCoordinates: function () {
        return i({}, F);
      },
      flip: function (t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          s = n.transitions,
          o = void 0 === s || s;
        if (!this.transitionsActive) {
          o && this.enableTransitions();
          var r = i({}, this.imageTransforms.flip),
            a = At({
              flip: {
                horizontal: t ? !r.horizontal : r.horizontal,
                vertical: e ? !r.vertical : r.vertical
              },
              previousFlip: r,
              rotate: this.imageTransforms.rotate,
              visibleArea: this.visibleArea,
              coordinates: this.coordinates,
              imageSize: this.imageSize,
              positionRestrictions: this.positionRestrictions,
              sizeRestrictions: this.sizeRestrictions,
              getAreaRestrictions: this.getAreaRestrictions,
              aspectRatio: this.getAspectRatio()
            }),
            h = a.visibleArea,
            c = a.coordinates;
          t && (this.appliedImageTransforms.flip.horizontal = !this.appliedImageTransforms.flip.horizontal), e && (this.appliedImageTransforms.flip.vertical = !this.appliedImageTransforms.flip.vertical), this.visibleArea = h, this.coordinates = c, this.onChange(), o && this.debouncedDisableTransitions();
        }
      },
      rotate: function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = e.transitions,
          s = void 0 === n || n;
        if (!this.transitionsActive) {
          s && this.enableTransitions();
          var o = i({}, this.imageSize);
          this.appliedImageTransforms.rotate += t;
          var r = Rt({
              visibleArea: this.visibleArea,
              coordinates: this.coordinates,
              previousImageSize: o,
              imageSize: this.imageSize,
              angle: t,
              positionRestrictions: this.positionRestrictions,
              sizeRestrictions: this.sizeRestrictions,
              getAreaRestrictions: this.getAreaRestrictions,
              aspectRatio: this.getAspectRatio()
            }),
            a = r.visibleArea,
            h = r.coordinates,
            c = this.processAutoZoom("rotateImage", a, h);
          a = c.visibleArea, h = c.coordinates, this.visibleArea = a, this.coordinates = h, this.onChange(), s && this.debouncedDisableTransitions();
        }
      }
    }
  },
  ne = T({
    render: function () {
      var t = this,
        e = t.$createElement,
        i = t._self._c || e;
      return i("div", {
        ref: "cropper",
        class: t.classes.cropper
      }, [i("div", {
        ref: "stretcher",
        class: t.classes.stretcher
      }), t._v(" "), i("div", {
        class: t.classes.boundaries,
        style: t.boundariesStyle
      }, [i(t.backgroundWrapperComponent, {
        tag: "component",
        class: t.classes.cropperWrapper,
        attrs: {
          "wheel-resize": t.settings.resizeImage.wheel,
          "touch-resize": t.settings.resizeImage.touch,
          "touch-move": t.settings.moveImage.touch,
          "mouse-move": t.settings.moveImage.mouse
        },
        on: {
          move: t.onManipulateImage,
          resize: t.onManipulateImage
        }
      }, [i("div", {
        class: t.classes.background,
        style: t.boundariesStyle
      }), t._v(" "), i("div", {
        class: t.classes.imageWrapper
      }, [i("img", {
        ref: "image",
        class: t.classes.image,
        style: t.imageStyle,
        attrs: {
          crossorigin: t.imageAttributes.crossOrigin,
          src: t.imageAttributes.src
        },
        on: {
          mousedown: function (t) {
            t.preventDefault();
          }
        }
      })]), t._v(" "), i("div", {
        class: t.classes.foreground,
        style: t.boundariesStyle
      }), t._v(" "), i(t.stencilComponent, t._b({
        directives: [{
          name: "show",
          rawName: "v-show",
          value: t.imageLoaded,
          expression: "imageLoaded"
        }],
        ref: "stencil",
        tag: "component",
        attrs: {
          image: t.image,
          coordinates: t.coordinates,
          "stencil-coordinates": t.stencilCoordinates,
          transitions: t.transitionsOptions
        },
        on: {
          resize: t.onResize,
          "resize-end": t.onResizeEnd,
          move: t.onMove,
          "move-end": t.onMoveEnd
        }
      }, "component", t.stencilProps, !1)), t._v(" "), t.canvas ? i("canvas", {
        ref: "canvas",
        style: {
          display: "none"
        }
      }) : t._e(), t._v(" "), t.canvas ? i("canvas", {
        ref: "sourceCanvas",
        style: {
          display: "none"
        }
      }) : t._e()], 1)], 1)]);
    },
    staticRenderFns: []
  }, undefined, ie, undefined, false, undefined, !1, void 0, void 0, void 0);
external_commonjs_vue_commonjs2_vue_root_Vue_default().component("cropper", ne), external_commonjs_vue_commonjs2_vue_root_Vue_default().component("rectangle-stencil", Qt), external_commonjs_vue_commonjs2_vue_root_Vue_default().component("circle-stencil", Jt), external_commonjs_vue_commonjs2_vue_root_Vue_default().component("simple-handler", Et), external_commonjs_vue_commonjs2_vue_root_Vue_default().component("simple-line", Ot);

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/VueProfilePicker.vue?vue&type=script&lang=js&


/* harmony default export */ var VueProfilePickervue_type_script_lang_js_ = ({
  name: "VueProfilePicker",
  components: {
    Cropper: ne
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      default: 'Choose your Profile Photo',
      type: String
    },
    confirm: {
      default: 'Okay',
      type: String
    },
    cancel: {
      default: 'Cancel',
      type: String
    }
  },
  data() {
    return {
      show: false,
      img: '',
      final_image: ''
    };
  },
  methods: {
    onFileSelected(event) {
      this.show = !this.show;
      try {
        this.img = URL.createObjectURL(event.target.files[0]);
        this.show = true;
      } catch {
        this.img = '';
      }
    },
    change({
      coordinates,
      canvas
    }) {
      var _this = this;
      canvas.toBlob(function (blob) {
        _this.final_image = blob;
        //_this.final_image =  URL.createObjectURL(blob);
      }, 'image/png');
      return coordinates;
    }
  }
});
;// CONCATENATED MODULE: ./src/VueProfilePicker.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_VueProfilePickervue_type_script_lang_js_ = (VueProfilePickervue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/VueProfilePicker.vue?vue&type=style&index=0&id=4665ae9b&prod&lang=css&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/VueProfilePicker.vue?vue&type=style&index=0&id=4665ae9b&prod&lang=css&

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/VueProfilePicker.vue



;


/* normalize component */

var component = normalizeComponent(
  src_VueProfilePickervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VueProfilePicker = (component.exports);
;// CONCATENATED MODULE: ./src/install.js

const VPP = {
  install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("vue-profile-picker", VueProfilePicker);
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VPP);
}
/* harmony default export */ var install = (VPP);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (install);


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=vue-profile-picker.umd.js.map