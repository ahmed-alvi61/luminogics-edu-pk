const mongoose = require('mongoose');

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
};

const connectionPromise = mongoose.connect('mongodb+srv://ahmedalvi:6may1997@cluster0.tcwjsql.mongodb.net/Luminogics-Edu-Portal', dbOptions)

module.exports = connectionPromise;