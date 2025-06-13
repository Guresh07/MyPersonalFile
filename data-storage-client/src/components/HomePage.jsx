import { useNavigate } from "react-router-dom";
 // we'll add a little CSS for background

function HomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
      <div>
       
        <div div className="homepage-bg primary d-flex align-items-center justify-content-center vh-100">
        <div className="text-center text-white p-4">
            <h1 className="display-3 fw-bold mb-4">📂 Data Storage App</h1>
            <p className="lead mb-5">
            Securely upload, store, and manage your files anytime, anywhere.
            </p>
            <button onClick={handleStart} className="btn btn-primary btn-lg">
            Get Started
            </button>
        </div>
        </div>
      </div>
  );
}

export default HomePage;
