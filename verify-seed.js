// verify-seed.js
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config/config.json")["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const User = sequelize.define(
  "User",
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  { tableName: "Users" }
);

async function verifySeed() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const users = await User.findAll();
    console.log("Users:", users);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

verifySeed();
