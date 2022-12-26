import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout searchValue={searchValue} setSearchValue={setSearchValue} />
        }
      >
        <Route index element={<Home searchValue={searchValue} />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
