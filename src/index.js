import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouterConfig from "./jsx/routes/Route";

const root = ReactDOM.createRoot(document.getElementById("root"));

// ルーティングを設定
root.render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>
);