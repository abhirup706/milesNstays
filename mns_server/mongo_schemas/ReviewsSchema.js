const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReviewsSchema = new Schema({
    reviewer : {
        name:{
            type: String,
            required:true
        }
    },
    property_id:{
        type: String,   
        required :true
        
    },
    date:{
        type: Date,
        default: Date.now
    },
    rating:{
        type: Number,
        required:true
    },
    comment:{
        type: String,
        required:true
    }

});

module.exports = ReviewsSchema;
