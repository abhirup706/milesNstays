const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    title: {
      type: String,
      enum: ["Mr.", "Mrs.", "Ms.", "Jr.", "Dr."],
    },
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
    },
    last_name: {
      type: String,
      required: true,
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others", "Do not wish to Disclose"],
  },
  date_joined: {
    type: Date,
    default: Date.now,
  },
  contact: {
    email: {
      type: String,
      match:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      match: /^[0-9]{10}$/,
      required: true,
      unique: true,
    },
    emergency: {
      type: String,
      match: /^[0-9]{10}$/,
    },
  },
  thumbnail: {
    type: String,
    default: "../assets/imgs/default-user-image.png",
  },
  is_id_verified: {
    type: Boolean,
    default: false,
  },
  govt_id_url: {
    type: String,
  },
  verifications: {
    email: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Boolean,
      default: false,
    },
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    unit_no: {
      type: Number,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      match: /^\d{5,5}(-\d{4,4})?$/,
      required: true,
    },
    location: {
      lat: {
        type: Number,
        default: 38.889248,
      },
      lng: {
        type: Number,
        default: -77.050636,
      },
    },
  },
  is_host: {
    type: Boolean,
    default: false,
  },
  host: {
    is_superhost: {
      type: Boolean,
      default: false,
    },
    response_rate: {
      type: Number,
      default: 0.0,
    },
    response_time: {
      type: Number,
      default: 0.0,
    },
  },
});

module.exports = UserSchema;
