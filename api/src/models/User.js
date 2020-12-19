const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Modelo de usuario
  sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
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
