var userModel  = require('./userModel.js');
var key = '123456789tamiltamil';
var encryptor = require('simple-encryptor')(key);
const crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports.createUserDBService = (userDetails) => {
    return new Promise(function myFn(resolve, reject){
    var userModelData = new userModel();

    userModelData.fullname = userDetails.fullname;
    userModelData.username = userDetails.username;
    userModelData.password = userDetails.password;
    userModelData.cpassword = userDetails.cpassword;
    if(userModelData.password.length < 8){
        reject(false);
        alert("Password length should be minimum 8")
     }

    if(userModelData.password != userModelData.cpassword){
        reject(false);
        alert("passwords do not match");
    }
    userModelData.phone = userDetails.phone;
    var encrypted = encryptor.encrypt(userDetails.password);
    userModelData.password = encrypted;

    userModelData.save(function resultHandle(error, result){
        if(error){
            reject(false);
            console.log(error);
        }
        else{
            resolve(true);
        }
    });
});
}



module.exports.loginUserDBService = (userDetails) => {
    return new Promise(function muFn(resolve,reject){
        userModel.findOne({username: userDetails.username},function getresult(errorvalue,result){
            if(errorvalue){
                reject({status:false, msg: "Invalid data"});
            }
            else{
                if(result!= undefined && result !=null){
                    var decrypted = encryptor.decrypt(result.password);

                    if(decrypted == userDetails.password){
                        resolve({status: true, msg:"User validated successfully"});
                    }
                    else{
                        reject({status: false, msg: "Incorrect password"});
                    }
                }
                else{
                    reject({status: false, msg:"Invalid User details"});
                }
            }
        });

        
    }); 
}

module.exports.forgotPasswordDBService = (email) => {
    return new Promise(function myFn(_resolve, reject) {
      userModel.findOne({ username: email }, function getresult(errorvalue, result) {
        APP_URL='http://localhost:1234'
        if (errorvalue) {
          reject({ status: false, msg: "Invalid data" });
        } else {
          if (result != undefined && result != null) {
            const token = crypto.randomBytes(20).toString('hex');
            const expiresIn = Date.now() + 3600000; 
  

            result.resetPasswordToken = token;
            result.resetPasswordExpires = expiresIn;
            result.save(function (err) {
              if (err) {
                reject({ status: false, msg: "Error saving token" });
              } else {
                
                const resetUrl = `${APP_URL}/reset-password/${token}`;


                const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'tamilselvan132001@gmail.com', 
                    pass: 'cdgwoqtpiylaoncg' 
                  }
                });
  
                const mailOptions = {
                  from: 'tamilselvan132001@gmail.com', 
                  to: email,
                  subject: 'Movers and Cleaners - Password Reset',
                  text:
                    // 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    // 'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    // '<a href="' + resetUrl + '/reset/' + token + '">Reset Password</a>\n\n'+
                    // 'If you did not request this, please ignore this email and your password will remain unchanged.\n'

                    'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    resetUrl + '\n\n'+
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
  
                transporter.sendMail(mailOptions, function (error, _info) {
                  if (error) {
                    reject({ status: false, msg: "Error sending email" });
                    console.log(error);
                    
                  } else {
                    _resolve({ status: true, msg: "Email sent successfully" });
                  }
                });
            }
            });
          } else {
            reject({ status: false, msg: "Invalid User details" });
          }
        }
      });
    });
  };
  