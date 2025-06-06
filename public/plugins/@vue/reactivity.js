/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/@vue/reactivity@3.4.34/dist/reactivity.esm-bundler.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import {NOOP as t, extend as e, isArray as s, isSymbol as n, isMap as i, isIntegerKey as r, isObject as c, def as o, isFunction as u, hasChanged as h, toRawType as l, hasOwn as a, makeMap as _} from "./shared.js";
/**
 * @vue/reactivity v3.4.34
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
let f, d;
class v {
    constructor(t=!1) {
        this.detached = t,
            this._active = !0,
            this.effects = [],
            this.cleanups = [],
            this.parent = f,
        !t && f && (this.index = (f.scopes || (f.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const e = f;
            try {
                return f = this,
                    t()
            } finally {
                f = e
            }
        }
    }
    on() {
        f = this
    }
    off() {
        f = this.parent
    }
    stop(t) {
        if (this._active) {
            let e, s;
            for (e = 0,
                     s = this.effects.length; e < s; e++)
                this.effects[e].stop();
            for (e = 0,
                     s = this.cleanups.length; e < s; e++)
                this.cleanups[e]();
            if (this.scopes)
                for (e = 0,
                         s = this.scopes.length; e < s; e++)
                    this.scopes[e].stop(!0);
            if (!this.detached && this.parent && !t) {
                const t = this.parent.scopes.pop();
                t && t !== this && (this.parent.scopes[this.index] = t,
                    t.index = this.index)
            }
            this.parent = void 0,
                this._active = !1
        }
    }
}
function p(t) {
    return new v(t)
}
function g(t, e=f) {
    e && e.active && e.effects.push(t)
}
function y() {
    return f
}
function w(t) {
    f && f.cleanups.push(t)
}
class R {
    constructor(t, e, s, n) {
        this.fn = t,
            this.trigger = e,
            this.scheduler = s,
            this.active = !0,
            this.deps = [],
            this._dirtyLevel = 4,
            this._trackId = 0,
            this._runnings = 0,
            this._shouldSchedule = !1,
            this._depsLength = 0,
            g(this, n)
    }
    get dirty() {
        if (2 === this._dirtyLevel || 3 === this._dirtyLevel) {
            this._dirtyLevel = 1,
                P();
            for (let t = 0; t < this._depsLength; t++) {
                const e = this.deps[t];
                if (e.computed && (S(e.computed),
                this._dirtyLevel >= 4))
                    break
            }
            1 === this._dirtyLevel && (this._dirtyLevel = 0),
                A()
        }
        return this._dirtyLevel >= 4
    }
    set dirty(t) {
        this._dirtyLevel = t ? 4 : 0
    }
    run() {
        if (this._dirtyLevel = 0,
            !this.active)
            return this.fn();
        let t = x
            , e = d;
        try {
            return x = !0,
                d = this,
                this._runnings++,
                L(this),
                this.fn()
        } finally {
            b(this),
                this._runnings--,
                d = e,
                x = t
        }
    }
    stop() {
        this.active && (L(this),
            b(this),
        this.onStop && this.onStop(),
            this.active = !1)
    }
}
function S(t) {
    return t.value
}
function L(t) {
    t._trackId++,
        t._depsLength = 0
}
function b(t) {
    if (t.deps.length > t._depsLength) {
        for (let e = t._depsLength; e < t.deps.length; e++)
            k(t.deps[e], t);
        t.deps.length = t._depsLength
    }
}
function k(t, e) {
    const s = t.get(e);
    void 0 !== s && e._trackId !== s && (t.delete(e),
    0 === t.size && t.cleanup())
}
function E(s, n) {
    s.effect instanceof R && (s = s.effect.fn);
    const i = new R(s,t,( () => {
            i.dirty && i.run()
        }
    ));
    n && (e(i, n),
    n.scope && g(i, n.scope)),
    n && n.lazy || i.run();
    const r = i.run.bind(i);
    return r.effect = i,
        r
}
function m(t) {
    t.effect.stop()
}
let x = !0
    , O = 0;
const I = [];
function P() {
    I.push(x),
        x = !1
}
function j() {
    I.push(x),
        x = !0
}
function A() {
    const t = I.pop();
    x = void 0 === t || t
}
function M() {
    O++
}
function W() {
    for (O--; !O && V.length; )
        V.shift()()
}
function z(t, e, s) {
    if (e.get(t) !== t._trackId) {
        e.set(t, t._trackId);
        const s = t.deps[t._depsLength];
        s !== e ? (s && k(s, t),
            t.deps[t._depsLength++] = e) : t._depsLength++
    }
}
const V = [];
function T(t, e, s) {
    M();
    for (const s of t.keys()) {
        let n;
        s._dirtyLevel < e && (null != n ? n : n = t.get(s) === s._trackId) && (s._shouldSchedule || (s._shouldSchedule = 0 === s._dirtyLevel),
            s._dirtyLevel = e),
        s._shouldSchedule && (null != n ? n : n = t.get(s) === s._trackId) && (s.trigger(),
        s._runnings && !s.allowRecurse || 2 === s._dirtyLevel || (s._shouldSchedule = !1,
        s.scheduler && V.push(s.scheduler)))
    }
    W()
}
const D = (t, e) => {
    const s = new Map;
    return s.cleanup = t,
        s.computed = e,
        s
}
    , N = new WeakMap
    , K = Symbol("")
    , C = Symbol("");
function H(t, e, s) {
    if (x && d) {
        let e = N.get(t);
        e || N.set(t, e = new Map);
        let n = e.get(s);
        n || e.set(s, n = D(( () => e.delete(s)))),
            z(d, n)
    }
}
function G(t, e, c, o, u, h) {
    const l = N.get(t);
    if (!l)
        return;
    let a = [];
    if ("clear" === e)
        a = [...l.values()];
    else if ("length" === c && s(t)) {
        const t = Number(o);
        l.forEach(( (e, s) => {
                ("length" === s || !n(s) && s >= t) && a.push(e)
            }
        ))
    } else
        switch (void 0 !== c && a.push(l.get(c)),
            e) {
            case "add":
                s(t) ? r(c) && a.push(l.get("length")) : (a.push(l.get(K)),
                i(t) && a.push(l.get(C)));
                break;
            case "delete":
                s(t) || (a.push(l.get(K)),
                i(t) && a.push(l.get(C)));
                break;
            case "set":
                i(t) && a.push(l.get(K))
        }
    M();
    for (const t of a)
        t && T(t, 4);
    W()
}
const Y = _("__proto__,__v_isRef,__isVue")
    , q = new Set(Object.getOwnPropertyNames(Symbol).filter((t => "arguments" !== t && "caller" !== t)).map((t => Symbol[t])).filter(n))
    , B = F();
function F() {
    const t = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach((e => {
            t[e] = function(...t) {
                const s = Tt(this);
                for (let t = 0, e = this.length; t < e; t++)
                    H(s, 0, t + "");
                const n = s[e](...t);
                return -1 === n || !1 === n ? s[e](...t.map(Tt)) : n
            }
        }
    )),
        ["push", "pop", "shift", "unshift", "splice"].forEach((e => {
                t[e] = function(...t) {
                    P(),
                        M();
                    const s = Tt(this)[e].apply(this, t);
                    return W(),
                        A(),
                        s
                }
            }
        )),
        t
}
function J(t) {
    n(t) || (t = String(t));
    const e = Tt(this);
    return H(e, 0, t),
        e.hasOwnProperty(t)
}
class Q {
    constructor(t=!1, e=!1) {
        this._isReadonly = t,
            this._isShallow = e
    }
    get(t, e, i) {
        const o = this._isReadonly
            , u = this._isShallow;
        if ("__v_isReactive" === e)
            return !o;
        if ("__v_isReadonly" === e)
            return o;
        if ("__v_isShallow" === e)
            return u;
        if ("__v_raw" === e)
            return i === (o ? u ? xt : mt : u ? Et : kt).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(i) ? t : void 0;
        const h = s(t);
        if (!o) {
            if (h && a(B, e))
                return Reflect.get(B, e, i);
            if ("hasOwnProperty" === e)
                return J
        }
        const l = Reflect.get(t, e, i);
        return (n(e) ? q.has(e) : Y(e)) ? l : (o || H(t, 0, e),
            u ? l : qt(l) ? h && r(e) ? l : l.value : c(l) ? o ? Pt(l) : Ot(l) : l)
    }
}
class U extends Q {
    constructor(t=!1) {
        super(!1, t)
    }
    set(t, e, n, i) {
        let c = t[e];
        if (!this._isShallow) {
            const e = Wt(c);
            if (zt(n) || Wt(n) || (c = Tt(c),
                n = Tt(n)),
            !s(t) && qt(c) && !qt(n))
                return !e && (c.value = n,
                    !0)
        }
        const o = s(t) && r(e) ? Number(e) < t.length : a(t, e)
            , u = Reflect.set(t, e, n, i);
        return t === Tt(i) && (o ? h(n, c) && G(t, "set", e, n) : G(t, "add", e, n)),
            u
    }
    deleteProperty(t, e) {
        const s = a(t, e);
        t[e];
        const n = Reflect.deleteProperty(t, e);
        return n && s && G(t, "delete", e, void 0),
            n
    }
    has(t, e) {
        const s = Reflect.has(t, e);
        return n(e) && q.has(e) || H(t, 0, e),
            s
    }
    ownKeys(t) {
        return H(t, 0, s(t) ? "length" : K),
            Reflect.ownKeys(t)
    }
}
class X extends Q {
    constructor(t=!1) {
        super(!0, t)
    }
    set(t, e) {
        return !0
    }
    deleteProperty(t, e) {
        return !0
    }
}
const Z = new U
    , $ = new X
    , tt = new U(!0)
    , et = new X(!0)
    , st = t => t
    , nt = t => Reflect.getPrototypeOf(t);
function it(t, e, s=!1, n=!1) {
    const i = Tt(t = t.__v_raw)
        , r = Tt(e);
    s || (h(e, r) && H(i, 0, e),
        H(i, 0, r));
    const {has: c} = nt(i)
        , o = n ? st : s ? Kt : Nt;
    return c.call(i, e) ? o(t.get(e)) : c.call(i, r) ? o(t.get(r)) : void (t !== i && t.get(e))
}
function rt(t, e=!1) {
    const s = this.__v_raw
        , n = Tt(s)
        , i = Tt(t);
    return e || (h(t, i) && H(n, 0, t),
        H(n, 0, i)),
        t === i ? s.has(t) : s.has(t) || s.has(i)
}
function ct(t, e=!1) {
    return t = t.__v_raw,
    !e && H(Tt(t), 0, K),
        Reflect.get(t, "size", t)
}
function ot(t, e=!1) {
    e || zt(t) || Wt(t) || (t = Tt(t));
    const s = Tt(this);
    return nt(s).has.call(s, t) || (s.add(t),
        G(s, "add", t, t)),
        this
}
function ut(t, e, s=!1) {
    s || zt(e) || Wt(e) || (e = Tt(e));
    const n = Tt(this)
        , {has: i, get: r} = nt(n);
    let c = i.call(n, t);
    c || (t = Tt(t),
        c = i.call(n, t));
    const o = r.call(n, t);
    return n.set(t, e),
        c ? h(e, o) && G(n, "set", t, e) : G(n, "add", t, e),
        this
}
function ht(t) {
    const e = Tt(this)
        , {has: s, get: n} = nt(e);
    let i = s.call(e, t);
    i || (t = Tt(t),
        i = s.call(e, t)),
    n && n.call(e, t);
    const r = e.delete(t);
    return i && G(e, "delete", t, void 0),
        r
}
function lt() {
    const t = Tt(this)
        , e = 0 !== t.size
        , s = t.clear();
    return e && G(t, "clear", void 0, void 0),
        s
}
function at(t, e) {
    return function(s, n) {
        const i = this
            , r = i.__v_raw
            , c = Tt(r)
            , o = e ? st : t ? Kt : Nt;
        return !t && H(c, 0, K),
            r.forEach(( (t, e) => s.call(n, o(t), o(e), i)))
    }
}
function _t(t, e, s) {
    return function(...n) {
        const r = this.__v_raw
            , c = Tt(r)
            , o = i(c)
            , u = "entries" === t || t === Symbol.iterator && o
            , h = "keys" === t && o
            , l = r[t](...n)
            , a = s ? st : e ? Kt : Nt;
        return !e && H(c, 0, h ? C : K),
            {
                next() {
                    const {value: t, done: e} = l.next();
                    return e ? {
                        value: t,
                        done: e
                    } : {
                        value: u ? [a(t[0]), a(t[1])] : a(t),
                        done: e
                    }
                },
                [Symbol.iterator]() {
                    return this
                }
            }
    }
}
function ft(t) {
    return function(...e) {
        return "delete" !== t && ("clear" === t ? void 0 : this)
    }
}
function dt() {
    const t = {
        get(t) {
            return it(this, t)
        },
        get size() {
            return ct(this)
        },
        has: rt,
        add: ot,
        set: ut,
        delete: ht,
        clear: lt,
        forEach: at(!1, !1)
    }
        , e = {
        get(t) {
            return it(this, t, !1, !0)
        },
        get size() {
            return ct(this)
        },
        has: rt,
        add(t) {
            return ot.call(this, t, !0)
        },
        set(t, e) {
            return ut.call(this, t, e, !0)
        },
        delete: ht,
        clear: lt,
        forEach: at(!1, !0)
    }
        , s = {
        get(t) {
            return it(this, t, !0)
        },
        get size() {
            return ct(this, !0)
        },
        has(t) {
            return rt.call(this, t, !0)
        },
        add: ft("add"),
        set: ft("set"),
        delete: ft("delete"),
        clear: ft("clear"),
        forEach: at(!0, !1)
    }
        , n = {
        get(t) {
            return it(this, t, !0, !0)
        },
        get size() {
            return ct(this, !0)
        },
        has(t) {
            return rt.call(this, t, !0)
        },
        add: ft("add"),
        set: ft("set"),
        delete: ft("delete"),
        clear: ft("clear"),
        forEach: at(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach((i => {
            t[i] = _t(i, !1, !1),
                s[i] = _t(i, !0, !1),
                e[i] = _t(i, !1, !0),
                n[i] = _t(i, !0, !0)
        }
    )),
        [t, s, e, n]
}
const [vt,pt,gt,yt] = dt();
function wt(t, e) {
    const s = e ? t ? yt : gt : t ? pt : vt;
    return (e, n, i) => "__v_isReactive" === n ? !t : "__v_isReadonly" === n ? t : "__v_raw" === n ? e : Reflect.get(a(s, n) && n in e ? s : e, n, i)
}
const Rt = {
    get: wt(!1, !1)
}
    , St = {
    get: wt(!1, !0)
}
    , Lt = {
    get: wt(!0, !1)
}
    , bt = {
    get: wt(!0, !0)
}
    , kt = new WeakMap
    , Et = new WeakMap
    , mt = new WeakMap
    , xt = new WeakMap;
function Ot(t) {
    return Wt(t) ? t : At(t, !1, Z, Rt, kt)
}
function It(t) {
    return At(t, !1, tt, St, Et)
}
function Pt(t) {
    return At(t, !0, $, Lt, mt)
}
function jt(t) {
    return At(t, !0, et, bt, xt)
}
function At(t, e, s, n, i) {
    if (!c(t))
        return t;
    if (t.__v_raw && (!e || !t.__v_isReactive))
        return t;
    const r = i.get(t);
    if (r)
        return r;
    const o = (u = t).__v_skip || !Object.isExtensible(u) ? 0 : function(t) {
        switch (t) {
            case "Object":
            case "Array":
                return 1;
            case "Map":
            case "Set":
            case "WeakMap":
            case "WeakSet":
                return 2;
            default:
                return 0
        }
    }(l(u));
    var u;
    if (0 === o)
        return t;
    const h = new Proxy(t,2 === o ? n : s);
    return i.set(t, h),
        h
}
function Mt(t) {
    return Wt(t) ? Mt(t.__v_raw) : !(!t || !t.__v_isReactive)
}
function Wt(t) {
    return !(!t || !t.__v_isReadonly)
}
function zt(t) {
    return !(!t || !t.__v_isShallow)
}
function Vt(t) {
    return !!t && !!t.__v_raw
}
function Tt(t) {
    const e = t && t.__v_raw;
    return e ? Tt(e) : t
}
function Dt(t) {
    return Object.isExtensible(t) && o(t, "__v_skip", !0),
        t
}
const Nt = t => c(t) ? Ot(t) : t
    , Kt = t => c(t) ? Pt(t) : t;
class Ct {
    constructor(t, e, s, n) {
        this.getter = t,
            this._setter = e,
            this.dep = void 0,
            this.__v_isRef = !0,
            this.__v_isReadonly = !1,
            this.effect = new R(( () => t(this._value)),( () => Yt(this, 2 === this.effect._dirtyLevel ? 2 : 3))),
            this.effect.computed = this,
            this.effect.active = this._cacheable = !n,
            this.__v_isReadonly = s
    }
    get value() {
        const t = Tt(this);
        return t._cacheable && !t.effect.dirty || !h(t._value, t._value = t.effect.run()) || Yt(t, 4),
            Gt(t),
        t.effect._dirtyLevel >= 2 && Yt(t, 2),
            t._value
    }
    set value(t) {
        this._setter(t)
    }
    get _dirty() {
        return this.effect.dirty
    }
    set _dirty(t) {
        this.effect.dirty = t
    }
}
function Ht(e, s, n=!1) {
    let i, r;
    const c = u(e);
    c ? (i = e,
        r = t) : (i = e.get,
        r = e.set);
    return new Ct(i,r,c || !r,n)
}
function Gt(t) {
    var e;
    x && d && (t = Tt(t),
        z(d, null != (e = t.dep) ? e : t.dep = D(( () => t.dep = void 0), t instanceof Ct ? t : void 0)))
}
function Yt(t, e=4, s, n) {
    const i = (t = Tt(t)).dep;
    i && T(i, e)
}
function qt(t) {
    return !(!t || !0 !== t.__v_isRef)
}
function Bt(t) {
    return Jt(t, !1)
}
function Ft(t) {
    return Jt(t, !0)
}
function Jt(t, e) {
    return qt(t) ? t : new Qt(t,e)
}
class Qt {
    constructor(t, e) {
        this.__v_isShallow = e,
            this.dep = void 0,
            this.__v_isRef = !0,
            this._rawValue = e ? t : Tt(t),
            this._value = e ? t : Nt(t)
    }
    get value() {
        return Gt(this),
            this._value
    }
    set value(t) {
        const e = this.__v_isShallow || zt(t) || Wt(t);
        t = e ? t : Tt(t),
        h(t, this._rawValue) && (this._rawValue,
            this._rawValue = t,
            this._value = e ? t : Nt(t),
            Yt(this, 4))
    }
}
function Ut(t) {
    Yt(t, 4)
}
function Xt(t) {
    return qt(t) ? t.value : t
}
function Zt(t) {
    return u(t) ? t() : Xt(t)
}
const $t = {
    get: (t, e, s) => Xt(Reflect.get(t, e, s)),
    set: (t, e, s, n) => {
        const i = t[e];
        return qt(i) && !qt(s) ? (i.value = s,
            !0) : Reflect.set(t, e, s, n)
    }
};
function te(t) {
    return Mt(t) ? t : new Proxy(t,$t)
}
class ee {
    constructor(t) {
        this.dep = void 0,
            this.__v_isRef = !0;
        const {get: e, set: s} = t(( () => Gt(this)), ( () => Yt(this)));
        this._get = e,
            this._set = s
    }
    get value() {
        return this._get()
    }
    set value(t) {
        this._set(t)
    }
}
function se(t) {
    return new ee(t)
}
function ne(t) {
    const e = s(t) ? new Array(t.length) : {};
    for (const s in t)
        e[s] = oe(t, s);
    return e
}
class ie {
    constructor(t, e, s) {
        this._object = t,
            this._key = e,
            this._defaultValue = s,
            this.__v_isRef = !0
    }
    get value() {
        const t = this._object[this._key];
        return void 0 === t ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
    get dep() {
        return function(t, e) {
            const s = N.get(t);
            return s && s.get(e)
        }(Tt(this._object), this._key)
    }
}
class re {
    constructor(t) {
        this._getter = t,
            this.__v_isRef = !0,
            this.__v_isReadonly = !0
    }
    get value() {
        return this._getter()
    }
}
function ce(t, e, s) {
    return qt(t) ? t : u(t) ? new re(t) : c(t) && arguments.length > 1 ? oe(t, e, s) : Bt(t)
}
function oe(t, e, s) {
    const n = t[e];
    return qt(n) ? n : new ie(t,e,s)
}
const ue = Ht
    , he = {
    GET: "get",
    HAS: "has",
    ITERATE: "iterate"
}
    , le = {
    SET: "set",
    ADD: "add",
    DELETE: "delete",
    CLEAR: "clear"
}
    , ae = {
    SKIP: "__v_skip",
    IS_REACTIVE: "__v_isReactive",
    IS_READONLY: "__v_isReadonly",
    IS_SHALLOW: "__v_isShallow",
    RAW: "__v_raw"
};
export {v as EffectScope, K as ITERATE_KEY, R as ReactiveEffect, ae as ReactiveFlags, he as TrackOpTypes, le as TriggerOpTypes, Ht as computed, se as customRef, ue as deferredComputed, E as effect, p as effectScope, j as enableTracking, y as getCurrentScope, Vt as isProxy, Mt as isReactive, Wt as isReadonly, qt as isRef, zt as isShallow, Dt as markRaw, w as onScopeDispose, M as pauseScheduling, P as pauseTracking, te as proxyRefs, Ot as reactive, Pt as readonly, Bt as ref, W as resetScheduling, A as resetTracking, It as shallowReactive, jt as shallowReadonly, Ft as shallowRef, m as stop, Tt as toRaw, ce as toRef, ne as toRefs, Zt as toValue, H as track, G as trigger, Ut as triggerRef, Xt as unref};
export default null;
//# sourceMappingURL=/sm/68e55d927dac33fd9f8932989b22759a15264e7bb38f4412165c2e3b74707a29.map
