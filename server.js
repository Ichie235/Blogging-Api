const express = require("express")
const mongoose = require("mongoose")
const { success, error } = require("consola");
const ejs = require("ejs")
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");

const PostController = require('./controllers/PostControl')
const homeController = require('./controllers/homeBlog')
const storePostController = require('./controllers/storePostControl')
const getPostController = require('./controllers/getPostByIdControl')
const searchPostController = require('./controllers/searchPostControl')

const { checkUser } = require("./middlewares/authMiddleware");

const authRoutes = require("./route/authentication");

// Bring in the app constants from config folder
const { PORT } = require("./config");

const db = require('./db');


// Connecting to database using mongoose library
db.connectToMongoDB();

// Initialize the application
const app = express()

// setting the templating engine to access html flies
app.set('view engine','ejs')

//initializing middleware to access static flies from public folder
app.use(express.static('public'))

app.use(cookieParser());


////initializing middleware to parser body of request
app.use(bodyParser.json())

//allows req.body object will contain values of any type instead of just strings.
app.use(bodyParser.urlencoded({extended:true}))

app.use('/signup', authRoutes);


// Getting routes
app.get('/auth/register',(req,res)=>{
  res.render('register')
})
app.get('/auth/login',(req,res)=>{
  res.render('login')
})
app.get("/",homeController)

app.get("/post/:id",getPostController)

app.get("/blogs/:title",searchPostController)

app.get("/posts/new",checkUser,PostController)
  
app.post("/posts/store",storePostController)

app.get("/error",(req,res)=>{
  res.render('error')
})


// Handle asynchronous error using error middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400)
  res.render('error')
  next
});



 // Start Listenting for the server on PORT
 app.listen(PORT, () =>
 success({ message: `Server successfully started on http://localhost:${PORT}`, badge: true })
 );




