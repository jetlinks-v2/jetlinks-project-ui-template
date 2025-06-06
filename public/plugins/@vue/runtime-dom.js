/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/@vue/runtime-dom@3.3.4/dist/runtime-dom.esm-bundler.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import {defineComponent as e, nextTick as t, createVNode as n, getCurrentInstance as r, watchPostEffect as s, onMounted as o, onUnmounted as i, h as a, BaseTransition as l, BaseTransitionPropsValidators as c, Fragment as u, Static as p, useTransitionState as f, onUpdated as d, toRaw as m, getTransitionRawChildren as h, setTransitionHooks as v, resolveTransitionHooks as g, createRenderer as _, createHydrationRenderer as b, camelize as y, callWithAsyncErrorHandling as C} from "./runtime-core.js";
export * from "./runtime-core.js";
import {isArray as S, camelize as E, toNumber as A, hyphenate as w, extend as T, EMPTY_OBJ as x, isObject as P, looseToNumber as k, looseIndexOf as L, isSet as N, looseEqual as $, isFunction as R, isString as M, invokeArrayFns as V, isOn as B, isModelListener as D, capitalize as I, isSpecialBooleanAttr as O, includeBooleanAttr as F} from "./shared.js";

const U = "undefined" != typeof document ? document : null
    , H = U && U.createElement("template")
    , j = {
    insert: (e, t, n) => {
        t.insertBefore(e, n || null)
    }
    ,
    remove: e => {
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e, t, n, r) => {
        const s = t ? U.createElementNS("http://www.w3.org/2000/svg", e) : U.createElement(e, n ? {
            is: n
        } : void 0);
        return "select" === e && r && null != r.multiple && s.setAttribute("multiple", r.multiple),
            s
    }
    ,
    createText: e => U.createTextNode(e),
    createComment: e => U.createComment(e),
    setText: (e, t) => {
        e.nodeValue = t
    }
    ,
    setElementText: (e, t) => {
        e.textContent = t
    }
    ,
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => U.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, r, s, o) {
        const i = n ? n.previousSibling : t.lastChild;
        if (s && (s === o || s.nextSibling))
            for (; t.insertBefore(s.cloneNode(!0), n),
                   s !== o && (s = s.nextSibling); )
                ;
        else {
            H.innerHTML = r ? `<svg>${e}</svg>` : e;
            const s = H.content;
            if (r) {
                const e = s.firstChild;
                for (; e.firstChild; )
                    s.appendChild(e.firstChild);
                s.removeChild(e)
            }
            t.insertBefore(s, n)
        }
        return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
};
const q = /\s*!important$/;
function z(e, t, n) {
    if (S(n))
        n.forEach((n => z(e, t, n)));
    else if (null == n && (n = ""),
        t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const r = function(e, t) {
            const n = W[t];
            if (n)
                return n;
            let r = y(t);
            if ("filter" !== r && r in e)
                return W[t] = r;
            r = I(r);
            for (let n = 0; n < K.length; n++) {
                const s = K[n] + r;
                if (s in e)
                    return W[t] = s
            }
            return t
        }(e, t);
        q.test(n) ? e.setProperty(w(r), n.replace(q, ""), "important") : e[r] = n
    }
}
const K = ["Webkit", "Moz", "ms"]
    , W = {};
