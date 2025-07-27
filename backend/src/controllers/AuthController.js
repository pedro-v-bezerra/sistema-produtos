const jwt = require('jsonwebtoken');

function login(req, res) {
  const { email, password } = req.body;

  if (!process.env.AUTH_EMAIL || !process.env.AUTH_PASSWORD) {
    throw new Error('Variáveis USER_LOGIN e USER_PASSWORD não definidas.');
  }
  // ⚠️ Login único solicitado
  if (email === process.env.AUTH_EMAIL && password === process.env.AUTH_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });
    return res.status(200).json({
      message: 'Login efetuado com sucesso',
      error: false,
      data: token,
    });
  }

  return res.status(401).json({
    message: 'Credenciais inválidas',
    error: true,
    data: null,
  });
}

module.exports = { login };
