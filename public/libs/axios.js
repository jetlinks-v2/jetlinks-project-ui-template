/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/axios@1.8.4/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var t = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
function e() {
    throw new Error("setTimeout has not been defined")
}
function r() {
    throw new Error("clearTimeout has not been defined")
}
var n = e
    , o = r;
function i(t) {
    if (n === setTimeout)
        return setTimeout(t, 0);
    if ((n === e || !n) && setTimeout)
        return n = setTimeout,
            setTimeout(t, 0);
    try {
        return n(t, 0)
    } catch (e) {
        try {
            return n.call(null, t, 0)
        } catch (e) {
            return n.call(this, t, 0)
        }
    }
}
"function" == typeof t.setTimeout && (n = setTimeout),
"function" == typeof t.clearTimeout && (o = clearTimeout);
var s, a = [], u = !1, c = -1;
function f() {
    u && s && (u = !1,
        s.length ? a = s.concat(a) : c = -1,
    a.length && l())
}
function l() {
    if (!u) {
        var t = i(f);
        u = !0;
        for (var e = a.length; e; ) {
            for (s = a,
                     a = []; ++c < e; )
                s && s[c].run();
            c = -1,
                e = a.length
        }
        s = null,
            u = !1,
            function(t) {
                if (o === clearTimeout)
                    return clearTimeout(t);
                if ((o === r || !o) && clearTimeout)
                    return o = clearTimeout,
                        clearTimeout(t);
                try {
                    return o(t)
                } catch (e) {
                    try {
                        return o.call(null, t)
                    } catch (e) {
                        return o.call(this, t)
                    }
                }
            }(t)
    }
}
function h(t, e) {
    this.fun = t,
        this.array = e
}
h.prototype.run = function() {
    this.fun.apply(null, this.array)
}
;
function p() {}
var d = p
    , g = p
    , y = p
    , m = p
    , w = p
    , b = p
    , E = p;
var R = t.performance || {}
    , v = R.now || R.mozNow || R.msNow || R.oNow || R.webkitNow || function() {
        return (new Date).getTime()
    }
;
var A = new Date;
var T = {
    nextTick: function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var r = 1; r < arguments.length; r++)
                e[r - 1] = arguments[r];
        a.push(new h(t,e)),
        1 !== a.length || u || i(l)
    },
    title: "browser",
    browser: !0,
    env: {},
    argv: [],
    version: "",
    versions: {},
    on: d,
    addListener: g,
    once: y,
    off: m,
    removeListener: w,
    removeAllListeners: b,
    emit: E,
    binding: function(t) {
        throw new Error("process.binding is not supported")
    },
    cwd: function() {
        return "/"
    },
    chdir: function(t) {
        throw new Error("process.chdir is not supported")
    },
    umask: function() {
        return 0
    },
    hrtime: function(t) {
        var e = .001 * v.call(R)
            , r = Math.floor(e)
            , n = Math.floor(e % 1 * 1e9);
        return t && (r -= t[0],
        (n -= t[1]) < 0 && (r--,
            n += 1e9)),
            [r, n]
    },
    platform: "browser",
    release: {},
    config: {},
    uptime: function() {
        return (new Date - A) / 1e3
    }
};
function S(t, e) {
    return function() {
        return t.apply(e, arguments)
    }
}
const {toString: O} = Object.prototype
    , {getPrototypeOf: _} = Object
    , P = (U = Object.create(null),
        t => {
            const e = O.call(t);
            return U[e] || (U[e] = e.slice(8, -1).toLowerCase())
        }
);
var U;
const C = t => (t = t.toLowerCase(),
    e => P(e) === t)
    , x = t => e => typeof e === t
    , {isArray: B} = Array
    , N = x("undefined");
const L = C("ArrayBuffer");
const j = x("string")
    , D = x("function")
    , F = x("number")
    , k = t => null !== t && "object" == typeof t
    , I = t => {
    if ("object" !== P(t))
        return !1;
    const e = _(t);
    return !(null !== e && e !== Object.prototype && null !== Object.getPrototypeOf(e) || Symbol.toStringTag in t || Symbol.iterator in t)
}
    , M = C("Date")
    , q = C("File")
    , Y = C("Blob")
    , z = C("FileList")
    , H = C("URLSearchParams")
    , [J,V,W,K] = ["ReadableStream", "Request", "Response", "Headers"].map(C);
function $(t, e, {allOwnKeys: r=!1}={}) {
    if (null == t)
        return;
    let n, o;
    if ("object" != typeof t && (t = [t]),
        B(t))
        for (n = 0,
                 o = t.length; n < o; n++)
            e.call(null, t[n], n, t);
    else {
        const o = r ? Object.getOwnPropertyNames(t) : Object.keys(t)
            , i = o.length;
        let s;
        for (n = 0; n < i; n++)
            s = o[n],
                e.call(null, t[s], s, t)
    }
}
function X(t, e) {
    e = e.toLowerCase();
    const r = Object.keys(t);
    let n, o = r.length;
    for (; o-- > 0; )
        if (n = r[o],
        e === n.toLowerCase())
            return n;
    return null
}
const G = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : t
    , Q = t => !N(t) && t !== G;
const Z = (tt = "undefined" != typeof Uint8Array && _(Uint8Array),
    t => tt && t instanceof tt);
var tt;
const et = C("HTMLFormElement")
    , rt = ( ({hasOwnProperty: t}) => (e, r) => t.call(e, r))(Object.prototype)
    , nt = C("RegExp")
    , ot = (t, e) => {
        const r = Object.getOwnPropertyDescriptors(t)
            , n = {};
        $(r, ( (r, o) => {
                let i;
                !1 !== (i = e(r, o, t)) && (n[o] = i || r)
            }
        )),
            Object.defineProperties(t, n)
    }
;
const it = C("AsyncFunction")
    , st = (at = "function" == typeof setImmediate,
    ut = D(G.postMessage),
    at ? setImmediate : ut ? (ct = `axios@${Math.random()}`,
            ft = [],
            G.addEventListener("message", ( ({source: t, data: e}) => {
                    t === G && e === ct && ft.length && ft.shift()()
                }
            ), !1),
            t => {
                ft.push(t),
                    G.postMessage(ct, "*")
            }
    ) : t => setTimeout(t));
var at, ut, ct, ft;
const lt = "undefined" != typeof queueMicrotask ? queueMicrotask.bind(G) : T.nextTick || st;
var ht = {
    isArray: B,
    isArrayBuffer: L,
    isBuffer: function(t) {
        return null !== t && !N(t) && null !== t.constructor && !N(t.constructor) && D(t.constructor.isBuffer) && t.constructor.isBuffer(t)
    },
    isFormData: t => {
        let e;
        return t && ("function" == typeof FormData && t instanceof FormData || D(t.append) && ("formdata" === (e = P(t)) || "object" === e && D(t.toString) && "[object FormData]" === t.toString()))
    }
    ,
    isArrayBufferView: function(t) {
        let e;
        return e = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer && L(t.buffer),
            e
    },
    isString: j,
    isNumber: F,
    isBoolean: t => !0 === t || !1 === t,
    isObject: k,
    isPlainObject: I,
    isReadableStream: J,
    isRequest: V,
    isResponse: W,
    isHeaders: K,
    isUndefined: N,
    isDate: M,
    isFile: q,
    isBlob: Y,
    isRegExp: nt,
    isFunction: D,
    isStream: t => k(t) && D(t.pipe),
    isURLSearchParams: H,
    isTypedArray: Z,
    isFileList: z,
    forEach: $,
    merge: function t() {
        const {caseless: e} = Q(this) && this || {}
            , r = {}
            , n = (n, o) => {
                const i = e && X(r, o) || o;
                I(r[i]) && I(n) ? r[i] = t(r[i], n) : I(n) ? r[i] = t({}, n) : B(n) ? r[i] = n.slice() : r[i] = n
            }
        ;
        for (let t = 0, e = arguments.length; t < e; t++)
            arguments[t] && $(arguments[t], n);
        return r
    },
    extend: (t, e, r, {allOwnKeys: n}={}) => ($(e, ( (e, n) => {
            r && D(e) ? t[n] = S(e, r) : t[n] = e
        }
    ), {
        allOwnKeys: n
    }),
        t),
    trim: t => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
    stripBOM: t => (65279 === t.charCodeAt(0) && (t = t.slice(1)),
        t),
    inherits: (t, e, r, n) => {
        t.prototype = Object.create(e.prototype, n),
            t.prototype.constructor = t,
            Object.defineProperty(t, "super", {
                value: e.prototype
            }),
        r && Object.assign(t.prototype, r)
    }
    ,
    toFlatObject: (t, e, r, n) => {
        let o, i, s;
        const a = {};
        if (e = e || {},
        null == t)
            return e;
        do {
            for (o = Object.getOwnPropertyNames(t),
                     i = o.length; i-- > 0; )
                s = o[i],
                n && !n(s, t, e) || a[s] || (e[s] = t[s],
                    a[s] = !0);
            t = !1 !== r && _(t)
        } while (t && (!r || r(t, e)) && t !== Object.prototype);
        return e
    }
    ,
    kindOf: P,
    kindOfTest: C,
    endsWith: (t, e, r) => {
        t = String(t),
        (void 0 === r || r > t.length) && (r = t.length),
            r -= e.length;
        const n = t.indexOf(e, r);
        return -1 !== n && n === r
    }
    ,
    toArray: t => {
        if (!t)
            return null;
        if (B(t))
            return t;
        let e = t.length;
        if (!F(e))
            return null;
        const r = new Array(e);
        for (; e-- > 0; )
            r[e] = t[e];
        return r
    }
    ,
    forEachEntry: (t, e) => {
        const r = (t && t[Symbol.iterator]).call(t);
        let n;
        for (; (n = r.next()) && !n.done; ) {
            const r = n.value;
            e.call(t, r[0], r[1])
        }
    }
    ,
    matchAll: (t, e) => {
        let r;
        const n = [];
        for (; null !== (r = t.exec(e)); )
            n.push(r);
        return n
    }
    ,
    isHTMLForm: et,
    hasOwnProperty: rt,
    hasOwnProp: rt,
    reduceDescriptors: ot,
    freezeMethods: t => {
        ot(t, ( (e, r) => {
                if (D(t) && -1 !== ["arguments", "caller", "callee"].indexOf(r))
                    return !1;
                const n = t[r];
                D(n) && (e.enumerable = !1,
                    "writable"in e ? e.writable = !1 : e.set || (e.set = () => {
                            throw Error("Can not rewrite read-only method '" + r + "'")
                        }
                    ))
            }
        ))
    }
    ,
    toObjectSet: (t, e) => {
        const r = {}
            , n = t => {
                t.forEach((t => {
                        r[t] = !0
                    }
                ))
            }
        ;
        return B(t) ? n(t) : n(String(t).split(e)),
            r
    }
    ,
    toCamelCase: t => t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, (function(t, e, r) {
            return e.toUpperCase() + r
        }
    )),
    noop: () => {}
    ,
    toFiniteNumber: (t, e) => null != t && Number.isFinite(t = +t) ? t : e,
    findKey: X,
    global: G,
    isContextDefined: Q,
    isSpecCompliantForm: function(t) {
        return !!(t && D(t.append) && "FormData" === t[Symbol.toStringTag] && t[Symbol.iterator])
    },
    toJSONObject: t => {
        const e = new Array(10)
            , r = (t, n) => {
                if (k(t)) {
                    if (e.indexOf(t) >= 0)
                        return;
                    if (!("toJSON"in t)) {
                        e[n] = t;
                        const o = B(t) ? [] : {};
                        return $(t, ( (t, e) => {
                                const i = r(t, n + 1);
                                !N(i) && (o[e] = i)
                            }
                        )),
                            e[n] = void 0,
                            o
                    }
                }
                return t
            }
        ;
        return r(t, 0)
    }
    ,
    isAsyncFn: it,
    isThenable: t => t && (k(t) || D(t)) && D(t.then) && D(t.catch),
    setImmediate: st,
    asap: lt
}
    , pt = []
    , dt = []
    , gt = "undefined" != typeof Uint8Array ? Uint8Array : Array
    , yt = !1;
