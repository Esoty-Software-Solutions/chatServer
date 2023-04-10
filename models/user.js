const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Export the User model
module.exports = mongoose.model('User', userSchema);

userSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ username: username })
      .exec(function (err, user) {
        if (err) {
          return callback(err);
        } else if (!user) {
          const err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        });
      });
  };

