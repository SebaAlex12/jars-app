import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/jars">
            Zarządzanie słoikami
          </Link>
        </li>
        <li className="nav-item">
          <button
            href="#"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer"
            }}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="rounded-circle"
              style={{
                width: "25px",
                marginRight: "10px",
                display: "inlineBlock"
              }}
            />
            Wyloguj
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        {/* <li className="nav-item">
          <Link className="nav-link" to="/register">
            Rejestracja
          </Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Logowanie
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Słoikownik
            {isAuthenticated ? (
              <span className="badge ml-3 badge-light">{user.name}</span>
            ) : (
              ""
            )}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
