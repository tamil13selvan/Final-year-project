var express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

var userController = require('../user/userController.js');
var providerController = require('../provider/providerController.js');
var ServiceController = require('../service/ServiceController.js');
const createServiceDBService = require('../service/ServiceServ').createServiceDBService;
var BookingController = require('../booking/BookingController.js')


// router.post('/', async (req, res, next) => {
//     try {
//       const providerId = req.provider.id; // Assuming the provider ID is stored in the req.user object
//       const serviceDetails = req.body;
//       await createServiceDBService(serviceDetails, providerId);
//       res.status(201).json({ message: 'Service created successfully.' });
//     } catch (error) {
//       next(error);
//     }
//   });



// const multer = require('multer');

// var storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//       cb(null,'upload')
//   },
//   filename: (_req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// let  upload = multer ({
//     storage:storage
// })
// router.post("/upload", upload.single("file"), async(req,res) => {
 
//    try {
//     console.log(req.file);
      
//     if(!req.file)
//       return res.status(400).json({message: "No file found"});

//     res.status(200).json({ message: "File uploaded successfully" });
//     } 
    
//     catch(error){
//      console.log(error.message);
//      res.status(500).json({message: "Server Error"});
//    }
    
// } )

router.route('/user/login').post(userController.loginUserController);
router.route('/user/create').post(userController.createUserController);
router.route('/provider/create').post(providerController.createProviderController);
router.route('/provider/login').post(providerController.loginProviderController);
router.route('/user/forgotPassword').post(userController.forgotPasswordController);
// router.route('/reset-password/:token').get(userController.renderResetPasswordPage);
// router.route('/reset-password/:token').post(userController.resetPasswordController);
router.route('/reset-password/:token')
  .get(userController.renderResetPasswordPage)
  .post(userController.resetPasswordController);
router.route('/service/add-a-service').post(ServiceController.createServiceController);
router.route('/user/book_services').post(BookingController.createBookingController);


// router.put("/user/reset/:token", resetPasswordController);
module.exports=router;

