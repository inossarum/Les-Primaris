const express = require("express");
const {
  setUsers,
  getUsers,
  getonlineUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/connectedUser/:pseudo", getonlineUser);
router.delete("/:id", deleteUser);
router.post("/", setUsers);

module.exports = router;
