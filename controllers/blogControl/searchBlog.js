const blogPost = require('../../models/blogPost')

module.exports = async(req,res)=>{
   try{
      // sending back the data based on filter by title and author
      const title = req.params.title
      const author = req.params.author
      const blogposts = await blogPost.find({title:title,author:author})
        .then(blog=>{
          res.send(blog)
        })
        .catch(err=>{
          console.log(err)
          res,send(err)
        })
      res.render('post',{
        blogposts
      })
    }catch(error){
      error.type = 'Not Found'
   next(error)
    }
}