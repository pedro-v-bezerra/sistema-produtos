const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Você pode passar infos como userId, email, etc.
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}

module.exports = authenticate;
