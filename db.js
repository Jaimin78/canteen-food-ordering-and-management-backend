const mongoose = require('mongoose');
const uri = 'mongodb+srv://Jaimin:jaimin@jaimin.qjzvkio.mongodb.net/Online-Food-Ordering-and-Management?retryWrites=true&w=majority';

const connectDb = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(uri);
        console.log("Connected Successfully to Database");
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDb;
