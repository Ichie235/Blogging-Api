const moogoose = require('mongoose');
const {MONGODB_URI} = require('./config/index')

// connect to mongodb
function connectToMongoDB() {
    moogoose.connect(MONGODB_URI,{ useNewUrlParser: true });

    moogoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    moogoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    })
}

module.exports = { connectToMongoDB };