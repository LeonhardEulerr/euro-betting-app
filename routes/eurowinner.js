const express = require("express");
const router = express.Router();

const EuroWinnerController = require("../controllers/EuroWinnerController");
const authenticate = require("../middleware/authenticate");

router.post("/eurowinner", authenticate, EuroWinnerController.addEuroWinner);
router.get("/eurowinner", authenticate, EuroWinnerController.getEuroWinner);
router.put(
  "/eurowinner/:id",
  authenticate,
  EuroWinnerController.updateEuroWinner
);

module.exports = router;
