const { render } = require('ejs')
const blogPost = require('../../models/blogPost')

module.exports = (req,res)=>{
    try {
        blogPost.find(
          {
            $or: [
              { title: { $regex: req.query.dsearch,$options: 'i' } },
              { author: { $regex: req.query.dsearch,$options: 'i' } }
            ],
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              //res.render('index',{data});
              console.log(result);
              res.render('index',{result})
            }    }
            );
          } catch (error) {
            console.log(error);
          }
}

