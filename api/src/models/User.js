const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // User model
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue("password");
      },
    },

    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue("salt");
      },
    },
  });
};
