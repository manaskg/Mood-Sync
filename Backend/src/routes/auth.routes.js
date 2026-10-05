const { Router } = require("express");
const authController = require("../controllers/auth.controller.js");
const authUser = require("../middlewares/auth.middleware.js");

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get('/logout', authController.logoutUser)

router.get("/get-me", authUser, authController.getMe);

module.exports = router;
