export const simpleBarHorizontalScrollHelper = {
    ref: (node: HTMLDivElement) => {
        if (node) {
            node.setAttribute("body-scroll-lock-ignore", "true");
        }
    },
};