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
var b = ({ children: e }) => {
	let t = s(document.createElement("div")), n = o(() => y(), []);
	return i(() => {
		let e = t.current;
		return n.appendChild(e), () => void n.removeChild(e);
	}, [n]), d(e, n);
}, x = {
	modal__header: "context-modal-modal__header",
	"modal__header--with-label": "context-modal-modal__header--with-label",
	"modal__header--no-label": "context-modal-modal__header--no-label",
	"modal__header--with-bar": "context-modal-modal__header--with-bar",
	"modal__header-title": "context-modal-modal__header-title",
	"modal__header-close": "context-modal-modal__header-close",
	"modal__header-close-icon": "context-modal-modal__header-close-icon"
}, S = (e) => /* @__PURE__ */ h("svg", {
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
}), C = ({ label: e, onClose: t }) => /* @__PURE__ */ h("header", {
	className: _(x.modal__header, x["modal__header--with-bar"], {
		[x["modal__header--with-label"]]: !!e,
		[x["modal__header--no-label"]]: !e
	}),
	children: [e && /* @__PURE__ */ m("h4", {
		className: x["modal__header-title"],
		children: e
	}), /* @__PURE__ */ m("button", {
		type: "button",
		className: x["modal__header-close"],
		onClick: t,
		children: /* @__PURE__ */ m(S, { className: x["modal__header-close-icon"] })
	})]
}), w = e(void 0);
//#endregion
//#region src/hooks/useModal.ts
function T(e) {
	return r(w) ?? e;
}
//#endregion
//#region src/assets/icons/loader.svg?react
var E = (e) => /* @__PURE__ */ m("svg", {
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
}), D = ({ className: e, size: t = "md", text: n }) => /* @__PURE__ */ h("div", {
	className: "flex h-full w-full flex-col items-center justify-center",
	children: [
		/* @__PURE__ */ m(E, { className: _("animate-spin", {
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
});
//#endregion
//#region src/components/Button.tsx
function O({ fullWidth: e = !1, type: t = "button", size: n = "md", disabled: r = !1, loading: i = !1, loadingText: a, variant: o = "light", onClick: s, children: c }) {
	return /* @__PURE__ */ m("button", {
		className: _("btn", `btn--variant-${o}`, `btn--size-${n}`, {
			"btn--fullwidth": e,
			"btn--loading": i,
			"btn--icon": n === "icon",
			"btn--flex": i && o !== "none",
			"btn--disabled": r || i
		}),
		disabled: r || i,
		type: t || "button",
		onClick: s,
		children: i && o !== "none" ? /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m(D, { className: _("btn__loader", `btn__loader--variant-${o}`) }), a && /* @__PURE__ */ m("span", {
			className: "btn__loading-text",
			children: a
		})] }) : c
	});
}
//#endregion
//#region src/components/ModalConfirmAction.tsx
function k({ title: e, description: t, variant: n = "danger", isLoading: r = !1, onConfirm: i, onClose: a }) {
	function o() {
		i(), a();
	}
	return /* @__PURE__ */ m(F, {
		id: "confirm-action-modal",
		ariaLabel: "Aria label",
		type: "overlay-auto",
		size: "sm",
		headerRenderer: () => /* @__PURE__ */ m("h3", {
			className: "modal-confirm__title",
			children: e
		}),
		footerRenderer: (e) => /* @__PURE__ */ h("div", {
			className: "modal-confirm__footer",
			children: [/* @__PURE__ */ m(O, {
				fullWidth: !0,
				type: "button",
				variant: n,
				loading: r,
				onClick: o,
				children: "Confirm"
			}), /* @__PURE__ */ m(O, {
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
			className: "modal-confirm__description",
			children: t
		})
	});
}
//#endregion
//#region src/hooks/useIsTabletOrDesktop.ts
function A(e = "576px") {
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
function M({ isLoading: e = !1, id: t, type: r, horizontalSwipe: i, stackCtx: a, modalRef: o, modalHeaderRef: l, scrollAreaRef: u, onClose: d }) {
	let p = A(), m = s(d), h = s(a), [g, _] = c({
		isMoving: !1,
		scrollDisabled: !1,
		transitionEnabled: !0,
		transition: "none",
		transform: "none",
		opacity: 1
	}), [v, y] = c(!1);
	j(() => {
		m.current = d, h.current = a;
	});
	function b() {
		let e = !1, t = u.current;
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
		let e = o.current;
		if (!e || p) return;
		let n = r === "fullscreen" && i, a = l.current, s = 0, c = 0, u = 0, d = 0, f = !1, g = !1, v = 0, x = !1, S = (e) => {
			let t = e.changedTouches[0].clientX - u, n = e.changedTouches[0].clientY - c;
			return {
				directionX: Math.sign(t),
				directionY: Math.sign(n),
				factorX: Math.abs(t / window.innerWidth),
				factorY: Math.abs(n / window.innerHeight)
			};
		}, C = (e) => {
			if (e.touches.length !== 1) return;
			let t = e.touches[0];
			u = t.clientX, c = t.clientY, f = !0, g = !1, d = (/* @__PURE__ */ new Date()).getTime(), v = (/* @__PURE__ */ new Date()).getTime();
			let { isTop: n } = b();
			x = n;
		};
		function w() {
			s = 0, c = 0, u = 0, d = 0, f = !1, g = !1, v = 0, x = !1;
		}
		function T() {
			y(!0), w(), setTimeout(() => {
				h.current?.remove(t), m.current();
			}, 150);
		}
		function E() {
			T(), _((e) => ({
				...e,
				transitionEnabled: !0,
				transition: "transform 0.18s, opacity 0.18s",
				transform: "translateX(100%)",
				opacity: 0
			}));
		}
		function D() {
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
		function O() {
			T(), _((e) => ({
				...e,
				transitionEnabled: !0,
				transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
				transform: "translateY(100%)",
				opacity: 0
			}));
		}
		function k() {
			_((e) => ({
				...e,
				transitionEnabled: !0,
				transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
				transform: "translateY(0)",
				opacity: 1
			}));
		}
		function A() {
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
		function j() {
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
		let M = (e) => {
			if (e.target.closest("[horizontal-scroll-inside-modal]") || !f) return;
			let { directionY: t, factorY: i, directionX: o, factorX: l } = S(e);
			if (s = e.touches[0].clientY, n) {
				if (!g && (/* @__PURE__ */ new Date()).getTime() - v > 150) return;
				if (g = !0, o === -1) {
					A();
					return;
				}
				if (l > i) {
					_({
						isMoving: !0,
						scrollDisabled: !0,
						transitionEnabled: !1,
						transition: "none",
						transform: `translateX(${e.changedTouches[0].clientX - u}px)`,
						opacity: 1
					});
					return;
				} else A();
				return;
			}
			if (r === "fullscreen") return;
			let d = a ? e.target === a || a.contains(e.target) : !1;
			if (!g && (/* @__PURE__ */ new Date()).getTime() - v > 150) return;
			if (g = !0, !x && !d) {
				j();
				return;
			}
			if (t === -1) {
				j();
				return;
			}
			let p = e.changedTouches[0].clientY - c;
			_((e) => ({
				...e,
				transitionEnabled: !1,
				transform: `translateY(${p}px)`,
				transition: "none"
			}));
		}, N = (e) => {
			let { directionX: t, factorX: i, directionY: l, factorY: u } = S(e);
			if (n) {
				t === 1 && i > .25 && ((/* @__PURE__ */ new Date()).getTime() - v < 250 || i > .8) ? E() : D(), w();
				return;
			}
			if (r === "fullscreen") return;
			if (!x) {
				let t = a ? e.target === a || a.contains(e.target) : !1;
				l === 1 && u > .25 && t ? O() : k(), w();
				return;
			}
			if (l === -1) {
				k(), w();
				return;
			}
			let { isScrollable: f, isTop: p } = b();
			if (f && !p) {
				k(), w();
				return;
			}
			if (c > s) {
				k(), w();
				return;
			}
			let m = (/* @__PURE__ */ new Date()).getTime() - d, h = (s - c) / (o.current?.clientHeight || 0);
			p && h > .25 && m < 250 && m < 500 || m > 500 && m < 1200 && u > .2 ? (O(), w()) : (k(), w());
		};
		return e.addEventListener("touchstart", C, { passive: !0 }), e.addEventListener("touchmove", M, { passive: !0 }), e.addEventListener("touchend", N, { passive: !0 }), () => {
			e.removeEventListener("touchstart", C), e.removeEventListener("touchmove", M), e.removeEventListener("touchend", N);
		};
	}, [
		e,
		r,
		p,
		i,
		t
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
				h.current?.remove(t), m.current();
			}, p ? 0 : 200);
		}, [t, p])
	};
}
var N = {
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
	"modal__main--overlay-base": "context-modal-modal__main--overlay-base",
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
function ee(e) {
	return typeof e == "function";
}
function P({ id: e, scrollAreaId: t, children: r, ariaLabel: l, title: d, onClose: f, loadingText: p, horizontalSwipe: g = !1, confirmClose: v = !1, isLoading: y = !1, isPortal: x = !0, mobileSafeTop: S = !0, preventClose: w = !1, tabletBreakpoint: E, confirmTitle: O = "Are you sure?", confirmDescription: j = "Are you sure you want to close this dialog?", headerRenderer: P, footerRenderer: F, fallbackCtx: te, type: I = "overlay-auto", size: L = "md" }) {
	let R = T(te), z = s(null), B = s(null), V = s(null), H = s(null), U = s(null), W = s(R), G = A(E), K = g && I === "fullscreen", [ne, q] = c(!1), [re, ie] = c(void 0), { closeAnimation: J, transformState: Y, handleClose: X } = M({
		id: e,
		modalRef: B,
		modalHeaderRef: V,
		scrollAreaRef: H,
		onClose: f,
		type: I ?? "overlay-auto",
		isLoading: y ?? !1,
		horizontalSwipe: g ?? !1,
		stackCtx: R
	}), Z = n(() => {
		if (!w) {
			if (v) {
				q(!0);
				return;
			}
			X();
		}
	}, [
		w,
		v,
		X
	]), Q = n(() => {
		q(!1), X();
	}, [X]), $ = s(Z);
	a(() => {
		W.current = R, $.current = Z;
	});
	let ae = n(() => $.current(), []);
	a(() => {
		let t = W.current;
		return t?.apply({
			key: e,
			simpleBarRef: U,
			containerRef: z,
			modalRef: B,
			scrollableContentRef: H,
			close: ae
		}), () => t?.remove(e);
	}, [e, ae]), a(() => {
		if (!H.current) return;
		let e = new ResizeObserver(() => {
			ie(H.current?.clientHeight);
		});
		return e.observe(H.current), () => e.disconnect();
	}, []), i(() => {
		let e = document.querySelector("meta[name=\"theme-color\"]"), t = null, n = e;
		return e ? (t = e.getAttribute("content"), e.setAttribute("content", "#000000")) : (n = document.createElement("meta"), n.name = "theme-color", n.content = "#000000", document.head.appendChild(n)), () => {
			t === null ? n?.remove() : n?.setAttribute("content", t);
		};
	}, []);
	let oe = _(N.modal__container, {
		[N["modal__container--fullscreen"]]: I === "fullscreen",
		[N["modal__container--menu"]]: I === "menu",
		[N["modal__container--overlay-90"]]: I === "overlay-90",
		[N["modal__container--overlay-95"]]: I === "overlay-95",
		[N["modal__container--overlay-auto"]]: I === "overlay-auto",
		[N["modal__safe-top"]]: I !== "fullscreen" && S
	}), se = _(N.modal__main, N[`modal__main--${I}`], {
		[N[`modal__main--${L}`]]: I !== "fullscreen",
		[N["modal__main--opacity-0"]]: !re,
		[N["modal__main--animate-slide-up-90"]]: !J && (I === "menu" || I === "overlay-90" || I === "overlay-auto"),
		[N["modal__main--animate-slide-up-95"]]: !J && I === "overlay-95",
		[N["modal__main--animate-slide-right"]]: !J && I === "fullscreen"
	}), ce = o(() => P ? P(Z) : null, [P, Z]), le = !y && (K || ce) ? /* @__PURE__ */ m("div", {
		ref: V,
		children: ce
	}) : /* @__PURE__ */ m("div", {
		ref: V,
		children: /* @__PURE__ */ m(C, {
			label: d || void 0,
			onClose: Z
		})
	}), ue = o(() => F ? F(Z) : null, [F, Z]), de = !y && ue ? /* @__PURE__ */ m("footer", {
		className: N.modal__footer,
		children: ue
	}) : null, fe = o(() => ee(r) ? r(Z) : r, [r, Z]);
	function pe(e) {
		return x ? /* @__PURE__ */ m(b, { children: e }) : e;
	}
	return pe(/* @__PURE__ */ h("div", {
		id: e,
		ref: z,
		role: "dialog",
		"aria-labelledby": l || e,
		"aria-modal": "true",
		className: oe,
		children: [
			/* @__PURE__ */ h("div", {
				ref: B,
				className: se,
				style: G ? { maskImage: "-webkit-radial-gradient(white, black)" } : {
					willChange: "transform opacity",
					transition: Y.transitionEnabled ? Y.transition : "none",
					transform: Y.transform,
					opacity: Y.opacity
				},
				onClick: (e) => e.stopPropagation(),
				children: [
					le,
					/* @__PURE__ */ m("div", {
						className: N.modal__body,
						children: /* @__PURE__ */ m(u, {
							id: t,
							className: N["modal__scroll-area"],
							ref: U,
							scrollableNodeProps: { ref: H },
							children: y ? /* @__PURE__ */ m("div", {
								className: N.modal__loader,
								children: /* @__PURE__ */ m(D, { text: p })
							}) : fe
						})
					}),
					de
				]
			}),
			ne && /* @__PURE__ */ m(k, {
				title: O,
				description: j,
				onConfirm: Q,
				onClose: () => q(!1)
			}),
			/* @__PURE__ */ m("div", {
				className: _(N.modal__backdrop, { [N["modal__backdrop--hidden"]]: J && I !== "fullscreen" || J && K }),
				style: { willChange: "opacity" }
			})
		]
	}));
}
var F = t(P);
//#endregion
//#region node_modules/.pnpm/body-scroll-lock@https+++codeload.github.com+yoozzeek+body-scroll-lock+tar.gz+d48bf791f8e0b11b9b05c20177f3c98845d27f67/node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js
function te(e) {
	if (Array.isArray(e)) {
		for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
		return n;
	} else return Array.from(e);
}
var I = !1;
if (typeof window < "u") {
	var L = { get passive() {
		I = !0;
	} };
	window.addEventListener("testPassive", null, L), window.removeEventListener("testPassive", null, L);
}
var R = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1), z = [], B = !1, V = -1, H = void 0, U = void 0, W = void 0, G = function(e) {
	return z.some(function(t) {
		return !!(t.options.allowTouchMove && t.options.allowTouchMove(e));
	});
}, K = function(e) {
	var t = e || window.event;
	return G(t.target) || t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1);
}, ne = function(e) {
	if (W === void 0) {
		var t = !!e && e.reserveScrollBarGap === !0, n = window.innerWidth - document.documentElement.clientWidth;
		if (t && n > 0) {
			var r = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
			W = document.body.style.paddingRight, document.body.style.paddingRight = r + n + "px";
		}
	}
	H === void 0 && (H = document.body.style.overflow, document.body.style.overflow = "hidden");
}, q = function() {
	W !== void 0 && (document.body.style.paddingRight = W, W = void 0), H !== void 0 && (document.body.style.overflow = H, H = void 0);
}, re = function() {
	return window.requestAnimationFrame(function() {
		if (U === void 0) {
			U = {
				position: document.body.style.position,
				top: document.body.style.top,
				left: document.body.style.left
			};
			var e = window, t = e.scrollY, n = e.scrollX;
			document.body.style.position = "fixed", document.body.style.top = -t + "px", document.body.style.left = -n + "px";
		}
	});
}, ie = function() {
	if (U !== void 0) {
		var e = -parseInt(document.body.style.top, 10), t = -parseInt(document.body.style.left, 10);
		document.body.style.position = U.position, document.body.style.top = U.top, document.body.style.left = U.left, window.scrollTo(t, e), U = void 0;
	}
}, J = function(e) {
	return e ? e.scrollHeight - e.scrollTop <= e.clientHeight : !1;
}, Y = function(e, t) {
	var n = e.targetTouches[0].clientY - V;
	return G(e.target) ? !1 : t && t.scrollTop === 0 && n > 0 || J(t) && n < 0 ? K(e) : (e.stopPropagation(), !0);
}, X = function(e, t) {
	if (!e) {
		console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
		return;
	}
	if (!z.some(function(t) {
		return t.targetElement === e;
	})) {
		var n = {
			targetElement: e,
			options: t || {}
		};
		z = [].concat(te(z), [n]), R ? re() : ne(t), R && (e.ontouchstart = function(e) {
			e.targetTouches.length === 1 && (V = e.targetTouches[0].clientY);
		}, e.ontouchmove = function(t) {
			t.targetTouches.length === 1 && Y(t, e);
		}, B ||= (document.addEventListener("touchmove", K, I ? { passive: !1 } : void 0), !0));
	}
}, Z = function(e) {
	if (!e) {
		console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
		return;
	}
	z = z.filter(function(t) {
		return t.targetElement !== e;
	}), R && (e.ontouchstart = null, e.ontouchmove = null, B && z.length === 0 && (document.removeEventListener("touchmove", K, I ? { passive: !1 } : void 0), B = !1)), R ? ie() : q();
}, Q = /* @__PURE__ */ new Map(), $ = null;
function ae() {
	let { platform: e, maxTouchPoints: t } = window.navigator;
	return /iP(ad|hone|od)/.test(e) || e === "MacIntel" && t > 1;
}
function oe(e) {
	let t = e;
	for (; t && t !== document.body;) {
		if (t.getAttribute("body-scroll-lock-ignore") !== null) return !0;
		t = t.parentElement;
	}
	return !1;
}
function se() {
	let e = {
		isIos: ae(),
		scrollX: window.scrollX,
		scrollY: window.scrollY,
		position: document.body.style.position,
		top: document.body.style.top,
		left: document.body.style.left,
		overflow: document.body.style.overflow
	};
	return e.isIos && document.body.style.setProperty("width", "100%"), e;
}
function ce(e) {
	e.isIos && (document.body.style.position = "fixed", document.body.style.setProperty("top", `${-e.scrollY}px`), document.body.style.setProperty("left", `${-e.scrollX}px`)), document.body.style.overflow = "hidden";
}
function le(e) {
	e.isIos && (document.body.style.position = e.position, document.body.style.setProperty("top", e.top), document.body.style.setProperty("left", e.left), document.body.style.setProperty("width", ""), window.scrollTo(e.scrollX, e.scrollY)), document.body.style.overflow = e.overflow;
}
function ue(e) {
	Q.size === 0 && ($ = se());
	let t = Q.get(e) ?? 0;
	Q.set(e, t + 1), t === 0 && X(e, { allowTouchMove: oe });
	let n = !1;
	return () => {
		if (n) return;
		n = !0;
		let t = (Q.get(e) ?? 1) - 1;
		if (t > 0 ? Q.set(e, t) : (Q.delete(e), Z(e)), $) {
			if (Q.size > 0) {
				ce($);
				return;
			}
			le($), $ = null;
		}
	};
}
//#endregion
//#region src/hooks/useModalStackCtx.ts
var de = "Escape";
function fe(e) {
	return e.scrollableContentRef.current ?? e.modalRef.current;
}
function pe() {
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
			e.key === de && (e.stopPropagation(), a.close());
		}
		return t?.addEventListener("mousedown", r), t?.addEventListener("touchstart", r), t?.addEventListener("mouseup", i), t?.addEventListener("touchend", i), document.addEventListener("keydown", o), () => {
			t?.removeEventListener("mousedown", r), t?.removeEventListener("touchstart", r), t?.removeEventListener("mouseup", i), t?.removeEventListener("touchend", i), document.removeEventListener("keydown", o);
		};
	}, [a]), j(() => {
		let n = e.current, r = new Map(t.map((e) => [e.key, fe(e)]));
		for (let [e, t] of n) r.get(e) !== t.target && (t.release(), n.delete(e));
		for (let [e, t] of r) !t || n.has(e) || n.set(e, {
			target: t,
			release: ue(t)
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
function me({ children: e }) {
	let t = pe();
	return /* @__PURE__ */ m(w.Provider, {
		value: t,
		children: e
	});
}
//#endregion
export { F as Modal, me as ModalProvider, T as useModal, pe as useModalStackCtx };
