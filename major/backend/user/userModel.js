var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    
    fullname: {
        type:String,
        required:true
    },
    username: {
      type: String,
      unique: true,
      required: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true
    },
    // cpassword:{
    //     type: String,
    //     required: true
    // },
    phone: {
      type: String,
      required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
    
  });

  module.exports = mongoose.model('user', userSchema);
  