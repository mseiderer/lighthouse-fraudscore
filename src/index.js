import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { About, App, Home } from "./App";
import { Calculator } from "./Calculator";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='calculator' element={<Calculator />} />
          <Route path='about' element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
