var bookingService = require('./BookingService');
// const Provider = require('../provider/providerModel.js');


var createBookingController = async(req,res) => {
    try{
        console.log(req.body);
        var status = await bookingService.bookingDBService(req.body);
        console.log(status);
        
        if(status){
            res.send({"status": true,"message":"Booked Successfully"});
        }
        else{
            res.send({"status":false, "message":"Booking failed"});
        }
    }
    catch(err){
        console.log(err); 
    }
}

module.exports = {createBookingController};