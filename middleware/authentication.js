// const jwt = require('jsonwebtoken');

// // Example secret key for JWT signing, replace it with your own secret key
// const JWT_SECRET_KEY = 'mysecretkey';

// // Middleware to authenticate user using JWT
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ message: 'Authentication required.' });
//   }

//   // Extract token from the Authorization header
//   const token = authHeader.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'Invalid token.' });
//   }

//   // Verify the token
//   jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token.' });
//     }
//     // Store the user data in the request for later use
//     req.user = user;
//     next();
//   });
// }

// // Function to generate JWT for a user
// function generateToken(user) {
//   return jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '1h' });
// }

// module.exports = {
//   authenticateToken,
//   generateToken,
// };


// const user = {
//     id: '123',
//     username: 'john_doe',
//     role: 'user',
//   };
  
// const token = generateToken(user);
// console.log('Generated JWT token:', token);
  