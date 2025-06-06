/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/vue-i18n@11.1.5/dist/vue-i18n.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import {registerMessageCompiler as e, compile as t, registerMessageResolver as a, resolveValue as n, registerLocaleFallbacker as l, fallbackWithLocaleChain as o, setDevToolsHook as s, CORE_ERROR_CODES_EXTEND_POINT as r, createCompileError as i, DEFAULT_LOCALE as c, updateFallbackLocale as _, NUMBER_FORMAT_OPTIONS_KEYS as u, DATETIME_FORMAT_OPTIONS_KEYS as m, setFallbackContext as f, createCoreContext as p, clearDateTimeFormat as g, clearNumberFormat as d, isMessageAST as b, AST_NODE_PROPS_KEYS as v, setAdditionalMeta as E, getFallbackContext as L, NOT_REOSLVED as h, parseTranslateArgs as I, translate as y, MISSING_RESOLVE_VALUE as k, parseDateTimeArgs as T, datetime as F, parseNumberArgs as O, number as N, isMessageFunction as R} from "./@intlify/core-base.js";
import {makeSymbol as P, assign as D, isNumber as U, create as V, isString as S, isObject as M, isEmptyObject as $, createEmitter as W, getGlobalThis as C, isBoolean as A, isArray as w, isPlainObject as x, isRegExp as H, isFunction as j, inBrowser as Y, deepCopy as G, hasOwn as X} from "./@intlify/shared.js";
import {defineComponent as B, h as z, getCurrentInstance as J, inject as q, onMounted as Q, onUnmounted as K, computed as Z, watch as ee, Fragment as te, effectScope as ae, ref as ne, shallowRef as le, isRef as oe, createVNode as se, Text as re} from "./vue.js";
import {setupDevtoolsPlugin as ie} from "./@vue/devtools-api.js";
/*!
  * vue-i18n v11.1.5
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const ce = "11.1.5";
const _e = {
    UNEXPECTED_RETURN_TYPE: r,
    INVALID_ARGUMENT: 25,
    MUST_BE_CALL_SETUP_TOP: 26,
    NOT_INSTALLED: 27,
    REQUIRED_VALUE: 28,
    INVALID_VALUE: 29,
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
    NOT_INSTALLED_WITH_PROVIDE: 31,
    UNEXPECTED_ERROR: 32,
    NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function ue(e, ...t) {
    return i(e, null, void 0)
}
const me = P("__translateVNode")
    , fe = P("__datetimeParts")
    , pe = P("__numberParts")
    , ge = P("__enableEmitter")
    , de = P("__disableEmitter")
    , be = P("__setPluralRules");
P("__intlifyMeta");
const ve = P("__injectWithOption")
    , Ee = P("__dispose");
function Le(e) {
    if (!M(e))
        return e;
    if (b(e))
        return e;
    for (const t in e)
        if (X(e, t))
            if (t.includes(".")) {
                const a = t.split(".")
                    , n = a.length - 1;
                let l = e
                    , o = !1;
                for (let e = 0; e < n; e++) {
                    if ("__proto__" === a[e])
                        throw new Error(`unsafe key: ${a[e]}`);
                    if (a[e]in l || (l[a[e]] = V()),
                        !M(l[a[e]])) {
                        o = !0;
                        break
                    }
                    l = l[a[e]]
                }
                if (o || (b(l) ? v.includes(a[n]) || delete e[t] : (l[a[n]] = e[t],
                    delete e[t])),
                    !b(l)) {
                    const e = l[a[n]];
                    M(e) && Le(e)
                }
            } else
                M(e[t]) && Le(e[t]);
    return e
}
function he(e, t) {
    const {messages: a, __i18n: n, messageResolver: l, flatJson: o} = t
        , s = x(a) ? a : w(n) ? V() : {
        [e]: V()
    };
    if (w(n) && n.forEach((e => {
            if ("locale"in e && "resource"in e) {
                const {locale: t, resource: a} = e;
                t ? (s[t] = s[t] || V(),
                    G(a, s[t])) : G(a, s)
            } else
                S(e) && G(JSON.parse(e), s)
        }
    )),
    null == l && o)
        for (const e in s)
            X(s, e) && Le(s[e]);
    return s
}
function Ie(e) {
    return e.type
}
function ye(e, t, a) {
    let n = M(t.messages) ? t.messages : V();
    "__i18nGlobal"in a && (n = he(e.locale.value, {
        messages: n,
        __i18n: a.__i18nGlobal
    }));
    const l = Object.keys(n);
    if (l.length && l.forEach((t => {
            e.mergeLocaleMessage(t, n[t])
        }
    )),
        M(t.datetimeFormats)) {
        const a = Object.keys(t.datetimeFormats);
        a.length && a.forEach((a => {
                e.mergeDateTimeFormat(a, t.datetimeFormats[a])
            }
        ))
    }
    if (M(t.numberFormats)) {
        const a = Object.keys(t.numberFormats);
        a.length && a.forEach((a => {
                e.mergeNumberFormat(a, t.numberFormats[a])
            }
        ))
    }
}
function ke(e) {
    return se(re, null, e, 0)
}
const Te = "__INTLIFY_META__"
    , Fe = () => []
    , Oe = () => !1;
let Ne = 0;
function Re(e) {
    return (t, a, n, l) => e(a, n, J() || void 0, l)
}
function Pe(e={}) {
    const {__root: t, __injectWithOption: a} = e
        , n = void 0 === t
        , l = e.flatJson
        , s = Y ? ne : le;
    let r = !A(e.inheritLocale) || e.inheritLocale;
    const i = s(t && r ? t.locale.value : S(e.locale) ? e.locale : c)
        , u = s(t && r ? t.fallbackLocale.value : S(e.fallbackLocale) || w(e.fallbackLocale) || x(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : i.value)
        , m = s(he(i.value, e))
        , v = s(x(e.datetimeFormats) ? e.datetimeFormats : {
        [i.value]: {}
    })
        , P = s(x(e.numberFormats) ? e.numberFormats : {
        [i.value]: {}
    });
    let V = t ? t.missingWarn : !A(e.missingWarn) && !H(e.missingWarn) || e.missingWarn
        , $ = t ? t.fallbackWarn : !A(e.fallbackWarn) && !H(e.fallbackWarn) || e.fallbackWarn
        , W = t ? t.fallbackRoot : !A(e.fallbackRoot) || e.fallbackRoot
        , C = !!e.fallbackFormat
        , B = j(e.missing) ? e.missing : null
        , z = j(e.missing) ? Re(e.missing) : null
        , q = j(e.postTranslation) ? e.postTranslation : null
        , Q = t ? t.warnHtmlMessage : !A(e.warnHtmlMessage) || e.warnHtmlMessage
        , K = !!e.escapeParameter;
    const te = t ? t.modifiers : x(e.modifiers) ? e.modifiers : {};
    let ae, oe = e.pluralRules || t && t.pluralRules;
    ae = ( () => {
            n && f(null);
            const t = {
                version: ce,
                locale: i.value,
                fallbackLocale: u.value,
                messages: m.value,
                modifiers: te,
                pluralRules: oe,
                missing: null === z ? void 0 : z,
                missingWarn: V,
                fallbackWarn: $,
                fallbackFormat: C,
                unresolving: !0,
                postTranslation: null === q ? void 0 : q,
                warnHtmlMessage: Q,
                escapeParameter: K,
                messageResolver: e.messageResolver,
                messageCompiler: e.messageCompiler,
                __meta: {
                    framework: "vue"
                }
            };
            t.datetimeFormats = v.value,
                t.numberFormats = P.value,
                t.__datetimeFormatters = x(ae) ? ae.__datetimeFormatters : void 0,
                t.__numberFormatters = x(ae) ? ae.__numberFormatters : void 0;
            const a = p(t);
            return n && f(a),
                a
        }
    )(),
        _(ae, i.value, u.value);
    const se = Z({
        get: () => i.value,
        set: e => {
            ae.locale = e,
                i.value = e
        }
    })
        , re = Z({
        get: () => u.value,
        set: e => {
            ae.fallbackLocale = e,
                u.value = e,
                _(ae, i.value, e)
        }
    })
        , ie = Z(( () => m.value))
        , ge = Z(( () => v.value))
        , de = Z(( () => P.value));
    const Ee = (e, a, l, o, s, r) => {
            let c;
            i.value,
                u.value,
                m.value,
                v.value,
                P.value;
            try {
                __INTLIFY_PROD_DEVTOOLS__ && E(( () => {
                        const e = J();
                        let t = null;
                        return e && (t = Ie(e)[Te]) ? {
                            [Te]: t
                        } : null
                    }
                )()),
                n || (ae.fallbackContext = t ? L() : void 0),
                    c = e(ae)
            } finally {
                __INTLIFY_PROD_DEVTOOLS__ && E(null),
                n || (ae.fallbackContext = void 0)
            }
            if ("translate exists" !== l && U(c) && c === h || "translate exists" === l && !c) {
                const [e,n] = a();
                return t && W ? o(t) : s(e)
            }
            if (r(c))
                return c;
            throw ue(_e.UNEXPECTED_RETURN_TYPE)
        }
    ;
    function ye(...e) {
        return Ee((t => Reflect.apply(y, null, [t, ...e])), ( () => I(...e)), "translate", (t => Reflect.apply(t.t, t, [...e])), (e => e), (e => S(e)))
    }
    const Pe = {
        normalize: function(e) {
            return e.map((e => S(e) || U(e) || A(e) ? ke(String(e)) : e))
        },
        interpolate: e => e,
        type: "vnode"
    };
    function De(e) {
        return m.value[e] || {}
    }
    Ne++,
    t && Y && (ee(t.locale, (e => {
            r && (i.value = e,
                ae.locale = e,
                _(ae, i.value, u.value))
        }
    )),
        ee(t.fallbackLocale, (e => {
                r && (u.value = e,
                    ae.fallbackLocale = e,
                    _(ae, i.value, u.value))
            }
        )));
    const Ue = {
        id: Ne,
        locale: se,
        fallbackLocale: re,
        get inheritLocale() {
            return r
        },
        set inheritLocale(e) {
            r = e,
            e && t && (i.value = t.locale.value,
                u.value = t.fallbackLocale.value,
                _(ae, i.value, u.value))
        },
        get availableLocales() {
            return Object.keys(m.value).sort()
        },
        messages: ie,
        get modifiers() {
            return te
        },
        get pluralRules() {
            return oe || {}
        },
        get isGlobal() {
            return n
        },
        get missingWarn() {
            return V
        },
        set missingWarn(e) {
            V = e,
                ae.missingWarn = V
        },
        get fallbackWarn() {
            return $
        },
        set fallbackWarn(e) {
            $ = e,
                ae.fallbackWarn = $
        },
        get fallbackRoot() {
            return W
        },
        set fallbackRoot(e) {
            W = e
        },
        get fallbackFormat() {
            return C
        },
        set fallbackFormat(e) {
            C = e,
                ae.fallbackFormat = C
        },
        get warnHtmlMessage() {
            return Q
        },
        set warnHtmlMessage(e) {
            Q = e,
                ae.warnHtmlMessage = e
        },
        get escapeParameter() {
            return K
        },
        set escapeParameter(e) {
            K = e,
                ae.escapeParameter = e
        },
        t: ye,
        getLocaleMessage: De,
        setLocaleMessage: function(e, t) {
            if (l) {
                const a = {
                    [e]: t
                };
                for (const e in a)
                    X(a, e) && Le(a[e]);
                t = a[e]
            }
            m.value[e] = t,
                ae.messages = m.value
        },
        mergeLocaleMessage: function(e, t) {
            m.value[e] = m.value[e] || {};
            const a = {
                [e]: t
            };
            if (l)
                for (const e in a)
                    X(a, e) && Le(a[e]);
            G(t = a[e], m.value[e]),
                ae.messages = m.value
        },
        getPostTranslationHandler: function() {
            return j(q) ? q : null
        },
        setPostTranslationHandler: function(e) {
            q = e,
                ae.postTranslation = e
        },
        getMissingHandler: function() {
            return B
        },
        setMissingHandler: function(e) {
            null !== e && (z = Re(e)),
                B = e,
                ae.missing = z
        },
        [be]: function(e) {
            oe = e,
                ae.pluralRules = oe
        }
    };
    return Ue.datetimeFormats = ge,
        Ue.numberFormats = de,
        Ue.rt = function(...e) {
            const [t,a,n] = e;
            if (n && !M(n))
                throw ue(_e.INVALID_ARGUMENT);
            return ye(t, a, D({
                resolvedMessage: !0
            }, n || {}))
        }
        ,
        Ue.te = function(e, t) {
            return Ee(( () => {
                    if (!e)
                        return !1;
                    const a = De(S(t) ? t : i.value)
                        , n = ae.messageResolver(a, e);
                    return b(n) || R(n) || S(n)
                }
            ), ( () => [e]), "translate exists", (a => Reflect.apply(a.te, a, [e, t])), Oe, (e => A(e)))
        }
        ,
        Ue.tm = function(e) {
            const a = function(e) {
                let t = null;
                const a = o(ae, u.value, i.value);
                for (let n = 0; n < a.length; n++) {
                    const l = m.value[a[n]] || {}
                        , o = ae.messageResolver(l, e);
                    if (null != o) {
                        t = o;
                        break
                    }
                }
                return t
            }(e);
            return null != a ? a : t && t.tm(e) || {}
        }
        ,
        Ue.d = function(...e) {
            return Ee((t => Reflect.apply(F, null, [t, ...e])), ( () => T(...e)), "datetime format", (t => Reflect.apply(t.d, t, [...e])), ( () => k), (e => S(e) || w(e)))
        }
        ,
        Ue.n = function(...e) {
            return Ee((t => Reflect.apply(N, null, [t, ...e])), ( () => O(...e)), "number format", (t => Reflect.apply(t.n, t, [...e])), ( () => k), (e => S(e) || w(e)))
        }
        ,
        Ue.getDateTimeFormat = function(e) {
            return v.value[e] || {}
        }
        ,
        Ue.setDateTimeFormat = function(e, t) {
            v.value[e] = t,
                ae.datetimeFormats = v.value,
                g(ae, e, t)
        }
        ,
        Ue.mergeDateTimeFormat = function(e, t) {
            v.value[e] = D(v.value[e] || {}, t),
                ae.datetimeFormats = v.value,
                g(ae, e, t)
        }
        ,
        Ue.getNumberFormat = function(e) {
            return P.value[e] || {}
        }
        ,
        Ue.setNumberFormat = function(e, t) {
            P.value[e] = t,
                ae.numberFormats = P.value,
                d(ae, e, t)
        }
        ,
        Ue.mergeNumberFormat = function(e, t) {
            P.value[e] = D(P.value[e] || {}, t),
                ae.numberFormats = P.value,
                d(ae, e, t)
        }
        ,
        Ue[ve] = a,
        Ue[me] = function(...e) {
            return Ee((t => {
                    let a;
                    const n = t;
                    try {
                        n.processor = Pe,
                            a = Reflect.apply(y, null, [n, ...e])
                    } finally {
                        n.processor = null
                    }
                    return a
                }
            ), ( () => I(...e)), "translate", (t => t[me](...e)), (e => [ke(e)]), (e => w(e)))
        }
        ,
        Ue[fe] = function(...e) {
            return Ee((t => Reflect.apply(F, null, [t, ...e])), ( () => T(...e)), "datetime format", (t => t[fe](...e)), Fe, (e => S(e) || w(e)))
        }
        ,
        Ue[pe] = function(...e) {
            return Ee((t => Reflect.apply(N, null, [t, ...e])), ( () => O(...e)), "number format", (t => t[pe](...e)), Fe, (e => S(e) || w(e)))
        }
        ,
        Ue
}
const De = "vue-i18n: composer properties"
    , Ue = "Vue I18n DevTools"
    , Ve = "Vue I18n DevTools"
    , Se = "Vue I18n"
    , Me = "Search for scopes ..."
    , $e = 16764185;
let We;
async function Ce(e, t) {
    return new Promise(( (a, n) => {
            try {
                ie({
                    id: "vue-devtools-plugin-vue-i18n",
                    label: Ue,
                    packageName: "vue-i18n",
                    homepage: "https://vue-i18n.intlify.dev",
                    logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
                    componentStateTypes: [De],
                    app: e
                }, (n => {
                        We = n,
                            n.on.visitComponentTree(( ({componentInstance: e, treeNode: a}) => {
                                    !function(e, t, a) {
                                        const n = "composition" === a.mode ? a.global : a.global.__composer;
                                        if (e && e.vnode.el && e.vnode.el.__VUE_I18N__ && e.vnode.el.__VUE_I18N__ !== n) {
                                            const a = {
                                                label: `i18n (${Ae(e)} Scope)`,
                                                textColor: 0,
                                                backgroundColor: 16764185
                                            };
                                            t.tags.push(a)
                                        }
                                    }(e, a, t)
                                }
                            )),
                            n.on.inspectComponent(( ({componentInstance: e, instanceData: a}) => {
                                    e.vnode.el && e.vnode.el.__VUE_I18N__ && a && ("legacy" === t.mode ? e.vnode.el.__VUE_I18N__ !== t.global.__composer && we(a, e.vnode.el.__VUE_I18N__) : we(a, e.vnode.el.__VUE_I18N__))
                                }
                            )),
                            n.addInspector({
                                id: "vue-i18n-resource-inspector",
                                label: Ve,
                                icon: "language",
                                treeFilterPlaceholder: Me
                            }),
                            n.on.getInspectorTree((a => {
                                    a.app === e && "vue-i18n-resource-inspector" === a.inspectorId && function(e, t) {
                                        e.rootNodes.push({
                                            id: "global",
                                            label: "Global Scope"
                                        });
                                        const a = "composition" === t.mode ? t.global : t.global.__composer;
                                        for (const [n,l] of t.__instances) {
                                            const o = "composition" === t.mode ? l : l.__composer;
                                            a !== o && e.rootNodes.push({
                                                id: o.id.toString(),
                                                label: `${Ae(n)} Scope`
                                            })
                                        }
                                    }(a, t)
                                }
                            ));
                        const l = new Map;
                        n.on.getInspectorState((async a => {
                                if (a.app === e && "vue-i18n-resource-inspector" === a.inspectorId)
                                    if (n.unhighlightElement(),
                                        function(e, t) {
                                            const a = Ge(e.nodeId, t);
                                            a && (e.state = function(e) {
                                                const t = {}
                                                    , a = "Locale related info"
                                                    , n = [{
                                                    type: a,
                                                    key: "locale",
                                                    editable: !0,
                                                    value: e.locale.value
                                                }, {
                                                    type: a,
                                                    key: "fallbackLocale",
                                                    editable: !0,
                                                    value: e.fallbackLocale.value
                                                }, {
                                                    type: a,
                                                    key: "availableLocales",
                                                    editable: !1,
                                                    value: e.availableLocales
                                                }, {
                                                    type: a,
                                                    key: "inheritLocale",
                                                    editable: !0,
                                                    value: e.inheritLocale
                                                }];
                                                t[a] = n;
                                                const l = "Locale messages info"
                                                    , o = [{
                                                    type: l,
                                                    key: "messages",
                                                    editable: !1,
                                                    value: xe(e.messages.value)
                                                }];
                                                t[l] = o;
                                                {
                                                    const a = "Datetime formats info"
                                                        , n = [{
                                                        type: a,
                                                        key: "datetimeFormats",
                                                        editable: !1,
                                                        value: e.datetimeFormats.value
                                                    }];
                                                    t[a] = n;
                                                    const l = "Datetime formats info"
                                                        , o = [{
                                                        type: l,
                                                        key: "numberFormats",
                                                        editable: !1,
                                                        value: e.numberFormats.value
                                                    }];
                                                    t[l] = o
                                                }
                                                return t
                                            }(a))
                                        }(a, t),
                                    "global" === a.nodeId) {
                                        if (!l.has(a.app)) {
                                            const [e] = await n.getComponentInstances(a.app);
                                            l.set(a.app, e)
                                        }
                                        n.highlightElement(l.get(a.app))
                                    } else {
                                        const e = function(e, t) {
                                            let a = null;
                                            if ("global" !== e)
                                                for (const [n,l] of t.__instances.entries())
                                                    if (l.id.toString() === e) {
                                                        a = n;
                                                        break
                                                    }
                                            return a
                                        }(a.nodeId, t);
                                        e && n.highlightElement(e)
                                    }
                            }
                        )),
                            n.on.editInspectorState((a => {
                                    a.app === e && "vue-i18n-resource-inspector" === a.inspectorId && function(e, t) {
                                        const a = Ge(e.nodeId, t);
                                        if (a) {
                                            const [t] = e.path;
                                            "locale" === t && S(e.state.value) ? a.locale.value = e.state.value : "fallbackLocale" === t && (S(e.state.value) || w(e.state.value) || M(e.state.value)) ? a.fallbackLocale.value = e.state.value : "inheritLocale" === t && A(e.state.value) && (a.inheritLocale = e.state.value)
                                        }
                                    }(a, t)
                                }
                            )),
                            n.addTimelineLayer({
                                id: "vue-i18n-timeline",
                                label: Se,
                                color: $e
                            }),
                            a(!0)
                    }
                ))
            } catch (e) {
                console.error(e),
                    n(!1)
            }
        }
    ))
}
function Ae(e) {
    return e.type.name || e.type.displayName || e.type.__file || "Anonymous"
}
function we(e, t) {
    const a = De;
    e.state.push({
        type: a,
        key: "locale",
        editable: !0,
        value: t.locale.value
    }),
        e.state.push({
            type: a,
            key: "availableLocales",
            editable: !1,
            value: t.availableLocales
        }),
        e.state.push({
            type: a,
            key: "fallbackLocale",
            editable: !0,
            value: t.fallbackLocale.value
        }),
        e.state.push({
            type: a,
            key: "inheritLocale",
            editable: !0,
            value: t.inheritLocale
        }),
        e.state.push({
            type: a,
            key: "messages",
            editable: !1,
            value: xe(t.messages.value)
        }),
        e.state.push({
            type: a,
            key: "datetimeFormats",
            editable: !1,
            value: t.datetimeFormats.value
        }),
        e.state.push({
            type: a,
            key: "numberFormats",
            editable: !1,
            value: t.numberFormats.value
        })
}
function xe(e) {
    const t = {};
    return Object.keys(e).forEach((a => {
            const n = e[a];
            var l;
            j(n) && "source"in n ? t[a] = {
                _custom: {
                    type: "function",
                    display: "<span>ƒ</span> " + ((l = n).source ? `("${je(l.source)}")` : "(?)")
                }
            } : b(n) && n.loc && n.loc.source ? t[a] = n.loc.source : M(n) ? t[a] = xe(n) : t[a] = n
        }
    )),
        t
}
const He = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "&": "&amp;"
};
function je(e) {
    return e.replace(/[<>"&]/g, Ye)
}
function Ye(e) {
    return He[e] || e
}
function Ge(e, t) {
    if ("global" === e)
        return "composition" === t.mode ? t.global : t.global.__composer;
    {
        const a = Array.from(t.__instances.values()).find((t => t.id.toString() === e));
        return a ? "composition" === t.mode ? a : a.__composer : null
    }
}
function Xe(e, t) {
    if (We) {
        let a;
        t && "groupId"in t && (a = t.groupId,
            delete t.groupId),
            We.addTimelineEvent({
                layerId: "vue-i18n-timeline",
                event: {
                    title: e,
                    groupId: a,
                    time: Date.now(),
                    meta: {},
                    data: t || {},
                    logType: "compile-error" === e ? "error" : "fallback" === e || "missing" === e ? "warning" : "default"
                }
            })
    }
}
function Be(e={}) {
    const t = Pe(function(e) {
        const t = S(e.locale) ? e.locale : c
            , a = S(e.fallbackLocale) || w(e.fallbackLocale) || x(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : t
            , n = j(e.missing) ? e.missing : void 0
            , l = !A(e.silentTranslationWarn) && !H(e.silentTranslationWarn) || !e.silentTranslationWarn
            , o = !A(e.silentFallbackWarn) && !H(e.silentFallbackWarn) || !e.silentFallbackWarn
            , s = !A(e.fallbackRoot) || e.fallbackRoot
            , r = !!e.formatFallbackMessages
            , i = x(e.modifiers) ? e.modifiers : {}
            , _ = e.pluralizationRules
            , u = j(e.postTranslation) ? e.postTranslation : void 0
            , m = !S(e.warnHtmlInMessage) || "off" !== e.warnHtmlInMessage
            , f = !!e.escapeParameterHtml
            , p = !A(e.sync) || e.sync;
        let g = e.messages;
        if (x(e.sharedMessages)) {
            const t = e.sharedMessages;
            g = Object.keys(t).reduce(( (e, a) => {
                    const n = e[a] || (e[a] = {});
                    return D(n, t[a]),
                        e
                }
            ), g || {})
        }
        const {__i18n: d, __root: b, __injectWithOption: v} = e
            , E = e.datetimeFormats
            , L = e.numberFormats;
        return {
            locale: t,
            fallbackLocale: a,
            messages: g,
            flatJson: e.flatJson,
            datetimeFormats: E,
            numberFormats: L,
            missing: n,
            missingWarn: l,
            fallbackWarn: o,
            fallbackRoot: s,
            fallbackFormat: r,
            modifiers: i,
            pluralRules: _,
            postTranslation: u,
            warnHtmlMessage: m,
            escapeParameter: f,
            messageResolver: e.messageResolver,
            inheritLocale: p,
            __i18n: d,
            __root: b,
            __injectWithOption: v
        }
    }(e))
        , {__extender: a} = e
        , n = {
        id: t.id,
        get locale() {
            return t.locale.value
        },
        set locale(e) {
            t.locale.value = e
        },
        get fallbackLocale() {
            return t.fallbackLocale.value
        },
        set fallbackLocale(e) {
            t.fallbackLocale.value = e
        },
        get messages() {
            return t.messages.value
        },
        get datetimeFormats() {
            return t.datetimeFormats.value
        },
        get numberFormats() {
            return t.numberFormats.value
        },
        get availableLocales() {
            return t.availableLocales
        },
        get missing() {
            return t.getMissingHandler()
        },
        set missing(e) {
            t.setMissingHandler(e)
        },
        get silentTranslationWarn() {
            return A(t.missingWarn) ? !t.missingWarn : t.missingWarn
        },
        set silentTranslationWarn(e) {
            t.missingWarn = A(e) ? !e : e
        },
        get silentFallbackWarn() {
            return A(t.fallbackWarn) ? !t.fallbackWarn : t.fallbackWarn
        },
        set silentFallbackWarn(e) {
            t.fallbackWarn = A(e) ? !e : e
        },
        get modifiers() {
            return t.modifiers
        },
        get formatFallbackMessages() {
            return t.fallbackFormat
        },
        set formatFallbackMessages(e) {
            t.fallbackFormat = e
        },
        get postTranslation() {
            return t.getPostTranslationHandler()
        },
        set postTranslation(e) {
            t.setPostTranslationHandler(e)
        },
        get sync() {
            return t.inheritLocale
        },
        set sync(e) {
            t.inheritLocale = e
        },
        get warnHtmlInMessage() {
            return t.warnHtmlMessage ? "warn" : "off"
        },
        set warnHtmlInMessage(e) {
            t.warnHtmlMessage = "off" !== e
        },
        get escapeParameterHtml() {
            return t.escapeParameter
        },
        set escapeParameterHtml(e) {
            t.escapeParameter = e
        },
        get pluralizationRules() {
            return t.pluralRules || {}
        },
        __composer: t,
        t: (...e) => Reflect.apply(t.t, t, [...e]),
        rt: (...e) => Reflect.apply(t.rt, t, [...e]),
        te: (e, a) => t.te(e, a),
        tm: e => t.tm(e),
        getLocaleMessage: e => t.getLocaleMessage(e),
        setLocaleMessage(e, a) {
            t.setLocaleMessage(e, a)
        },
        mergeLocaleMessage(e, a) {
            t.mergeLocaleMessage(e, a)
        },
        d: (...e) => Reflect.apply(t.d, t, [...e]),
        getDateTimeFormat: e => t.getDateTimeFormat(e),
        setDateTimeFormat(e, a) {
            t.setDateTimeFormat(e, a)
        },
        mergeDateTimeFormat(e, a) {
            t.mergeDateTimeFormat(e, a)
        },
        n: (...e) => Reflect.apply(t.n, t, [...e]),
        getNumberFormat: e => t.getNumberFormat(e),
        setNumberFormat(e, a) {
            t.setNumberFormat(e, a)
        },
        mergeNumberFormat(e, a) {
            t.mergeNumberFormat(e, a)
        }
    };
    return n.__extender = a,
        n
}
function ze(e, t) {
    e.locale = t.locale || e.locale,
        e.fallbackLocale = t.fallbackLocale || e.fallbackLocale,
        e.missing = t.missing || e.missing,
        e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn,
        e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn,
        e.formatFallbackMessages = t.formatFallbackMessages || e.formatFallbackMessages,
        e.postTranslation = t.postTranslation || e.postTranslation,
        e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage,
        e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml,
        e.sync = t.sync || e.sync,
        e.__composer[be](t.pluralizationRules || e.pluralizationRules);
    const a = he(e.locale, {
        messages: t.messages,
        __i18n: t.__i18n
    });
    return Object.keys(a).forEach((t => e.mergeLocaleMessage(t, a[t]))),
    t.datetimeFormats && Object.keys(t.datetimeFormats).forEach((a => e.mergeDateTimeFormat(a, t.datetimeFormats[a]))),
    t.numberFormats && Object.keys(t.numberFormats).forEach((a => e.mergeNumberFormat(a, t.numberFormats[a]))),
        e
}
const Je = {
    tag: {
        type: [String, Object]
    },
    locale: {
        type: String
    },
    scope: {
        type: String,
        validator: e => "parent" === e || "global" === e,
        default: "parent"
    },
    i18n: {
        type: Object
    }
};
function qe() {
    return te
}
const Qe = B({
    name: "i18n-t",
    props: D({
        keypath: {
            type: String,
            required: !0
        },
        plural: {
            type: [Number, String],
            validator: e => U(e) || !isNaN(e)
        }
    }, Je),
    setup(e, t) {
        const {slots: a, attrs: n} = t
            , l = e.i18n || rt({
            useScope: e.scope,
            __useComponent: !0
        });
        return () => {
            const o = Object.keys(a).filter((e => "_" !== e[0]))
                , s = V();
            e.locale && (s.locale = e.locale),
            void 0 !== e.plural && (s.plural = S(e.plural) ? +e.plural : e.plural);
            const r = function({slots: e}, t) {
                if (1 === t.length && "default" === t[0])
                    return (e.default ? e.default() : []).reduce(( (e, t) => [...e, ...t.type === te ? t.children : [t]]), []);
                return t.reduce(( (t, a) => {
                        const n = e[a];
                        return n && (t[a] = n()),
                            t
                    }
                ), V())
            }(t, o)
                , i = l[me](e.keypath, r, s)
                , c = D(V(), n)
                , _ = S(e.tag) || M(e.tag) ? e.tag : qe();
            return z(_, c, i)
        }
    }
})
    , Ke = Qe;
function Ze(e, t, a, n) {
    const {slots: l, attrs: o} = t;
    return () => {
        const t = {
            part: !0
        };
        let s = V();
        e.locale && (t.locale = e.locale),
            S(e.format) ? t.key = e.format : M(e.format) && (S(e.format.key) && (t.key = e.format.key),
                s = Object.keys(e.format).reduce(( (t, n) => a.includes(n) ? D(V(), t, {
                    [n]: e.format[n]
                }) : t), V()));
        const r = n(e.value, t, s);
        let i = [t.key];
        w(r) ? i = r.map(( (e, t) => {
                const a = l[e.type]
                    , n = a ? a({
                    [e.type]: e.value,
                    index: t,
                    parts: r
                }) : [e.value];
                var o;
                return w(o = n) && !S(o[0]) && (n[0].key = `${e.type}-${t}`),
                    n
            }
        )) : S(r) && (i = [r]);
        const c = D(V(), o)
            , _ = S(e.tag) || M(e.tag) ? e.tag : qe();
        return z(_, c, i)
    }
}
const et = B({
    name: "i18n-n",
    props: D({
        value: {
            type: Number,
            required: !0
        },
        format: {
            type: [String, Object]
        }
    }, Je),
    setup(e, t) {
        const a = e.i18n || rt({
            useScope: e.scope,
            __useComponent: !0
        });
        return Ze(e, t, u, ( (...e) => a[pe](...e)))
    }
})
    , tt = et;
function at(e) {
    const t = t => {
            const {instance: a, value: n} = t;
            if (!a || !a.$)
                throw ue(_e.UNEXPECTED_ERROR);
            const l = function(e, t) {
                const a = e;
                if ("composition" === e.mode)
                    return a.__getInstance(t) || e.global;
                {
                    const n = a.__getInstance(t);
                    return null != n ? n.__composer : e.global.__composer
                }
            }(e, a.$)
                , o = nt(n);
            return [Reflect.apply(l.t, l, [...lt(o)]), l]
        }
    ;
    return {
        created: (a, n) => {
            const [l,o] = t(n);
            Y && e.global === o && (a.__i18nWatcher = ee(o.locale, ( () => {
                    n.instance && n.instance.$forceUpdate()
                }
            ))),
                a.__composer = o,
                a.textContent = l
        }
        ,
        unmounted: e => {
            Y && e.__i18nWatcher && (e.__i18nWatcher(),
                e.__i18nWatcher = void 0,
                delete e.__i18nWatcher),
            e.__composer && (e.__composer = void 0,
                delete e.__composer)
        }
        ,
        beforeUpdate: (e, {value: t}) => {
            if (e.__composer) {
                const a = e.__composer
                    , n = nt(t);
                e.textContent = Reflect.apply(a.t, a, [...lt(n)])
            }
        }
        ,
        getSSRProps: e => {
            const [a] = t(e);
            return {
                textContent: a
            }
        }
    }
}
function nt(e) {
    if (S(e))
        return {
            path: e
        };
    if (x(e)) {
        if (!("path"in e))
            throw ue(_e.REQUIRED_VALUE);
        return e
    }
    throw ue(_e.INVALID_VALUE)
}
function lt(e) {
    const {path: t, locale: a, args: n, choice: l, plural: o} = e
        , s = {}
        , r = n || {};
    return S(a) && (s.locale = a),
    U(l) && (s.plural = l),
    U(o) && (s.plural = o),
        [t, r, s]
}
const ot = P("global-vue-i18n");
function st(e={}) {
    const t = __VUE_I18N_LEGACY_API__ && A(e.legacy) ? e.legacy : __VUE_I18N_LEGACY_API__
        , a = !A(e.globalInjection) || e.globalInjection
        , n = new Map
        , [l,o] = function(e, t) {
        const a = ae()
            , n = __VUE_I18N_LEGACY_API__ && t ? a.run(( () => Be(e))) : a.run(( () => Pe(e)));
        if (null == n)
            throw ue(_e.UNEXPECTED_ERROR);
        return [a, n]
    }(e, t)
        , s = P("");
    const r = {
        get mode() {
            return __VUE_I18N_LEGACY_API__ && t ? "legacy" : "composition"
        },
        async install(e, ...n) {
            if (__VUE_PROD_DEVTOOLS__ && (e.__VUE_I18N__ = r),
                e.__VUE_I18N_SYMBOL__ = s,
                e.provide(e.__VUE_I18N_SYMBOL__, r),
                x(n[0])) {
                const e = n[0];
                r.__composerExtend = e.__composerExtend,
                    r.__vueI18nExtend = e.__vueI18nExtend
            }
            let l = null;
            !t && a && (l = function(e, t) {
                const a = Object.create(null);
                it.forEach((e => {
                        const n = Object.getOwnPropertyDescriptor(t, e);
                        if (!n)
                            throw ue(_e.UNEXPECTED_ERROR);
                        const l = oe(n.value) ? {
                            get: () => n.value.value,
                            set(e) {
                                n.value.value = e
                            }
                        } : {
                            get: () => n.get && n.get()
                        };
                        Object.defineProperty(a, e, l)
                    }
                )),
                    e.config.globalProperties.$i18n = a,
                    ct.forEach((a => {
                            const n = Object.getOwnPropertyDescriptor(t, a);
                            if (!n || !n.value)
                                throw ue(_e.UNEXPECTED_ERROR);
                            Object.defineProperty(e.config.globalProperties, `$${a}`, n)
                        }
                    ));
                const n = () => {
                        delete e.config.globalProperties.$i18n,
                            ct.forEach((t => {
                                    delete e.config.globalProperties[`$${t}`]
                                }
                            ))
                    }
                ;
                return n
            }(e, r.global)),
            __VUE_I18N_FULL_INSTALL__ && function(e, t, ...a) {
                const n = x(a[0]) ? a[0] : {};
                (!A(n.globalInstall) || n.globalInstall) && ([Qe.name, "I18nT"].forEach((t => e.component(t, Qe))),
                    [et.name, "I18nN"].forEach((t => e.component(t, et))),
                    [_t.name, "I18nD"].forEach((t => e.component(t, _t)))),
                    e.directive("t", at(t))
            }(e, r, ...n),
            __VUE_I18N_LEGACY_API__ && t && e.mixin(function(e, t, a) {
                return {
                    beforeCreate() {
                        const n = J();
                        if (!n)
                            throw ue(_e.UNEXPECTED_ERROR);
                        const l = this.$options;
                        if (l.i18n) {
                            const n = l.i18n;
                            if (l.__i18n && (n.__i18n = l.__i18n),
                                n.__root = t,
                            this === this.$root)
                                this.$i18n = ze(e, n);
                            else {
                                n.__injectWithOption = !0,
                                    n.__extender = a.__vueI18nExtend,
                                    this.$i18n = Be(n);
                                const e = this.$i18n;
                                e.__extender && (e.__disposer = e.__extender(this.$i18n))
                            }
                        } else if (l.__i18n)
                            if (this === this.$root)
                                this.$i18n = ze(e, l);
                            else {
                                this.$i18n = Be({
                                    __i18n: l.__i18n,
                                    __injectWithOption: !0,
                                    __extender: a.__vueI18nExtend,
                                    __root: t
                                });
                                const e = this.$i18n;
                                e.__extender && (e.__disposer = e.__extender(this.$i18n))
                            }
                        else
                            this.$i18n = e;
                        l.__i18nGlobal && ye(t, l, l),
                            this.$t = (...e) => this.$i18n.t(...e),
                            this.$rt = (...e) => this.$i18n.rt(...e),
                            this.$te = (e, t) => this.$i18n.te(e, t),
                            this.$d = (...e) => this.$i18n.d(...e),
                            this.$n = (...e) => this.$i18n.n(...e),
                            this.$tm = e => this.$i18n.tm(e),
                            a.__setInstance(n, this.$i18n)
                    },
                    mounted() {
                        if (__VUE_PROD_DEVTOOLS__ && this.$el && this.$i18n) {
                            const e = this.$i18n;
                            this.$el.__VUE_I18N__ = e.__composer;
                            const t = this.__v_emitter = W();
                            e.__enableEmitter && e.__enableEmitter(t),
                                t.on("*", Xe)
                        }
                    },
                    unmounted() {
                        const e = J();
                        if (!e)
                            throw ue(_e.UNEXPECTED_ERROR);
                        const t = this.$i18n;
                        __VUE_PROD_DEVTOOLS__ && this.$el && this.$el.__VUE_I18N__ && (this.__v_emitter && (this.__v_emitter.off("*", Xe),
                            delete this.__v_emitter),
                        this.$i18n && (t.__disableEmitter && t.__disableEmitter(),
                            delete this.$el.__VUE_I18N__)),
                            delete this.$t,
                            delete this.$rt,
                            delete this.$te,
                            delete this.$d,
                            delete this.$n,
                            delete this.$tm,
                        t.__disposer && (t.__disposer(),
                            delete t.__disposer,
                            delete t.__extender),
                            a.__deleteInstance(e),
                            delete this.$i18n
                    }
                }
            }(o, o.__composer, r));
            const i = e.unmount;
            if (e.unmount = () => {
                l && l(),
                    r.dispose(),
                    i()
            }
                ,
                __VUE_PROD_DEVTOOLS__) {
                if (!await Ce(e, r))
                    throw ue(_e.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
                const a = W();
                if (t) {
                    const e = o;
                    e.__enableEmitter && e.__enableEmitter(a)
                } else {
                    const e = o;
                    e[ge] && e[ge](a)
                }
                a.on("*", Xe)
            }
        },
        get global() {
            return o
        },
        dispose() {
            l.stop()
        },
        __instances: n,
        __getInstance: function(e) {
            return n.get(e) || null
        },
        __setInstance: function(e, t) {
            n.set(e, t)
        },
        __deleteInstance: function(e) {
            n.delete(e)
        }
    };
    return r
}
function rt(e={}) {
    const t = J();
    if (null == t)
        throw ue(_e.MUST_BE_CALL_SETUP_TOP);
    if (!t.isCE && null != t.appContext.app && !t.appContext.app.__VUE_I18N_SYMBOL__)
        throw ue(_e.NOT_INSTALLED);
    const a = function(e) {
        const t = q(e.isCE ? ot : e.appContext.app.__VUE_I18N_SYMBOL__);
        if (!t)
            throw ue(e.isCE ? _e.NOT_INSTALLED_WITH_PROVIDE : _e.UNEXPECTED_ERROR);
        return t
    }(t)
        , n = function(e) {
        return "composition" === e.mode ? e.global : e.global.__composer
    }(a)
        , l = Ie(t)
        , o = function(e, t) {
        return $(e) ? "__i18n"in t ? "local" : "global" : e.useScope ? e.useScope : "local"
    }(e, l);
    if ("global" === o)
        return ye(n, e, l),
            n;
    if ("parent" === o) {
        let l = function(e, t, a=!1) {
            let n = null;
            const l = t.root;
            let o = function(e, t=!1) {
                if (null == e)
                    return null;
                return t && e.vnode.ctx || e.parent
            }(t, a);
            for (; null != o; ) {
                const t = e;
                if ("composition" === e.mode)
                    n = t.__getInstance(o);
                else if (__VUE_I18N_LEGACY_API__) {
                    const e = t.__getInstance(o);
                    null != e && (n = e.__composer,
                    a && n && !n[ve] && (n = null))
                }
                if (null != n)
                    break;
                if (l === o)
                    break;
                o = o.parent
            }
            return n
        }(a, t, e.__useComponent);
        return null == l && (l = n),
            l
    }
    const s = a;
    let r = s.__getInstance(t);
    if (null == r) {
        const a = D({}, e);
        "__i18n"in l && (a.__i18n = l.__i18n),
        n && (a.__root = n),
            r = Pe(a),
        s.__composerExtend && (r[Ee] = s.__composerExtend(r)),
            function(e, t, a) {
                let n = null;
                Q(( () => {
                        if (__VUE_PROD_DEVTOOLS__ && t.vnode.el) {
                            t.vnode.el.__VUE_I18N__ = a,
                                n = W();
                            const e = a;
                            e[ge] && e[ge](n),
                                n.on("*", Xe)
                        }
                    }
                ), t),
                    K(( () => {
                            const l = a;
                            __VUE_PROD_DEVTOOLS__ && t.vnode.el && t.vnode.el.__VUE_I18N__ && (n && n.off("*", Xe),
                            l[de] && l[de](),
                                delete t.vnode.el.__VUE_I18N__),
                                e.__deleteInstance(t);
                            const o = l[Ee];
                            o && (o(),
                                delete l[Ee])
                        }
                    ), t)
            }(s, t, r),
            s.__setInstance(t, r)
    }
    return r
}
const it = ["locale", "fallbackLocale", "availableLocales"]
    , ct = ["t", "rt", "d", "n", "tm", "te"];
const _t = B({
    name: "i18n-d",
    props: D({
        value: {
            type: [Number, Date],
            required: !0
        },
        format: {
            type: [String, Object]
        }
    }, Je),
    setup(e, t) {
        const a = e.i18n || rt({
            useScope: e.scope,
            __useComponent: !0
        });
        return Ze(e, t, m, ( (...e) => a[fe](...e)))
    }
})
    , ut = _t;
if ("boolean" != typeof __VUE_I18N_FULL_INSTALL__ && (C().__VUE_I18N_FULL_INSTALL__ = !0),
"boolean" != typeof __VUE_I18N_LEGACY_API__ && (C().__VUE_I18N_LEGACY_API__ = !0),
"boolean" != typeof __INTLIFY_DROP_MESSAGE_COMPILER__ && (C().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1),
"boolean" != typeof __INTLIFY_PROD_DEVTOOLS__ && (C().__INTLIFY_PROD_DEVTOOLS__ = !1),
    e(t),
    a(n),
    l(o),
    __INTLIFY_PROD_DEVTOOLS__) {
    const e = C();
    e.__INTLIFY__ = !0,
        s(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)
}
export {_t as DatetimeFormat, ut as I18nD, ot as I18nInjectionKey, tt as I18nN, Ke as I18nT, et as NumberFormat, Qe as Translation, ce as VERSION, st as createI18n, rt as useI18n, at as vTDirective};
export default null;
//# sourceMappingURL=/sm/61044892d3ffbc4ca62c94ff634a9d4e6142788b742fe27947db9e65be7811cb.map
