const jwt = require("jsonwebtoken");

const JWT_SECRET = "myCustomSecret123"; // same as files.js

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("Token received at server:", token);
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    req.user = decoded; // attach user info to request
    next();
  });
}

module.exports = verifyToken;
