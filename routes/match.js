const express = require("express");
const router = express.Router();

const MatchController = require("../controllers/MatchController");
const authenticate = require("../middleware/authenticate");

router.post("/matches", authenticate, MatchController.addMatch);
router.put("/matches/:id", authenticate, MatchController.updateMatchResult);
router.get("/matches", authenticate, MatchController.getMatches);
router.post("/usermatches", authenticate, MatchController.addUserMatch);
router.get("/usermatches", authenticate, MatchController.getUserMatches);
router.get(
  "/usermatchesranking/:user",
  authenticate,
  MatchController.getUserMatchesRanking
);
router.put("/usermatches/:id", authenticate, MatchController.updateUserMatch);

module.exports = router;