function mt() {
    yt = !0;
    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = 0; e < 64; ++e)
        pt[e] = t[e],
            dt[t.charCodeAt(e)] = e;
    dt["-".charCodeAt(0)] = 62,
        dt["_".charCodeAt(0)] = 63
}
function wt(t, e, r) {
    for (var n, o, i = [], s = e; s < r; s += 3)
        n = (t[s] << 16) + (t[s + 1] << 8) + t[s + 2],
            i.push(pt[(o = n) >> 18 & 63] + pt[o >> 12 & 63] + pt[o >> 6 & 63] + pt[63 & o]);
    return i.join("")
}
function bt(t) {
    var e;
    yt || mt();
    for (var r = t.length, n = r % 3, o = "", i = [], s = 16383, a = 0, u = r - n; a < u; a += s)
        i.push(wt(t, a, a + s > u ? u : a + s));
    return 1 === n ? (e = t[r - 1],
        o += pt[e >> 2],
        o += pt[e << 4 & 63],
        o += "==") : 2 === n && (e = (t[r - 2] << 8) + t[r - 1],
        o += pt[e >> 10],
        o += pt[e >> 4 & 63],
        o += pt[e << 2 & 63],
        o += "="),
        i.push(o),
        i.join("")
}
function Et(t, e, r, n, o) {
    var i, s, a = 8 * o - n - 1, u = (1 << a) - 1, c = u >> 1, f = -7, l = r ? o - 1 : 0, h = r ? -1 : 1, p = t[e + l];
    for (l += h,
             i = p & (1 << -f) - 1,
             p >>= -f,
             f += a; f > 0; i = 256 * i + t[e + l],
             l += h,
             f -= 8)
        ;
    for (s = i & (1 << -f) - 1,
             i >>= -f,
             f += n; f > 0; s = 256 * s + t[e + l],
             l += h,
             f -= 8)
        ;
    if (0 === i)
        i = 1 - c;
    else {
        if (i === u)
            return s ? NaN : 1 / 0 * (p ? -1 : 1);
        s += Math.pow(2, n),
            i -= c
    }
    return (p ? -1 : 1) * s * Math.pow(2, i - n)
}
function Rt(t, e, r, n, o, i) {
    var s, a, u, c = 8 * i - o - 1, f = (1 << c) - 1, l = f >> 1, h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = n ? 0 : i - 1, d = n ? 1 : -1, g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e),
             isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0,
                 s = f) : (s = Math.floor(Math.log(e) / Math.LN2),
             e * (u = Math.pow(2, -s)) < 1 && (s--,
                 u *= 2),
             (e += s + l >= 1 ? h / u : h * Math.pow(2, 1 - l)) * u >= 2 && (s++,
                 u /= 2),
                 s + l >= f ? (a = 0,
                     s = f) : s + l >= 1 ? (a = (e * u - 1) * Math.pow(2, o),
                     s += l) : (a = e * Math.pow(2, l - 1) * Math.pow(2, o),
                     s = 0)); o >= 8; t[r + p] = 255 & a,
             p += d,
             a /= 256,
             o -= 8)
        ;
    for (s = s << o | a,
             c += o; c > 0; t[r + p] = 255 & s,
             p += d,
             s /= 256,
             c -= 8)
        ;
    t[r + p - d] |= 128 * g
}
var vt = {}.toString
    , At = Array.isArray || function(t) {
        return "[object Array]" == vt.call(t)
    }
;
function Tt() {
    return Ot.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
}
function St(t, e) {
    if (Tt() < e)
        throw new RangeError("Invalid typed array length");
    return Ot.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = Ot.prototype : (null === t && (t = new Ot(e)),
        t.length = e),
        t
}
function Ot(t, e, r) {
    if (!(Ot.TYPED_ARRAY_SUPPORT || this instanceof Ot))
        return new Ot(t,e,r);
    if ("number" == typeof t) {
        if ("string" == typeof e)
            throw new Error("If encoding is specified then the first argument must be a string");
        return Ut(this, t)
    }
    return _t(this, t, e, r)
}
function _t(t, e, r, n) {
    if ("number" == typeof e)
        throw new TypeError('"value" argument must not be a number');
    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, r, n) {
        if (e.byteLength,
        r < 0 || e.byteLength < r)
            throw new RangeError("'offset' is out of bounds");
        if (e.byteLength < r + (n || 0))
            throw new RangeError("'length' is out of bounds");
        e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e,r) : new Uint8Array(e,r,n);
        Ot.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = Ot.prototype : t = Ct(t, e);
        return t
    }(t, e, r, n) : "string" == typeof e ? function(t, e, r) {
        "string" == typeof r && "" !== r || (r = "utf8");
        if (!Ot.isEncoding(r))
            throw new TypeError('"encoding" must be a valid string encoding');
        var n = 0 | Nt(e, r);
        t = St(t, n);
        var o = t.write(e, r);
        o !== n && (t = t.slice(0, o));
        return t
    }(t, e, r) : function(t, e) {
        if (Bt(e)) {
            var r = 0 | xt(e.length);
            return 0 === (t = St(t, r)).length || e.copy(t, 0, 0, r),
                t
        }
        if (e) {
            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length"in e)
                return "number" != typeof e.length || (n = e.length) != n ? St(t, 0) : Ct(t, e);
            if ("Buffer" === e.type && At(e.data))
                return Ct(t, e.data)
        }
        var n;
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
    }(t, e)
}
function Pt(t) {
    if ("number" != typeof t)
        throw new TypeError('"size" argument must be a number');
    if (t < 0)
        throw new RangeError('"size" argument must not be negative')
}
function Ut(t, e) {
    if (Pt(e),
        t = St(t, e < 0 ? 0 : 0 | xt(e)),
        !Ot.TYPED_ARRAY_SUPPORT)
        for (var r = 0; r < e; ++r)
            t[r] = 0;
    return t
}
function Ct(t, e) {
    var r = e.length < 0 ? 0 : 0 | xt(e.length);
    t = St(t, r);
    for (var n = 0; n < r; n += 1)
        t[n] = 255 & e[n];
    return t
}
function xt(t) {
    if (t >= Tt())
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + Tt().toString(16) + " bytes");
    return 0 | t
}
function Bt(t) {
    return !(null == t || !t._isBuffer)
}
function Nt(t, e) {
    if (Bt(t))
        return t.length;
    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer))
        return t.byteLength;
    "string" != typeof t && (t = "" + t);
    var r = t.length;
    if (0 === r)
        return 0;
    for (var n = !1; ; )
        switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
                return r;
            case "utf8":
            case "utf-8":
            case void 0:
                return se(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * r;
            case "hex":
                return r >>> 1;
            case "base64":
                return ae(t).length;
            default:
                if (n)
                    return se(t).length;
                e = ("" + e).toLowerCase(),
                    n = !0
        }
}
function Lt(t, e, r) {
    var n = !1;
    if ((void 0 === e || e < 0) && (e = 0),
    e > this.length)
        return "";
    if ((void 0 === r || r > this.length) && (r = this.length),
    r <= 0)
        return "";
    if ((r >>>= 0) <= (e >>>= 0))
        return "";
    for (t || (t = "utf8"); ; )
        switch (t) {
            case "hex":
                return $t(this, e, r);
            case "utf8":
            case "utf-8":
                return Jt(this, e, r);
            case "ascii":
                return Wt(this, e, r);
            case "latin1":
            case "binary":
                return Kt(this, e, r);
            case "base64":
                return Ht(this, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return Xt(this, e, r);
            default:
                if (n)
                    throw new TypeError("Unknown encoding: " + t);
                t = (t + "").toLowerCase(),
                    n = !0
        }
}
function jt(t, e, r) {
    var n = t[e];
    t[e] = t[r],
        t[r] = n
}
function Dt(t, e, r, n, o) {
    if (0 === t.length)
        return -1;
    if ("string" == typeof r ? (n = r,
        r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648),
        r = +r,
    isNaN(r) && (r = o ? 0 : t.length - 1),
    r < 0 && (r = t.length + r),
    r >= t.length) {
        if (o)
            return -1;
        r = t.length - 1
    } else if (r < 0) {
        if (!o)
            return -1;
        r = 0
    }
    if ("string" == typeof e && (e = Ot.from(e, n)),
        Bt(e))
        return 0 === e.length ? -1 : Ft(t, e, r, n, o);
    if ("number" == typeof e)
        return e &= 255,
            Ot.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : Ft(t, [e], r, n, o);
    throw new TypeError("val must be string, number or Buffer")
}
function Ft(t, e, r, n, o) {
    var i, s = 1, a = t.length, u = e.length;
    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
        if (t.length < 2 || e.length < 2)
            return -1;
        s = 2,
            a /= 2,
            u /= 2,
            r /= 2
    }
    function c(t, e) {
        return 1 === s ? t[e] : t.readUInt16BE(e * s)
    }
    if (o) {
        var f = -1;
        for (i = r; i < a; i++)
            if (c(t, i) === c(e, -1 === f ? 0 : i - f)) {
                if (-1 === f && (f = i),
                i - f + 1 === u)
                    return f * s
            } else
                -1 !== f && (i -= i - f),
                    f = -1
    } else
        for (r + u > a && (r = a - u),
                 i = r; i >= 0; i--) {
            for (var l = !0, h = 0; h < u; h++)
                if (c(t, i + h) !== c(e, h)) {
                    l = !1;
                    break
                }
            if (l)
                return i
        }
    return -1
}
function kt(t, e, r, n) {
    r = Number(r) || 0;
    var o = t.length - r;
    n ? (n = Number(n)) > o && (n = o) : n = o;
    var i = e.length;
    if (i % 2 != 0)
        throw new TypeError("Invalid hex string");
    n > i / 2 && (n = i / 2);
    for (var s = 0; s < n; ++s) {
        var a = parseInt(e.substr(2 * s, 2), 16);
        if (isNaN(a))
            return s;
        t[r + s] = a
    }
    return s
}
function It(t, e, r, n) {
    return ue(se(e, t.length - r), t, r, n)
}
function Mt(t, e, r, n) {
    return ue(function(t) {
        for (var e = [], r = 0; r < t.length; ++r)
            e.push(255 & t.charCodeAt(r));
        return e
    }(e), t, r, n)
}
function qt(t, e, r, n) {
    return Mt(t, e, r, n)
}
function Yt(t, e, r, n) {
    return ue(ae(e), t, r, n)
}
function zt(t, e, r, n) {
    return ue(function(t, e) {
        for (var r, n, o, i = [], s = 0; s < t.length && !((e -= 2) < 0); ++s)
            n = (r = t.charCodeAt(s)) >> 8,
                o = r % 256,
                i.push(o),
                i.push(n);
        return i
    }(e, t.length - r), t, r, n)
}
function Ht(t, e, r) {
    return 0 === e && r === t.length ? bt(t) : bt(t.slice(e, r))
}
function Jt(t, e, r) {
    r = Math.min(t.length, r);
    for (var n = [], o = e; o < r; ) {
        var i, s, a, u, c = t[o], f = null, l = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
        if (o + l <= r)
            switch (l) {
                case 1:
                    c < 128 && (f = c);
                    break;
                case 2:
                    128 == (192 & (i = t[o + 1])) && (u = (31 & c) << 6 | 63 & i) > 127 && (f = u);
                    break;
                case 3:
                    i = t[o + 1],
                        s = t[o + 2],
                    128 == (192 & i) && 128 == (192 & s) && (u = (15 & c) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (f = u);
                    break;
                case 4:
                    i = t[o + 1],
                        s = t[o + 2],
                        a = t[o + 3],
                    128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & c) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (f = u)
            }
        null === f ? (f = 65533,
            l = 1) : f > 65535 && (f -= 65536,
            n.push(f >>> 10 & 1023 | 55296),
            f = 56320 | 1023 & f),
            n.push(f),
            o += l
    }
    return function(t) {
        var e = t.length;
        if (e <= Vt)
            return String.fromCharCode.apply(String, t);
        var r = ""
            , n = 0;
        for (; n < e; )
            r += String.fromCharCode.apply(String, t.slice(n, n += Vt));
        return r
    }(n)
}
Ot.TYPED_ARRAY_SUPPORT = void 0 === t.TYPED_ARRAY_SUPPORT || t.TYPED_ARRAY_SUPPORT,
    Tt(),
    Ot.poolSize = 8192,
    Ot._augment = function(t) {
        return t.__proto__ = Ot.prototype,
            t
    }
    ,
    Ot.from = function(t, e, r) {
        return _t(null, t, e, r)
    }
    ,
