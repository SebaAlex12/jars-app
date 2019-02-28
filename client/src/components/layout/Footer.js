import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white p-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Link className="float-left" to="/">
              <img
                src="img/tools.png"
                alt="logo"
                style={{ width: "40px" }}
                className="thumbnail"
              />
            </Link>
            <div className="float-right">
              Copyrights &copy; {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
