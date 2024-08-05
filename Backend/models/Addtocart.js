const mongoose = require('mongoose');
const { Schema } = mongoose;

const addtoCartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl:{
        type: String,
        required: "true"
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('addtocart', addtoCartSchema);