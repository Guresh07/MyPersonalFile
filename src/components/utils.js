
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const utils = () => {
  
// const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//  const fetchFiles = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       // console.log("Token being sent:", token);
//       const res = await axios.get("http://localhost:5000/api/files/list", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // console.log("Files fetched:", res.data.files);
//       setFiles(res.data.files);
//     } catch (err) {
//       console.error("Failed to fetch files", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>utils</div>
//   )
// }

// export default utils