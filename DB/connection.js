const mongoose = require('mongoose');

const URI = 'mongodb+srv://seminariomaster:daniel1254@cluster0.ux3vu.mongodb.net/<dbname>?retryWrites=true&w=majority';

const connectDB = async()=>{
    await mongoose.connect(URI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
    console.log('db connected....')
}

module.exports = connectDB;