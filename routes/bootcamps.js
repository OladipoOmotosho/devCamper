const express = require("express");
const {
  getAllBootcamps,
  getSingleBootcamps,
  updateBootcamp,
  deleteBootcamp,
  createBootcamp,
} = require("../controllers/bootcampsController");

const router = express.Router();

router.route("/").get(getAllBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getSingleBootcamps)
  .delete(deleteBootcamp)
  .put(updateBootcamp);

module.exports = router;
