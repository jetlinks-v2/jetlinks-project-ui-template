/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/axios@1.9.0/index.js
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
    , {iterator: P, toStringTag: U} = Symbol
    , C = (x = Object.create(null),
        t => {
            const e = O.call(t);
            return x[e] || (x[e] = e.slice(8, -1).toLowerCase())
        }
);
var x;
const B = t => (t = t.toLowerCase(),
    e => C(e) === t)
    , N = t => e => typeof e === t
    , {isArray: L} = Array
    , j = N("undefined");
const D = B("ArrayBuffer");
const k = N("string")
    , F = N("function")
    , I = N("number")
    , M = t => null !== t && "object" == typeof t
    , q = t => {
    if ("object" !== C(t))
        return !1;
    const e = _(t);
    return !(null !== e && e !== Object.prototype && null !== Object.getPrototypeOf(e) || U in t || P in t)
}
    , Y = B("Date")
    , z = B("File")
    , H = B("Blob")
    , J = B("FileList")
    , V = B("URLSearchParams")
    , [W,K,$,X] = ["ReadableStream", "Request", "Response", "Headers"].map(B);
function G(t, e, {allOwnKeys: r=!1}={}) {
    if (null == t)
        return;
    let n, o;
    if ("object" != typeof t && (t = [t]),
        L(t))
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
function Q(t, e) {
    e = e.toLowerCase();
    const r = Object.keys(t);
    let n, o = r.length;
    for (; o-- > 0; )
        if (n = r[o],
        e === n.toLowerCase())
            return n;
    return null
}
const Z = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : t
    , tt = t => !j(t) && t !== Z;
const et = (rt = "undefined" != typeof Uint8Array && _(Uint8Array),
    t => rt && t instanceof rt);
var rt;
const nt = B("HTMLFormElement")
    , ot = ( ({hasOwnProperty: t}) => (e, r) => t.call(e, r))(Object.prototype)
    , it = B("RegExp")
    , st = (t, e) => {
        const r = Object.getOwnPropertyDescriptors(t)
            , n = {};
        G(r, ( (r, o) => {
                let i;
                !1 !== (i = e(r, o, t)) && (n[o] = i || r)
            }
        )),
            Object.defineProperties(t, n)
    }
;
const at = B("AsyncFunction")
    , ut = (ct = "function" == typeof setImmediate,
    ft = F(Z.postMessage),
    ct ? setImmediate : ft ? (lt = `axios@${Math.random()}`,
            ht = [],
            Z.addEventListener("message", ( ({source: t, data: e}) => {
                    t === Z && e === lt && ht.length && ht.shift()()
                }
            ), !1),
            t => {
                ht.push(t),
                    Z.postMessage(lt, "*")
            }
    ) : t => setTimeout(t));
var ct, ft, lt, ht;
const pt = "undefined" != typeof queueMicrotask ? queueMicrotask.bind(Z) : T.nextTick || ut;
var dt = {
    isArray: L,
    isArrayBuffer: D,
    isBuffer: function(t) {
        return null !== t && !j(t) && null !== t.constructor && !j(t.constructor) && F(t.constructor.isBuffer) && t.constructor.isBuffer(t)
    },
    isFormData: t => {
        let e;
        return t && ("function" == typeof FormData && t instanceof FormData || F(t.append) && ("formdata" === (e = C(t)) || "object" === e && F(t.toString) && "[object FormData]" === t.toString()))
    }
    ,
    isArrayBufferView: function(t) {
        let e;
        return e = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer && D(t.buffer),
            e
    },
    isString: k,
    isNumber: I,
    isBoolean: t => !0 === t || !1 === t,
    isObject: M,
    isPlainObject: q,
    isReadableStream: W,
    isRequest: K,
    isResponse: $,
    isHeaders: X,
    isUndefined: j,
    isDate: Y,
    isFile: z,
    isBlob: H,
    isRegExp: it,
    isFunction: F,
    isStream: t => M(t) && F(t.pipe),
    isURLSearchParams: V,
    isTypedArray: et,
    isFileList: J,
    forEach: G,
    merge: function t() {
        const {caseless: e} = tt(this) && this || {}
            , r = {}
            , n = (n, o) => {
                const i = e && Q(r, o) || o;
                q(r[i]) && q(n) ? r[i] = t(r[i], n) : q(n) ? r[i] = t({}, n) : L(n) ? r[i] = n.slice() : r[i] = n
            }
        ;
        for (let t = 0, e = arguments.length; t < e; t++)
            arguments[t] && G(arguments[t], n);
        return r
    },
    extend: (t, e, r, {allOwnKeys: n}={}) => (G(e, ( (e, n) => {
            r && F(e) ? t[n] = S(e, r) : t[n] = e
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
    kindOf: C,
    kindOfTest: B,
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
        if (L(t))
            return t;
        let e = t.length;
        if (!I(e))
            return null;
        const r = new Array(e);
        for (; e-- > 0; )
            r[e] = t[e];
        return r
    }
    ,
    forEachEntry: (t, e) => {
        const r = (t && t[P]).call(t);
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
    isHTMLForm: nt,
    hasOwnProperty: ot,
    hasOwnProp: ot,
    reduceDescriptors: st,
    freezeMethods: t => {
        st(t, ( (e, r) => {
                if (F(t) && -1 !== ["arguments", "caller", "callee"].indexOf(r))
                    return !1;
                const n = t[r];
                F(n) && (e.enumerable = !1,
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
        return L(t) ? n(t) : n(String(t).split(e)),
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
    findKey: Q,
    global: Z,
    isContextDefined: tt,
    isSpecCompliantForm: function(t) {
        return !!(t && F(t.append) && "FormData" === t[U] && t[P])
    },
    toJSONObject: t => {
        const e = new Array(10)
            , r = (t, n) => {
                if (M(t)) {
                    if (e.indexOf(t) >= 0)
                        return;
                    if (!("toJSON"in t)) {
                        e[n] = t;
                        const o = L(t) ? [] : {};
                        return G(t, ( (t, e) => {
                                const i = r(t, n + 1);
                                !j(i) && (o[e] = i)
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
    isAsyncFn: at,
    isThenable: t => t && (M(t) || F(t)) && F(t.then) && F(t.catch),
    setImmediate: ut,
    asap: pt,
    isIterable: t => null != t && F(t[P])
}
    , gt = []
    , yt = []
    , mt = "undefined" != typeof Uint8Array ? Uint8Array : Array
    , wt = !1;
function bt() {
    wt = !0;
    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = 0; e < 64; ++e)
        gt[e] = t[e],
            yt[t.charCodeAt(e)] = e;
    yt["-".charCodeAt(0)] = 62,
        yt["_".charCodeAt(0)] = 63
}
function Et(t, e, r) {
    for (var n, o, i = [], s = e; s < r; s += 3)
        n = (t[s] << 16) + (t[s + 1] << 8) + t[s + 2],
            i.push(gt[(o = n) >> 18 & 63] + gt[o >> 12 & 63] + gt[o >> 6 & 63] + gt[63 & o]);
    return i.join("")
}
function Rt(t) {
    var e;
    wt || bt();
    for (var r = t.length, n = r % 3, o = "", i = [], s = 16383, a = 0, u = r - n; a < u; a += s)
        i.push(Et(t, a, a + s > u ? u : a + s));
    return 1 === n ? (e = t[r - 1],
        o += gt[e >> 2],
        o += gt[e << 4 & 63],
        o += "==") : 2 === n && (e = (t[r - 2] << 8) + t[r - 1],
        o += gt[e >> 10],
        o += gt[e >> 4 & 63],
        o += gt[e << 2 & 63],
        o += "="),
        i.push(o),
        i.join("")
}
function vt(t, e, r, n, o) {
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
function At(t, e, r, n, o, i) {
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
var Tt = {}.toString
    , St = Array.isArray || function(t) {
        return "[object Array]" == Tt.call(t)
    }
;
function Ot() {
    return Pt.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
}
function _t(t, e) {
    if (Ot() < e)
        throw new RangeError("Invalid typed array length");
    return Pt.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = Pt.prototype : (null === t && (t = new Pt(e)),
        t.length = e),
        t
}
function Pt(t, e, r) {
    if (!(Pt.TYPED_ARRAY_SUPPORT || this instanceof Pt))
        return new Pt(t,e,r);
    if ("number" == typeof t) {
        if ("string" == typeof e)
            throw new Error("If encoding is specified then the first argument must be a string");
        return xt(this, t)
    }
    return Ut(this, t, e, r)
}
function Ut(t, e, r, n) {
    if ("number" == typeof e)
        throw new TypeError('"value" argument must not be a number');
    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, r, n) {
        if (e.byteLength,
        r < 0 || e.byteLength < r)
            throw new RangeError("'offset' is out of bounds");
        if (e.byteLength < r + (n || 0))
            throw new RangeError("'length' is out of bounds");
        e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e,r) : new Uint8Array(e,r,n);
        Pt.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = Pt.prototype : t = Bt(t, e);
        return t
    }(t, e, r, n) : "string" == typeof e ? function(t, e, r) {
        "string" == typeof r && "" !== r || (r = "utf8");
        if (!Pt.isEncoding(r))
            throw new TypeError('"encoding" must be a valid string encoding');
        var n = 0 | jt(e, r);
        t = _t(t, n);
        var o = t.write(e, r);
        o !== n && (t = t.slice(0, o));
        return t
    }(t, e, r) : function(t, e) {
        if (Lt(e)) {
            var r = 0 | Nt(e.length);
            return 0 === (t = _t(t, r)).length || e.copy(t, 0, 0, r),
                t
        }
        if (e) {
            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length"in e)
                return "number" != typeof e.length || (n = e.length) != n ? _t(t, 0) : Bt(t, e);
            if ("Buffer" === e.type && St(e.data))
                return Bt(t, e.data)
        }
        var n;
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
    }(t, e)
}
function Ct(t) {
    if ("number" != typeof t)
        throw new TypeError('"size" argument must be a number');
    if (t < 0)
        throw new RangeError('"size" argument must not be negative')
}
function xt(t, e) {
    if (Ct(e),
        t = _t(t, e < 0 ? 0 : 0 | Nt(e)),
        !Pt.TYPED_ARRAY_SUPPORT)
        for (var r = 0; r < e; ++r)
            t[r] = 0;
    return t
}
function Bt(t, e) {
    var r = e.length < 0 ? 0 : 0 | Nt(e.length);
    t = _t(t, r);
    for (var n = 0; n < r; n += 1)
        t[n] = 255 & e[n];
    return t
}
function Nt(t) {
    if (t >= Ot())
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + Ot().toString(16) + " bytes");
    return 0 | t
}
function Lt(t) {
    return !(null == t || !t._isBuffer)
}
function jt(t, e) {
    if (Lt(t))
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
                return ue(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * r;
            case "hex":
                return r >>> 1;
            case "base64":
                return ce(t).length;
            default:
                if (n)
                    return ue(t).length;
                e = ("" + e).toLowerCase(),
                    n = !0
        }
}
function Dt(t, e, r) {
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
                return Gt(this, e, r);
            case "utf8":
            case "utf-8":
                return Wt(this, e, r);
            case "ascii":
                return $t(this, e, r);
            case "latin1":
            case "binary":
                return Xt(this, e, r);
            case "base64":
                return Vt(this, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return Qt(this, e, r);
            default:
                if (n)
                    throw new TypeError("Unknown encoding: " + t);
                t = (t + "").toLowerCase(),
                    n = !0
        }
}
function kt(t, e, r) {
    var n = t[e];
    t[e] = t[r],
        t[r] = n
}
function Ft(t, e, r, n, o) {
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
    if ("string" == typeof e && (e = Pt.from(e, n)),
        Lt(e))
        return 0 === e.length ? -1 : It(t, e, r, n, o);
    if ("number" == typeof e)
        return e &= 255,
            Pt.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : It(t, [e], r, n, o);
    throw new TypeError("val must be string, number or Buffer")
}
function It(t, e, r, n, o) {
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
function Mt(t, e, r, n) {
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
function qt(t, e, r, n) {
    return fe(ue(e, t.length - r), t, r, n)
}
function Yt(t, e, r, n) {
    return fe(function(t) {
        for (var e = [], r = 0; r < t.length; ++r)
            e.push(255 & t.charCodeAt(r));
        return e
    }(e), t, r, n)
}
function zt(t, e, r, n) {
    return Yt(t, e, r, n)
}
function Ht(t, e, r, n) {
    return fe(ce(e), t, r, n)
}
function Jt(t, e, r, n) {
    return fe(function(t, e) {
        for (var r, n, o, i = [], s = 0; s < t.length && !((e -= 2) < 0); ++s)
            n = (r = t.charCodeAt(s)) >> 8,
                o = r % 256,
                i.push(o),
                i.push(n);
        return i
    }(e, t.length - r), t, r, n)
}
function Vt(t, e, r) {
    return 0 === e && r === t.length ? Rt(t) : Rt(t.slice(e, r))
}
function Wt(t, e, r) {
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
        if (e <= Kt)
            return String.fromCharCode.apply(String, t);
        var r = ""
            , n = 0;
        for (; n < e; )
            r += String.fromCharCode.apply(String, t.slice(n, n += Kt));
        return r
    }(n)
}
Pt.TYPED_ARRAY_SUPPORT = void 0 === t.TYPED_ARRAY_SUPPORT || t.TYPED_ARRAY_SUPPORT,
    Ot(),
    Pt.poolSize = 8192,
    Pt._augment = function(t) {
        return t.__proto__ = Pt.prototype,
            t
    }
    ,
    Pt.from = function(t, e, r) {
        return Ut(null, t, e, r)
    }
    ,
Pt.TYPED_ARRAY_SUPPORT && (Pt.prototype.__proto__ = Uint8Array.prototype,
    Pt.__proto__ = Uint8Array,
"undefined" != typeof Symbol && Symbol.species && Pt[Symbol.species]),
    Pt.alloc = function(t, e, r) {
        return function(t, e, r, n) {
            return Ct(e),
                e <= 0 ? _t(t, e) : void 0 !== r ? "string" == typeof n ? _t(t, e).fill(r, n) : _t(t, e).fill(r) : _t(t, e)
        }(null, t, e, r)
    }
    ,
    Pt.allocUnsafe = function(t) {
        return xt(null, t)
    }
    ,
    Pt.allocUnsafeSlow = function(t) {
        return xt(null, t)
    }
    ,
    Pt.isBuffer = function(t) {
        return null != t && (!!t._isBuffer || le(t) || function(t) {
            return "function" == typeof t.readFloatLE && "function" == typeof t.slice && le(t.slice(0, 0))
        }(t))
    }
    ,
    Pt.compare = function(t, e) {
        if (!Lt(t) || !Lt(e))
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
    Pt.isEncoding = function(t) {
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
    Pt.concat = function(t, e) {
        if (!St(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length)
            return Pt.alloc(0);
        var r;
        if (void 0 === e)
            for (e = 0,
                     r = 0; r < t.length; ++r)
                e += t[r].length;
        var n = Pt.allocUnsafe(e)
            , o = 0;
        for (r = 0; r < t.length; ++r) {
            var i = t[r];
            if (!Lt(i))
                throw new TypeError('"list" argument must be an Array of Buffers');
            i.copy(n, o),
                o += i.length
        }
        return n
    }
    ,
    Pt.byteLength = jt,
    Pt.prototype._isBuffer = !0,
    Pt.prototype.swap16 = function() {
        var t = this.length;
        if (t % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < t; e += 2)
            kt(this, e, e + 1);
        return this
    }
    ,
    Pt.prototype.swap32 = function() {
        var t = this.length;
        if (t % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < t; e += 4)
            kt(this, e, e + 3),
                kt(this, e + 1, e + 2);
        return this
    }
    ,
    Pt.prototype.swap64 = function() {
        var t = this.length;
        if (t % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < t; e += 8)
            kt(this, e, e + 7),
                kt(this, e + 1, e + 6),
                kt(this, e + 2, e + 5),
                kt(this, e + 3, e + 4);
        return this
    }
    ,
    Pt.prototype.toString = function() {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? Wt(this, 0, t) : Dt.apply(this, arguments)
    }
    ,
    Pt.prototype.equals = function(t) {
        if (!Lt(t))
            throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === Pt.compare(this, t)
    }
    ,
    Pt.prototype.inspect = function() {
        var t = "";
        return this.length > 0 && (t = this.toString("hex", 0, 50).match(/.{2}/g).join(" "),
        this.length > 50 && (t += " ... ")),
        "<Buffer " + t + ">"
    }
    ,
    Pt.prototype.compare = function(t, e, r, n, o) {
        if (!Lt(t))
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
    Pt.prototype.includes = function(t, e, r) {
        return -1 !== this.indexOf(t, e, r)
    }
    ,
    Pt.prototype.indexOf = function(t, e, r) {
        return Ft(this, t, e, r, !0)
    }
    ,
    Pt.prototype.lastIndexOf = function(t, e, r) {
        return Ft(this, t, e, r, !1)
    }
    ,
    Pt.prototype.write = function(t, e, r, n) {
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
                    return Mt(this, t, e, r);
                case "utf8":
                case "utf-8":
                    return qt(this, t, e, r);
                case "ascii":
                    return Yt(this, t, e, r);
                case "latin1":
                case "binary":
                    return zt(this, t, e, r);
                case "base64":
                    return Ht(this, t, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return Jt(this, t, e, r);
                default:
                    if (i)
                        throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(),
                        i = !0
            }
    }
    ,
    Pt.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    }
;
var Kt = 4096;
function $t(t, e, r) {
    var n = "";
    r = Math.min(t.length, r);
    for (var o = e; o < r; ++o)
        n += String.fromCharCode(127 & t[o]);
    return n
}
function Xt(t, e, r) {
    var n = "";
    r = Math.min(t.length, r);
    for (var o = e; o < r; ++o)
        n += String.fromCharCode(t[o]);
    return n
}
function Gt(t, e, r) {
    var n = t.length;
    (!e || e < 0) && (e = 0),
    (!r || r < 0 || r > n) && (r = n);
    for (var o = "", i = e; i < r; ++i)
        o += ae(t[i]);
    return o
}
function Qt(t, e, r) {
    for (var n = t.slice(e, r), o = "", i = 0; i < n.length; i += 2)
        o += String.fromCharCode(n[i] + 256 * n[i + 1]);
    return o
}
function Zt(t, e, r) {
    if (t % 1 != 0 || t < 0)
        throw new RangeError("offset is not uint");
    if (t + e > r)
        throw new RangeError("Trying to access beyond buffer length")
}
function te(t, e, r, n, o, i) {
    if (!Lt(t))
        throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > o || e < i)
        throw new RangeError('"value" argument is out of bounds');
    if (r + n > t.length)
        throw new RangeError("Index out of range")
}
function ee(t, e, r, n) {
    e < 0 && (e = 65535 + e + 1);
    for (var o = 0, i = Math.min(t.length - r, 2); o < i; ++o)
        t[r + o] = (e & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o)
}
function re(t, e, r, n) {
    e < 0 && (e = 4294967295 + e + 1);
    for (var o = 0, i = Math.min(t.length - r, 4); o < i; ++o)
        t[r + o] = e >>> 8 * (n ? o : 3 - o) & 255
}
function ne(t, e, r, n, o, i) {
    if (r + n > t.length)
        throw new RangeError("Index out of range");
    if (r < 0)
        throw new RangeError("Index out of range")
}
function oe(t, e, r, n, o) {
    return o || ne(t, 0, r, 4),
        At(t, e, r, n, 23, 4),
    r + 4
}
function ie(t, e, r, n, o) {
    return o || ne(t, 0, r, 8),
        At(t, e, r, n, 52, 8),
    r + 8
}
Pt.prototype.slice = function(t, e) {
    var r, n = this.length;
    if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
        (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
    e < t && (e = t),
        Pt.TYPED_ARRAY_SUPPORT)
        (r = this.subarray(t, e)).__proto__ = Pt.prototype;
    else {
        var o = e - t;
        r = new Pt(o,void 0);
        for (var i = 0; i < o; ++i)
            r[i] = this[i + t]
    }
    return r
}
    ,
    Pt.prototype.readUIntLE = function(t, e, r) {
        t |= 0,
            e |= 0,
        r || Zt(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
            n += this[t + i] * o;
        return n
    }
    ,
    Pt.prototype.readUIntBE = function(t, e, r) {
        t |= 0,
            e |= 0,
        r || Zt(t, e, this.length);
        for (var n = this[t + --e], o = 1; e > 0 && (o *= 256); )
            n += this[t + --e] * o;
        return n
    }
    ,
    Pt.prototype.readUInt8 = function(t, e) {
        return e || Zt(t, 1, this.length),
            this[t]
    }
    ,
    Pt.prototype.readUInt16LE = function(t, e) {
        return e || Zt(t, 2, this.length),
        this[t] | this[t + 1] << 8
    }
    ,
    Pt.prototype.readUInt16BE = function(t, e) {
        return e || Zt(t, 2, this.length),
        this[t] << 8 | this[t + 1]
    }
    ,
    Pt.prototype.readUInt32LE = function(t, e) {
        return e || Zt(t, 4, this.length),
        (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
    }
    ,
    Pt.prototype.readUInt32BE = function(t, e) {
        return e || Zt(t, 4, this.length),
        16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
    }
    ,
    Pt.prototype.readIntLE = function(t, e, r) {
        t |= 0,
            e |= 0,
        r || Zt(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
            n += this[t + i] * o;
        return n >= (o *= 128) && (n -= Math.pow(2, 8 * e)),
            n
    }
    ,
    Pt.prototype.readIntBE = function(t, e, r) {
        t |= 0,
            e |= 0,
        r || Zt(t, e, this.length);
        for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256); )
            i += this[t + --n] * o;
        return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)),
            i
    }
    ,
    Pt.prototype.readInt8 = function(t, e) {
        return e || Zt(t, 1, this.length),
            128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
    }
    ,
    Pt.prototype.readInt16LE = function(t, e) {
        e || Zt(t, 2, this.length);
        var r = this[t] | this[t + 1] << 8;
        return 32768 & r ? 4294901760 | r : r
    }
    ,
    Pt.prototype.readInt16BE = function(t, e) {
        e || Zt(t, 2, this.length);
        var r = this[t + 1] | this[t] << 8;
        return 32768 & r ? 4294901760 | r : r
    }
    ,
    Pt.prototype.readInt32LE = function(t, e) {
        return e || Zt(t, 4, this.length),
        this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
    }
    ,
    Pt.prototype.readInt32BE = function(t, e) {
        return e || Zt(t, 4, this.length),
        this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
    }
    ,
    Pt.prototype.readFloatLE = function(t, e) {
        return e || Zt(t, 4, this.length),
            vt(this, t, !0, 23, 4)
    }
    ,
    Pt.prototype.readFloatBE = function(t, e) {
        return e || Zt(t, 4, this.length),
            vt(this, t, !1, 23, 4)
    }
    ,
    Pt.prototype.readDoubleLE = function(t, e) {
        return e || Zt(t, 8, this.length),
            vt(this, t, !0, 52, 8)
    }
    ,
    Pt.prototype.readDoubleBE = function(t, e) {
        return e || Zt(t, 8, this.length),
            vt(this, t, !1, 52, 8)
    }
    ,
    Pt.prototype.writeUIntLE = function(t, e, r, n) {
        (t = +t,
            e |= 0,
            r |= 0,
            n) || te(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var o = 1
            , i = 0;
        for (this[e] = 255 & t; ++i < r && (o *= 256); )
            this[e + i] = t / o & 255;
        return e + r
    }
    ,
    Pt.prototype.writeUIntBE = function(t, e, r, n) {
        (t = +t,
            e |= 0,
            r |= 0,
            n) || te(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
        var o = r - 1
            , i = 1;
        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
            this[e + o] = t / i & 255;
        return e + r
    }
    ,
    Pt.prototype.writeUInt8 = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || te(this, t, e, 1, 255, 0),
        Pt.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            this[e] = 255 & t,
        e + 1
    }
    ,
    Pt.prototype.writeUInt16LE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || te(this, t, e, 2, 65535, 0),
            Pt.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                this[e + 1] = t >>> 8) : ee(this, t, e, !0),
        e + 2
    }
    ,
    Pt.prototype.writeUInt16BE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || te(this, t, e, 2, 65535, 0),
            Pt.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
                this[e + 1] = 255 & t) : ee(this, t, e, !1),
        e + 2
    }
    ,
    Pt.prototype.writeUInt32LE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || te(this, t, e, 4, 4294967295, 0),
            Pt.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24,
                this[e + 2] = t >>> 16,
                this[e + 1] = t >>> 8,
                this[e] = 255 & t) : re(this, t, e, !0),
        e + 4
    }
    ,
    Pt.prototype.writeUInt32BE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || te(this, t, e, 4, 4294967295, 0),
            Pt.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
                this[e + 1] = t >>> 16,
                this[e + 2] = t >>> 8,
                this[e + 3] = 255 & t) : re(this, t, e, !1),
        e + 4
    }
    ,
    Pt.prototype.writeIntLE = function(t, e, r, n) {
        if (t = +t,
            e |= 0,
            !n) {
            var o = Math.pow(2, 8 * r - 1);
            te(this, t, e, r, o - 1, -o)
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
    Pt.prototype.writeIntBE = function(t, e, r, n) {
        if (t = +t,
            e |= 0,
            !n) {
            var o = Math.pow(2, 8 * r - 1);
            te(this, t, e, r, o - 1, -o)
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
    Pt.prototype.writeInt8 = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || te(this, t, e, 1, 127, -128),
        Pt.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        t < 0 && (t = 255 + t + 1),
            this[e] = 255 & t,
        e + 1
    }
    ,
    Pt.prototype.writeInt16LE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || te(this, t, e, 2, 32767, -32768),
            Pt.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                this[e + 1] = t >>> 8) : ee(this, t, e, !0),
        e + 2
    }
    ,
    Pt.prototype.writeInt16BE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || te(this, t, e, 2, 32767, -32768),
            Pt.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
                this[e + 1] = 255 & t) : ee(this, t, e, !1),
        e + 2
    }
    ,
    Pt.prototype.writeInt32LE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || te(this, t, e, 4, 2147483647, -2147483648),
            Pt.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                this[e + 1] = t >>> 8,
                this[e + 2] = t >>> 16,
                this[e + 3] = t >>> 24) : re(this, t, e, !0),
        e + 4
    }
    ,
    Pt.prototype.writeInt32BE = function(t, e, r) {
        return t = +t,
            e |= 0,
        r || te(this, t, e, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
            Pt.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
                this[e + 1] = t >>> 16,
                this[e + 2] = t >>> 8,
                this[e + 3] = 255 & t) : re(this, t, e, !1),
        e + 4
    }
    ,
    Pt.prototype.writeFloatLE = function(t, e, r) {
        return oe(this, t, e, !0, r)
    }
    ,
    Pt.prototype.writeFloatBE = function(t, e, r) {
        return oe(this, t, e, !1, r)
    }
    ,
    Pt.prototype.writeDoubleLE = function(t, e, r) {
        return ie(this, t, e, !0, r)
    }
    ,
    Pt.prototype.writeDoubleBE = function(t, e, r) {
        return ie(this, t, e, !1, r)
    }
    ,
    Pt.prototype.copy = function(t, e, r, n) {
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
        else if (i < 1e3 || !Pt.TYPED_ARRAY_SUPPORT)
            for (o = 0; o < i; ++o)
                t[o + e] = this[o + r];
        else
            Uint8Array.prototype.set.call(t, this.subarray(r, r + i), e);
        return i
    }
    ,
    Pt.prototype.fill = function(t, e, r, n) {
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
            if ("string" == typeof n && !Pt.isEncoding(n))
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
            var s = Lt(t) ? t : ue(new Pt(t,n).toString())
                , a = s.length;
            for (i = 0; i < r - e; ++i)
                this[i + e] = s[i % a]
        }
        return this
    }
;
var se = /[^+\/0-9A-Za-z-_]/g;
function ae(t) {
    return t < 16 ? "0" + t.toString(16) : t.toString(16)
}
function ue(t, e) {
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
function ce(t) {
    return function(t) {
        var e, r, n, o, i, s;
        wt || bt();
        var a = t.length;
        if (a % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
        i = "=" === t[a - 2] ? 2 : "=" === t[a - 1] ? 1 : 0,
            s = new mt(3 * a / 4 - i),
            n = i > 0 ? a - 4 : a;
        var u = 0;
        for (e = 0,
                 r = 0; e < n; e += 4,
                 r += 3)
            o = yt[t.charCodeAt(e)] << 18 | yt[t.charCodeAt(e + 1)] << 12 | yt[t.charCodeAt(e + 2)] << 6 | yt[t.charCodeAt(e + 3)],
                s[u++] = o >> 16 & 255,
                s[u++] = o >> 8 & 255,
                s[u++] = 255 & o;
        return 2 === i ? (o = yt[t.charCodeAt(e)] << 2 | yt[t.charCodeAt(e + 1)] >> 4,
            s[u++] = 255 & o) : 1 === i && (o = yt[t.charCodeAt(e)] << 10 | yt[t.charCodeAt(e + 1)] << 4 | yt[t.charCodeAt(e + 2)] >> 2,
            s[u++] = o >> 8 & 255,
            s[u++] = 255 & o),
            s
    }(function(t) {
        if ((t = function(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        }(t).replace(se, "")).length < 2)
            return "";
        for (; t.length % 4 != 0; )
            t += "=";
        return t
    }(t))
}
function fe(t, e, r, n) {
    for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o)
        e[o + r] = t[o];
    return o
}
function le(t) {
    return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
}
function he(t, e, r, n, o) {
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
dt.inherits(he, Error, {
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
            config: dt.toJSONObject(this.config),
            code: this.code,
            status: this.status
        }
    }
});
const pe = he.prototype
    , de = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((t => {
        de[t] = {
            value: t
        }
    }
)),
    Object.defineProperties(he, de),
    Object.defineProperty(pe, "isAxiosError", {
        value: !0
    }),
    he.from = (t, e, r, n, o, i) => {
        const s = Object.create(pe);
        return dt.toFlatObject(t, s, (function(t) {
                return t !== Error.prototype
            }
        ), (t => "isAxiosError" !== t)),
            he.call(s, t.message, e, r, n, o),
            s.cause = t,
            s.name = t.name,
        i && Object.assign(s, i),
            s
    }
;
function ge(t) {
    return dt.isPlainObject(t) || dt.isArray(t)
}
function ye(t) {
    return dt.endsWith(t, "[]") ? t.slice(0, -2) : t
}
function me(t, e, r) {
    return t ? t.concat(e).map((function(t, e) {
            return t = ye(t),
                !r && e ? "[" + t + "]" : t
        }
    )).join(r ? "." : "") : e
}
const we = dt.toFlatObject(dt, {}, null, (function(t) {
        return /^is[A-Z]/.test(t)
    }
));
function be(t, e, r) {
    if (!dt.isObject(t))
        throw new TypeError("target must be an object");
    e = e || new FormData;
    const n = (r = dt.toFlatObject(r, {
        metaTokens: !0,
        dots: !1,
        indexes: !1
    }, !1, (function(t, e) {
            return !dt.isUndefined(e[t])
        }
    ))).metaTokens
        , o = r.visitor || c
        , i = r.dots
        , s = r.indexes
        , a = (r.Blob || "undefined" != typeof Blob && Blob) && dt.isSpecCompliantForm(e);
    if (!dt.isFunction(o))
        throw new TypeError("visitor must be a function");
    function u(t) {
        if (null === t)
            return "";
        if (dt.isDate(t))
            return t.toISOString();
        if (!a && dt.isBlob(t))
            throw new he("Blob is not supported. Use a Buffer instead.");
        return dt.isArrayBuffer(t) || dt.isTypedArray(t) ? a && "function" == typeof Blob ? new Blob([t]) : Pt.from(t) : t
    }
    function c(t, r, o) {
        let a = t;
        if (t && !o && "object" == typeof t)
            if (dt.endsWith(r, "{}"))
                r = n ? r : r.slice(0, -2),
                    t = JSON.stringify(t);
            else if (dt.isArray(t) && function(t) {
                return dt.isArray(t) && !t.some(ge)
            }(t) || (dt.isFileList(t) || dt.endsWith(r, "[]")) && (a = dt.toArray(t)))
                return r = ye(r),
                    a.forEach((function(t, n) {
                            !dt.isUndefined(t) && null !== t && e.append(!0 === s ? me([r], n, i) : null === s ? r : r + "[]", u(t))
                        }
                    )),
                    !1;
        return !!ge(t) || (e.append(me(o, r, i), u(t)),
            !1)
    }
    const f = []
        , l = Object.assign(we, {
        defaultVisitor: c,
        convertValue: u,
        isVisitable: ge
    });
    if (!dt.isObject(t))
        throw new TypeError("data must be an object");
    return function t(r, n) {
        if (!dt.isUndefined(r)) {
            if (-1 !== f.indexOf(r))
                throw Error("Circular reference detected in " + n.join("."));
            f.push(r),
                dt.forEach(r, (function(r, i) {
                        !0 === (!(dt.isUndefined(r) || null === r) && o.call(e, r, dt.isString(i) ? i.trim() : i, n, l)) && t(r, n ? n.concat(i) : [i])
                    }
                )),
                f.pop()
        }
    }(t),
        e
}
function Ee(t) {
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
function Re(t, e) {
    this._pairs = [],
    t && be(t, this, e)
}
const ve = Re.prototype;
function Ae(t) {
    return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}
function Te(t, e, r) {
    if (!e)
        return t;
    const n = r && r.encode || Ae;
    dt.isFunction(r) && (r = {
        serialize: r
    });
    const o = r && r.serialize;
    let i;
    if (i = o ? o(e, r) : dt.isURLSearchParams(e) ? e.toString() : new Re(e,r).toString(n),
        i) {
        const e = t.indexOf("#");
        -1 !== e && (t = t.slice(0, e)),
            t += (-1 === t.indexOf("?") ? "?" : "&") + i
    }
    return t
}
ve.append = function(t, e) {
    this._pairs.push([t, e])
}
    ,
    ve.toString = function(t) {
        const e = t ? function(e) {
                return t.call(this, e, Ee)
            }
            : Ee;
        return this._pairs.map((function(t) {
                return e(t[0]) + "=" + e(t[1])
            }
        ), "").join("&")
    }
;
class Se {
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
        dt.forEach(this.handlers, (function(e) {
                null !== e && t(e)
            }
        ))
    }
}
var Oe = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1
}
    , _e = {
    isBrowser: !0,
    classes: {
        URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : Re,
        FormData: "undefined" != typeof FormData ? FormData : null,
        Blob: "undefined" != typeof Blob ? Blob : null
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
};
const Pe = "undefined" != typeof window && "undefined" != typeof document
    , Ue = "object" == typeof navigator && navigator || void 0
    , Ce = Pe && (!Ue || ["ReactNative", "NativeScript", "NS"].indexOf(Ue.product) < 0)
    , xe = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts
    , Be = Pe && window.location.href || "http://localhost";
var Ne = {
    ...Object.freeze({
        __proto__: null,
        hasBrowserEnv: Pe,
        hasStandardBrowserWebWorkerEnv: xe,
        hasStandardBrowserEnv: Ce,
        navigator: Ue,
        origin: Be
    }),
    ..._e
};
function Le(t) {
    function e(t, r, n, o) {
        let i = t[o++];
        if ("__proto__" === i)
            return !0;
        const s = Number.isFinite(+i)
            , a = o >= t.length;
        if (i = !i && dt.isArray(n) ? n.length : i,
            a)
            return dt.hasOwnProp(n, i) ? n[i] = [n[i], r] : n[i] = r,
                !s;
        n[i] && dt.isObject(n[i]) || (n[i] = []);
        return e(t, r, n[i], o) && dt.isArray(n[i]) && (n[i] = function(t) {
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
    if (dt.isFormData(t) && dt.isFunction(t.entries)) {
        const r = {};
        return dt.forEachEntry(t, ( (t, n) => {
                e(function(t) {
                    return dt.matchAll(/\w+|\[(\w*)]/g, t).map((t => "[]" === t[0] ? "" : t[1] || t[0]))
                }(t), n, r, 0)
            }
        )),
            r
    }
    return null
}
const je = {
    transitional: Oe,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [function(t, e) {
        const r = e.getContentType() || ""
            , n = r.indexOf("application/json") > -1
            , o = dt.isObject(t);
        o && dt.isHTMLForm(t) && (t = new FormData(t));
        if (dt.isFormData(t))
            return n ? JSON.stringify(Le(t)) : t;
        if (dt.isArrayBuffer(t) || dt.isBuffer(t) || dt.isStream(t) || dt.isFile(t) || dt.isBlob(t) || dt.isReadableStream(t))
            return t;
        if (dt.isArrayBufferView(t))
            return t.buffer;
        if (dt.isURLSearchParams(t))
            return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1),
                t.toString();
        let i;
        if (o) {
            if (r.indexOf("application/x-www-form-urlencoded") > -1)
                return function(t, e) {
                    return be(t, new Ne.classes.URLSearchParams, Object.assign({
                        visitor: function(t, e, r, n) {
                            return Ne.isNode && dt.isBuffer(t) ? (this.append(e, t.toString("base64")),
                                !1) : n.defaultVisitor.apply(this, arguments)
                        }
                    }, e))
                }(t, this.formSerializer).toString();
            if ((i = dt.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
                const e = this.env && this.env.FormData;
                return be(i ? {
                    "files[]": t
                } : t, e && new e, this.formSerializer)
            }
        }
        return o || n ? (e.setContentType("application/json", !1),
            function(t, e, r) {
                if (dt.isString(t))
                    try {
                        return (e || JSON.parse)(t),
                            dt.trim(t)
                    } catch (t) {
                        if ("SyntaxError" !== t.name)
                            throw t
                    }
                return (r || JSON.stringify)(t)
            }(t)) : t
    }
    ],
    transformResponse: [function(t) {
        const e = this.transitional || je.transitional
            , r = e && e.forcedJSONParsing
            , n = "json" === this.responseType;
        if (dt.isResponse(t) || dt.isReadableStream(t))
            return t;
        if (t && dt.isString(t) && (r && !this.responseType || n)) {
            const r = !(e && e.silentJSONParsing) && n;
            try {
                return JSON.parse(t)
            } catch (t) {
                if (r) {
                    if ("SyntaxError" === t.name)
                        throw he.from(t, he.ERR_BAD_RESPONSE, this, null, this.response);
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
        FormData: Ne.classes.FormData,
        Blob: Ne.classes.Blob
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
dt.forEach(["delete", "get", "head", "post", "put", "patch"], (t => {
        je.headers[t] = {}
    }
));
const De = dt.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]);
const ke = Symbol("internals");
function Fe(t) {
    return t && String(t).trim().toLowerCase()
}
function Ie(t) {
    return !1 === t || null == t ? t : dt.isArray(t) ? t.map(Ie) : String(t)
}
function Me(t, e, r, n, o) {
    return dt.isFunction(n) ? n.call(this, e, r) : (o && (e = r),
        dt.isString(e) ? dt.isString(n) ? -1 !== e.indexOf(n) : dt.isRegExp(n) ? n.test(e) : void 0 : void 0)
}
class qe {
    constructor(t) {
        t && this.set(t)
    }
    set(t, e, r) {
        const n = this;
        function o(t, e, r) {
            const o = Fe(e);
            if (!o)
                throw new Error("header name must be a non-empty string");
            const i = dt.findKey(n, o);
            (!i || void 0 === n[i] || !0 === r || void 0 === r && !1 !== n[i]) && (n[i || e] = Ie(t))
        }
        const i = (t, e) => dt.forEach(t, ( (t, r) => o(t, r, e)));
        if (dt.isPlainObject(t) || t instanceof this.constructor)
            i(t, e);
        else if (dt.isString(t) && (t = t.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim()))
            i((t => {
                    const e = {};
                    let r, n, o;
                    return t && t.split("\n").forEach((function(t) {
                            o = t.indexOf(":"),
                                r = t.substring(0, o).trim().toLowerCase(),
                                n = t.substring(o + 1).trim(),
                            !r || e[r] && De[r] || ("set-cookie" === r ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n)
                        }
                    )),
                        e
                }
            )(t), e);
        else if (dt.isObject(t) && dt.isIterable(t)) {
            let r, n, o = {};
            for (const e of t) {
                if (!dt.isArray(e))
                    throw TypeError("Object iterator must return a key-value pair");
                o[n = e[0]] = (r = o[n]) ? dt.isArray(r) ? [...r, e[1]] : [r, e[1]] : e[1]
            }
            i(o, e)
        } else
            null != t && o(e, t, r);
        return this
    }
    get(t, e) {
        if (t = Fe(t)) {
            const r = dt.findKey(this, t);
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
                if (dt.isFunction(e))
                    return e.call(this, t, r);
                if (dt.isRegExp(e))
                    return e.exec(t);
                throw new TypeError("parser must be boolean|regexp|function")
            }
        }
    }
    has(t, e) {
        if (t = Fe(t)) {
            const r = dt.findKey(this, t);
            return !(!r || void 0 === this[r] || e && !Me(0, this[r], r, e))
        }
        return !1
    }
    delete(t, e) {
        const r = this;
        let n = !1;
        function o(t) {
            if (t = Fe(t)) {
                const o = dt.findKey(r, t);
                !o || e && !Me(0, r[o], o, e) || (delete r[o],
                    n = !0)
            }
        }
        return dt.isArray(t) ? t.forEach(o) : o(t),
            n
    }
    clear(t) {
        const e = Object.keys(this);
        let r = e.length
            , n = !1;
        for (; r--; ) {
            const o = e[r];
            t && !Me(0, this[o], o, t, !0) || (delete this[o],
                n = !0)
        }
        return n
    }
    normalize(t) {
        const e = this
            , r = {};
        return dt.forEach(this, ( (n, o) => {
                const i = dt.findKey(r, o);
                if (i)
                    return e[i] = Ie(n),
                        void delete e[o];
                const s = t ? function(t) {
                    return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, ( (t, e, r) => e.toUpperCase() + r))
                }(o) : String(o).trim();
                s !== o && delete e[o],
                    e[s] = Ie(n),
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
        return dt.forEach(this, ( (r, n) => {
                null != r && !1 !== r && (e[n] = t && dt.isArray(r) ? r.join(", ") : r)
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
    getSetCookie() {
        return this.get("set-cookie") || []
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
        const e = (this[ke] = this[ke] = {
            accessors: {}
        }).accessors
            , r = this.prototype;
        function n(t) {
            const n = Fe(t);
            e[n] || (!function(t, e) {
                const r = dt.toCamelCase(" " + e);
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
        return dt.isArray(t) ? t.forEach(n) : n(t),
            this
    }
}
function Ye(t, e) {
    const r = this || je
        , n = e || r
        , o = qe.from(n.headers);
    let i = n.data;
    return dt.forEach(t, (function(t) {
            i = t.call(r, i, o.normalize(), e ? e.status : void 0)
        }
    )),
        o.normalize(),
        i
}
function ze(t) {
    return !(!t || !t.__CANCEL__)
}
function He(t, e, r) {
    he.call(this, null == t ? "canceled" : t, he.ERR_CANCELED, e, r),
        this.name = "CanceledError"
}
function Je(t, e, r) {
    const n = r.config.validateStatus;
    r.status && n && !n(r.status) ? e(new he("Request failed with status code " + r.status,[he.ERR_BAD_REQUEST, he.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],r.config,r.request,r)) : t(r)
}
qe.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]),
    dt.reduceDescriptors(qe.prototype, ( ({value: t}, e) => {
            let r = e[0].toUpperCase() + e.slice(1);
            return {
                get: () => t,
                set(t) {
                    this[r] = t
                }
            }
        }
    )),
    dt.freezeMethods(qe),
    dt.inherits(He, he, {
        __CANCEL__: !0
    });
const Ve = (t, e, r=3) => {
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
    , We = (t, e) => {
    const r = null != t;
    return [n => e[0]({
        lengthComputable: r,
        total: t,
        loaded: n
    }), e[1]]
}
    , Ke = t => (...e) => dt.asap(( () => t(...e)));
var $e = Ne.hasStandardBrowserEnv ? ( (t, e) => r => (r = new URL(r,Ne.origin),
t.protocol === r.protocol && t.host === r.host && (e || t.port === r.port)))(new URL(Ne.origin), Ne.navigator && /(msie|trident)/i.test(Ne.navigator.userAgent)) : () => !0
    , Xe = Ne.hasStandardBrowserEnv ? {
    write(t, e, r, n, o, i) {
        const s = [t + "=" + encodeURIComponent(e)];
        dt.isNumber(r) && s.push("expires=" + new Date(r).toGMTString()),
        dt.isString(n) && s.push("path=" + n),
        dt.isString(o) && s.push("domain=" + o),
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
function Ge(t, e, r) {
    let n = !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
    return t && (n || 0 == r) ? function(t, e) {
        return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t
    }(t, e) : e
}
const Qe = t => t instanceof qe ? {
    ...t
} : t;
function Ze(t, e) {
    e = e || {};
    const r = {};
    function n(t, e, r, n) {
        return dt.isPlainObject(t) && dt.isPlainObject(e) ? dt.merge.call({
            caseless: n
        }, t, e) : dt.isPlainObject(e) ? dt.merge({}, e) : dt.isArray(e) ? e.slice() : e
    }
    function o(t, e, r, o) {
        return dt.isUndefined(e) ? dt.isUndefined(t) ? void 0 : n(void 0, t, 0, o) : n(t, e, 0, o)
    }
    function i(t, e) {
        if (!dt.isUndefined(e))
            return n(void 0, e)
    }
    function s(t, e) {
        return dt.isUndefined(e) ? dt.isUndefined(t) ? void 0 : n(void 0, t) : n(void 0, e)
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
        headers: (t, e, r) => o(Qe(t), Qe(e), 0, !0)
    };
    return dt.forEach(Object.keys(Object.assign({}, t, e)), (function(n) {
            const i = u[n] || o
                , s = i(t[n], e[n], n);
            dt.isUndefined(s) && i !== a || (r[n] = s)
        }
    )),
        r
}
var tr = t => {
        const e = Ze({}, t);
        let r, {data: n, withXSRFToken: o, xsrfHeaderName: i, xsrfCookieName: s, headers: a, auth: u} = e;
        if (e.headers = a = qe.from(a),
            e.url = Te(Ge(e.baseURL, e.url, e.allowAbsoluteUrls), t.params, t.paramsSerializer),
        u && a.set("Authorization", "Basic " + btoa((u.username || "") + ":" + (u.password ? unescape(encodeURIComponent(u.password)) : ""))),
            dt.isFormData(n))
            if (Ne.hasStandardBrowserEnv || Ne.hasStandardBrowserWebWorkerEnv)
                a.setContentType(void 0);
            else if (!1 !== (r = a.getContentType())) {
                const [t,...e] = r ? r.split(";").map((t => t.trim())).filter(Boolean) : [];
                a.setContentType([t || "multipart/form-data", ...e].join("; "))
            }
        if (Ne.hasStandardBrowserEnv && (o && dt.isFunction(o) && (o = o(e)),
        o || !1 !== o && $e(e.url))) {
            const t = i && s && Xe.read(s);
            t && a.set(i, t)
        }
        return e
    }
;
var er = "undefined" != typeof XMLHttpRequest && function(t) {
        return new Promise((function(e, r) {
                const n = tr(t);
                let o = n.data;
                const i = qe.from(n.headers).normalize();
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
                    const n = qe.from("getAllResponseHeaders"in g && g.getAllResponseHeaders());
                    Je((function(t) {
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
                        g && (r(new he("Request aborted",he.ECONNABORTED,t,g)),
                            g = null)
                    }
                    ,
                    g.onerror = function() {
                        r(new he("Network Error",he.ERR_NETWORK,t,g)),
                            g = null
                    }
                    ,
                    g.ontimeout = function() {
                        let e = n.timeout ? "timeout of " + n.timeout + "ms exceeded" : "timeout exceeded";
                        const o = n.transitional || Oe;
                        n.timeoutErrorMessage && (e = n.timeoutErrorMessage),
                            r(new he(e,o.clarifyTimeoutError ? he.ETIMEDOUT : he.ECONNABORTED,t,g)),
                            g = null
                    }
                    ,
                void 0 === o && i.setContentType(null),
                "setRequestHeader"in g && dt.forEach(i.toJSON(), (function(t, e) {
                        g.setRequestHeader(e, t)
                    }
                )),
                dt.isUndefined(n.withCredentials) || (g.withCredentials = !!n.withCredentials),
                l && "json" !== l && (g.responseType = n.responseType),
                p && ([u,f] = Ve(p, !0),
                    g.addEventListener("progress", u)),
                h && g.upload && ([a,c] = Ve(h),
                    g.upload.addEventListener("progress", a),
                    g.upload.addEventListener("loadend", c)),
                (n.cancelToken || n.signal) && (s = e => {
                    g && (r(!e || e.type ? new He(null,t,g) : e),
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
                m && -1 === Ne.protocols.indexOf(m) ? r(new he("Unsupported protocol " + m + ":",he.ERR_BAD_REQUEST,t)) : g.send(o || null)
            }
        ))
    }
;
const rr = (t, e) => {
    const {length: r} = t = t ? t.filter(Boolean) : [];
    if (e || r) {
        let r, n = new AbortController;
        const o = function(t) {
            if (!r) {
                r = !0,
                    s();
                const e = t instanceof Error ? t : this.reason;
                n.abort(e instanceof he ? e : new He(e instanceof Error ? e.message : e))
            }
        };
        let i = e && setTimeout(( () => {
                i = null,
                    o(new he(`timeout ${e} of ms exceeded`,he.ETIMEDOUT))
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
        return a.unsubscribe = () => dt.asap(s),
            a
    }
}
    , nr = function*(t, e) {
    let r = t.byteLength;
    if (!e || r < e)
        return void (yield t);
    let n, o = 0;
    for (; o < r; )
        n = o + e,
            yield t.slice(o, n),
            o = n
}
    , or = async function*(t) {
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
    , ir = (t, e, r, n) => {
    const o = async function*(t, e) {
        for await(const r of or(t))
            yield*nr(r, e)
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
    , sr = "function" == typeof fetch && "function" == typeof Request && "function" == typeof Response
    , ar = sr && "function" == typeof ReadableStream
    , ur = sr && ("function" == typeof TextEncoder ? (cr = new TextEncoder,
    t => cr.encode(t)) : async t => new Uint8Array(await new Response(t).arrayBuffer()));
var cr;
const fr = (t, ...e) => {
    try {
        return !!t(...e)
    } catch (t) {
        return !1
    }
}
    , lr = ar && fr(( () => {
        let t = !1;
        const e = new Request(Ne.origin,{
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
    , hr = ar && fr(( () => dt.isReadableStream(new Response("").body)))
    , pr = {
    stream: hr && (t => t.body)
};
var dr;
sr && (dr = new Response,
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t => {
            !pr[t] && (pr[t] = dt.isFunction(dr[t]) ? e => e[t]() : (e, r) => {
                    throw new he(`Response type '${t}' is not supported`,he.ERR_NOT_SUPPORT,r)
                }
            )
        }
    )));
const gr = async (t, e) => {
        const r = dt.toFiniteNumber(t.getContentLength());
        return null == r ? (async t => {
                if (null == t)
                    return 0;
                if (dt.isBlob(t))
                    return t.size;
                if (dt.isSpecCompliantForm(t)) {
                    const e = new Request(Ne.origin,{
                        method: "POST",
                        body: t
                    });
                    return (await e.arrayBuffer()).byteLength
                }
                return dt.isArrayBufferView(t) || dt.isArrayBuffer(t) ? t.byteLength : (dt.isURLSearchParams(t) && (t += ""),
                    dt.isString(t) ? (await ur(t)).byteLength : void 0)
            }
        )(e) : r
    }
;
var yr = sr && (async t => {
        let {url: e, method: r, data: n, signal: o, cancelToken: i, timeout: s, onDownloadProgress: a, onUploadProgress: u, responseType: c, headers: f, withCredentials: l="same-origin", fetchOptions: h} = tr(t);
        c = c ? (c + "").toLowerCase() : "text";
        let p, d = rr([o, i && i.toAbortSignal()], s);
        const g = d && d.unsubscribe && ( () => {
                d.unsubscribe()
            }
        );
        let y;
        try {
            if (u && lr && "get" !== r && "head" !== r && 0 !== (y = await gr(f, n))) {
                let t, r = new Request(e,{
                    method: "POST",
                    body: n,
                    duplex: "half"
                });
                if (dt.isFormData(n) && (t = r.headers.get("content-type")) && f.setContentType(t),
                    r.body) {
                    const [t,e] = We(y, Ve(Ke(u)));
                    n = ir(r.body, 65536, t, e)
                }
            }
            dt.isString(l) || (l = l ? "include" : "omit");
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
            const s = hr && ("stream" === c || "response" === c);
            if (hr && (a || s && g)) {
                const t = {};
                ["status", "statusText", "headers"].forEach((e => {
                        t[e] = i[e]
                    }
                ));
                const e = dt.toFiniteNumber(i.headers.get("content-length"))
                    , [r,n] = a && We(e, Ve(Ke(a), !0)) || [];
                i = new Response(ir(i.body, 65536, r, ( () => {
                        n && n(),
                        g && g()
                    }
                )),t)
            }
            c = c || "text";
            let m = await pr[dt.findKey(pr, c) || "text"](i, t);
            return !s && g && g(),
                await new Promise(( (e, r) => {
                        Je(e, r, {
                            data: m,
                            headers: qe.from(i.headers),
                            status: i.status,
                            statusText: i.statusText,
                            config: t,
                            request: p
                        })
                    }
                ))
        } catch (e) {
            if (g && g(),
            e && "TypeError" === e.name && /Load failed|fetch/i.test(e.message))
                throw Object.assign(new he("Network Error",he.ERR_NETWORK,t,p), {
                    cause: e.cause || e
                });
            throw he.from(e, e && e.code, t, p)
        }
    }
);
const mr = {
    http: null,
    xhr: er,
    fetch: yr
};
dt.forEach(mr, ( (t, e) => {
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
const wr = t => `- ${t}`
    , br = t => dt.isFunction(t) || null === t || !1 === t;
var Er = t => {
        t = dt.isArray(t) ? t : [t];
        const {length: e} = t;
        let r, n;
        const o = {};
        for (let i = 0; i < e; i++) {
            let e;
            if (r = t[i],
                n = r,
            !br(r) && (n = mr[(e = String(r)).toLowerCase()],
            void 0 === n))
                throw new he(`Unknown adapter '${e}'`);
            if (n)
                break;
            o[e || "#" + i] = n
        }
        if (!n) {
            const t = Object.entries(o).map(( ([t,e]) => `adapter ${t} ` + (!1 === e ? "is not supported by the environment" : "is not available in the build")));
            throw new he("There is no suitable adapter to dispatch the request " + (e ? t.length > 1 ? "since :\n" + t.map(wr).join("\n") : " " + wr(t[0]) : "as no adapter specified"),"ERR_NOT_SUPPORT")
        }
        return n
    }
;
function Rr(t) {
    if (t.cancelToken && t.cancelToken.throwIfRequested(),
    t.signal && t.signal.aborted)
        throw new He(null,t)
}
function vr(t) {
    Rr(t),
        t.headers = qe.from(t.headers),
        t.data = Ye.call(t, t.transformRequest),
    -1 !== ["post", "put", "patch"].indexOf(t.method) && t.headers.setContentType("application/x-www-form-urlencoded", !1);
    return Er(t.adapter || je.adapter)(t).then((function(e) {
            return Rr(t),
                e.data = Ye.call(t, t.transformResponse, e),
                e.headers = qe.from(e.headers),
                e
        }
    ), (function(e) {
            return ze(e) || (Rr(t),
            e && e.response && (e.response.data = Ye.call(t, t.transformResponse, e.response),
                e.response.headers = qe.from(e.response.headers))),
                Promise.reject(e)
        }
    ))
}
const Ar = "1.9.0"
    , Tr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(( (t, e) => {
        Tr[t] = function(r) {
            return typeof r === t || "a" + (e < 1 ? "n " : " ") + t
        }
    }
));
const Sr = {};
Tr.transitional = function(t, e, r) {
    function n(t, e) {
        return "[Axios v1.9.0] Transitional option '" + t + "'" + e + (r ? ". " + r : "")
    }
    return (r, o, i) => {
        if (!1 === t)
            throw new he(n(o, " has been removed" + (e ? " in " + e : "")),he.ERR_DEPRECATED);
        return e && !Sr[o] && (Sr[o] = !0,
            console.warn(n(o, " has been deprecated since v" + e + " and will be removed in the near future"))),
        !t || t(r, o, i)
    }
}
    ,
    Tr.spelling = function(t) {
        return (e, r) => (console.warn(`${r} is likely a misspelling of ${t}`),
            !0)
    }
;
var Or = {
    assertOptions: function(t, e, r) {
        if ("object" != typeof t)
            throw new he("options must be an object",he.ERR_BAD_OPTION_VALUE);
        const n = Object.keys(t);
        let o = n.length;
        for (; o-- > 0; ) {
            const i = n[o]
                , s = e[i];
            if (s) {
                const e = t[i]
                    , r = void 0 === e || s(e, i, t);
                if (!0 !== r)
                    throw new he("option " + i + " must be " + r,he.ERR_BAD_OPTION_VALUE)
            } else if (!0 !== r)
                throw new he("Unknown option " + i,he.ERR_BAD_OPTION)
        }
    },
    validators: Tr
};
const _r = Or.validators;
class Pr {
    constructor(t) {
        this.defaults = t || {},
            this.interceptors = {
                request: new Se,
                response: new Se
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
            e = Ze(this.defaults, e);
        const {transitional: r, paramsSerializer: n, headers: o} = e;
        void 0 !== r && Or.assertOptions(r, {
            silentJSONParsing: _r.transitional(_r.boolean),
            forcedJSONParsing: _r.transitional(_r.boolean),
            clarifyTimeoutError: _r.transitional(_r.boolean)
        }, !1),
        null != n && (dt.isFunction(n) ? e.paramsSerializer = {
            serialize: n
        } : Or.assertOptions(n, {
            encode: _r.function,
            serialize: _r.function
        }, !0)),
        void 0 !== e.allowAbsoluteUrls || (void 0 !== this.defaults.allowAbsoluteUrls ? e.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : e.allowAbsoluteUrls = !0),
            Or.assertOptions(e, {
                baseUrl: _r.spelling("baseURL"),
                withXsrfToken: _r.spelling("withXSRFToken")
            }, !0),
            e.method = (e.method || this.defaults.method || "get").toLowerCase();
        let i = o && dt.merge(o.common, o[e.method]);
        o && dt.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (t => {
                delete o[t]
            }
        )),
            e.headers = qe.concat(i, o);
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
            const t = [vr.bind(this), void 0];
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
            c = vr.call(this, h)
        } catch (t) {
            return Promise.reject(t)
        }
        for (l = 0,
                 f = u.length; l < f; )
            c = c.then(u[l++], u[l++]);
        return c
    }
    getUri(t) {
        return Te(Ge((t = Ze(this.defaults, t)).baseURL, t.url, t.allowAbsoluteUrls), t.params, t.paramsSerializer)
    }
}
dt.forEach(["delete", "get", "head", "options"], (function(t) {
        Pr.prototype[t] = function(e, r) {
            return this.request(Ze(r || {}, {
                method: t,
                url: e,
                data: (r || {}).data
            }))
        }
    }
)),
    dt.forEach(["post", "put", "patch"], (function(t) {
            function e(e) {
                return function(r, n, o) {
                    return this.request(Ze(o || {}, {
                        method: t,
                        headers: e ? {
                            "Content-Type": "multipart/form-data"
                        } : {},
                        url: r,
                        data: n
                    }))
                }
            }
            Pr.prototype[t] = e(),
                Pr.prototype[t + "Form"] = e(!0)
        }
    ));
class Ur {
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
                    r.reason || (r.reason = new He(t,n,o),
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
            token: new Ur((function(e) {
                    t = e
                }
            )),
            cancel: t
        }
    }
}
const Cr = {
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
Object.entries(Cr).forEach(( ([t,e]) => {
        Cr[e] = t
    }
));
const xr = function t(e) {
    const r = new Pr(e)
        , n = S(Pr.prototype.request, r);
    return dt.extend(n, Pr.prototype, r, {
        allOwnKeys: !0
    }),
        dt.extend(n, r, null, {
            allOwnKeys: !0
        }),
        n.create = function(r) {
            return t(Ze(e, r))
        }
        ,
        n
}(je);
xr.Axios = Pr,
    xr.CanceledError = He,
    xr.CancelToken = Ur,
    xr.isCancel = ze,
    xr.VERSION = Ar,
    xr.toFormData = be,
    xr.AxiosError = he,
    xr.Cancel = xr.CanceledError,
    xr.all = function(t) {
        return Promise.all(t)
    }
    ,
    xr.spread = function(t) {
        return function(e) {
            return t.apply(null, e)
        }
    }
    ,
    xr.isAxiosError = function(t) {
        return dt.isObject(t) && !0 === t.isAxiosError
    }
    ,
    xr.mergeConfig = Ze,
    xr.AxiosHeaders = qe,
    xr.formToJSON = t => Le(dt.isHTMLForm(t) ? new FormData(t) : t),
    xr.getAdapter = Er,
    xr.HttpStatusCode = Cr,
    xr.default = xr;
const {Axios: Br, AxiosError: Nr, CanceledError: Lr, isCancel: jr, CancelToken: Dr, VERSION: kr, all: Fr, Cancel: Ir, isAxiosError: Mr, spread: qr, toFormData: Yr, AxiosHeaders: zr, HttpStatusCode: Hr, formToJSON: Jr, getAdapter: Vr, mergeConfig: Wr} = xr;
export {Br as Axios, Nr as AxiosError, zr as AxiosHeaders, Ir as Cancel, Dr as CancelToken, Lr as CanceledError, Hr as HttpStatusCode, kr as VERSION, Fr as all, xr as default, Jr as formToJSON, Vr as getAdapter, Mr as isAxiosError, jr as isCancel, Wr as mergeConfig, qr as spread, Yr as toFormData};
//# sourceMappingURL=/sm/de86f2861df407012cbc3db77e6f740dde859a6710483e9ed7d1796a396aebc5.map
