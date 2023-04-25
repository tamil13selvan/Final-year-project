const mongoose = require('mongoose');
const service = require('../service/ServiceModel')

const bookingSchema = new mongoose.Schema({
    cusername:{
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'service'
    },
    provider: {
      type: String,
      ref: 'service'
    },
    // serviceType: {
    //   type: String,
    //   enum: ['cleaning', 'relocation'],
    //   required: true
    // },
    status: {
      type: String,
      enum:['pending', 'approved','rejected'],
      default:'pending'
    },
    timestamp: { type: Date, 
      default: Date.now 
    },
    cleaningType: {
      type: String,
      required: function() {
        return this.serviceType === 'cleaning';
      }
    },
    currentAddress: {
      type: String,
      required: function() {
        return this.serviceType === 'relocation';
      }
    },
    newAddress: {
      type: String,
      required: function() {
        return this.serviceType === 'relocation';
      }
    },
    items: {
        type: String,
        required: function(){
            return this.serviceType === 'relocation';
        }
    },
    noOfRooms: {
      type: Number,
      required: function() {
        return this.serviceType === 'cleaning';
      }
    },
    surfaceArea: {
      type: String,
      required: function() {
        return this.serviceType === 'cleaning';
      }
    },
    charges:{
      type: Number
    }
  });

  module.exports = mongoose.model('booking', bookingSchema);
  