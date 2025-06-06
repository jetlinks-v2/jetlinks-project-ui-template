/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/@intlify/core-base@11.1.5/dist/core-base.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import {create as e, getGlobalThis as t, isObject as n, hasOwn as r, isString as o, isBoolean as a, isFunction as l, isPromise as s, isArray as i, isPlainObject as c, format as u, warn as m, assign as f, isRegExp as _, isEmptyObject as d, isDate as p, isNumber as g, escapeHtml as T, generateFormatCacheKey as h, join as O, toDisplayString as E} from "./shared.js";
import {COMPILE_ERROR_CODES_EXTEND_POINT as A, createCompileError as k, defaultOnError as N, baseCompile as b} from "./message-compiler.js";
export {CompileErrorCodes, createCompileError} from "./message-compiler.js";
/*!
  * core-base v11.1.5
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function L(e) {
    return n(e) && 0 === M(e) && (r(e, "b") || r(e, "body"))
}
const y = ["b", "body"];
const F = ["c", "cases"];
const C = ["s", "static"];
const R = ["i", "items"];
const I = ["t", "type"];
function M(e) {
    return P(e, I)
}
const w = ["v", "value"];
function S(e, t) {
    const n = P(e, w);
    if (null != n)
        return n;
    throw U(t)
}
const D = ["m", "modifier"];
const v = ["k", "key"];
function P(e, t, n) {
    for (let n = 0; n < t.length; n++) {
        const o = t[n];
        if (r(e, o) && null != e[o])
            return e[o]
    }
    return n
}
const W = [...y, ...F, ...C, ...R, ...v, ...D, ...w, ...I];
function U(e) {
    return new Error(`unhandled node type: ${e}`)
}
function x(e) {
    return t => function(e, t) {
        const n = (r = t,
            P(r, y));
        var r;
        if (null == n)
            throw U(0);
        if (1 === M(n)) {
            const t = function(e) {
                return P(e, F, [])
            }(n);
            return e.plural(t.reduce(( (t, n) => [...t, $(e, n)]), []))
        }
        return $(e, n)
    }(t, e)
}
function $(e, t) {
    const n = function(e) {
        return P(e, C)
    }(t);
    if (null != n)
        return "text" === e.type ? n : e.normalize([n]);
    {
        const n = function(e) {
            return P(e, R, [])
        }(t).reduce(( (t, n) => [...t, V(e, n)]), []);
        return e.normalize(n)
    }
}
function V(e, t) {
    const n = M(t);
    switch (n) {
        case 3:
        case 9:
        case 7:
        case 8:
            return S(t, n);
        case 4:
        {
            const o = t;
            if (r(o, "k") && o.k)
                return e.interpolate(e.named(o.k));
            if (r(o, "key") && o.key)
                return e.interpolate(e.named(o.key));
            throw U(n)
        }
        case 5:
        {
            const o = t;
            if (r(o, "i") && g(o.i))
                return e.interpolate(e.list(o.i));
            if (r(o, "index") && g(o.index))
                return e.interpolate(e.list(o.index));
            throw U(n)
        }
        case 6:
        {
            const n = t
                , r = function(e) {
                return P(e, D)
            }(n)
                , o = function(e) {
                const t = P(e, v);
                if (t)
                    return t;
                throw U(6)
            }(n);
            return e.linked(V(e, o), r ? V(e, r) : void 0, e.type)
        }
        default:
            throw new Error(`unhandled node on format message part: ${n}`)
    }
}
const G = e => e;
let Y = e();
function K() {
    Y = e()
}
function B(e, t) {
    if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && o(e)) {
        !a(t.warnHtmlMessage) || t.warnHtmlMessage;
        const n = (t.onCacheKey || G)(e)
            , r = Y[n];
        if (r)
            return r;
        const {ast: o, detectError: l} = function(e, t={}) {
            let n = !1;
            const r = t.onError || N;
            return t.onError = e => {
                n = !0,
                    r(e)
            }
                ,
                {
                    ...b(e, t),
                    detectError: n
                }
        }(e, {
            ...t,
            location: !1,
            jit: !0
        })
            , s = x(o);
        return l ? s : Y[n] = s
    }
    {
        const t = e.cacheKey;
        if (t) {
            const n = Y[t];
            return n || (Y[t] = x(e))
        }
        return x(e)
    }
}
let j = null;
function H(e) {
    j = e
}
function z() {
    return j
}
function Z(e, t, n) {
    j && j.emit("i18n:init", {
        timestamp: Date.now(),
        i18n: e,
        version: t,
        meta: n
    })
}
const J = X("function:translate");
function X(e) {
    return t => j && j.emit(e, t)
}
const q = {
    INVALID_ARGUMENT: A,
    INVALID_DATE_ARGUMENT: 18,
    INVALID_ISO_DATE_ARGUMENT: 19,
    NOT_SUPPORT_NON_STRING_MESSAGE: 20,
    NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
    NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
    NOT_SUPPORT_LOCALE_TYPE: 23
}
    , Q = 24;
function ee(e) {
    return k(e, null, void 0)
}
function te(e, t) {
    return null != t.locale ? re(t.locale) : re(e.locale)
}
let ne;
function re(e) {
    if (o(e))
        return e;
    if (l(e)) {
        if (e.resolvedOnce && null != ne)
            return ne;
        if ("Function" === e.constructor.name) {
            const t = e();
            if (s(t))
                throw ee(q.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
            return ne = t
        }
        throw ee(q.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION)
    }
    throw ee(q.NOT_SUPPORT_LOCALE_TYPE)
}
function oe(e, t, r) {
    return [...new Set([r, ...i(t) ? t : n(t) ? Object.keys(t) : o(t) ? [t] : [r]])]
}
function ae(e, t, n) {
    const r = o(n) ? n : Ne
        , a = e;
    a.__localeChainCache || (a.__localeChainCache = new Map);
    let l = a.__localeChainCache.get(r);
    if (!l) {
        l = [];
        let e = [n];
        for (; i(e); )
            e = le(l, e, t);
        const s = i(t) || !c(t) ? t : t.default ? t.default : null;
        e = o(s) ? [s] : s,
        i(e) && le(l, e, !1),
            a.__localeChainCache.set(r, l)
    }
    return l
}
function le(e, t, n) {
    let r = !0;
    for (let l = 0; l < t.length && a(r); l++) {
        const a = t[l];
        o(a) && (r = se(e, t[l], n))
    }
    return r
}
function se(e, t, n) {
    let r;
    const o = t.split("-");
    do {
        r = ie(e, o.join("-"), n),
            o.splice(-1, 1)
    } while (o.length && !0 === r);
    return r
}
function ie(e, t, n) {
    let r = !1;
    if (!e.includes(t) && (r = !0,
        t)) {
        r = "!" !== t[t.length - 1];
        const o = t.replace(/!/g, "");
        e.push(o),
        (i(n) || c(n)) && n[o] && (r = n[o])
    }
    return r
}
const ce = [];
ce[0] = {
    w: [0],
    i: [3, 0],
    "[": [4],
    o: [7]
},
    ce[1] = {
        w: [1],
        ".": [2],
        "[": [4],
        o: [7]
    },
    ce[2] = {
        w: [2],
        i: [3, 0],
        0: [3, 0]
    },
    ce[3] = {
        i: [3, 0],
        0: [3, 0],
        w: [1, 1],
        ".": [2, 1],
        "[": [4, 1],
        o: [7, 1]
    },
    ce[4] = {
        "'": [5, 0],
        '"': [6, 0],
        "[": [4, 2],
        "]": [1, 3],
        o: 8,
        l: [4, 0]
    },
    ce[5] = {
        "'": [4, 0],
        o: 8,
        l: [5, 0]
    },
    ce[6] = {
        '"': [4, 0],
        o: 8,
        l: [6, 0]
    };
const ue = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function me(e) {
    if (null == e)
        return "o";
    switch (e.charCodeAt(0)) {
        case 91:
        case 93:
        case 46:
        case 34:
        case 39:
            return e;
        case 95:
        case 36:
        case 45:
            return "i";
        case 9:
        case 10:
        case 13:
        case 160:
        case 65279:
        case 8232:
        case 8233:
            return "w"
    }
    return "i"
}
function fe(e) {
    const t = e.trim();
    return ("0" !== e.charAt(0) || !isNaN(parseInt(e))) && (n = t,
        ue.test(n) ? function(e) {
            const t = e.charCodeAt(0);
            return t !== e.charCodeAt(e.length - 1) || 34 !== t && 39 !== t ? e : e.slice(1, -1)
        }(t) : "*" + t);
    var n
}
function _e(e) {
    const t = [];
    let n, r, o, a, l, s, i, c = -1, u = 0, m = 0;
    const f = [];
    function _() {
        const t = e[c + 1];
        if (5 === u && "'" === t || 6 === u && '"' === t)
            return c++,
                o = "\\" + t,
                f[0](),
                !0
    }
    for (f[0] = () => {
        void 0 === r ? r = o : r += o
    }
             ,
             f[1] = () => {
                 void 0 !== r && (t.push(r),
                     r = void 0)
             }
             ,
             f[2] = () => {
                 f[0](),
                     m++
             }
             ,
             f[3] = () => {
                 if (m > 0)
                     m--,
                         u = 4,
                         f[0]();
                 else {
                     if (m = 0,
                     void 0 === r)
                         return !1;
                     if (r = fe(r),
                     !1 === r)
                         return !1;
                     f[1]()
                 }
             }
        ; null !== u; )
        if (c++,
            n = e[c],
        "\\" !== n || !_()) {
            if (a = me(n),
                i = ce[u],
                l = i[a] || i.l || 8,
            8 === l)
                return;
            if (u = l[0],
            void 0 !== l[1] && (s = f[l[1]],
            s && (o = n,
            !1 === s())))
                return;
            if (7 === u)
                return t
        }
}
const de = new Map;
function pe(e, t) {
    return n(e) ? e[t] : null
}
function ge(e, t) {
    if (!n(e))
        return null;
    let r = de.get(t);
    if (r || (r = _e(t),
    r && de.set(t, r)),
        !r)
        return null;
    const o = r.length;
    let a = e
        , s = 0;
    for (; s < o; ) {
        const e = r[s];
        if (W.includes(e) && L(a))
            return null;
        const t = a[e];
        if (void 0 === t)
            return null;
        if (l(a))
            return null;
        a = t,
            s++
    }
    return a
}
const Te = {
    NOT_FOUND_KEY: 1,
    FALLBACK_TO_TRANSLATE: 2,
    CANNOT_FORMAT_NUMBER: 3,
    FALLBACK_TO_NUMBER_FORMAT: 4,
    CANNOT_FORMAT_DATE: 5,
    FALLBACK_TO_DATE_FORMAT: 6,
    EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7
}
    , he = 8
    , Oe = {
    [Te.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
    [Te.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
    [Te.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
    [Te.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
    [Te.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
    [Te.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
    [Te.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future."
};
function Ee(e, ...t) {
    return u(Oe[e], ...t)
}
const Ae = "11.1.5"
    , ke = -1
    , Ne = "en-US"
    , be = ""
    , Le = e => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
let ye, Fe, Ce;
function Re(e) {
    ye = e
}
function Ie(e) {
    Fe = e
}
function Me(e) {
    Ce = e
}
let we = null;
const Se = e => {
    we = e
}
    , De = () => we;
let ve = null;
const Pe = e => {
    ve = e
}
    , We = () => ve;
let Ue = 0;
function xe(t={}) {
    const r = l(t.onWarn) ? t.onWarn : m
        , s = o(t.version) ? t.version : Ae
        , u = o(t.locale) || l(t.locale) ? t.locale : Ne
        , d = l(u) ? Ne : u
        , p = i(t.fallbackLocale) || c(t.fallbackLocale) || o(t.fallbackLocale) || !1 === t.fallbackLocale ? t.fallbackLocale : d
        , g = c(t.messages) ? t.messages : $e(d)
        , T = c(t.datetimeFormats) ? t.datetimeFormats : $e(d)
        , h = c(t.numberFormats) ? t.numberFormats : $e(d)
        , O = f(e(), t.modifiers, {
        upper: (e, t) => "text" === t && o(e) ? e.toUpperCase() : "vnode" === t && n(e) && "__v_isVNode"in e ? e.children.toUpperCase() : e,
        lower: (e, t) => "text" === t && o(e) ? e.toLowerCase() : "vnode" === t && n(e) && "__v_isVNode"in e ? e.children.toLowerCase() : e,
        capitalize: (e, t) => "text" === t && o(e) ? Le(e) : "vnode" === t && n(e) && "__v_isVNode"in e ? Le(e.children) : e
    })
        , E = t.pluralRules || e()
        , A = l(t.missing) ? t.missing : null
        , k = !a(t.missingWarn) && !_(t.missingWarn) || t.missingWarn
        , N = !a(t.fallbackWarn) && !_(t.fallbackWarn) || t.fallbackWarn
        , b = !!t.fallbackFormat
        , L = !!t.unresolving
        , y = l(t.postTranslation) ? t.postTranslation : null
        , F = c(t.processor) ? t.processor : null
        , C = !a(t.warnHtmlMessage) || t.warnHtmlMessage
        , R = !!t.escapeParameter
        , I = l(t.messageCompiler) ? t.messageCompiler : ye
        , M = l(t.messageResolver) ? t.messageResolver : Fe || pe
        , w = l(t.localeFallbacker) ? t.localeFallbacker : Ce || oe
        , S = n(t.fallbackContext) ? t.fallbackContext : void 0
        , D = t
        , v = n(D.__datetimeFormatters) ? D.__datetimeFormatters : new Map
        , P = n(D.__numberFormatters) ? D.__numberFormatters : new Map
        , W = n(D.__meta) ? D.__meta : {};
    Ue++;
    const U = {
        version: s,
        cid: Ue,
        locale: u,
        fallbackLocale: p,
        messages: g,
        modifiers: O,
        pluralRules: E,
        missing: A,
        missingWarn: k,
        fallbackWarn: N,
        fallbackFormat: b,
        unresolving: L,
        postTranslation: y,
        processor: F,
        warnHtmlMessage: C,
        escapeParameter: R,
        messageCompiler: I,
        messageResolver: M,
        localeFallbacker: w,
        fallbackContext: S,
        onWarn: r,
        __meta: W
    };
    return U.datetimeFormats = T,
        U.numberFormats = h,
        U.__datetimeFormatters = v,
        U.__numberFormatters = P,
    __INTLIFY_PROD_DEVTOOLS__ && Z(U, s, W),
        U
}
const $e = t => ({
    [t]: e()
});
function Ve(e, t) {
    return e instanceof RegExp ? e.test(t) : e
}
function Ge(e, t) {
    return e instanceof RegExp ? e.test(t) : e
}
function Ye(e, t, n, r, a) {
    const {missing: l, onWarn: s} = e;
    if (null !== l) {
        const r = l(e, n, t, a);
        return o(r) ? r : t
    }
    return t
}
function Ke(e, t, n) {
    e.__localeChainCache = new Map,
        e.localeFallbacker(e, n, t)
}
function Be(e, t) {
    return e !== t && e.split("-")[0] === t.split("-")[0]
}
function je(e, t) {
    const n = t.indexOf(e);
    if (-1 === n)
        return !1;
    for (let r = n + 1; r < t.length; r++)
        if (Be(e, t[r]))
            return !0;
    return !1
}
function He(e, ...t) {
    const {datetimeFormats: n, unresolving: r, fallbackLocale: l, onWarn: s, localeFallbacker: i} = e
        , {__datetimeFormatters: u} = e
        , [m,_,p,g] = Ze(...t);
    a(p.missingWarn) ? p.missingWarn : e.missingWarn;
    a(p.fallbackWarn) ? p.fallbackWarn : e.fallbackWarn;
    const T = !!p.part
        , h = te(e, p)
        , O = i(e, l, h);
    if (!o(m) || "" === m)
        return new Intl.DateTimeFormat(h,g).format(_);
    let E, A = {}, k = null;
    for (let t = 0; t < O.length && (E = O[t],
        A = n[E] || {},
        k = A[m],
        !c(k)); t++)
        Ye(e, m, E, 0, "datetime format");
    if (!c(k) || !o(E))
        return r ? -1 : m;
    let N = `${E}__${m}`;
    d(g) || (N = `${N}__${JSON.stringify(g)}`);
    let b = u.get(N);
    return b || (b = new Intl.DateTimeFormat(E,f({}, k, g)),
        u.set(N, b)),
        T ? b.formatToParts(_) : b.format(_)
}
const ze = ["localeMatcher", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "formatMatcher", "hour12", "timeZone", "dateStyle", "timeStyle", "calendar", "dayPeriod", "numberingSystem", "hourCycle", "fractionalSecondDigits"];
function Ze(...t) {
    const [n,r,a,l] = t
        , s = e();
    let i, u = e();
    if (o(n)) {
        const e = n.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
        if (!e)
            throw ee(q.INVALID_ISO_DATE_ARGUMENT);
        const t = e[3] ? e[3].trim().startsWith("T") ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
        i = new Date(t);
        try {
            i.toISOString()
        } catch {
            throw ee(q.INVALID_ISO_DATE_ARGUMENT)
        }
    } else if (p(n)) {
        if (isNaN(n.getTime()))
            throw ee(q.INVALID_DATE_ARGUMENT);
        i = n
    } else {
        if (!g(n))
            throw ee(q.INVALID_ARGUMENT);
        i = n
    }
    return o(r) ? s.key = r : c(r) && Object.keys(r).forEach((e => {
            ze.includes(e) ? u[e] = r[e] : s[e] = r[e]
        }
    )),
        o(a) ? s.locale = a : c(a) && (u = a),
    c(l) && (u = l),
        [s.key || "", i, s, u]
}
function Je(e, t, n) {
    const r = e;
    for (const e in n) {
        const n = `${t}__${e}`;
        r.__datetimeFormatters.has(n) && r.__datetimeFormatters.delete(n)
    }
}
function Xe(e, ...t) {
    const {numberFormats: n, unresolving: r, fallbackLocale: l, onWarn: s, localeFallbacker: i} = e
        , {__numberFormatters: u} = e
        , [m,_,p,g] = Qe(...t);
    a(p.missingWarn) ? p.missingWarn : e.missingWarn;
    a(p.fallbackWarn) ? p.fallbackWarn : e.fallbackWarn;
    const T = !!p.part
        , h = te(e, p)
        , O = i(e, l, h);
    if (!o(m) || "" === m)
        return new Intl.NumberFormat(h,g).format(_);
    let E, A = {}, k = null;
    for (let t = 0; t < O.length && (E = O[t],
        A = n[E] || {},
        k = A[m],
        !c(k)); t++)
        Ye(e, m, E, 0, "number format");
    if (!c(k) || !o(E))
        return r ? -1 : m;
    let N = `${E}__${m}`;
    d(g) || (N = `${N}__${JSON.stringify(g)}`);
    let b = u.get(N);
    return b || (b = new Intl.NumberFormat(E,f({}, k, g)),
        u.set(N, b)),
        T ? b.formatToParts(_) : b.format(_)
}
const qe = ["localeMatcher", "style", "currency", "currencyDisplay", "currencySign", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "compactDisplay", "notation", "signDisplay", "unit", "unitDisplay", "roundingMode", "roundingPriority", "roundingIncrement", "trailingZeroDisplay"];
function Qe(...t) {
    const [n,r,a,l] = t
        , s = e();
    let i = e();
    if (!g(n))
        throw ee(q.INVALID_ARGUMENT);
    const u = n;
    return o(r) ? s.key = r : c(r) && Object.keys(r).forEach((e => {
            qe.includes(e) ? i[e] = r[e] : s[e] = r[e]
        }
    )),
        o(a) ? s.locale = a : c(a) && (i = a),
    c(l) && (i = l),
        [s.key || "", u, s, i]
}
function et(e, t, n) {
    const r = e;
    for (const e in n) {
        const n = `${t}__${e}`;
        r.__numberFormatters.has(n) && r.__numberFormatters.delete(n)
    }
}
const tt = e => e
    , nt = e => ""
    , rt = "text"
    , ot = e => 0 === e.length ? "" : O(e)
    , at = E;
function lt(e, t) {
    return e = Math.abs(e),
        2 === t ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0
}
function st(t={}) {
    const r = t.locale
        , a = function(e) {
        const t = g(e.pluralIndex) ? e.pluralIndex : -1;
        return e.named && (g(e.named.count) || g(e.named.n)) ? g(e.named.count) ? e.named.count : g(e.named.n) ? e.named.n : t : t
    }(t)
        , s = n(t.pluralRules) && o(r) && l(t.pluralRules[r]) ? t.pluralRules[r] : lt
        , u = n(t.pluralRules) && o(r) && l(t.pluralRules[r]) ? lt : void 0
        , m = t.list || []
        , _ = t.named || e();
    g(t.pluralIndex) && function(e, t) {
        t.count || (t.count = e),
        t.n || (t.n = e)
    }(a, _);
    function d(e, r) {
        const o = l(t.messages) ? t.messages(e, !!r) : !!n(t.messages) && t.messages[e];
        return o || (t.parent ? t.parent.message(e) : nt)
    }
    const p = c(t.processor) && l(t.processor.normalize) ? t.processor.normalize : ot
        , T = c(t.processor) && l(t.processor.interpolate) ? t.processor.interpolate : at
        , h = {
        list: e => m[e],
        named: e => _[e],
        plural: e => e[s(a, e.length, u)],
        linked: (e, ...r) => {
            const [a,l] = r;
            let s = "text"
                , c = "";
            1 === r.length ? n(a) ? (c = a.modifier || c,
                s = a.type || s) : o(a) && (c = a || c) : 2 === r.length && (o(a) && (c = a || c),
            o(l) && (s = l || s));
            const u = d(e, !0)(h)
                , m = "vnode" === s && i(u) && c ? u[0] : u;
            return c ? (f = c,
                t.modifiers ? t.modifiers[f] : tt)(m, s) : m;
            var f
        }
        ,
        message: d,
        type: c(t.processor) && o(t.processor.type) ? t.processor.type : rt,
        interpolate: T,
        normalize: p,
        values: f(e(), m, _)
    };
    return h
}
const it = () => ""
    , ct = e => l(e);
function ut(t, ...r) {
    const {fallbackFormat: s, postTranslation: c, unresolving: u, messageCompiler: m, fallbackLocale: _, messages: d} = t
        , [p,h] = _t(...r)
        , O = a(h.missingWarn) ? h.missingWarn : t.missingWarn
        , E = a(h.fallbackWarn) ? h.fallbackWarn : t.fallbackWarn
        , A = a(h.escapeParameter) ? h.escapeParameter : t.escapeParameter
        , k = !!h.resolvedMessage
        , N = o(h.default) || a(h.default) ? a(h.default) ? m ? p : () => p : h.default : s ? m ? p : () => p : null
        , b = s || null != N && (o(N) || l(N))
        , y = te(t, h);
    A && function(e) {
        i(e.list) ? e.list = e.list.map((e => o(e) ? T(e) : e)) : n(e.named) && Object.keys(e.named).forEach((t => {
                o(e.named[t]) && (e.named[t] = T(e.named[t]))
            }
        ))
    }(h);
    let[F,C,R] = k ? [p, y, d[y] || e()] : mt(t, p, y, _, E, O)
        , I = F
        , M = p;
    if (k || o(I) || L(I) || ct(I) || b && (I = N,
        M = I),
        !(k || (o(I) || L(I) || ct(I)) && o(C)))
        return u ? -1 : p;
    let w = !1;
    const S = ct(I) ? I : ft(t, p, C, I, M, ( () => {
            w = !0
        }
    ));
    if (w)
        return I;
    const D = function(e, t, n, r) {
        const {modifiers: a, pluralRules: l, messageResolver: s, fallbackLocale: i, fallbackWarn: c, missingWarn: u, fallbackContext: m} = e
            , f = (r, a) => {
            let l = s(n, r);
            if (null == l && (m || a)) {
                const [,,n] = mt(m || e, r, t, i, c, u);
                l = s(n, r)
            }
            if (o(l) || L(l)) {
                let n = !1;
                const o = ft(e, r, t, l, r, ( () => {
                        n = !0
                    }
                ));
                return n ? it : o
            }
            return ct(l) ? l : it
        }
            , _ = {
            locale: t,
            modifiers: a,
            pluralRules: l,
            messages: f
        };
        e.processor && (_.processor = e.processor);
        r.list && (_.list = r.list);
        r.named && (_.named = r.named);
        g(r.plural) && (_.pluralIndex = r.plural);
        return _
    }(t, C, R, h)
        , v = function(e, t, n) {
        const r = t(n);
        return r
    }(0, S, st(D))
        , P = c ? c(v, p) : v;
    if (__INTLIFY_PROD_DEVTOOLS__) {
        const e = {
            timestamp: Date.now(),
            key: o(p) ? p : ct(I) ? I.key : "",
            locale: C || (ct(I) ? I.locale : ""),
            format: o(I) ? I : ct(I) ? I.source : "",
            message: P
        };
        e.meta = f({}, t.__meta, De() || {}),
            J(e)
    }
    return P
}
function mt(t, n, r, a, l, s) {
    const {messages: i, onWarn: c, messageResolver: u, localeFallbacker: m} = t
        , f = m(t, a, r);
    let _, d = e(), p = null;
    for (let r = 0; r < f.length && (_ = f[r],
        d = i[_] || e(),
    null === (p = u(d, n)) && (p = d[n]),
        !(o(p) || L(p) || ct(p))); r++)
        if (!je(_, f)) {
            const e = Ye(t, n, _, 0, "translate");
            e !== n && (p = e)
        }
    return [p, _, d]
}
function ft(e, t, n, r, o, a) {
    const {messageCompiler: l, warnHtmlMessage: s} = e;
    if (ct(r)) {
        const e = r;
        return e.locale = e.locale || n,
            e.key = e.key || t,
            e
    }
    if (null == l) {
        const e = () => r;
        return e.locale = n,
            e.key = t,
            e
    }
    const i = l(r, function(e, t, n, r, o, a) {
        return {
            locale: t,
            key: n,
            warnHtmlMessage: o,
            onError: e => {
                throw a && a(e),
                    e
            }
            ,
            onCacheKey: e => h(t, n, e)
        }
    }(0, n, o, 0, s, a));
    return i.locale = n,
        i.key = t,
        i.source = r,
        i
}
function _t(...t) {
    const [n,r,a] = t
        , l = e();
    if (!(o(n) || g(n) || ct(n) || L(n)))
        throw ee(q.INVALID_ARGUMENT);
    const s = g(n) ? String(n) : (ct(n),
        n);
    return g(r) ? l.plural = r : o(r) ? l.default = r : c(r) && !d(r) ? l.named = r : i(r) && (l.list = r),
        g(a) ? l.plural = a : o(a) ? l.default = a : c(a) && f(l, a),
        [s, l]
}
"boolean" != typeof __INTLIFY_PROD_DEVTOOLS__ && (t().__INTLIFY_PROD_DEVTOOLS__ = !1),
"boolean" != typeof __INTLIFY_DROP_MESSAGE_COMPILER__ && (t().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
export {W as AST_NODE_PROPS_KEYS, Q as CORE_ERROR_CODES_EXTEND_POINT, he as CORE_WARN_CODES_EXTEND_POINT, q as CoreErrorCodes, Te as CoreWarnCodes, ze as DATETIME_FORMAT_OPTIONS_KEYS, Ne as DEFAULT_LOCALE, rt as DEFAULT_MESSAGE_DATA_TYPE, be as MISSING_RESOLVE_VALUE, ke as NOT_REOSLVED, qe as NUMBER_FORMAT_OPTIONS_KEYS, Ae as VERSION, K as clearCompileCache, Je as clearDateTimeFormat, et as clearNumberFormat, B as compile, xe as createCoreContext, ee as createCoreError, st as createMessageContext, He as datetime, ae as fallbackWithLocaleChain, oe as fallbackWithSimple, De as getAdditionalMeta, z as getDevToolsHook, We as getFallbackContext, te as getLocale, Ee as getWarnMessage, Ye as handleMissing, Z as initI18nDevTools, Be as isAlmostSameLocale, je as isImplicitFallback, L as isMessageAST, ct as isMessageFunction, Ve as isTranslateFallbackWarn, Ge as isTranslateMissingWarn, Xe as number, _e as parse, Ze as parseDateTimeArgs, Qe as parseNumberArgs, _t as parseTranslateArgs, Me as registerLocaleFallbacker, Re as registerMessageCompiler, Ie as registerMessageResolver, re as resolveLocale, ge as resolveValue, pe as resolveWithKeyValue, Se as setAdditionalMeta, H as setDevToolsHook, Pe as setFallbackContext, ut as translate, J as translateDevTools, Ke as updateFallbackLocale};
export default null;
//# sourceMappingURL=/sm/dcbe714af1274964469ada0ebb16819f355f0fd10864edce9ae11059ba07db97.map
