import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <div className="position-relative">
      <div class="position-absolute top-50 start-50 translate-middle">
        <App />
      </div>
    </div>
  </React.StrictMode>,
  rootElement
);
