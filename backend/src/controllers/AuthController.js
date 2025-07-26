const jwt = require("jsonwebtoken");

function login(req, res) {
  const { email, password } = req.body;
  // ⚠️ Login único solicitado
  if (email === "admin@b4you.dev" && password === "123456") {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
}

module.exports = { login };
