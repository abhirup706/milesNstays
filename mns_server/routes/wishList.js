const mongoose = require("mongoose");
const express = require("express");
var router = express.Router();
const WishListSchema = require("../mongo_schemas/wishListSchema");
const ListingSchema = require("../mongo_schemas/listingSchema");

const mongoDB = "mongodb://localhost:27017/milesNstay";

mongoose.connect(mongoDB).then(
  (dbo) => {
    console.log("DB connected");
  },
  (err) => {
    console.log("error");
    console.error(err);
  }
);

const WishList = mongoose.model("wishlist", WishListSchema);

router.get("/", (req, res) => {
  console.log(req.query);
  const { prop_id, guest_id } = req.query;
  console.log(prop_id);


  WishList.findOne(
    { property_id: prop_id, guest_id: guest_id },
    (err, wishlist) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.send(wishlist);
    }
  );
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);


  WishList.find({ guest_id: req.params.id }, (err, wishlist) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    const Listings = mongoose.model("properties", ListingSchema);

    let query = [];
    for (var i = 0; i < wishlist.length; i++) {
      query.push({ _id: wishlist[i].property_id });
    }
    console.log(query);
    Listings.find(
      {
        $or: query,
      },
      (err, properties) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        res.send(properties);
      }
    );
  });
});

router.post("/", (req, res) => {
  console.log(req.query);


  WishList.create(req.body, (err, wishlist) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.send(wishlist);
  });
});

router.delete("/delete", (req, res) => {
  console.log("inside wishlist delete")
  console.log(req);

  const { prop_id, guest_id } = req.query;
  console.log(prop_id, guest_id)


  WishList.deleteMany(
    { guest_id: guest_id, property_id: prop_id }
    ,
    (err, wishlist) => {
      if (err) {
        console.log(err);
      } else {
        res.json(wishlist);
      }
      return;
    }
  );
});


module.exports = router;
