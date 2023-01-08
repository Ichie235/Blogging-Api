const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../config");

module.exports.checkUser = (req, res, next) => {
  const tokenData = req.cookies.myToken;
  
    if(!tokenData){
    return res.status(403).send({message:'Invalid token-data'})
    }
    let payload
    try{
        payload = jwt.verify(tokenData,APP_SECRET)
    }catch (e){
       if(e instanceof jwt.JsonWebTokenError){
        res.status(401).send({message:'Invalid token'})
       }
       return res.status(400).send({message:'Invalid token, please validate token'})
    }
    res.render('createPost')
}