var providerModel  = require('./providerModel.js');
var key = '123456789tamiltamil';
var encryptor = require('simple-encryptor')(key);
const fs = require('fs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

module.exports.createProviderDBService = (providerDetails) => {
  return new Promise(async function myFn(_resolve, reject){
   
    
    var providerModelData = new providerModel();
    
    providerModelData.fullname = providerDetails.fullname;
    providerModelData.username = providerDetails.username;
    providerModelData.phone = providerDetails.phone;
    providerModelData.password = providerDetails.password;
    providerModelData.cpassword = providerDetails.cpassword;
    if (providerModelData.password && providerModelData.password.length < 8) {
      reject("password length should be at least 8 characters");
    }   
    
    if (providerModelData.password && providerModelData.cpassword && providerModelData.password != providerModelData.cpassword) {
      reject("passwords do not match");
    }
    providerModelData.cname = providerDetails.cname;
    providerModelData.caddress = providerDetails.caddress;
    providerModelData.description = providerDetails.description;
    providerModelData.ccontact = providerDetails.ccontact;
    providerModelData.servicetype=providerDetails.servicetype;
    providerModelData.approved=false;
    providerModelData.file = providerDetails.file;
    // const token = jwt.sign({ username: providerDetails.username }, 'secret-key');
    // return _resolve({ success: true, token: token });

    
    // if (providerDetails.file) {
    //   const data = fs.readFileSync(providerDetails.file.path);
    //   providerModelData.file = data;
    // }          
    // else{
    //   console.log("File uploading error");
    // }

    
  
        if (providerDetails.password) {
          var encrypted = encryptor.encrypt(providerDetails.password);
          providerModelData.password = encrypted;
        }
      

        providerModelData.save(function resultHandle(error, result){
          if(error){
              reject(false);
              console.log(error);
          }
          else{
            // const token = jwt.sign({ username: providerDetails.username }, 'secret-key');
            //  return _resolve({ success: true, token: token });
             _resolve(true);
            
          }
      });
      }
    )};

    module.exports.loginProviderDBService = (providerDetails) => {
      return new Promise(function muFn(resolve,reject){
          providerModel.findOne({username: providerDetails.username},function getresult(errorvalue,result){ 
              if(errorvalue){
                  reject({status:false, msg: "Invalid data"});
              }
              else{
                  if(result!= undefined && result !=null){
                      var decrypted = encryptor.decrypt(result.password);
  
                      if(decrypted == providerDetails.password){ 
                          resolve({status: true, msg:"User validated successfully"});
                      }
                      else{
                          reject({status: false, msg: "Incorrect password"});
                      }
                  }
                  else{
                      reject({status: false, msg:"Invalid User details"});
                      // alert("Invalid user details")
                  }
              }
          });
      } 
      )}