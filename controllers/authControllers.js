const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../config/index");

//this function is used to create token using user id
const createToken = (id) => {
  return jwt.sign({ id }, APP_SECRET, {
    expiresIn: '1h',
  });
};

//  REGISTER USER CONTROLLER

module.exports.register = async (req, res, next) => {
  try {
    const {firstName,lastName, email, password } = req.body;

     const user = await UserModel.create({ firstName,lastName,email, password });
     console.log(user)

   res.status(201);
   res.redirect('/auth/login')
    
  } catch (err) {
    console.log(err);
    res.status(500)
     res.json({ err, created: false });
  }
};

//   LOGIN USER CONTROLLER
module.exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await UserModel.findOne({ email:email });
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
  }
  const validate = await user.isValidPassword(password);
  if (!validate) {
    return res.status(400).send({ message: 'Wrong password' });
}
    
    const token = createToken(user._id);
    console.log(token)
    res.status(200)
       .cookie('myToken',token,{maxAge:3600000, path:'/posts/new' })
       .render('createPost')
  } catch (err) {
    res.status(500)
    res.json({ err, status: false });
  }
};