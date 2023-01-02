const mongoose = require("mongoose");
const express = require("express");
var router = express.Router();
const ListingSchema = require("../mongo_schemas/listingSchema");
const ReviewsSchema = require("../mongo_schemas/ReviewsSchema");
const multer = require("multer");
const fs = require("fs");
const { response } = require("express");

var storage = multer.diskStorage({
  destination: "../mns_client/public/img/propertyImages/",
  filename: function (req, file, cb) {
    const suffix = file.mimetype.split("/");
    cb(null, `${file.fieldname}-${Date.now()}.${suffix[1]}`);
  },
});

var multi_upload = multer({ storage: storage }).array("file", 10);

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

const Listings = mongoose.model("properties", ListingSchema);
const Reviews = mongoose.model("reviews", ReviewsSchema);

router.post("/", (req, res) => {
  console.log("inside post endpoint");
  console.log(req.body);
  Listings.create(req.body, (err, listings) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.send(listings);
  });
});

router.get("/", function (req, res) {
  if (req.query.city === undefined) {
    var city = "";
  } else {
    var city = decodeURI(req.query.city);
  }
  if (req.query.type === undefined) {
    var type = "";
  } else {
    var type = req.query.type;
  }
  if (req.query.endDate === undefined) {
    var endDate = "";
  } else {
    var endDate = req.query.endDate;
  }
  if (req.query.startDate === undefined) {
    var startDate = "";
  } else {
    var startDate = req.query.startDate;
  }
  Listings.find(
    {
      property_type: { $regex: type, $options: "i" },
      "property_address.city": { $regex: city, $options: "i" },
    },
    (err, listings) => {
      if (err) {
        console.log(err);
      } else {
        console.log(listings.length);
        res.json(listings);
      }
      return;
    }
  );
});

router.get("/:id", function (req, res) {

  const { id } = req.params;
  Listings.findById(id, (err, listing) => {
    if (err) {
      console.log(err);
    } else {
      res.json(listing);
    }
    return;
  });
});

router.post("/reviews", (req, res) => {

  Reviews.create(req.body, (err, reviews) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.send(reviews);
  });
});

router.get("/reviews/:id", function (req, res) {

  const { id } = req.params;


  Reviews.find({ property_id: id }, (err, reviews) => {
    if (err) {
      console.log(err);
    } else {
      res.json(reviews);
    }
    return;
  });
});

router.post("/save-image", (req, res) => {
  multi_upload(req, res, function (err) {

    var response = [];
    if (req.files.length > 0) {
      for (var i = 0; i < req.files.length; i++) {
        response.push(req.files[i].filename);
      }
    }
    if (err instanceof multer.MulterError) {

      res
        .status(500)
        .send({
          error: { msg: `multer uploading error: ${err.message}` },
        })
        .end();
      return;
    } else if (err) {
      //unknown error
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { msg: `${err.message}` } })
          .end();
      } else {
        res
          .status(500)
          .send({ error: { msg: `unknown uploading error: ${err.message}` } })
          .end();
      }
      return;
    }
    res.json(response);
  });
});

router.get("/host/:id", function (req, res) {


  const { id } = req.params;
  Listings.find({ host_id: id, is_deleted: false }, (err, listings) => {
    if (err) {
      console.log(err);
    } else {
      res.json(listings);
    }
    return;
  });
});


router.put("/delete/:id", function (req, res) {

  Listings.findById(req.params.id, (err, listing_data) => {
    if (err) {

      return err;
    } else {
      listing_data.is_deleted = true;

      listing_data.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Listing Deleted successfully');
        }
      });

    }
  });
});

// update property
router.put("/:id", function (req, res) {


  var query = { '_id': req.params.id };
  req.newData = req.body;
  Listings.findOneAndUpdate(query, req.newData, { upsert: true }, function (err, doc) {
    if (err) return res.send(500, { error: err });
    return res.send('Succesfully saved!');
  });
});




module.exports = router;
