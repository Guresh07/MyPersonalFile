import { useNavigate } from "react-router-dom";
import UploadFile from "./UploadFile";
import FileList from "./FileList";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";
// import { set } from "mongoose";


function Dashboard() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const userData = () => {
    // const res = await loginUser(formData);
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    setName(user.name);
  }



  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

useEffect(() => {
    userData();
}, []);

  return (
    <>  
    <div className="div">
      
      <div className="container py-5 d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-gradient">📁 Welcome, {name? name: "nameNotDefined"}!</h2>
          <button onClick={handleLogout} className="btn btn-outline-danger mt-3">
            🚪 Logout
          </button>
        </div>

        <div className="row">
          <div className="col-lg-12 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <UploadFile />
              </div>
            </div>
          </div>

          <div className="col-lg-12 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <FileList />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    </>

  );
}

export default Dashboard;
