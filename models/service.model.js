const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['wall', 'plumber', 'carpenter']
    }
})

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;