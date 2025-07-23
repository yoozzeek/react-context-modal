import { jsxs as F, jsx as d, Fragment as Se } from "react/jsx-runtime";
import * as J from "react";
import { useRef as X, useMemo as ie, useEffect as ue, useState as ne, useCallback as ee, createContext as Ee, useContext as Te, useLayoutEffect as fe, memo as Me } from "react";
import Le from "simplebar-react";
import { createPortal as ke, flushSync as Ye } from "react-dom";
import { useMediaQuery as Pe } from "react-responsive";
function pe(t) {
  var e, o, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var r = t.length;
    for (e = 0; e < r; e++) t[e] && (o = pe(t[e])) && (n && (n += " "), n += o);
  } else for (o in t) t[o] && (n && (n += " "), n += o);
  return n;
}
function B() {
  for (var t, e, o = 0, n = "", r = arguments.length; o < r; o++) (t = arguments[o]) && (e = pe(t)) && (n && (n += " "), n += e);
  return n;
}
const Re = ({ children: t }) => {
  const e = X(document.createElement("div")), o = ie(
    () => document.querySelector("#context-modal-portal"),
    []
  );
  return ue(() => {
    const n = e.current;
    return o.appendChild(n), () => void o.removeChild(n);
  }, []), ke(t, o);
}, Ae = "context-modal-modal__header", Z = {
  modal__header: Ae,
  "modal__header--with-label": "context-modal-modal__header--with-label",
  "modal__header--no-label": "context-modal-modal__header--no-label",
  "modal__header--with-bar": "context-modal-modal__header--with-bar",
  "modal__header-title": "context-modal-modal__header-title",
  "modal__header-close": "context-modal-modal__header-close",
  "modal__header-close-icon": "context-modal-modal__header-close-icon"
}, He = (t) => /* @__PURE__ */ J.createElement("svg", { viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, /* @__PURE__ */ J.createElement("path", { d: "M14.9498 6.46443C15.3403 6.07391 15.3403 5.44074 14.9498 5.05022C14.5593 4.65969 13.9261 4.65969 13.5356 5.05022L14.9498 6.46443ZM5.05029 13.5355C4.65976 13.926 4.65976 14.5592 5.05029 14.9497C5.44081 15.3402 6.07398 15.3402 6.4645 14.9497L5.05029 13.5355ZM13.5356 5.05022L5.05029 13.5355L6.4645 14.9497L14.9498 6.46443L13.5356 5.05022Z", fill: "currentColor" }), /* @__PURE__ */ J.createElement("path", { d: "M13.5356 14.9498C13.9261 15.3403 14.5593 15.3403 14.9498 14.9498C15.3403 14.5593 15.3403 13.9261 14.9498 13.5356L13.5356 14.9498ZM6.4645 5.05029C6.07398 4.65976 5.44081 4.65976 5.05029 5.05029C4.65976 5.44081 4.65976 6.07398 5.05029 6.4645L6.4645 5.05029ZM14.9498 13.5356L6.4645 5.05029L5.05029 6.4645L13.5356 14.9498L14.9498 13.5356Z", fill: "currentColor" })), Ne = ({ label: t, onClose: e }) => /* @__PURE__ */ F(
  "header",
  {
    className: B(Z.modal__header, Z["modal__header--with-bar"], {
      [Z["modal__header--with-label"]]: !!t,
      [Z["modal__header--no-label"]]: !t
    }),
    children: [
      t && /* @__PURE__ */ d("h4", { className: Z["modal__header-title"], children: t }),
      /* @__PURE__ */ d("button", { type: "button", className: Z["modal__header-close"], onClick: e, children: /* @__PURE__ */ d(He, { className: Z["modal__header-close-icon"] }) })
    ]
  }
);
function Xe(t) {
  if (Array.isArray(t)) {
    for (var e = 0, o = Array(t.length); e < t.length; e++)
      o[e] = t[e];
    return o;
  } else
    return Array.from(t);
}
var _e = !1;
if (typeof window < "u") {
  var he = {
    get passive() {
      _e = !0;
    }
  };
  window.addEventListener("testPassive", null, he), window.removeEventListener("testPassive", null, he);
}
var se = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1), j = [], de = !1, ye = -1, te = void 0, U = void 0, oe = void 0, be = function(e) {
  return j.some(function(o) {
    return !!(o.options.allowTouchMove && o.options.allowTouchMove(e));
  });
}, ce = function(e) {
  var o = e || window.event;
  return be(o.target) || o.touches.length > 1 ? !0 : (o.preventDefault && o.preventDefault(), !1);
}, Be = function(e) {
  if (oe === void 0) {
    var o = !!e && e.reserveScrollBarGap === !0, n = window.innerWidth - document.documentElement.clientWidth;
    if (o && n > 0) {
      var r = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
      oe = document.body.style.paddingRight, document.body.style.paddingRight = r + n + "px";
    }
  }
  te === void 0 && (te = document.body.style.overflow, document.body.style.overflow = "hidden");
}, De = function() {
  oe !== void 0 && (document.body.style.paddingRight = oe, oe = void 0), te !== void 0 && (document.body.style.overflow = te, te = void 0);
}, Ie = function() {
  return window.requestAnimationFrame(function() {
    if (U === void 0) {
      U = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left
      };
      var e = window, o = e.scrollY, n = e.scrollX;
      document.body.style.position = "fixed", document.body.style.top = -o + "px", document.body.style.left = -n + "px";
    }
  });
}, Oe = function() {
  if (U !== void 0) {
    var e = -parseInt(document.body.style.top, 10), o = -parseInt(document.body.style.left, 10);
    document.body.style.position = U.position, document.body.style.top = U.top, document.body.style.left = U.left, window.scrollTo(o, e), U = void 0;
  }
}, We = function(e) {
  return e ? e.scrollHeight - e.scrollTop <= e.clientHeight : !1;
}, $e = function(e, o) {
  var n = e.targetTouches[0].clientY - ye;
  return be(e.target) ? !1 : o && o.scrollTop === 0 && n > 0 || We(o) && n < 0 ? ce(e) : (e.stopPropagation(), !0);
}, Ze = function(e, o) {
  if (!e) {
    console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
    return;
  }
  if (!j.some(function(r) {
    return r.targetElement === e;
  })) {
    var n = {
      targetElement: e,
      options: o || {}
    };
    j = [].concat(Xe(j), [n]), se ? Ie() : Be(o), se && (e.ontouchstart = function(r) {
      r.targetTouches.length === 1 && (ye = r.targetTouches[0].clientY);
    }, e.ontouchmove = function(r) {
      r.targetTouches.length === 1 && $e(r, e);
    }, de || (document.addEventListener("touchmove", ce, _e ? { passive: !1 } : void 0), de = !0));
  }
}, Ue = function(e) {
  if (!e) {
    console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
    return;
  }
  j = j.filter(function(o) {
    return o.targetElement !== e;
  }), se && (e.ontouchstart = null, e.ontouchmove = null, de && j.length === 0 && (document.removeEventListener("touchmove", ce, _e ? { passive: !1 } : void 0), de = !1)), se ? Oe() : De();
};
function je(t, e = !0) {
  if (!t) return () => null;
  const o = window.scrollY;
  return e && document.body.style.setProperty("top", `${o * -1}px`), Ze(t, {
    // @ts-ignore
    allowTouchMove: (n) => {
      for (; n && n !== document.body; ) {
        if (n.getAttribute("body-scroll-lock-ignore") !== null)
          return !0;
        n = n.parentElement;
      }
    }
  }), () => {
    if (Ue(t), e && (document.body.style.setProperty("top", ""), document.body.scrollTo(0, o)), !e) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
  };
}
const qe = "Escape";
function Fe() {
  const t = X(/* @__PURE__ */ new Set()), [e, o] = ne([]), n = ie(() => e[e.length - 1], [e]);
  ue(() => {
    let s = !1;
    if (typeof document > "u" || !n) return;
    const l = n?.containerRef.current, u = n?.modalRef.current;
    function i(x) {
      s = !!(u && !u.contains(x.target));
    }
    function y(x) {
      const V = u && !u.contains(x.target);
      s && V && n.close(), s = !1;
    }
    function Y(x) {
      x.stopPropagation(), x.key == qe && (n.close(), t.current.delete(n.key));
    }
    return l?.addEventListener("mousedown", i), l?.addEventListener("touchstart", i), l?.addEventListener("mouseup", y), l?.addEventListener("touchend", y), document.addEventListener("keydown", Y), () => {
      l?.removeEventListener("mousedown", i), l?.removeEventListener("touchstart", i), l?.removeEventListener("mouseup", y), l?.removeEventListener("touchend", y), document.removeEventListener("keydown", Y);
    };
  }, [n]);
  const r = ee(
    (s) => {
      t.current.has(s.key) || (t.current.add(s.key), o((l) => e.findIndex((i) => i.key === s.key) !== -1 ? l : (s.enableScroll = je(
        s.scrollableContentRef.current || s.modalRef.current,
        !l.length
        // mark as first modal in stack
      ), [...l, s])));
    },
    [e]
  ), v = ee((s) => {
    t.current.delete(s), o((l) => {
      const u = [...l], i = l.findIndex((y) => y.key === s);
      return i === -1 ? l : i === 0 ? (u.reverse().forEach((y) => y.enableScroll?.()), []) : (u[i].enableScroll?.(), u.splice(i, 1), u);
    });
  }, []), p = ee(
    (s, l) => {
      if (!t.current.has(s)) return;
      const u = e.findIndex((i) => i.key === s);
      if (u > -1) {
        const i = [...e];
        i[u] = {
          ...i[u],
          ...l
        }, t.current.add(s), o(i);
      }
    },
    [e]
  );
  function T(s) {
    const l = e.findIndex((u) => u.key === s);
    return [l, l === e.length - 1];
  }
  return {
    lastModal: n,
    apply: r,
    remove: v,
    update: p,
    getPositionInStack: T
  };
}
const ge = Ee(void 0);
function vt({ children: t }) {
  const e = Fe();
  return /* @__PURE__ */ d(ge.Provider, { value: e, children: t });
}
function Ve(t) {
  return Te(ge) ?? t;
}
const Ge = (t) => /* @__PURE__ */ J.createElement("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, /* @__PURE__ */ J.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0 12C0 5.37258 5.37258 0 12 0C12.8284 0 13.5 0.671573 13.5 1.5C13.5 2.32843 12.8284 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.1716 21.6716 10.5 22.5 10.5C23.3284 10.5 24 11.1716 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z", fill: "currentColor" })), we = ({
  className: t,
  size: e = "md",
  text: o
}) => /* @__PURE__ */ F("div", { className: "flex h-full w-full flex-col items-center justify-center", children: [
  /* @__PURE__ */ d(
    Ge,
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
  o && /* @__PURE__ */ d(
    "span",
    {
      className: B("text-gray-250", {
        "py-4 text-sm": e === "sm",
        "py-6": e === "md"
      }),
      children: o
    }
  ),
  /* @__PURE__ */ d("span", { className: "sr-only", children: "Loading..." })
] });
function ve({
  fullWidth: t = !1,
  type: e = "button",
  size: o = "md",
  disabled: n = !1,
  loading: r = !1,
  loadingText: v,
  variant: p = "light",
  onClick: T,
  children: s
}) {
  return /* @__PURE__ */ d(
    "button",
    {
      className: B("btn", `btn--variant-${p}`, `btn--size-${o}`, {
        "btn--fullwidth": t,
        "btn--loading": r,
        "btn--icon": o === "icon",
        "btn--flex": r && p !== "none",
        "btn--disabled": n || r
      }),
      disabled: n || r,
      type: e || "button",
      onClick: T,
      children: r && p !== "none" ? /* @__PURE__ */ F(Se, { children: [
        /* @__PURE__ */ d(we, { className: B("btn__loader", `btn__loader--variant-${p}`) }),
        v && /* @__PURE__ */ d("span", { className: "btn__loading-text", children: v })
      ] }) : s
    }
  );
}
function Ke({
  title: t,
  description: e,
  variant: o = "danger",
  isLoading: n = !1,
  onConfirm: r,
  onClose: v
}) {
  function p() {
    r(), v();
  }
  return /* @__PURE__ */ d(
    ct,
    {
      id: "confirm-action-modal",
      ariaLabel: "Aria label",
      type: "overlay-auto",
      size: "sm",
      headerRenderer: () => /* @__PURE__ */ d("h3", { className: "modal-confirm__title", children: t }),
      footerRenderer: (T) => /* @__PURE__ */ F("div", { className: "modal-confirm__footer", children: [
        /* @__PURE__ */ d(
          ve,
          {
            fullWidth: !0,
            type: "button",
            variant: o,
            loading: n,
            onClick: p,
            children: "Confirm"
          }
        ),
        /* @__PURE__ */ d(
          ve,
          {
            fullWidth: !0,
            type: "button",
            variant: "light",
            disabled: n,
            onClick: T,
            children: "Cancel"
          }
        )
      ] }),
      onClose: v,
      children: e && /* @__PURE__ */ d("p", { className: "modal-confirm__description", children: e })
    }
  );
}
function xe() {
  return Pe({
    query: "(min-width: 576px)"
  });
}
const Qe = typeof document < "u" ? fe : ue;
function ze({
  isLoading: t = !1,
  id: e,
  type: o,
  horizontalSwipe: n,
  stackCtx: r,
  modalRef: v,
  modalHeaderRef: p,
  scrollAreaRef: T,
  onClose: s
}) {
  const l = xe(), [u, i] = ne({
    isMoving: !1,
    scrollDisabled: !1,
    transitionEnabled: !0,
    transition: "none",
    transform: "none",
    opacity: 1
  }), [y, Y] = ne(!1);
  Qe(() => {
    const _ = v.current;
    if (!_ || l) return;
    const h = o === "fullscreen" && n, C = p.current;
    let c = 0, P = 0, D = 0, q = 0, I = !1, M = !1, O = 0, S = !1;
    const G = (a) => {
      const L = a.changedTouches[0].clientX - D, g = a.changedTouches[0].clientY - P, R = Math.sign(L), A = Math.sign(g), $ = Math.abs(L / window.innerWidth), H = Math.abs(g / window.innerHeight);
      return {
        directionX: R,
        directionY: A,
        factorX: $,
        factorY: H
      };
    }, ae = (a) => {
      if (a.touches.length !== 1) return;
      const L = a.touches[0];
      D = L.clientX, P = L.clientY, I = !0, M = !1, q = (/* @__PURE__ */ new Date()).getTime(), O = (/* @__PURE__ */ new Date()).getTime();
      const { isTop: g } = x();
      S = g;
    };
    function b() {
      c = 0, P = 0, D = 0, q = 0, I = !1, M = !1, O = 0, S = !1;
    }
    function le() {
      Y(!0), b(), setTimeout(() => {
        r?.remove(e), s();
      }, 150);
    }
    function K() {
      le(), i((a) => ({
        ...a,
        transitionEnabled: !0,
        transition: "transform 0.18s, opacity 0.18s",
        transform: "translateX(100%)",
        opacity: 0
      }));
    }
    function me() {
      i((a) => ({
        ...a,
        isMoving: !1,
        scrollDisabled: !1,
        transitionEnabled: !0,
        transition: "transform 0.15s, opacity 0.15s",
        transform: "translateX(0)",
        opacity: 1
      }));
    }
    function Q() {
      le(), i((a) => ({
        ...a,
        transitionEnabled: !0,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        transform: "translateY(100%)",
        opacity: 0
      }));
    }
    function E() {
      i((a) => ({
        ...a,
        transitionEnabled: !0,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        transform: "translateY(0)",
        opacity: 1
      }));
    }
    function W() {
      i((a) => ({
        ...a,
        isMoving: !1,
        scrollDisabled: !0,
        transitionEnabled: !1,
        transition: "none",
        transform: "translateX(0)",
        opacity: 1
      }));
    }
    function z() {
      i((a) => ({
        ...a,
        isMoving: !0,
        scrollDisabled: !0,
        transitionEnabled: !1,
        transition: "none",
        transform: "translateY(0)",
        opacity: 1
      }));
    }
    const k = (a) => {
      if (a.target.closest("[horizontal-scroll-inside-modal]") || !I) return;
      const { directionY: g, factorY: R, directionX: A, factorX: $ } = G(a);
      if (c = a.touches[0].clientY, h) {
        if (!M && (/* @__PURE__ */ new Date()).getTime() - O > 150) return;
        if (M = !0, A === -1) {
          W();
          return;
        }
        if ($ > R) {
          const w = a.changedTouches[0].clientX - D;
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
      if (o === "fullscreen") return;
      const H = C ? a.target === C || C.contains(a.target) : !1;
      if (!M && (/* @__PURE__ */ new Date()).getTime() - O > 150) return;
      if (M = !0, !S && !H) {
        z();
        return;
      }
      if (g === -1) {
        z();
        return;
      }
      const f = a.changedTouches[0].clientY - P;
      i((w) => ({
        ...w,
        transitionEnabled: !1,
        transform: `translateY(${f}px)`,
        transition: "none"
      }));
    }, re = (a) => {
      const { directionX: L, factorX: g, directionY: R, factorY: A } = G(a);
      if (h) {
        L === 1 && g > 0.25 && ((/* @__PURE__ */ new Date()).getTime() - O < 250 || g > 0.8) ? K() : me(), b();
        return;
      }
      if (o === "fullscreen") return;
      if (!S) {
        const Ce = C ? a.target === C || C.contains(a.target) : !1;
        R === 1 && A > 0.25 && Ce ? Q() : E(), b();
        return;
      }
      if (R === -1) {
        E(), b();
        return;
      }
      const { isScrollable: $, isTop: H } = x();
      if ($ && !H) {
        E(), b();
        return;
      }
      if (P > c) {
        E(), b();
        return;
      }
      const w = (/* @__PURE__ */ new Date()).getTime() - q, N = (c - P) / (v.current?.clientHeight || 0);
      H && N > 0.25 && w < 250 && w < 500 || w > 500 && w < 1200 && A > 0.2 ? (Q(), b()) : (E(), b());
    };
    return _.addEventListener("touchstart", ae, {
      passive: !0
    }), _.addEventListener("touchmove", k, { passive: !0 }), _.addEventListener("touchend", re, { passive: !0 }), () => {
      _.removeEventListener("touchstart", ae), _.removeEventListener("touchmove", k), _.removeEventListener("touchend", re);
    };
  }, [t, o, l, r?.lastModal]);
  function x() {
    let _ = !1;
    const h = T.current;
    h && (_ = h.scrollHeight > h.clientHeight);
    let C = !0;
    h && (C = h.scrollTop === 0);
    let c = !0;
    return h && (c = h.scrollTop + h.clientHeight === h.scrollHeight), { isScrollable: _, isTop: C, isBottom: c };
  }
  function V() {
    Ye(() => {
      Y(!0), i((_) => ({
        ..._,
        transitionEnabled: !0,
        transform: "translateY(100%)",
        transition: "transform 0.12s ease-out, opacity 0.12s ease-out",
        opacity: 0
      }));
    }), setTimeout(
      () => {
        r?.remove(e), s();
      },
      l ? 0 : 200
    );
  }
  return {
    transformState: u,
    closeAnimation: y,
    handleClose: V
  };
}
const Je = "context-modal-modal__container", et = "context-modal-modal__main", tt = "context-modal-modal__header", ot = "context-modal-modal__body", nt = "context-modal-modal__loader", at = "context-modal-modal__footer", lt = "context-modal-slideUp90", rt = "context-modal-slideUp95", it = "context-modal-slideRight", st = "context-modal-modal__backdrop", m = {
  modal__container: Je,
  "modal__container--fullscreen": "context-modal-modal__container--fullscreen",
  "modal__container--menu": "context-modal-modal__container--menu",
  "modal__container--overlay-90": "context-modal-modal__container--overlay-90",
  "modal__container--overlay-95": "context-modal-modal__container--overlay-95",
  "modal__container--overlay-auto": "context-modal-modal__container--overlay-auto",
  "modal__safe-top": "context-modal-modal__safe-top",
  modal__main: et,
  "modal__main--fullscreen": "context-modal-modal__main--fullscreen",
  "modal__main--overlay-90": "context-modal-modal__main--overlay-90",
  "modal__main--overlay-95": "context-modal-modal__main--overlay-95",
  "modal__main--overlay-auto": "context-modal-modal__main--overlay-auto",
  "modal__main--overlay-base": "context-modal-modal__main--overlay-base",
  "modal__main--base": "context-modal-modal__main--base",
  "modal__main--sm": "context-modal-modal__main--sm",
  "modal__main--md": "context-modal-modal__main--md",
  "modal__main--lg": "context-modal-modal__main--lg",
  "modal__main--2xl": "context-modal-modal__main--2xl",
  "modal__main--3xl": "context-modal-modal__main--3xl",
  "modal__main--opacity-0": "context-modal-modal__main--opacity-0",
  modal__header: tt,
  modal__body: ot,
  "modal__scroll-area": "context-modal-modal__scroll-area",
  modal__loader: nt,
  modal__footer: at,
  "modal__main--animate-slide-up-90": "context-modal-modal__main--animate-slide-up-90",
  slideUp90: lt,
  "modal__main--animate-slide-up-95": "context-modal-modal__main--animate-slide-up-95",
  slideUp95: rt,
  "modal__main--animate-slide-right": "context-modal-modal__main--animate-slide-right",
  slideRight: it,
  modal__backdrop: st,
  "modal__backdrop--hidden": "context-modal-modal__backdrop--hidden"
};
function dt({
  id: t,
  scrollAreaId: e,
  children: o,
  ariaLabel: n,
  title: r,
  onClose: v,
  loadingText: p,
  horizontalSwipe: T = !1,
  confirmClose: s = !1,
  isLoading: l = !1,
  isPortal: u = !0,
  mobileSafeTop: i = !0,
  preventClose: y = !1,
  bgColorClass: Y,
  confirmTitle: x = "Are you sure?",
  confirmDescription: V = "Are you sure you want to close this dialog?",
  headerRenderer: _,
  footerRenderer: h,
  fallbackCtx: C,
  type: c = "overlay-auto",
  size: P = "md"
}) {
  const D = Ve(C), q = X(null), I = X(null), M = X(null), O = X(null), S = X(null), G = X(null), ae = xe(), b = T && c === "fullscreen", [le, K] = ne(!1), [me, Q] = ne(O.current?.clientHeight), { closeAnimation: E, transformState: W, handleClose: z } = ze({
    id: t,
    modalRef: I,
    modalHeaderRef: M,
    scrollAreaRef: S,
    onClose: v,
    type: c ?? "overlay-auto",
    isLoading: l ?? !1,
    horizontalSwipe: T ?? !1,
    stackCtx: D
  }), k = ee(() => {
    if (!y) {
      if (s) {
        K(!0);
        return;
      }
      z();
    }
  }, [s]), re = ee(() => {
    K(!1), z();
  }, []);
  fe(() => {
    const f = t;
    D?.apply({
      key: f,
      simpleBarRef: G,
      containerRef: q,
      modalRef: I,
      scrollableContentRef: S,
      close: k
    });
  }, []), fe(() => {
    if (!S.current) return;
    const f = new ResizeObserver(() => {
      Q(S.current?.clientHeight);
    });
    return f.observe(S.current), () => f.disconnect();
  }, []), ue(() => {
    const f = document.querySelector('meta[name="theme-color"]');
    let w = null, N = f;
    return f ? (w = f.getAttribute("content"), f.setAttribute("content", "#000000")) : (N = document.createElement("meta"), N.name = "theme-color", N.content = "#000000", document.head.appendChild(N)), () => {
      w !== null ? N?.setAttribute("content", w) : N?.remove();
    };
  }, []);
  const a = ie(() => _ ? _(k) : null, [_, k]), L = !l && (b || a) ? /* @__PURE__ */ d("div", { ref: M, children: a }) : /* @__PURE__ */ d("div", { ref: M, children: /* @__PURE__ */ d(Ne, { label: r || void 0, onClose: k }) }), g = ie(() => h ? h(k) : null, [h, k]), R = !l && g ? /* @__PURE__ */ d("footer", { className: m.modal__footer, children: g }) : null, A = B(m.modal__container, {
    [m["modal__container--fullscreen"]]: c === "fullscreen",
    [m["modal__container--menu"]]: c === "menu",
    [m["modal__container--overlay-90"]]: c === "overlay-90",
    [m["modal__container--overlay-95"]]: c === "overlay-95",
    [m["modal__container--overlay-auto"]]: c === "overlay-auto",
    [m["modal__safe-top"]]: c !== "fullscreen" && i
  }), $ = B(m.modal__main, m[`modal__main--${c}`], {
    [m[`modal__main--${P}`]]: c !== "fullscreen",
    [m["modal__main--opacity-0"]]: !me,
    [m["modal__main--animate-slide-up-90"]]: !E && (c === "menu" || c === "overlay-90" || c === "overlay-auto"),
    [m["modal__main--animate-slide-up-95"]]: !E && c === "overlay-95",
    [m["modal__main--animate-slide-right"]]: !E && c === "fullscreen",
    [Y]: !!Y
  });
  function H(f) {
    return u ? /* @__PURE__ */ d(Re, { children: f }) : f;
  }
  return H(
    /* @__PURE__ */ F(
      "div",
      {
        id: t,
        ref: q,
        role: "dialog",
        "aria-labelledby": n || t,
        "aria-modal": "true",
        className: A,
        children: [
          /* @__PURE__ */ F(
            "div",
            {
              ref: I,
              className: $,
              style: ae ? {
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
                /* @__PURE__ */ d("div", { className: m.modal__body, children: /* @__PURE__ */ d(
                  Le,
                  {
                    id: e,
                    className: m["modal__scroll-area"],
                    ref: G,
                    scrollableNodeProps: { ref: S },
                    children: l ? /* @__PURE__ */ d("div", { className: m.modal__loader, children: /* @__PURE__ */ d(we, { text: p }) }) : o
                  }
                ) }),
                R
              ]
            }
          ),
          le && /* @__PURE__ */ d(
            Ke,
            {
              title: x,
              description: V,
              onConfirm: re,
              onClose: () => K(!1)
            }
          ),
          /* @__PURE__ */ d(
            "div",
            {
              className: B(m.modal__backdrop, {
                [m["modal__backdrop--hidden"]]: E && c !== "fullscreen" || E && b
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
const ct = Me(dt);
export {
  ct as Modal,
  vt as ModalProvider,
  Ve as useModal,
  Fe as useModalStackCtx
};
