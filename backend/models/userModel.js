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
};

module.exports = User;
