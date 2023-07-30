const jwt = require('jsonwebtoken');

//Middleware to Verify the Token
const tokenVerification = (req,res,next) => {
  let token = req.headers['authorization'];
  if(token){
    //token = token.split(' ')[1];
    jwt.verify(token,'food', (err, valid) => {
       if(err){
         return res.status(401).send({error:'please add valid token'})
       }else{
         next();
       }
    })
  } else {
    return res.status(403).send({error:'please add header token'})
  }
}

module.exports = tokenVerification;