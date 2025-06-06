/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/vue-router@4.5.1/dist/vue-router.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import {inject as e, computed as t, unref as n, getCurrentInstance as r, watchEffect as o, shallowRef as a, shallowReactive as c, onUnmounted as s, onDeactivated as l, onActivated as i, defineComponent as u, reactive as f, h as p, provide as d, ref as h, watch as m, nextTick as v} from "./vue.js";
import {setupDevtoolsPlugin as g} from "./@vue/devtools-api.js";
const y = "undefined" != typeof document;
function b(e) {
    return "object" == typeof e || "displayName"in e || "props"in e || "__vccOpts"in e
}
function _(e) {
    return e.__esModule || "Module" === e[Symbol.toStringTag] || e.default && b(e.default)
}
const w = Object.assign;
function E(e, t) {
    const n = {};
    for (const r in t) {
        const o = t[r];
        n[r] = O(o) ? o.map(e) : e(o)
    }
    return n
}
const k = () => {}
    , O = Array.isArray
    , R = /#/g
    , C = /&/g
    , x = /\//g
    , P = /=/g
    , S = /\?/g
    , j = /\+/g
    , $ = /%5B/g
    , I = /%5D/g
    , T = /%5E/g
    , A = /%60/g
    , L = /%7B/g
    , D = /%7C/g
    , q = /%7D/g
    , V = /%20/g;
function M(e) {
    return encodeURI("" + e).replace(D, "|").replace($, "[").replace(I, "]")
}
function B(e) {
    return M(e).replace(j, "%2B").replace(V, "+").replace(R, "%23").replace(C, "%26").replace(A, "`").replace(L, "{").replace(q, "}").replace(T, "^")
}
function G(e) {
    return null == e ? "" : function(e) {
        return M(e).replace(R, "%23").replace(S, "%3F")
    }(e).replace(x, "%2F")
}
function W(e) {
    try {
        return decodeURIComponent("" + e)
    } catch (e) {}
    return "" + e
}
const U = /\/$/;
function N(e, t, n="/") {
    let r, o = {}, a = "", c = "";
    const s = t.indexOf("#");
    let l = t.indexOf("?");
    return s < l && s >= 0 && (l = -1),
    l > -1 && (r = t.slice(0, l),
        a = t.slice(l + 1, s > -1 ? s : t.length),
        o = e(a)),
    s > -1 && (r = r || t.slice(0, s),
        c = t.slice(s, t.length)),
        r = function(e, t) {
            if (e.startsWith("/"))
                return e;
            if (!e)
                return t;
            const n = t.split("/")
                , r = e.split("/")
                , o = r[r.length - 1];
            ".." !== o && "." !== o || r.push("");
            let a, c, s = n.length - 1;
            for (a = 0; a < r.length; a++)
                if (c = r[a],
                "." !== c) {
                    if (".." !== c)
                        break;
                    s > 1 && s--
                }
            return n.slice(0, s).join("/") + "/" + r.slice(a).join("/")
        }(null != r ? r : t, n),
        {
            fullPath: r + (a && "?") + a + c,
            path: r,
            query: o,
            hash: W(c)
        }
}
function F(e, t) {
    return t && e.toLowerCase().startsWith(t.toLowerCase()) ? e.slice(t.length) || "/" : e
}
function z(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}
function H(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
        return !1;
    for (const n in e)
        if (!K(e[n], t[n]))
            return !1;
    return !0
}
function K(e, t) {
    return O(e) ? Y(e, t) : O(t) ? Y(t, e) : e === t
}
function Y(e, t) {
    return O(t) ? e.length === t.length && e.every(( (e, n) => e === t[n])) : 1 === e.length && e[0] === t
}
const Q = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
};
var X, Z;
!function(e) {
    e.pop = "pop",
        e.push = "push"
}(X || (X = {})),
    function(e) {
        e.back = "back",
            e.forward = "forward",
            e.unknown = ""
    }(Z || (Z = {}));
