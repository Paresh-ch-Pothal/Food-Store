const jwt=require("jsonwebtoken");
const JWT_secret="TruecopyA4sizepaper";

const fetchuser=(req,res,next)=>{
    const token=req.header("auth-token");
    if(!token){
        res.status(401).send({error: "Please authenticate with correct web token"});
    }

    try {
        const data=jwt.verify(token,JWT_secret);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate with correct web token"});
        
    }
}

module.exports=fetchuser;