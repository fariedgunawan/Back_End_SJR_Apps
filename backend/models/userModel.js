const db = require("../config/db");

const User = {
  create: (email, name, phone_number, password, role, callback) => {
    const query = "INSERT INTO users (email, name, phone_number, password, role) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [email, name, phone_number, password, role], callback);
  },

  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], callback);
  },

  findById: (id, callback) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [id], callback);
  },

  updatePassword: (id, newPassword, callback) => {
    const query = "UPDATE users SET password = ? WHERE id = ?";
    db.query(query, [newPassword, id], callback);
  },

  updateProfile: (id, name, email, phone_number, callback) => {
    const query = "UPDATE users SET name = ?, email = ?, phone_number = ? WHERE id = ?";
    db.query(query, [name, email, phone_number, id], callback);
  },
};

module.exports = User;