function J(e) {
    if (!e)
        if (y) {
            const t = document.querySelector("base");
            e = (e = t && t.getAttribute("href") || "/").replace(/^\w+:\/\/[^\/]+/, "")
        } else
            e = "/";
    return "/" !== e[0] && "#" !== e[0] && (e = "/" + e),
        e.replace(U, "")
}
const ee = /^[^#]+#/;
function te(e, t) {
    return e.replace(ee, "#") + t
}
const ne = () => ({
    left: window.scrollX,
    top: window.scrollY
});
function re(e) {
    let t;
    if ("el"in e) {
        const n = e.el
            , r = "string" == typeof n && n.startsWith("#")
            , o = "string" == typeof n ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!o)
            return;
        t = function(e, t) {
            const n = document.documentElement.getBoundingClientRect()
                , r = e.getBoundingClientRect();
            return {
                behavior: t.behavior,
                left: r.left - n.left - (t.left || 0),
                top: r.top - n.top - (t.top || 0)
            }
        }(o, e)
    } else
        t = e;
    "scrollBehavior"in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(null != t.left ? t.left : window.scrollX, null != t.top ? t.top : window.scrollY)
}
function oe(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const ae = new Map;
let ce = () => location.protocol + "//" + location.host;
function se(e, t) {
    const {pathname: n, search: r, hash: o} = t
        , a = e.indexOf("#");
    if (a > -1) {
        let t = o.includes(e.slice(a)) ? e.slice(a).length : 1
            , n = o.slice(t);
        return "/" !== n[0] && (n = "/" + n),
            F(n, "")
    }
    return F(n, e) + r + o
}
function le(e, t, n, r=!1, o=!1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: r,
        position: window.history.length,
        scroll: o ? ne() : null
    }
}
function ie(e) {
    const t = function(e) {
        const {history: t, location: n} = window
            , r = {
            value: se(e, n)
        }
            , o = {
            value: t.state
        };
        function a(r, a, c) {
            const s = e.indexOf("#")
                , l = s > -1 ? (n.host && document.querySelector("base") ? e : e.slice(s)) + r : ce() + e + r;
            try {
                t[c ? "replaceState" : "pushState"](a, "", l),
                    o.value = a
            } catch (e) {
                console.error(e),
                    n[c ? "replace" : "assign"](l)
            }
        }
        return o.value || a(r.value, {
            back: null,
            current: r.value,
            forward: null,
            position: t.length - 1,
            replaced: !0,
            scroll: null
        }, !0),
            {
                location: r,
                state: o,
                push: function(e, n) {
                    const c = w({}, o.value, t.state, {
                        forward: e,
                        scroll: ne()
                    });
                    a(c.current, c, !0),
                        a(e, w({}, le(r.value, e, null), {
                            position: c.position + 1
                        }, n), !1),
                        r.value = e
                },
                replace: function(e, n) {
                    a(e, w({}, t.state, le(o.value.back, e, o.value.forward, !0), n, {
                        position: o.value.position
                    }), !0),
                        r.value = e
                }
            }
    }(e = J(e))
        , n = function(e, t, n, r) {
        let o = []
            , a = []
            , c = null;
        const s = ({state: a}) => {
                const s = se(e, location)
                    , l = n.value
                    , i = t.value;
                let u = 0;
                if (a) {
                    if (n.value = s,
                        t.value = a,
                    c && c === l)
                        return void (c = null);
                    u = i ? a.position - i.position : 0
                } else
                    r(s);
                o.forEach((e => {
                        e(n.value, l, {
                            delta: u,
                            type: X.pop,
                            direction: u ? u > 0 ? Z.forward : Z.back : Z.unknown
                        })
                    }
                ))
            }
        ;
        function l() {
            const {history: e} = window;
            e.state && e.replaceState(w({}, e.state, {
                scroll: ne()
            }), "")
        }
        return window.addEventListener("popstate", s),
            window.addEventListener("beforeunload", l, {
                passive: !0
            }),
            {
                pauseListeners: function() {
                    c = n.value
                },
                listen: function(e) {
                    o.push(e);
                    const t = () => {
                            const t = o.indexOf(e);
                            t > -1 && o.splice(t, 1)
                        }
                    ;
                    return a.push(t),
                        t
                },
                destroy: function() {
                    for (const e of a)
                        e();
                    a = [],
                        window.removeEventListener("popstate", s),
                        window.removeEventListener("beforeunload", l)
                }
            }
    }(e, t.state, t.location, t.replace);
    const r = w({
        location: "",
        base: e,
        go: function(e, t=!0) {
            t || n.pauseListeners(),
                history.go(e)
        },
        createHref: te.bind(null, e)
    }, t, n);
    return Object.defineProperty(r, "location", {
        enumerable: !0,
        get: () => t.location.value
    }),
        Object.defineProperty(r, "state", {
            enumerable: !0,
            get: () => t.state.value
        }),
        r
}
function ue(e="") {
    let t = []
        , n = [["", {}]]
        , r = 0;
    function o(e, t={}) {
        r++,
        r !== n.length && n.splice(r),
            n.push([e, t])
    }
    const a = {
        location: "",
        state: {},
        base: e = J(e),
        createHref: te.bind(null, e),
        replace(e, t) {
            n.splice(r--, 1),
                o(e, t)
        },
        push(e, t) {
            o(e, t)
        },
        listen: e => (t.push(e),
                () => {
                    const n = t.indexOf(e);
                    n > -1 && t.splice(n, 1)
                }
        ),
        destroy() {
            t = [],
                n = [["", {}]],
                r = 0
        },
        go(e, o=!0) {
            const a = this.location
                , c = e < 0 ? Z.back : Z.forward;
            r = Math.max(0, Math.min(r + e, n.length - 1)),
            o && function(e, n, {direction: r, delta: o}) {
                const a = {
                    direction: r,
                    delta: o,
                    type: X.pop
                };
                for (const r of t)
                    r(e, n, a)
            }(this.location, a, {
                direction: c,
                delta: e
            })
        }
    };
    return Object.defineProperty(a, "location", {
        enumerable: !0,
        get: () => n[r][0]
    }),
        Object.defineProperty(a, "state", {
            enumerable: !0,
            get: () => n[r][1]
        }),
        a
}
function fe(e) {
    return (e = location.host ? e || location.pathname + location.search : "").includes("#") || (e += "#"),
        ie(e)
}
function pe(e) {
    return "string" == typeof e || e && "object" == typeof e
}
function de(e) {
    return "string" == typeof e || "symbol" == typeof e
}
const he = Symbol("");
var me;
function ve(e, t) {
    return w(new Error, {
        type: e,
        [he]: !0
    }, t)
}
function ge(e, t) {
    return e instanceof Error && he in e && (null == t || !!(e.type & t))
}
!function(e) {
    e[e.aborted = 4] = "aborted",
        e[e.cancelled = 8] = "cancelled",
        e[e.duplicated = 16] = "duplicated"
}(me || (me = {}));
const ye = "[^/]+?"
    , be = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
}
    , _e = /[.+*?^${}()[\]/\\]/g;
function we(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
        const r = t[n] - e[n];
        if (r)
            return r;
        n++
    }
    return e.length < t.length ? 1 === e.length && 80 === e[0] ? -1 : 1 : e.length > t.length ? 1 === t.length && 80 === t[0] ? 1 : -1 : 0
}
function Ee(e, t) {
    let n = 0;
    const r = e.score
        , o = t.score;
    for (; n < r.length && n < o.length; ) {
        const e = we(r[n], o[n]);
        if (e)
            return e;
        n++
    }
    if (1 === Math.abs(o.length - r.length)) {
        if (ke(r))
            return 1;
        if (ke(o))
            return -1
    }
    return o.length - r.length
}
function ke(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}
const Oe = {
    type: 0,
    value: ""
}
    , Re = /[a-zA-Z0-9_]/;
