import React from "react";
import ReactDOM from "react-dom/client";
import WithCreateStackHookExamplePage from "./WithCreateStackHook";
import WithContextProviderExamplePage from "./WithContextProvider";
import WithMobileTypeExamplePage from "./WithMobileType";
import WithMobileHorizontalSwipeExamplePage from "./WithMobileHorizontalSwipe";
import WithSubModal from "./WithSubModal";
import WithPortalExamplePage from "./WithPortal";
import WithCustomHeader from "./WithCustomHeader";
import WithCustomFooter from "./WithCustomFooter";
import WithFooterPortal from "./WithFooterPortal";

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
      <h2>Base cases</h2>
      <WithContextProviderExamplePage />
      <WithPortalExamplePage />
      <WithSubModal />
      <WithCustomHeader />
      <WithCustomFooter />
    </section>

    <section>
      <h2>Mobile advanced</h2>
      <WithMobileTypeExamplePage />
      <WithMobileHorizontalSwipeExamplePage />
    </section>

    <section>
      <h2>Additional cases</h2>
      <WithCreateStackHookExamplePage />
      <WithFooterPortal />
    </section>

    <footer>
      <p>Feel free to add more examples and contribute.</p>
      <p>
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
      </p>
      <strong>License: MIT</strong>
    </footer>
  </React.StrictMode>,
);
