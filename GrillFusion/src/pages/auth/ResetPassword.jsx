import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useResetPasswordMutation } from '../../store/api/authApi';
import { toast } from 'react-toastify';
import { MYROUTES } from '../../utility/constants';

export default function ResetPassword() {


//Reset link sent to email, react reads the require values from URL using:
const [searchParams] = useSearchParams();
const email = searchParams.get("email") || "";
const token = searchParams.get("token") || "";


//Local state and mutation init
const [newPassword, setNewPassword] = useState("");
const [resetPassword, {isLoading, isSuccess}] = useResetPasswordMutation();
const navigate = useNavigate();



//To watch success and act
useEffect(()=>{
    if(isSuccess){
        toast.success("Password has been changed successfully!");
        navigate(MYROUTES.LOGIN);
    }
},[isSuccess, navigate]);


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !token || !newPassword) return;

  console.log({email, token, newPassword});
  await resetPassword({ email, token, newPassword });
};


return (
  <div className="min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary px-3">
    <div
      className="card shadow-sm border-0 rounded-4 p-4"
      style={{ maxWidth: "420px", width: "100%" }}
    >
      <div className="text-center mb-4">
        <h3 className="fw-bold mb-2">Reset Password</h3>
        <p className="text-muted mb-0">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="newPassword">New Password</label>
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2">
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  </div>
);

}