function Ce(e, t, n) {
    const r = function(e, t) {
        const n = w({}, be, t)
            , r = [];
        let o = n.start ? "^" : "";
        const a = [];
        for (const t of e) {
            const e = t.length ? [] : [90];
            n.strict && !t.length && (o += "/");
            for (let r = 0; r < t.length; r++) {
                const c = t[r];
                let s = 40 + (n.sensitive ? .25 : 0);
                if (0 === c.type)
                    r || (o += "/"),
                        o += c.value.replace(_e, "\\$&"),
                        s += 40;
                else if (1 === c.type) {
                    const {value: e, repeatable: n, optional: l, regexp: i} = c;
                    a.push({
                        name: e,
                        repeatable: n,
                        optional: l
                    });
                    const u = i || ye;
                    if (u !== ye) {
                        s += 10;
                        try {
                            new RegExp(`(${u})`)
                        } catch (t) {
                            throw new Error(`Invalid custom RegExp for param "${e}" (${u}): ` + t.message)
                        }
                    }
                    let f = n ? `((?:${u})(?:/(?:${u}))*)` : `(${u})`;
                    r || (f = l && t.length < 2 ? `(?:/${f})` : "/" + f),
                    l && (f += "?"),
                        o += f,
                        s += 20,
                    l && (s += -8),
                    n && (s += -20),
                    ".*" === u && (s += -50)
                }
                e.push(s)
            }
            r.push(e)
        }
        if (n.strict && n.end) {
            const e = r.length - 1;
            r[e][r[e].length - 1] += .7000000000000001
        }
        n.strict || (o += "/?"),
            n.end ? o += "$" : n.strict && !o.endsWith("/") && (o += "(?:/|$)");
        const c = new RegExp(o,n.sensitive ? "" : "i");
        return {
            re: c,
            score: r,
            keys: a,
            parse: function(e) {
                const t = e.match(c)
                    , n = {};
                if (!t)
                    return null;
                for (let e = 1; e < t.length; e++) {
                    const r = t[e] || ""
                        , o = a[e - 1];
                    n[o.name] = r && o.repeatable ? r.split("/") : r
                }
                return n
            },
            stringify: function(t) {
                let n = ""
                    , r = !1;
                for (const o of e) {
                    r && n.endsWith("/") || (n += "/"),
                        r = !1;
                    for (const e of o)
                        if (0 === e.type)
                            n += e.value;
                        else if (1 === e.type) {
                            const {value: a, repeatable: c, optional: s} = e
                                , l = a in t ? t[a] : "";
                            if (O(l) && !c)
                                throw new Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);
                            const i = O(l) ? l.join("/") : l;
                            if (!i) {
                                if (!s)
                                    throw new Error(`Missing required param "${a}"`);
                                o.length < 2 && (n.endsWith("/") ? n = n.slice(0, -1) : r = !0)
                            }
                            n += i
                        }
                }
                return n || "/"
            }
        }
    }(function(e) {
        if (!e)
            return [[]];
        if ("/" === e)
            return [[Oe]];
        if (!e.startsWith("/"))
            throw new Error(`Invalid path "${e}"`);
        function t(e) {
            throw new Error(`ERR (${n})/"${i}": ${e}`)
        }
        let n = 0
            , r = n;
        const o = [];
        let a;
        function c() {
            a && o.push(a),
                a = []
        }
        let s, l = 0, i = "", u = "";
        function f() {
            i && (0 === n ? a.push({
                type: 0,
                value: i
            }) : 1 === n || 2 === n || 3 === n ? (a.length > 1 && ("*" === s || "+" === s) && t(`A repeatable param (${i}) must be alone in its segment. eg: '/:ids+.`),
                a.push({
                    type: 1,
                    value: i,
                    regexp: u,
                    repeatable: "*" === s || "+" === s,
                    optional: "*" === s || "?" === s
                })) : t("Invalid state to consume buffer"),
                i = "")
        }
        function p() {
            i += s
        }
        for (; l < e.length; )
            if (s = e[l++],
            "\\" !== s || 2 === n)
                switch (n) {
                    case 0:
                        "/" === s ? (i && f(),
                            c()) : ":" === s ? (f(),
                            n = 1) : p();
                        break;
                    case 4:
                        p(),
                            n = r;
                        break;
                    case 1:
                        "(" === s ? n = 2 : Re.test(s) ? p() : (f(),
                            n = 0,
                        "*" !== s && "?" !== s && "+" !== s && l--);
                        break;
                    case 2:
                        ")" === s ? "\\" == u[u.length - 1] ? u = u.slice(0, -1) + s : n = 3 : u += s;
                        break;
                    case 3:
                        f(),
                            n = 0,
                        "*" !== s && "?" !== s && "+" !== s && l--,
                            u = "";
                        break;
                    default:
                        t("Unknown state")
                }
            else
                r = n,
                    n = 4;
        return 2 === n && t(`Unfinished custom RegExp for param "${i}"`),
            f(),
            c(),
            o
    }(e.path), n)
        , o = w(r, {
        record: e,
        parent: t,
        children: [],
        alias: []
    });
    return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o),
        o
}
function xe(e, t) {
    const n = []
        , r = new Map;
    function o(e, n, r) {
        const s = !r
            , l = Se(e);
        l.aliasOf = r && r.record;
        const i = Te(t, e)
            , u = [l];
        if ("alias"in e) {
            const t = "string" == typeof e.alias ? [e.alias] : e.alias;
            for (const e of t)
                u.push(Se(w({}, l, {
                    components: r ? r.record.components : l.components,
                    path: e,
                    aliasOf: r ? r.record : l
                })))
        }
        let f, p;
        for (const t of u) {
            const {path: u} = t;
            if (n && "/" !== u[0]) {
                const e = n.record.path
                    , r = "/" === e[e.length - 1] ? "" : "/";
                t.path = n.record.path + (u && r + u)
            }
            if (f = Ce(t, n, i),
                r ? r.alias.push(f) : (p = p || f,
                p !== f && p.alias.push(f),
                s && e.name && !$e(f) && a(e.name)),
            Ae(f) && c(f),
                l.children) {
                const e = l.children;
                for (let t = 0; t < e.length; t++)
                    o(e[t], f, r && r.children[t])
            }
            r = r || f
        }
        return p ? () => {
                a(p)
            }
            : k
    }
    function a(e) {
        if (de(e)) {
            const t = r.get(e);
            t && (r.delete(e),
                n.splice(n.indexOf(t), 1),
                t.children.forEach(a),
                t.alias.forEach(a))
        } else {
            const t = n.indexOf(e);
            t > -1 && (n.splice(t, 1),
            e.record.name && r.delete(e.record.name),
                e.children.forEach(a),
                e.alias.forEach(a))
        }
    }
    function c(e) {
        const t = function(e, t) {
            let n = 0
                , r = t.length;
            for (; n !== r; ) {
                const o = n + r >> 1;
                Ee(e, t[o]) < 0 ? r = o : n = o + 1
            }
            const o = function(e) {
                let t = e;
                for (; t = t.parent; )
                    if (Ae(t) && 0 === Ee(e, t))
                        return t;
                return
            }(e);
            o && (r = t.lastIndexOf(o, r - 1));
            return r
        }(e, n);
        n.splice(t, 0, e),
        e.record.name && !$e(e) && r.set(e.record.name, e)
    }
    return t = Te({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t),
        e.forEach((e => o(e))),
        {
            addRoute: o,
            resolve: function(e, t) {
                let o, a, c, s = {};
                if ("name"in e && e.name) {
                    if (o = r.get(e.name),
                        !o)
                        throw ve(1, {
                            location: e
                        });
                    c = o.record.name,
                        s = w(Pe(t.params, o.keys.filter((e => !e.optional)).concat(o.parent ? o.parent.keys.filter((e => e.optional)) : []).map((e => e.name))), e.params && Pe(e.params, o.keys.map((e => e.name)))),
                        a = o.stringify(s)
                } else if (null != e.path)
                    a = e.path,
                        o = n.find((e => e.re.test(a))),
                    o && (s = o.parse(a),
                        c = o.record.name);
                else {
                    if (o = t.name ? r.get(t.name) : n.find((e => e.re.test(t.path))),
                        !o)
                        throw ve(1, {
                            location: e,
                            currentLocation: t
                        });
                    c = o.record.name,
                        s = w({}, t.params, e.params),
                        a = o.stringify(s)
                }
                const l = [];
                let i = o;
                for (; i; )
                    l.unshift(i.record),
                        i = i.parent;
                return {
                    name: c,
                    path: a,
                    params: s,
                    matched: l,
                    meta: Ie(l)
                }
            },
            removeRoute: a,
            clearRoutes: function() {
                n.length = 0,
                    r.clear()
            },
            getRoutes: function() {
                return n
            },
            getRecordMatcher: function(e) {
                return r.get(e)
            }
        }
}
function Pe(e, t) {
    const n = {};
    for (const r of t)
        r in e && (n[r] = e[r]);
    return n
}
function Se(e) {
    const t = {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: e.aliasOf,
        beforeEnter: e.beforeEnter,
        props: je(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components"in e ? e.components || null : e.component && {
            default: e.component
        }
    };
    return Object.defineProperty(t, "mods", {
        value: {}
    }),
        t
}
function je(e) {
    const t = {}
        , n = e.props || !1;
    if ("component"in e)
        t.default = n;
    else
        for (const r in e.components)
            t[r] = "object" == typeof n ? n[r] : n;
    return t
}
function $e(e) {
    for (; e; ) {
        if (e.record.aliasOf)
            return !0;
        e = e.parent
    }
    return !1
}
function Ie(e) {
    return e.reduce(( (e, t) => w(e, t.meta)), {})
}
function Te(e, t) {
    const n = {};
    for (const r in e)
        n[r] = r in t ? t[r] : e[r];
    return n
}
function Ae({record: e}) {
    return !!(e.name || e.components && Object.keys(e.components).length || e.redirect)
}
function Le(e) {
    const t = {};
    if ("" === e || "?" === e)
        return t;
    const n = ("?" === e[0] ? e.slice(1) : e).split("&");
    for (let e = 0; e < n.length; ++e) {
        const r = n[e].replace(j, " ")
            , o = r.indexOf("=")
            , a = W(o < 0 ? r : r.slice(0, o))
            , c = o < 0 ? null : W(r.slice(o + 1));
        if (a in t) {
            let e = t[a];
            O(e) || (e = t[a] = [e]),
                e.push(c)
        } else
            t[a] = c
    }
    return t
}
function De(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (n = B(n).replace(P, "%3D"),
        null == r) {
            void 0 !== r && (t += (t.length ? "&" : "") + n);
            continue
        }
        (O(r) ? r.map((e => e && B(e))) : [r && B(r)]).forEach((e => {
                void 0 !== e && (t += (t.length ? "&" : "") + n,
                null != e && (t += "=" + e))
            }
        ))
    }
    return t
}
function qe(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        void 0 !== r && (t[n] = O(r) ? r.map((e => null == e ? null : "" + e)) : null == r ? r : "" + r)
    }
    return t
}
const Ve = Symbol("")
    , Me = Symbol("")
    , Be = Symbol("")
    , Ge = Symbol("")
    , We = Symbol("");
