const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Movie model. For now, we'll use "item" and "movie"(/"series") interchangeably.
  sequelize.define("movie", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imdbID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    imdbRating: {
      type: DataTypes.INTEGER,
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
    plot: {
      type: DataTypes.TEXT,
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
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });
};
