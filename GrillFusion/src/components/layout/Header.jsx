import React from "react";
import { MYROUTES } from "../../utility/constants";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/slice/themeSlice";
import OrderManagement from "../../pages/order/OrderManagement";
import MenuItemManagement from "../../pages/menu/MenuItemManagement";
import { logout } from "../../store/slice/authSlice";
import { ROLES } from "../../utility/constants";
import { clearCart } from "../../store/slice/cartSlice";

export default function Header() {
  const dispatchAction = useDispatch();
  const navigate = useNavigate();

  //Use Selectors to fetch global states from store
  const { theme } = useSelector((state) => state.theme);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  //for logout
  const handleLogout = () => {
    dispatchAction(clearCart());
    dispatchAction(logout());
    navigate(MYROUTES.HOME);
  };

console.log(user);

  return (
    <nav className="navbar navbar-expand-lg border-bottom shadow-sm">
      <div className="container py-2">
        <a href="/" className="navbar-brand d-flex align-items-center gap-2">
          <i
            className={`bi bi-fire ${theme === "dark" ? "text-warning" : "text-primary"} fs-4`}
          ></i>
          <span className="fw-bold text-body">GrillFusion</span>
        </a>
        <button
          className="nav-link btn btn-link"
          onClick={() => dispatchAction(toggleTheme())}
        >
          <i
            className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon-stars"} fs-5`}
          ></i>
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to={MYROUTES.ORDER_MANAGEMENT}
                className="nav-link text-body"
              >
                My Orders
              </NavLink>
            </li>
                        <li className="nav-item">
              <NavLink
                to={MYROUTES.ABOUT}
                className="nav-link text-body"
              >
                About 
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {/* Theme toggle visible for all users */}

            <li className="nav-item me-lg-2">
              <NavLink
                to={MYROUTES.CART}
                className={`nav-link position-relative d-flex align-items-center justify-content-center bg-primary-subtle border-0 rounded-circle `}
                style={{ width: "44px", height: "44px" }}
              >
                <i className="bi bi-cart3 fs-5"></i>

                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white shadow-sm"
                  style={{ fontSize: "0.7rem" }}
                >
                  {isAuthenticated && totalItems > 0 ? `${totalItems}` : 0}
                </span>
              </NavLink>
            </li>

            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link d-flex align-items-center gap-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle fs-5 text-primary"></i>
                  <span
                    className="nav-link text-body text-truncate"
                    style={{ maxWidth: "120px" }}
                  >
                    Hi {user?.email?.split(" ")?.[0] || "User"}
                  </span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow border rounded-3 p-2 small"
                  style={{
                    minWidth: "220px",
                    zIndex: 1050,
                    "--bs-dropdown-link-active-bg":
                      "rgba(var(--bs-primary-rgb), .12)",
                    "--bs-dropdown-link-active-color": "var(--bs-body-color)",
                    "--bs-dropdown-link-hover-bg":
                      "rgba(var(--bs-primary-rgb), .08)",
                  }}
                >
                  {/* Removed header (avatar/name/role) for a cleaner minimal dropdown */}
                  {user?.role == ROLES.ADMIN && (
                    <>
                      <li>
                        <NavLink
                          to={MYROUTES.ORDER_MANAGEMENT}
                          className="dropdown-item d-flex align-items-center gap-2 rounded-2"
                        >
                          <i className="bi bi-speedometer2 text-primary"></i>
                          <span>Order Management</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={MYROUTES.MENU_ITEM_MANAGEMENT}
                          className="dropdown-item d-flex align-items-center gap-2 rounded-2"
                        >
                          <i className="bi bi-list-ul text-primary"></i>
                          <span>Menu Management</span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  <li>
                    <hr className="dropdown-divider my-2" />
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item d-flex align-items-center gap-2 text-danger rounded-2"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to={MYROUTES.LOGIN} className="nav-link text-body">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={MYROUTES.REGISTER}
                    className="nav-link text-body"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
