const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { uploadUsers } = require("../middlewares/uploads");

// /usuario
router.get("/perfil", uploadUsers.single("avatar"), usersController.profile);

module.exports = router;
