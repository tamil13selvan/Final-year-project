var serviceService = require('./ServiceServ');
// const Provider = require('../provider/providerModel.js');


var createServiceController = async(req,res) => {
    try{
        console.log(req.body);
        var status = await serviceService.createServiceDBService(req.body);
        console.log(status);
        
        if(status){
            res.send({"status": true,"message":"Service added successfully"});
        }
        else{
            res.send({"status":false, "message":"error adding service"});
        }
    }
    catch(err){
        console.log(err); 
    }
}

module.exports = {createServiceController};