Ot.TYPED_ARRAY_SUPPORT && (Ot.prototype.__proto__ = Uint8Array.prototype,
    Ot.__proto__ = Uint8Array,
"undefined" != typeof Symbol && Symbol.species && Ot[Symbol.species]),
    Ot.alloc = function(t, e, r) {
        return function(t, e, r, n) {
            return Pt(e),
                e <= 0 ? St(t, e) : void 0 !== r ? "string" == typeof n ? St(t, e).fill(r, n) : St(t, e).fill(r) : St(t, e)
        }(null, t, e, r)
    }
    ,
    Ot.allocUnsafe = function(t) {
        return Ut(null, t)
    }
    ,
    Ot.allocUnsafeSlow = function(t) {
        return Ut(null, t)
    }
    ,
    Ot.isBuffer = function(t) {
        return null != t && (!!t._isBuffer || ce(t) || function(t) {
            return "function" == typeof t.readFloatLE && "function" == typeof t.slice && ce(t.slice(0, 0))
        }(t))
    }
    ,
    Ot.compare = function(t, e) {
        if (!Bt(t) || !Bt(e))
            throw new TypeError("Arguments must be Buffers");
        if (t === e)
            return 0;
        for (var r = t.length, n = e.length, o = 0, i = Math.min(r, n); o < i; ++o)
            if (t[o] !== e[o]) {
                r = t[o],
                    n = e[o];
                break
            }
        return r < n ? -1 : n < r ? 1 : 0
    }
    ,
    Ot.isEncoding = function(t) {
        switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
        }
    }
    ,
    Ot.concat = function(t, e) {
        if (!At(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length)
            return Ot.alloc(0);
        var r;
        if (void 0 === e)
            for (e = 0,
                     r = 0; r < t.length; ++r)
                e += t[r].length;
        var n = Ot.allocUnsafe(e)
            , o = 0;
        for (r = 0; r < t.length; ++r) {
            var i = t[r];
            if (!Bt(i))
                throw new TypeError('"list" argument must be an Array of Buffers');
            i.copy(n, o),
                o += i.length
        }
        return n
    }
    ,
    Ot.byteLength = Nt,
    Ot.prototype._isBuffer = !0,
    Ot.prototype.swap16 = function() {
        var t = this.length;
        if (t % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < t; e += 2)
            jt(this, e, e + 1);
        return this
    }
    ,
    Ot.prototype.swap32 = function() {
        var t = this.length;
        if (t % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < t; e += 4)
            jt(this, e, e + 3),
                jt(this, e + 1, e + 2);
        return this
    }
    ,
    Ot.prototype.swap64 = function() {
        var t = this.length;
        if (t % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < t; e += 8)
            jt(this, e, e + 7),
                jt(this, e + 1, e + 6),
                jt(this, e + 2, e + 5),
                jt(this, e + 3, e + 4);
        return this
    }
    ,
    Ot.prototype.toString = function() {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? Jt(this, 0, t) : Lt.apply(this, arguments)
    }
    ,
    Ot.prototype.equals = function(t) {
        if (!Bt(t))
            throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === Ot.compare(this, t)
    }
    ,
    Ot.prototype.inspect = function() {
        var t = "";
        return this.length > 0 && (t = this.toString("hex", 0, 50).match(/.{2}/g).join(" "),
        this.length > 50 && (t += " ... ")),
        "<Buffer " + t + ">"
    }
    ,
    Ot.prototype.compare = function(t, e, r, n, o) {
        if (!Bt(t))
            throw new TypeError("Argument must be a Buffer");
        if (void 0 === e && (e = 0),
        void 0 === r && (r = t ? t.length : 0),
        void 0 === n && (n = 0),
        void 0 === o && (o = this.length),
        e < 0 || r > t.length || n < 0 || o > this.length)
            throw new RangeError("out of range index");
        if (n >= o && e >= r)
            return 0;
        if (n >= o)
            return -1;
        if (e >= r)
            return 1;
        if (this === t)
            return 0;
        for (var i = (o >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (e >>>= 0), a = Math.min(i, s), u = this.slice(n, o), c = t.slice(e, r), f = 0; f < a; ++f)
            if (u[f] !== c[f]) {
                i = u[f],
                    s = c[f];
                break
            }
        return i < s ? -1 : s < i ? 1 : 0
    }
    ,
    Ot.prototype.includes = function(t, e, r) {
        return -1 !== this.indexOf(t, e, r)
    }
    ,
    Ot.prototype.indexOf = function(t, e, r) {
        return Dt(this, t, e, r, !0)
    }
    ,
    Ot.prototype.lastIndexOf = function(t, e, r) {
        return Dt(this, t, e, r, !1)
    }
    ,
    Ot.prototype.write = function(t, e, r, n) {
        if (void 0 === e)
            n = "utf8",
                r = this.length,
                e = 0;
        else if (void 0 === r && "string" == typeof e)
            n = e,
                r = this.length,
                e = 0;
        else {
            if (!isFinite(e))
                throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            e |= 0,
                isFinite(r) ? (r |= 0,
                void 0 === n && (n = "utf8")) : (n = r,
                    r = void 0)
        }
        var o = this.length - e;
        if ((void 0 === r || r > o) && (r = o),
        t.length > 0 && (r < 0 || e < 0) || e > this.length)
            throw new RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var i = !1; ; )
            switch (n) {
                case "hex":
                    return kt(this, t, e, r);
                case "utf8":
                case "utf-8":
                    return It(this, t, e, r);
                case "ascii":
                    return Mt(this, t, e, r);
                case "latin1":
                case "binary":
                    return qt(this, t, e, r);
                case "base64":
                    return Yt(this, t, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return zt(this, t, e, r);
                default:
                    if (i)
                        throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(),
                        i = !0
            }
    }
    ,
    Ot.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    }
;
var Vt = 4096;
function Wt(t, e, r) {
    var n = "";
    r = Math.min(t.length, r);
    for (var o = e; o < r; ++o)
        n += String.fromCharCode(127 & t[o]);
    return n
}
function Kt(t, e, r) {
    var n = "";
    r = Math.min(t.length, r);
    for (var o = e; o < r; ++o)
        n += String.fromCharCode(t[o]);
    return n
}
function $t(t, e, r) {
    var n = t.length;
    (!e || e < 0) && (e = 0),
    (!r || r < 0 || r > n) && (r = n);
    for (var o = "", i = e; i < r; ++i)
        o += ie(t[i]);
    return o
}
function Xt(t, e, r) {
    for (var n = t.slice(e, r), o = "", i = 0; i < n.length; i += 2)
        o += String.fromCharCode(n[i] + 256 * n[i + 1]);
    return o
}
function Gt(t, e, r) {
    if (t % 1 != 0 || t < 0)
        throw new RangeError("offset is not uint");
    if (t + e > r)
        throw new RangeError("Trying to access beyond buffer length")
}
function Qt(t, e, r, n, o, i) {
    if (!Bt(t))
        throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > o || e < i)
        throw new RangeError('"value" argument is out of bounds');
    if (r + n > t.length)
        throw new RangeError("Index out of range")
}
function Zt(t, e, r, n) {
    e < 0 && (e = 65535 + e + 1);
    for (var o = 0, i = Math.min(t.length - r, 2); o < i; ++o)
        t[r + o] = (e & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o)
}
function te(t, e, r, n) {
    e < 0 && (e = 4294967295 + e + 1);
    for (var o = 0, i = Math.min(t.length - r, 4); o < i; ++o)
        t[r + o] = e >>> 8 * (n ? o : 3 - o) & 255
}
function ee(t, e, r, n, o, i) {
    if (r + n > t.length)
        throw new RangeError("Index out of range");
    if (r < 0)
        throw new RangeError("Index out of range")
}
function re(t, e, r, n, o) {
    return o || ee(t, 0, r, 4),
        Rt(t, e, r, n, 23, 4),
    r + 4
}
function ne(t, e, r, n, o) {
    return o || ee(t, 0, r, 8),
        Rt(t, e, r, n, 52, 8),
    r + 8
}
Ot.prototype.slice = function(t, e) {
    var r, n = this.length;
    if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
        (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
    e < t && (e = t),
        Ot.TYPED_ARRAY_SUPPORT)
        (r = this.subarray(t, e)).__proto__ = Ot.prototype;
    else {
        var o = e - t;
        r = new Ot(o,void 0);
        for (var i = 0; i < o; ++i)
            r[i] = this[i + t]
    }
    return r
}
    ,
    Ot.prototype.readUIntLE = function(t, e, r) {
        t |= 0,
            e |= 0,
        r || Gt(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
            n += this[t + i] * o;
        return n
    }
    ,
    Ot.prototype.readUIntBE = function(t, e, r) {
        t |= 0,
            e |= 0,
        r || Gt(t, e, this.length);
        for (var n = this[t + --e], o = 1; e > 0 && (o *= 256); )
            n += this[t + --e] * o;
        return n
    }
    ,
    Ot.prototype.readUInt8 = function(t, e) {
        return e || Gt(t, 1, this.length),
            this[t]
    }
    ,
    Ot.prototype.readUInt16LE = function(t, e) {
        return e || Gt(t, 2, this.length),
        this[t] | this[t + 1] << 8
    }
    ,
    Ot.prototype.readUInt16BE = function(t, e) {
        return e || Gt(t, 2, this.length),
        this[t] << 8 | this[t + 1]
    }
    ,
    Ot.prototype.readUInt32LE = function(t, e) {
        return e || Gt(t, 4, this.length),
        (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
    }
    ,
    Ot.prototype.readUInt32BE = function(t, e) {
        return e || Gt(t, 4, this.length),
        16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
    }
    ,
    Ot.prototype.readIntLE = function(t, e, r) {
        t |= 0,
            e |= 0,
        r || Gt(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
            n += this[t + i] * o;
        return n >= (o *= 128) && (n -= Math.pow(2, 8 * e)),
            n
    }
    ,
    Ot.prototype.readIntBE = function(t, e, r) {
        t |= 0,
            e |= 0,
        r || Gt(t, e, this.length);
        for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256); )
            i += this[t + --n] * o;
        return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)),
            i
    }
    ,
    Ot.prototype.readInt8 = function(t, e) {
        return e || Gt(t, 1, this.length),
            128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
    }
    ,
    Ot.prototype.readInt16LE = function(t, e) {
        e || Gt(t, 2, this.length);
        var r = this[t] | this[t + 1] << 8;
        return 32768 & r ? 4294901760 | r : r
    }
    ,
    Ot.prototype.readInt16BE = function(t, e) {
        e || Gt(t, 2, this.length);
        var r = this[t + 1] | this[t] << 8;
        return 32768 & r ? 4294901760 | r : r
    }
    ,
    Ot.prototype.readInt32LE = function(t, e) {
        return e || Gt(t, 4, this.length),
        this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
    }
    ,
    Ot.prototype.readInt32BE = function(t, e) {
        return e || Gt(t, 4, this.length),
        this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
    }
    ,
    Ot.prototype.readFloatLE = function(t, e) {
        return e || Gt(t, 4, this.length),
            Et(this, t, !0, 23, 4)
    }
    ,
    Ot.prototype.readFloatBE = function(t, e) {
        return e || Gt(t, 4, this.length),
            Et(this, t, !1, 23, 4)
    }
    ,
    Ot.prototype.readDoubleLE = function(t, e) {
        return e || Gt(t, 8, this.length),
            Et(this, t, !0, 52, 8)
    }
    ,
    Ot.prototype.readDoubleBE = function(t, e) {
        return e || Gt(t, 8, this.length),
            Et(this, t, !1, 52, 8)
    }
    ,
    Ot.prototype.writeUIntLE = function(t, e, r, n) {
        (t = +t,
            e |= 0,
            r |= 0,
            n) || Qt(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var o = 1
            , i = 0;
        for (this[e] = 255 & t; ++i < r && (o *= 256); )
            this[e + i] = t / o & 255;
        return e + r
    }
    ,
    Ot.prototype.writeUIntBE = function(t, e, r, n) {
        (t = +t,
            e |= 0,
            r |= 0,
            n) || Qt(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var o = r - 1
            , i = 1;
        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
            this[e + o] = t / i & 255;
        return e + r
    }
    ,
    Ot.prototype.writeUInt8 = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || Qt(this, t, e, 1, 255, 0),
        Ot.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            this[e] = 255 & t,
        e + 1
    }
    ,
    Ot.prototype.writeUInt16LE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || Qt(this, t, e, 2, 65535, 0),
            Ot.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                this[e + 1] = t >>> 8) : Zt(this, t, e, !0),
        e + 2
    }
    ,
    Ot.prototype.writeUInt16BE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || Qt(this, t, e, 2, 65535, 0),
            Ot.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
                this[e + 1] = 255 & t) : Zt(this, t, e, !1),
        e + 2
    }
    ,
    Ot.prototype.writeUInt32LE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || Qt(this, t, e, 4, 4294967295, 0),
            Ot.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24,
                this[e + 2] = t >>> 16,
                this[e + 1] = t >>> 8,
                this[e] = 255 & t) : te(this, t, e, !0),
        e + 4
    }
    ,
    Ot.prototype.writeUInt32BE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || Qt(this, t, e, 4, 4294967295, 0),
            Ot.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
                this[e + 1] = t >>> 16,
                this[e + 2] = t >>> 8,
                this[e + 3] = 255 & t) : te(this, t, e, !1),
        e + 4
    }
    ,
    Ot.prototype.writeIntLE = function(t, e, r, n) {
        if (t = +t,
            e |= 0,
            !n) {
            var o = Math.pow(2, 8 * r - 1);
            Qt(this, t, e, r, o - 1, -o)
        }
        var i = 0
            , s = 1
            , a = 0;
        for (this[e] = 255 & t; ++i < r && (s *= 256); )
            t < 0 && 0 === a && 0 !== this[e + i - 1] && (a = 1),
                this[e + i] = (t / s | 0) - a & 255;
        return e + r
    }
    ,
    Ot.prototype.writeIntBE = function(t, e, r, n) {
        if (t = +t,
            e |= 0,
            !n) {
            var o = Math.pow(2, 8 * r - 1);
            Qt(this, t, e, r, o - 1, -o)
        }
        var i = r - 1
            , s = 1
            , a = 0;
        for (this[e + i] = 255 & t; --i >= 0 && (s *= 256); )
            t < 0 && 0 === a && 0 !== this[e + i + 1] && (a = 1),
                this[e + i] = (t / s | 0) - a & 255;
        return e + r
    }
    ,
    Ot.prototype.writeInt8 = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || Qt(this, t, e, 1, 127, -128),
        Ot.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        t < 0 && (t = 255 + t + 1),
            this[e] = 255 & t,
        e + 1
    }
    ,
    Ot.prototype.writeInt16LE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || Qt(this, t, e, 2, 32767, -32768),
            Ot.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                this[e + 1] = t >>> 8) : Zt(this, t, e, !0),
        e + 2
    }
    ,
    Ot.prototype.writeInt16BE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || Qt(this, t, e, 2, 32767, -32768),
            Ot.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
                this[e + 1] = 255 & t) : Zt(this, t, e, !1),
        e + 2
    }
    ,
    Ot.prototype.writeInt32LE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || Qt(this, t, e, 4, 2147483647, -2147483648),
            Ot.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                this[e + 1] = t >>> 8,
                this[e + 2] = t >>> 16,
                this[e + 3] = t >>> 24) : te(this, t, e, !0),
        e + 4
    }
    ,
    Ot.prototype.writeInt32BE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || Qt(this, t, e, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
            Ot.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
                this[e + 1] = t >>> 16,
                this[e + 2] = t >>> 8,
                this[e + 3] = 255 & t) : te(this, t, e, !1),
        e + 4
    }
    ,
    Ot.prototype.writeFloatLE = function(t, e, r) {
        return re(this, t, e, !0, r)
    }
    ,
    Ot.prototype.writeFloatBE = function(t, e, r) {
        return re(this, t, e, !1, r)
    }
    ,
    Ot.prototype.writeDoubleLE = function(t, e, r) {
        return ne(this, t, e, !0, r)
    }
    ,
    Ot.prototype.writeDoubleBE = function(t, e, r) {
        return ne(this, t, e, !1, r)
    }
    ,
    Ot.prototype.copy = function(t, e, r, n) {
        if (r || (r = 0),
        n || 0 === n || (n = this.length),
        e >= t.length && (e = t.length),
        e || (e = 0),
        n > 0 && n < r && (n = r),
        n === r)
            return 0;
        if (0 === t.length || 0 === this.length)
            return 0;
        if (e < 0)
            throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length)
            throw new RangeError("sourceStart out of bounds");
        if (n < 0)
            throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length),
        t.length - e < n - r && (n = t.length - e + r);
        var o, i = n - r;
        if (this === t && r < e && e < n)
            for (o = i - 1; o >= 0; --o)
                t[o + e] = this[o + r];
        else if (i < 1e3 || !Ot.TYPED_ARRAY_SUPPORT)
            for (o = 0; o < i; ++o)
                t[o + e] = this[o + r];
        else
            Uint8Array.prototype.set.call(t, this.subarray(r, r + i), e);
        return i
    }
    ,
    Ot.prototype.fill = function(t, e, r, n) {
        if ("string" == typeof t) {
            if ("string" == typeof e ? (n = e,
                e = 0,
                r = this.length) : "string" == typeof r && (n = r,
                r = this.length),
            1 === t.length) {
                var o = t.charCodeAt(0);
                o < 256 && (t = o)
            }
            if (void 0 !== n && "string" != typeof n)
                throw new TypeError("encoding must be a string");
            if ("string" == typeof n && !Ot.isEncoding(n))
                throw new TypeError("Unknown encoding: " + n)
        } else
            "number" == typeof t && (t &= 255);
        if (e < 0 || this.length < e || this.length < r)
            throw new RangeError("Out of range index");
        if (r <= e)
            return this;
        var i;
        if (e >>>= 0,
            r = void 0 === r ? this.length : r >>> 0,
        t || (t = 0),
        "number" == typeof t)
            for (i = e; i < r; ++i)
                this[i] = t;
        else {
            var s = Bt(t) ? t : se(new Ot(t,n).toString())
                , a = s.length;
            for (i = 0; i < r - e; ++i)
                this[i + e] = s[i % a]
        }
        return this
    }
