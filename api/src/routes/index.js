const { Router } = require("express");
const userRouter = require("./user");
const movieRouter = require("./movie");

const router = Router();

router.use("/users", userRouter);
router.use("/movies", movieRouter);

module.exports = router;
