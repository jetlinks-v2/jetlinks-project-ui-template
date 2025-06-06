/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/pinia@3.0.3/dist/pinia.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import {hasInjectionContext as e, inject as t, effectScope as n, ref as o, markRaw as s, toRaw as r, computed as a, isRef as i, isReactive as c, toRef as l, watch as u, unref as p, reactive as d, getCurrentScope as f, onScopeDispose as y, nextTick as h, toRefs as _} from "./vue.js";
import {setupDevtoolsPlugin as g} from "./@vue/devtools-api.js";
var m = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
let b;
const v = e => b = e
    , O = () => e() && t(w) || b
    , w = Symbol();
function $(e) {
    return e && "object" == typeof e && "[object Object]" === Object.prototype.toString.call(e) && "function" != typeof e.toJSON
}
var S;
!function(e) {
    e.direct = "direct",
        e.patchObject = "patch object",
        e.patchFunction = "patch function"
}(S || (S = {}));
const E = "undefined" != typeof window
    , T = ( () => "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof m && m.global === m ? m : "object" == typeof globalThis ? globalThis : {
    HTMLElement: null
})();
function I(e, t, n) {
    const o = new XMLHttpRequest;
    o.open("GET", e),
        o.responseType = "blob",
        o.onload = function() {
            A(o.response, t, n)
        }
        ,
        o.onerror = function() {
            console.error("could not download file")
        }
        ,
        o.send()
}
function j(e) {
    const t = new XMLHttpRequest;
    t.open("HEAD", e, !1);
    try {
        t.send()
    } catch (e) {}
    return t.status >= 200 && t.status <= 299
}
function P(e) {
    try {
        e.dispatchEvent(new MouseEvent("click"))
    } catch (t) {
        const n = new MouseEvent("click",{
            bubbles: !0,
            cancelable: !0,
            view: window,
            detail: 0,
            screenX: 80,
            screenY: 20,
            clientX: 80,
            clientY: 20,
            ctrlKey: !1,
            altKey: !1,
            shiftKey: !1,
            metaKey: !1,
            button: 0,
            relatedTarget: null
        });
        e.dispatchEvent(n)
    }
}
const k = "object" == typeof navigator ? navigator : {
        userAgent: ""
    }
    , V = ( () => /Macintosh/.test(k.userAgent) && /AppleWebKit/.test(k.userAgent) && !/Safari/.test(k.userAgent))()
    , A = E ? "undefined" != typeof HTMLAnchorElement && "download"in HTMLAnchorElement.prototype && !V ? function(e, t="download", n) {
                const o = document.createElement("a");
                o.download = t,
                    o.rel = "noopener",
                    "string" == typeof e ? (o.href = e,
                        o.origin !== location.origin ? j(o.href) ? I(e, t, n) : (o.target = "_blank",
                            P(o)) : P(o)) : (o.href = URL.createObjectURL(e),
                        setTimeout((function() {
                                URL.revokeObjectURL(o.href)
                            }
                        ), 4e4),
                        setTimeout((function() {
                                P(o)
                            }
                        ), 0))
            }
            : "msSaveOrOpenBlob"in k ? function(e, t="download", n) {
                    if ("string" == typeof e)
                        if (j(e))
                            I(e, t, n);
                        else {
                            const t = document.createElement("a");
                            t.href = e,
                                t.target = "_blank",
                                setTimeout((function() {
                                        P(t)
                                    }
                                ))
                        }
                    else
                        navigator.msSaveOrOpenBlob(function(e, {autoBom: t=!1}={}) {
                            return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e],{
                                type: e.type
                            }) : e
                        }(e, n), t)
                }
                : function(e, t, n, o) {
                    (o = o || open("", "_blank")) && (o.document.title = o.document.body.innerText = "downloading...");
                    if ("string" == typeof e)
                        return I(e, t, n);
                    const s = "application/octet-stream" === e.type
                        , r = /constructor/i.test(String(T.HTMLElement)) || "safari"in T
                        , a = /CriOS\/[\d]+/.test(navigator.userAgent);
                    if ((a || s && r || V) && "undefined" != typeof FileReader) {
                        const t = new FileReader;
                        t.onloadend = function() {
                            let e = t.result;
                            if ("string" != typeof e)
                                throw o = null,
                                    new Error("Wrong reader.result type");
                            e = a ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"),
                                o ? o.location.href = e : location.assign(e),
                                o = null
                        }
                            ,
                            t.readAsDataURL(e)
                    } else {
                        const t = URL.createObjectURL(e);
                        o ? o.location.assign(t) : location.href = t,
                            o = null,
                            setTimeout((function() {
                                    URL.revokeObjectURL(t)
                                }
                            ), 4e4)
                    }
                }
        : () => {}