function Ue() {
    let e = [];
    return {
        add: function(t) {
            return e.push(t),
                () => {
                    const n = e.indexOf(t);
                    n > -1 && e.splice(n, 1)
                }
        },
        list: () => e.slice(),
        reset: function() {
            e = []
        }
    }
}
function Ne(e, t, n) {
    const r = () => {
            e[t].delete(n)
        }
    ;
    s(r),
        l(r),
        i(( () => {
                e[t].add(n)
            }
        )),
        e[t].add(n)
}
function Fe(t) {
    const n = e(Ve, {}).value;
    n && Ne(n, "leaveGuards", t)
}
function ze(t) {
    const n = e(Ve, {}).value;
    n && Ne(n, "updateGuards", t)
}
function He(e, t, n, r, o, a=e => e()) {
    const c = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
    return () => new Promise(( (s, l) => {
            const i = e => {
                !1 === e ? l(ve(4, {
                    from: n,
                    to: t
                })) : e instanceof Error ? l(e) : pe(e) ? l(ve(2, {
                    from: t,
                    to: e
                })) : (c && r.enterCallbacks[o] === c && "function" == typeof e && c.push(e),
                    s())
            }
                , u = a(( () => e.call(r && r.instances[o], t, n, i)));
            let f = Promise.resolve(u);
            e.length < 3 && (f = f.then(i)),
                f.catch((e => l(e)))
        }
    ))
}
function Ke(e, t, n, r, o=e => e()) {
    const a = [];
    for (const c of e)
        for (const e in c.components) {
            let s = c.components[e];
            if ("beforeRouteEnter" === t || c.instances[e])
                if (b(s)) {
                    const l = (s.__vccOpts || s)[t];
                    l && a.push(He(l, n, r, c, e, o))
                } else {
                    let l = s();
                    a.push(( () => l.then((a => {
                            if (!a)
                                throw new Error(`Couldn't resolve component "${e}" at "${c.path}"`);
                            const s = _(a) ? a.default : a;
                            c.mods[e] = a,
                                c.components[e] = s;
                            const l = (s.__vccOpts || s)[t];
                            return l && He(l, n, r, c, e, o)()
                        }
                    ))))
                }
        }
    return a
}
function Ye(e) {
    return e.matched.every((e => e.redirect)) ? Promise.reject(new Error("Cannot load a route that redirects.")) : Promise.all(e.matched.map((e => e.components && Promise.all(Object.keys(e.components).reduce(( (t, n) => {
            const r = e.components[n];
            return "function" != typeof r || "displayName"in r || t.push(r().then((t => {
                    if (!t)
                        return Promise.reject(new Error(`Couldn't resolve component "${n}" at "${e.path}". Ensure you passed a function that returns a promise.`));
                    const r = _(t) ? t.default : t;
                    e.mods[n] = t,
                        e.components[n] = r
                }
            ))),
                t
        }
    ), []))))).then(( () => e))
}
function Qe(a) {
    const c = e(Be)
        , s = e(Ge)
        , l = t(( () => {
            const e = n(a.to);
            return c.resolve(e)
        }
    ))
        , i = t(( () => {
            const {matched: e} = l.value
                , {length: t} = e
                , n = e[t - 1]
                , r = s.matched;
            if (!n || !r.length)
                return -1;
            const o = r.findIndex(z.bind(null, n));
            if (o > -1)
                return o;
            const a = Ze(e[t - 2]);
            return t > 1 && Ze(n) === a && r[r.length - 1].path !== a ? r.findIndex(z.bind(null, e[t - 2])) : o
        }
    ))
        , u = t(( () => i.value > -1 && function(e, t) {
        for (const n in t) {
            const r = t[n]
                , o = e[n];
            if ("string" == typeof r) {
                if (r !== o)
                    return !1
            } else if (!O(o) || o.length !== r.length || r.some(( (e, t) => e !== o[t])))
                return !1
        }
        return !0
    }(s.params, l.value.params)))
        , f = t(( () => i.value > -1 && i.value === s.matched.length - 1 && H(s.params, l.value.params)));
    if (__VUE_PROD_DEVTOOLS__ && y) {
        const e = r();
        if (e) {
            const t = {
                route: l.value,
                isActive: u.value,
                isExactActive: f.value,
                error: null
            };
            e.__vrl_devtools = e.__vrl_devtools || [],
                e.__vrl_devtools.push(t),
                o(( () => {
                        t.route = l.value,
                            t.isActive = u.value,
                            t.isExactActive = f.value,
                            t.error = pe(n(a.to)) ? null : 'Invalid "to" value'
                    }
                ), {
                    flush: "post"
                })
        }
    }
    return {
        route: l,
        href: t(( () => l.value.href)),
        isActive: u,
        isExactActive: f,
        navigate: function(e={}) {
            if (function(e) {
                if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
                    return;
                if (e.defaultPrevented)
                    return;
                if (void 0 !== e.button && 0 !== e.button)
                    return;
                if (e.currentTarget && e.currentTarget.getAttribute) {
                    const t = e.currentTarget.getAttribute("target");
                    if (/\b_blank\b/i.test(t))
                        return
                }
                e.preventDefault && e.preventDefault();
                return !0
            }(e)) {
                const e = c[n(a.replace) ? "replace" : "push"](n(a.to)).catch(k);
                return a.viewTransition && "undefined" != typeof document && "startViewTransition"in document && document.startViewTransition(( () => e)),
                    e
            }
            return Promise.resolve()
        }
    }
}
const Xe = u({
    name: "RouterLink",
    compatConfig: {
        MODE: 3
    },
    props: {
        to: {
            type: [String, Object],
            required: !0
        },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: "page"
        },
        viewTransition: Boolean
    },
    useLink: Qe,
    setup(n, {slots: r}) {
        const o = f(Qe(n))
            , {options: a} = e(Be)
            , c = t(( () => ({
            [Je(n.activeClass, a.linkActiveClass, "router-link-active")]: o.isActive,
            [Je(n.exactActiveClass, a.linkExactActiveClass, "router-link-exact-active")]: o.isExactActive
        })));
        return () => {
            const e = r.default && (1 === (t = r.default(o)).length ? t[0] : t);
            var t;
            return n.custom ? e : p("a", {
                "aria-current": o.isExactActive ? n.ariaCurrentValue : null,
                href: o.href,
                onClick: o.navigate,
                class: c.value
            }, e)
        }
    }
});
function Ze(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const Je = (e, t, n) => null != e ? e : null != t ? t : n;
function et(e, t) {
    if (!e)
        return null;
    const n = e(t);
    return 1 === n.length ? n[0] : n
}
const tt = u({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
        name: {
            type: String,
            default: "default"
        },
        route: Object
    },
    compatConfig: {
        MODE: 3
    },
    setup(r, {attrs: o, slots: a}) {
        const c = e(We)
            , s = t(( () => r.route || c.value))
            , l = e(Me, 0)
            , i = t(( () => {
                let e = n(l);
                const {matched: t} = s.value;
                let r;
                for (; (r = t[e]) && !r.components; )
                    e++;
                return e
            }
        ))
            , u = t(( () => s.value.matched[i.value]));
        d(Me, t(( () => i.value + 1))),
            d(Ve, u),
            d(We, s);
        const f = h();
        return m(( () => [f.value, u.value, r.name]), ( ([e,t,n], [r,o,a]) => {
                t && (t.instances[n] = e,
                o && o !== t && e && e === r && (t.leaveGuards.size || (t.leaveGuards = o.leaveGuards),
                t.updateGuards.size || (t.updateGuards = o.updateGuards))),
                !e || !t || o && z(t, o) && r || (t.enterCallbacks[n] || []).forEach((t => t(e)))
            }
        ), {
            flush: "post"
        }),
            () => {
                const e = s.value
                    , t = r.name
                    , n = u.value
                    , c = n && n.components[t];
                if (!c)
                    return et(a.default, {
                        Component: c,
                        route: e
                    });
                const l = n.props[t]
                    , d = l ? !0 === l ? e.params : "function" == typeof l ? l(e) : l : null
                    , h = p(c, w({}, d, o, {
                    onVnodeUnmounted: e => {
                        e.component.isUnmounted && (n.instances[t] = null)
                    }
                    ,
                    ref: f
                }));
                if (__VUE_PROD_DEVTOOLS__ && y && h.ref) {
                    const e = {
                        depth: i.value,
                        name: n.name,
                        path: n.path,
                        meta: n.meta
                    };
                    (O(h.ref) ? h.ref.map((e => e.i)) : [h.ref.i]).forEach((t => {
                            t.__vrv_devtools = e
                        }
                    ))
                }
                return et(a.default, {
                    Component: h,
                    route: e
                }) || h
            }
    }
});
function nt(e, t) {
    const n = w({}, e, {
        matched: e.matched.map((e => function(e, t) {
            const n = {};
            for (const r in e)
                t.includes(r) || (n[r] = e[r]);
            return n
        }(e, ["instances", "children", "aliasOf"])))
    });
    return {
        _custom: {
            type: null,
            readOnly: !0,
            display: e.fullPath,
            tooltip: t,
            value: n
        }
    }
}
function rt(e) {
    return {
        _custom: {
            display: e
        }
    }
}
let ot = 0;
function at(e, t, n) {
    if (t.__hasDevtools)
        return;
    t.__hasDevtools = !0;
    const r = ot++;
    g({
        id: "org.vuejs.router" + (r ? "." + r : ""),
        label: "Vue Router",
        packageName: "vue-router",
        homepage: "https://router.vuejs.org",
        logo: "https://router.vuejs.org/logo.png",
        componentStateTypes: ["Routing"],
        app: e
    }, (o => {
            "function" != typeof o.now && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."),
                o.on.inspectComponent(( (e, n) => {
                        e.instanceData && e.instanceData.state.push({
                            type: "Routing",
                            key: "$route",
                            editable: !1,
                            value: nt(t.currentRoute.value, "Current Route")
                        })
                    }
                )),
                o.on.visitComponentTree(( ({treeNode: e, componentInstance: t}) => {
                        if (t.__vrv_devtools) {
                            const n = t.__vrv_devtools;
                            e.tags.push({
                                label: (n.name ? `${n.name.toString()}: ` : "") + n.path,
                                textColor: 0,
                                tooltip: "This component is rendered by &lt;router-view&gt;",
                                backgroundColor: st
                            })
                        }
                        O(t.__vrl_devtools) && (t.__devtoolsApi = o,
                            t.__vrl_devtools.forEach((t => {
                                    let n = t.route.path
                                        , r = ft
                                        , o = ""
                                        , a = 0;
                                    t.error ? (n = t.error,
                                        r = dt,
                                        a = ht) : t.isExactActive ? (r = it,
                                        o = "This is exactly active") : t.isActive && (r = lt,
                                        o = "This link is active"),
                                        e.tags.push({
                                            label: n,
                                            textColor: a,
                                            tooltip: o,
                                            backgroundColor: r
                                        })
                                }
                            )))
                    }
                )),
                m(t.currentRoute, ( () => {
                        l(),
                            o.notifyComponentUpdate(),
                            o.sendInspectorTree(s),
                            o.sendInspectorState(s)
                    }
                ));
            const a = "router:navigations:" + r;
            o.addTimelineLayer({
                id: a,
                label: `Router${r ? " " + r : ""} Navigations`,
                color: 4237508
            }),
                t.onError(( (e, t) => {
                        o.addTimelineEvent({
                            layerId: a,
                            event: {
                                title: "Error during Navigation",
                                subtitle: t.fullPath,
                                logType: "error",
                                time: o.now(),
                                data: {
                                    error: e
                                },
                                groupId: t.meta.__navigationId
                            }
                        })
                    }
                ));
            let c = 0;
            t.beforeEach(( (e, t) => {
                    const n = {
                        guard: rt("beforeEach"),
                        from: nt(t, "Current Location during this navigation"),
                        to: nt(e, "Target location")
                    };
                    Object.defineProperty(e.meta, "__navigationId", {
                        value: c++
                    }),
                        o.addTimelineEvent({
                            layerId: a,
                            event: {
                                time: o.now(),
                                title: "Start of navigation",
                                subtitle: e.fullPath,
                                data: n,
                                groupId: e.meta.__navigationId
                            }
                        })
                }
            )),
                t.afterEach(( (e, t, n) => {
                        const r = {
                            guard: rt("afterEach")
                        };
                        n ? (r.failure = {
                            _custom: {
                                type: Error,
                                readOnly: !0,
                                display: n ? n.message : "",
                                tooltip: "Navigation Failure",
                                value: n
                            }
                        },
                            r.status = rt("❌")) : r.status = rt("✅"),
                            r.from = nt(t, "Current Location during this navigation"),
                            r.to = nt(e, "Target location"),
                            o.addTimelineEvent({
                                layerId: a,
                                event: {
                                    title: "End of navigation",
                                    subtitle: e.fullPath,
                                    time: o.now(),
                                    data: r,
                                    logType: n ? "warning" : "default",
                                    groupId: e.meta.__navigationId
                                }
                            })
                    }
                ));
            const s = "router-inspector:" + r;
            function l() {
                if (!i)
                    return;
                const e = i;
                let r = n.getRoutes().filter((e => !e.parent || !e.parent.record.components));
                r.forEach(bt),
                e.filter && (r = r.filter((t => _t(t, e.filter.toLowerCase())))),
                    r.forEach((e => yt(e, t.currentRoute.value))),
                    e.rootNodes = r.map(mt)
            }
            let i;
            o.addInspector({
                id: s,
                label: "Routes" + (r ? " " + r : ""),
                icon: "book",
                treeFilterPlaceholder: "Search routes"
            }),
                o.on.getInspectorTree((t => {
                        i = t,
                        t.app === e && t.inspectorId === s && l()
                    }
                )),
                o.on.getInspectorState((t => {
                        if (t.app === e && t.inspectorId === s) {
                            const e = n.getRoutes().find((e => e.record.__vd_id === t.nodeId));
                            e && (t.state = {
                                options: ct(e)
                            })
                        }
                    }
                )),
                o.sendInspectorTree(s),
                o.sendInspectorState(s)
        }
    ))
}
function ct(e) {
    const {record: t} = e
        , n = [{
        editable: !1,
        key: "path",
        value: t.path
    }];
    return null != t.name && n.push({
        editable: !1,
        key: "name",
        value: t.name
    }),
        n.push({
            editable: !1,
            key: "regexp",
            value: e.re
        }),
    e.keys.length && n.push({
        editable: !1,
        key: "keys",
        value: {
            _custom: {
                type: null,
                readOnly: !0,
                display: e.keys.map((e => `${e.name}${function(e) {
                    return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : ""
                }(e)}`)).join(" "),
                tooltip: "Param keys",
                value: e.keys
            }
        }
    }),
    null != t.redirect && n.push({
        editable: !1,
        key: "redirect",
        value: t.redirect
    }),
    e.alias.length && n.push({
        editable: !1,
        key: "aliases",
        value: e.alias.map((e => e.record.path))
    }),
    Object.keys(e.record.meta).length && n.push({
        editable: !1,
        key: "meta",
        value: e.record.meta
    }),
        n.push({
            key: "score",
            editable: !1,
            value: {
                _custom: {
                    type: null,
                    readOnly: !0,
                    display: e.score.map((e => e.join(", "))).join(" | "),
                    tooltip: "Score used to sort routes",
                    value: e.score
                }
            }
        }),
        n
}
const st = 15485081
    , lt = 2450411
    , it = 8702998
    , ut = 2282478
    , ft = 16486972
    , pt = 6710886
    , dt = 16704226
    , ht = 12131356;
