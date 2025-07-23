import { jsxs as q, jsx as c, Fragment as Ce } from "react/jsx-runtime";
import * as z from "react";
import { useRef as X, useMemo as ae, useEffect as ce, useState as oe, useCallback as J, createContext as Ee, useContext as Se, useLayoutEffect as me, memo as Te } from "react";
import xe from "simplebar-react";
import { createPortal as Me, flushSync as Le } from "react-dom";
import { useMediaQuery as ke } from "react-responsive";
import './index.css';function ve(t) {
  var e, o, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var a = t.length;
    for (e = 0; e < a; e++) t[e] && (o = ve(t[e])) && (n && (n += " "), n += o);
  } else for (o in t) t[o] && (n && (n += " "), n += o);
  return n;
}
function B() {
  for (var t, e, o = 0, n = "", a = arguments.length; o < a; o++) (t = arguments[o]) && (e = ve(t)) && (n && (n += " "), n += e);
  return n;
}
const Ye = ({ children: t }) => {
  const e = X(document.createElement("div")), o = ae(
    () => document.querySelector("#rcm-modal-portal"),
    []
  );
  return ce(() => {
    const n = e.current;
    return o.appendChild(n), () => void o.removeChild(n);
  }, []), Me(t, o);
}, Re = "_modal__header_3drx6_1", Ae = {
  modal__header: Re
}, He = (t) => /* @__PURE__ */ z.createElement("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, /* @__PURE__ */ z.createElement("path", { d: "M14.9498 6.46443C15.3403 6.07391 15.3403 5.44074 14.9498 5.05022C14.5593 4.65969 13.9261 4.65969 13.5356 5.05022L14.9498 6.46443ZM5.05029 13.5355C4.65976 13.926 4.65976 14.5592 5.05029 14.9497C5.44081 15.3402 6.07398 15.3402 6.4645 14.9497L5.05029 13.5355ZM13.5356 5.05022L5.05029 13.5355L6.4645 14.9497L14.9498 6.46443L13.5356 5.05022Z", fill: "currentColor" }), /* @__PURE__ */ z.createElement("path", { d: "M13.5356 14.9498C13.9261 15.3403 14.5593 15.3403 14.9498 14.9498C15.3403 14.5593 15.3403 13.9261 14.9498 13.5356L13.5356 14.9498ZM6.4645 5.05029C6.07398 4.65976 5.44081 4.65976 5.05029 5.05029C4.65976 5.44081 4.65976 6.07398 5.05029 6.4645L6.4645 5.05029ZM14.9498 13.5356L6.4645 5.05029L5.05029 6.4645L13.5356 14.9498L14.9498 13.5356Z", fill: "currentColor" })), Pe = ({ label: t, onClose: e }) => /* @__PURE__ */ q(
  "header",
  {
    className: B(Ae.modal__header, "modal__header--with-bar", {
      "modal__header--with-label": !!t,
      "modal__header--no-label": !t
    }),
    children: [
      t && /* @__PURE__ */ c("h4", { className: "modal__header-title", children: t }),
      /* @__PURE__ */ c("button", { type: "button", className: "modal__header-close", onClick: e, children: /* @__PURE__ */ c(He, { className: "modal__header-close-icon" }) })
    ]
  }
);
function Ne(t) {
  if (Array.isArray(t)) {
    for (var e = 0, o = Array(t.length); e < t.length; e++)
      o[e] = t[e];
    return o;
  } else
    return Array.from(t);
}
var fe = !1;
if (typeof window < "u") {
  var _e = {
    get passive() {
      fe = !0;
    }
  };
  window.addEventListener("testPassive", null, _e), window.removeEventListener("testPassive", null, _e);
}
var ie = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1), U = [], se = !1, ge = -1, ee = void 0, Z = void 0, te = void 0, pe = function(e) {
  return U.some(function(o) {
    return !!(o.options.allowTouchMove && o.options.allowTouchMove(e));
  });
}, de = function(e) {
  var o = e || window.event;
  return pe(o.target) || o.touches.length > 1 ? !0 : (o.preventDefault && o.preventDefault(), !1);
}, Xe = function(e) {
  if (te === void 0) {
    var o = !!e && e.reserveScrollBarGap === !0, n = window.innerWidth - document.documentElement.clientWidth;
    if (o && n > 0) {
      var a = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
      te = document.body.style.paddingRight, document.body.style.paddingRight = a + n + "px";
    }
  }
  ee === void 0 && (ee = document.body.style.overflow, document.body.style.overflow = "hidden");
}, Be = function() {
  te !== void 0 && (document.body.style.paddingRight = te, te = void 0), ee !== void 0 && (document.body.style.overflow = ee, ee = void 0);
}, De = function() {
  return window.requestAnimationFrame(function() {
    if (Z === void 0) {
      Z = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left
      };
      var e = window, o = e.scrollY, n = e.scrollX;
      document.body.style.position = "fixed", document.body.style.top = -o + "px", document.body.style.left = -n + "px";
    }
  });
}, Ie = function() {
  if (Z !== void 0) {
    var e = -parseInt(document.body.style.top, 10), o = -parseInt(document.body.style.left, 10);
    document.body.style.position = Z.position, document.body.style.top = Z.top, document.body.style.left = Z.left, window.scrollTo(o, e), Z = void 0;
  }
}, Oe = function(e) {
  return e ? e.scrollHeight - e.scrollTop <= e.clientHeight : !1;
}, We = function(e, o) {
  var n = e.targetTouches[0].clientY - ge;
  return pe(e.target) ? !1 : o && o.scrollTop === 0 && n > 0 || Oe(o) && n < 0 ? de(e) : (e.stopPropagation(), !0);
}, $e = function(e, o) {
  if (!e) {
    console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
    return;
  }
  if (!U.some(function(a) {
    return a.targetElement === e;
  })) {
    var n = {
      targetElement: e,
      options: o || {}
    };
    U = [].concat(Ne(U), [n]), ie ? De() : Xe(o), ie && (e.ontouchstart = function(a) {
      a.targetTouches.length === 1 && (ge = a.targetTouches[0].clientY);
    }, e.ontouchmove = function(a) {
      a.targetTouches.length === 1 && We(a, e);
    }, se || (document.addEventListener("touchmove", de, fe ? { passive: !1 } : void 0), se = !0));
  }
}, Ze = function(e) {
  if (!e) {
    console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
    return;
  }
  U = U.filter(function(o) {
    return o.targetElement !== e;
  }), ie && (e.ontouchstart = null, e.ontouchmove = null, se && U.length === 0 && (document.removeEventListener("touchmove", de, fe ? { passive: !1 } : void 0), se = !1)), ie ? Ie() : Be();
};
function Ue(t, e = !0) {
  if (!t) return () => null;
  const o = window.scrollY;
  return e && document.body.style.setProperty("top", `${o * -1}px`), $e(t, {
    // @ts-ignore
    allowTouchMove: (n) => {
      for (; n && n !== document.body; ) {
        if (n.getAttribute("body-scroll-lock-ignore") !== null)
          return !0;
        n = n.parentElement;
      }
    }
  }), () => {
    if (Ze(t), e && (document.body.style.setProperty("top", ""), document.body.scrollTo(0, o)), !e) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
  };
}
const je = "Escape";
function ht() {
  const t = X(/* @__PURE__ */ new Set()), [e, o] = oe([]), n = ae(() => e[e.length - 1], [e]);
  ce(() => {
    let s = !1;
    if (typeof document > "u" || !n) return;
    const l = n?.containerRef.current, m = n?.modalRef.current;
    function i(C) {
      s = !!(m && !m.contains(C.target));
    }
    function p(C) {
      const F = m && !m.contains(C.target);
      s && F && n.close(), s = !1;
    }
    function Y(C) {
      C.stopPropagation(), C.key == je && (n.close(), t.current.delete(n.key));
    }
    return l?.addEventListener("mousedown", i), l?.addEventListener("touchstart", i), l?.addEventListener("mouseup", p), l?.addEventListener("touchend", p), document.addEventListener("keydown", Y), () => {
      l?.removeEventListener("mousedown", i), l?.removeEventListener("touchstart", i), l?.removeEventListener("mouseup", p), l?.removeEventListener("touchend", p), document.removeEventListener("keydown", Y);
    };
  }, [n]);
  const a = J(
    (s) => {
      t.current.has(s.key) || (t.current.add(s.key), o((l) => e.findIndex((i) => i.key === s.key) !== -1 ? l : (s.enableScroll = Ue(
        s.scrollableContentRef.current || s.modalRef.current,
        !l.length
        // mark as first modal in stack
      ), [...l, s])));
    },
    [e]
  ), v = J((s) => {
    t.current.delete(s), o((l) => {
      const m = [...l], i = l.findIndex((p) => p.key === s);
      return i === -1 ? l : i === 0 ? (m.reverse().forEach((p) => p.enableScroll?.()), []) : (m[i].enableScroll?.(), m.splice(i, 1), m);
    });
  }, []), g = J(
    (s, l) => {
      if (!t.current.has(s)) return;
      const m = e.findIndex((i) => i.key === s);
      if (m > -1) {
        const i = [...e];
        i[m] = {
          ...i[m],
          ...l
        }, t.current.add(s), o(i);
      }
    },
    [e]
  );
  function x(s) {
    const l = e.findIndex((m) => m.key === s);
    return [l, l === e.length - 1];
  }
  return {
    lastModal: n,
    apply: a,
    remove: v,
    update: g,
    getPositionInStack: x
  };
}
const qe = Ee(void 0);
function Fe(t) {
  return Se(qe) ?? t;
}
const Ve = (t) => /* @__PURE__ */ z.createElement("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, /* @__PURE__ */ z.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0 12C0 5.37258 5.37258 0 12 0C12.8284 0 13.5 0.671573 13.5 1.5C13.5 2.32843 12.8284 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.1716 21.6716 10.5 22.5 10.5C23.3284 10.5 24 11.1716 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z", fill: "currentColor" })), ye = ({
  className: t,
  size: e = "md",
  text: o
}) => /* @__PURE__ */ q("div", { className: "flex h-full w-full flex-col items-center justify-center", children: [
  /* @__PURE__ */ c(
    Ve,
    {
      className: B("animate-spin", {
        "h-5 w-5": e === "sm",
        "h-8 w-8": e === "md",
        "h-12 w-12": e === "lg",
        "text-green-500": !t,
        [t || ""]: t
      })
    }
  ),
  o && /* @__PURE__ */ c(
    "span",
    {
      className: B("text-gray-250", {
        "py-4 text-sm": e === "sm",
        "py-6": e === "md"
      }),
      children: o
    }
  ),
  /* @__PURE__ */ c("span", { className: "sr-only", children: "Loading..." })
] });
function he({
  fullWidth: t = !1,
  type: e = "button",
  size: o = "md",
  disabled: n = !1,
  loading: a = !1,
  loadingText: v,
  variant: g = "light",
  onClick: x,
  children: s
}) {
  return /* @__PURE__ */ c(
    "button",
    {
      className: B("btn", `btn--variant-${g}`, `btn--size-${o}`, {
        "btn--fullwidth": t,
        "btn--loading": a,
        "btn--icon": o === "icon",
        "btn--flex": a && g !== "none",
        "btn--disabled": n || a
      }),
      disabled: n || a,
      type: e || "button",
      onClick: x,
      children: a && g !== "none" ? /* @__PURE__ */ q(Ce, { children: [
        /* @__PURE__ */ c(ye, { className: B("btn__loader", `btn__loader--variant-${g}`) }),
        v && /* @__PURE__ */ c("span", { className: "btn__loading-text", children: v })
      ] }) : s
    }
  );
}
function Ge({
  title: t,
  description: e,
  variant: o = "danger",
  isLoading: n = !1,
  onConfirm: a,
  onClose: v
}) {
  function g() {
    a(), v();
  }
  return /* @__PURE__ */ c(
    dt,
    {
      id: "confirm-action-modal",
      ariaLabel: "Aria label",
      type: "overlay-auto",
      size: "sm",
      headerRenderer: () => /* @__PURE__ */ c("h3", { className: "modal-confirm__title", children: t }),
      footerRenderer: (x) => /* @__PURE__ */ q("div", { className: "modal-confirm__footer", children: [
        /* @__PURE__ */ c(
          he,
          {
            fullWidth: !0,
            type: "button",
            variant: o,
            loading: n,
            onClick: g,
            children: "Confirm"
          }
        ),
        /* @__PURE__ */ c(
          he,
          {
            fullWidth: !0,
            type: "button",
            variant: "light",
            disabled: n,
            onClick: x,
            children: "Cancel"
          }
        )
      ] }),
      onClose: v,
      children: e && /* @__PURE__ */ c("p", { className: "modal-confirm__description", children: e })
    }
  );
}
function be() {
  return ke({
    query: "(min-width: 576px)"
  });
}
const Ke = typeof document < "u" ? me : ce;
function Qe({
  isLoading: t = !1,
  id: e,
  type: o,
  horizontalSwipe: n,
  stackCtx: a,
  modalRef: v,
  modalHeaderRef: g,
  scrollAreaRef: x,
  onClose: s
}) {
  const l = be(), [m, i] = oe({
    isMoving: !1,
    scrollDisabled: !1,
    transitionEnabled: !0,
    transition: "none",
    transform: "none",
    opacity: 1
  }), [p, Y] = oe(!1);
  Ke(() => {
    const _ = v.current;
    if (!_ || l) return;
    const h = (o === "base" || o === "fullscreen") && n, E = g.current;
    let d = 0, R = 0, D = 0, j = 0, I = !1, M = !1, O = 0, S = !1;
    const V = (r) => {
      const L = r.changedTouches[0].clientX - D, b = r.changedTouches[0].clientY - R, A = Math.sign(L), H = Math.sign(b), $ = Math.abs(L / window.innerWidth), P = Math.abs(b / window.innerHeight);
      return {
        directionX: A,
        directionY: H,
        factorX: $,
        factorY: P
      };
    }, ne = (r) => {
      if (r.touches.length !== 1) return;
      const L = r.touches[0];
      D = L.clientX, R = L.clientY, I = !0, M = !1, j = (/* @__PURE__ */ new Date()).getTime(), O = (/* @__PURE__ */ new Date()).getTime();
      const { isTop: b } = C();
      S = b;
    };
    function y() {
      d = 0, R = 0, D = 0, j = 0, I = !1, M = !1, O = 0, S = !1;
    }
    function re() {
      Y(!0), y(), setTimeout(() => {
        a?.remove(e), s();
      }, 150);
    }
    function G() {
      re(), i((r) => ({
        ...r,
        transitionEnabled: !0,
        transition: "transform 0.18s, opacity 0.18s",
        transform: "translateX(100%)",
        opacity: 0
      }));
    }
    function ue() {
      i((r) => ({
        ...r,
        isMoving: !1,
        scrollDisabled: !1,
        transitionEnabled: !0,
        transition: "transform 0.15s, opacity 0.15s",
        transform: "translateX(0)",
        opacity: 1
      }));
    }
    function K() {
      re(), i((r) => ({
        ...r,
        transitionEnabled: !0,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        transform: "translateY(100%)",
        opacity: 0
      }));
    }
    function T() {
      i((r) => ({
        ...r,
        transitionEnabled: !0,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        transform: "translateY(0)",
        opacity: 1
      }));
    }
    function W() {
      i((r) => ({
        ...r,
        isMoving: !1,
        scrollDisabled: !0,
        transitionEnabled: !1,
        transition: "none",
        transform: "translateX(0)",
        opacity: 1
      }));
    }
    function Q() {
      i((r) => ({
        ...r,
        isMoving: !0,
        scrollDisabled: !0,
        transitionEnabled: !1,
        transition: "none",
        transform: "translateY(0)",
        opacity: 1
      }));
    }
    const k = (r) => {
      if (r.target.closest("[horizontal-scroll-inside-modal]") || !I) return;
      const { directionY: b, factorY: A, directionX: H, factorX: $ } = V(r);
      if (d = r.touches[0].clientY, h) {
        if (!M && (/* @__PURE__ */ new Date()).getTime() - O > 150) return;
        if (M = !0, H === -1) {
          W();
          return;
        }
        if ($ > A) {
          const w = r.changedTouches[0].clientX - D;
          i({
            isMoving: !0,
            scrollDisabled: !0,
            transitionEnabled: !1,
            transition: "none",
            transform: `translateX(${w}px)`,
            opacity: 1
          });
          return;
        } else
          W();
        return;
      }
      if (o === "base" || o === "fullscreen") return;
      const P = E ? r.target === E || E.contains(r.target) : !1;
      if (!M && (/* @__PURE__ */ new Date()).getTime() - O > 150) return;
      if (M = !0, !S && !P) {
        Q();
        return;
      }
      if (b === -1) {
        Q();
        return;
      }
      const f = r.changedTouches[0].clientY - R;
      i((w) => ({
        ...w,
        transitionEnabled: !1,
        transform: `translateY(${f}px)`,
        transition: "none"
      }));
    }, le = (r) => {
      const { directionX: L, factorX: b, directionY: A, factorY: H } = V(r);
      if (h) {
        L === 1 && b > 0.25 && ((/* @__PURE__ */ new Date()).getTime() - O < 250 || b > 0.8) ? G() : ue(), y();
        return;
      }
      if (o === "base" || o === "fullscreen") return;
      if (!S) {
        const we = E ? r.target === E || E.contains(r.target) : !1;
        A === 1 && H > 0.25 && we ? K() : T(), y();
        return;
      }
      if (A === -1) {
        T(), y();
        return;
      }
      const { isScrollable: $, isTop: P } = C();
      if ($ && !P) {
        T(), y();
        return;
      }
      if (R > d) {
        T(), y();
        return;
      }
      const w = (/* @__PURE__ */ new Date()).getTime() - j, N = (d - R) / (v.current?.clientHeight || 0);
      P && N > 0.25 && w < 250 && w < 500 || w > 500 && w < 1200 && H > 0.2 ? (K(), y()) : (T(), y());
    };
    return _.addEventListener("touchstart", ne, {
      passive: !0
    }), _.addEventListener("touchmove", k, { passive: !0 }), _.addEventListener("touchend", le, { passive: !0 }), () => {
      _.removeEventListener("touchstart", ne), _.removeEventListener("touchmove", k), _.removeEventListener("touchend", le);
    };
  }, [t, o, l, a?.lastModal]);
  function C() {
    let _ = !1;
    const h = x.current;
    h && (_ = h.scrollHeight > h.clientHeight);
    let E = !0;
    h && (E = h.scrollTop === 0);
    let d = !0;
    return h && (d = h.scrollTop + h.clientHeight === h.scrollHeight), { isScrollable: _, isTop: E, isBottom: d };
  }
  function F() {
    Le(() => {
      Y(!0), i((_) => ({
        ..._,
        transitionEnabled: !0,
        transform: "translateY(100%)",
        transition: "transform 0.12s ease-out, opacity 0.12s ease-out",
        opacity: 0
      }));
    }), setTimeout(
      () => {
        a?.remove(e), s();
      },
      l ? 0 : 200
    );
  }
  return {
    transformState: m,
    closeAnimation: p,
    handleClose: F
  };
}
const ze = "_modal__container_l8go6_1", Je = "_modal__main_l8go6_39", et = "_modal__header_l8go6_148", tt = "_modal__body_l8go6_153", ot = "_modal__loader_l8go6_166", nt = "_modal__footer_l8go6_175", rt = "_slideUp90_l8go6_1", lt = "_slideUp95_l8go6_1", at = "_slideRight_l8go6_1", it = "_modal__backdrop_l8go6_201", u = {
  modal__container: ze,
  "modal__container--fullscreen": "_modal__container--fullscreen_l8go6_15",
  "modal__container--menu": "_modal__container--menu_l8go6_19",
  "modal__container--overlay-90": "_modal__container--overlay-90_l8go6_20",
  "modal__container--overlay-95": "_modal__container--overlay-95_l8go6_21",
  "modal__container--overlay-auto": "_modal__container--overlay-auto_l8go6_22",
  "modal__safe-top": "_modal__safe-top_l8go6_35",
  modal__main: Je,
  "modal__main--fullscreen": "_modal__main--fullscreen_l8go6_48",
  "modal__main--menu": "_modal__main--menu_l8go6_55",
  "modal__main--overlay-90": "_modal__main--overlay-90_l8go6_70",
  "modal__main--overlay-95": "_modal__main--overlay-95_l8go6_71",
  "modal__main--overlay-auto": "_modal__main--overlay-auto_l8go6_72",
  "modal__main--base": "_modal__main--base_l8go6_94",
  "modal__main--sm": "_modal__main--sm_l8go6_109",
  "modal__main--md": "_modal__main--md_l8go6_116",
  "modal__main--lg": "_modal__main--lg_l8go6_123",
  "modal__main--2xl": "_modal__main--2xl_l8go6_130",
  "modal__main--3xl": "_modal__main--3xl_l8go6_137",
  "modal__main--opacity-0": "_modal__main--opacity-0_l8go6_144",
  modal__header: et,
  modal__body: tt,
  "modal__scroll-area": "_modal__scroll-area_l8go6_161",
  modal__loader: ot,
  modal__footer: nt,
  "modal__main--animate-slide-up-90": "_modal__main--animate-slide-up-90_l8go6_191",
  slideUp90: rt,
  "modal__main--animate-slide-up-95": "_modal__main--animate-slide-up-95_l8go6_194",
  slideUp95: lt,
  "modal__main--animate-slide-right": "_modal__main--animate-slide-right_l8go6_197",
  slideRight: at,
  modal__backdrop: it,
  "modal__backdrop--hidden": "_modal__backdrop--hidden_l8go6_217"
};
function st({
  id: t,
  scrollAreaId: e,
  children: o,
  ariaLabel: n,
  title: a,
  onClose: v,
  loadingText: g,
  horizontalSwipe: x = !1,
  confirmClose: s = !1,
  isLoading: l = !1,
  isPortal: m = !0,
  mobileSafeTop: i = !0,
  preventClose: p = !1,
  bgColorClass: Y,
  confirmTitle: C = "Are you sure?",
  confirmDescription: F = "Are you sure you want to close this dialog?",
  headerRenderer: _,
  footerRenderer: h,
  fallbackCtx: E,
  type: d = "base",
  size: R = "md"
}) {
  const D = Fe(E), j = X(null), I = X(null), M = X(null), O = X(null), S = X(null), V = X(null), ne = be(), y = x && (d === "base" || d === "fullscreen"), [re, G] = oe(!1), [ue, K] = oe(O.current?.clientHeight), { closeAnimation: T, transformState: W, handleClose: Q } = Qe({
    id: t,
    modalRef: I,
    modalHeaderRef: M,
    scrollAreaRef: S,
    onClose: v,
    type: d ?? "base",
    isLoading: l ?? !1,
    horizontalSwipe: x ?? !1,
    stackCtx: D
  }), k = J(() => {
    if (!p) {
      if (s) {
        G(!0);
        return;
      }
      Q();
    }
  }, [s]), le = J(() => {
    G(!1), Q();
  }, []);
  me(() => {
    const f = t;
    D?.apply({
      key: f,
      simpleBarRef: V,
      containerRef: j,
      modalRef: I,
      scrollableContentRef: S,
      close: k
    });
  }, []), me(() => {
    if (!S.current) return;
    const f = new ResizeObserver(() => {
      K(S.current?.clientHeight);
    });
    return f.observe(S.current), () => f.disconnect();
  }, []), ce(() => {
    const f = document.querySelector('meta[name="theme-color"]');
    let w = null, N = f;
    return f ? (w = f.getAttribute("content"), f.setAttribute("content", "#000000")) : (N = document.createElement("meta"), N.name = "theme-color", N.content = "#000000", document.head.appendChild(N)), () => {
      w !== null ? N?.setAttribute("content", w) : N?.remove();
    };
  }, []);
  const r = ae(() => _ ? _(k) : null, [_, k]), L = !l && (y || r) ? /* @__PURE__ */ c("div", { ref: M, className: u.modal__header, children: r }) : /* @__PURE__ */ c("div", { ref: M, className: u.modal__header, children: /* @__PURE__ */ c(Pe, { label: a || void 0, onClose: k }) }), b = ae(() => h ? h(k) : null, [h, k]), A = !l && b ? /* @__PURE__ */ c("footer", { className: u.modal__footer, children: b }) : null, H = B(u.modal__container, {
    [u["modal__container--fullscreen"]]: d === "fullscreen",
    [u["modal__container--menu"]]: d === "menu",
    [u["modal__container--overlay-90"]]: d === "overlay-90",
    [u["modal__container--overlay-95"]]: d === "overlay-95",
    [u["modal__container--overlay-auto"]]: d === "overlay-auto",
    [u["modal__safe-top"]]: d !== "fullscreen" && i
  }), $ = B(u.modal__main, u[`modal__main--${d}`], {
    [u[`modal__main--${R}`]]: d !== "fullscreen",
    [u["modal__main--opacity-0"]]: !ue,
    [u["modal__main--animate-slide-up-90"]]: !T && (d === "menu" || d === "overlay-90" || d === "overlay-auto"),
    [u["modal__main--animate-slide-up-95"]]: !T && d === "overlay-95",
    [u["modal__main--animate-slide-right"]]: !T && (d === "fullscreen" || d === "base"),
    [Y]: !!Y
  });
  function P(f) {
    return m ? /* @__PURE__ */ c(Ye, { children: f }) : f;
  }
  return P(
    /* @__PURE__ */ q(
      "div",
      {
        id: t,
        ref: j,
        role: "dialog",
        "aria-labelledby": n || t,
        "aria-modal": "true",
        className: H,
        children: [
          /* @__PURE__ */ q(
            "div",
            {
              ref: I,
              className: $,
              style: ne ? {
                // Patch for Safari browser
                maskImage: "-webkit-radial-gradient(white, black)"
              } : {
                willChange: "transform opacity",
                transition: W.transitionEnabled ? W.transition : "none",
                transform: W.transform,
                opacity: W.opacity
              },
              onClick: (f) => f.stopPropagation(),
              children: [
                L,
                /* @__PURE__ */ c("div", { className: u.modal__body, children: /* @__PURE__ */ c(
                  xe,
                  {
                    id: e,
                    className: u["modal__scroll-area"],
                    ref: V,
                    scrollableNodeProps: { ref: S },
                    children: l ? /* @__PURE__ */ c("div", { className: u.modal__loader, children: /* @__PURE__ */ c(ye, { text: g }) }) : o
                  }
                ) }),
                A
              ]
            }
          ),
          re && /* @__PURE__ */ c(
            Ge,
            {
              title: C,
              description: F,
              onConfirm: le,
              onClose: () => G(!1)
            }
          ),
          /* @__PURE__ */ c(
            "div",
            {
              className: B(u.modal__backdrop, {
                [u["modal__backdrop--hidden"]]: T && d !== "fullscreen" || T && y
              }),
              style: {
                willChange: "opacity"
              }
            }
          )
        ]
      }
    )
  );
}
const dt = Te(st);
export {
  dt as Modal,
  Fe as useModal,
  ht as useModalStackCtx
};
