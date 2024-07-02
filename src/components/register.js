import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  // State variables for user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  // Function to handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create a new user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);

      // If user is created, add user details to Firestore
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: ""
        });
      }

      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });

    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
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
              <form onSubmit={handleRegister}>
                <h3 className="text-center mb-4">Sign Up</h3>

                {/* First Name Field */}
                <div className="mb-3">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </div>

                {/* Last Name Field */}
                <div className="mb-3">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Sign Up Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>

                {/* Link to Login Page */}
                <p className="forgot-password text-right mt-3">
                  Already registered <a href="/login">Login</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
