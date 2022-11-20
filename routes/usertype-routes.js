const express = require("express");
const userTypeController = require("./controllers/usertype-controller");
const { check } = require("express-validator");
const router = express.Router();

router.get("/:userEmail", userTypeController.fetchUserTypeById);

router.post("/", [
  check("username").not().isEmpty(),
  check("email").not().isEmpty(),
  check("user_type").not().isEmpty(),
  check("_id").not().isEmpty(),
], userTypeController.setUserType);

module.exports = router;