;
function L(e, t) {
    const n = "🍍 " + e;
    "function" == typeof __VUE_DEVTOOLS_TOAST__ ? __VUE_DEVTOOLS_TOAST__(n, t) : "error" === t ? console.error(n) : "warn" === t ? console.warn(n) : console.log(n)
}
function D(e) {
    return "_a"in e && "install"in e
}
function R() {
    if (!("clipboard"in navigator))
        return L("Your browser doesn't support the Clipboard API", "error"),
            !0
}
function U(e) {
    return !!(e instanceof Error && e.message.toLowerCase().includes("document is not focused")) && (L('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"),
        !0)
}
let C;
async function x(e) {
    try {
        const t = (C || (C = document.createElement("input"),
                C.type = "file",
                C.accept = ".json"),
                function() {
                    return new Promise(( (e, t) => {
                            C.onchange = async () => {
                                const t = C.files;
                                if (!t)
                                    return e(null);
                                const n = t.item(0);
                                return e(n ? {
                                    text: await n.text(),
                                    file: n
                                } : null)
                            }
                                ,
                                C.oncancel = () => e(null),
                                C.onerror = t,
                                C.click()
                        }
                    ))
                }
        )
            , n = await t();
        if (!n)
            return;
        const {text: o, file: s} = n;
        M(e, JSON.parse(o)),
            L(`Global state imported from "${s.name}".`)
    } catch (e) {
        L("Failed to import the state from JSON. Check the console for more details.", "error"),
            console.error(e)
    }
}
function M(e, t) {
    for (const n in t) {
        const o = e.state.value[n];
        o ? Object.assign(o, t[n]) : e.state.value[n] = t[n]
    }
}
function N(e) {
    return {
        _custom: {
            display: e
        }
    }
}
const F = "🍍 Pinia (root)"
    , H = "_root";
function J(e) {
    return D(e) ? {
        id: H,
        label: F
    } : {
        id: e.$id,
        label: e.$id
    }
}
function B(e) {
    return e ? Array.isArray(e) ? e.reduce(( (e, t) => (e.keys.push(t.key),
        e.operations.push(t.type),
        e.oldValue[t.key] = t.oldValue,
        e.newValue[t.key] = t.newValue,
        e)), {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
    }) : {
        operation: N(e.type),
        key: N(e.key),
        oldValue: e.oldValue,
        newValue: e.newValue
    } : {}
}
function Y(e) {
    switch (e) {
        case S.direct:
            return "mutation";
        case S.patchFunction:
        case S.patchObject:
            return "$patch";
        default:
            return "unknown"
    }
}
let K = !0;
const W = []
    , z = "pinia:mutations"
    , G = "pinia"
    , {assign: X} = Object
    , q = e => "🍍 " + e;
function Q(e, t) {
    g({
        id: "dev.esm.pinia",
        label: "Pinia 🍍",
        logo: "https://pinia.vuejs.org/logo.svg",
        packageName: "pinia",
        homepage: "https://pinia.vuejs.org",
        componentStateTypes: W,
        app: e
    }, (n => {
            "function" != typeof n.now && L("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."),
                n.addTimelineLayer({
                    id: z,
                    label: "Pinia 🍍",
                    color: 15064968
                }),
                n.addInspector({
                    id: G,
                    label: "Pinia 🍍",
                    icon: "storage",
                    treeFilterPlaceholder: "Search stores",
                    actions: [{
                        icon: "content_copy",
                        action: () => {
                            !async function(e) {
                                if (!R())
                                    try {
                                        await navigator.clipboard.writeText(JSON.stringify(e.state.value)),
                                            L("Global state copied to clipboard.")
                                    } catch (e) {
                                        if (U(e))
                                            return;
                                        L("Failed to serialize the state. Check the console for more details.", "error"),
                                            console.error(e)
                                    }
                            }(t)
                        }
                        ,
                        tooltip: "Serialize and copy the state"
                    }, {
                        icon: "content_paste",
                        action: async () => {
                            await async function(e) {
                                if (!R())
                                    try {
                                        M(e, JSON.parse(await navigator.clipboard.readText())),
                                            L("Global state pasted from clipboard.")
                                    } catch (e) {
                                        if (U(e))
                                            return;
                                        L("Failed to deserialize the state from clipboard. Check the console for more details.", "error"),
                                            console.error(e)
                                    }
                            }(t),
                                n.sendInspectorTree(G),
                                n.sendInspectorState(G)
                        }
                        ,
                        tooltip: "Replace the state with the content of your clipboard"
                    }, {
                        icon: "save",
                        action: () => {
                            !async function(e) {
                                try {
                                    A(new Blob([JSON.stringify(e.state.value)],{
                                        type: "text/plain;charset=utf-8"
                                    }), "pinia-state.json")
                                } catch (e) {
                                    L("Failed to export the state as JSON. Check the console for more details.", "error"),
                                        console.error(e)
                                }
                            }(t)
                        }
                        ,
                        tooltip: "Save the state as a JSON file"
                    }, {
                        icon: "folder_open",
                        action: async () => {
                            await x(t),
                                n.sendInspectorTree(G),
                                n.sendInspectorState(G)
                        }
                        ,
                        tooltip: "Import the state from a JSON file"
                    }],
                    nodeActions: [{
                        icon: "restore",
                        tooltip: 'Reset the state (with "$reset")',
                        action: e => {
                            const n = t._s.get(e);
                            n ? "function" != typeof n.$reset ? L(`Cannot reset "${e}" store because it doesn't have a "$reset" method implemented.`, "warn") : (n.$reset(),
                                L(`Store "${e}" reset.`)) : L(`Cannot reset "${e}" store because it wasn't found.`, "warn")
                        }
                    }]
                }),
                n.on.inspectComponent((e => {
                        const t = e.componentInstance && e.componentInstance.proxy;
                        if (t && t._pStores) {
                            const t = e.componentInstance.proxy._pStores;
                            Object.values(t).forEach((t => {
                                    e.instanceData.state.push({
                                        type: q(t.$id),
                                        key: "state",
                                        editable: !0,
                                        value: t._isOptionsAPI ? {
                                            _custom: {
                                                value: r(t.$state),
                                                actions: [{
                                                    icon: "restore",
                                                    tooltip: "Reset the state of this store",
                                                    action: () => t.$reset()
                                                }]
                                            }
                                        } : Object.keys(t.$state).reduce(( (e, n) => (e[n] = t.$state[n],
                                            e)), {})
                                    }),
                                    t._getters && t._getters.length && e.instanceData.state.push({
                                        type: q(t.$id),
                                        key: "getters",
                                        editable: !1,
                                        value: t._getters.reduce(( (e, n) => {
                                                try {
                                                    e[n] = t[n]
                                                } catch (t) {
                                                    e[n] = t
                                                }
                                                return e
                                            }
                                        ), {})
                                    })
                                }
                            ))
                        }
                    }
                )),
                n.on.getInspectorTree((n => {
                        if (n.app === e && n.inspectorId === G) {
                            let e = [t];
                            e = e.concat(Array.from(t._s.values())),
                                n.rootNodes = (n.filter ? e.filter((e => "$id"in e ? e.$id.toLowerCase().includes(n.filter.toLowerCase()) : F.toLowerCase().includes(n.filter.toLowerCase()))) : e).map(J)
                        }
                    }
                )),
                globalThis.$pinia = t,
                n.on.getInspectorState((n => {
                        if (n.app === e && n.inspectorId === G) {
                            const e = n.nodeId === H ? t : t._s.get(n.nodeId);
                            if (!e)
                                return;
                            e && (n.nodeId !== H && (globalThis.$store = r(e)),
                                n.state = function(e) {
                                    if (D(e)) {
                                        const t = Array.from(e._s.keys())
                                            , n = e._s
                                            , o = {
                                            state: t.map((t => ({
                                                editable: !0,
                                                key: t,
                                                value: e.state.value[t]
                                            }))),
                                            getters: t.filter((e => n.get(e)._getters)).map((e => {
                                                    const t = n.get(e);
                                                    return {
                                                        editable: !1,
                                                        key: e,
                                                        value: t._getters.reduce(( (e, n) => (e[n] = t[n],
                                                            e)), {})
                                                    }
                                                }
                                            ))
                                        };
                                        return o
                                    }
                                    const t = {
                                        state: Object.keys(e.$state).map((t => ({
                                            editable: !0,
                                            key: t,
                                            value: e.$state[t]
                                        })))
                                    };
                                    return e._getters && e._getters.length && (t.getters = e._getters.map((t => ({
                                        editable: !1,
                                        key: t,
                                        value: e[t]
                                    })))),
                                    e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((t => ({
                                        editable: !0,
                                        key: t,
                                        value: e[t]
                                    })))),
                                        t
                                }(e))
                        }
                    }
                )),
                n.on.editInspectorState((n => {
                        if (n.app === e && n.inspectorId === G) {
                            const e = n.nodeId === H ? t : t._s.get(n.nodeId);
                            if (!e)
                                return L(`store "${n.nodeId}" not found`, "error");
                            const {path: o} = n;
                            D(e) ? o.unshift("state") : 1 === o.length && e._customProperties.has(o[0]) && !(o[0]in e.$state) || o.unshift("$state"),
                                K = !1,
                                n.set(e, o, n.state.value),
                                K = !0
                        }
                    }
                )),
                n.on.editComponentState((e => {
                        if (e.type.startsWith("🍍")) {
                            const n = e.type.replace(/^🍍\s*/, "")
                                , o = t._s.get(n);
                            if (!o)
                                return L(`store "${n}" not found`, "error");
                            const {path: s} = e;
                            if ("state" !== s[0])
                                return L(`Invalid path for store "${n}":\n${s}\nOnly state can be modified.`);
                            s[0] = "$state",
                                K = !1,
                                e.set(o, s, e.state.value),
                                K = !0
                        }
                    }
                ))
        }
    ))
}
let Z, ee = 0;
function te(e, t, n) {
    const o = t.reduce(( (t, n) => (t[n] = r(e)[n],
        t)), {});
    for (const t in o)
        e[t] = function() {
            const s = ee
                , r = n ? new Proxy(e,{
                get: (...e) => (Z = s,
                    Reflect.get(...e)),
                set: (...e) => (Z = s,
                    Reflect.set(...e))
            }) : e;
            Z = s;
            const a = o[t].apply(r, arguments);
            return Z = void 0,
                a
        }
}
function ne({app: e, store: t, options: n}) {
    if (!t.$id.startsWith("__hot:")) {
        if (t._isOptionsAPI = !!n.state,
            !t._p._testing) {
            te(t, Object.keys(n.actions), t._isOptionsAPI);
            const e = t._hotUpdate;
            r(t)._hotUpdate = function(n) {
                e.apply(this, arguments),
                    te(t, Object.keys(n._hmrPayload.actions), !!t._isOptionsAPI)
            }
        }
        !function(e, t) {
            W.includes(q(t.$id)) || W.push(q(t.$id)),
                g({
                    id: "dev.esm.pinia",
                    label: "Pinia 🍍",
                    logo: "https://pinia.vuejs.org/logo.svg",
                    packageName: "pinia",
                    homepage: "https://pinia.vuejs.org",
                    componentStateTypes: W,
                    app: e,
                    settings: {
                        logStoreChanges: {
                            label: "Notify about new/deleted stores",
                            type: "boolean",
                            defaultValue: !0
                        }
                    }
                }, (e => {
                        const n = "function" == typeof e.now ? e.now.bind(e) : Date.now;
                        t.$onAction(( ({after: o, onError: s, name: r, args: a}) => {
                                const i = ee++;
                                e.addTimelineEvent({
                                    layerId: z,
                                    event: {
                                        time: n(),
                                        title: "🛫 " + r,
                                        subtitle: "start",
                                        data: {
                                            store: N(t.$id),
                                            action: N(r),
                                            args: a
                                        },
                                        groupId: i
                                    }
                                }),
                                    o((o => {
                                            Z = void 0,
                                                e.addTimelineEvent({
                                                    layerId: z,
                                                    event: {
                                                        time: n(),
                                                        title: "🛬 " + r,
                                                        subtitle: "end",
                                                        data: {
                                                            store: N(t.$id),
                                                            action: N(r),
                                                            args: a,
                                                            result: o
                                                        },
                                                        groupId: i
                                                    }
                                                })
                                        }
                                    )),
                                    s((o => {
                                            Z = void 0,
                                                e.addTimelineEvent({
                                                    layerId: z,
                                                    event: {
                                                        time: n(),
                                                        logType: "error",
                                                        title: "💥 " + r,
                                                        subtitle: "end",
                                                        data: {
                                                            store: N(t.$id),
                                                            action: N(r),
                                                            args: a,
                                                            error: o
                                                        },
                                                        groupId: i
                                                    }
                                                })
                                        }
                                    ))
                            }
                        ), !0),
                            t._customProperties.forEach((o => {
                                    u(( () => p(t[o])), ( (t, s) => {
                                            e.notifyComponentUpdate(),
                                                e.sendInspectorState(G),
                                            K && e.addTimelineEvent({
                                                layerId: z,
                                                event: {
                                                    time: n(),
                                                    title: "Change",
                                                    subtitle: o,
                                                    data: {
                                                        newValue: t,
                                                        oldValue: s
                                                    },
                                                    groupId: Z
                                                }
                                            })
                                        }
                                    ), {
                                        deep: !0
                                    })
                                }
                            )),
                            t.$subscribe(( ({events: o, type: s}, r) => {
                                    if (e.notifyComponentUpdate(),
                                        e.sendInspectorState(G),
                                        !K)
                                        return;
                                    const a = {
                                        time: n(),
                                        title: Y(s),
                                        data: X({
                                            store: N(t.$id)
                                        }, B(o)),
                                        groupId: Z
                                    };
                                    s === S.patchFunction ? a.subtitle = "⤵️" : s === S.patchObject ? a.subtitle = "🧩" : o && !Array.isArray(o) && (a.subtitle = o.type),
                                    o && (a.data["rawEvent(s)"] = {
                                        _custom: {
                                            display: "DebuggerEvent",
                                            type: "object",
                                            tooltip: "raw DebuggerEvent[]",
                                            value: o
                                        }
                                    }),
                                        e.addTimelineEvent({
                                            layerId: z,
                                            event: a
                                        })
                                }
                            ), {
                                detached: !0,
                                flush: "sync"
                            });
                        const o = t._hotUpdate;
                        t._hotUpdate = s((s => {
                                o(s),
                                    e.addTimelineEvent({
                                        layerId: z,
                                        event: {
                                            time: n(),
                                            title: "🔥 " + t.$id,
                                            subtitle: "HMR update",
                                            data: {
                                                store: N(t.$id),
                                                info: N("HMR update")
                                            }
                                        }
                                    }),
                                    e.notifyComponentUpdate(),
                                    e.sendInspectorTree(G),
                                    e.sendInspectorState(G)
                            }
                        ));
                        const {$dispose: r} = t;
                        t.$dispose = () => {
                            r(),
                                e.notifyComponentUpdate(),
                                e.sendInspectorTree(G),
                                e.sendInspectorState(G),
                            e.getSettings().logStoreChanges && L(`Disposed "${t.$id}" store 🗑`)
                        }
                            ,
                            e.notifyComponentUpdate(),
                            e.sendInspectorTree(G),
                            e.sendInspectorState(G),
                        e.getSettings().logStoreChanges && L(`"${t.$id}" store installed 🆕`)
                    }
                ))
        }(e, t)
    }
}
function oe() {
    const e = n(!0)
        , t = e.run(( () => o({})));
    let r = []
        , a = [];
    const i = s({
        install(e) {
            v(i),
                i._a = e,
                e.provide(w, i),
                e.config.globalProperties.$pinia = i,
            "undefined" != typeof __VUE_PROD_DEVTOOLS__ && __VUE_PROD_DEVTOOLS__ && E && Q(e, i),
                a.forEach((e => r.push(e))),
                a = []
        },
        use(e) {
            return this._a ? r.push(e) : a.push(e),
                this
        },
        _p: r,
        _a: null,
        _e: e,
        _s: new Map,
        state: t
    });
    return "undefined" != typeof __VUE_PROD_DEVTOOLS__ && __VUE_PROD_DEVTOOLS__ && E && "undefined" != typeof Proxy && i.use(ne),
        i
}
function se(e) {
    e._e.stop(),
        e._s.clear(),
        e._p.splice(0),
        e.state.value = {},
        e._a = null
}
function re(e, t) {
    return () => {}
}
const ae = () => {}
;
function ie(e, t, n, o=ae) {
    e.push(t);
    const s = () => {
            const n = e.indexOf(t);
            n > -1 && (e.splice(n, 1),
                o())
        }
    ;
    return !n && f() && y(s),
        s
}
function ce(e, ...t) {
    e.slice().forEach((e => {
            e(...t)
        }
    ))
}
const le = e => e()
    , ue = Symbol()
    , pe = Symbol();
