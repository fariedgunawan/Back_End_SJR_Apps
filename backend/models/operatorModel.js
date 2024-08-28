const db = require("../config/db");

const Operator = {
  findByCode: (code, callback) => {
    const query = "SELECT * FROM operators WHERE code = ?";
    db.query(query, [code], callback);
  },

  updateCode: (id, newCode, callback) => {
    const query = "UPDATE operators SET code = ? WHERE id = ?";
    db.query(query, [newCode, id], callback);
  },
};

module.exports = Operator;
