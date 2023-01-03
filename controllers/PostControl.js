module.exports= (req,res,next)=>{
    try{
    res.render('createPost')
    }catch (error){
        console.log(error)
    }
}




