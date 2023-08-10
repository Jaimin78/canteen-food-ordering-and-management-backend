const express = require('express');
const Items = require('../models/Items');
const Order = require('../models/Order')
const multer = require('multer');
const tokenVerification = require('../middleware/tokenVerification');
const app = express()

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store uploaded files in the "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

//save items : api/item/add
app.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, availability, type, category } = req.body;
        const image = req.file.filename; // Assuming the 'image' field contains the uploaded file

        // Create a new item using the Item model
        const newItem = new Items({ name, description, price, image, availability, type, category });
        await newItem.save();
        await newItem.save();

        res.status(201).json({ success: true, message: 'Item created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create item', error: error.message });
    }
});

//get items : api/item/get
app.get('/get', tokenVerification, async (req, res) => {
    try {
        const items = await Items.find();
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve items', error: error.message });
    }
});

//Order item : api/item/order 
app.post('/order', tokenVerification, async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        await newOrder.save();
        res.status(201).json({ success: true, message: 'Order created successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
})

//Get Order :  api/item/order/get
app.post('/order/get', tokenVerification, async (req, res) => {
    try{
        let customerid = req.headers['customerid'];
        const order = await Order.find({
            customerid: customerid,
            status: { $in: ["Preparing", "Ready"] }
        });
        res.status(200).send(order)
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
})

//Get Past Order :  api/item/order/past
app.post('/order/past', tokenVerification, async (req, res) => {
    try{
        let customerid = req.headers['customerid'];
        const order = await Order.find({
            customerid: customerid,
            status: "Past"
        });
        res.status(200).send(order)
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
    }
})

module.exports = app;