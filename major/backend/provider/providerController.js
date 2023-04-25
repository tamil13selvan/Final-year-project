var providerService = require('./providerService');
// const mailgetting = require("../../middleware/authenticate")
const authenticate = require('../../middleware/authenticate');
const jwt = require('jsonwebtoken');

// var emailData ;
// console.log(emailData);
// var cre = async() => {
//     var zz = emailData;
//     console.log(zz);
// }

var createProviderController = async(req,res) => {
    try{
        // await fetchIdAndStoreInCollection(req, res, () => {});
        var status = await providerService.createProviderDBService(req.body);
        console.log(status);  
        
        if(status){

            res.send({"status": true,"message":"profile created successfully!! Your profile approval status is pending"});
        }
        else{
            res.send({"status":false, "message":"error creating service provider"});
        }
    }
    catch(err){
        console.log(err); 
    }
}
  
var loginProviderController = async(req,res) => {
    var result=null;

    try{
        result=await providerService.loginProviderDBService(req.body);
        if(result.status) {
            const token = jwt.sign(
                {
                  username: req.body.username,
                },  'secret123'
                )
                console.log(token);
            res.send({"status": true, "message": result.msg});

        }
        else{
            res.send({"status": false, "message": result.msg});
        }

    }
    catch(error){
        console.log(error);
        res.send({"status": false, "message": error.msg});
    }
}

module.exports = { createProviderController, loginProviderController };