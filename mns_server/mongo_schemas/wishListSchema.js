const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WishListSchema = new Schema({
    guest_id:{
        type: String,   
        required :true
    },
    property_id:{
        type: String,
        required:true
    },
    creation_date:{
        type: Date,
        default: Date.now,
        required:true
    }

});

module.exports = WishListSchema;
