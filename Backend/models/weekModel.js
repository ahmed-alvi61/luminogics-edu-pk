const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
  name: String,
  no_of_item: Number,
  items: [
    {
      name: String,
      completed: Boolean,
    },
  ],
});
const weekModel = mongoose.model('weeks', weekSchema);

module.exports = weekModel;