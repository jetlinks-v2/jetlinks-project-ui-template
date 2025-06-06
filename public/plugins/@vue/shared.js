/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/@vue/shared@3.3.4/dist/shared.esm-bundler.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var e = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
function t(e, t) {
    const n = Object.create(null)
        , r = e.split(",");
    for (let e = 0; e < r.length; e++)
        n[r[e]] = !0;
    return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
}
const n = {}
    , r = []
    , o = () => {}
    , i = () => !1
    , a = /^on[^a-z]/
    , s = e => a.test(e)
    , l = e => e.startsWith("onUpdate:")
    , c = Object.assign
    , p = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    }
    , d = Object.prototype.hasOwnProperty
    , f = (e, t) => d.call(e, t)
    , u = Array.isArray
    , h = e => "[object Map]" === A(e)
    , g = e => "[object Set]" === A(e)
    , m = e => "[object Date]" === A(e)
    , b = e => "[object RegExp]" === A(e)
    , y = e => "function" == typeof e
    , k = e => "string" == typeof e
    , x = e => "symbol" == typeof e
    , v = e => null !== e && "object" == typeof e
    , w = e => v(e) && y(e.then) && y(e.catch)
    , S = Object.prototype.toString
    , A = e => S.call(e)
    , T = e => A(e).slice(8, -1)
    , O = e => "[object Object]" === A(e)
    , N = e => k(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e
    , M = t(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
    , E = t("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo")
    , F = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    }
    , C = /-(\w)/g
    , j = F((e => e.replace(C, ( (e, t) => t ? t.toUpperCase() : ""))))
    , U = /\B([A-Z])/g
    , R = F((e => e.replace(U, "-$1").toLowerCase()))
    , _ = F((e => e.charAt(0).toUpperCase() + e.slice(1)))
    , L = F((e => e ? `on${_(e)}` : ""))
    , D = (e, t) => !Object.is(e, t)
    , P = (e, t) => {
        for (let n = 0; n < e.length; n++)
            e[n](t)
    }
    , z = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n
        })
    }
    , $ = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    }
    , I = e => {
        const t = k(e) ? Number(e) : NaN;
        return isNaN(t) ? e : t
    }
;
let B;
const q = () => B || (B = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : {})
    , V = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
function Y(e) {
    return V.test(e) ? `__props.${e}` : `__props[${JSON.stringify(e)}]`
}
const G = {
    1: "TEXT",
    2: "CLASS",
    4: "STYLE",
    8: "PROPS",
    16: "FULL_PROPS",
    32: "HYDRATE_EVENTS",
    64: "STABLE_FRAGMENT",
    128: "KEYED_FRAGMENT",
    256: "UNKEYED_FRAGMENT",
    512: "NEED_PATCH",
    1024: "DYNAMIC_SLOTS",
    2048: "DEV_ROOT_FRAGMENT",
    [-1]: "HOISTED",
    [-2]: "BAIL"
}
    , H = {
    1: "STABLE",
    2: "DYNAMIC",
    3: "FORWARDED"
}
    , W = t("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console");
function X(e, t=0, n=e.length) {
    let r = e.split(/(\r?\n)/);
    const o = r.filter(( (e, t) => t % 2 == 1));
    r = r.filter(( (e, t) => t % 2 == 0));
    let i = 0;
    const a = [];
    for (let e = 0; e < r.length; e++)
        if (i += r[e].length + (o[e] && o[e].length || 0),
        i >= t) {
            for (let s = e - 2; s <= e + 2 || n > i; s++) {
                if (s < 0 || s >= r.length)
                    continue;
                const l = s + 1;
                a.push(`${l}${" ".repeat(Math.max(3 - String(l).length, 0))}|  ${r[s]}`);
                const c = r[s].length
                    , p = o[s] && o[s].length || 0;
                if (s === e) {
                    const e = t - (i - (c + p))
                        , r = Math.max(1, n > i ? c - e : n - t);
                    a.push("   |  " + " ".repeat(e) + "^".repeat(r))
                } else if (s > e) {
                    if (n > i) {
                        const e = Math.max(Math.min(n - i, c), 1);
                        a.push("   |  " + "^".repeat(e))
                    }
                    i += c + p
                }
            }
            break
        }
    return a.join("\n")
}
function Z(e) {
    if (u(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n]
                , o = k(r) ? ee(r) : Z(r);
            if (o)
                for (const e in o)
                    t[e] = o[e]
        }
        return t
    }
    return k(e) || v(e) ? e : void 0
}
const J = /;(?![^(]*\))/g
    , K = /:([^]+)/
    , Q = /\/\*[^]*?\*\//g;
