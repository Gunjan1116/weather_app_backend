const jwt=require("jsonwebtoken");
require("dotenv").config();
const authentication=async(req,res,next)=>{
    let token=req.headers.authorization;
    try {
        if(token){
            let decode=jwt.verify(token,process.env.key);
            let userId=decode.userId;
            //console.log(decode)
            if(decode){
                req.body.userId=userId;
                next();
            }else{
                res.json({"msg":"Invalid Token"})
            }
        }else{
            res.json({"msg":"Not Authorized"})
        }
    } catch (error) {
        console.log("error from authenticate middleware",error);
        res.json({"msg":"error while authentication"})
    }
}

module.exports={
    authentication
}