;
var oe = /[^+\/0-9A-Za-z-_]/g;
function ie(t) {
    return t < 16 ? "0" + t.toString(16) : t.toString(16)
}
function se(t, e) {
    var r;
    e = e || 1 / 0;
    for (var n = t.length, o = null, i = [], s = 0; s < n; ++s) {
        if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
            if (!o) {
                if (r > 56319) {
                    (e -= 3) > -1 && i.push(239, 191, 189);
                    continue
                }
                if (s + 1 === n) {
                    (e -= 3) > -1 && i.push(239, 191, 189);
                    continue
                }
                o = r;
                continue
            }
            if (r < 56320) {
                (e -= 3) > -1 && i.push(239, 191, 189),
                    o = r;
                continue
            }
            r = 65536 + (o - 55296 << 10 | r - 56320)
        } else
            o && (e -= 3) > -1 && i.push(239, 191, 189);
        if (o = null,
        r < 128) {
            if ((e -= 1) < 0)
                break;
            i.push(r)
        } else if (r < 2048) {
            if ((e -= 2) < 0)
                break;
            i.push(r >> 6 | 192, 63 & r | 128)
        } else if (r < 65536) {
            if ((e -= 3) < 0)
                break;
            i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
        } else {
            if (!(r < 1114112))
                throw new Error("Invalid code point");
            if ((e -= 4) < 0)
                break;
            i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
        }
    }
    return i
}
function ae(t) {
    return function(t) {
        var e, r, n, o, i, s;
        yt || mt();
        var a = t.length;
        if (a % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
        i = "=" === t[a - 2] ? 2 : "=" === t[a - 1] ? 1 : 0,
            s = new gt(3 * a / 4 - i),
            n = i > 0 ? a - 4 : a;
        var u = 0;
        for (e = 0,
                 r = 0; e < n; e += 4,
                 r += 3)
            o = dt[t.charCodeAt(e)] << 18 | dt[t.charCodeAt(e + 1)] << 12 | dt[t.charCodeAt(e + 2)] << 6 | dt[t.charCodeAt(e + 3)],
                s[u++] = o >> 16 & 255,
                s[u++] = o >> 8 & 255,
                s[u++] = 255 & o;
        return 2 === i ? (o = dt[t.charCodeAt(e)] << 2 | dt[t.charCodeAt(e + 1)] >> 4,
            s[u++] = 255 & o) : 1 === i && (o = dt[t.charCodeAt(e)] << 10 | dt[t.charCodeAt(e + 1)] << 4 | dt[t.charCodeAt(e + 2)] >> 2,
            s[u++] = o >> 8 & 255,
            s[u++] = 255 & o),
            s
    }(function(t) {
        if ((t = function(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        }(t).replace(oe, "")).length < 2)
            return "";
        for (; t.length % 4 != 0; )
            t += "=";
        return t
    }(t))
}
function ue(t, e, r, n) {
    for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o)
        e[o + r] = t[o];
    return o
}
function ce(t) {
    return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
}
function fe(t, e, r, n, o) {
    Error.call(this),
        Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack,
        this.message = t,
        this.name = "AxiosError",
    e && (this.code = e),
    r && (this.config = r),
    n && (this.request = n),
    o && (this.response = o,
        this.status = o.status ? o.status : null)
}
ht.inherits(fe, Error, {
    toJSON: function() {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: ht.toJSONObject(this.config),
            code: this.code,
            status: this.status
        }
    }
});
const le = fe.prototype
    , he = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((t => {
        he[t] = {
            value: t
        }
    }
)),
    Object.defineProperties(fe, he),
    Object.defineProperty(le, "isAxiosError", {
        value: !0
    }),
    fe.from = (t, e, r, n, o, i) => {
        const s = Object.create(le);
        return ht.toFlatObject(t, s, (function(t) {
                return t !== Error.prototype
            }
        ), (t => "isAxiosError" !== t)),
            fe.call(s, t.message, e, r, n, o),
            s.cause = t,
            s.name = t.name,
        i && Object.assign(s, i),
            s
    }
