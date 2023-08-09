const mongoose = require('mongoose');

//Sub Schema 
const orderDetail = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})


const OrderSchema = new mongoose.Schema({
    customerid: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Preparing'
    },
    paymentStatus: {
        type: String,
        required: true,
        default: 'success'
    },
    total: {
        type: Number,
        required: true
    },
    orderDetails: [orderDetail]
})

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;