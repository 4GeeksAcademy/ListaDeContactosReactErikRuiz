import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreWrapper } from "./store.jsx";
import Layout from "./Layout.jsx"; // Asegúrate de tenerlo configurado

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreWrapper>
      <Layout />
    </StoreWrapper>
  </BrowserRouter>
);