;
function pe(t) {
    return ht.isPlainObject(t) || ht.isArray(t)
}
function de(t) {
    return ht.endsWith(t, "[]") ? t.slice(0, -2) : t
}
function ge(t, e, r) {
    return t ? t.concat(e).map((function(t, e) {
            return t = de(t),
                !r && e ? "[" + t + "]" : t
        }
    )).join(r ? "." : "") : e
}
const ye = ht.toFlatObject(ht, {}, null, (function(t) {
        return /^is[A-Z]/.test(t)
    }
));
function me(t, e, r) {
    if (!ht.isObject(t))
        throw new TypeError("target must be an object");
    e = e || new FormData;
    const n = (r = ht.toFlatObject(r, {
        metaTokens: !0,
        dots: !1,
        indexes: !1
    }, !1, (function(t, e) {
            return !ht.isUndefined(e[t])
        }
    ))).metaTokens
        , o = r.visitor || c
        , i = r.dots
        , s = r.indexes
        , a = (r.Blob || "undefined" != typeof Blob && Blob) && ht.isSpecCompliantForm(e);
    if (!ht.isFunction(o))
        throw new TypeError("visitor must be a function");
    function u(t) {
        if (null === t)
            return "";
        if (ht.isDate(t))
            return t.toISOString();
        if (!a && ht.isBlob(t))
            throw new fe("Blob is not supported. Use a Buffer instead.");
        return ht.isArrayBuffer(t) || ht.isTypedArray(t) ? a && "function" == typeof Blob ? new Blob([t]) : Ot.from(t) : t
    }
    function c(t, r, o) {
        let a = t;
        if (t && !o && "object" == typeof t)
            if (ht.endsWith(r, "{}"))
                r = n ? r : r.slice(0, -2),
                    t = JSON.stringify(t);
            else if (ht.isArray(t) && function(t) {
                return ht.isArray(t) && !t.some(pe)
            }(t) || (ht.isFileList(t) || ht.endsWith(r, "[]")) && (a = ht.toArray(t)))
                return r = de(r),
                    a.forEach((function(t, n) {
                            !ht.isUndefined(t) && null !== t && e.append(!0 === s ? ge([r], n, i) : null === s ? r : r + "[]", u(t))
                        }
                    )),
                    !1;
        return !!pe(t) || (e.append(ge(o, r, i), u(t)),
            !1)
    }
    const f = []
        , l = Object.assign(ye, {
        defaultVisitor: c,
        convertValue: u,
        isVisitable: pe
    });
    if (!ht.isObject(t))
        throw new TypeError("data must be an object");
    return function t(r, n) {
        if (!ht.isUndefined(r)) {
            if (-1 !== f.indexOf(r))
                throw Error("Circular reference detected in " + n.join("."));
            f.push(r),
                ht.forEach(r, (function(r, i) {
                        !0 === (!(ht.isUndefined(r) || null === r) && o.call(e, r, ht.isString(i) ? i.trim() : i, n, l)) && t(r, n ? n.concat(i) : [i])
                    }
                )),
                f.pop()
        }
    }(t),
        e
}
function we(t) {
    const e = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\0"
    };
    return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, (function(t) {
            return e[t]
        }
    ))
}
function be(t, e) {
    this._pairs = [],
    t && me(t, this, e)
}
const Ee = be.prototype;
function Re(t) {
    return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}
function ve(t, e, r) {
    if (!e)
        return t;
    const n = r && r.encode || Re;
    ht.isFunction(r) && (r = {
        serialize: r
    });
    const o = r && r.serialize;
    let i;
    if (i = o ? o(e, r) : ht.isURLSearchParams(e) ? e.toString() : new be(e,r).toString(n),
        i) {
        const e = t.indexOf("#");
        -1 !== e && (t = t.slice(0, e)),
            t += (-1 === t.indexOf("?") ? "?" : "&") + i
    }
    return t
}
Ee.append = function(t, e) {
    this._pairs.push([t, e])
}
    ,
    Ee.toString = function(t) {
        const e = t ? function(e) {
                return t.call(this, e, we)
            }
            : we;
        return this._pairs.map((function(t) {
                return e(t[0]) + "=" + e(t[1])
            }
        ), "").join("&")
    }
