const express = require("express");
const {
  getBootcamps,
  getSingleBootcamps,
  updateBootcamp,
  deleteBootcamp,
  createBootcamp,
} = require("../controllers/bootcampsController");

const router = express.Router();

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getSingleBootcamps)
  .delete(deleteBootcamp)
  .put(updateBootcamp);

module.exports = router;