function mt(e) {
    const t = []
        , {record: n} = e;
    null != n.name && t.push({
        label: String(n.name),
        textColor: 0,
        backgroundColor: ut
    }),
    n.aliasOf && t.push({
        label: "alias",
        textColor: 0,
        backgroundColor: ft
    }),
    e.__vd_match && t.push({
        label: "matches",
        textColor: 0,
        backgroundColor: st
    }),
    e.__vd_exactActive && t.push({
        label: "exact",
        textColor: 0,
        backgroundColor: it
    }),
    e.__vd_active && t.push({
        label: "active",
        textColor: 0,
        backgroundColor: lt
    }),
    n.redirect && t.push({
        label: "string" == typeof n.redirect ? `redirect: ${n.redirect}` : "redirects",
        textColor: 16777215,
        backgroundColor: pt
    });
    let r = n.__vd_id;
    return null == r && (r = String(vt++),
        n.__vd_id = r),
        {
            id: r,
            label: n.path,
            tags: t,
            children: e.children.map(mt)
        }
}
let vt = 0;
const gt = /^\/(.*)\/([a-z]*)$/;
function yt(e, t) {
    const n = t.matched.length && z(t.matched[t.matched.length - 1], e.record);
    e.__vd_exactActive = e.__vd_active = n,
    n || (e.__vd_active = t.matched.some((t => z(t, e.record)))),
        e.children.forEach((e => yt(e, t)))
}
function bt(e) {
    e.__vd_match = !1,
        e.children.forEach(bt)
}
function _t(e, t) {
    const n = String(e.re).match(gt);
    if (e.__vd_match = !1,
    !n || n.length < 3)
        return !1;
    if (new RegExp(n[1].replace(/\$$/, ""),n[2]).test(t))
        return e.children.forEach((e => _t(e, t))),
        ("/" !== e.record.path || "/" === t) && (e.__vd_match = e.re.test(t),
            !0);
    const r = e.record.path.toLowerCase()
        , o = W(r);
    return !(t.startsWith("/") || !o.includes(t) && !r.includes(t)) || (!(!o.startsWith(t) && !r.startsWith(t)) || (!(!e.record.name || !String(e.record.name).includes(t)) || e.children.some((e => _t(e, t)))))
}
function wt(e) {
    const t = xe(e.routes, e)
        , r = e.parseQuery || Le
        , o = e.stringifyQuery || De
        , s = e.history
        , l = Ue()
        , i = Ue()
        , u = Ue()
        , f = a(Q);
    let p = Q;
    y && e.scrollBehavior && "scrollRestoration"in history && (history.scrollRestoration = "manual");
    const d = E.bind(null, (e => "" + e))
        , h = E.bind(null, G)
        , m = E.bind(null, W);
    function g(e, n) {
        if (n = w({}, n || f.value),
        "string" == typeof e) {
            const o = N(r, e, n.path)
                , a = t.resolve({
                path: o.path
            }, n)
                , c = s.createHref(o.fullPath);
            return w(o, a, {
                params: m(a.params),
                hash: W(o.hash),
                redirectedFrom: void 0,
                href: c
            })
        }
        let a;
        if (null != e.path)
            a = w({}, e, {
                path: N(r, e.path, n.path).path
            });
        else {
            const t = w({}, e.params);
            for (const e in t)
                null == t[e] && delete t[e];
            a = w({}, e, {
                params: h(t)
            }),
                n.params = h(n.params)
        }
        const c = t.resolve(a, n)
            , l = e.hash || "";
        c.params = d(m(c.params));
        const i = function(e, t) {
            const n = t.query ? e(t.query) : "";
            return t.path + (n && "?") + n + (t.hash || "")
        }(o, w({}, e, {
            hash: (u = l,
                M(u).replace(L, "{").replace(q, "}").replace(T, "^")),
            path: c.path
        }));
        var u;
        const p = s.createHref(i);
        return w({
            fullPath: i,
            hash: l,
            query: o === De ? qe(e.query) : e.query || {}
        }, c, {
            redirectedFrom: void 0,
            href: p
        })
    }
    function b(e) {
        return "string" == typeof e ? N(r, e, f.value.path) : w({}, e)
    }
    function _(e, t) {
        if (p !== e)
            return ve(8, {
                from: t,
                to: e
            })
    }
    function R(e) {
        return x(e)
    }
    function C(e) {
        const t = e.matched[e.matched.length - 1];
        if (t && t.redirect) {
            const {redirect: n} = t;
            let r = "function" == typeof n ? n(e) : n;
            return "string" == typeof r && (r = r.includes("?") || r.includes("#") ? r = b(r) : {
                path: r
            },
                r.params = {}),
                w({
                    query: e.query,
                    hash: e.hash,
                    params: null != r.path ? {} : e.params
                }, r)
        }
    }
    function x(e, t) {
        const n = p = g(e)
            , r = f.value
            , a = e.state
            , c = e.force
            , s = !0 === e.replace
            , l = C(n);
        if (l)
            return x(w(b(l), {
                state: "object" == typeof l ? w({}, a, l.state) : a,
                force: c,
                replace: s
            }), t || n);
        const i = n;
        let u;
        return i.redirectedFrom = t,
        !c && function(e, t, n) {
            const r = t.matched.length - 1
                , o = n.matched.length - 1;
            return r > -1 && r === o && z(t.matched[r], n.matched[o]) && H(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
        }(o, r, n) && (u = ve(16, {
            to: i,
            from: r
        }),
            Y(r, r, !0, !1)),
            (u ? Promise.resolve(u) : j(i, r)).catch((e => ge(e) ? ge(e, 2) ? e : K(e) : F(e, i, r))).then((e => {
                    if (e) {
                        if (ge(e, 2))
                            return x(w({
                                replace: s
                            }, b(e.to), {
                                state: "object" == typeof e.to ? w({}, a, e.to.state) : a,
                                force: c
                            }), t || i)
                    } else
                        e = I(i, r, !0, s, a);
                    return $(i, r, e),
                        e
                }
            ))
    }
    function P(e, t) {
        const n = _(e, t);
        return n ? Promise.reject(n) : Promise.resolve()
    }
    function S(e) {
        const t = ee.values().next().value;
        return t && "function" == typeof t.runWithContext ? t.runWithContext(e) : e()
    }
    function j(e, t) {
        let n;
        const [r,o,a] = function(e, t) {
            const n = []
                , r = []
                , o = []
                , a = Math.max(t.matched.length, e.matched.length);
            for (let c = 0; c < a; c++) {
                const a = t.matched[c];
                a && (e.matched.find((e => z(e, a))) ? r.push(a) : n.push(a));
                const s = e.matched[c];
                s && (t.matched.find((e => z(e, s))) || o.push(s))
            }
            return [n, r, o]
        }(e, t);
        n = Ke(r.reverse(), "beforeRouteLeave", e, t);
        for (const o of r)
            o.leaveGuards.forEach((r => {
                    n.push(He(r, e, t))
                }
            ));
        const c = P.bind(null, e, t);
        return n.push(c),
            ce(n).then(( () => {
                    n = [];
                    for (const r of l.list())
                        n.push(He(r, e, t));
                    return n.push(c),
                        ce(n)
                }
            )).then(( () => {
                    n = Ke(o, "beforeRouteUpdate", e, t);
                    for (const r of o)
                        r.updateGuards.forEach((r => {
                                n.push(He(r, e, t))
                            }
                        ));
                    return n.push(c),
                        ce(n)
                }
            )).then(( () => {
                    n = [];
                    for (const r of a)
                        if (r.beforeEnter)
                            if (O(r.beforeEnter))
                                for (const o of r.beforeEnter)
                                    n.push(He(o, e, t));
                            else
                                n.push(He(r.beforeEnter, e, t));
                    return n.push(c),
                        ce(n)
                }
            )).then(( () => (e.matched.forEach((e => e.enterCallbacks = {})),
                n = Ke(a, "beforeRouteEnter", e, t, S),
                n.push(c),
                ce(n)))).then(( () => {
                    n = [];
                    for (const r of i.list())
                        n.push(He(r, e, t));
                    return n.push(c),
                        ce(n)
                }
            )).catch((e => ge(e, 8) ? e : Promise.reject(e)))
    }
    function $(e, t, n) {
        u.list().forEach((r => S(( () => r(e, t, n)))))
    }
    function I(e, t, n, r, o) {
        const a = _(e, t);
        if (a)
            return a;
        const c = t === Q
            , l = y ? history.state : {};
        n && (r || c ? s.replace(e.fullPath, w({
            scroll: c && l && l.scroll
        }, o)) : s.push(e.fullPath, o)),
            f.value = e,
            Y(e, t, n, c),
            K()
    }
    let A;
    function D() {
        A || (A = s.listen(( (e, t, n) => {
                if (!te.listening)
                    return;
                const r = g(e)
                    , o = C(r);
                if (o)
                    return void x(w(o, {
                        replace: !0,
                        force: !0
                    }), r).catch(k);
                p = r;
                const a = f.value;
                var c, l;
                y && (c = oe(a.fullPath, n.delta),
                    l = ne(),
                    ae.set(c, l)),
                    j(r, a).catch((e => ge(e, 12) ? e : ge(e, 2) ? (x(w(b(e.to), {
                        force: !0
                    }), r).then((e => {
                            ge(e, 20) && !n.delta && n.type === X.pop && s.go(-1, !1)
                        }
                    )).catch(k),
                        Promise.reject()) : (n.delta && s.go(-n.delta, !1),
                        F(e, r, a)))).then((e => {
                            (e = e || I(r, a, !1)) && (n.delta && !ge(e, 8) ? s.go(-n.delta, !1) : n.type === X.pop && ge(e, 20) && s.go(-1, !1)),
                                $(r, a, e)
                        }
                    )).catch(k)
            }
        )))
    }
    let V, B = Ue(), U = Ue();
    function F(e, t, n) {
        K(e);
        const r = U.list();
        return r.length ? r.forEach((r => r(e, t, n))) : console.error(e),
            Promise.reject(e)
    }
    function K(e) {
        return V || (V = !e,
            D(),
            B.list().forEach(( ([t,n]) => e ? n(e) : t())),
            B.reset()),
            e
    }
    function Y(t, n, r, o) {
        const {scrollBehavior: a} = e;
        if (!y || !a)
            return Promise.resolve();
        const c = !r && function(e) {
            const t = ae.get(e);
            return ae.delete(e),
                t
        }(oe(t.fullPath, 0)) || (o || !r) && history.state && history.state.scroll || null;
        return v().then(( () => a(t, n, c))).then((e => e && re(e))).catch((e => F(e, t, n)))
    }
    const Z = e => s.go(e);
    let J;
    const ee = new Set
        , te = {
        currentRoute: f,
        listening: !0,
        addRoute: function(e, n) {
            let r, o;
            return de(e) ? (r = t.getRecordMatcher(e),
                o = n) : o = e,
                t.addRoute(o, r)
        },
        removeRoute: function(e) {
            const n = t.getRecordMatcher(e);
            n && t.removeRoute(n)
        },
        clearRoutes: t.clearRoutes,
        hasRoute: function(e) {
            return !!t.getRecordMatcher(e)
        },
        getRoutes: function() {
            return t.getRoutes().map((e => e.record))
        },
        resolve: g,
        options: e,
        push: R,
        replace: function(e) {
            return R(w(b(e), {
                replace: !0
            }))
        },
        go: Z,
        back: () => Z(-1),
        forward: () => Z(1),
        beforeEach: l.add,
        beforeResolve: i.add,
        afterEach: u.add,
        onError: U.add,
        isReady: function() {
            return V && f.value !== Q ? Promise.resolve() : new Promise(( (e, t) => {
                    B.add([e, t])
                }
            ))
        },
        install(e) {
            const r = this;
            e.component("RouterLink", Xe),
                e.component("RouterView", tt),
                e.config.globalProperties.$router = r,
                Object.defineProperty(e.config.globalProperties, "$route", {
                    enumerable: !0,
                    get: () => n(f)
                }),
            y && !J && f.value === Q && (J = !0,
                R(s.location).catch((e => {}
                )));
            const o = {};
            for (const e in Q)
                Object.defineProperty(o, e, {
                    get: () => f.value[e],
                    enumerable: !0
                });
            e.provide(Be, r),
                e.provide(Ge, c(o)),
                e.provide(We, f);
            const a = e.unmount;
            ee.add(e),
                e.unmount = function() {
                    ee.delete(e),
                    ee.size < 1 && (p = Q,
                    A && A(),
                        A = null,
                        f.value = Q,
                        J = !1,
                        V = !1),
                        a()
                }
                ,
            __VUE_PROD_DEVTOOLS__ && y && at(e, r, t)
        }
    };
    function ce(e) {
        return e.reduce(( (e, t) => e.then(( () => S(t)))), Promise.resolve())
    }
    return te
}
function Et() {
    return e(Be)
}
function kt(t) {
    return e(Ge)
}
export {me as NavigationFailureType, Xe as RouterLink, tt as RouterView, Q as START_LOCATION, ue as createMemoryHistory, wt as createRouter, xe as createRouterMatcher, fe as createWebHashHistory, ie as createWebHistory, ge as isNavigationFailure, Ye as loadRouteLocation, Ve as matchedRouteKey, Fe as onBeforeRouteLeave, ze as onBeforeRouteUpdate, Le as parseQuery, Ge as routeLocationKey, Be as routerKey, We as routerViewLocationKey, De as stringifyQuery, Qe as useLink, kt as useRoute, Et as useRouter, Me as viewDepthKey};
export default null;
//# sourceMappingURL=/sm/d2f076b5a3575753a5574446caa8f47e66d5180c016b7ef07c8bd0015da21833.map