;
class Ae {
    constructor() {
        this.handlers = []
    }
    use(t, e, r) {
        return this.handlers.push({
            fulfilled: t,
            rejected: e,
            synchronous: !!r && r.synchronous,
            runWhen: r ? r.runWhen : null
        }),
        this.handlers.length - 1
    }
    eject(t) {
        this.handlers[t] && (this.handlers[t] = null)
    }
    clear() {
        this.handlers && (this.handlers = [])
    }
    forEach(t) {
        ht.forEach(this.handlers, (function(e) {
                null !== e && t(e)
            }
        ))
    }
}
var Te = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
}
    , Se = {
    isBrowser: !0,
    classes: {
        URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : be,
        FormData: "undefined" != typeof FormData ? FormData : null,
        Blob: "undefined" != typeof Blob ? Blob : null
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
};
const Oe = "undefined" != typeof window && "undefined" != typeof document
    , _e = "object" == typeof navigator && navigator || void 0
    , Pe = Oe && (!_e || ["ReactNative", "NativeScript", "NS"].indexOf(_e.product) < 0)
    , Ue = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts
    , Ce = Oe && window.location.href || "http://localhost";
var xe = {
    ...Object.freeze({
        __proto__: null,
        hasBrowserEnv: Oe,
        hasStandardBrowserWebWorkerEnv: Ue,
        hasStandardBrowserEnv: Pe,
        navigator: _e,
        origin: Ce
    }),
    ...Se
};
function Be(t) {
    function e(t, r, n, o) {
        let i = t[o++];
        if ("__proto__" === i)
            return !0;
        const s = Number.isFinite(+i)
            , a = o >= t.length;
        if (i = !i && ht.isArray(n) ? n.length : i,
            a)
            return ht.hasOwnProp(n, i) ? n[i] = [n[i], r] : n[i] = r,
                !s;
        n[i] && ht.isObject(n[i]) || (n[i] = []);
        return e(t, r, n[i], o) && ht.isArray(n[i]) && (n[i] = function(t) {
            const e = {}
                , r = Object.keys(t);
            let n;
            const o = r.length;
            let i;
            for (n = 0; n < o; n++)
                i = r[n],
                    e[i] = t[i];
            return e
        }(n[i])),
            !s
    }
    if (ht.isFormData(t) && ht.isFunction(t.entries)) {
        const r = {};
        return ht.forEachEntry(t, ( (t, n) => {
                e(function(t) {
                    return ht.matchAll(/\w+|\[(\w*)]/g, t).map((t => "[]" === t[0] ? "" : t[1] || t[0]))
                }(t), n, r, 0)
            }
        )),
            r
    }
    return null
}
const Ne = {
    transitional: Te,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [function(t, e) {
        const r = e.getContentType() || ""
            , n = r.indexOf("application/json") > -1
            , o = ht.isObject(t);
        o && ht.isHTMLForm(t) && (t = new FormData(t));
        if (ht.isFormData(t))
            return n ? JSON.stringify(Be(t)) : t;
        if (ht.isArrayBuffer(t) || ht.isBuffer(t) || ht.isStream(t) || ht.isFile(t) || ht.isBlob(t) || ht.isReadableStream(t))
            return t;
        if (ht.isArrayBufferView(t))
            return t.buffer;
        if (ht.isURLSearchParams(t))
            return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1),
                t.toString();
        let i;
        if (o) {
            if (r.indexOf("application/x-www-form-urlencoded") > -1)
                return function(t, e) {
                    return me(t, new xe.classes.URLSearchParams, Object.assign({
                        visitor: function(t, e, r, n) {
                            return xe.isNode && ht.isBuffer(t) ? (this.append(e, t.toString("base64")),
                                !1) : n.defaultVisitor.apply(this, arguments)
                        }
                    }, e))
                }(t, this.formSerializer).toString();
            if ((i = ht.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
                const e = this.env && this.env.FormData;
                return me(i ? {
                    "files[]": t
                } : t, e && new e, this.formSerializer)
            }
        }
        return o || n ? (e.setContentType("application/json", !1),
            function(t, e, r) {
                if (ht.isString(t))
                    try {
                        return (e || JSON.parse)(t),
                            ht.trim(t)
                    } catch (t) {
                        if ("SyntaxError" !== t.name)
                            throw t
                    }
                return (r || JSON.stringify)(t)
            }(t)) : t
    }
    ],
    transformResponse: [function(t) {
        const e = this.transitional || Ne.transitional
            , r = e && e.forcedJSONParsing
            , n = "json" === this.responseType;
        if (ht.isResponse(t) || ht.isReadableStream(t))
            return t;
        if (t && ht.isString(t) && (r && !this.responseType || n)) {
            const r = !(e && e.silentJSONParsing) && n;
            try {
                return JSON.parse(t)
            } catch (t) {
                if (r) {
                    if ("SyntaxError" === t.name)
                        throw fe.from(t, fe.ERR_BAD_RESPONSE, this, null, this.response);
                    throw t
                }
            }
        }
        return t
    }
    ],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: xe.classes.FormData,
        Blob: xe.classes.Blob
    },
    validateStatus: function(t) {
        return t >= 200 && t < 300
    },
    headers: {
        common: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": void 0
        }
    }
};
ht.forEach(["delete", "get", "head", "post", "put", "patch"], (t => {
        Ne.headers[t] = {}
    }
));
const Le = ht.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]);
const je = Symbol("internals");
function De(t) {
    return t && String(t).trim().toLowerCase()
}
function Fe(t) {
    return !1 === t || null == t ? t : ht.isArray(t) ? t.map(Fe) : String(t)
}
function ke(t, e, r, n, o) {
    return ht.isFunction(n) ? n.call(this, e, r) : (o && (e = r),
        ht.isString(e) ? ht.isString(n) ? -1 !== e.indexOf(n) : ht.isRegExp(n) ? n.test(e) : void 0 : void 0)
}
class Ie {
    constructor(t) {
        t && this.set(t)
    }
    set(t, e, r) {
        const n = this;
        function o(t, e, r) {
            const o = De(e);
            if (!o)
                throw new Error("header name must be a non-empty string");
            const i = ht.findKey(n, o);
            (!i || void 0 === n[i] || !0 === r || void 0 === r && !1 !== n[i]) && (n[i || e] = Fe(t))
        }
        const i = (t, e) => ht.forEach(t, ( (t, r) => o(t, r, e)));
        if (ht.isPlainObject(t) || t instanceof this.constructor)
            i(t, e);
        else if (ht.isString(t) && (t = t.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim()))
            i((t => {
                    const e = {};
                    let r, n, o;
                    return t && t.split("\n").forEach((function(t) {
                            o = t.indexOf(":"),
                                r = t.substring(0, o).trim().toLowerCase(),
                                n = t.substring(o + 1).trim(),
                            !r || e[r] && Le[r] || ("set-cookie" === r ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n)
                        }
                    )),
                        e
                }
            )(t), e);
        else if (ht.isHeaders(t))
            for (const [e,n] of t.entries())
                o(n, e, r);
        else
            null != t && o(e, t, r);
        return this
    }
    get(t, e) {
        if (t = De(t)) {
            const r = ht.findKey(this, t);
            if (r) {
                const t = this[r];
                if (!e)
                    return t;
                if (!0 === e)
                    return function(t) {
                        const e = Object.create(null)
                            , r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                        let n;
                        for (; n = r.exec(t); )
                            e[n[1]] = n[2];
                        return e
                    }(t);
                if (ht.isFunction(e))
                    return e.call(this, t, r);
                if (ht.isRegExp(e))
                    return e.exec(t);
                throw new TypeError("parser must be boolean|regexp|function")
            }
        }
    }
    has(t, e) {
        if (t = De(t)) {
            const r = ht.findKey(this, t);
            return !(!r || void 0 === this[r] || e && !ke(0, this[r], r, e))
        }
        return !1
    }
    delete(t, e) {
        const r = this;
        let n = !1;
        function o(t) {
            if (t = De(t)) {
                const o = ht.findKey(r, t);
                !o || e && !ke(0, r[o], o, e) || (delete r[o],
                    n = !0)
            }
        }
        return ht.isArray(t) ? t.forEach(o) : o(t),
            n
    }
    clear(t) {
        const e = Object.keys(this);
        let r = e.length
            , n = !1;
        for (; r--; ) {
            const o = e[r];
            t && !ke(0, this[o], o, t, !0) || (delete this[o],
                n = !0)
        }
        return n
    }
    normalize(t) {
        const e = this
            , r = {};
        return ht.forEach(this, ( (n, o) => {
                const i = ht.findKey(r, o);
                if (i)
                    return e[i] = Fe(n),
                        void delete e[o];
                const s = t ? function(t) {
                    return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, ( (t, e, r) => e.toUpperCase() + r))
                }(o) : String(o).trim();
                s !== o && delete e[o],
                    e[s] = Fe(n),
                    r[s] = !0
            }
        )),
            this
    }
    concat(...t) {
        return this.constructor.concat(this, ...t)
    }
    toJSON(t) {
        const e = Object.create(null);
        return ht.forEach(this, ( (r, n) => {
                null != r && !1 !== r && (e[n] = t && ht.isArray(r) ? r.join(", ") : r)
            }
        )),
            e
    }
    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]()
    }
    toString() {
        return Object.entries(this.toJSON()).map(( ([t,e]) => t + ": " + e)).join("\n")
    }
    get[Symbol.toStringTag]() {
        return "AxiosHeaders"
    }
    static from(t) {
        return t instanceof this ? t : new this(t)
    }
    static concat(t, ...e) {
        const r = new this(t);
        return e.forEach((t => r.set(t))),
            r
    }
    static accessor(t) {
        const e = (this[je] = this[je] = {
            accessors: {}
        }).accessors
            , r = this.prototype;
        function n(t) {
            const n = De(t);
            e[n] || (!function(t, e) {
                const r = ht.toCamelCase(" " + e);
                ["get", "set", "has"].forEach((n => {
                        Object.defineProperty(t, n + r, {
                            value: function(t, r, o) {
                                return this[n].call(this, e, t, r, o)
                            },
                            configurable: !0
                        })
                    }
                ))
            }(r, t),
                e[n] = !0)
        }
        return ht.isArray(t) ? t.forEach(n) : n(t),
            this
    }
}
function Me(t, e) {
    const r = this || Ne
        , n = e || r
        , o = Ie.from(n.headers);
    let i = n.data;
    return ht.forEach(t, (function(t) {
            i = t.call(r, i, o.normalize(), e ? e.status : void 0)
        }
    )),
        o.normalize(),
        i
}
function qe(t) {
    return !(!t || !t.__CANCEL__)
}
function Ye(t, e, r) {
    fe.call(this, null == t ? "canceled" : t, fe.ERR_CANCELED, e, r),
        this.name = "CanceledError"
}
function ze(t, e, r) {
    const n = r.config.validateStatus;
    r.status && n && !n(r.status) ? e(new fe("Request failed with status code " + r.status,[fe.ERR_BAD_REQUEST, fe.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],r.config,r.request,r)) : t(r)
}
Ie.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]),
    ht.reduceDescriptors(Ie.prototype, ( ({value: t}, e) => {
            let r = e[0].toUpperCase() + e.slice(1);
            return {
                get: () => t,
                set(t) {
                    this[r] = t
                }
            }
        }
    )),
    ht.freezeMethods(Ie),
    ht.inherits(Ye, fe, {
        __CANCEL__: !0
    });
const He = (t, e, r=3) => {
    let n = 0;
    const o = function(t, e) {
        t = t || 10;
        const r = new Array(t)
            , n = new Array(t);
        let o, i = 0, s = 0;
        return e = void 0 !== e ? e : 1e3,
            function(a) {
                const u = Date.now()
                    , c = n[s];
                o || (o = u),
                    r[i] = a,
                    n[i] = u;
                let f = s
                    , l = 0;
                for (; f !== i; )
                    l += r[f++],
                        f %= t;
                if (i = (i + 1) % t,
                i === s && (s = (s + 1) % t),
                u - o < e)
                    return;
                const h = c && u - c;
                return h ? Math.round(1e3 * l / h) : void 0
            }
    }(50, 250);
    return function(t, e) {
        let r, n, o = 0, i = 1e3 / e;
        const s = (e, i=Date.now()) => {
                o = i,
                    r = null,
                n && (clearTimeout(n),
                    n = null),
                    t.apply(null, e)
            }
        ;
        return [ (...t) => {
            const e = Date.now()
                , a = e - o;
            a >= i ? s(t, e) : (r = t,
            n || (n = setTimeout(( () => {
                    n = null,
                        s(r)
                }
            ), i - a)))
        }
            , () => r && s(r)]
    }((r => {
            const i = r.loaded
                , s = r.lengthComputable ? r.total : void 0
                , a = i - n
                , u = o(a);
            n = i;
            t({
                loaded: i,
                total: s,
                progress: s ? i / s : void 0,
                bytes: a,
                rate: u || void 0,
                estimated: u && s && i <= s ? (s - i) / u : void 0,
                event: r,
                lengthComputable: null != s,
                [e ? "download" : "upload"]: !0
            })
        }
    ), r)
}
    , Je = (t, e) => {
    const r = null != t;
    return [n => e[0]({
        lengthComputable: r,
        total: t,
        loaded: n
    }), e[1]]
}
    , Ve = t => (...e) => ht.asap(( () => t(...e)));
var We = xe.hasStandardBrowserEnv ? ( (t, e) => r => (r = new URL(r,xe.origin),
t.protocol === r.protocol && t.host === r.host && (e || t.port === r.port)))(new URL(xe.origin), xe.navigator && /(msie|trident)/i.test(xe.navigator.userAgent)) : () => !0
    , Ke = xe.hasStandardBrowserEnv ? {
    write(t, e, r, n, o, i) {
        const s = [t + "=" + encodeURIComponent(e)];
        ht.isNumber(r) && s.push("expires=" + new Date(r).toGMTString()),
        ht.isString(n) && s.push("path=" + n),
        ht.isString(o) && s.push("domain=" + o),
        !0 === i && s.push("secure"),
            document.cookie = s.join("; ")
    },
    read(t) {
        const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
        return e ? decodeURIComponent(e[3]) : null
    },
    remove(t) {
        this.write(t, "", Date.now() - 864e5)
    }
} : {
    write() {},
    read: () => null,
    remove() {}
};
function $e(t, e, r) {
    let n = !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
    return t && (n || 0 == r) ? function(t, e) {
        return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t
    }(t, e) : e
}
const Xe = t => t instanceof Ie ? {
    ...t
} : t;
function Ge(t, e) {
    e = e || {};
    const r = {};
    function n(t, e, r, n) {
        return ht.isPlainObject(t) && ht.isPlainObject(e) ? ht.merge.call({
            caseless: n
        }, t, e) : ht.isPlainObject(e) ? ht.merge({}, e) : ht.isArray(e) ? e.slice() : e
    }
    function o(t, e, r, o) {
        return ht.isUndefined(e) ? ht.isUndefined(t) ? void 0 : n(void 0, t, 0, o) : n(t, e, 0, o)
    }
    function i(t, e) {
        if (!ht.isUndefined(e))
            return n(void 0, e)
    }
    function s(t, e) {
        return ht.isUndefined(e) ? ht.isUndefined(t) ? void 0 : n(void 0, t) : n(void 0, e)
    }
    function a(r, o, i) {
        return i in e ? n(r, o) : i in t ? n(void 0, r) : void 0
    }
    const u = {
        url: i,
        method: i,
        data: i,
        baseURL: s,
        transformRequest: s,
        transformResponse: s,
        paramsSerializer: s,
        timeout: s,
        timeoutMessage: s,
        withCredentials: s,
        withXSRFToken: s,
        adapter: s,
        responseType: s,
        xsrfCookieName: s,
        xsrfHeaderName: s,
        onUploadProgress: s,
        onDownloadProgress: s,
        decompress: s,
        maxContentLength: s,
        maxBodyLength: s,
        beforeRedirect: s,
        transport: s,
        httpAgent: s,
        httpsAgent: s,
        cancelToken: s,
        socketPath: s,
        responseEncoding: s,
        validateStatus: a,
        headers: (t, e, r) => o(Xe(t), Xe(e), 0, !0)
    };
    return ht.forEach(Object.keys(Object.assign({}, t, e)), (function(n) {
            const i = u[n] || o
                , s = i(t[n], e[n], n);
            ht.isUndefined(s) && i !== a || (r[n] = s)
        }
    )),
        r
}
var Qe = t => {
        const e = Ge({}, t);
        let r, {data: n, withXSRFToken: o, xsrfHeaderName: i, xsrfCookieName: s, headers: a, auth: u} = e;
        if (e.headers = a = Ie.from(a),
            e.url = ve($e(e.baseURL, e.url, e.allowAbsoluteUrls), t.params, t.paramsSerializer),
        u && a.set("Authorization", "Basic " + btoa((u.username || "") + ":" + (u.password ? unescape(encodeURIComponent(u.password)) : ""))),
            ht.isFormData(n))
            if (xe.hasStandardBrowserEnv || xe.hasStandardBrowserWebWorkerEnv)
                a.setContentType(void 0);
            else if (!1 !== (r = a.getContentType())) {
                const [t,...e] = r ? r.split(";").map((t => t.trim())).filter(Boolean) : [];
                a.setContentType([t || "multipart/form-data", ...e].join("; "))
            }
        if (xe.hasStandardBrowserEnv && (o && ht.isFunction(o) && (o = o(e)),
        o || !1 !== o && We(e.url))) {
            const t = i && s && Ke.read(s);
            t && a.set(i, t)
        }
        return e
    }
