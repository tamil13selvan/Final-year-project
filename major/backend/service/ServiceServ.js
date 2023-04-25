var serviceModel  = require('./ServiceModel');
var key = '123456789tamiltamil';
var encryptor = require('simple-encryptor')(key);
// const crypto = require('crypto');
const Provider = require('../provider/providerModel.js');
//var providerService = require('./providerService');
const mongoose = require('mongoose');
const { useFetcher } = require('react-router-dom');
// const provider =  Provider.findById(Provider);
const   data = require('../../middleware/authenticate')

module.exports.createServiceDBService = async (serviceDetails) => {
  return new Promise(function myFn(_resolve, reject){
    var serviceModelData = new serviceModel();
       
    // serviceModelData.provider = provider._id;
    serviceModelData.username = serviceDetails.username;
    serviceModelData.title = serviceDetails.title;
    // console.log(providerModelData.username,"///");
    serviceModelData.description = serviceDetails.description;
    serviceModelData.operatingArea = serviceDetails.operatingArea;
    serviceModelData.availability = serviceDetails.availability;
    serviceModelData.startTime = serviceDetails.startTime;
    serviceModelData.endTime = serviceDetails.endTime;
    var type = serviceDetails.type;
    serviceModelData.type = type;
    if (serviceDetails.type === 'cleaning') {
      serviceModelData.cleaningService = {
        bhk: serviceDetails.bhk,
        pricing: serviceDetails.pricing,
        duration: serviceDetails.duration
      };
    } else if (serviceDetails.type === 'relocation') {
      serviceModelData.relocationService = {
        distance: serviceDetails.distance,
        pricing: serviceDetails.pricing,
        duration: serviceDetails.duration
      };
    }

    serviceModelData.requirements = serviceDetails.requirements;
    serviceModelData.cleaningType = serviceDetails.cleaningType;
    
    if (serviceDetails.type === 'cleaning') {
        serviceModelData.pricing = serviceDetails.cleaning;
        serviceModelData.duration = serviceDetails.cleaning;
        // serviceModelData.distance = 0;
      } else if (serviceDetails.type === 'relocation') {
        serviceModelData.pricing = serviceDetails.relocation;
        serviceModelData.duration = serviceDetails.relocation;
      }

      serviceModelData.save(function resultHandle(error, result){
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