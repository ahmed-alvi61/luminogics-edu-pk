const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  resetToken: String,
  resetTokenExpiration: Date,
  assignedWeeks: [
    {
      week: { type: mongoose.Schema.Types.ObjectId, ref: 'weeks' },
      weekData: {
        name: String,
        no_of_item: Number,
        items: [
          {
            name: String,
            completed: Boolean,
          },
        ],
      }
    }
  ]
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;