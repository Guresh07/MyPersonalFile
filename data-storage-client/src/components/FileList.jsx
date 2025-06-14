import React, { useEffect, useState } from "react";
import axios from "axios";


function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log("Token being sent:", token);
      const res = await axios.get("https://mypersonalfile.onrender.com/files/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("Files fetched:", res.data.files);
      setFiles(res.data.files);
    } catch (err) {
      console.error("Failed to fetch files", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://mypersonalfile.onrender.com/files/delete/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFiles(); // Refresh list
    } catch (err) {
      console.error("Failed to delete file", err);
    }
  };

const handleDownload = async (fileId, originalName) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`https://mypersonalfile.onrender.com/files/download/${fileId}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob", // Important: fetch file as blob
    });

    // Create a blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", originalName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (err) {
    console.error("Failed to download file", err);
  }
};


  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    
<div className="container mt-4 ">
  <div className="card shadow-sm">
    <div className="card-body">
      <h2 className="card-title text-center mb-4">📄 Your Files</h2>

      {loading ? (
        <p className="text-center text-muted">Loading files...</p>
      ) : files.length === 0 ? (
        <p className="text-center text-muted">No files uploaded yet.</p>
      ) : (
        <ul className="list-group">
          {files.map((file) => (
            <li
              key={file._id}
              className="list-group-item d-flex justify-content-between align-items-center fade-in"
            >
              <div>
                <strong>{file.originalName}</strong>
                {file.uploadTime && (
                  <small className="text-muted ms-2">
                    ({new Date(file.uploadTime).toLocaleString()})
                  </small>
                )}
              </div>
              <div>
                <button
                  onClick={() => handleDownload(file._id, file.originalName)}
                  className="btn btn-sm btn-primary me-2"
                >
                  ⬇️ Download
                </button>
                <button
                  onClick={() => handleDelete(file._id)}
                  className="btn btn-sm btn-danger"
                >
                  ❌ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>

  );
}

export default FileList;
