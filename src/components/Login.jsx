import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (

    <>
    <div>
  
      <div className="vh-100 d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          transition: "background 0.5s ease-in-out",
        }}
      >
        <div className="card p-5 shadow-lg" style={{ width: "350px", borderRadius: "15px" }}>
          <h2 className="text-center mb-4" style={{ color: "#333" }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>    
    </>
  );
}

export default Login;
