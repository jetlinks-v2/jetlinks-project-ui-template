/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/perfect-debounce@1.0.0/dist/index.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const n = {
    trailing: !0
};
function t(t, i=25, e={}) {
    if (e = {
        ...n,
        ...e
    },
        !Number.isFinite(i))
        throw new TypeError("Expected `wait` to be a finite number");
    let r, l, o, u, a = [];
    const s = (n, i) => (o = async function(n, t, i) {
        return await n.apply(t, i)
    }(t, n, i),
        o.finally(( () => {
                if (o = null,
                e.trailing && u && !l) {
                    const t = s(n, u);
                    return u = null,
                        t
                }
            }
        )),
        o);
    return function(...n) {
        return o ? (e.trailing && (u = n),
            o) : new Promise((t => {
                const o = !l && e.leading;
                clearTimeout(l),
                    l = setTimeout(( () => {
                            l = null;
                            const t = e.leading ? r : s(this, n);
                            for (const n of a)
                                n(t);
                            a = []
                        }
                    ), i),
                    o ? (r = s(this, n),
                        t(r)) : a.push(t)
            }
        ))
    }
}
export {t as debounce};
export default null;
//# sourceMappingURL=/sm/18da7087e55487097fa64928c6a86e0f7a4ca503063f574d007937ad3d519412.map
