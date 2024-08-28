const jwt = require("jsonwebtoken");
const Operator = require("../models/operatorModel");

const operatorLogin = (req, res) => {
  const { code } = req.body;

  Operator.findByCode(code, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: "Invalid operator code" });

    const operator = results[0];
    const token = jwt.sign({ id: operator.id, role: "operator" }, "your_jwt_secret", { expiresIn: "1h" });
    res.json({ token });
  });
};

const updateOperatorCode = (req, res) => {
  const { newCode, operatorId } = req.body; // Admin harus menyertakan operatorId dalam permintaan
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const role = decoded.role;

    // Hanya admin atau operator itu sendiri yang bisa memperbarui kode operator
    if (role === "admin" || decoded.id === operatorId) {
      Operator.updateCode(operatorId, newCode, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Operator code updated successfully" });
      });
    } else {
      return res.status(403).json({ message: "Permission denied" });
    }
  });
};

module.exports = { operatorLogin, updateOperatorCode };
