import Link from "next/link";
import React from "react";
import SigninButton from "./signinbutton";

const AppBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          CISLAB
        </Link>
        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href={"/post"}>
                Posts
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <SigninButton />
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
