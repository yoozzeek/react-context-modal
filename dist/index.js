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
});
//#endregion
//#region node_modules/.pnpm/body-scroll-lock@https+++codeload.github.com+yoozzeek+body-scroll-lock+tar.gz+d48bf791f8e0b11b9b05c20177f3c98845d27f67/node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js
function w(e) {
	if (Array.isArray(e)) {
		for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
		return n;
	} else return Array.from(e);
}
var T = !1;
if (typeof window < "u") {
	var E = { get passive() {
		T = !0;
	} };
	window.addEventListener("testPassive", null, E), window.removeEventListener("testPassive", null, E);
}
var D = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1), O = [], k = !1, A = -1, j = void 0, M = void 0, N = void 0, P = function(e) {
	return O.some(function(t) {
		return !!(t.options.allowTouchMove && t.options.allowTouchMove(e));
	});
}, F = function(e) {
	var t = e || window.event;
	return P(t.target) || t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1);
}, I = function(e) {
	if (N === void 0) {
		var t = !!e && e.reserveScrollBarGap === !0, n = window.innerWidth - document.documentElement.clientWidth;
		if (t && n > 0) {
			var r = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
			N = document.body.style.paddingRight, document.body.style.paddingRight = r + n + "px";
		}
	}
	j === void 0 && (j = document.body.style.overflow, document.body.style.overflow = "hidden");
}, L = function() {
	N !== void 0 && (document.body.style.paddingRight = N, N = void 0), j !== void 0 && (document.body.style.overflow = j, j = void 0);
}, R = function() {
	return window.requestAnimationFrame(function() {
		if (M === void 0) {
			M = {
				position: document.body.style.position,
				top: document.body.style.top,
				left: document.body.style.left
			};
			var e = window, t = e.scrollY, n = e.scrollX;
			document.body.style.position = "fixed", document.body.style.top = -t + "px", document.body.style.left = -n + "px";
		}
	});
}, z = function() {
	if (M !== void 0) {
		var e = -parseInt(document.body.style.top, 10), t = -parseInt(document.body.style.left, 10);
		document.body.style.position = M.position, document.body.style.top = M.top, document.body.style.left = M.left, window.scrollTo(t, e), M = void 0;
	}
}, B = function(e) {
	return e ? e.scrollHeight - e.scrollTop <= e.clientHeight : !1;
}, V = function(e, t) {
	var n = e.targetTouches[0].clientY - A;
	return P(e.target) ? !1 : t && t.scrollTop === 0 && n > 0 || B(t) && n < 0 ? F(e) : (e.stopPropagation(), !0);
}, H = function(e, t) {
	if (!e) {
		console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
		return;
	}
	if (!O.some(function(t) {
		return t.targetElement === e;
	})) {
		var n = {
			targetElement: e,
			options: t || {}
		};
		O = [].concat(w(O), [n]), D ? R() : I(t), D && (e.ontouchstart = function(e) {
			e.targetTouches.length === 1 && (A = e.targetTouches[0].clientY);
		}, e.ontouchmove = function(t) {
			t.targetTouches.length === 1 && V(t, e);
		}, k ||= (document.addEventListener("touchmove", F, T ? { passive: !1 } : void 0), !0));
	}
}, U = function(e) {
	if (!e) {
		console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
		return;
	}
	O = O.filter(function(t) {
		return t.targetElement !== e;
	}), D && (e.ontouchstart = null, e.ontouchmove = null, k && O.length === 0 && (document.removeEventListener("touchmove", F, T ? { passive: !1 } : void 0), k = !1)), D ? z() : L();
};
//#endregion
//#region src/utils/scrollLocker.ts
function W(e, t = !0) {
	if (!e) return () => null;
	let n = window.scrollY;
	return t && document.body.style.setProperty("top", `${n * -1}px`), H(e, { allowTouchMove: (e) => {
		let t = e ?? null;
		for (; t && t !== document.body;) {
			if (t.getAttribute("body-scroll-lock-ignore") !== null) return !0;
			t = t.parentElement;
		}
		return !1;
	} }), () => {
		if (U(e), t && (document.body.style.setProperty("top", ""), document.body.scrollTo(0, n)), !t) {
			document.body.style.overflow = "hidden";
			return;
		}
		document.body.style.overflow = "";
	};
}
//#endregion
//#region src/hooks/useModalStackCtx.ts
var G = "Escape";
function K() {
	let e = s(/* @__PURE__ */ new Set()), [t, r] = c([]), a = o(() => t[t.length - 1], [t]);
	i(() => {
		let t = !1;
		if (typeof document > "u" || !a) return;
		let n = a?.containerRef.current, r = a?.modalRef.current;
		function i(e) {
			t = !!(r && !r.contains(e.target));
		}
		function o(e) {
			let n = r && !r.contains(e.target);
			t && n && a.close(), t = !1;
		}
		function s(t) {
			t.stopPropagation(), t.key == G && (a.close(), e.current.delete(a.key));
		}
		return n?.addEventListener("mousedown", i), n?.addEventListener("touchstart", i), n?.addEventListener("mouseup", o), n?.addEventListener("touchend", o), document.addEventListener("keydown", s), () => {
			n?.removeEventListener("mousedown", i), n?.removeEventListener("touchstart", i), n?.removeEventListener("mouseup", o), n?.removeEventListener("touchend", o), document.removeEventListener("keydown", s);
		};
	}, [a]);
	let l = n((n) => {
		e.current.has(n.key) || (e.current.add(n.key), r((e) => t.findIndex((e) => e.key === n.key) === -1 ? (n.enableScroll = W(n.scrollableContentRef.current || n.modalRef.current, !e.length), [...e, n]) : e));
	}, [t]), u = n((t) => {
		e.current.delete(t), r((e) => {
			let n = [...e], r = e.findIndex((e) => e.key === t);
			return r === -1 ? e : r === 0 ? (n.reverse().forEach((e) => e.enableScroll?.()), []) : (n[r].enableScroll?.(), n.splice(r, 1), n);
		});
	}, []), d = n((n, i) => {
		if (!e.current.has(n)) return;
		let a = t.findIndex((e) => e.key === n);
		if (a > -1) {
			let o = [...t];
			o[a] = {
				...o[a],
				...i
			}, e.current.add(n), r(o);
		}
	}, [t]);
	function f(e) {
		let n = t.findIndex((t) => t.key === e);
		return [n, n === t.length - 1];
	}
	return {
		lastModal: a,
		apply: l,
		remove: u,
		update: d,
		getPositionInStack: f
	};
}
//#endregion
//#region src/providers/ModalProvider.tsx
var q = e(void 0);
function J({ children: e }) {
	let t = K();
	return /* @__PURE__ */ m(q.Provider, {
		value: t,
		children: e
	});
}
//#endregion
//#region src/hooks/useModal.ts
function Y(e) {
	return r(q) ?? e;
}
//#endregion
//#region src/assets/icons/loader.svg?react
var ee = (e) => /* @__PURE__ */ m("svg", {
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
}), te = ({ className: e, size: t = "md", text: n }) => /* @__PURE__ */ h("div", {
	className: "flex h-full w-full flex-col items-center justify-center",
	children: [
		/* @__PURE__ */ m(ee, { className: _("animate-spin", {
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
function X({ fullWidth: e = !1, type: t = "button", size: n = "md", disabled: r = !1, loading: i = !1, loadingText: a, variant: o = "light", onClick: s, children: c }) {
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
		children: i && o !== "none" ? /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m(te, { className: _("btn__loader", `btn__loader--variant-${o}`) }), a && /* @__PURE__ */ m("span", {
			className: "btn__loading-text",
			children: a
		})] }) : c
	});
}
//#endregion
//#region src/components/ModalConfirmAction.tsx
function ne({ title: e, description: t, variant: n = "danger", isLoading: r = !1, onConfirm: i, onClose: a }) {
	function o() {
		i(), a();
	}
	return /* @__PURE__ */ m($, {
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
			children: [/* @__PURE__ */ m(X, {
				fullWidth: !0,
				type: "button",
				variant: n,
				loading: r,
				onClick: o,
				children: "Confirm"
			}), /* @__PURE__ */ m(X, {
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
function re(e = "576px") {
	let t = `(min-width: ${e})`;
	return l(n((e) => {
		let n = window.matchMedia(t);
		return n.addEventListener ? (n.addEventListener("change", e), () => n.removeEventListener("change", e)) : (n.addListener(e), () => n.removeListener(e));
	}, [t]), () => window.matchMedia(t).matches, () => !0);
}
//#endregion
//#region src/hooks/useIsomorphicLayoutEffect.ts
var ie = typeof document < "u" ? a : i;
//#endregion
//#region src/hooks/useCoreHandlers.ts
function ae({ isLoading: e = !1, id: t, type: n, horizontalSwipe: r, stackCtx: i, modalRef: a, modalHeaderRef: o, scrollAreaRef: s, onClose: l }) {
	let u = re(), [d, p] = c({
		isMoving: !1,
		scrollDisabled: !1,
		transitionEnabled: !0,
		transition: "none",
		transform: "none",
		opacity: 1
	}), [m, h] = c(!1);
	function g() {
		let e = !1, t = s.current;
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
	ie(() => {
		let e = a.current;
		if (!e || u) return;
		let s = n === "fullscreen" && r, c = o.current, d = 0, f = 0, m = 0, _ = 0, v = !1, y = !1, b = 0, x = !1, S = (e) => {
			let t = e.changedTouches[0].clientX - m, n = e.changedTouches[0].clientY - f;
			return {
				directionX: Math.sign(t),
				directionY: Math.sign(n),
				factorX: Math.abs(t / window.innerWidth),
				factorY: Math.abs(n / window.innerHeight)
			};
		}, C = (e) => {
			if (e.touches.length !== 1) return;
			let t = e.touches[0];
			m = t.clientX, f = t.clientY, v = !0, y = !1, _ = (/* @__PURE__ */ new Date()).getTime(), b = (/* @__PURE__ */ new Date()).getTime();
			let { isTop: n } = g();
			x = n;
		};
		function w() {
			d = 0, f = 0, m = 0, _ = 0, v = !1, y = !1, b = 0, x = !1;
		}
		function T() {
			h(!0), w(), setTimeout(() => {
				i?.remove(t), l();
			}, 150);
		}
		function E() {
			T(), p((e) => ({
				...e,
				transitionEnabled: !0,
				transition: "transform 0.18s, opacity 0.18s",
				transform: "translateX(100%)",
				opacity: 0
			}));
		}
		function D() {
			p((e) => ({
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
			T(), p((e) => ({
				...e,
				transitionEnabled: !0,
				transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
				transform: "translateY(100%)",
				opacity: 0
			}));
		}
		function k() {
			p((e) => ({
				...e,
				transitionEnabled: !0,
				transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
				transform: "translateY(0)",
				opacity: 1
			}));
		}
		function A() {
			p((e) => ({
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
			p((e) => ({
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
			if (e.target.closest("[horizontal-scroll-inside-modal]") || !v) return;
			let { directionY: t, factorY: r, directionX: i, factorX: a } = S(e);
			if (d = e.touches[0].clientY, s) {
				if (!y && (/* @__PURE__ */ new Date()).getTime() - b > 150) return;
				if (y = !0, i === -1) {
					A();
					return;
				}
				if (a > r) {
					p({
						isMoving: !0,
						scrollDisabled: !0,
						transitionEnabled: !1,
						transition: "none",
						transform: `translateX(${e.changedTouches[0].clientX - m}px)`,
						opacity: 1
					});
					return;
				} else A();
				return;
			}
			if (n === "fullscreen") return;
			let o = c ? e.target === c || c.contains(e.target) : !1;
			if (!y && (/* @__PURE__ */ new Date()).getTime() - b > 150) return;
			if (y = !0, !x && !o) {
				j();
				return;
			}
			if (t === -1) {
				j();
				return;
			}
			let l = e.changedTouches[0].clientY - f;
			p((e) => ({
				...e,
				transitionEnabled: !1,
				transform: `translateY(${l}px)`,
				transition: "none"
			}));
		}, N = (e) => {
			let { directionX: t, factorX: r, directionY: i, factorY: o } = S(e);
			if (s) {
				t === 1 && r > .25 && ((/* @__PURE__ */ new Date()).getTime() - b < 250 || r > .8) ? E() : D(), w();
				return;
			}
			if (n === "fullscreen") return;
			if (!x) {
				let t = c ? e.target === c || c.contains(e.target) : !1;
				i === 1 && o > .25 && t ? O() : k(), w();
				return;
			}
			if (i === -1) {
				k(), w();
				return;
			}
			let { isScrollable: l, isTop: u } = g();
			if (l && !u) {
				k(), w();
				return;
			}
			if (f > d) {
				k(), w();
				return;
			}
			let p = (/* @__PURE__ */ new Date()).getTime() - _, m = (d - f) / (a.current?.clientHeight || 0);
			u && m > .25 && p < 250 && p < 500 || p > 500 && p < 1200 && o > .2 ? (O(), w()) : (k(), w());
		};
		return e.addEventListener("touchstart", C, { passive: !0 }), e.addEventListener("touchmove", M, { passive: !0 }), e.addEventListener("touchend", N, { passive: !0 }), () => {
			e.removeEventListener("touchstart", C), e.removeEventListener("touchmove", M), e.removeEventListener("touchend", N);
		};
	}, [
		e,
		n,
		u,
		i?.lastModal
	]);
	function _() {
		f(() => {
			h(!0), p((e) => ({
				...e,
				transitionEnabled: !0,
				transform: "translateY(100%)",
				transition: "transform 0.12s ease-out, opacity 0.12s ease-out",
				opacity: 0
			}));
		}), setTimeout(() => {
			i?.remove(t), l();
		}, u ? 0 : 200);
	}
	return {
		transformState: d,
		closeAnimation: m,
		handleClose: _
	};
}
var Z = {
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
function oe(e) {
	return typeof e == "function";
}
function Q({ id: e, scrollAreaId: t, children: r, ariaLabel: l, title: d, onClose: f, loadingText: p, horizontalSwipe: g = !1, confirmClose: v = !1, isLoading: y = !1, isPortal: x = !0, mobileSafeTop: S = !0, preventClose: w = !1, tabletBreakpoint: T, confirmTitle: E = "Are you sure?", confirmDescription: D = "Are you sure you want to close this dialog?", headerRenderer: O, footerRenderer: k, fallbackCtx: A, type: j = "overlay-auto", size: M = "md" }) {
	let N = Y(A), P = s(null), F = s(null), I = s(null), L = s(null), R = s(null), z = re(T), B = g && j === "fullscreen", [V, H] = c(!1), [U, W] = c(void 0), { closeAnimation: G, transformState: K, handleClose: q } = ae({
		id: e,
		modalRef: F,
		modalHeaderRef: I,
		scrollAreaRef: L,
		onClose: f,
		type: j ?? "overlay-auto",
		isLoading: y ?? !1,
		horizontalSwipe: g ?? !1,
		stackCtx: N
	}), J = n(() => {
		if (!w) {
			if (v) {
				H(!0);
				return;
			}
			q();
		}
	}, [v]), ee = n(() => {
		H(!1), q();
	}, []);
	a(() => {
		let t = e;
		N?.apply({
			key: t,
			simpleBarRef: R,
			containerRef: P,
			modalRef: F,
			scrollableContentRef: L,
			close: J
		});
	}, []), a(() => {
		if (!L.current) return;
		let e = new ResizeObserver(() => {
			W(L.current?.clientHeight);
		});
		return e.observe(L.current), () => e.disconnect();
	}, []), i(() => {
		let e = document.querySelector("meta[name=\"theme-color\"]"), t = null, n = e;
		return e ? (t = e.getAttribute("content"), e.setAttribute("content", "#000000")) : (n = document.createElement("meta"), n.name = "theme-color", n.content = "#000000", document.head.appendChild(n)), () => {
			t === null ? n?.remove() : n?.setAttribute("content", t);
		};
	}, []);
	let X = _(Z.modal__container, {
		[Z["modal__container--fullscreen"]]: j === "fullscreen",
		[Z["modal__container--menu"]]: j === "menu",
		[Z["modal__container--overlay-90"]]: j === "overlay-90",
		[Z["modal__container--overlay-95"]]: j === "overlay-95",
		[Z["modal__container--overlay-auto"]]: j === "overlay-auto",
		[Z["modal__safe-top"]]: j !== "fullscreen" && S
	}), ie = _(Z.modal__main, Z[`modal__main--${j}`], {
		[Z[`modal__main--${M}`]]: j !== "fullscreen",
		[Z["modal__main--opacity-0"]]: !U,
		[Z["modal__main--animate-slide-up-90"]]: !G && (j === "menu" || j === "overlay-90" || j === "overlay-auto"),
		[Z["modal__main--animate-slide-up-95"]]: !G && j === "overlay-95",
		[Z["modal__main--animate-slide-right"]]: !G && j === "fullscreen"
	}), Q = o(() => O ? O(J) : null, [O, J]), $ = !y && (B || Q) ? /* @__PURE__ */ m("div", {
		ref: I,
		children: Q
	}) : /* @__PURE__ */ m("div", {
		ref: I,
		children: /* @__PURE__ */ m(C, {
			label: d || void 0,
			onClose: J
		})
	}), se = o(() => k ? k(J) : null, [k, J]), ce = !y && se ? /* @__PURE__ */ m("footer", {
		className: Z.modal__footer,
		children: se
	}) : null, le = o(() => oe(r) ? r(J) : r, [r, J]);
	function ue(e) {
		return x ? /* @__PURE__ */ m(b, { children: e }) : e;
	}
	return ue(/* @__PURE__ */ h("div", {
		id: e,
		ref: P,
		role: "dialog",
		"aria-labelledby": l || e,
		"aria-modal": "true",
		className: X,
		children: [
			/* @__PURE__ */ h("div", {
				ref: F,
				className: ie,
				style: z ? { maskImage: "-webkit-radial-gradient(white, black)" } : {
					willChange: "transform opacity",
					transition: K.transitionEnabled ? K.transition : "none",
					transform: K.transform,
					opacity: K.opacity
				},
				onClick: (e) => e.stopPropagation(),
				children: [
					$,
					/* @__PURE__ */ m("div", {
						className: Z.modal__body,
						children: /* @__PURE__ */ m(u, {
							id: t,
							className: Z["modal__scroll-area"],
							ref: R,
							scrollableNodeProps: { ref: L },
							children: y ? /* @__PURE__ */ m("div", {
								className: Z.modal__loader,
								children: /* @__PURE__ */ m(te, { text: p })
							}) : le
						})
					}),
					ce
				]
			}),
			V && /* @__PURE__ */ m(ne, {
				title: E,
				description: D,
				onConfirm: ee,
				onClose: () => H(!1)
			}),
			/* @__PURE__ */ m("div", {
				className: _(Z.modal__backdrop, { [Z["modal__backdrop--hidden"]]: G && j !== "fullscreen" || G && B }),
				style: { willChange: "opacity" }
			})
		]
	}));
}
var $ = t(Q);
//#endregion
export { $ as Modal, J as ModalProvider, Y as useModal, K as useModalStackCtx };
