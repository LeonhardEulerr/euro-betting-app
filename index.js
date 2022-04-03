const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const AuthRoute = require("./routes/auth");
const MatchRoute = require("./routes/match");
const TeamRoute = require("./routes/team");
const UserRoutes = require("./routes/user");
const EuroWinnerRoutes = require("./routes/eurowinner");

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI_REAL
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

app.use("/api", AuthRoute);
app.use("/api", MatchRoute);
app.use("/api", TeamRoute);
app.use("/api", UserRoutes);
app.use("/api", EuroWinnerRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // lala
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