function ee(e) {
    const t = {};
    return e.replace(Q, "").split(J).forEach((e => {
            if (e) {
                const n = e.split(K);
                n.length > 1 && (t[n[0].trim()] = n[1].trim())
            }
        }
    )),
        t
}
function te(e) {
    let t = "";
    if (!e || k(e))
        return t;
    for (const n in e) {
        const r = e[n]
            , o = n.startsWith("--") ? n : R(n);
        (k(r) || "number" == typeof r) && (t += `${o}:${r};`)
    }
    return t
}
function ne(e) {
    let t = "";
    if (k(e))
        t = e;
    else if (u(e))
        for (let n = 0; n < e.length; n++) {
            const r = ne(e[n]);
            r && (t += r + " ")
        }
    else if (v(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
function re(e) {
    if (!e)
        return null;
    let {class: t, style: n} = e;
    return t && !k(t) && (e.class = ne(t)),
    n && (e.style = Z(n)),
        e
}
const oe = t("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot")
    , ie = t("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view")
    , ae = t("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr")
    , se = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
    , le = t(se)
    , ce = t(se + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function pe(e) {
    return !!e || "" === e
}
const de = /[>/="'\u0009\u000a\u000c\u0020]/
    , fe = {};
function ue(e) {
    if (fe.hasOwnProperty(e))
        return fe[e];
    const t = de.test(e);
    return t && console.error(`unsafe attribute name: ${e}`),
        fe[e] = !t
}
const he = {
    acceptCharset: "accept-charset",
    className: "class",
    htmlFor: "for",
    httpEquiv: "http-equiv"
}
    , ge = t("accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap")
    , me = t("xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan")
    , be = /["'&<>]/;
function ye(e) {
    const t = "" + e
        , n = be.exec(t);
    if (!n)
        return t;
    let r, o, i = "", a = 0;
    for (o = n.index; o < t.length; o++) {
        switch (t.charCodeAt(o)) {
            case 34:
                r = "&quot;";
                break;
            case 38:
                r = "&amp;";
                break;
            case 39:
                r = "&#39;";
                break;
            case 60:
                r = "&lt;";
                break;
            case 62:
                r = "&gt;";
                break;
            default:
                continue
        }
        a !== o && (i += t.slice(a, o)),
            a = o + 1,
            i += r
    }
    return a !== o ? i + t.slice(a, o) : i
}
const ke = /^-?>|<!--|-->|--!>|<!-$/g;
function xe(e) {
    return e.replace(ke, "")
}
function ve(e, t) {
    if (e === t)
        return !0;
    let n = m(e)
        , r = m(t);
    if (n || r)
        return !(!n || !r) && e.getTime() === t.getTime();
    if (n = x(e),
        r = x(t),
    n || r)
        return e === t;
    if (n = u(e),
        r = u(t),
    n || r)
        return !(!n || !r) && function(e, t) {
            if (e.length !== t.length)
                return !1;
            let n = !0;
            for (let r = 0; n && r < e.length; r++)
                n = ve(e[r], t[r]);
            return n
        }(e, t);
    if (n = v(e),
        r = v(t),
    n || r) {
        if (!n || !r)
            return !1;
        if (Object.keys(e).length !== Object.keys(t).length)
            return !1;
        for (const n in e) {
            const r = e.hasOwnProperty(n)
                , o = t.hasOwnProperty(n);
            if (r && !o || !r && o || !ve(e[n], t[n]))
                return !1
        }
    }
    return String(e) === String(t)
}
function we(e, t) {
    return e.findIndex((e => ve(e, t)))
}
const Se = e => k(e) ? e : null == e ? "" : u(e) || v(e) && (e.toString === S || !y(e.toString)) ? JSON.stringify(e, Ae, 2) : String(e)
    , Ae = (e, t) => t && t.__v_isRef ? Ae(e, t.value) : h(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce(( (e, [t,n]) => (e[`${t} =>`] = n,
        e)), {})
} : g(t) ? {
    [`Set(${t.size})`]: [...t.values()]
} : !v(t) || u(t) || O(t) ? t : String(t);
export {r as EMPTY_ARR, n as EMPTY_OBJ, i as NO, o as NOOP, G as PatchFlagNames, j as camelize, _ as capitalize, z as def, ye as escapeHtml, xe as escapeHtmlComment, c as extend, Y as genPropsAccessExp, X as generateCodeFrame, q as getGlobalThis, D as hasChanged, f as hasOwn, R as hyphenate, pe as includeBooleanAttr, P as invokeArrayFns, u as isArray, ce as isBooleanAttr, E as isBuiltInDirective, m as isDate, y as isFunction, W as isGloballyWhitelisted, oe as isHTMLTag, N as isIntegerKey, ge as isKnownHtmlAttr, me as isKnownSvgAttr, h as isMap, l as isModelListener, v as isObject, s as isOn, O as isPlainObject, w as isPromise, b as isRegExp, M as isReservedProp, ue as isSSRSafeAttrName, ie as isSVGTag, g as isSet, le as isSpecialBooleanAttr, k as isString, x as isSymbol, ae as isVoidTag, ve as looseEqual, we as looseIndexOf, $ as looseToNumber, t as makeMap, ne as normalizeClass, re as normalizeProps, Z as normalizeStyle, S as objectToString, ee as parseStringStyle, he as propsToAttrMap, p as remove, H as slotFlagsText, te as stringifyStyle, Se as toDisplayString, L as toHandlerKey, I as toNumber, T as toRawType, A as toTypeString};
export default null;
//# sourceMappingURL=/sm/622ee54b3fae0fd87c3a7191ab68408253ef73bd9d42a820bbb04ba310cb60d1.map
