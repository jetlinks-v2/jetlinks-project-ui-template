/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/hookable@5.5.3/dist/index.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function e(o, t={}, s) {
    for (const i in o) {
        const n = o[i]
            , r = s ? `${s}:${i}` : i;
        "object" == typeof n && null !== n ? e(n, t, r) : "function" == typeof n && (t[r] = n)
    }
    return t
}
function o(...o) {
    const s = {};
    for (const t of o) {
        const o = e(t);
        for (const e in o)
            s[e] ? s[e].push(o[e]) : s[e] = [o[e]]
    }
    for (const e in s)
        if (s[e].length > 1) {
            const o = s[e];
            s[e] = (...e) => t(o, (o => o(...e)))
        } else
            s[e] = s[e][0];
    return s
}
function t(e, o) {
    return e.reduce(( (e, t) => e.then(( () => o(t)))), Promise.resolve())
}
const s = {
    run: e => e()
}
    , i = void 0 !== console.createTask ? console.createTask : () => s;
function n(e, o) {
    const t = o.shift()
        , s = i(t);
    return e.reduce(( (e, t) => e.then(( () => s.run(( () => t(...o)))))), Promise.resolve())
}
function r(e, o) {
    const t = o.shift()
        , s = i(t);
    return Promise.all(e.map((e => s.run(( () => e(...o))))))
}
function h(e, o) {
    return e.reduce(( (e, t) => e.then(( () => t(...o || [])))), Promise.resolve())
}
function c(e, o) {
    return Promise.all(e.map((e => e(...o || []))))
}
function a(e, o) {
    for (const t of [...e])
        t(o)
}
class f {
    constructor() {
        this._hooks = {},
            this._before = void 0,
            this._after = void 0,
            this._deprecatedMessages = void 0,
            this._deprecatedHooks = {},
            this.hook = this.hook.bind(this),
            this.callHook = this.callHook.bind(this),
            this.callHookWith = this.callHookWith.bind(this)
    }
    hook(e, o, t={}) {
        if (!e || "function" != typeof o)
            return () => {}
                ;
        const s = e;
        let i;
        for (; this._deprecatedHooks[e]; )
            i = this._deprecatedHooks[e],
                e = i.to;
        if (i && !t.allowDeprecated) {
            let e = i.message;
            e || (e = `${s} hook has been deprecated` + (i.to ? `, please use ${i.to}` : "")),
            this._deprecatedMessages || (this._deprecatedMessages = new Set),
            this._deprecatedMessages.has(e) || (console.warn(e),
                this._deprecatedMessages.add(e))
        }
        if (!o.name)
            try {
                Object.defineProperty(o, "name", {
                    get: () => "_" + e.replace(/\W+/g, "_") + "_hook_cb",
                    configurable: !0
                })
            } catch {}
        return this._hooks[e] = this._hooks[e] || [],
            this._hooks[e].push(o),
            () => {
                o && (this.removeHook(e, o),
                    o = void 0)
            }
    }
    hookOnce(e, o) {
        let t, s = (...e) => ("function" == typeof t && t(),
            t = void 0,
            s = void 0,
            o(...e));
        return t = this.hook(e, s),
            t
    }
    removeHook(e, o) {
        if (this._hooks[e]) {
            const t = this._hooks[e].indexOf(o);
            -1 !== t && this._hooks[e].splice(t, 1),
            0 === this._hooks[e].length && delete this._hooks[e]
        }
    }
    deprecateHook(e, o) {
        this._deprecatedHooks[e] = "string" == typeof o ? {
            to: o
        } : o;
        const t = this._hooks[e] || [];
        delete this._hooks[e];
        for (const o of t)
            this.hook(e, o)
    }
    deprecateHooks(e) {
        Object.assign(this._deprecatedHooks, e);
        for (const o in e)
            this.deprecateHook(o, e[o])
    }
    addHooks(o) {
        const t = e(o)
            , s = Object.keys(t).map((e => this.hook(e, t[e])));
        return () => {
            for (const e of s.splice(0, s.length))
                e()
        }
    }
    removeHooks(o) {
        const t = e(o);
        for (const e in t)
            this.removeHook(e, t[e])
    }
    removeAllHooks() {
        for (const e in this._hooks)
            delete this._hooks[e]
    }
    callHook(e, ...o) {
        return o.unshift(e),
            this.callHookWith(n, e, ...o)
    }
    callHookParallel(e, ...o) {
        return o.unshift(e),
            this.callHookWith(r, e, ...o)
    }
    callHookWith(e, o, ...t) {
        const s = this._before || this._after ? {
            name: o,
            args: t,
            context: {}
        } : void 0;
        this._before && a(this._before, s);
        const i = e(o in this._hooks ? [...this._hooks[o]] : [], t);
        return i instanceof Promise ? i.finally(( () => {
                this._after && s && a(this._after, s)
            }
        )) : (this._after && s && a(this._after, s),
            i)
    }
    beforeEach(e) {
        return this._before = this._before || [],
            this._before.push(e),
            () => {
                if (void 0 !== this._before) {
                    const o = this._before.indexOf(e);
                    -1 !== o && this._before.splice(o, 1)
                }
            }
    }
    afterEach(e) {
        return this._after = this._after || [],
            this._after.push(e),
            () => {
                if (void 0 !== this._after) {
                    const o = this._after.indexOf(e);
                    -1 !== o && this._after.splice(o, 1)
                }
            }
    }
}
function l() {
    return new f
}
const d = "undefined" != typeof window;
function u(e, o={}) {
    const t = {
        inspect: d,
        group: d,
        filter: () => !0,
        ...o
    }
        , s = t.filter
        , i = "string" == typeof s ? e => e.startsWith(s) : s
        , n = t.tag ? `[${t.tag}] ` : ""
        , r = e => n + e.name + "".padEnd(e._id, "\0")
        , h = {}
        , c = e.beforeEach((e => {
            (void 0 === i || i(e.name)) && (h[e.name] = h[e.name] || 0,
                e._id = h[e.name]++,
                console.time(r(e)))
        }
    ))
        , a = e.afterEach((e => {
            (void 0 === i || i(e.name)) && (t.group && console.groupCollapsed(e.name),
                t.inspect ? console.timeLog(r(e), e.args) : console.timeEnd(r(e)),
            t.group && console.groupEnd(),
                h[e.name]--)
        }
    ));
    return {
        close: () => {
            c(),
                a()
        }
    }
}
export {f as Hookable, u as createDebugger, l as createHooks, e as flatHooks, o as mergeHooks, c as parallelCaller, t as serial, h as serialCaller};
export default null;
//# sourceMappingURL=/sm/e849501f09eb599d7c61696b653e2cf67ef80eb3a857bb7e5abf2e90bb0c7f73.map
