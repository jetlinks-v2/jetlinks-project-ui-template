/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/birpc@2.3.0/dist/index.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const t = 6e4;
function r(t) {
    return t
}
const e = r
    , {clearTimeout: n, setTimeout: o} = globalThis
    , c = Math.random.bind(Math);
function i(i, a) {
    const {post: s, on: u, off: f= () => {}
        , eventNames: p=[], serialize: d=r, deserialize: h=e, resolver: m, bind: E="rpc", timeout: w=t} = a
        , y = new Map;
    let b, v = !1;
    const g = new Proxy({},{
        get(t, r) {
            if ("$functions" === r)
                return i;
            if ("$close" === r)
                return $;
            if ("then" === r && !p.includes("then") && !("then"in i))
                return;
            const e = (...t) => {
                    s(d({
                        m: r,
                        a: t,
                        t: "q"
                    }))
                }
            ;
            if (p.includes(r))
                return e.asEvent = e,
                    e;
            const n = async (...t) => {
                    if (v)
                        throw new Error(`[birpc] rpc is closed, cannot call "${r}"`);
                    if (b)
                        try {
                            await b
                        } finally {
                            b = void 0
                        }
                    return new Promise(( (e, n) => {
                            const i = function(t=21) {
                                let r = ""
                                    , e = t;
                                for (; e--; )
                                    r += l[64 * c() | 0];
                                return r
                            }();
                            let u;
                            w >= 0 && (u = o(( () => {
                                    try {
                                        const e = a.onTimeoutError?.(r, t);
                                        if (!0 !== e)
                                            throw new Error(`[birpc] timeout on calling "${r}"`)
                                    } catch (t) {
                                        n(t)
                                    }
                                    y.delete(i)
                                }
                            ), w),
                            "object" == typeof u && (u = u.unref?.())),
                                y.set(i, {
                                    resolve: e,
                                    reject: n,
                                    timeoutId: u,
                                    method: r
                                }),
                                s(d({
                                    m: r,
                                    a: t,
                                    i: i,
                                    t: "q"
                                }))
                        }
                    ))
                }
            ;
            return n.asEvent = e,
                n
        }
    });
    function $(t) {
        v = !0,
            y.forEach(( ({reject: r, method: e}) => {
                    r(t || new Error(`[birpc] rpc is closed, cannot call "${e}"`))
                }
            )),
            y.clear(),
            f(j)
    }
    async function j(t, ...r) {
        let e;
        try {
            e = h(t)
        } catch (t) {
            if (!0 !== a.onGeneralError?.(t))
                throw t;
            return
        }
        if ("q" === e.t) {
            const {m: t, a: n} = e;
            let o, c;
            const u = m ? m(t, i[t]) : i[t];
            if (u)
                try {
                    o = await u.apply("rpc" === E ? g : i, n)
                } catch (t) {
                    c = t
                }
            else
                c = new Error(`[birpc] function "${t}" not found`);
            if (e.i) {
                if (c && a.onError && a.onError(c, t, n),
                c && a.onFunctionError && !0 === a.onFunctionError(c, t, n))
                    return;
                if (!c)
                    try {
                        return void s(d({
                            t: "s",
                            i: e.i,
                            r: o
                        }), ...r)
                    } catch (r) {
                        if (c = r,
                        !0 !== a.onGeneralError?.(r, t, n))
                            throw r
                    }
                try {
                    s(d({
                        t: "s",
                        i: e.i,
                        e: c
                    }), ...r)
                } catch (r) {
                    if (!0 !== a.onGeneralError?.(r, t, n))
                        throw r
                }
            }
        } else {
            const {i: t, r: r, e: o} = e
                , c = y.get(t);
            c && (n(c.timeoutId),
                o ? c.reject(o) : c.resolve(r)),
                y.delete(t)
        }
    }
    return b = u(j),
        g
}
const a = new WeakMap;
function s(t, r) {
    return t.map((t => {
            let e = a.get(t);
            return e || (e = r(t),
                a.set(t, e)),
                e
        }
    ))
}
function u(t, r, e={}) {
    const n = () => "function" == typeof r ? r() : r
        , o = (r=n()) => s(r, (r => i(t, {
        ...e,
        ...r
    })))
        , c = new Proxy({},{
        get(t, r) {
            const e = o().map((t => t[r]))
                , n = (...t) => Promise.all(e.map((r => r(...t))));
            return n.asEvent = (...t) => {
                e.map((r => r.asEvent(...t)))
            }
                ,
                n
        }
    });
    return o(),
        {
            get clients() {
                return o()
            },
            functions: t,
            updateChannels: function(t) {
                const r = n();
                return t?.(r),
                    o(r)
            },
            broadcast: c,
            boardcast: c
        }
}
const l = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
export {t as DEFAULT_TIMEOUT, s as cachedMap, i as createBirpc, u as createBirpcGroup};
export default null;
//# sourceMappingURL=/sm/8fce70413265ff1c0251e12ae24dfbeba85f612b006d5503c4b79e2e4833abc1.map
