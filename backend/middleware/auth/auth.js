const jwt = require('jsonwebtoken');
const User = require('../../models/auth/User');

module.exports = async function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ errors: "Access Denied!..." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const existingUser = await User.findById(decoded.user.id);
    if (!existingUser) {
      return res.status(404).json({ errors: "Invalid user!..." });
    }

    req.user = decoded.user; // decoded.user.id will be used in controllers
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(400).json({ errors: "Access Denied!..." });
  }
};
