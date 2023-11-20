const mongoose = require('mongoose');

const PlaceSchema= new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref: "users"},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number
});
export const PlaceModel = mongoose.model('place', PlaceSchema);



