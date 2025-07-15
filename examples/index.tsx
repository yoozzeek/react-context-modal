import React from "react";
import ReactDOM from "react-dom/client";
import WithCreateStackHookExamplePage from "./WithCreateStackHook";
import WithContextProviderExamplePage from "./WithContextProvider";
import WithMobileTypeExamplePage from "./WithMobileType";
import WithMobileHorizontalSwipeExamplePage from "./WithMobileHorizontalSwipe";
import WithSubModal from "./WithSubModal";
import WithPortalExamplePage from "./WithPortal";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <header>
      <h1>react-context-modal examples</h1>
      <div>
        <strong>Authors:</strong>
        <ul>
          <li>Andrew [zeek@tuta.com]</li>
        </ul>
      </div>
      <a href="https://github.com/yoozzeek/react-context-modal" target="_blank">
        Open on Github
      </a>
    </header>

    <section>
      <h2>Base cases</h2>
      <WithPortalExamplePage />
      <WithContextProviderExamplePage />
      <WithCreateStackHookExamplePage />
      <WithSubModal />
    </section>

    <section>
      <h2>Mobile advanced</h2>
      <WithMobileTypeExamplePage />
      <WithMobileHorizontalSwipeExamplePage />
    </section>

    <p>Feel free to add more examples and contribute.</p>
    <strong>License: MIT</strong>
  </React.StrictMode>,
);
