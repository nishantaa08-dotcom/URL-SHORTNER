import {db,loadlinks} from "../models/model.js";

export const authentication =()=>{
    try{
        return async(req,res,next)=>{
            let usersessionid =req.cookies.session_id;
            let sessiondatabase = await db.collection("session").findOne({sessionid:usersessionid});
            if(!sessiondatabase){
                res.clearCookie("session_id");
                if(req.originalUrl.startsWith("/api")){
                    return res.status(401).json({
                        message:"unauthorized person login again",
                        sucess:false,
                    })
                }
                else{
                    return res.status(302).redirect("/loginpage");
                }
            }
            if(new Date(Date.now()) >sessiondatabase.expires_at){
                if(req.originalUrl.startsWith("/api")){
                    await db.collection("session").deleteOne({sessionid:usersessionid});
                    res.clearCookie("session_id");
                    return res.status(400).json({
                        message:"unauthorized person login again",
                        sucess:false,
                    })
                }
                else{
                    await db.collection("session").deleteOne({sessionid:usersessionid});
                    res.clearCookie("session_id");
                    return res.status(302).redirect("/loginpage");
                }
            }
            req.userdata = {
                usersessionid,
                userid:sessiondatabase.user_id
            };
            next();
        }
    }
    catch(error){
        next(error);
    }
}