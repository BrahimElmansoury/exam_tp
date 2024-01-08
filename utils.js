const verifyJoke = (joke,author)=>{
    if(!author)
        return {state:false, msg:"author is required"}
    
    if(joke.length<=5)
        return  {state:false, msg:"joke must contains at least 5 caracters"}


    return {state:true, msg:""}
}
const middlewareVerification  = (req,res,next)=>{

    let {joke,author,jokeLike} = req.body
    let {state,msg} = verifyJoke(joke,author,jokeLike)
    if(state)
        return next()
    res.status(400).send(msg)
}
module.exports={
    verifyJoke,
    middlewareVerification
}