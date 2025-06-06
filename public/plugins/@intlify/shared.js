/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/@intlify/shared@11.1.5/dist/shared.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var e = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
/*!
  * shared v11.1.5
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const t = "undefined" != typeof window;
let n, o;
const r = /\{([0-9a-zA-Z]+)\}/g;
function c(e, ...t) {
    return 1 === t.length && A(t[0]) && (t = t[0]),
    t && t.hasOwnProperty || (t = {}),
        e.replace(r, ( (e, n) => t.hasOwnProperty(n) ? t[n] : ""))
}
const l = (e, t=!1) => t ? Symbol.for(e) : Symbol(e)
    , s = (e, t, n) => i({
    l: e,
    k: t,
    s: n
})
    , i = e => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027")
    , f = e => "number" == typeof e && isFinite(e)
    , p = e => "[object Date]" === E(e)
    , a = e => "[object RegExp]" === E(e)
    , u = e => P(e) && 0 === Object.keys(e).length
    , g = Object.assign
    , y = Object.create
    , d = (e=null) => y(e);
let h;
const b = () => h || (h = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : d());
function w(e) {
    return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}
const O = Object.prototype.hasOwnProperty;
function j(e, t) {
    return O.call(e, t)
}
const m = Array.isArray
    , S = e => "function" == typeof e
    , x = e => "string" == typeof e
    , k = e => "boolean" == typeof e
    , v = e => "symbol" == typeof e
    , A = e => null !== e && "object" == typeof e
    , M = e => A(e) && S(e.then) && S(e.catch)
    , _ = Object.prototype.toString
    , E = e => _.call(e)
    , P = e => "[object Object]" === E(e)
    , $ = e => null == e ? "" : m(e) || P(e) && e.toString === _ ? JSON.stringify(e, null, 2) : String(e);
function J(e, t="") {
    return e.reduce(( (e, n, o) => 0 === o ? e + n : e + t + n), "")
}
function N(e, t=0, n=e.length) {
    const o = e.split(/\r?\n/);
    let r = 0;
    const c = [];
    for (let e = 0; e < o.length; e++)
        if (r += o[e].length + 1,
        r >= t) {
            for (let l = e - 2; l <= e + 2 || n > r; l++) {
                if (l < 0 || l >= o.length)
                    continue;
                const s = l + 1;
                c.push(`${s}${" ".repeat(3 - String(s).length)}|  ${o[l]}`);
                const i = o[l].length;
                if (l === e) {
                    const e = t - (r - i) + 1
                        , o = Math.max(1, n > r ? i - e : n - t);
                    c.push("   |  " + " ".repeat(e) + "^".repeat(o))
                } else if (l > e) {
                    if (n > r) {
                        const e = Math.max(Math.min(n - r, i), 1);
                        c.push("   |  " + "^".repeat(e))
                    }
                    r += i + 1
                }
            }
            break
        }
    return c.join("\n")
}
function T(e, t) {
    "undefined" != typeof console && (console.warn("[intlify] " + e),
    t && console.warn(t.stack))
}
const q = {};
function z(e) {
    q[e] || (q[e] = !0,
        T(e))
}
function D() {
    const e = new Map;
    return {
        events: e,
        on(t, n) {
            const o = e.get(t);
            o && o.push(n) || e.set(t, [n])
        },
        off(t, n) {
            const o = e.get(t);
            o && o.splice(o.indexOf(n) >>> 0, 1)
        },
        emit(t, n) {
            (e.get(t) || []).slice().map((e => e(n))),
                (e.get("*") || []).slice().map((e => e(t, n)))
        }
    }
}
const F = e => !A(e) || m(e);
function I(e, t) {
    if (F(e) || F(t))
        throw new Error("Invalid value");
    const n = [{
        src: e,
        des: t
    }];
    for (; n.length; ) {
        const {src: e, des: t} = n.pop();
        Object.keys(e).forEach((o => {
                "__proto__" !== o && (A(e[o]) && !A(t[o]) && (t[o] = Array.isArray(e[o]) ? [] : d()),
                    F(t[o]) || F(e[o]) ? t[o] = e[o] : n.push({
                        src: e[o],
                        des: t[o]
                    }))
            }
        ))
    }
}
export {g as assign, d as create, D as createEmitter, I as deepCopy, w as escapeHtml, c as format, i as friendlyJSONstringify, N as generateCodeFrame, s as generateFormatCacheKey, b as getGlobalThis, j as hasOwn, t as inBrowser, m as isArray, k as isBoolean, p as isDate, u as isEmptyObject, S as isFunction, f as isNumber, A as isObject, P as isPlainObject, M as isPromise, a as isRegExp, x as isString, v as isSymbol, J as join, l as makeSymbol, n as mark, o as measure, _ as objectToString, $ as toDisplayString, E as toTypeString, T as warn, z as warnOnce};
export default null;
//# sourceMappingURL=/sm/390bf4a8e1f950e9b8209e27a06465829107312f9fc7777680c92b6c5fc2e603.map
