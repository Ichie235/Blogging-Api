const blogPost = require('../../models/blogPost')

module.exports= async(req,res,next)=>{
     // sending back data to the index.html file 
  //  const blogposts = await blogPost.find({})
  //  res.render('index',{
  //  blogposts : blogposts
  // })
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const result = {};
    const totalPosts = await blogPost.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalPosts = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await blogPost.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await blogPost.find({})
    // const blogposts = result.data
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.rowsPerPage = limit;
    return res.render('index',{
      result: result.data 
      })
  } catch (error) {
    console.log(error)
  }
  
}
