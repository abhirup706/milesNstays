const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ListingSchema = new Schema({
  host_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  property_name: {
    type: String,
    required: true,
  },
  property_type: {
    type: String,
    enum: [
      "Apartment",
      "Villa",
      "Treehouse",
      "Townhouse",
      "Condominium",
      "Lakefront",
      "Countryside",
      "Mansion",
      "Castle",
      "Ski Resort",
      "Cave",
      "Dome",
      "Luxury",
      "Boat",
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
    required: true
  },
  room_type: {
    type: String,
    enum: [
      "Private Room",
      "Shared Room",
      "Entire Home",
      "Hotel Room"],
    required: true,
  },
  max_nights: {
    type: Number,
    min: 1,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: "i",
    required: true,
  },
  min_nights: {
    type: Number,
    min: 1,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: "i",
    required: true,
  },
  max_guests: {
    type: Number,
    min: 1,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: "i",
    required: true,
  },
  bed_count: {
    type: Number,
    min: 1,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    alias: "i",
    required: true,
  },
  bath_count: {
    type: Number,
    min: 1,
    required: true,
  },
  cancellation_policy: {
    type: String,
    enum: ["flexible", "moderate", "strict", "restricted"],
    required: true,
  },
  cost: {
    per_night: {
      type: Number,
      min: 10,
      required: true,
    },
    deposit: {
      type: Number,
      min: 0,
      required: true,
    },
    cleaning_fee: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  rating: {
    overall: {
      type: Number,
      min: 0,
      max: 5,
      required: false,
    },
    cleanliness: {
      type: Number,
      min: 0,
      max: 5,
      required: false,
    },
    communication: {
      type: Number,
      min: 0,
      max: 5,
      required: false,
    },
    check_in: {
      type: Number,
      min: 0,
      max: 5,
      required: false,
    },
    accuracy: {
      type: Number,
      min: 0,
      max: 5,
      required: false,
    },
    location: {
      type: Number,
      min: 0,
      max: 5,
      required: false,
    },
    value: {
      type: Number,
      min: 0,
      max: 5,
      required: false,
    },
  },
  house_rules: {
    check_in: {
      type: Date,
    },
    check_out: {
      type: Date,
    },
    check_in_type: {
      type: String,
      required: true,
    },
    smoking: {
      type: Boolean,
      default: false,
    },
    parties: {
      type: Boolean,
      default: false,
    },
    pets: {
      type: Boolean,
      default: false,
    },
    additional_notes: {
      type: String,
      required: true,
    },
  },
  property_address: {
    street: {
      type: String,
      required: true,
    },
    unit_no: {
      type: Number,
      required: true,
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
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      alias: "i",
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    distance_from_city_center: {
      type: Number,
    },
    coordinates: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
  },
  images: [String],
  amenities: {
    sun_lounger: {
      type: Boolean,
      default: false,
    },
    swimming_pool: {
      type: Boolean,
      default: false,
    },
    natural_gas_barbeque: {
      type: Boolean,
      default: false,
    },
    television: {
      type: Boolean,
      default: false,
    },
    garden: {
      type: Boolean,
      default: false,
    },
  },
  reviews: [
    {
      reviewer: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        name: {
          type: String,
        },
        URL: {
          type: String,
        },
      },
      host: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        name: {
          type: String,
        },
        URL: {
          type: String,
        },
      },
      date: {
        type: Date,
        default: Date.now,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
    },
  ],
});

module.exports = ListingSchema;
