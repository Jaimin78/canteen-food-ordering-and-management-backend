const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
    default: true,
  },
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;