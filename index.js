const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://admin-saksham:shalini-110@cluster0-1xo7w.mongodb.net/eInteractDB",
  {
    useNewUrlParser: true
  }
);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  programming: String,
  photography: String,
  c_writing: String,
  s_writing: String,
  pitching: String,
  chess: String
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render(`index`);
});
app.get("/register", (req, res) => {
  res.render(`register`);
});
app.get("/myevents", (req, res) => {
  res.render(`myevents`);
});
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, (err, userData) => {
    if (err) {
      console.log(err);
    } else if (userData != null) {
      res.render("user-exists");
    } else {
      const user = new User(req.body);
      user.save();
      res.render("after-register");
    }
  });
});
app.post("/myevents", (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user != null) {
      let s1, s2, s3, s4, s5, s6, s7;
      if (user.programming == undefined) {
        s1 = "none";
      } else {
        s1 = "";
      }
      if (user.photography == undefined) {
        s2 = "none";
      } else {
        s2 = "";
      }
      if (user.c_writing == undefined) {
        s3 = "none";
      } else {
        s3 = "";
      }
      if (user.s_writing == undefined) {
        s4 = "none";
      } else {
        s4 = "";
      }
      if (user.pitching == undefined) {
        s5 = "none";
      } else {
        s5 = "";
      }
      if (user.chess == undefined) {
        s6 = "none";
      } else {
        s6 = "";
      }
      if (
        user.programming == undefined &&
        user.photography == undefined &&
        user.c_writing == undefined &&
        user.s_writing == undefined &&
        user.pitching == undefined &&
        user.chess == undefined
      ) {
        s7 = "block";
      } else {
        s7 = "none";
      }
      res.render("myevents-results", {
        s1: s1,
        s2: s2,
        s3: s3,
        s4: s4,
        s5: s5,
        s6: s6,
        s7: s7
      });
    } else {
      res.render("does-not-exist");
    }
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
