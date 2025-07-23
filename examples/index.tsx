import "./styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import WithCreateStackHookExample from "./WithCreateStackHook";
import WithContextProviderExample from "./WithContextProvider";
import WithMobileTypeExample from "./WithMobileType";
import WithMobileHorizontalSwipeExample from "./WithMobileHorizontalSwipe";
import WithSubModalExample from "./WithSubModal";
import WithPortalExample from "./WithPortal";
import WithCustomHeaderExample from "./WithCustomHeader";
import WithCustomFooterExample from "./WithCustomFooter";
import WithFooterPortalExample from "./WithFooterPortal";
import WithHighContentHeightExample from "./WithHighContentHeight";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <header>
      <h1>react-context-modal demo</h1>
      <p>
        A simple React modal component and hooks designed to overcome limitations of existing modal
        libraries. Key features include horizontal and vertical swipe-to-close, scroll position
        preservation on iOS, and stacking multiple modals.
      </p>
      <a href="https://github.com/yoozzeek/react-context-modal" target="_blank">
        Open on Github
      </a>
    </header>

    <section>
      <h2>Mobile first</h2>
      <WithMobileTypeExample />
      <WithMobileHorizontalSwipeExample />
    </section>

    <section>
      <h2>Base cases</h2>
      <WithHighContentHeightExample />
      <WithSubModalExample />
      <WithCustomHeaderExample />
      <WithCustomFooterExample />
      <WithContextProviderExample />
      <WithPortalExample />
    </section>

    <section>
      <h2>Additional cases</h2>
      <WithCreateStackHookExample />
      <WithFooterPortalExample />
    </section>

    <footer>
      <p>Feel free to add more examples and contribute.</p>
      <div>
        <strong>Authors:</strong>
        <ul>
          <li>
            <a href="https://bitkind.org/about" target="_blank">
              Bitkind.org
            </a>{" "}
            [inbox@bitkind.org]
          </li>
          <li>
            <a href="https://github.com/yoozzeek" target="_blank">
              Andrew
            </a>{" "}
            [zeek@tuta.com]
          </li>
        </ul>
      </div>
      <strong>License: MIT</strong>
    </footer>
  </React.StrictMode>,
);
