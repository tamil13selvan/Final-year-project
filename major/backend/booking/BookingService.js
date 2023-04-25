var BookingModel  = require('./BookingModel.js')
var key = '123456789tamiltamil';
var encryptor = require('simple-encryptor')(key);
const Provider = require('../provider/providerModel.js');
const mongoose = require('mongoose');
const { useFetcher } = require('react-router-dom');
const   data = require('../../middleware/authenticate')

module.exports.bookingDBService = async (bookingDetails) => {
  return new Promise(function myFn(_resolve, reject){
    var bookingModelData = new BookingModel();
    
    bookingModelData.cusername = bookingDetails.cusername;
    bookingModelData.phone = bookingDetails.phone;
    bookingModelData.address = bookingDetails.address;
    bookingModelData.date = bookingDetails.date;
    bookingModelData.time = bookingDetails.time;
    // bookingModelData.serviceType = bookingDetails.serviceType;
    bookingModelData.service = bookingDetails.serviceId;
    bookingModelData.provider = bookingDetails.provider;


    if(bookingDetails.serviceType === 'cleaning'){
      bookingModelData.cleaningType = bookingDetails.cleaningType;
      bookingModelData.noOfRooms = bookingDetails.noOfRooms;
      bookingModelData.surfaceArea = bookingDetails.surfaceArea;
    }
    else if (bookingDetails.serviceType === 'relocation'){

        bookingModelData.currentAddress = bookingDetails.currentAddress;
        bookingModelData.newAddress = bookingDetails.newAddress;
        bookingModelData.items = bookingDetails.items;  
    }
    

      bookingModelData.save(function resultHandle(error, result){
        if(error){
            reject(false);
            console.log(error);
        }
        else{
            _resolve(true);
        }
    });
      }
  )}
    
    // )};