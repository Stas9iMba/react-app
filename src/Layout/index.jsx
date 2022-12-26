import { Outlet } from "react-router-dom";

import Header from "../components/Header";

import "../scss/app.scss";

function Layout() {
  return (
    <div className="wrapper">
      <header>
        <Header />
      </header>
      <main className="content">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default Layout;
