const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes"); // caminho relativo correto
const authRoutes = require("./routes/authRoutes"); // caminho relativo correto

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

module.exports = app;
