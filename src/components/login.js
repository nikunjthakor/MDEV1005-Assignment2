import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
//import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      //console.log(error.message);

      toast.error('There was a problem logging in. Please check your credentials and try again.', {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h3 className="text-center mb-4">Login</h3>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-3">
                New user? <a href="/signup">Register Here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;