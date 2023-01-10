const { register, login } = require("../controllers/authControl/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/check", checkUser); 
router.post("/register", register);
router.post("/login", login);

module.exports = router;