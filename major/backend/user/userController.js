var userService = require('./userService');
var userModel  = require('./userModel.js');
var bcrypt = require('bcryptjs');
const crypto = require('crypto');

var createUserController = async(req,res) => {
    try{
        console.log(req.body);
        var status = await userService.createUserDBService(req.body);
        console.log(status);

        if(status){
            res.send({"status": true,"message":"user created successfully"});
        }
        else{
            res.send({"status":false, "message":"error creating user"});
        }
    }
    catch(err){
        console.log(err); 
    }
}

var loginUserController = async(req,res) => {
    var result=null;

    try{
        result=await userService.loginUserDBService(req.body);
        if(result.status) {
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

var forgotPasswordController = async(req, res) => {
    try {
      const result = await userService.forgotPasswordDBService(req.body.email);
      res.status(200).json({ status: true, message: result.msg });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: error.msg });
    }
  };


  const renderResetPasswordPage = async (req, res) => {
    try {
      const token = req.params.token;
  
      const user = await userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Password reset token is invalid or has expired",
        });
      }
      res.render('PassReset', { token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: error.message });
    }
  };  

// const resetPasswordController = async (req, res) => {
//     try {
//       const token = req.params.token;
  
//       // Find the user with the given reset token
//       const user = await userModel.findOne({
//         resetPasswordToken: token,
//         resetPasswordExpires: { $gt: Date.now() },
//       });
  
//       if (!user) {
//         return res.status(400).json({
//           status: false,
//           message: "Password reset token is invalid or has expired",
//         });
//       }
//       res.status(200).json({ status: true, message:"Reset password" });

//       // res.render('reset-password', { token });
  
//       // Update the password
//       const salt = await bcrypt.genSalt(10);
//       const hash = await bcrypt.hash(req.body.password, salt);
//       user.password = hash;
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpires = undefined;
  
//       await user.save();
       
//       res.status(200).json({
//         status: true,
//         message: "Password has been reset successfully",
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ status: false, message: error.message });
//     }
//   };

const resetPasswordController = async (req, res) => {
  try {
    const token = req.params.token;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "New password and confirm password do not match",
      });
    }
     
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Password reset token is invalid or has expired",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      status: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};
  

  
module.exports = { createUserController,loginUserController,forgotPasswordController,renderResetPasswordPage,resetPasswordController };