const mongoose = require("mongoose");
const multer = require("multer");
var express = require("express");
var router = express.Router();
const UserSchema = require("../mongo_schemas/UserSchema");

const mongoDB = "mongodb://localhost:27017/milesNstay";
const upload = multer({ dest: "assets/uploads/verifications" });

mongoose.connect(mongoDB).then(
  (dbo) => {
    console.log("DB connected");
  },
  (err) => {
    console.log("error");
    console.error(err);
  }
);

const user = mongoose.model("user", UserSchema);

/*Post the Sign Up Form*/
router.post("/signup", upload.single("file"), async function (req, res) {
  data = JSON.parse(req.body.data);
  if (req.file) {
    data["govt_id_url"] = req.file.path;
  }
  user.create(data, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(user);
    res.json(user);
  });
});

router.get("/:type/:value", function (req, res) {
  key = req.params.type;
  let mongo_find_query = {};
  if (key === "username") {
    mongo_find_query = { username: req.params.value };
  } else if (key === "email") {
    mongo_find_query = { "contact.email": req.params.value };
  } else {
    if (key === "phone") {
      mongo_find_query = { "contact.phone": req.params.value };
    }
  }
  console.log(mongo_find_query);
  user.find(mongo_find_query, (err, user_data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(user_data);
    if (user_data.length == 0) {
      res.json("does not exists");
    } else {
      res.json("exists");
    }
  });
});

router.post("/", function (req, res) {
  console.log(req.body);
  data = req.body;
  console.log(data.username);
  user.find({ username: data.username }, (err, user_data) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      if (user_data.length == 0) {
        res.json("login failed");
      } else {
        if (data.password === user_data[0].password) {
          console.log(user_data);
          res.json(user_data[0]);
        } else {
          res.json("login failed");
        }
      }
    }
  });
});

//API to make user to host
router.put("/:id", function (req, res) {
  user.findById(req.params.id, (err, user_data) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      user_data.is_host = true;
      user_data.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('User updated successfully');
        }
      });

    }
  });
});

router.post("/", function (req, res) {
  console.log(req.body);
  data = req.body;
  console.log(data.username);
  user.find({ user: data.username }, (err, user_data) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      if (user_data.length == 0) {
        res.json("login failed");
      } else {
        if (data.password === user_data[0].password) {
          res.json("login successful");
        } else {
          res.json("login failed");
        }
      }
    }
  });
});

module.exports = router;