function de(e, t) {
    e instanceof Map && t instanceof Map ? t.forEach(( (t, n) => e.set(n, t))) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
    for (const n in t) {
        if (!t.hasOwnProperty(n))
            continue;
        const o = t[n]
            , s = e[n];
        $(s) && $(o) && e.hasOwnProperty(n) && !i(o) && !c(o) ? e[n] = de(s, o) : e[n] = o
    }
    return e
}
const fe = Symbol();
function ye(e) {
    return Object.defineProperty(e, fe, {})
}
function he(e) {
    return !$(e) || !Object.prototype.hasOwnProperty.call(e, fe)
}
const {assign: _e} = Object;
function ge(e, t, a={}, l, p, f) {
    let y;
    const _ = _e({
        actions: {}
    }, a)
        , g = {
        deep: !0
    };
    let m, b, O, w = [], $ = [];
    const T = l.state.value[e];
    f || T || (l.state.value[e] = {});
    const I = o({});
    let j;
    function P(t) {
        let n;
        m = b = !1,
            "function" == typeof t ? (t(l.state.value[e]),
                n = {
                    type: S.patchFunction,
                    storeId: e,
                    events: O
                }) : (de(l.state.value[e], t),
                n = {
                    type: S.patchObject,
                    payload: t,
                    storeId: e,
                    events: O
                });
        const o = j = Symbol();
        h().then(( () => {
                j === o && (m = !0)
            }
        )),
            b = !0,
            ce(w, n, l.state.value[e])
    }
    const k = f ? function() {
            const {state: e} = a
                , t = e ? e() : {};
            this.$patch((e => {
                    _e(e, t)
                }
            ))
        }
        : ae;
    const V = (t, n="") => {
        if (ue in t)
            return t[pe] = n,
                t;
        const o = function() {
            v(l);
            const n = Array.from(arguments)
                , s = []
                , r = [];
            let a;
            ce($, {
                args: n,
                name: o[pe],
                store: D,
                after: function(e) {
                    s.push(e)
                },
                onError: function(e) {
                    r.push(e)
                }
            });
            try {
                a = t.apply(this && this.$id === e ? this : D, n)
            } catch (e) {
                throw ce(r, e),
                    e
            }
            return a instanceof Promise ? a.then((e => (ce(s, e),
                e))).catch((e => (ce(r, e),
                Promise.reject(e)))) : (ce(s, a),
                a)
        };
        return o[ue] = !0,
            o[pe] = n,
            o
    }
        , A = s({
        actions: {},
        getters: {},
        state: [],
        hotState: I
    })
        , L = {
        _p: l,
        $id: e,
        $onAction: ie.bind(null, $),
        $patch: P,
        $reset: k,
        $subscribe(t, n={}) {
            const o = ie(w, t, n.detached, ( () => s()))
                , s = y.run(( () => u(( () => l.state.value[e]), (o => {
                    ("sync" === n.flush ? b : m) && t({
                        storeId: e,
                        type: S.direct,
                        events: O
                    }, o)
                }
            ), _e({}, g, n))));
            return o
        },
        $dispose: function() {
            y.stop(),
                w = [],
                $ = [],
                l._s.delete(e)
        }
    }
        , D = d("undefined" != typeof __VUE_PROD_DEVTOOLS__ && __VUE_PROD_DEVTOOLS__ && E ? _e({
        _hmrPayload: A,
        _customProperties: s(new Set)
    }, L) : L);
    l._s.set(e, D);
    const R = (l._a && l._a.runWithContext || le)(( () => l._e.run(( () => (y = n()).run(( () => t({
        action: V
    })))))));
    for (const t in R) {
        const n = R[t];
        if (i(n) && (!i(U = n) || !U.effect) || c(n))
            f || (T && he(n) && (i(n) ? n.value = T[t] : de(n, T[t])),
                l.state.value[e][t] = n);
        else if ("function" == typeof n) {
            const e = V(n, t);
            R[t] = e,
                _.actions[t] = n
        }
    }
    var U;
    if (_e(D, R),
        _e(r(D), R),
        Object.defineProperty(D, "$state", {
            get: () => l.state.value[e],
            set: e => {
                P((t => {
                        _e(t, e)
                    }
                ))
            }
        }),
    "undefined" != typeof __VUE_PROD_DEVTOOLS__ && __VUE_PROD_DEVTOOLS__ && E) {
        const e = {
            writable: !0,
            configurable: !0,
            enumerable: !1
        };
        ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((t => {
                Object.defineProperty(D, t, _e({
                    value: D[t]
                }, e))
            }
        ))
    }
    return l._p.forEach((e => {
            if ("undefined" != typeof __VUE_PROD_DEVTOOLS__ && __VUE_PROD_DEVTOOLS__ && E) {
                const t = y.run(( () => e({
                    store: D,
                    app: l._a,
                    pinia: l,
                    options: _
                })));
                Object.keys(t || {}).forEach((e => D._customProperties.add(e))),
                    _e(D, t)
            } else
                _e(D, y.run(( () => e({
                    store: D,
                    app: l._a,
                    pinia: l,
                    options: _
                }))))
        }
    )),
    T && f && a.hydrate && a.hydrate(D.$state, T),
        m = !0,
        b = !0,
        D
}
/*! #__NO_SIDE_EFFECTS__ */
function me(n, o, r) {
    let i;
    const c = "function" == typeof o;
    function l(r, l) {
        const u = e();
        (r = r || (u ? t(w, null) : null)) && v(r),
        (r = b)._s.has(n) || (c ? ge(n, o, i, r) : function(e, t, n) {
            const {state: o, actions: r, getters: i} = t
                , c = n.state.value[e];
            let l;
            l = ge(e, (function() {
                    c || (n.state.value[e] = o ? o() : {});
                    const t = _(n.state.value[e]);
                    return _e(t, r, Object.keys(i || {}).reduce(( (t, o) => (t[o] = s(a(( () => {
                            v(n);
                            const t = n._s.get(e);
                            return i[o].call(t, t)
                        }
                    ))),
                        t)), {}))
                }
            ), t, n, 0, !0)
        }(n, i, r));
        return r._s.get(n)
    }
    return i = c ? r : o,
        l.$id = n,
        l
}
let be = "Store";
function ve(e) {
    be = e
}
function Oe(...e) {
    return e.reduce(( (e, t) => (e[t.$id + be] = function() {
        return t(this.$pinia)
    }
        ,
        e)), {})
}
function we(e, t) {
    return Array.isArray(t) ? t.reduce(( (t, n) => (t[n] = function() {
        return e(this.$pinia)[n]
    }
        ,
        t)), {}) : Object.keys(t).reduce(( (n, o) => (n[o] = function() {
        const n = e(this.$pinia)
            , s = t[o];
        return "function" == typeof s ? s.call(this, n) : n[s]
    }
        ,
        n)), {})
}
const $e = we;
function Se(e, t) {
    return Array.isArray(t) ? t.reduce(( (t, n) => (t[n] = function(...t) {
        return e(this.$pinia)[n](...t)
    }
        ,
        t)), {}) : Object.keys(t).reduce(( (n, o) => (n[o] = function(...n) {
        return e(this.$pinia)[t[o]](...n)
    }
        ,
        n)), {})
}
function Ee(e, t) {
    return Array.isArray(t) ? t.reduce(( (t, n) => (t[n] = {
        get() {
            return e(this.$pinia)[n]
        },
        set(t) {
            return e(this.$pinia)[n] = t
        }
    },
        t)), {}) : Object.keys(t).reduce(( (n, o) => (n[o] = {
        get() {
            return e(this.$pinia)[t[o]]
        },
        set(n) {
            return e(this.$pinia)[t[o]] = n
        }
    },
        n)), {})
}
function Te(e) {
    const t = r(e)
        , n = {};
    for (const o in t) {
        const s = t[o];
        s.effect ? n[o] = a({
            get: () => e[o],
            set(t) {
                e[o] = t
            }
        }) : (i(s) || c(s)) && (n[o] = l(e, o))
    }
    return n
}
export {S as MutationType, re as acceptHMRUpdate, oe as createPinia, me as defineStore, se as disposePinia, O as getActivePinia, Se as mapActions, $e as mapGetters, we as mapState, Oe as mapStores, Ee as mapWritableState, v as setActivePinia, ve as setMapStoreSuffix, he as shouldHydrate, ye as skipHydrate, Te as storeToRefs};
export default null;
//# sourceMappingURL=/sm/b26d68c9e5bb01def029c7ef3e5800d34a5a647186f87f780fe47cd9457b1dbd.map
