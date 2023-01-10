const blogPost = require('../../models/blogPost')

module.exports = async(req,res,next)=>{
  try {
   // sending back the data for each post blog
   const id = req.params.id
   const blogposts = await blogPost.findById(id)
   if(blogposts.readingCount == null){
   
      console.log( blogposts.readingCount = parseInt(1))
      blogposts.save()
     return
   }
    blogposts.readingCount ++;
    blogposts.save()
    res.status(200)
   res.render('post',{
     blogposts
   }) 
  } catch (error) {
     console.log(error)
    res.redirect('/error')
  }
}