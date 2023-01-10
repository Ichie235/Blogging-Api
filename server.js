const express = require("express")

const { success, error } = require("consola");

const cookieParser = require("cookie-parser");


const homeController = require('./controllers/blogControl/homeBlog')
const storeBlogControl = require('./controllers/blogControl/storeBlog')
const getBlogControl = require('./controllers/blogControl/getBlogById')
const searchBlogControl = require('./controllers/blogControl/searchBlog')

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


//initializing middleware to parser body of request

app.use(express.urlencoded())
app.use(express.json());

app.use('/signup', authRoutes);


// Rendering view routes
app.get("/",homeController)

app.get('/auth/register',(req,res)=>{
  res.render('register')
})

app.get('/auth/login',(req,res)=>{
  res.render('login')
})

app.get("/error",(req,res)=>{
  res.render('error')
})

app.get("/post/:id",getBlogControl)

app.get("/blogs/:title",searchBlogControl)

app.get("/posts/new",checkUser,(req,res)=>{
    res.render('createPost')
})
  
app.post("/posts/store",storeBlogControl)


// Handle asynchronous error using error middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400)
  res.redirect('/error')
});

 // Start Listenting for the server on PORT
 app.listen(PORT, () =>
 success({ message: `Server successfully started on http://localhost:${PORT}`, badge: true })
 );




