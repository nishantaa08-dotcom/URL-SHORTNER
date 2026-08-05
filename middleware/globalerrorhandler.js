import path from "path";

export const globalmiddleware=(err,req,res,next)=>{
    console.log("hello")
    console.log(err);
    return res.status(500).json({
        message:"internal server error",
    });
}