const { Router } = require("express");
const userRouter = require("./user");
const movieRouter = require("./movie");
const authRouter = require("./auth");

const router = Router();

router.use("/users", userRouter);
router.use("/movies", movieRouter);
router.use("/auth", authRouter);

module.exports = router;
