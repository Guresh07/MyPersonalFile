import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (

  <div>
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container mt-5 ">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-lg">
              <h2 className="text-center mb-4">Register</h2>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <input
                    type="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter your Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
              <p className="text-center mt-3">
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
}

export default Register;
