const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../config/index");

const maxAge =  60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, APP_SECRET, {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { firstName:"",lastName:"",email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const {firstName,lastName, email, password } = req.body;
    // const body = req.body
    // console.log(req.body)
     const user = await UserModel.create({ firstName,lastName,email, password });
     const token = createToken(user._id);

     res.cookie("jwt", token, {
     withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
     });
 
   res.status(201);
   res.render('login')
    
  } catch (err) {
    console.log(err);
     const errors = handleErrors(err);
     res.json({ errors, created: false });
  }
};

// Login controller
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find(email, password);
    console.log(user)
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200);
    res.render('createPost')
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};