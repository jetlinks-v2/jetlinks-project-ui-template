/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/@intlify/message-compiler@11.1.5/dist/message-compiler.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import {assign as e, join as t, isString as n} from "./shared.js";
/*!
  * message-compiler v11.1.5
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const r = {
    start: {
        line: 1,
        column: 1,
        offset: 0
    },
    end: {
        line: 1,
        column: 1,
        offset: 0
    }
};
function c(e, t, n) {
    return {
        line: e,
        column: t,
        offset: n
    }
}
function o(e, t, n) {
    const r = {
        start: e,
        end: t
    };
    return null != n && (r.source = n),
        r
}
const s = {
    EXPECTED_TOKEN: 1,
    INVALID_TOKEN_IN_PLACEHOLDER: 2,
    UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
    UNKNOWN_ESCAPE_SEQUENCE: 4,
    INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
    UNBALANCED_CLOSING_BRACE: 6,
    UNTERMINATED_CLOSING_BRACE: 7,
    EMPTY_PLACEHOLDER: 8,
    NOT_ALLOW_NEST_PLACEHOLDER: 9,
    INVALID_LINKED_FORMAT: 10,
    MUST_HAVE_MESSAGES_IN_PLURAL: 11,
    UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
    UNEXPECTED_EMPTY_LINKED_KEY: 13,
    UNEXPECTED_LEXICAL_ANALYSIS: 14,
    UNHANDLED_CODEGEN_NODE_TYPE: 15,
    UNHANDLED_MINIFIER_NODE_TYPE: 16
}
    , u = 17
    , a = {
    [s.EXPECTED_TOKEN]: "Expected token: '{0}'",
    [s.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
    [s.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
    [s.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
    [s.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
    [s.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
    [s.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
    [s.EMPTY_PLACEHOLDER]: "Empty placeholder",
    [s.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
    [s.INVALID_LINKED_FORMAT]: "Invalid linked format",
    [s.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
    [s.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
    [s.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
    [s.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
    [s.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
    [s.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function i(e, t, n={}) {
    const {domain: r, messages: c, args: o} = n
        , s = new SyntaxError(String(e));
    return s.code = e,
    t && (s.location = t),
        s.domain = r,
        s
}
function l(e) {
    throw e
}
const f = /<\/?[\w\s="/.':;#-\/]+>/
    , E = e => f.test(e)
    , d = " "
    , L = "\n"
    , N = String.fromCharCode(8232)
    , _ = String.fromCharCode(8233);
function p(e) {
    const t = e;
    let n = 0
        , r = 1
        , c = 1
        , o = 0;
    const s = e => "\r" === t[e] && t[e + 1] === L
        , u = e => t[e] === _
        , a = e => t[e] === N
        , i = e => s(e) || (e => t[e] === L)(e) || u(e) || a(e)
        , l = e => s(e) || u(e) || a(e) ? L : t[e];
    function f() {
        return o = 0,
        i(n) && (r++,
            c = 0),
        s(n) && n++,
            n++,
            c++,
            t[n]
    }
    return {
        index: () => n,
        line: () => r,
        column: () => c,
        peekOffset: () => o,
        charAt: l,
        currentChar: () => l(n),
        currentPeek: () => l(n + o),
        next: f,
        peek: function() {
            return s(n + o) && o++,
                o++,
                t[n + o]
        },
        reset: function() {
            n = 0,
                r = 1,
                c = 1,
                o = 0
        },
        resetPeek: function(e=0) {
            o = e
        },
        skipToPeek: function() {
            const e = n + o;
            for (; e !== n; )
                f();
            o = 0
        }
    }
}
const A = void 0;
function C(e, t={}) {
    const n = !1 !== t.location
        , r = p(e)
        , u = () => r.index()
        , a = () => c(r.line(), r.column(), r.index())
        , l = a()
        , f = u()
        , E = {
        currentType: 13,
        offset: f,
        startLoc: l,
        endLoc: l,
        lastType: 13,
        lastOffset: f,
        lastStartLoc: l,
        lastEndLoc: l,
        braceNest: 0,
        inLinked: !1,
        text: ""
    }
        , N = () => E
        , {onError: _} = t;
    function C(e, t, r, ...c) {
        const s = N();
        if (t.column += r,
            t.offset += r,
            _) {
            const r = i(e, n ? o(s.startLoc, t) : null, {
                domain: "tokenizer",
                args: c
            });
            _(r)
        }
    }
    function k(e, t, r) {
        e.endLoc = a(),
            e.currentType = t;
        const c = {
            type: t
        };
        return n && (c.loc = o(e.startLoc, e.endLoc)),
        null != r && (c.value = r),
            c
    }
    const T = e => k(e, 13);
    function I(e, t) {
        return e.currentChar() === t ? (e.next(),
            t) : (C(s.EXPECTED_TOKEN, a(), 0, t),
            "")
    }
    function h(e) {
        let t = "";
        for (; e.currentPeek() === d || e.currentPeek() === L; )
            t += e.currentPeek(),
                e.peek();
        return t
    }
    function P(e) {
        const t = h(e);
        return e.skipToPeek(),
            t
    }
    function S(e) {
        if (e === A)
            return !1;
        const t = e.charCodeAt(0);
        return t >= 97 && t <= 122 || t >= 65 && t <= 90 || 95 === t
    }
    function y(e, t) {
        const {currentType: n} = t;
        if (2 !== n)
            return !1;
        h(e);
        const r = function(e) {
            if (e === A)
                return !1;
            const t = e.charCodeAt(0);
            return t >= 48 && t <= 57
        }("-" === e.currentPeek() ? e.peek() : e.currentPeek());
        return e.resetPeek(),
            r
    }
    function D(e) {
        h(e);
        const t = "|" === e.currentPeek();
        return e.resetPeek(),
            t
    }
    function m(e, t=!0) {
        const n = (t=!1, r="") => {
            const c = e.currentPeek();
            return "{" === c ? t : "@" !== c && c ? "|" === c ? !(r === d || r === L) : c === d ? (e.peek(),
                n(!0, d)) : c !== L || (e.peek(),
                n(!0, L)) : t
        }
            , r = n();
        return t && e.resetPeek(),
            r
    }
    function O(e, t) {
        const n = e.currentChar();
        return n === A ? A : t(n) ? (e.next(),
            n) : null
    }
    function b(e) {
        const t = e.charCodeAt(0);
        return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || 95 === t || 36 === t
    }
    function x(e) {
        return O(e, b)
    }
    function U(e) {
        const t = e.charCodeAt(0);
        return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || 95 === t || 36 === t || 45 === t
    }
    function v(e) {
        return O(e, U)
    }
    function R(e) {
        const t = e.charCodeAt(0);
        return t >= 48 && t <= 57
    }
    function M(e) {
        return O(e, R)
    }
    function X(e) {
        const t = e.charCodeAt(0);
        return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102
    }
    function g(e) {
        return O(e, X)
    }
    function Y(e) {
        let t = ""
            , n = "";
        for (; t = M(e); )
            n += t;
        return n
    }
    function K(e) {
        return "'" !== e && e !== L
    }
    function w(e) {
        const t = e.currentChar();
        switch (t) {
            case "\\":
            case "'":
                return e.next(),
                    `\\${t}`;
            case "u":
                return $(e, t, 4);
            case "U":
                return $(e, t, 6);
            default:
                return C(s.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, t),
                    ""
        }
    }
    function $(e, t, n) {
        I(e, t);
        let r = "";
        for (let c = 0; c < n; c++) {
            const n = g(e);
            if (!n) {
                C(s.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${t}${r}${e.currentChar()}`);
                break
            }
            r += n
        }
        return `\\${t}${r}`
    }
    function H(e) {
        return "{" !== e && "}" !== e && e !== d && e !== L
    }
    function G(e) {
        P(e);
        const t = I(e, "|");
        return P(e),
            t
    }
    function B(e, t) {
        let n = null;
        switch (e.currentChar()) {
            case "{":
                return t.braceNest >= 1 && C(s.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0),
                    e.next(),
                    n = k(t, 2, "{"),
                    P(e),
                    t.braceNest++,
                    n;
            case "}":
                return t.braceNest > 0 && 2 === t.currentType && C(s.EMPTY_PLACEHOLDER, a(), 0),
                    e.next(),
                    n = k(t, 3, "}"),
                    t.braceNest--,
                t.braceNest > 0 && P(e),
                t.inLinked && 0 === t.braceNest && (t.inLinked = !1),
                    n;
            case "@":
                return t.braceNest > 0 && C(s.UNTERMINATED_CLOSING_BRACE, a(), 0),
                    n = V(e, t) || T(t),
                    t.braceNest = 0,
                    n;
            default:
            {
                let r = !0
                    , c = !0
                    , o = !0;
                if (D(e))
                    return t.braceNest > 0 && C(s.UNTERMINATED_CLOSING_BRACE, a(), 0),
                        n = k(t, 1, G(e)),
                        t.braceNest = 0,
                        t.inLinked = !1,
                        n;
                if (t.braceNest > 0 && (4 === t.currentType || 5 === t.currentType || 6 === t.currentType))
                    return C(s.UNTERMINATED_CLOSING_BRACE, a(), 0),
                        t.braceNest = 0,
                        F(e, t);
                if (r = function(e, t) {
                    const {currentType: n} = t;
                    if (2 !== n)
                        return !1;
                    h(e);
                    const r = S(e.currentPeek());
                    return e.resetPeek(),
                        r
                }(e, t))
                    return n = k(t, 4, function(e) {
                        P(e);
                        let t = ""
                            , n = "";
                        for (; t = v(e); )
                            n += t;
                        return e.currentChar() === A && C(s.UNTERMINATED_CLOSING_BRACE, a(), 0),
                            n
                    }(e)),
                        P(e),
                        n;
                if (c = y(e, t))
                    return n = k(t, 5, function(e) {
                        P(e);
                        let t = "";
                        return "-" === e.currentChar() ? (e.next(),
                            t += `-${Y(e)}`) : t += Y(e),
                        e.currentChar() === A && C(s.UNTERMINATED_CLOSING_BRACE, a(), 0),
                            t
                    }(e)),
                        P(e),
                        n;
                if (o = function(e, t) {
                    const {currentType: n} = t;
                    if (2 !== n)
                        return !1;
                    h(e);
                    const r = "'" === e.currentPeek();
                    return e.resetPeek(),
                        r
                }(e, t))
                    return n = k(t, 6, function(e) {
                        P(e),
                            I(e, "'");
                        let t = ""
                            , n = "";
                        for (; t = O(e, K); )
                            n += "\\" === t ? w(e) : t;
                        const r = e.currentChar();
                        return r === L || r === A ? (C(s.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0),
                        r === L && (e.next(),
                            I(e, "'")),
                            n) : (I(e, "'"),
                            n)
                    }(e)),
                        P(e),
                        n;
                if (!r && !c && !o)
                    return n = k(t, 12, function(e) {
                        P(e);
                        let t = ""
                            , n = "";
                        for (; t = O(e, H); )
                            n += t;
                        return n
                    }(e)),
                        C(s.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n.value),
                        P(e),
                        n;
                break
            }
        }
        return n
    }
    function V(e, t) {
        const {currentType: n} = t;
        let r = null;
        const c = e.currentChar();
        switch (7 !== n && 8 !== n && 11 !== n && 9 !== n || c !== L && c !== d || C(s.INVALID_LINKED_FORMAT, a(), 0),
            c) {
            case "@":
                return e.next(),
                    r = k(t, 7, "@"),
                    t.inLinked = !0,
                    r;
            case ".":
                return P(e),
                    e.next(),
                    k(t, 8, ".");
            case ":":
                return P(e),
                    e.next(),
                    k(t, 9, ":");
            default:
                return D(e) ? (r = k(t, 1, G(e)),
                    t.braceNest = 0,
                    t.inLinked = !1,
                    r) : function(e, t) {
                    const {currentType: n} = t;
                    if (7 !== n)
                        return !1;
                    h(e);
                    const r = "." === e.currentPeek();
                    return e.resetPeek(),
                        r
                }(e, t) || function(e, t) {
                    const {currentType: n} = t;
                    if (7 !== n && 11 !== n)
                        return !1;
                    h(e);
                    const r = ":" === e.currentPeek();
                    return e.resetPeek(),
                        r
                }(e, t) ? (P(e),
                    V(e, t)) : function(e, t) {
                    const {currentType: n} = t;
                    if (8 !== n)
                        return !1;
                    h(e);
                    const r = S(e.currentPeek());
                    return e.resetPeek(),
                        r
                }(e, t) ? (P(e),
                    k(t, 11, function(e) {
                        let t = ""
                            , n = "";
                        for (; t = x(e); )
                            n += t;
                        return n
                    }(e))) : function(e, t) {
                    const {currentType: n} = t;
                    if (9 !== n)
                        return !1;
                    const r = () => {
                        const t = e.currentPeek();
                        return "{" === t ? S(e.peek()) : !("@" === t || "|" === t || ":" === t || "." === t || t === d || !t) && (t === L ? (e.peek(),
                            r()) : m(e, !1))
                    }
                        , c = r();
                    return e.resetPeek(),
                        c
                }(e, t) ? (P(e),
                    "{" === c ? B(e, t) || r : k(t, 10, function(e) {
                        const t = n => {
                                const r = e.currentChar();
                                return "{" !== r && "@" !== r && "|" !== r && "(" !== r && ")" !== r && r ? r === d ? n : (n += r,
                                    e.next(),
                                    t(n)) : n
                            }
                        ;
                        return t("")
                    }(e))) : (7 === n && C(s.INVALID_LINKED_FORMAT, a(), 0),
                    t.braceNest = 0,
                    t.inLinked = !1,
                    F(e, t))
        }
    }
    function F(e, t) {
        let n = {
            type: 13
        };
        if (t.braceNest > 0)
            return B(e, t) || T(t);
        if (t.inLinked)
            return V(e, t) || T(t);
        switch (e.currentChar()) {
            case "{":
                return B(e, t) || T(t);
            case "}":
                return C(s.UNBALANCED_CLOSING_BRACE, a(), 0),
                    e.next(),
                    k(t, 3, "}");
            case "@":
                return V(e, t) || T(t);
            default:
                if (D(e))
                    return n = k(t, 1, G(e)),
                        t.braceNest = 0,
                        t.inLinked = !1,
                        n;
                if (m(e))
                    return k(t, 0, function(e) {
                        let t = "";
                        for (; ; ) {
                            const n = e.currentChar();
                            if ("{" === n || "}" === n || "@" === n || "|" === n || !n)
                                break;
                            if (n === d || n === L)
                                if (m(e))
                                    t += n,
                                        e.next();
                                else {
                                    if (D(e))
                                        break;
                                    t += n,
                                        e.next()
                                }
                            else
                                t += n,
                                    e.next()
                        }
                        return t
                    }(e))
        }
        return n
    }
    return {
        nextToken: function() {
            const {currentType: e, offset: t, startLoc: n, endLoc: c} = E;
            return E.lastType = e,
                E.lastOffset = t,
                E.lastStartLoc = n,
                E.lastEndLoc = c,
                E.offset = u(),
                E.startLoc = a(),
                r.currentChar() === A ? k(E, 13) : F(r, E)
        },
        currentOffset: u,
        currentPosition: a,
        context: N
    }
}
const k = "parser"
    , T = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function I(e, t, n) {
    switch (e) {
        case "\\\\":
            return "\\";
        case "\\'":
            return "'";
        default:
        {
            const e = parseInt(t || n, 16);
            return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�"
        }
    }
}
function h(t={}) {
    const n = !1 !== t.location
        , {onError: r} = t;
    function c(e, t, c, s, ...u) {
        const a = e.currentPosition();
        if (a.offset += s,
            a.column += s,
            r) {
            const e = i(t, n ? o(c, a) : null, {
                domain: k,
                args: u
            });
            r(e)
        }
    }
    function u(e, t, r) {
        const c = {
            type: e
        };
        return n && (c.start = t,
            c.end = t,
            c.loc = {
                start: r,
                end: r
            }),
            c
    }
    function a(e, t, r, c) {
        n && (e.end = t,
        e.loc && (e.loc.end = r))
    }
    function l(e, t) {
        const n = e.context()
            , r = u(3, n.offset, n.startLoc);
        return r.value = t,
            a(r, e.currentOffset(), e.currentPosition()),
            r
    }
    function f(e, t) {
        const n = e.context()
            , {lastOffset: r, lastStartLoc: c} = n
            , o = u(5, r, c);
        return o.index = parseInt(t, 10),
            e.nextToken(),
            a(o, e.currentOffset(), e.currentPosition()),
            o
    }
    function E(e, t) {
        const n = e.context()
            , {lastOffset: r, lastStartLoc: c} = n
            , o = u(4, r, c);
        return o.key = t,
            e.nextToken(),
            a(o, e.currentOffset(), e.currentPosition()),
            o
    }
    function d(e, t) {
        const n = e.context()
            , {lastOffset: r, lastStartLoc: c} = n
            , o = u(9, r, c);
        return o.value = t.replace(T, I),
            e.nextToken(),
            a(o, e.currentOffset(), e.currentPosition()),
            o
    }
    function L(e) {
        const t = e.context()
            , n = u(6, t.offset, t.startLoc);
        let r = e.nextToken();
        if (8 === r.type) {
            const t = function(e) {
                const t = e.nextToken()
                    , n = e.context()
                    , {lastOffset: r, lastStartLoc: o} = n
                    , i = u(8, r, o);
                return 11 !== t.type ? (c(e, s.UNEXPECTED_EMPTY_LINKED_MODIFIER, n.lastStartLoc, 0),
                    i.value = "",
                    a(i, r, o),
                    {
                        nextConsumeToken: t,
                        node: i
                    }) : (null == t.value && c(e, s.UNEXPECTED_LEXICAL_ANALYSIS, n.lastStartLoc, 0, P(t)),
                    i.value = t.value || "",
                    a(i, e.currentOffset(), e.currentPosition()),
                    {
                        node: i
                    })
            }(e);
            n.modifier = t.node,
                r = t.nextConsumeToken || e.nextToken()
        }
        switch (9 !== r.type && c(e, s.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, P(r)),
            r = e.nextToken(),
        2 === r.type && (r = e.nextToken()),
            r.type) {
            case 10:
                null == r.value && c(e, s.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, P(r)),
                    n.key = function(e, t) {
                        const n = e.context()
                            , r = u(7, n.offset, n.startLoc);
                        return r.value = t,
                            a(r, e.currentOffset(), e.currentPosition()),
                            r
                    }(e, r.value || "");
                break;
            case 4:
                null == r.value && c(e, s.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, P(r)),
                    n.key = E(e, r.value || "");
                break;
            case 5:
                null == r.value && c(e, s.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, P(r)),
                    n.key = f(e, r.value || "");
                break;
            case 6:
                null == r.value && c(e, s.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, P(r)),
                    n.key = d(e, r.value || "");
                break;
            default:
            {
                c(e, s.UNEXPECTED_EMPTY_LINKED_KEY, t.lastStartLoc, 0);
                const o = e.context()
                    , i = u(7, o.offset, o.startLoc);
                return i.value = "",
                    a(i, o.offset, o.startLoc),
                    n.key = i,
                    a(n, o.offset, o.startLoc),
                    {
                        nextConsumeToken: r,
                        node: n
                    }
            }
        }
        return a(n, e.currentOffset(), e.currentPosition()),
            {
                node: n
            }
    }
    function N(e) {
        const t = e.context()
            , n = u(2, 1 === t.currentType ? e.currentOffset() : t.offset, 1 === t.currentType ? t.endLoc : t.startLoc);
        n.items = [];
        let r = null;
        do {
            const o = r || e.nextToken();
            switch (r = null,
                o.type) {
                case 0:
                    null == o.value && c(e, s.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, P(o)),
                        n.items.push(l(e, o.value || ""));
                    break;
                case 5:
                    null == o.value && c(e, s.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, P(o)),
                        n.items.push(f(e, o.value || ""));
                    break;
                case 4:
                    null == o.value && c(e, s.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, P(o)),
                        n.items.push(E(e, o.value || ""));
                    break;
                case 6:
                    null == o.value && c(e, s.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, P(o)),
                        n.items.push(d(e, o.value || ""));
                    break;
                case 7:
                {
                    const t = L(e);
                    n.items.push(t.node),
                        r = t.nextConsumeToken || null;
                    break
                }
            }
        } while (13 !== t.currentType && 1 !== t.currentType);
        return a(n, 1 === t.currentType ? t.lastOffset : e.currentOffset(), 1 === t.currentType ? t.lastEndLoc : e.currentPosition()),
            n
    }
    function _(e) {
        const t = e.context()
            , {offset: n, startLoc: r} = t
            , o = N(e);
        return 13 === t.currentType ? o : function(e, t, n, r) {
            const o = e.context();
            let i = 0 === r.items.length;
            const l = u(1, t, n);
            l.cases = [],
                l.cases.push(r);
            do {
                const t = N(e);
                i || (i = 0 === t.items.length),
                    l.cases.push(t)
            } while (13 !== o.currentType);
            return i && c(e, s.MUST_HAVE_MESSAGES_IN_PLURAL, n, 0),
                a(l, e.currentOffset(), e.currentPosition()),
                l
        }(e, n, r, o)
    }
    return {
        parse: function(r) {
            const o = C(r, e({}, t))
                , i = o.context()
                , l = u(0, i.offset, i.startLoc);
            return n && l.loc && (l.loc.source = r),
                l.body = _(o),
            t.onCacheKey && (l.cacheKey = t.onCacheKey(r)),
            13 !== i.currentType && c(o, s.UNEXPECTED_LEXICAL_ANALYSIS, i.lastStartLoc, 0, r[i.offset] || ""),
                a(l, o.currentOffset(), o.currentPosition()),
                l
        }
    }
}
function P(e) {
    if (13 === e.type)
        return "EOF";
    const t = (e.value || "").replace(/\r?\n/gu, "\\n");
    return t.length > 10 ? t.slice(0, 9) + "…" : t
}
function S(e, t) {
    for (let n = 0; n < e.length; n++)
        y(e[n], t)
}
function y(e, t) {
    switch (e.type) {
        case 1:
            S(e.cases, t),
                t.helper("plural");
            break;
        case 2:
            S(e.items, t);
            break;
        case 6:
            y(e.key, t),
                t.helper("linked"),
                t.helper("type");
            break;
        case 5:
            t.helper("interpolate"),
                t.helper("list");
            break;
        case 4:
            t.helper("interpolate"),
                t.helper("named")
    }
}
function D(e, t={}) {
    const n = function(e) {
        const t = {
            ast: e,
            helpers: new Set
        };
        return {
            context: () => t,
            helper: e => (t.helpers.add(e),
                e)
        }
    }(e);
    n.helper("normalize"),
    e.body && y(e.body, n);
    const r = n.context();
    e.helpers = Array.from(r.helpers)
}
function m(e) {
    if (1 === e.items.length) {
        const t = e.items[0];
        3 !== t.type && 9 !== t.type || (e.static = t.value,
            delete t.value)
    } else {
        const n = [];
        for (let t = 0; t < e.items.length; t++) {
            const r = e.items[t];
            if (3 !== r.type && 9 !== r.type)
                break;
            if (null == r.value)
                break;
            n.push(r.value)
        }
        if (n.length === e.items.length) {
            e.static = t(n);
            for (let t = 0; t < e.items.length; t++) {
                const n = e.items[t];
                3 !== n.type && 9 !== n.type || delete n.value
            }
        }
    }
}
function O(e) {
    switch (e.t = e.type,
        e.type) {
        case 0:
        {
            const t = e;
            O(t.body),
                t.b = t.body,
                delete t.body;
            break
        }
        case 1:
        {
            const t = e
                , n = t.cases;
            for (let e = 0; e < n.length; e++)
                O(n[e]);
            t.c = n,
                delete t.cases;
            break
        }
        case 2:
        {
            const t = e
                , n = t.items;
            for (let e = 0; e < n.length; e++)
                O(n[e]);
            t.i = n,
                delete t.items,
            t.static && (t.s = t.static,
                delete t.static);
            break
        }
        case 3:
        case 9:
        case 8:
        case 7:
        {
            const t = e;
            t.value && (t.v = t.value,
                delete t.value);
            break
        }
        case 6:
        {
            const t = e;
            O(t.key),
                t.k = t.key,
                delete t.key,
            t.modifier && (O(t.modifier),
                t.m = t.modifier,
                delete t.modifier);
            break
        }
        case 5:
        {
            const t = e;
            t.i = t.index,
                delete t.index;
            break
        }
        case 4:
        {
            const t = e;
            t.k = t.key,
                delete t.key;
            break
        }
    }
    delete e.type
}
function b(e, t) {
    const {helper: n} = e;
    switch (t.type) {
        case 0:
            !function(e, t) {
                t.body ? b(e, t.body) : e.push("null")
            }(e, t);
            break;
        case 1:
            !function(e, t) {
                const {helper: n, needIndent: r} = e;
                if (t.cases.length > 1) {
                    e.push(`${n("plural")}([`),
                        e.indent(r());
                    const c = t.cases.length;
                    for (let n = 0; n < c && (b(e, t.cases[n]),
                    n !== c - 1); n++)
                        e.push(", ");
                    e.deindent(r()),
                        e.push("])")
                }
            }(e, t);
            break;
        case 2:
            !function(e, t) {
                const {helper: n, needIndent: r} = e;
                e.push(`${n("normalize")}([`),
                    e.indent(r());
                const c = t.items.length;
                for (let n = 0; n < c && (b(e, t.items[n]),
                n !== c - 1); n++)
                    e.push(", ");
                e.deindent(r()),
                    e.push("])")
            }(e, t);
            break;
        case 6:
            !function(e, t) {
                const {helper: n} = e;
                e.push(`${n("linked")}(`),
                    b(e, t.key),
                    t.modifier ? (e.push(", "),
                        b(e, t.modifier),
                        e.push(", _type")) : e.push(", undefined, _type"),
                    e.push(")")
            }(e, t);
            break;
        case 8:
        case 7:
        case 9:
        case 3:
            e.push(JSON.stringify(t.value), t);
            break;
        case 5:
            e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
            break;
        case 4:
            e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t)
    }
}
function x(r, c={}) {
    const o = e({}, c)
        , s = !!o.jit
        , u = !!o.minify
        , a = null == o.optimize || o.optimize
        , i = h(o).parse(r);
    return s ? (a && function(e) {
        const t = e.body;
        2 === t.type ? m(t) : t.cases.forEach((e => m(e)))
    }(i),
    u && O(i),
        {
            ast: i,
            code: ""
        }) : (D(i, o),
        ( (e, r={}) => {
                const c = n(r.mode) ? r.mode : "normal"
                    , o = n(r.filename) ? r.filename : "message.intl"
                    , s = !!r.sourceMap
                    , u = null != r.breakLineCode ? r.breakLineCode : "arrow" === c ? ";" : "\n"
                    , a = r.needIndent ? r.needIndent : "arrow" !== c
                    , i = e.helpers || []
                    , l = function(e, t) {
                    const {sourceMap: n, filename: r, breakLineCode: c, needIndent: o} = t
                        , s = !1 !== t.location
                        , u = {
                        filename: r,
                        code: "",
                        column: 1,
                        line: 1,
                        offset: 0,
                        map: void 0,
                        breakLineCode: c,
                        needIndent: o,
                        indentLevel: 0
                    };
                    function a(e, t) {
                        u.code += e
                    }
                    function i(e, t=!0) {
                        const n = t ? c : "";
                        a(o ? n + "  ".repeat(e) : n)
                    }
                    return s && e.loc && (u.source = e.loc.source),
                        {
                            context: () => u,
                            push: a,
                            indent: function(e=!0) {
                                const t = ++u.indentLevel;
                                e && i(t)
                            },
                            deindent: function(e=!0) {
                                const t = --u.indentLevel;
                                e && i(t)
                            },
                            newline: function() {
                                i(u.indentLevel)
                            },
                            helper: e => `_${e}`,
                            needIndent: () => u.needIndent
                        }
                }(e, {
                    mode: c,
                    filename: o,
                    sourceMap: s,
                    breakLineCode: u,
                    needIndent: a
                });
                l.push("normal" === c ? "function __msg__ (ctx) {" : "(ctx) => {"),
                    l.indent(a),
                i.length > 0 && (l.push(`const { ${t(i.map((e => `${e}: _${e}`)), ", ")} } = ctx`),
                    l.newline()),
                    l.push("return "),
                    b(l, e),
                    l.deindent(a),
                    l.push("}"),
                    delete e.helpers;
                const {code: f, map: E} = l.context();
                return {
                    ast: e,
                    code: f,
                    map: E ? E.toJSON() : void 0
                }
            }
        )(i, o))
}
export {u as COMPILE_ERROR_CODES_EXTEND_POINT, s as CompileErrorCodes, k as ERROR_DOMAIN, r as LOCATION_STUB, x as baseCompile, i as createCompileError, o as createLocation, h as createParser, c as createPosition, l as defaultOnError, E as detectHtmlTag, a as errorMessages};
export default null;
//# sourceMappingURL=/sm/7cfa73effdb7c49406922ba24a48afb1f44a5ab95cc050f3d7efa9e047a13002.map