const G = "http://www.w3.org/1999/xlink";
function X(e, t, n, r) {
    e.addEventListener(t, n, r)
}
function J(e, t, n, r, s=null) {
    const o = e._vei || (e._vei = {})
        , i = o[t];
    if (r && i)
        i.value = r;
    else {
        const [n,a] = function(e) {
            let t;
            if (Q.test(e)) {
                let n;
                for (t = {}; n = e.match(Q); )
                    e = e.slice(0, e.length - n[0].length),
                        t[n[0].toLowerCase()] = !0
            }
            const n = ":" === e[2] ? e.slice(3) : w(e.slice(2));
            return [n, t]
        }(t);
        if (r) {
            const i = o[t] = function(e, t) {
                const n = e => {
                        if (e._vts) {
                            if (e._vts <= n.attached)
                                return
                        } else
                            e._vts = Date.now();
                        C(function(e, t) {
                            if (S(t)) {
                                const n = e.stopImmediatePropagation;
                                return e.stopImmediatePropagation = () => {
                                    n.call(e),
                                        e._stopped = !0
                                }
                                    ,
                                    t.map((e => t => !t._stopped && e && e(t)))
                            }
                            return t
                        }(e, n.value), t, 5, [e])
                    }
                ;
                return n.value = e,
                    n.attached = ee(),
                    n
            }(r, s);
            X(e, n, i, a)
        } else
            i && (!function(e, t, n, r) {
                e.removeEventListener(t, n, r)
            }(e, n, i, a),
                o[t] = void 0)
    }
}
const Q = /(?:Once|Passive|Capture)$/;
let Y = 0;
const Z = Promise.resolve()
    , ee = () => Y || (Z.then(( () => Y = 0)),
    Y = Date.now());
const te = /^on[a-z]/;
function ne(t, n) {
    const r = e(t);
    class s extends oe {
        constructor(e) {
            super(r, e, n)
        }
    }
    return s.def = r,
        s
}
const re = e => ne(e, lt)
    , se = "undefined" != typeof HTMLElement ? HTMLElement : class {
    }
