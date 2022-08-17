var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  usermail: {
    type: String,
    required: true,
  },
  userpassword: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

usersSchema.methods.encryptPassword = function (userpassword) {
  return bcrypt.hashSync(userpassword, bcrypt.genSaltSync(5), null);
};

usersSchema.methods.validPassword = function (userpassword) {
  return bcrypt.compareSync(userpassword, this.userpassword);
}


const Users = mongoose.model('Users', usersSchema);

module.exports = Users;