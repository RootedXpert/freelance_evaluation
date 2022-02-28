const Seq = require("sequelize");
const sequelize = require("../postgress");
const db = require("../postgress");
const notes = db.define("notes", {
  id: {
    type: Seq.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  added: {
    type: Seq.STRING,
    allowNull: true,
  },
  author: {
    type: Seq.STRING,
    allowNull: false,
  },
  content: {
    type: Seq.STRING,
    allowNull: false,
  },
});

module.exports = { notes };
