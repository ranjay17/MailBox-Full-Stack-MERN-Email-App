import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const header = req.header("Authorization");
    if (!header) {
      return res.status(400).json({ message: "No authorization header" });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "No token" });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default auth;
