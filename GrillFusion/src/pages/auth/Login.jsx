import React, { useState } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../store/api/authApi";
import { toast } from "react-toastify";
import { MYROUTES } from "../../utility/constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../store/slice/authSlice";
import { getUserInfoFromToken } from "../../utility/JWTutil";

export default function Login() {
  //MISC
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  //Define abstract model state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Contol components for data onboard
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Init API call
  const [userLogin, { isLoading, error }] = useLoginUserMutation();

  //API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Input All Field");
    }

    const dataSubmit = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const result = await userLogin(dataSubmit).unwrap();
      if (result.isSuccess) {
        //Auth checks
        const token = result.result.token;
        const user = getUserInfoFromToken(token);
        console.log(user, token);

        toast.success("Logged In Successfully");
        dispatch(setAuth({ user, token }));

        //to handle direct URL paste edge case
        const from = location.state?.from || MYROUTES.HOME;

        navigate(from, { replace: true });
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      toast.error(error.data?.errorMessages?.[0] || "Login Failed");
      console.log(error);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row g-5 align-items-center justify-content-center">
          {/* Marketing / Side Panel (desktop) */}
          <div className="col-lg-5 d-none d-lg-block">
            <div className="text-center px-4">
              <div className="mb-4">
                <i
                  className="bi bi-basket text-primary"
                  style={{ fontSize: "4rem" }}
                ></i>
              </div>
              <h2 className="fw-bold mb-3">Welcome to Grill Fusion</h2>
              <p className="text-muted mb-4">
                Sign in to explore fresh flavors, manage your cart, and place
                your orders seamlessly.
              </p>
              <div className="text-start mx-auto" style={{ maxWidth: "360px" }}>
                <div className="d-flex mb-2 small">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Secure account access</span>
                </div>
                <div className="d-flex mb-2 small">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Track past orders</span>
                </div>
                <div className="d-flex mb-2 small">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Save your favorites</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="col-md-8 col-lg-6 col-xl-5 bg-body-tertiary border rounded-4">
            <div className="p-4 p-lg-5">
              <div className="mb-4 text-center">
                <h3 className="fw-bold mb-1">Sign In</h3>
                <p className="text-muted small mb-0">Access your account</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Email address</label>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <div className="form-floating flex-grow-1">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-3"
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
              <div className="text-center small">
                <span className="text-muted">No account? </span>
                <Link to={MYROUTES.REGISTER} className="fw-semibold">
                  Create one
                </Link>
              </div>
              <div className="text-center small">
                
                <Link to={MYROUTES.FORGOT_PASSWORD} className="fw-semibold">
                  Forgot Password
                </Link>
              </div>
              <div className="text-center mt-3 small">
                <Link to={MYROUTES.HOME} className="text-decoration-none">
                  <i className="bi bi-arrow-left me-1"></i>Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
