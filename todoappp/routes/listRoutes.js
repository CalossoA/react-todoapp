const express = require("express");
const router = express.Router();
const List = require("../models/List");
const {
  getUserList,
  getListById,
  createList,
  updateList,
  deleteList,
} = require("../controllers/listController");


router.get("/", getUserList);
router.get("/:id", getListById);
router.post("/", createList);
router.patch("/:id", updateList);
router.delete("/:id", deleteList);

module.exports = router;
