import React, { useState, useEffect } from "react";
import { useForgotPasswordMutation } from "../../store/api/authApi";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();


//To watch isSuccess of email send func in order to show toastify
    useEffect(() => {
      if (isSuccess) {
        toast.success("Link has been sent. Check you email");
      }
    }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    await forgotPassword({ email });

  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary px-3">
      <div
        className="card shadow-sm border-0 rounded-4 p-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold mb-2">Forgot Password</h3>
          <p className="text-muted mb-0">
            Enter your email and we will send you a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="forgotEmail"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="forgotEmail">Email address</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            {isLoading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
