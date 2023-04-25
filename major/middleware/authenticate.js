// const jwt = require('jsonwebtoken');

// function authenticate(request, response,next){
//     const token = request.headers.authorization.split('')[1];
//     const decodedToken = jwt.verify(token, 'secret-key');
//     request.username = decodedToken.username;
//     next();
// }


// module.exports = authenticate;

// const jwt = require('jsonwebtoken');
// JWT_SECRET = tamiltamil;

// const generateToken = (username) => {
//     return jwt.sign({username}, process.env.JWT_SECRET, {
//         expiresIn: "30d",
//     });
// };
// module.exports = generateToken; 
// async function fetchIdAndStoreInCollection(req, res, next) {
//     const username = req.body.username;
//     const provider = await providerModel.findOne({username: username});
//     if (provider) {
//       const id = provider._id;
//       // Store the ID in another collection here
//     }
//     next();
//   }