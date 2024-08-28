const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const register = (req, res) => {
  const { email, name, phone_number, password, role } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    User.create(email, name, phone_number, hashedPassword, role, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User created successfully!" });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id, role: user.role }, "your_jwt_secret", { expiresIn: "1h" });
      res.json({ token });
    });
  });
};

const getUserInfo = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header Authorization

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const userId = decoded.id;

    User.findById(userId, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "User not found" });

      const user = results[0];
      res.json({
        email: user.email,
        name: user.name,
        phone_number: user.phone_number,
        role: user.role,
      });
    });
  });
};

const updatePassword = (req, res) => {
  const { currentPassword, newPassword, reenterPassword } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header Authorization

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const userId = decoded.id;

    User.findById(userId, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "User not found" });

      const user = results[0];

      bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!isMatch) return res.status(401).json({ message: "Current password is incorrect" });

        if (newPassword !== reenterPassword) {
          return res.status(400).json({ message: "New password and re-entered password do not match" });
        }

        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
          if (err) return res.status(500).json({ error: err.message });

          User.updatePassword(userId, hashedPassword, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Password updated successfully" });
          });
        });
      });
    });
  });
};

module.exports = { register, login, getUserInfo, updatePassword };
