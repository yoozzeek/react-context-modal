import { jsxs as q, jsx as d, Fragment as Ce } from "react/jsx-runtime";
import * as z from "react";
import { useRef as X, useMemo as le, useEffect as de, useState as ne, useCallback as J, createContext as Ee, useContext as Se, useLayoutEffect as me, memo as Te } from "react";
import xe from "simplebar-react";
import { createPortal as Me, flushSync as Le } from "react-dom";
import { useMediaQuery as ke } from "react-responsive";
function ve(t) {
  var e, n, o = "";
  if (typeof t == "string" || typeof t == "number") o += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var l = t.length;
    for (e = 0; e < l; e++) t[e] && (n = ve(t[e])) && (o && (o += " "), o += n);
  } else for (n in t) t[n] && (o && (o += " "), o += n);
  return o;
}
function B() {
  for (var t, e, n = 0, o = "", l = arguments.length; n < l; n++) (t = arguments[n]) && (e = ve(t)) && (o && (o += " "), o += e);
  return o;
}
const Ye = ({ children: t }) => {
  const e = X(document.createElement("div")), n = le(
    () => document.querySelector("#rcm-modal-portal"),
    []
  );
  return de(() => {
    const o = e.current;
    return n.appendChild(o), () => void n.removeChild(o);
  }, []), Me(t, n);
}, Re = "rcm-modal__header", Ae = {
  modal__header: Re
}, He = (t) => /* @__PURE__ */ z.createElement("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, /* @__PURE__ */ z.createElement("path", { d: "M14.9498 6.46443C15.3403 6.07391 15.3403 5.44074 14.9498 5.05022C14.5593 4.65969 13.9261 4.65969 13.5356 5.05022L14.9498 6.46443ZM5.05029 13.5355C4.65976 13.926 4.65976 14.5592 5.05029 14.9497C5.44081 15.3402 6.07398 15.3402 6.4645 14.9497L5.05029 13.5355ZM13.5356 5.05022L5.05029 13.5355L6.4645 14.9497L14.9498 6.46443L13.5356 5.05022Z", fill: "currentColor" }), /* @__PURE__ */ z.createElement("path", { d: "M13.5356 14.9498C13.9261 15.3403 14.5593 15.3403 14.9498 14.9498C15.3403 14.5593 15.3403 13.9261 14.9498 13.5356L13.5356 14.9498ZM6.4645 5.05029C6.07398 4.65976 5.44081 4.65976 5.05029 5.05029C4.65976 5.44081 4.65976 6.07398 5.05029 6.4645L6.4645 5.05029ZM14.9498 13.5356L6.4645 5.05029L5.05029 6.4645L13.5356 14.9498L14.9498 13.5356Z", fill: "currentColor" })), Pe = ({ label: t, onClose: e }) => /* @__PURE__ */ q(
  "header",
  {
    className: B(Ae.modal__header, "modal__header--with-bar", {
      "modal__header--with-label": !!t,
      "modal__header--no-label": !t
    }),
    children: [
      t && /* @__PURE__ */ d("h4", { className: "modal__header-title", children: t }),
      /* @__PURE__ */ d("button", { type: "button", className: "modal__header-close", onClick: e, children: /* @__PURE__ */ d(He, { className: "modal__header-close-icon" }) })
    ]
  }
);
function Ne(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++)
      n[e] = t[e];
    return n;
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
var ie = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1), U = [], se = !1, pe = -1, ee = void 0, Z = void 0, te = void 0, ye = function(e) {
  return U.some(function(n) {
    return !!(n.options.allowTouchMove && n.options.allowTouchMove(e));
  });
}, ce = function(e) {
  var n = e || window.event;
  return ye(n.target) || n.touches.length > 1 ? !0 : (n.preventDefault && n.preventDefault(), !1);
}, Xe = function(e) {
  if (te === void 0) {
    var n = !!e && e.reserveScrollBarGap === !0, o = window.innerWidth - document.documentElement.clientWidth;
    if (n && o > 0) {
      var l = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
      te = document.body.style.paddingRight, document.body.style.paddingRight = l + o + "px";
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
      var e = window, n = e.scrollY, o = e.scrollX;
      document.body.style.position = "fixed", document.body.style.top = -n + "px", document.body.style.left = -o + "px";
    }
  });
}, Ie = function() {
  if (Z !== void 0) {
    var e = -parseInt(document.body.style.top, 10), n = -parseInt(document.body.style.left, 10);
    document.body.style.position = Z.position, document.body.style.top = Z.top, document.body.style.left = Z.left, window.scrollTo(n, e), Z = void 0;
  }
}, Oe = function(e) {
  return e ? e.scrollHeight - e.scrollTop <= e.clientHeight : !1;
}, We = function(e, n) {
  var o = e.targetTouches[0].clientY - pe;
  return ye(e.target) ? !1 : n && n.scrollTop === 0 && o > 0 || Oe(n) && o < 0 ? ce(e) : (e.stopPropagation(), !0);
}, $e = function(e, n) {
  if (!e) {
    console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
    return;
  }
  if (!U.some(function(l) {
    return l.targetElement === e;
  })) {
    var o = {
      targetElement: e,
      options: n || {}
    };
    U = [].concat(Ne(U), [o]), ie ? De() : Xe(n), ie && (e.ontouchstart = function(l) {
      l.targetTouches.length === 1 && (pe = l.targetTouches[0].clientY);
    }, e.ontouchmove = function(l) {
      l.targetTouches.length === 1 && We(l, e);
    }, se || (document.addEventListener("touchmove", ce, fe ? { passive: !1 } : void 0), se = !0));
  }
}, Ze = function(e) {
  if (!e) {
    console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
    return;
  }
  U = U.filter(function(n) {
    return n.targetElement !== e;
  }), ie && (e.ontouchstart = null, e.ontouchmove = null, se && U.length === 0 && (document.removeEventListener("touchmove", ce, fe ? { passive: !1 } : void 0), se = !1)), ie ? Ie() : Be();
};
function Ue(t, e = !0) {
  if (!t) return () => null;
  const n = window.scrollY;
  return e && document.body.style.setProperty("top", `${n * -1}px`), $e(t, {
    // @ts-ignore
    allowTouchMove: (o) => {
      for (; o && o !== document.body; ) {
        if (o.getAttribute("body-scroll-lock-ignore") !== null)
          return !0;
        o = o.parentElement;
      }
    }
  }), () => {
    if (Ze(t), e && (document.body.style.setProperty("top", ""), document.body.scrollTo(0, n)), !e) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
  };
}
const je = "Escape";
function ht() {
  const t = X(/* @__PURE__ */ new Set()), [e, n] = ne([]), o = le(() => e[e.length - 1], [e]);
  de(() => {
    let s = !1;
    if (typeof document > "u" || !o) return;
    const a = o?.containerRef.current, m = o?.modalRef.current;
    function i(C) {
      s = !!(m && !m.contains(C.target));
    }
    function y(C) {
      const F = m && !m.contains(C.target);
      s && F && o.close(), s = !1;
    }
    function Y(C) {
      C.stopPropagation(), C.key == je && (o.close(), t.current.delete(o.key));
    }
    return a?.addEventListener("mousedown", i), a?.addEventListener("touchstart", i), a?.addEventListener("mouseup", y), a?.addEventListener("touchend", y), document.addEventListener("keydown", Y), () => {
      a?.removeEventListener("mousedown", i), a?.removeEventListener("touchstart", i), a?.removeEventListener("mouseup", y), a?.removeEventListener("touchend", y), document.removeEventListener("keydown", Y);
    };
  }, [o]);
  const l = J(
    (s) => {
      t.current.has(s.key) || (t.current.add(s.key), n((a) => e.findIndex((i) => i.key === s.key) !== -1 ? a : (s.enableScroll = Ue(
        s.scrollableContentRef.current || s.modalRef.current,
        !a.length
        // mark as first modal in stack
      ), [...a, s])));
    },
    [e]
  ), v = J((s) => {
    t.current.delete(s), n((a) => {
      const m = [...a], i = a.findIndex((y) => y.key === s);
      return i === -1 ? a : i === 0 ? (m.reverse().forEach((y) => y.enableScroll?.()), []) : (m[i].enableScroll?.(), m.splice(i, 1), m);
    });
  }, []), p = J(
    (s, a) => {
      if (!t.current.has(s)) return;
      const m = e.findIndex((i) => i.key === s);
      if (m > -1) {
        const i = [...e];
        i[m] = {
          ...i[m],
          ...a
        }, t.current.add(s), n(i);
      }
    },
    [e]
  );
  function x(s) {
    const a = e.findIndex((m) => m.key === s);
    return [a, a === e.length - 1];
  }
  return {
    lastModal: o,
    apply: l,
    remove: v,
    update: p,
    getPositionInStack: x
  };
}
const qe = Ee(void 0);
function Fe(t) {
  return Se(qe) ?? t;
}
const Ve = (t) => /* @__PURE__ */ z.createElement("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, /* @__PURE__ */ z.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0 12C0 5.37258 5.37258 0 12 0C12.8284 0 13.5 0.671573 13.5 1.5C13.5 2.32843 12.8284 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.1716 21.6716 10.5 22.5 10.5C23.3284 10.5 24 11.1716 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z", fill: "currentColor" })), be = ({
  className: t,
  size: e = "md",
  text: n
}) => /* @__PURE__ */ q("div", { className: "flex h-full w-full flex-col items-center justify-center", children: [
  /* @__PURE__ */ d(
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
  n && /* @__PURE__ */ d(
    "span",
    {
      className: B("text-gray-250", {
        "py-4 text-sm": e === "sm",
        "py-6": e === "md"
      }),
      children: n
    }
  ),
  /* @__PURE__ */ d("span", { className: "sr-only", children: "Loading..." })
] });
function he({
  fullWidth: t = !1,
  type: e = "button",
  size: n = "md",
  disabled: o = !1,
  loading: l = !1,
  loadingText: v,
  variant: p = "light",
  onClick: x,
  children: s
}) {
  return /* @__PURE__ */ d(
    "button",
    {
      className: B("btn", `btn--variant-${p}`, `btn--size-${n}`, {
        "btn--fullwidth": t,
        "btn--loading": l,
        "btn--icon": n === "icon",
        "btn--flex": l && p !== "none",
        "btn--disabled": o || l
      }),
      disabled: o || l,
      type: e || "button",
      onClick: x,
      children: l && p !== "none" ? /* @__PURE__ */ q(Ce, { children: [
        /* @__PURE__ */ d(be, { className: B("btn__loader", `btn__loader--variant-${p}`) }),
        v && /* @__PURE__ */ d("span", { className: "btn__loading-text", children: v })
      ] }) : s
    }
  );
}
function Ge({
  title: t,
  description: e,
  variant: n = "danger",
  isLoading: o = !1,
  onConfirm: l,
  onClose: v
}) {
  function p() {
    l(), v();
  }
  return /* @__PURE__ */ d(
    ct,
    {
      id: "confirm-action-modal",
      ariaLabel: "Aria label",
      type: "overlay-auto",
      size: "sm",
      headerRenderer: () => /* @__PURE__ */ d("h3", { className: "modal-confirm__title", children: t }),
      footerRenderer: (x) => /* @__PURE__ */ q("div", { className: "modal-confirm__footer", children: [
        /* @__PURE__ */ d(
          he,
          {
            fullWidth: !0,
            type: "button",
            variant: n,
            loading: o,
            onClick: p,
            children: "Confirm"
          }
        ),
        /* @__PURE__ */ d(
          he,
          {
            fullWidth: !0,
            type: "button",
            variant: "light",
            disabled: o,
            onClick: x,
            children: "Cancel"
          }
        )
      ] }),
      onClose: v,
      children: e && /* @__PURE__ */ d("p", { className: "modal-confirm__description", children: e })
    }
  );
}
function ge() {
  return ke({
    query: "(min-width: 576px)"
  });
}
const Ke = typeof document < "u" ? me : de;
function Qe({
  isLoading: t = !1,
  id: e,
  type: n,
  horizontalSwipe: o,
  stackCtx: l,
  modalRef: v,
  modalHeaderRef: p,
  scrollAreaRef: x,
  onClose: s
}) {
  const a = ge(), [m, i] = ne({
    isMoving: !1,
    scrollDisabled: !1,
    transitionEnabled: !0,
    transition: "none",
    transform: "none",
    opacity: 1
  }), [y, Y] = ne(!1);
  Ke(() => {
    const _ = v.current;
    if (!_ || a) return;
    const h = (n === "base" || n === "fullscreen") && o, E = p.current;
    let c = 0, R = 0, D = 0, j = 0, I = !1, M = !1, O = 0, S = !1;
    const V = (r) => {
      const L = r.changedTouches[0].clientX - D, g = r.changedTouches[0].clientY - R, A = Math.sign(L), H = Math.sign(g), $ = Math.abs(L / window.innerWidth), P = Math.abs(g / window.innerHeight);
      return {
        directionX: A,
        directionY: H,
        factorX: $,
        factorY: P
      };
    }, oe = (r) => {
      if (r.touches.length !== 1) return;
      const L = r.touches[0];
      D = L.clientX, R = L.clientY, I = !0, M = !1, j = (/* @__PURE__ */ new Date()).getTime(), O = (/* @__PURE__ */ new Date()).getTime();
      const { isTop: g } = C();
      S = g;
    };
    function b() {
      c = 0, R = 0, D = 0, j = 0, I = !1, M = !1, O = 0, S = !1;
    }
    function re() {
      Y(!0), b(), setTimeout(() => {
        l?.remove(e), s();
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
      const { directionY: g, factorY: A, directionX: H, factorX: $ } = V(r);
      if (c = r.touches[0].clientY, h) {
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
      if (n === "base" || n === "fullscreen") return;
      const P = E ? r.target === E || E.contains(r.target) : !1;
      if (!M && (/* @__PURE__ */ new Date()).getTime() - O > 150) return;
      if (M = !0, !S && !P) {
        Q();
        return;
      }
      if (g === -1) {
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
    }, ae = (r) => {
      const { directionX: L, factorX: g, directionY: A, factorY: H } = V(r);
      if (h) {
        L === 1 && g > 0.25 && ((/* @__PURE__ */ new Date()).getTime() - O < 250 || g > 0.8) ? G() : ue(), b();
        return;
      }
      if (n === "base" || n === "fullscreen") return;
      if (!S) {
        const we = E ? r.target === E || E.contains(r.target) : !1;
        A === 1 && H > 0.25 && we ? K() : T(), b();
        return;
      }
      if (A === -1) {
        T(), b();
        return;
      }
      const { isScrollable: $, isTop: P } = C();
      if ($ && !P) {
        T(), b();
        return;
      }
      if (R > c) {
        T(), b();
        return;
      }
      const w = (/* @__PURE__ */ new Date()).getTime() - j, N = (c - R) / (v.current?.clientHeight || 0);
      P && N > 0.25 && w < 250 && w < 500 || w > 500 && w < 1200 && H > 0.2 ? (K(), b()) : (T(), b());
    };
    return _.addEventListener("touchstart", oe, {
      passive: !0
    }), _.addEventListener("touchmove", k, { passive: !0 }), _.addEventListener("touchend", ae, { passive: !0 }), () => {
      _.removeEventListener("touchstart", oe), _.removeEventListener("touchmove", k), _.removeEventListener("touchend", ae);
    };
  }, [t, n, a, l?.lastModal]);
  function C() {
    let _ = !1;
    const h = x.current;
    h && (_ = h.scrollHeight > h.clientHeight);
    let E = !0;
    h && (E = h.scrollTop === 0);
    let c = !0;
    return h && (c = h.scrollTop + h.clientHeight === h.scrollHeight), { isScrollable: _, isTop: E, isBottom: c };
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
        l?.remove(e), s();
      },
      a ? 0 : 200
    );
  }
  return {
    transformState: m,
    closeAnimation: y,
    handleClose: F
  };
}
const ze = "rcm-modal__container", Je = "rcm-modal__main", et = "rcm-modal__header", tt = "rcm-modal__body", nt = "rcm-modal__loader", ot = "rcm-modal__footer", rt = "rcm-slideUp90", at = "rcm-slideUp95", lt = "rcm-slideRight", it = "rcm-modal__backdrop", u = {
  modal__container: ze,
  "modal__container--fullscreen": "rcm-modal__container--fullscreen",
  "modal__container--menu": "rcm-modal__container--menu",
  "modal__container--overlay-90": "rcm-modal__container--overlay-90",
  "modal__container--overlay-95": "rcm-modal__container--overlay-95",
  "modal__container--overlay-auto": "rcm-modal__container--overlay-auto",
  "modal__safe-top": "rcm-modal__safe-top",
  modal__main: Je,
  "modal__main--fullscreen": "rcm-modal__main--fullscreen",
  "modal__main--menu": "rcm-modal__main--menu",
  "modal__main--overlay-90": "rcm-modal__main--overlay-90",
  "modal__main--overlay-95": "rcm-modal__main--overlay-95",
  "modal__main--overlay-auto": "rcm-modal__main--overlay-auto",
  "modal__main--base": "rcm-modal__main--base",
  "modal__main--sm": "rcm-modal__main--sm",
  "modal__main--md": "rcm-modal__main--md",
  "modal__main--lg": "rcm-modal__main--lg",
  "modal__main--2xl": "rcm-modal__main--2xl",
  "modal__main--3xl": "rcm-modal__main--3xl",
  "modal__main--opacity-0": "rcm-modal__main--opacity-0",
  modal__header: et,
  modal__body: tt,
  "modal__scroll-area": "rcm-modal__scroll-area",
  modal__loader: nt,
  modal__footer: ot,
  "modal__main--animate-slide-up-90": "rcm-modal__main--animate-slide-up-90",
  slideUp90: rt,
  "modal__main--animate-slide-up-95": "rcm-modal__main--animate-slide-up-95",
  slideUp95: at,
  "modal__main--animate-slide-right": "rcm-modal__main--animate-slide-right",
  slideRight: lt,
  modal__backdrop: it,
  "modal__backdrop--hidden": "rcm-modal__backdrop--hidden"
};
function st({
  id: t,
  scrollAreaId: e,
  children: n,
  ariaLabel: o,
  title: l,
  onClose: v,
  loadingText: p,
  horizontalSwipe: x = !1,
  confirmClose: s = !1,
  isLoading: a = !1,
  isPortal: m = !0,
  mobileSafeTop: i = !0,
  preventClose: y = !1,
  bgColorClass: Y,
  confirmTitle: C = "Are you sure?",
  confirmDescription: F = "Are you sure you want to close this dialog?",
  headerRenderer: _,
  footerRenderer: h,
  fallbackCtx: E,
  type: c = "base",
  size: R = "md"
}) {
  const D = Fe(E), j = X(null), I = X(null), M = X(null), O = X(null), S = X(null), V = X(null), oe = ge(), b = x && (c === "base" || c === "fullscreen"), [re, G] = ne(!1), [ue, K] = ne(O.current?.clientHeight), { closeAnimation: T, transformState: W, handleClose: Q } = Qe({
    id: t,
    modalRef: I,
    modalHeaderRef: M,
    scrollAreaRef: S,
    onClose: v,
    type: c ?? "base",
    isLoading: a ?? !1,
    horizontalSwipe: x ?? !1,
    stackCtx: D
  }), k = J(() => {
    if (!y) {
      if (s) {
        G(!0);
        return;
      }
      Q();
    }
  }, [s]), ae = J(() => {
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
  }, []), de(() => {
    const f = document.querySelector('meta[name="theme-color"]');
    let w = null, N = f;
    return f ? (w = f.getAttribute("content"), f.setAttribute("content", "#000000")) : (N = document.createElement("meta"), N.name = "theme-color", N.content = "#000000", document.head.appendChild(N)), () => {
      w !== null ? N?.setAttribute("content", w) : N?.remove();
    };
  }, []);
  const r = le(() => _ ? _(k) : null, [_, k]), L = !a && (b || r) ? /* @__PURE__ */ d("div", { ref: M, className: u.modal__header, children: r }) : /* @__PURE__ */ d("div", { ref: M, className: u.modal__header, children: /* @__PURE__ */ d(Pe, { label: l || void 0, onClose: k }) }), g = le(() => h ? h(k) : null, [h, k]), A = !a && g ? /* @__PURE__ */ d("footer", { className: u.modal__footer, children: g }) : null, H = B(u.modal__container, {
    [u["modal__container--fullscreen"]]: c === "fullscreen",
    [u["modal__container--menu"]]: c === "menu",
    [u["modal__container--overlay-90"]]: c === "overlay-90",
    [u["modal__container--overlay-95"]]: c === "overlay-95",
    [u["modal__container--overlay-auto"]]: c === "overlay-auto",
    [u["modal__safe-top"]]: c !== "fullscreen" && i
  }), $ = B(u.modal__main, u[`modal__main--${c}`], {
    [u[`modal__main--${R}`]]: c !== "fullscreen",
    [u["modal__main--opacity-0"]]: !ue,
    [u["modal__main--animate-slide-up-90"]]: !T && (c === "menu" || c === "overlay-90" || c === "overlay-auto"),
    [u["modal__main--animate-slide-up-95"]]: !T && c === "overlay-95",
    [u["modal__main--animate-slide-right"]]: !T && (c === "fullscreen" || c === "base"),
    [Y]: !!Y
  });
  function P(f) {
    return m ? /* @__PURE__ */ d(Ye, { children: f }) : f;
  }
  return P(
    /* @__PURE__ */ q(
      "div",
      {
        id: t,
        ref: j,
        role: "dialog",
        "aria-labelledby": o || t,
        "aria-modal": "true",
        className: H,
        children: [
          /* @__PURE__ */ q(
            "div",
            {
              ref: I,
              className: $,
              style: oe ? {
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
                /* @__PURE__ */ d("div", { className: u.modal__body, children: /* @__PURE__ */ d(
                  xe,
                  {
                    id: e,
                    className: u["modal__scroll-area"],
                    ref: V,
                    scrollableNodeProps: { ref: S },
                    children: a ? /* @__PURE__ */ d("div", { className: u.modal__loader, children: /* @__PURE__ */ d(be, { text: p }) }) : n
                  }
                ) }),
                A
              ]
            }
          ),
          re && /* @__PURE__ */ d(
            Ge,
            {
              title: C,
              description: F,
              onConfirm: ae,
              onClose: () => G(!1)
            }
          ),
          /* @__PURE__ */ d(
            "div",
            {
              className: B(u.modal__backdrop, {
                [u["modal__backdrop--hidden"]]: T && c !== "fullscreen" || T && b
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
const ct = Te(st);
export {
  ct as Modal,
  Fe as useModal,
  ht as useModalStackCtx
};
