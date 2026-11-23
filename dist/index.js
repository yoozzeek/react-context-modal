import { createContext as e, memo as t, useCallback as n, useContext as r, useEffect as i, useLayoutEffect as a, useMemo as o, useRef as s, useState as c, useSyncExternalStore as l } from "react";
import u from "simplebar-react";
import { createPortal as d, flushSync as f } from "react-dom";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function g(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = g(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function _() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = g(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/components/ModalPortal.tsx
var v = "context-modal-portal";
function y() {
	let e = document.getElementById(v);
	if (e) return e;
	let t = document.createElement("div");
	return t.id = v, document.body.appendChild(t), t;
}
var ee = ({ children: e }) => {
	let t = s(document.createElement("div")), n = o(() => y(), []);
	return i(() => {
		let e = t.current;
		return n.appendChild(e), () => void n.removeChild(e);
	}, [n]), d(e, n);
}, b = {
	modal__header: "context-modal-modal__header",
	"modal__header--with-label": "context-modal-modal__header--with-label",
	"modal__header--no-label": "context-modal-modal__header--no-label",
	"modal__header--with-bar": "context-modal-modal__header--with-bar",
	"modal__header-title": "context-modal-modal__header-title",
	"modal__header-close": "context-modal-modal__header-close",
	"modal__header-close-icon": "context-modal-modal__header-close-icon"
}, x = (e) => /* @__PURE__ */ h("svg", {
	viewBox: "0 0 20 20",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: [/* @__PURE__ */ m("path", {
		d: "M14.9498 6.46443C15.3403 6.07391 15.3403 5.44074 14.9498 5.05022C14.5593 4.65969 13.9261 4.65969 13.5356 5.05022L14.9498 6.46443ZM5.05029 13.5355C4.65976 13.926 4.65976 14.5592 5.05029 14.9497C5.44081 15.3402 6.07398 15.3402 6.4645 14.9497L5.05029 13.5355ZM13.5356 5.05022L5.05029 13.5355L6.4645 14.9497L14.9498 6.46443L13.5356 5.05022Z",
		fill: "currentColor"
	}), /* @__PURE__ */ m("path", {
		d: "M13.5356 14.9498C13.9261 15.3403 14.5593 15.3403 14.9498 14.9498C15.3403 14.5593 15.3403 13.9261 14.9498 13.5356L13.5356 14.9498ZM6.4645 5.05029C6.07398 4.65976 5.44081 4.65976 5.05029 5.05029C4.65976 5.44081 4.65976 6.07398 5.05029 6.4645L6.4645 5.05029ZM14.9498 13.5356L6.4645 5.05029L5.05029 6.4645L13.5356 14.9498L14.9498 13.5356Z",
		fill: "currentColor"
	})]
}), S = ({ label: e, closeButton: t, onClose: n }) => /* @__PURE__ */ h("header", {
	className: _(b.modal__header, {
		[b["modal__header--with-bar"]]: !t,
		[b["modal__header--with-label"]]: !!e,
		[b["modal__header--no-label"]]: !e
	}),
	children: [e && /* @__PURE__ */ m("h4", {
		className: b["modal__header-title"],
		children: e
	}), t && /* @__PURE__ */ m("button", {
		type: "button",
		"aria-label": "Close",
		className: b["modal__header-close"],
		onClick: n,
		children: /* @__PURE__ */ m(x, { className: b["modal__header-close-icon"] })
	})]
}), C = e(void 0), w = {
	dialogFrom: "576px",
	sheetCloseButton: !1,
	defaultSize: "md"
}, te = e(w);
//#endregion
//#region src/hooks/useModal.ts
function ne(e) {
	return r(C) ?? e;
}
//#endregion
//#region src/assets/icons/loader.svg?react
var T = (e) => /* @__PURE__ */ m("svg", {
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: /* @__PURE__ */ m("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M0 12C0 5.37258 5.37258 0 12 0C12.8284 0 13.5 0.671573 13.5 1.5C13.5 2.32843 12.8284 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.1716 21.6716 10.5 22.5 10.5C23.3284 10.5 24 11.1716 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z",
		fill: "currentColor"
	})
}), E = ({ className: e, size: t = "md", text: n }) => /* @__PURE__ */ h("div", {
	className: "flex h-full w-full flex-col items-center justify-center",
	children: [
		/* @__PURE__ */ m(T, { className: _("animate-spin", {
			"h-5 w-5": t === "sm",
			"h-8 w-8": t === "md",
			"h-12 w-12": t === "lg",
			"text-green-500": !e,
			[e || ""]: e
		}) }),
		n && /* @__PURE__ */ m("span", {
			className: _("text-gray-250", {
				"py-4 text-sm": t === "sm",
				"py-6": t === "md"
			}),
			children: n
		}),
		/* @__PURE__ */ m("span", {
			className: "sr-only",
			children: "Loading..."
		})
	]
}), D = {
	"modal-confirm__title": "context-modal-modal-confirm__title",
	"modal-confirm__description": "context-modal-modal-confirm__description",
	"modal-confirm__footer": "context-modal-modal-confirm__footer"
}, O = {
	btn: "context-modal-btn",
	"btn--fullwidth": "context-modal-btn--fullwidth",
	"btn--icon": "context-modal-btn--icon",
	"btn--flex": "context-modal-btn--flex",
	"btn--loading": "context-modal-btn--loading",
	"btn--disabled": "context-modal-btn--disabled",
	"btn--size-xxs": "context-modal-btn--size-xxs",
	"btn--size-xs": "context-modal-btn--size-xs",
	"btn--size-sm": "context-modal-btn--size-sm",
	"btn--size-md": "context-modal-btn--size-md",
	"btn--size-lg": "context-modal-btn--size-lg",
	"btn--size-xl": "context-modal-btn--size-xl",
	"btn--size-icon": "context-modal-btn--size-icon",
	"btn--variant-success": "context-modal-btn--variant-success",
	"btn--variant-light": "context-modal-btn--variant-light",
	"btn--variant-outline-light": "context-modal-btn--variant-outline-light",
	"btn--variant-outline-green": "context-modal-btn--variant-outline-green",
	"btn--variant-outline-warning": "context-modal-btn--variant-outline-warning",
	"btn--variant-danger": "context-modal-btn--variant-danger",
	"btn--variant-warning": "context-modal-btn--variant-warning",
	"btn--variant-dark": "context-modal-btn--variant-dark",
	"btn--variant-gray": "context-modal-btn--variant-gray",
	"btn--variant-none": "context-modal-btn--variant-none",
	btn__loader: "context-modal-btn__loader",
	spin: "context-modal-spin",
	"btn__loader--variant-success": "context-modal-btn__loader--variant-success",
	"btn__loader--variant-outline-light": "context-modal-btn__loader--variant-outline-light",
	"btn__loader--variant-danger": "context-modal-btn__loader--variant-danger",
	"btn__loader--variant-warning": "context-modal-btn__loader--variant-warning",
	"btn__loader--variant-light": "context-modal-btn__loader--variant-light",
	"btn__loader--variant-outline-green": "context-modal-btn__loader--variant-outline-green",
	"btn__loader--variant-outline-warning": "context-modal-btn__loader--variant-outline-warning",
	"btn__loading-text": "context-modal-btn__loading-text"
};
//#endregion
//#region src/components/Button.tsx
function k({ fullWidth: e = !1, type: t = "button", size: n = "md", disabled: r = !1, loading: i = !1, loadingText: a, variant: o = "light", onClick: s, children: c }) {
	return /* @__PURE__ */ m("button", {
		className: _(O.btn, O[`btn--variant-${o}`], O[`btn--size-${n}`], {
			[O["btn--fullwidth"]]: e,
			[O["btn--loading"]]: i,
			[O["btn--icon"]]: n === "icon",
			[O["btn--flex"]]: i && o !== "none",
			[O["btn--disabled"]]: r || i
		}),
		disabled: r || i,
		type: t || "button",
		onClick: s,
		children: i && o !== "none" ? /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m(E, { className: _(O.btn__loader, O[`btn__loader--variant-${o}`]) }), a && /* @__PURE__ */ m("span", {
			className: O["btn__loading-text"],
			children: a
		})] }) : c
	});
}
//#endregion
//#region src/components/ModalConfirmAction.tsx
function A({ title: e, description: t, variant: n = "danger", isLoading: r = !1, onConfirm: i, onClose: a }) {
	function o() {
		i(), a();
	}
	return /* @__PURE__ */ m(oe, {
		id: "confirm-action-modal",
		ariaLabel: "Aria label",
		type: "overlay-auto",
		size: "sm",
		headerRenderer: () => /* @__PURE__ */ m("h3", {
			className: D["modal-confirm__title"],
			children: e
		}),
		footerRenderer: (e) => /* @__PURE__ */ h("div", {
			className: D["modal-confirm__footer"],
			children: [/* @__PURE__ */ m(k, {
				fullWidth: !0,
				type: "button",
				variant: n,
				loading: r,
				onClick: o,
				children: "Confirm"
			}), /* @__PURE__ */ m(k, {
				fullWidth: !0,
				type: "button",
				variant: "light",
				disabled: r,
				onClick: e,
				children: "Cancel"
			})]
		}),
		onClose: a,
		children: t && /* @__PURE__ */ m("p", {
			className: D["modal-confirm__description"],
			children: t
		})
	});
}
//#endregion
//#region src/hooks/useMediaMinWidth.ts
function re(e) {
	let t = `(min-width: ${e})`;
	return l(n((e) => {
		let n = window.matchMedia(t);
		return n.addEventListener ? (n.addEventListener("change", e), () => n.removeEventListener("change", e)) : (n.addListener(e), () => n.removeListener(e));
	}, [t]), () => window.matchMedia(t).matches, () => !0);
}
//#endregion
//#region src/hooks/useIsomorphicLayoutEffect.ts
var j = typeof document < "u" ? a : i;
//#endregion
//#region src/hooks/useCoreHandlers.ts
function ie({ isLoading: e = !1, isDialog: t, id: r, type: i, horizontalSwipe: a, stackCtx: o, modalRef: l, modalHeaderRef: u, scrollAreaRef: d, onClose: p }) {
	let m = s(p), h = s(o), [g, _] = c({
		isMoving: !1,
		scrollDisabled: !1,
		transitionEnabled: !0,
		transition: "none",
		transform: "none",
		opacity: 1
	}), [v, y] = c(!1);
	j(() => {
		m.current = p, h.current = o;
	});
	function ee() {
		let e = !1, t = d.current;
		t && (e = t.scrollHeight > t.clientHeight);
		let n = !0;
		t && (n = t.scrollTop === 0);
		let r = !0;
		return t && (r = t.scrollTop + t.clientHeight === t.scrollHeight), {
			isScrollable: e,
			isTop: n,
			isBottom: r
		};
	}
	return j(() => {
		let e = l.current;
		if (!e || t) return;
		let n = i === "fullscreen" && a, o = u.current, s = 0, c = 0, d = 0, f = 0, p = !1, g = !1, v = 0, b = !1, x = (e) => {
			let t = e.changedTouches[0].clientX - d, n = e.changedTouches[0].clientY - c;
			return {
				directionX: Math.sign(t),
				directionY: Math.sign(n),
				factorX: Math.abs(t / window.innerWidth),
				factorY: Math.abs(n / window.innerHeight)
			};
		}, S = (e) => {
			if (e.touches.length !== 1) return;
			let t = e.touches[0];
			d = t.clientX, c = t.clientY, p = !0, g = !1, f = (/* @__PURE__ */ new Date()).getTime(), v = (/* @__PURE__ */ new Date()).getTime();
			let { isTop: n } = ee();
			b = n;
		};
		function C() {
			s = 0, c = 0, d = 0, f = 0, p = !1, g = !1, v = 0, b = !1;
		}
		function w() {
			y(!0), C(), setTimeout(() => {
				h.current?.remove(r), m.current();
			}, 150);
		}
		function te() {
			w(), _((e) => ({
				...e,
				transitionEnabled: !0,
				transition: "transform 0.18s, opacity 0.18s",
				transform: "translateX(100%)",
				opacity: 0
			}));
		}
		function ne() {
			_((e) => ({
				...e,
				isMoving: !1,
				scrollDisabled: !1,
				transitionEnabled: !0,
				transition: "transform 0.15s, opacity 0.15s",
				transform: "translateX(0)",
				opacity: 1
			}));
		}
		function T() {
			w(), _((e) => ({
				...e,
				transitionEnabled: !0,
				transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
				transform: "translateY(100%)",
				opacity: 0
			}));
		}
		function E() {
			_((e) => ({
				...e,
				transitionEnabled: !0,
				transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
				transform: "translateY(0)",
				opacity: 1
			}));
		}
		function D() {
			_((e) => ({
				...e,
				isMoving: !1,
				scrollDisabled: !0,
				transitionEnabled: !1,
				transition: "none",
				transform: "translateX(0)",
				opacity: 1
			}));
		}
		function O() {
			_((e) => ({
				...e,
				isMoving: !0,
				scrollDisabled: !0,
				transitionEnabled: !1,
				transition: "none",
				transform: "translateY(0)",
				opacity: 1
			}));
		}
		let k = (e) => {
			if (e.target.closest("[horizontal-scroll-inside-modal]") || !p) return;
			let { directionY: t, factorY: r, directionX: a, factorX: l } = x(e);
			if (s = e.touches[0].clientY, n) {
				if (!g && (/* @__PURE__ */ new Date()).getTime() - v > 150) return;
				if (g = !0, a === -1) {
					D();
					return;
				}
				if (l > r) {
					_({
						isMoving: !0,
						scrollDisabled: !0,
						transitionEnabled: !1,
						transition: "none",
						transform: `translateX(${e.changedTouches[0].clientX - d}px)`,
						opacity: 1
					});
					return;
				} else D();
				return;
			}
			if (i === "fullscreen") return;
			let u = o ? e.target === o || o.contains(e.target) : !1;
			if (!g && (/* @__PURE__ */ new Date()).getTime() - v > 150) return;
			if (g = !0, !b && !u) {
				O();
				return;
			}
			if (t === -1) {
				O();
				return;
			}
			let f = e.changedTouches[0].clientY - c;
			_((e) => ({
				...e,
				transitionEnabled: !1,
				transform: `translateY(${f}px)`,
				transition: "none"
			}));
		}, A = (e) => {
			let { directionX: t, factorX: r, directionY: a, factorY: u } = x(e);
			if (n) {
				t === 1 && r > .25 && ((/* @__PURE__ */ new Date()).getTime() - v < 250 || r > .8) ? te() : ne(), C();
				return;
			}
			if (i === "fullscreen") return;
			if (!b) {
				let t = o ? e.target === o || o.contains(e.target) : !1;
				a === 1 && u > .25 && t ? T() : E(), C();
				return;
			}
			if (a === -1) {
				E(), C();
				return;
			}
			let { isScrollable: d, isTop: p } = ee();
			if (d && !p) {
				E(), C();
				return;
			}
			if (c > s) {
				E(), C();
				return;
			}
			let m = (/* @__PURE__ */ new Date()).getTime() - f, h = (s - c) / (l.current?.clientHeight || 0);
			p && h > .25 && m < 250 && m < 500 || m > 500 && m < 1200 && u > .2 ? (T(), C()) : (E(), C());
		};
		return e.addEventListener("touchstart", S, { passive: !0 }), e.addEventListener("touchmove", k, { passive: !0 }), e.addEventListener("touchend", A, { passive: !0 }), () => {
			e.removeEventListener("touchstart", S), e.removeEventListener("touchmove", k), e.removeEventListener("touchend", A);
		};
	}, [
		e,
		i,
		t,
		a,
		r
	]), {
		transformState: g,
		closeAnimation: v,
		handleClose: n(() => {
			f(() => {
				y(!0), _((e) => ({
					...e,
					transitionEnabled: !0,
					transform: "translateY(100%)",
					transition: "transform 0.12s ease-out, opacity 0.12s ease-out",
					opacity: 0
				}));
			}), setTimeout(() => {
				h.current?.remove(r), m.current();
			}, t ? 0 : 200);
		}, [r, t])
	};
}
var M = {
	modal__container: "context-modal-modal__container",
	"modal__container--fullscreen": "context-modal-modal__container--fullscreen",
	"modal__container--menu": "context-modal-modal__container--menu",
	"modal__container--overlay-90": "context-modal-modal__container--overlay-90",
	"modal__container--overlay-95": "context-modal-modal__container--overlay-95",
	"modal__container--overlay-auto": "context-modal-modal__container--overlay-auto",
	"modal__safe-top": "context-modal-modal__safe-top",
	modal__main: "context-modal-modal__main",
	"modal__main--fullscreen": "context-modal-modal__main--fullscreen",
	"modal__main--overlay-90": "context-modal-modal__main--overlay-90",
	"modal__main--overlay-95": "context-modal-modal__main--overlay-95",
	"modal__main--overlay-auto": "context-modal-modal__main--overlay-auto",
	"modal__main--menu": "context-modal-modal__main--menu",
	"modal__main--sm": "context-modal-modal__main--sm",
	"modal__main--md": "context-modal-modal__main--md",
	"modal__main--lg": "context-modal-modal__main--lg",
	"modal__main--2xl": "context-modal-modal__main--2xl",
	"modal__main--3xl": "context-modal-modal__main--3xl",
	"modal__main--opacity-0": "context-modal-modal__main--opacity-0",
	modal__header: "context-modal-modal__header",
	modal__body: "context-modal-modal__body",
	"modal__scroll-area": "context-modal-modal__scroll-area",
	modal__loader: "context-modal-modal__loader",
	modal__footer: "context-modal-modal__footer",
	"modal__main--animate-slide-up-90": "context-modal-modal__main--animate-slide-up-90",
	slideUp90: "context-modal-slideUp90",
	"modal__main--animate-slide-up-95": "context-modal-modal__main--animate-slide-up-95",
	slideUp95: "context-modal-slideUp95",
	"modal__main--animate-slide-right": "context-modal-modal__main--animate-slide-right",
	slideRight: "context-modal-slideRight",
	modal__backdrop: "context-modal-modal__backdrop",
	"modal__backdrop--hidden": "context-modal-modal__backdrop--hidden"
};
//#endregion
//#region src/components/Modal.tsx
function ae(e) {
	return typeof e == "function";
}
function N({ id: e, scrollAreaId: t, children: l, ariaLabel: d, title: f, onClose: p, loadingText: g, horizontalSwipe: v = !1, confirmClose: y = !1, isLoading: b = !1, isPortal: x = !0, mobileSafeTop: C = !0, preventClose: w = !1, confirmTitle: T = "Are you sure?", confirmDescription: D = "Are you sure you want to close this dialog?", headerRenderer: O, footerRenderer: k, fallbackCtx: j, type: N = "overlay-auto", size: oe }) {
	let P = ne(j), F = s(null), I = s(null), L = s(null), R = s(null), z = s(null), B = s(P), { dialogFrom: V, sheetCloseButton: H, defaultSize: U } = r(te), W = re(V), G = oe ?? U, K = v && N === "fullscreen", [se, q] = c(!1), [ce, le] = c(void 0), { closeAnimation: J, transformState: Y, handleClose: X } = ie({
		id: e,
		modalRef: I,
		modalHeaderRef: L,
		scrollAreaRef: R,
		onClose: p,
		type: N ?? "overlay-auto",
		isLoading: b ?? !1,
		isDialog: W,
		horizontalSwipe: v ?? !1,
		stackCtx: P
	}), Z = n(() => {
		if (!w) {
			if (y) {
				q(!0);
				return;
			}
			X();
		}
	}, [
		w,
		y,
		X
	]), Q = n(() => {
		q(!1), X();
	}, [X]), $ = s(Z);
	a(() => {
		B.current = P, $.current = Z;
	});
	let ue = n(() => $.current(), []);
	a(() => {
		let t = B.current;
		return t?.apply({
			key: e,
			simpleBarRef: z,
			containerRef: F,
			modalRef: I,
			scrollableContentRef: R,
			close: ue
		}), () => t?.remove(e);
	}, [e, ue]), a(() => {
		if (!R.current) return;
		let e = new ResizeObserver(() => {
			le(R.current?.clientHeight);
		});
		return e.observe(R.current), () => e.disconnect();
	}, []), i(() => {
		let e = document.querySelector("meta[name=\"theme-color\"]"), t = null, n = e;
		return e ? (t = e.getAttribute("content"), e.setAttribute("content", "#000000")) : (n = document.createElement("meta"), n.name = "theme-color", n.content = "#000000", document.head.appendChild(n)), () => {
			t === null ? n?.remove() : n?.setAttribute("content", t);
		};
	}, []);
	let de = _(M.modal__container, {
		[M["modal__container--fullscreen"]]: N === "fullscreen",
		[M["modal__container--menu"]]: N === "menu",
		[M["modal__container--overlay-90"]]: N === "overlay-90",
		[M["modal__container--overlay-95"]]: N === "overlay-95",
		[M["modal__container--overlay-auto"]]: N === "overlay-auto",
		[M["modal__safe-top"]]: N !== "fullscreen" && C
	}), fe = _(M.modal__main, M[`modal__main--${N}`], {
		[M[`modal__main--${G}`]]: N !== "fullscreen",
		[M["modal__main--opacity-0"]]: !ce,
		[M["modal__main--animate-slide-up-90"]]: !J && (N === "menu" || N === "overlay-90" || N === "overlay-auto"),
		[M["modal__main--animate-slide-up-95"]]: !J && N === "overlay-95",
		[M["modal__main--animate-slide-right"]]: !J && N === "fullscreen"
	}), pe = o(() => O ? O(Z) : null, [O, Z]), me = !b && (K || pe) ? /* @__PURE__ */ m("div", {
		ref: L,
		children: pe
	}) : /* @__PURE__ */ m("div", {
		ref: L,
		children: /* @__PURE__ */ m(S, {
			label: f || void 0,
			closeButton: W || H,
			onClose: Z
		})
	}), he = o(() => k ? k(Z) : null, [k, Z]), ge = !b && he ? /* @__PURE__ */ m("footer", {
		className: M.modal__footer,
		children: he
	}) : null, _e = o(() => ae(l) ? l(Z) : l, [l, Z]);
	function ve(e) {
		return x ? /* @__PURE__ */ m(ee, { children: e }) : e;
	}
	return ve(/* @__PURE__ */ h("div", {
		id: e,
		ref: F,
		role: "dialog",
		"aria-labelledby": d || e,
		"aria-modal": "true",
		"data-layout": W ? "dialog" : "sheet",
		className: de,
		children: [
			/* @__PURE__ */ h("div", {
				ref: I,
				className: fe,
				style: W ? { maskImage: "-webkit-radial-gradient(white, black)" } : {
					willChange: "transform opacity",
					transition: Y.transitionEnabled ? Y.transition : "none",
					transform: Y.transform,
					opacity: Y.opacity
				},
				onClick: (e) => e.stopPropagation(),
				children: [
					me,
					/* @__PURE__ */ m("div", {
						className: M.modal__body,
						children: /* @__PURE__ */ m(u, {
							id: t,
							className: M["modal__scroll-area"],
							ref: z,
							scrollableNodeProps: { ref: R },
							children: b ? /* @__PURE__ */ m("div", {
								className: M.modal__loader,
								children: /* @__PURE__ */ m(E, { text: g })
							}) : _e
						})
					}),
					ge
				]
			}),
			se && /* @__PURE__ */ m(A, {
				title: T,
				description: D,
				onConfirm: Q,
				onClose: () => q(!1)
			}),
			/* @__PURE__ */ m("div", {
				className: _(M.modal__backdrop, { [M["modal__backdrop--hidden"]]: J && N !== "fullscreen" || J && K }),
				style: { willChange: "opacity" }
			})
		]
	}));
}
var oe = t(N);
//#endregion
//#region node_modules/.pnpm/body-scroll-lock@https+++codeload.github.com+yoozzeek+body-scroll-lock+tar.gz+d48bf791f8e0b11b9b05c20177f3c98845d27f67/node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js
function P(e) {
	if (Array.isArray(e)) {
		for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
		return n;
	} else return Array.from(e);
}
var F = !1;
if (typeof window < "u") {
	var I = { get passive() {
		F = !0;
	} };
	window.addEventListener("testPassive", null, I), window.removeEventListener("testPassive", null, I);
}
var L = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1), R = [], z = !1, B = -1, V = void 0, H = void 0, U = void 0, W = function(e) {
	return R.some(function(t) {
		return !!(t.options.allowTouchMove && t.options.allowTouchMove(e));
	});
}, G = function(e) {
	var t = e || window.event;
	return W(t.target) || t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1);
}, K = function(e) {
	if (U === void 0) {
		var t = !!e && e.reserveScrollBarGap === !0, n = window.innerWidth - document.documentElement.clientWidth;
		if (t && n > 0) {
			var r = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
			U = document.body.style.paddingRight, document.body.style.paddingRight = r + n + "px";
		}
	}
	V === void 0 && (V = document.body.style.overflow, document.body.style.overflow = "hidden");
}, se = function() {
	U !== void 0 && (document.body.style.paddingRight = U, U = void 0), V !== void 0 && (document.body.style.overflow = V, V = void 0);
}, q = function() {
	return window.requestAnimationFrame(function() {
		if (H === void 0) {
			H = {
				position: document.body.style.position,
				top: document.body.style.top,
				left: document.body.style.left
			};
			var e = window, t = e.scrollY, n = e.scrollX;
			document.body.style.position = "fixed", document.body.style.top = -t + "px", document.body.style.left = -n + "px";
		}
	});
}, ce = function() {
	if (H !== void 0) {
		var e = -parseInt(document.body.style.top, 10), t = -parseInt(document.body.style.left, 10);
		document.body.style.position = H.position, document.body.style.top = H.top, document.body.style.left = H.left, window.scrollTo(t, e), H = void 0;
	}
}, le = function(e) {
	return e ? e.scrollHeight - e.scrollTop <= e.clientHeight : !1;
}, J = function(e, t) {
	var n = e.targetTouches[0].clientY - B;
	return W(e.target) ? !1 : t && t.scrollTop === 0 && n > 0 || le(t) && n < 0 ? G(e) : (e.stopPropagation(), !0);
}, Y = function(e, t) {
	if (!e) {
		console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
		return;
	}
	if (!R.some(function(t) {
		return t.targetElement === e;
	})) {
		var n = {
			targetElement: e,
			options: t || {}
		};
		R = [].concat(P(R), [n]), L ? q() : K(t), L && (e.ontouchstart = function(e) {
			e.targetTouches.length === 1 && (B = e.targetTouches[0].clientY);
		}, e.ontouchmove = function(t) {
			t.targetTouches.length === 1 && J(t, e);
		}, z ||= (document.addEventListener("touchmove", G, F ? { passive: !1 } : void 0), !0));
	}
}, X = function(e) {
	if (!e) {
		console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
		return;
	}
	R = R.filter(function(t) {
		return t.targetElement !== e;
	}), L && (e.ontouchstart = null, e.ontouchmove = null, z && R.length === 0 && (document.removeEventListener("touchmove", G, F ? { passive: !1 } : void 0), z = !1)), L ? ce() : se();
}, Z = /* @__PURE__ */ new Map(), Q = null;
function $() {
	let { platform: e, maxTouchPoints: t } = window.navigator;
	return /iP(ad|hone|od)/.test(e) || e === "MacIntel" && t > 1;
}
function ue(e) {
	let t = e;
	for (; t && t !== document.body;) {
		if (t.getAttribute("body-scroll-lock-ignore") !== null) return !0;
		t = t.parentElement;
	}
	return !1;
}
function de() {
	let e = {
		isIos: $(),
		scrollX: window.scrollX,
		scrollY: window.scrollY,
		position: document.body.style.position,
		top: document.body.style.top,
		left: document.body.style.left,
		overflow: document.body.style.overflow
	};
	return e.isIos && document.body.style.setProperty("width", "100%"), e;
}
function fe(e) {
	e.isIos && (document.body.style.position = "fixed", document.body.style.setProperty("top", `${-e.scrollY}px`), document.body.style.setProperty("left", `${-e.scrollX}px`)), document.body.style.overflow = "hidden";
}
function pe(e) {
	e.isIos && (document.body.style.position = e.position, document.body.style.setProperty("top", e.top), document.body.style.setProperty("left", e.left), document.body.style.setProperty("width", ""), window.scrollTo(e.scrollX, e.scrollY)), document.body.style.overflow = e.overflow;
}
function me(e) {
	Z.size === 0 && (Q = de());
	let t = Z.get(e) ?? 0;
	Z.set(e, t + 1), t === 0 && Y(e, { allowTouchMove: ue });
	let n = !1;
	return () => {
		if (n) return;
		n = !0;
		let t = (Z.get(e) ?? 1) - 1;
		if (t > 0 ? Z.set(e, t) : (Z.delete(e), X(e)), Q) {
			if (Z.size > 0) {
				fe(Q);
				return;
			}
			pe(Q), Q = null;
		}
	};
}
//#endregion
//#region src/hooks/useModalStackCtx.ts
var he = "Escape";
function ge(e) {
	return e.scrollableContentRef.current ?? e.modalRef.current;
}
function _e() {
	let e = s(/* @__PURE__ */ new Map()), [t, r] = c([]), a = t[t.length - 1];
	i(() => {
		let e = !1;
		if (typeof document > "u" || !a) return;
		let t = a?.containerRef.current, n = a?.modalRef.current;
		function r(t) {
			e = !!(n && !n.contains(t.target));
		}
		function i(t) {
			let r = n && !n.contains(t.target);
			e && r && a.close(), e = !1;
		}
		function o(e) {
			e.key === he && (e.stopPropagation(), a.close());
		}
		return t?.addEventListener("mousedown", r), t?.addEventListener("touchstart", r), t?.addEventListener("mouseup", i), t?.addEventListener("touchend", i), document.addEventListener("keydown", o), () => {
			t?.removeEventListener("mousedown", r), t?.removeEventListener("touchstart", r), t?.removeEventListener("mouseup", i), t?.removeEventListener("touchend", i), document.removeEventListener("keydown", o);
		};
	}, [a]), j(() => {
		let n = e.current, r = new Map(t.map((e) => [e.key, ge(e)]));
		for (let [e, t] of n) r.get(e) !== t.target && (t.release(), n.delete(e));
		for (let [e, t] of r) !t || n.has(e) || n.set(e, {
			target: t,
			release: me(t)
		});
	}, [t]), j(() => {
		let t = e.current;
		return () => {
			for (let e of t.values()) e.release();
			t.clear();
		};
	}, []);
	let l = n((e) => {
		r((t) => t.some((t) => t.key === e.key) ? (console.warn(`react-context-modal: a modal with id "${e.key}" is already open. Modal ids must be unique. This modal is not registered in the stack, and gets no escape key, outside click or body scroll lock.`), t) : [...t, e]);
	}, []), u = n((e) => {
		r((t) => {
			let n = t.filter((t) => t.key !== e);
			return n.length === t.length ? t : n;
		});
	}, []), d = n((e, t) => {
		r((n) => {
			let r = n.findIndex((t) => t.key === e);
			if (r === -1) return n;
			let i = [...n];
			return i[r] = {
				...i[r],
				...t
			}, i;
		});
	}, []), f = n((e) => {
		let n = t.findIndex((t) => t.key === e);
		return [n, n === t.length - 1];
	}, [t]);
	return o(() => ({
		lastModal: a,
		apply: l,
		remove: u,
		update: d,
		getPositionInStack: f
	}), [
		a,
		l,
		u,
		d,
		f
	]);
}
//#endregion
//#region src/providers/ModalProvider.tsx
var ve = /^(?:\d+(?:\.\d+)?|\.\d+)(?:px|em|rem)$/;
function ye({ children: e, dialogFrom: t = w.dialogFrom, sheetCloseButton: n = w.sheetCloseButton, defaultSize: r = w.defaultSize }) {
	let i = _e(), a = o(() => {
		if (!ve.test(t)) throw Error(`react-context-modal: ModalProvider dialogFrom must be a non-negative length in px, em or rem, such as "768px"; received ${JSON.stringify(t)}.`);
		return {
			dialogFrom: t,
			sheetCloseButton: n,
			defaultSize: r
		};
	}, [
		t,
		n,
		r
	]);
	return /* @__PURE__ */ m(te.Provider, {
		value: a,
		children: /* @__PURE__ */ m(C.Provider, {
			value: i,
			children: e
		})
	});
}
//#endregion
export { oe as Modal, ye as ModalProvider, ne as useModal, _e as useModalStackCtx };
