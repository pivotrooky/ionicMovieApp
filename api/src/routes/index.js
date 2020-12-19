const { Router } = require("express");
const userRouter = require("./user/index.js");
const movieRouter = require("./movie/index.js");

const router = Router();

router.use("/users", userRouter);
router.use("/movies", movieRouter);

module.exports = router;
