const express = require("express");
const router = express.Router();

const TeamController = require("../controllers/TeamController");
const authenticate = require("../middleware/authenticate");

router.post("/team", TeamController.addTeam);
router.get("/teams", TeamController.getTeams);
router.get("/realeurowinner", authenticate, TeamController.getRealEuroWinner);
router.put(
  "/realeurowinner",
  authenticate,
  TeamController.updateRealEuroWinner
);

module.exports = router;
