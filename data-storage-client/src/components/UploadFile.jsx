import { useState } from "react";
import axios from "axios";

// import fetchFiles  from "./FileList"; // Adjust the import path as necessary

function UploadFile() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Optional: validate file size/type here
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
            if (!token) {
        alert("Please login first.");
        return;
      }

      await axios.post("https://mypersonalfile.onrender.com/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ File uploaded successfully!");
      window.location.reload();
      setFile(null); // reset file input
      document.getElementById("fileInput").value = null;
      // fetchFiles(); // Refresh file list after upload
    } catch (err) {
      console.error(err);
      alert("❌ File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };


  return (
<div className="container mt-4">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-4">📤 Upload a File</h3>

        <div className="mb-3">
          <input
            id="fileInput"
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        {file && (
          <p className="text-muted">
            Selected: <strong>{file.name}</strong>
          </p>
        )}

        <button
          onClick={handleUpload}
          className="btn btn-success w-100"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  </div>
</div>

  );
}

export default UploadFile;
