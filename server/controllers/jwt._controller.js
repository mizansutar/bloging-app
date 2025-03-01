const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Auth Header:", authHeader); // Log the authHeader to debug
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Token is missing...!" });
  }

  jwt.verify(token, "mizan", (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

module.exports = {
  authToken
};