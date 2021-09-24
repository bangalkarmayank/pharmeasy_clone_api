const mongoose = require("mongoose");
const { Schme } = mongoose;

const productSchema = new mongoose.Schema({
    medicine_name: String,
    medicine_description: String,
    mrpPrice: Number,
    sellPrice: Number,
    currentStock: Number,
    inStock: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Medicine_product', productSchema)