import jwt from "jsonwebtoken"

const protectRoute = (req,res,next)=>{
    const {token} = req.headers;

    if(!token){
        return res.json({success:false,message:"Not authorized login again"});
    }
     try {
         const user = jwt.verify(token,process.env.JWT_SECRET);
         if(user && user.id){
         req.userId = user.id;
         next();
         }else{
             return res.json({ success: false, message: "Not authorized login again" });
         }
     } catch (error) {
       return res.status(400).json({success:false,message:error.message});
     }
}

export default protectRoute;