const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReservationSchema = new Schema({
	"start_date": {
		type: Date,
		required: true
	},
	"end_date": {
		type: Date,
		required: true
	},
	"status": {
		type: String,
		enum: ["upcoming", "pending", "active", "completed"],
		required: true,
		default: 'upcoming'
	},
	"property_name": {
		type: String,
		required: true,
	},
	"receipt_id": {
		type: mongoose.Schema.Types.ObjectId,
	},
	"transaction_id": {
		type: mongoose.Schema.Types.ObjectId,
	},
	"host_id": {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	"guest_id": {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	"property_id": {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
});

module.exports = ReservationSchema;