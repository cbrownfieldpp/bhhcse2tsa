(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayUtil_1 = require("./lib/ArrayUtil");
console.log(ArrayUtil_1.default.randomSubset([{ a: 'a' }, { b: 'b' }, { c: 'c' }], 2));

},{"./lib/ArrayUtil":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayUtil {
}
exports.default = ArrayUtil;
/**
 * Returns a randomly ordered subset of 'arr' of size 'cnt'.
 * @param arr
 * @param cnt
 * @returns
 */
ArrayUtil.randomSubset = (arr, cnt) => {
    /** Typically declare all variables at the top of a function in Typescript */
    const tmp = [];
    /** Base cases next. */
    if (arr.length <= cnt) {
        return arr;
    }
    /** Main algorithm. */
    while (tmp.length < cnt) {
        tmp.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }
    return tmp;
};

},{}]},{},[1]);
