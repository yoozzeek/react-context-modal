import { createContext as e, memo as t, useCallback as n, useContext as r, useEffect as i, useLayoutEffect as a, useMemo as o, useRef as s, useState as c } from "react";
import l from "simplebar-react";
import { createPortal as u, flushSync as d } from "react-dom";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function h(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = h(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function g() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = h(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region src/components/ModalPortal.tsx
var _ = "context-modal-portal";
function v() {
	let e = document.getElementById(_);
	if (e) return e;
	let t = document.createElement("div");
	return t.id = _, document.body.appendChild(t), t;
}
var y = ({ children: e }) => {
	let t = s(document.createElement("div")), n = o(() => v(), []);
	return i(() => {
		let e = t.current;
		return n.appendChild(e), () => void n.removeChild(e);
	}, [n]), u(e, n);
}, b = {
	modal__header: "context-modal-modal__header",
	"modal__header--with-label": "context-modal-modal__header--with-label",
	"modal__header--no-label": "context-modal-modal__header--no-label",
	"modal__header--with-bar": "context-modal-modal__header--with-bar",
	"modal__header-title": "context-modal-modal__header-title",
	"modal__header-close": "context-modal-modal__header-close",
	"modal__header-close-icon": "context-modal-modal__header-close-icon"
}, x = (e) => /* @__PURE__ */ m("svg", {
	viewBox: "0 0 20 20",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: [/* @__PURE__ */ p("path", {
		d: "M14.9498 6.46443C15.3403 6.07391 15.3403 5.44074 14.9498 5.05022C14.5593 4.65969 13.9261 4.65969 13.5356 5.05022L14.9498 6.46443ZM5.05029 13.5355C4.65976 13.926 4.65976 14.5592 5.05029 14.9497C5.44081 15.3402 6.07398 15.3402 6.4645 14.9497L5.05029 13.5355ZM13.5356 5.05022L5.05029 13.5355L6.4645 14.9497L14.9498 6.46443L13.5356 5.05022Z",
		fill: "currentColor"
	}), /* @__PURE__ */ p("path", {
		d: "M13.5356 14.9498C13.9261 15.3403 14.5593 15.3403 14.9498 14.9498C15.3403 14.5593 15.3403 13.9261 14.9498 13.5356L13.5356 14.9498ZM6.4645 5.05029C6.07398 4.65976 5.44081 4.65976 5.05029 5.05029C4.65976 5.44081 4.65976 6.07398 5.05029 6.4645L6.4645 5.05029ZM14.9498 13.5356L6.4645 5.05029L5.05029 6.4645L13.5356 14.9498L14.9498 13.5356Z",
		fill: "currentColor"
	})]
}), S = ({ label: e, onClose: t }) => /* @__PURE__ */ m("header", {
	className: g(b.modal__header, b["modal__header--with-bar"], {
		[b["modal__header--with-label"]]: !!e,
		[b["modal__header--no-label"]]: !e
	}),
	children: [e && /* @__PURE__ */ p("h4", {
		className: b["modal__header-title"],
		children: e
	}), /* @__PURE__ */ p("button", {
		type: "button",
		className: b["modal__header-close"],
		onClick: t,
		children: /* @__PURE__ */ p(x, { className: b["modal__header-close-icon"] })
	})]
});
//#endregion
//#region node_modules/.pnpm/body-scroll-lock@https+++codeload.github.com+yoozzeek+body-scroll-lock+tar.gz+d48bf791f8e0b11b9b05c20177f3c98845d27f67/node_modules/body-scroll-lock/lib/bodyScrollLock.esm.js
function C(e) {
	if (Array.isArray(e)) {
		for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
		return n;
	} else return Array.from(e);
}
var w = !1;
if (typeof window < "u") {
	var T = { get passive() {
		w = !0;
	} };
	window.addEventListener("testPassive", null, T), window.removeEventListener("testPassive", null, T);
}
var E = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1), D = [], O = !1, k = -1, A = void 0, j = void 0, M = void 0, N = function(e) {
	return D.some(function(t) {
		return !!(t.options.allowTouchMove && t.options.allowTouchMove(e));
	});
}, P = function(e) {
	var t = e || window.event;
	return N(t.target) || t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1);
}, F = function(e) {
	if (M === void 0) {
		var t = !!e && e.reserveScrollBarGap === !0, n = window.innerWidth - document.documentElement.clientWidth;
		if (t && n > 0) {
			var r = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
			M = document.body.style.paddingRight, document.body.style.paddingRight = r + n + "px";
		}
	}
	A === void 0 && (A = document.body.style.overflow, document.body.style.overflow = "hidden");
}, I = function() {
	M !== void 0 && (document.body.style.paddingRight = M, M = void 0), A !== void 0 && (document.body.style.overflow = A, A = void 0);
}, L = function() {
	return window.requestAnimationFrame(function() {
		if (j === void 0) {
			j = {
				position: document.body.style.position,
				top: document.body.style.top,
				left: document.body.style.left
			};
			var e = window, t = e.scrollY, n = e.scrollX;
			document.body.style.position = "fixed", document.body.style.top = -t + "px", document.body.style.left = -n + "px";
		}
	});
}, R = function() {
	if (j !== void 0) {
		var e = -parseInt(document.body.style.top, 10), t = -parseInt(document.body.style.left, 10);
		document.body.style.position = j.position, document.body.style.top = j.top, document.body.style.left = j.left, window.scrollTo(t, e), j = void 0;
	}
}, z = function(e) {
	return e ? e.scrollHeight - e.scrollTop <= e.clientHeight : !1;
}, B = function(e, t) {
	var n = e.targetTouches[0].clientY - k;
	return N(e.target) ? !1 : t && t.scrollTop === 0 && n > 0 || z(t) && n < 0 ? P(e) : (e.stopPropagation(), !0);
}, V = function(e, t) {
	if (!e) {
		console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
		return;
	}
	if (!D.some(function(t) {
		return t.targetElement === e;
	})) {
		var n = {
			targetElement: e,
			options: t || {}
		};
		D = [].concat(C(D), [n]), E ? L() : F(t), E && (e.ontouchstart = function(e) {
			e.targetTouches.length === 1 && (k = e.targetTouches[0].clientY);
		}, e.ontouchmove = function(t) {
			t.targetTouches.length === 1 && B(t, e);
		}, O ||= (document.addEventListener("touchmove", P, w ? { passive: !1 } : void 0), !0));
	}
}, H = function(e) {
	if (!e) {
		console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
		return;
	}
	D = D.filter(function(t) {
		return t.targetElement !== e;
	}), E && (e.ontouchstart = null, e.ontouchmove = null, O && D.length === 0 && (document.removeEventListener("touchmove", P, w ? { passive: !1 } : void 0), O = !1)), E ? R() : I();
};
//#endregion
//#region src/utils/scrollLocker.ts
function U(e, t = !0) {
	if (!e) return () => null;
	let n = window.scrollY;
	return t && document.body.style.setProperty("top", `${n * -1}px`), V(e, { allowTouchMove: (e) => {
		for (; e && e !== document.body;) {
			if (e.getAttribute("body-scroll-lock-ignore") !== null) return !0;
			e = e.parentElement;
		}
	} }), () => {
		if (H(e), t && (document.body.style.setProperty("top", ""), document.body.scrollTo(0, n)), !t) {
			document.body.style.overflow = "hidden";
			return;
		}
		document.body.style.overflow = "";
	};
}
//#endregion
//#region src/hooks/useModalStackCtx.ts
var W = "Escape";
function G() {
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
			t.stopPropagation(), t.key == W && (a.close(), e.current.delete(a.key));
		}
		return n?.addEventListener("mousedown", i), n?.addEventListener("touchstart", i), n?.addEventListener("mouseup", o), n?.addEventListener("touchend", o), document.addEventListener("keydown", s), () => {
			n?.removeEventListener("mousedown", i), n?.removeEventListener("touchstart", i), n?.removeEventListener("mouseup", o), n?.removeEventListener("touchend", o), document.removeEventListener("keydown", s);
		};
	}, [a]);
	let l = n((n) => {
		e.current.has(n.key) || (e.current.add(n.key), r((e) => t.findIndex((e) => e.key === n.key) === -1 ? (n.enableScroll = U(n.scrollableContentRef.current || n.modalRef.current, !e.length), [...e, n]) : e));
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
var K = e(void 0);
function q({ children: e }) {
	let t = G();
	return /* @__PURE__ */ p(K.Provider, {
		value: t,
		children: e
	});
}
//#endregion
//#region src/hooks/useModal.ts
function J(e) {
	return r(K) ?? e;
}
//#endregion
//#region src/assets/icons/loader.svg?react
var Y = (e) => /* @__PURE__ */ p("svg", {
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...e,
	children: /* @__PURE__ */ p("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M0 12C0 5.37258 5.37258 0 12 0C12.8284 0 13.5 0.671573 13.5 1.5C13.5 2.32843 12.8284 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.1716 21.6716 10.5 22.5 10.5C23.3284 10.5 24 11.1716 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z",
		fill: "currentColor"
	})
}), X = ({ className: e, size: t = "md", text: n }) => /* @__PURE__ */ m("div", {
	className: "flex h-full w-full flex-col items-center justify-center",
	children: [
		/* @__PURE__ */ p(Y, { className: g("animate-spin", {
			"h-5 w-5": t === "sm",
			"h-8 w-8": t === "md",
			"h-12 w-12": t === "lg",
			"text-green-500": !e,
			[e || ""]: e
		}) }),
		n && /* @__PURE__ */ p("span", {
			className: g("text-gray-250", {
				"py-4 text-sm": t === "sm",
				"py-6": t === "md"
			}),
			children: n
		}),
		/* @__PURE__ */ p("span", {
			className: "sr-only",
			children: "Loading..."
		})
	]
});
//#endregion
//#region src/components/Button.tsx
function Z({ fullWidth: e = !1, type: t = "button", size: n = "md", disabled: r = !1, loading: i = !1, loadingText: a, variant: o = "light", onClick: s, children: c }) {
	return /* @__PURE__ */ p("button", {
		className: g("btn", `btn--variant-${o}`, `btn--size-${n}`, {
			"btn--fullwidth": e,
			"btn--loading": i,
			"btn--icon": n === "icon",
			"btn--flex": i && o !== "none",
			"btn--disabled": r || i
		}),
		disabled: r || i,
		type: t || "button",
		onClick: s,
		children: i && o !== "none" ? /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(X, { className: g("btn__loader", `btn__loader--variant-${o}`) }), a && /* @__PURE__ */ p("span", {
			className: "btn__loading-text",
			children: a
		})] }) : c
	});
}
//#endregion
//#region src/components/ModalConfirmAction.tsx
function ee({ title: e, description: t, variant: n = "danger", isLoading: r = !1, onConfirm: i, onClose: a }) {
	function o() {
		i(), a();
	}
	return /* @__PURE__ */ p($, {
		id: "confirm-action-modal",
		ariaLabel: "Aria label",
		type: "overlay-auto",
		size: "sm",
		headerRenderer: () => /* @__PURE__ */ p("h3", {
			className: "modal-confirm__title",
			children: e
		}),
		footerRenderer: (e) => /* @__PURE__ */ m("div", {
			className: "modal-confirm__footer",
			children: [/* @__PURE__ */ p(Z, {
				fullWidth: !0,
				type: "button",
				variant: n,
				loading: r,
				onClick: o,
				children: "Confirm"
			}), /* @__PURE__ */ p(Z, {
				fullWidth: !0,
				type: "button",
				variant: "light",
				disabled: r,
				onClick: e,
				children: "Cancel"
			})]
		}),
		onClose: a,
		children: t && /* @__PURE__ */ p("p", {
			className: "modal-confirm__description",
			children: t
		})
	});
}
//#endregion
//#region src/hooks/useIsTabletOrDesktop.ts
function te(e = "576px") {
	let [t, n] = c(a);
	i(() => {}, []);
	function r() {
		return window.matchMedia(`(min-width: ${e})`);
	}
	function a() {
		return r().matches;
	}
	return t;
}
//#endregion
//#region src/hooks/useIsomorphicLayoutEffect.ts
var ne = typeof document < "u" ? a : i;
//#endregion
//#region src/hooks/useCoreHandlers.ts
function re({ isLoading: e = !1, id: t, type: n, horizontalSwipe: r, stackCtx: i, modalRef: a, modalHeaderRef: o, scrollAreaRef: s, onClose: l }) {
	let u = te(), [f, p] = c({
		isMoving: !1,
		scrollDisabled: !1,
		transitionEnabled: !0,
		transition: "none",
		transform: "none",
		opacity: 1
	}), [m, h] = c(!1);
	ne(() => {
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
	function _() {
		d(() => {
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
		transformState: f,
		closeAnimation: m,
		handleClose: _
	};
}
var Q = {
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
function ie(e) {
	return typeof e == "function";
}
function ae({ id: e, scrollAreaId: t, children: r, ariaLabel: u, title: d, onClose: f, loadingText: h, horizontalSwipe: _ = !1, confirmClose: v = !1, isLoading: b = !1, isPortal: x = !0, mobileSafeTop: C = !0, preventClose: w = !1, tabletBreakpoint: T, confirmTitle: E = "Are you sure?", confirmDescription: D = "Are you sure you want to close this dialog?", headerRenderer: O, footerRenderer: k, fallbackCtx: A, type: j = "overlay-auto", size: M = "md" }) {
	let N = J(A), P = s(null), F = s(null), I = s(null), L = s(null), R = s(null), z = s(null), B = te(T), V = _ && j === "fullscreen", [H, U] = c(!1), [W, G] = c(L.current?.clientHeight), { closeAnimation: K, transformState: q, handleClose: Y } = re({
		id: e,
		modalRef: F,
		modalHeaderRef: I,
		scrollAreaRef: R,
		onClose: f,
		type: j ?? "overlay-auto",
		isLoading: b ?? !1,
		horizontalSwipe: _ ?? !1,
		stackCtx: N
	}), Z = n(() => {
		if (!w) {
			if (v) {
				U(!0);
				return;
			}
			Y();
		}
	}, [v]), ne = n(() => {
		U(!1), Y();
	}, []);
	a(() => {
		let t = e;
		N?.apply({
			key: t,
			simpleBarRef: z,
			containerRef: P,
			modalRef: F,
			scrollableContentRef: R,
			close: Z
		});
	}, []), a(() => {
		if (!R.current) return;
		let e = new ResizeObserver(() => {
			G(R.current?.clientHeight);
		});
		return e.observe(R.current), () => e.disconnect();
	}, []), i(() => {
		let e = document.querySelector("meta[name=\"theme-color\"]"), t = null, n = e;
		return e ? (t = e.getAttribute("content"), e.setAttribute("content", "#000000")) : (n = document.createElement("meta"), n.name = "theme-color", n.content = "#000000", document.head.appendChild(n)), () => {
			t === null ? n?.remove() : n?.setAttribute("content", t);
		};
	}, []);
	let ae = g(Q.modal__container, {
		[Q["modal__container--fullscreen"]]: j === "fullscreen",
		[Q["modal__container--menu"]]: j === "menu",
		[Q["modal__container--overlay-90"]]: j === "overlay-90",
		[Q["modal__container--overlay-95"]]: j === "overlay-95",
		[Q["modal__container--overlay-auto"]]: j === "overlay-auto",
		[Q["modal__safe-top"]]: j !== "fullscreen" && C
	}), $ = g(Q.modal__main, Q[`modal__main--${j}`], {
		[Q[`modal__main--${M}`]]: j !== "fullscreen",
		[Q["modal__main--opacity-0"]]: !W,
		[Q["modal__main--animate-slide-up-90"]]: !K && (j === "menu" || j === "overlay-90" || j === "overlay-auto"),
		[Q["modal__main--animate-slide-up-95"]]: !K && j === "overlay-95",
		[Q["modal__main--animate-slide-right"]]: !K && j === "fullscreen"
	}), oe = o(() => O ? O(Z) : null, [O, Z]), se = !b && (V || oe) ? /* @__PURE__ */ p("div", {
		ref: I,
		children: oe
	}) : /* @__PURE__ */ p("div", {
		ref: I,
		children: /* @__PURE__ */ p(S, {
			label: d || void 0,
			onClose: Z
		})
	}), ce = o(() => k ? k(Z) : null, [k, Z]), le = !b && ce ? /* @__PURE__ */ p("footer", {
		className: Q.modal__footer,
		children: ce
	}) : null, ue = o(() => ie(r) ? r(Z) : r, [r, Z]);
	function de(e) {
		return x ? /* @__PURE__ */ p(y, { children: e }) : e;
	}
	return de(/* @__PURE__ */ m("div", {
		id: e,
		ref: P,
		role: "dialog",
		"aria-labelledby": u || e,
		"aria-modal": "true",
		className: ae,
		children: [
			/* @__PURE__ */ m("div", {
				ref: F,
				className: $,
				style: B ? { maskImage: "-webkit-radial-gradient(white, black)" } : {
					willChange: "transform opacity",
					transition: q.transitionEnabled ? q.transition : "none",
					transform: q.transform,
					opacity: q.opacity
				},
				onClick: (e) => e.stopPropagation(),
				children: [
					se,
					/* @__PURE__ */ p("div", {
						className: Q.modal__body,
						children: /* @__PURE__ */ p(l, {
							id: t,
							className: Q["modal__scroll-area"],
							ref: z,
							scrollableNodeProps: { ref: R },
							children: b ? /* @__PURE__ */ p("div", {
								className: Q.modal__loader,
								children: /* @__PURE__ */ p(X, { text: h })
							}) : ue
						})
					}),
					le
				]
			}),
			H && /* @__PURE__ */ p(ee, {
				title: E,
				description: D,
				onConfirm: ne,
				onClose: () => U(!1)
			}),
			/* @__PURE__ */ p("div", {
				className: g(Q.modal__backdrop, { [Q["modal__backdrop--hidden"]]: K && j !== "fullscreen" || K && V }),
				style: { willChange: "opacity" }
			})
		]
	}));
}
var $ = t(ae);
//#endregion
export { $ as Modal, q as ModalProvider, J as useModal, G as useModalStackCtx };
