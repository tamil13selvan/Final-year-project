//service title
//Description
//price
//service duration
//Availability (include day and time)
//location
//any special requirements (tools or equipment)
//{see how to add respective provider id while he adds a service}
//{see whether to add insurance coverage}

const mongoose = require('mongoose');



const cleaningServiceSchema = new mongoose.Schema({
  cleaningType: {
    type: String,
    // required: true
  },
  bhk: {
    type: String,
    // required: true
  },
  pricing: {
    type: Number,
    // required: true
  },
  duration: {
    type: Number,
    // required: true
  }
});

const relocationServiceSchema = new mongoose.Schema({

  distance: {
    type: Number,
    // required: true
  },
  pricing: {
    type: Number,
    // required: true
  },
  duration: {
  type: Number,
    // required: true
  }
});

const serviceSchema = new mongoose.Schema({
  // provider: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'provider',
  //   required: true
  // },
  username: {
    type: String,
    // ref:'provider',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  operatingArea: {
    type: [String],
    required: true
  },
  availability: {
    type: [String],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  
  type: {
    type: String,
    required: true
    // enum: ['cleaning', 'relocation']
  },
  cleaningService: {
    type: cleaningServiceSchema
  },
  relocationService: {
    type: relocationServiceSchema
  },
  pricing: {
    type: mongoose.Schema.Types.Mixed,
    // required: true
  },
  duration: {
    type: mongoose.Schema.Types.Mixed,
    // required: true
  },
  requirements: {
    type: String
  }
});

serviceSchema.pre('save', function (next) {
  if (this.type === 'cleaning') {
    this.bhk = cleaningServiceSchema;
    this.cleaningType = cleaningServiceSchema
    this.pricing = cleaningServiceSchema;
    this.duration = cleaningServiceSchema;
  } else if (this.type === 'relocation') {
    // this.items = relocationServiceSchema;
    this.distance = relocationServiceSchema;
    this.pricing = relocationServiceSchema;
    this.duration = relocationServiceSchema;
  }
  next();
});

module.exports = mongoose.model('service', serviceSchema);