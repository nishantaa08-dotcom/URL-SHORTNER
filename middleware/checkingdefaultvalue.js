
import { db,loadlinks } from "../models/model.js";

export const checkingdefaultvalue=async(req,res,next)=>{
    try{
        const links=loadlinks();
        let usershortcodevalue = req.body;
        const defaultshortcodevalue = await db.collection("data").findOne({shortcode:usershortcodevalue.shortcode});
        if(defaultshortcodevalue){
            console.log("hello");
            return res.status(400).json({
            message:"shortcode already exit plz use another shortcode",
            sucess:true,
            });
        }
        next();
    }
    catch(error){
        next(error);
    }
}