;
class oe extends se {
    constructor(e, t={}, n) {
        super(),
            this._def = e,
            this._props = t,
            this._instance = null,
            this._connected = !1,
            this._resolved = !1,
            this._numberProps = null,
            this.shadowRoot && n ? n(this._createVNode(), this.shadowRoot) : (this.attachShadow({
                mode: "open"
            }),
            this._def.__asyncLoader || this._resolveProps(this._def))
    }
    connectedCallback() {
        this._connected = !0,
        this._instance || (this._resolved ? this._update() : this._resolveDef())
    }
    disconnectedCallback() {
        this._connected = !1,
            t(( () => {
                    this._connected || (at(null, this.shadowRoot),
                        this._instance = null)
                }
            ))
    }
    _resolveDef() {
        this._resolved = !0;
        for (let e = 0; e < this.attributes.length; e++)
            this._setAttr(this.attributes[e].name);
        new MutationObserver((e => {
                for (const t of e)
                    this._setAttr(t.attributeName)
            }
        )).observe(this, {
            attributes: !0
        });
        const e = (e, t=!1) => {
            const {props: n, styles: r} = e;
            let s;
            if (n && !S(n))
                for (const e in n) {
                    const t = n[e];
                    (t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = A(this._props[e])),
                        (s || (s = Object.create(null)))[E(e)] = !0)
                }
            this._numberProps = s,
            t && this._resolveProps(e),
                this._applyStyles(r),
                this._update()
        }
            , t = this._def.__asyncLoader;
        t ? t().then((t => e(t, !0))) : e(this._def)
    }
    _resolveProps(e) {
        const {props: t} = e
            , n = S(t) ? t : Object.keys(t || {});
        for (const e of Object.keys(this))
            "_" !== e[0] && n.includes(e) && this._setProp(e, this[e], !0, !1);
        for (const e of n.map(E))
            Object.defineProperty(this, e, {
                get() {
                    return this._getProp(e)
                },
                set(t) {
                    this._setProp(e, t)
                }
            })
    }
    _setAttr(e) {
        let t = this.getAttribute(e);
        const n = E(e);
        this._numberProps && this._numberProps[n] && (t = A(t)),
            this._setProp(n, t, !1)
    }
    _getProp(e) {
        return this._props[e]
    }
    _setProp(e, t, n=!0, r=!0) {
        t !== this._props[e] && (this._props[e] = t,
        r && this._instance && this._update(),
        n && (!0 === t ? this.setAttribute(w(e), "") : "string" == typeof t || "number" == typeof t ? this.setAttribute(w(e), t + "") : t || this.removeAttribute(w(e))))
    }
    _update() {
        at(this._createVNode(), this.shadowRoot)
    }
    _createVNode() {
        const e = n(this._def, T({}, this._props));
        return this._instance || (e.ce = e => {
                this._instance = e,
                    e.isCE = !0;
                const t = (e, t) => {
                        this.dispatchEvent(new CustomEvent(e,{
                            detail: t
                        }))
                    }
                ;
                e.emit = (e, ...n) => {
                    t(e, n),
                    w(e) !== e && t(w(e), n)
                }
                ;
                let n = this;
                for (; n = n && (n.parentNode || n.host); )
                    if (n instanceof oe) {
                        e.parent = n._instance,
                            e.provides = n._instance.provides;
                        break
                    }
            }
        ),
            e
    }
    _applyStyles(e) {
        e && e.forEach((e => {
                const t = document.createElement("style");
                t.textContent = e,
                    this.shadowRoot.appendChild(t)
            }
        ))
    }
}
function ie(e="$style") {
    {
        const t = r();
        if (!t)
            return x;
        const n = t.type.__cssModules;
        if (!n)
            return x;
        const s = n[e];
        return s || x
    }
}
function ae(e) {
    const t = r();
    if (!t)
        return;
    const n = t.ut = (n=e(t.proxy)) => {
            Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e => ce(e, n)))
        }
        , a = () => {
            const r = e(t.proxy);
            le(t.subTree, r),
                n(r)
        }
    ;
    s(a),
        o(( () => {
                const e = new MutationObserver(a);
                e.observe(t.subTree.el.parentNode, {
                    childList: !0
                }),
                    i(( () => e.disconnect()))
            }
        ))
}
function le(e, t) {
    if (128 & e.shapeFlag) {
        const n = e.suspense;
        e = n.activeBranch,
        n.pendingBranch && !n.isHydrating && n.effects.push(( () => {
                le(n.activeBranch, t)
            }
        ))
    }
    for (; e.component; )
        e = e.component.subTree;
    if (1 & e.shapeFlag && e.el)
        ce(e.el, t);
    else if (e.type === u)
        e.children.forEach((e => le(e, t)));
    else if (e.type === p) {
        let {el: n, anchor: r} = e;
        for (; n && (ce(n, t),
        n !== r); )
            n = n.nextSibling
    }
}
function ce(e, t) {
    if (1 === e.nodeType) {
        const n = e.style;
        for (const e in t)
            n.setProperty(`--${e}`, t[e])
    }
}
const ue = "transition"
    , pe = "animation"
    , fe = (e, {slots: t}) => a(l, ge(e), t);
fe.displayName = "Transition";
const de = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: !0
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
}
    , me = fe.props = T({}, c, de)
    , he = (e, t=[]) => {
    S(e) ? e.forEach((e => e(...t))) : e && e(...t)
}
    , ve = e => !!e && (S(e) ? e.some((e => e.length > 1)) : e.length > 1);
