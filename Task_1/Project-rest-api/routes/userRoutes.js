const exprss = require("express");
const router = exprss.Router();
const userController = require("../controller/userController");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);

module.exports = router;