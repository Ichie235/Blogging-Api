const blogPost = require('../../models/blogPost')

module.exports = (req,res)=>{
    // console.log(req.body)
    const blog = req.body
    blog.createAt = new Date()
      blogPost.create(blog,(error,data)=>{
        if(error){
            return res.render('createPost')
        }
        res.redirect('/')
        res.end()
      })
}