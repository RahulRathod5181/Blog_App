const jwt = require("jsonwebtoken")
require("dotenv").config()
const auth = async(req,res,next)=>{
    const token = req.headers.authorization;

    if(token){
        try {
            var decoded = jwt.verify(token, process.env.Secret);
            if(decoded){
                req.body["blogID"] = decoded.postID
                req.body["username"] = decoded.postBy
                // console.log(req.body)
                next();
            }else{
                res.send({msg:"Please Login"})
            }
        } catch (error) {
            res.send({msg:error.message})
        }
    }
    else{
        res.send({msg:"Please Login"})
    }
}

module.exports = {
    auth
}