const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try{
    // const token = req.headers.authorization.split(' ')[1];
    const token = req.body.userId
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ4MzM2MzE0Nzg5M2Q0NDEzMzEyMzgiLCJpYXQiOjE2NjU2NTY3NTgsImV4cCI6MTY2NTY2Mzk1OH0.HJUW6PKbrfMffo66s7bUQdp5PUKbesKPfNIh_ogY0ec'
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log('userId ok')
    next()
    // const pseudo = decodedToken.pseudo;
  //   const actualuserId = req.body.userId
  //   const actualDecoded = jwt.verify(actualuserId, 'RANDOM_TOKEN_SECRET');
  //  if(req.body){ 
  //   if (actualDecoded == userId) {
  //     next();
  //   } else {
  //     // console.log(pseudo);
     
  //     throw 'Invalid user ID';
     
    // }
  //  }
   } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
     console.log('userId pas ok')
  }
};