function ge(e) {
    const t = {};
    for (const n in e)
        n in de || (t[n] = e[n]);
    if (!1 === e.css)
        return t;
    const {name: n="v", type: r, duration: s, enterFromClass: o=`${n}-enter-from`, enterActiveClass: i=`${n}-enter-active`, enterToClass: a=`${n}-enter-to`, appearFromClass: l=o, appearActiveClass: c=i, appearToClass: u=a, leaveFromClass: p=`${n}-leave-from`, leaveActiveClass: f=`${n}-leave-active`, leaveToClass: d=`${n}-leave-to`} = e
        , m = function(e) {
            if (null == e)
                return null;
            if (P(e))
                return [_e(e.enter), _e(e.leave)];
            {
                const t = _e(e);
                return [t, t]
            }
        }(s)
        , h = m && m[0]
        , v = m && m[1]
        , {onBeforeEnter: g, onEnter: _, onEnterCancelled: b, onLeave: y, onLeaveCancelled: C, onBeforeAppear: S=g, onAppear: E=_, onAppearCancelled: A=b} = t
        , w = (e, t, n) => {
            ye(e, t ? u : a),
                ye(e, t ? c : i),
            n && n()
        }
        , x = (e, t) => {
            e._isLeaving = !1,
                ye(e, p),
                ye(e, d),
                ye(e, f),
            t && t()
        }
        , k = e => (t, n) => {
            const s = e ? E : _
                , i = () => w(t, e, n);
            he(s, [t, i]),
                Ce(( () => {
                        ye(t, e ? l : o),
                            be(t, e ? u : a),
                        ve(s) || Ee(t, r, h, i)
                    }
                ))
        }
    ;
    return T(t, {
        onBeforeEnter(e) {
            he(g, [e]),
                be(e, o),
                be(e, i)
        },
        onBeforeAppear(e) {
            he(S, [e]),
                be(e, l),
                be(e, c)
        },
        onEnter: k(!1),
        onAppear: k(!0),
        onLeave(e, t) {
            e._isLeaving = !0;
            const n = () => x(e, t);
            be(e, p),
                xe(),
                be(e, f),
                Ce(( () => {
                        e._isLeaving && (ye(e, p),
                            be(e, d),
                        ve(y) || Ee(e, r, v, n))
                    }
                )),
                he(y, [e, n])
        },
        onEnterCancelled(e) {
            w(e, !1),
                he(b, [e])
        },
        onAppearCancelled(e) {
            w(e, !0),
                he(A, [e])
        },
        onLeaveCancelled(e) {
            x(e),
                he(C, [e])
        }
    })
}
function _e(e) {
    return A(e)
}
function be(e, t) {
    t.split(/\s+/).forEach((t => t && e.classList.add(t))),
        (e._vtc || (e._vtc = new Set)).add(t)
}
function ye(e, t) {
    t.split(/\s+/).forEach((t => t && e.classList.remove(t)));
    const {_vtc: n} = e;
    n && (n.delete(t),
    n.size || (e._vtc = void 0))
}
function Ce(e) {
    requestAnimationFrame(( () => {
            requestAnimationFrame(e)
        }
    ))
}
let Se = 0;
function Ee(e, t, n, r) {
    const s = e._endId = ++Se
        , o = () => {
            s === e._endId && r()
        }
    ;
    if (n)
        return setTimeout(o, n);
    const {type: i, timeout: a, propCount: l} = Ae(e, t);
    if (!i)
        return r();
    const c = i + "end";
    let u = 0;
    const p = () => {
            e.removeEventListener(c, f),
                o()
        }
        , f = t => {
            t.target === e && ++u >= l && p()
        }
    ;
    setTimeout(( () => {
            u < l && p()
        }
    ), a + 1),
        e.addEventListener(c, f)
}
function Ae(e, t) {
    const n = window.getComputedStyle(e)
        , r = e => (n[e] || "").split(", ")
        , s = r(`${ue}Delay`)
        , o = r(`${ue}Duration`)
        , i = we(s, o)
        , a = r(`${pe}Delay`)
        , l = r(`${pe}Duration`)
        , c = we(a, l);
    let u = null
        , p = 0
        , f = 0;
    t === ue ? i > 0 && (u = ue,
        p = i,
        f = o.length) : t === pe ? c > 0 && (u = pe,
        p = c,
        f = l.length) : (p = Math.max(i, c),
        u = p > 0 ? i > c ? ue : pe : null,
        f = u ? u === ue ? o.length : l.length : 0);
    return {
        type: u,
        timeout: p,
        propCount: f,
        hasTransform: u === ue && /\b(transform|all)(,|$)/.test(r(`${ue}Property`).toString())
    }
}
function we(e, t) {
    for (; e.length < t.length; )
        e = e.concat(e);
    return Math.max(...t.map(( (t, n) => Te(t) + Te(e[n]))))
}
function Te(e) {
    return 1e3 * Number(e.slice(0, -1).replace(",", "."))
}
function xe() {
    return document.body.offsetHeight
}
const Pe = new WeakMap
    , ke = new WeakMap
    , Le = {
    name: "TransitionGroup",
    props: T({}, me, {
        tag: String,
        moveClass: String
    }),
    setup(e, {slots: t}) {
        const s = r()
            , o = f();
        let i, a;
        return d(( () => {
                if (!i.length)
                    return;
                const t = e.moveClass || `${e.name || "v"}-move`;
                if (!function(e, t, n) {
                    const r = e.cloneNode();
                    e._vtc && e._vtc.forEach((e => {
                            e.split(/\s+/).forEach((e => e && r.classList.remove(e)))
                        }
                    ));
                    n.split(/\s+/).forEach((e => e && r.classList.add(e))),
                        r.style.display = "none";
                    const s = 1 === t.nodeType ? t : t.parentNode;
                    s.appendChild(r);
                    const {hasTransform: o} = Ae(r);
                    return s.removeChild(r),
                        o
                }(i[0].el, s.vnode.el, t))
                    return;
                i.forEach($e),
                    i.forEach(Re);
                const n = i.filter(Me);
                xe(),
                    n.forEach((e => {
                            const n = e.el
                                , r = n.style;
                            be(n, t),
                                r.transform = r.webkitTransform = r.transitionDuration = "";
                            const s = n._moveCb = e => {
                                    e && e.target !== n || e && !/transform$/.test(e.propertyName) || (n.removeEventListener("transitionend", s),
                                        n._moveCb = null,
                                        ye(n, t))
                                }
                            ;
                            n.addEventListener("transitionend", s)
                        }
                    ))
            }
        )),
            () => {
                const r = m(e)
                    , l = ge(r);
                let c = r.tag || u;
                i = a,
                    a = t.default ? h(t.default()) : [];
                for (let e = 0; e < a.length; e++) {
                    const t = a[e];
                    null != t.key && v(t, g(t, l, o, s))
                }
                if (i)
                    for (let e = 0; e < i.length; e++) {
                        const t = i[e];
                        v(t, g(t, l, o, s)),
                            Pe.set(t, t.el.getBoundingClientRect())
                    }
                return n(c, null, a)
            }
    }
}
    , Ne = Le;
