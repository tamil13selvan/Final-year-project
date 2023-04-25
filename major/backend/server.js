const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
mongoose.set("strictQuery", false);
const app =express();
const cors = require("cors");
const routes = require('./route/routes')
const multer = require('multer');
const dotenv = require('dotenv');
const { resetPasswordController, renderResetPasswordPage } = require('./user/userController');
const { authenticate } = require('../middleware/authenticate');
const ejs = require('ejs'); // Add this line


const cre = require('./provider/providerController.js');
const { visitFunctionBody } = require('typescript');
// const { default: Booking } = require('../src/components/client/Booking');
dotenv.config();

 const corsOptions ={
  origin:'*', 
  credentials:true,           
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(express.urlencoded({
    extended:true,
}))
app.use(bodyParser.json());
// app.use(express.)
app.set('view engine', 'ejs');


app.listen(1234,function check(err)
 {
   if(err)
   console.log("error")
   else
   console.log("started")
 });
 
 mongoose.connect("mongodb+srv://tamil:tamil@cluster0.j0fsxkv.mongodb.net/test" ,{useNewUrlParser: true, useUnifiedTopology: true},
 function checkDb(error)
 {
   if (error)
   {
    console.log("error connecting to db");
    console.log(error);
   }
   else
   {
    console.log("successfully connected to db");
   }
 });
 
const user = mongoose.model('user');
const provider = mongoose.model('provider');
const service = mongoose.model('service');
const booking = mongoose.model('booking');
//providerModelData.username = providerDetails.username

app.get("/getAllUser", async(req,res)=> {
  try{
    const allUser = await user.find({});
    res.send({status:"ok", data:allUser}); 
  }catch{
    console.log(error);
  }
})

app.get("/getAllServices", async(req,res) => {
  try{
    const allService = await service.find({});
    res.send({status:"ok", data:allService});
  }catch{
    console.log(error);
  }
})

app.get("/getAllProvider",async(req,res) => {
  try{
    const allProvider = await provider.find({});
    console.log(allProvider,"///////");
    res.send({status:"ok", data:allProvider});
  }catch{
    console.log(error);
  }
})

app.get("/getAllBookings", async(req,res) => {
  try{
    const allBookings = await booking.find({});
    res.send({status:"ok", data:allBookings});
  }catch{
    console.log(error);
  }
})






app.get("/:username", async(req,res) => {
  try{
    const status = await booking.find({username: req.params.cusername});
    res.send({status:"ok", data: status})
  }catch(err){
    res.status(500).json({message: err.message});
  }
})


app.get("/view/:username",  async(req,res) => {
  try{
    const services = await service.find({username: req.params.username});
    // res.render('service',{service});
    res.send({status:"ok", data: services})
  }catch(err){ 
    console.log(err);  
   res.status(500).json({message: err.message})
  }
})

app.get("/myservices/:username", async(req,res) => {
  try{
    const myservice = await service.find({username:req.params.username});
    res.send({status:"ok", data: myservice});
  }catch(err){
    console.log(err);
    res.status(500).json({message: err.message});
  }
})

// app.put("/booking/:id", async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   console.log(id);
//   try {
//     const updatedBooking = await booking.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );
//     res.json(updatedBooking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.put("/booking/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.body.status);
  console.log(req.body.charges);
  const  bookingStatus = req.body.status;
  const bookingCharges = req.body.charges;
  // console.log(id,bookingStatus)
  if (!mongoose.Types.ObjectId.isValid(id)) { // Check if the id is valid
    return res.status(400).json({ message: 'Invalid ID' });
  }
  if(req.body.status==null){
    try{
    const updatedBooking = await booking.findByIdAndUpdate(
      id,
      {charges:bookingCharges},
      { new: true }
      );
      if (!updatedBooking) { // Check if booking with given id exists
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json(updatedBooking);
      return
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  try {
    console.log("We are herE at put api booking")
    const updatedBooking = await booking.findByIdAndUpdate(
      id,
      {status: bookingStatus },
      { new: true }
    );
    if (!updatedBooking) { // Check if booking with given id exists
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// app.put('/booking/:id', (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   booking.findByIdAndUpdate(id, { status }, { new: true })
//     .then(updatedBooking => {
//       if (!updatedBooking) {
//         return res.status(404).json({ error: 'Booking not found' });
//       }
//       res.json({ data: updatedBooking });
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     });
// });



app.get("/pendingProviders", async (req,res)=>{
   try{
    const pendingProvider = await provider.find({status:"pending"});
    res.send({status:"ok",data: pendingProvider});
   }catch{
    console.log(error);
   }
})



app.put('/acceptProvider/:providerId', async (req, res) => {
  try {
    const { providerId } = req.query;
    console.log(req.body);
    const provider = await provider.find();
    console.log(provider);
    if (!provider) {
      return res.status(404).send({ error: 'Provider not found' });
    }
    provider.status = 'approved';
    await provider.save();
    return res.send({ status: 'ok', data: provider });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Server error' });
  }
});


app.put('/rejectProvider/:providerId', async (req, res) => {
  try {
    const { providerId } = req.params;
    const provider = await provider.findById(providerId);
    if (!provider) {
      return res.status(404).send({ error: 'Provider not found' });
    }
    provider.status = 'rejected';
    await provider.save();
    return res.send({ status: 'ok', data: provider });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Server error' });
  }
}); 

// app.get('/reset-password/:token', resetPasswordController);
app.get('/reset-password/:token', renderResetPasswordPage);


app.use(express.json()); 
app.use(routes);

