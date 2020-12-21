const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Modelo de película
  sequelize.define("movie", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imdbId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("movie", "series"),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },

    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    imdbRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    plot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    actors: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