function $e(e) {
    const t = e.el;
    t._moveCb && t._moveCb(),
    t._enterCb && t._enterCb()
}
function Re(e) {
    ke.set(e, e.el.getBoundingClientRect())
}
function Me(e) {
    const t = Pe.get(e)
        , n = ke.get(e)
        , r = t.left - n.left
        , s = t.top - n.top;
    if (r || s) {
        const t = e.el.style;
        return t.transform = t.webkitTransform = `translate(${r}px,${s}px)`,
            t.transitionDuration = "0s",
            e
    }
}
const Ve = e => {
        const t = e.props["onUpdate:modelValue"] || !1;
        return S(t) ? e => V(t, e) : t
    }
;
function Be(e) {
    e.target.composing = !0
}
function De(e) {
    const t = e.target;
    t.composing && (t.composing = !1,
        t.dispatchEvent(new Event("input")))
}
const Ie = {
    created(e, {modifiers: {lazy: t, trim: n, number: r}}, s) {
        e._assign = Ve(s);
        const o = r || s.props && "number" === s.props.type;
        X(e, t ? "change" : "input", (t => {
                if (t.target.composing)
                    return;
                let r = e.value;
                n && (r = r.trim()),
                o && (r = k(r)),
                    e._assign(r)
            }
        )),
        n && X(e, "change", ( () => {
                e.value = e.value.trim()
            }
        )),
        t || (X(e, "compositionstart", Be),
            X(e, "compositionend", De),
            X(e, "change", De))
    },
    mounted(e, {value: t}) {
        e.value = null == t ? "" : t
    },
    beforeUpdate(e, {value: t, modifiers: {lazy: n, trim: r, number: s}}, o) {
        if (e._assign = Ve(o),
            e.composing)
            return;
        if (document.activeElement === e && "range" !== e.type) {
            if (n)
                return;
            if (r && e.value.trim() === t)
                return;
            if ((s || "number" === e.type) && k(e.value) === t)
                return
        }
        const i = null == t ? "" : t;
        e.value !== i && (e.value = i)
    }
}
    , Oe = {
    deep: !0,
    created(e, t, n) {
        e._assign = Ve(n),
            X(e, "change", ( () => {
                    const t = e._modelValue
                        , n = qe(e)
                        , r = e.checked
                        , s = e._assign;
                    if (S(t)) {
                        const e = L(t, n)
                            , o = -1 !== e;
                        if (r && !o)
                            s(t.concat(n));
                        else if (!r && o) {
                            const n = [...t];
                            n.splice(e, 1),
                                s(n)
                        }
                    } else if (N(t)) {
                        const e = new Set(t);
                        r ? e.add(n) : e.delete(n),
                            s(e)
                    } else
                        s(ze(e, r))
                }
            ))
    },
    mounted: Fe,
    beforeUpdate(e, t, n) {
        e._assign = Ve(n),
            Fe(e, t, n)
    }
};
function Fe(e, {value: t, oldValue: n}, r) {
    e._modelValue = t,
        S(t) ? e.checked = L(t, r.props.value) > -1 : N(t) ? e.checked = t.has(r.props.value) : t !== n && (e.checked = $(t, ze(e, !0)))
}
const Ue = {
    created(e, {value: t}, n) {
        e.checked = $(t, n.props.value),
            e._assign = Ve(n),
            X(e, "change", ( () => {
                    e._assign(qe(e))
                }
            ))
    },
    beforeUpdate(e, {value: t, oldValue: n}, r) {
        e._assign = Ve(r),
        t !== n && (e.checked = $(t, r.props.value))
    }
}
    , He = {
    deep: !0,
    created(e, {value: t, modifiers: {number: n}}, r) {
        const s = N(t);
        X(e, "change", ( () => {
                const t = Array.prototype.filter.call(e.options, (e => e.selected)).map((e => n ? k(qe(e)) : qe(e)));
                e._assign(e.multiple ? s ? new Set(t) : t : t[0])
            }
        )),
            e._assign = Ve(r)
    },
    mounted(e, {value: t}) {
        je(e, t)
    },
    beforeUpdate(e, t, n) {
        e._assign = Ve(n)
    },
    updated(e, {value: t}) {
        je(e, t)
    }
};
function je(e, t) {
    const n = e.multiple;
    if (!n || S(t) || N(t)) {
        for (let r = 0, s = e.options.length; r < s; r++) {
            const s = e.options[r]
                , o = qe(s);
            if (n)
                S(t) ? s.selected = L(t, o) > -1 : s.selected = t.has(o);
            else if ($(qe(s), t))
                return void (e.selectedIndex !== r && (e.selectedIndex = r))
        }
        n || -1 === e.selectedIndex || (e.selectedIndex = -1)
    }
}
function qe(e) {
    return "_value"in e ? e._value : e.value
}
function ze(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t
}
const Ke = {
    created(e, t, n) {
        Ge(e, t, n, null, "created")
    },
    mounted(e, t, n) {
        Ge(e, t, n, null, "mounted")
    },
    beforeUpdate(e, t, n, r) {
        Ge(e, t, n, r, "beforeUpdate")
    },
    updated(e, t, n, r) {
        Ge(e, t, n, r, "updated")
    }
};
function We(e, t) {
    switch (e) {
        case "SELECT":
            return He;
        case "TEXTAREA":
            return Ie;
        default:
            switch (t) {
                case "checkbox":
                    return Oe;
                case "radio":
                    return Ue;
                default:
                    return Ie
            }
    }
}
function Ge(e, t, n, r, s) {
    const o = We(e.tagName, n.props && n.props.type)[s];
    o && o(e, t, n, r)
}
const Xe = ["ctrl", "shift", "alt", "meta"]
    , Je = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => "button"in e && 0 !== e.button,
    middle: e => "button"in e && 1 !== e.button,
    right: e => "button"in e && 2 !== e.button,
    exact: (e, t) => Xe.some((n => e[`${n}Key`] && !t.includes(n)))
}
    , Qe = (e, t) => (n, ...r) => {
    for (let e = 0; e < t.length; e++) {
        const r = Je[t[e]];
        if (r && r(n, t))
            return
    }
    return e(n, ...r)
}
    , Ye = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
}
    , Ze = (e, t) => n => {
    if (!("key"in n))
        return;
    const r = w(n.key);
    return t.some((e => e === r || Ye[e] === r)) ? e(n) : void 0
}
    , et = {
    beforeMount(e, {value: t}, {transition: n}) {
        e._vod = "none" === e.style.display ? "" : e.style.display,
            n && t ? n.beforeEnter(e) : tt(e, t)
    },
    mounted(e, {value: t}, {transition: n}) {
        n && t && n.enter(e)
    },
    updated(e, {value: t, oldValue: n}, {transition: r}) {
        !t != !n && (r ? t ? (r.beforeEnter(e),
            tt(e, !0),
            r.enter(e)) : r.leave(e, ( () => {
                tt(e, !1)
            }
        )) : tt(e, t))
    },
    beforeUnmount(e, {value: t}) {
        tt(e, t)
    }
};
function tt(e, t) {
    e.style.display = t ? e._vod : "none"
}
const nt = T({
    patchProp: (e, t, n, r, s=!1, o, i, a, l) => {
        "class" === t ? function(e, t, n) {
            const r = e._vtc;
            r && (t = (t ? [t, ...r] : [...r]).join(" ")),
                null == t ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
        }(e, r, s) : "style" === t ? function(e, t, n) {
            const r = e.style
                , s = M(n);
            if (n && !s) {
                if (t && !M(t))
                    for (const e in t)
                        null == n[e] && z(r, e, "");
                for (const e in n)
                    z(r, e, n[e])
            } else {
                const o = r.display;
                s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
                "_vod"in e && (r.display = o)
            }
        }(e, n, r) : B(t) ? D(t) || J(e, t, 0, r, i) : ("." === t[0] ? (t = t.slice(1),
            1) : "^" === t[0] ? (t = t.slice(1),
            0) : function(e, t, n, r) {
            if (r)
                return "innerHTML" === t || "textContent" === t || !!(t in e && te.test(t) && R(n));
            if ("spellcheck" === t || "draggable" === t || "translate" === t)
                return !1;
            if ("form" === t)
                return !1;
            if ("list" === t && "INPUT" === e.tagName)
                return !1;
            if ("type" === t && "TEXTAREA" === e.tagName)
                return !1;
            if (te.test(t) && M(n))
                return !1;
            return t in e
        }(e, t, r, s)) ? function(e, t, n, r, s, o, i) {
            if ("innerHTML" === t || "textContent" === t)
                return r && i(r, s, o),
                    void (e[t] = null == n ? "" : n);
            const a = e.tagName;
            if ("value" === t && "PROGRESS" !== a && !a.includes("-")) {
                e._value = n;
                const r = null == n ? "" : n;
                return ("OPTION" === a ? e.getAttribute("value") : e.value) !== r && (e.value = r),
                    void (null == n && e.removeAttribute(t))
            }
            let l = !1;
            if ("" === n || null == n) {
                const r = typeof e[t];
                "boolean" === r ? n = F(n) : null == n && "string" === r ? (n = "",
                    l = !0) : "number" === r && (n = 0,
                    l = !0)
            }
            try {
                e[t] = n
            } catch (e) {}
            l && e.removeAttribute(t)
        }(e, t, r, o, i, a, l) : ("true-value" === t ? e._trueValue = r : "false-value" === t && (e._falseValue = r),
            function(e, t, n, r) {
                if (r && t.startsWith("xlink:"))
                    null == n ? e.removeAttributeNS(G, t.slice(6, t.length)) : e.setAttributeNS(G, t, n);
                else {
                    const r = O(t);
                    null == n || r && !F(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n)
                }
            }(e, t, r, s))
    }
}, j);
let rt, st = !1;
function ot() {
    return rt || (rt = _(nt))
}
function it() {
    return rt = st ? rt : b(nt),
        st = !0,
        rt
}
const at = (...e) => {
        ot().render(...e)
    }
    , lt = (...e) => {
        it().hydrate(...e)
    }
    , ct = (...e) => {
        const t = ot().createApp(...e)
            , {mount: n} = t;
        return t.mount = e => {
            const r = pt(e);
            if (!r)
                return;
            const s = t._component;
            R(s) || s.render || s.template || (s.template = r.innerHTML),
                r.innerHTML = "";
            const o = n(r, !1, r instanceof SVGElement);
            return r instanceof Element && (r.removeAttribute("v-cloak"),
                r.setAttribute("data-v-app", "")),
                o
        }
            ,
            t
    }
    , ut = (...e) => {
        const t = it().createApp(...e)
            , {mount: n} = t;
        return t.mount = e => {
            const t = pt(e);
            if (t)
                return n(t, !0, t instanceof SVGElement)
        }
            ,
            t
    }
