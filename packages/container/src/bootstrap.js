import React from "react";
import ReactDOM from "react-dom";

import App from "./app";

// We want container to appear immediately.
// It's sub-projects that should take into account development case and
// case when they're taken by container.
ReactDOM.render(
    <App />,
    document.querySelector("#root")
)