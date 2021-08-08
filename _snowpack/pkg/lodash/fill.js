import { t as toFinite_1 } from '../common/toFinite-3c87ca82.js';
import { _ as _isIterateeCall } from '../common/_isIterateeCall-3d37a6e3.js';
import '../common/_isIndex-ba156ebf.js';
import '../common/_commonjsHelpers-7b5f3d4c.js';

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */


function toInteger(value) {
  var result = toFinite_1(value),
      remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}

var toInteger_1 = toInteger;

/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }

    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }

  return number;
}

var _baseClamp = baseClamp;

/** Used as references for the maximum length and index of an array. */


var MAX_ARRAY_LENGTH = 4294967295;
/**
 * Converts `value` to an integer suitable for use as the length of an
 * array-like object.
 *
 * **Note:** This method is based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toLength(3.2);
 * // => 3
 *
 * _.toLength(Number.MIN_VALUE);
 * // => 0
 *
 * _.toLength(Infinity);
 * // => 4294967295
 *
 * _.toLength('3.2');
 * // => 3
 */

function toLength(value) {
  return value ? _baseClamp(toInteger_1(value), 0, MAX_ARRAY_LENGTH) : 0;
}

var toLength_1 = toLength;

/**
 * The base implementation of `_.fill` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 */


function baseFill(array, value, start, end) {
  var length = array.length;
  start = toInteger_1(start);

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  end = end === undefined || end > length ? length : toInteger_1(end);

  if (end < 0) {
    end += length;
  }

  end = start > end ? 0 : toLength_1(end);

  while (start < end) {
    array[start++] = value;
  }

  return array;
}

var _baseFill = baseFill;

/**
 * Fills elements of `array` with `value` from `start` up to, but not
 * including, `end`.
 *
 * **Note:** This method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 3.2.0
 * @category Array
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3];
 *
 * _.fill(array, 'a');
 * console.log(array);
 * // => ['a', 'a', 'a']
 *
 * _.fill(Array(3), 2);
 * // => [2, 2, 2]
 *
 * _.fill([4, 6, 8, 10], '*', 1, 3);
 * // => [4, '*', '*', 10]
 */


function fill(array, value, start, end) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return [];
  }

  if (start && typeof start != 'number' && _isIterateeCall(array, value, start)) {
    start = 0;
    end = length;
  }

  return _baseFill(array, value, start, end);
}

var fill_1 = fill;

export default fill_1;
