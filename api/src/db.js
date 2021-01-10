require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


const {
  User,
  Movie,
} = sequelize.models;

User.hasMany(Movie);

// --------------------------HASH y SALT PASSWORD------------------------
// Random salt generator
User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};
// Creates hash and converts it to plain text.
User.encryptPassword = function (plainText, salt) {
  return crypto.createHash("sha1").update(plainText).update(salt).digest("hex");
};

const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
//This checks that password is correct
User.prototype.correctPassword = function (enteredPassword) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password();
};

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
