// Provider's name
// phone Number,
// email,
// company name,
// company address,
// cmpny contact details,
// type of service,
// availability and scheduling,
// insurance,coverage,license



var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var providerSchema = new Schema({

    fullname: {
        type:String,
        required:true
    },
    username: {
      type: String,
      unique: true,
      required: true,
      // match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phone:{
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    cname: {
      type: String,
      required: true
    },
    caddress: {
        type: String,
        required: true
      },
    description: {
      type: String,
      required: true
    },
    ccontact: {
        type: String,
        required: true
      },
    servicetype: {
        type: String,
        required: true
      },
    status: {
        type: String,
        enum:['pending', 'approved','rejected'],
        default:'pending'
    },
    timestamp: { type: Date, 
      default: Date.now 
    }
    
  });

  module.exports = mongoose.model('provider', providerSchema);

  // module.exports = ProviderModel = mongoose.model('provider',providerSchema)