;
function pt(e) {
    if (M(e)) {
        return document.querySelector(e)
    }
    return e
}
let ft = !1;
const dt = () => {
        ft || (ft = !0,
                Ie.getSSRProps = ({value: e}) => ({
                    value: e
                }),
                Ue.getSSRProps = ({value: e}, t) => {
                    if (t.props && $(t.props.value, e))
                        return {
                            checked: !0
                        }
                }
                ,
                Oe.getSSRProps = ({value: e}, t) => {
                    if (S(e)) {
                        if (t.props && L(e, t.props.value) > -1)
                            return {
                                checked: !0
                            }
                    } else if (N(e)) {
                        if (t.props && e.has(t.props.value))
                            return {
                                checked: !0
                            }
                    } else if (e)
                        return {
                            checked: !0
                        }
                }
                ,
                Ke.getSSRProps = (e, t) => {
                    if ("string" != typeof t.type)
                        return;
                    const n = We(t.type.toUpperCase(), t.props && t.props.type);
                    return n.getSSRProps ? n.getSSRProps(e, t) : void 0
                }
                ,
                et.getSSRProps = ({value: e}) => {
                    if (!e)
                        return {
                            style: {
                                display: "none"
                            }
                        }
                }
        )
    }
;
export {fe as Transition, Ne as TransitionGroup, oe as VueElement, ct as createApp, ut as createSSRApp, ne as defineCustomElement, re as defineSSRCustomElement, lt as hydrate, dt as initDirectivesForSSR, at as render, ie as useCssModule, ae as useCssVars, Oe as vModelCheckbox, Ke as vModelDynamic, Ue as vModelRadio, He as vModelSelect, Ie as vModelText, et as vShow, Ze as withKeys, Qe as withModifiers};
export default null;
//# sourceMappingURL=/sm/fe28d868c8f0f4e8086103047be67c585ce0c49a7f2b9f3635f49d23a4cdcc4d.map