;
var Ze = "undefined" != typeof XMLHttpRequest && function(t) {
        return new Promise((function(e, r) {
                const n = Qe(t);
                let o = n.data;
                const i = Ie.from(n.headers).normalize();
                let s, a, u, c, f, {responseType: l, onUploadProgress: h, onDownloadProgress: p} = n;
                function d() {
                    c && c(),
                    f && f(),
                    n.cancelToken && n.cancelToken.unsubscribe(s),
                    n.signal && n.signal.removeEventListener("abort", s)
                }
                let g = new XMLHttpRequest;
                function y() {
                    if (!g)
                        return;
                    const n = Ie.from("getAllResponseHeaders"in g && g.getAllResponseHeaders());
                    ze((function(t) {
                            e(t),
                                d()
                        }
                    ), (function(t) {
                            r(t),
                                d()
                        }
                    ), {
                        data: l && "text" !== l && "json" !== l ? g.response : g.responseText,
                        status: g.status,
                        statusText: g.statusText,
                        headers: n,
                        config: t,
                        request: g
                    }),
                        g = null
                }
                g.open(n.method.toUpperCase(), n.url, !0),
                    g.timeout = n.timeout,
                    "onloadend"in g ? g.onloadend = y : g.onreadystatechange = function() {
                        g && 4 === g.readyState && (0 !== g.status || g.responseURL && 0 === g.responseURL.indexOf("file:")) && setTimeout(y)
                    }
                    ,
                    g.onabort = function() {
                        g && (r(new fe("Request aborted",fe.ECONNABORTED,t,g)),
                            g = null)
                    }
                    ,
                    g.onerror = function() {
                        r(new fe("Network Error",fe.ERR_NETWORK,t,g)),
                            g = null
                    }
                    ,
                    g.ontimeout = function() {
                        let e = n.timeout ? "timeout of " + n.timeout + "ms exceeded" : "timeout exceeded";
                        const o = n.transitional || Te;
                        n.timeoutErrorMessage && (e = n.timeoutErrorMessage),
                            r(new fe(e,o.clarifyTimeoutError ? fe.ETIMEDOUT : fe.ECONNABORTED,t,g)),
                            g = null
                    }
                    ,
                void 0 === o && i.setContentType(null),
                "setRequestHeader"in g && ht.forEach(i.toJSON(), (function(t, e) {
                        g.setRequestHeader(e, t)
                    }
                )),
                ht.isUndefined(n.withCredentials) || (g.withCredentials = !!n.withCredentials),
                l && "json" !== l && (g.responseType = n.responseType),
                p && ([u,f] = He(p, !0),
                    g.addEventListener("progress", u)),
                h && g.upload && ([a,c] = He(h),
                    g.upload.addEventListener("progress", a),
                    g.upload.addEventListener("loadend", c)),
                (n.cancelToken || n.signal) && (s = e => {
                    g && (r(!e || e.type ? new Ye(null,t,g) : e),
                        g.abort(),
                        g = null)
                }
                    ,
                n.cancelToken && n.cancelToken.subscribe(s),
                n.signal && (n.signal.aborted ? s() : n.signal.addEventListener("abort", s)));
                const m = function(t) {
                    const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
                    return e && e[1] || ""
                }(n.url);
                m && -1 === xe.protocols.indexOf(m) ? r(new fe("Unsupported protocol " + m + ":",fe.ERR_BAD_REQUEST,t)) : g.send(o || null)
            }
        ))
    }
;
const tr = (t, e) => {
    const {length: r} = t = t ? t.filter(Boolean) : [];
    if (e || r) {
        let r, n = new AbortController;
        const o = function(t) {
            if (!r) {
                r = !0,
                    s();
                const e = t instanceof Error ? t : this.reason;
                n.abort(e instanceof fe ? e : new Ye(e instanceof Error ? e.message : e))
            }
        };
        let i = e && setTimeout(( () => {
                i = null,
                    o(new fe(`timeout ${e} of ms exceeded`,fe.ETIMEDOUT))
            }
        ), e);
        const s = () => {
                t && (i && clearTimeout(i),
                    i = null,
                    t.forEach((t => {
                            t.unsubscribe ? t.unsubscribe(o) : t.removeEventListener("abort", o)
                        }
                    )),
                    t = null)
            }
        ;
        t.forEach((t => t.addEventListener("abort", o)));
        const {signal: a} = n;
        return a.unsubscribe = () => ht.asap(s),
            a
    }
}
    , er = function*(t, e) {
    let r = t.byteLength;
    if (!e || r < e)
        return void (yield t);
    let n, o = 0;
    for (; o < r; )
        n = o + e,
            yield t.slice(o, n),
            o = n
}
    , rr = async function*(t) {
    if (t[Symbol.asyncIterator])
        return void (yield*t);
    const e = t.getReader();
    try {
        for (; ; ) {
            const {done: t, value: r} = await e.read();
            if (t)
                break;
            yield r
        }
    } finally {
        await e.cancel()
    }
}
    , nr = (t, e, r, n) => {
    const o = async function*(t, e) {
        for await(const r of rr(t))
            yield*er(r, e)
    }(t, e);
    let i, s = 0, a = t => {
            i || (i = !0,
            n && n(t))
        }
    ;
    return new ReadableStream({
        async pull(t) {
            try {
                const {done: e, value: n} = await o.next();
                if (e)
                    return a(),
                        void t.close();
                let i = n.byteLength;
                if (r) {
                    let t = s += i;
                    r(t)
                }
                t.enqueue(new Uint8Array(n))
            } catch (t) {
                throw a(t),
                    t
            }
        },
        cancel: t => (a(t),
            o.return())
    },{
        highWaterMark: 2
    })
}
    , or = "function" == typeof fetch && "function" == typeof Request && "function" == typeof Response
    , ir = or && "function" == typeof ReadableStream
    , sr = or && ("function" == typeof TextEncoder ? (ar = new TextEncoder,
    t => ar.encode(t)) : async t => new Uint8Array(await new Response(t).arrayBuffer()));
var ar;
const ur = (t, ...e) => {
    try {
        return !!t(...e)
    } catch (t) {
        return !1
    }
}
    , cr = ir && ur(( () => {
        let t = !1;
        const e = new Request(xe.origin,{
            body: new ReadableStream,
            method: "POST",
            get duplex() {
                return t = !0,
                    "half"
            }
        }).headers.has("Content-Type");
        return t && !e
    }
))
    , fr = ir && ur(( () => ht.isReadableStream(new Response("").body)))
    , lr = {
    stream: fr && (t => t.body)
};
var hr;
or && (hr = new Response,
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t => {
            !lr[t] && (lr[t] = ht.isFunction(hr[t]) ? e => e[t]() : (e, r) => {
                    throw new fe(`Response type '${t}' is not supported`,fe.ERR_NOT_SUPPORT,r)
                }
            )
        }
    )));
const pr = async (t, e) => {
        const r = ht.toFiniteNumber(t.getContentLength());
        return null == r ? (async t => {
                if (null == t)
                    return 0;
                if (ht.isBlob(t))
                    return t.size;
                if (ht.isSpecCompliantForm(t)) {
                    const e = new Request(xe.origin,{
                        method: "POST",
                        body: t
                    });
                    return (await e.arrayBuffer()).byteLength
                }
                return ht.isArrayBufferView(t) || ht.isArrayBuffer(t) ? t.byteLength : (ht.isURLSearchParams(t) && (t += ""),
                    ht.isString(t) ? (await sr(t)).byteLength : void 0)
            }
        )(e) : r
    }
;
var dr = or && (async t => {
        let {url: e, method: r, data: n, signal: o, cancelToken: i, timeout: s, onDownloadProgress: a, onUploadProgress: u, responseType: c, headers: f, withCredentials: l="same-origin", fetchOptions: h} = Qe(t);
        c = c ? (c + "").toLowerCase() : "text";
        let p, d = tr([o, i && i.toAbortSignal()], s);
        const g = d && d.unsubscribe && ( () => {
                d.unsubscribe()
            }
        );
        let y;
        try {
            if (u && cr && "get" !== r && "head" !== r && 0 !== (y = await pr(f, n))) {
                let t, r = new Request(e,{
                    method: "POST",
                    body: n,
                    duplex: "half"
                });
                if (ht.isFormData(n) && (t = r.headers.get("content-type")) && f.setContentType(t),
                    r.body) {
                    const [t,e] = Je(y, He(Ve(u)));
                    n = nr(r.body, 65536, t, e)
                }
            }
            ht.isString(l) || (l = l ? "include" : "omit");
            const o = "credentials"in Request.prototype;
            p = new Request(e,{
                ...h,
                signal: d,
                method: r.toUpperCase(),
                headers: f.normalize().toJSON(),
                body: n,
                duplex: "half",
                credentials: o ? l : void 0
            });
            let i = await fetch(p);
            const s = fr && ("stream" === c || "response" === c);
            if (fr && (a || s && g)) {
                const t = {};
                ["status", "statusText", "headers"].forEach((e => {
                        t[e] = i[e]
                    }
                ));
                const e = ht.toFiniteNumber(i.headers.get("content-length"))
                    , [r,n] = a && Je(e, He(Ve(a), !0)) || [];
                i = new Response(nr(i.body, 65536, r, ( () => {
                        n && n(),
                        g && g()
                    }
                )),t)
            }
            c = c || "text";
            let m = await lr[ht.findKey(lr, c) || "text"](i, t);
            return !s && g && g(),
                await new Promise(( (e, r) => {
                        ze(e, r, {
                            data: m,
                            headers: Ie.from(i.headers),
                            status: i.status,
                            statusText: i.statusText,
                            config: t,
                            request: p
                        })
                    }
                ))
        } catch (e) {
            if (g && g(),
            e && "TypeError" === e.name && /fetch/i.test(e.message))
                throw Object.assign(new fe("Network Error",fe.ERR_NETWORK,t,p), {
                    cause: e.cause || e
                });
            throw fe.from(e, e && e.code, t, p)
        }
    }
);
const gr = {
    http: null,
    xhr: Ze,
    fetch: dr
};
ht.forEach(gr, ( (t, e) => {
        if (t) {
            try {
                Object.defineProperty(t, "name", {
                    value: e
                })
            } catch (t) {}
            Object.defineProperty(t, "adapterName", {
                value: e
            })
        }
    }
));
const yr = t => `- ${t}`
    , mr = t => ht.isFunction(t) || null === t || !1 === t;
var wr = t => {
        t = ht.isArray(t) ? t : [t];
        const {length: e} = t;
        let r, n;
        const o = {};
        for (let i = 0; i < e; i++) {
            let e;
            if (r = t[i],
                n = r,
            !mr(r) && (n = gr[(e = String(r)).toLowerCase()],
            void 0 === n))
                throw new fe(`Unknown adapter '${e}'`);
            if (n)
                break;
            o[e || "#" + i] = n
        }
        if (!n) {
            const t = Object.entries(o).map(( ([t,e]) => `adapter ${t} ` + (!1 === e ? "is not supported by the environment" : "is not available in the build")));
            throw new fe("There is no suitable adapter to dispatch the request " + (e ? t.length > 1 ? "since :\n" + t.map(yr).join("\n") : " " + yr(t[0]) : "as no adapter specified"),"ERR_NOT_SUPPORT")
        }
        return n
    }
;
function br(t) {
    if (t.cancelToken && t.cancelToken.throwIfRequested(),
    t.signal && t.signal.aborted)
        throw new Ye(null,t)
}
function Er(t) {
    br(t),
        t.headers = Ie.from(t.headers),
        t.data = Me.call(t, t.transformRequest),
    -1 !== ["post", "put", "patch"].indexOf(t.method) && t.headers.setContentType("application/x-www-form-urlencoded", !1);
    return wr(t.adapter || Ne.adapter)(t).then((function(e) {
            return br(t),
                e.data = Me.call(t, t.transformResponse, e),
                e.headers = Ie.from(e.headers),
                e
        }
    ), (function(e) {
            return qe(e) || (br(t),
            e && e.response && (e.response.data = Me.call(t, t.transformResponse, e.response),
                e.response.headers = Ie.from(e.response.headers))),
                Promise.reject(e)
        }
    ))
}
const Rr = "1.8.4"
    , vr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(( (t, e) => {
        vr[t] = function(r) {
            return typeof r === t || "a" + (e < 1 ? "n " : " ") + t
        }
    }
));
const Ar = {};
vr.transitional = function(t, e, r) {
    function n(t, e) {
        return "[Axios v1.8.4] Transitional option '" + t + "'" + e + (r ? ". " + r : "")
    }
    return (r, o, i) => {
        if (!1 === t)
            throw new fe(n(o, " has been removed" + (e ? " in " + e : "")),fe.ERR_DEPRECATED);
        return e && !Ar[o] && (Ar[o] = !0,
            console.warn(n(o, " has been deprecated since v" + e + " and will be removed in the near future"))),
        !t || t(r, o, i)
    }
}
    ,
    vr.spelling = function(t) {
        return (e, r) => (console.warn(`${r} is likely a misspelling of ${t}`),
            !0)
    }
;
var Tr = {
    assertOptions: function(t, e, r) {
        if ("object" != typeof t)
            throw new fe("options must be an object",fe.ERR_BAD_OPTION_VALUE);
        const n = Object.keys(t);
        let o = n.length;
        for (; o-- > 0; ) {
            const i = n[o]
                , s = e[i];
            if (s) {
                const e = t[i]
                    , r = void 0 === e || s(e, i, t);
                if (!0 !== r)
                    throw new fe("option " + i + " must be " + r,fe.ERR_BAD_OPTION_VALUE)
            } else if (!0 !== r)
                throw new fe("Unknown option " + i,fe.ERR_BAD_OPTION)
        }
    },
    validators: vr
};
const Sr = Tr.validators;
class Or {
    constructor(t) {
        this.defaults = t,
            this.interceptors = {
                request: new Ae,
                response: new Ae
            }
    }
    async request(t, e) {
        try {
            return await this._request(t, e)
        } catch (t) {
            if (t instanceof Error) {
                let e = {};
                Error.captureStackTrace ? Error.captureStackTrace(e) : e = new Error;
                const r = e.stack ? e.stack.replace(/^.+\n/, "") : "";
                try {
                    t.stack ? r && !String(t.stack).endsWith(r.replace(/^.+\n.+\n/, "")) && (t.stack += "\n" + r) : t.stack = r
                } catch (t) {}
            }
            throw t
        }
    }
    _request(t, e) {
        "string" == typeof t ? (e = e || {}).url = t : e = t || {},
            e = Ge(this.defaults, e);
        const {transitional: r, paramsSerializer: n, headers: o} = e;
        void 0 !== r && Tr.assertOptions(r, {
            silentJSONParsing: Sr.transitional(Sr.boolean),
            forcedJSONParsing: Sr.transitional(Sr.boolean),
            clarifyTimeoutError: Sr.transitional(Sr.boolean)
        }, !1),
        null != n && (ht.isFunction(n) ? e.paramsSerializer = {
            serialize: n
        } : Tr.assertOptions(n, {
            encode: Sr.function,
            serialize: Sr.function
        }, !0)),
        void 0 !== e.allowAbsoluteUrls || (void 0 !== this.defaults.allowAbsoluteUrls ? e.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : e.allowAbsoluteUrls = !0),
            Tr.assertOptions(e, {
                baseUrl: Sr.spelling("baseURL"),
                withXsrfToken: Sr.spelling("withXSRFToken")
            }, !0),
            e.method = (e.method || this.defaults.method || "get").toLowerCase();
        let i = o && ht.merge(o.common, o[e.method]);
        o && ht.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (t => {
                delete o[t]
            }
        )),
            e.headers = Ie.concat(i, o);
        const s = [];
        let a = !0;
        this.interceptors.request.forEach((function(t) {
                "function" == typeof t.runWhen && !1 === t.runWhen(e) || (a = a && t.synchronous,
                    s.unshift(t.fulfilled, t.rejected))
            }
        ));
        const u = [];
        let c;
        this.interceptors.response.forEach((function(t) {
                u.push(t.fulfilled, t.rejected)
            }
        ));
        let f, l = 0;
        if (!a) {
            const t = [Er.bind(this), void 0];
            for (t.unshift.apply(t, s),
                     t.push.apply(t, u),
                     f = t.length,
                     c = Promise.resolve(e); l < f; )
                c = c.then(t[l++], t[l++]);
            return c
        }
        f = s.length;
        let h = e;
        for (l = 0; l < f; ) {
            const t = s[l++]
                , e = s[l++];
            try {
                h = t(h)
            } catch (t) {
                e.call(this, t);
                break
            }
        }
        try {
            c = Er.call(this, h)
        } catch (t) {
            return Promise.reject(t)
        }
        for (l = 0,
                 f = u.length; l < f; )
            c = c.then(u[l++], u[l++]);
        return c
    }
    getUri(t) {
        return ve($e((t = Ge(this.defaults, t)).baseURL, t.url, t.allowAbsoluteUrls), t.params, t.paramsSerializer)
    }
}
ht.forEach(["delete", "get", "head", "options"], (function(t) {
        Or.prototype[t] = function(e, r) {
            return this.request(Ge(r || {}, {
                method: t,
                url: e,
                data: (r || {}).data
            }))
        }
    }
)),
    ht.forEach(["post", "put", "patch"], (function(t) {
            function e(e) {
                return function(r, n, o) {
                    return this.request(Ge(o || {}, {
                        method: t,
                        headers: e ? {
                            "Content-Type": "multipart/form-data"
                        } : {},
                        url: r,
                        data: n
                    }))
                }
            }
            Or.prototype[t] = e(),
                Or.prototype[t + "Form"] = e(!0)
        }
    ));
class _r {
    constructor(t) {
        if ("function" != typeof t)
            throw new TypeError("executor must be a function.");
        let e;
        this.promise = new Promise((function(t) {
                e = t
            }
        ));
        const r = this;
        this.promise.then((t => {
                if (!r._listeners)
                    return;
                let e = r._listeners.length;
                for (; e-- > 0; )
                    r._listeners[e](t);
                r._listeners = null
            }
        )),
            this.promise.then = t => {
                let e;
                const n = new Promise((t => {
                        r.subscribe(t),
                            e = t
                    }
                )).then(t);
                return n.cancel = function() {
                    r.unsubscribe(e)
                }
                    ,
                    n
            }
            ,
            t((function(t, n, o) {
                    r.reason || (r.reason = new Ye(t,n,o),
                        e(r.reason))
                }
            ))
    }
    throwIfRequested() {
        if (this.reason)
            throw this.reason
    }
    subscribe(t) {
        this.reason ? t(this.reason) : this._listeners ? this._listeners.push(t) : this._listeners = [t]
    }
    unsubscribe(t) {
        if (!this._listeners)
            return;
        const e = this._listeners.indexOf(t);
        -1 !== e && this._listeners.splice(e, 1)
    }
    toAbortSignal() {
        const t = new AbortController
            , e = e => {
                t.abort(e)
            }
        ;
        return this.subscribe(e),
            t.signal.unsubscribe = () => this.unsubscribe(e),
            t.signal
    }
    static source() {
        let t;
        return {
            token: new _r((function(e) {
                    t = e
                }
            )),
            cancel: t
        }
    }
}
const Pr = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
};
Object.entries(Pr).forEach(( ([t,e]) => {
        Pr[e] = t
    }
));
const Ur = function t(e) {
    const r = new Or(e)
        , n = S(Or.prototype.request, r);
    return ht.extend(n, Or.prototype, r, {
        allOwnKeys: !0
    }),
        ht.extend(n, r, null, {
            allOwnKeys: !0
        }),
        n.create = function(r) {
            return t(Ge(e, r))
        }
        ,
        n
}(Ne);
Ur.Axios = Or,
    Ur.CanceledError = Ye,
    Ur.CancelToken = _r,
    Ur.isCancel = qe,
    Ur.VERSION = Rr,
    Ur.toFormData = me,
    Ur.AxiosError = fe,
    Ur.Cancel = Ur.CanceledError,
    Ur.all = function(t) {
        return Promise.all(t)
    }
    ,
    Ur.spread = function(t) {
        return function(e) {
            return t.apply(null, e)
        }
    }
    ,
    Ur.isAxiosError = function(t) {
        return ht.isObject(t) && !0 === t.isAxiosError
    }
    ,
    Ur.mergeConfig = Ge,
    Ur.AxiosHeaders = Ie,
    Ur.formToJSON = t => Be(ht.isHTMLForm(t) ? new FormData(t) : t),
    Ur.getAdapter = wr,
    Ur.HttpStatusCode = Pr,
    Ur.default = Ur;
const {Axios: Cr, AxiosError: xr, CanceledError: Br, isCancel: Nr, CancelToken: Lr, VERSION: jr, all: Dr, Cancel: Fr, isAxiosError: kr, spread: Ir, toFormData: Mr, AxiosHeaders: qr, HttpStatusCode: Yr, formToJSON: zr, getAdapter: Hr, mergeConfig: Jr} = Ur;
export {Cr as Axios, xr as AxiosError, qr as AxiosHeaders, Fr as Cancel, Lr as CancelToken, Br as CanceledError, Yr as HttpStatusCode, jr as VERSION, Dr as all, Ur as default, zr as formToJSON, Hr as getAdapter, kr as isAxiosError, Nr as isCancel, Jr as mergeConfig, Ir as spread, Mr as toFormData};
//# sourceMappingURL=/sm/dffbd0f7138dd7fb28d6c23ae11916ea1d36292e9ddcc94cdf846d48199d3732.map
export default Ur
