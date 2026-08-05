import express from "express";
import path from "path";
import { db,loadlinks,userclient} from "../models/model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
const router=express.Router();

export const signupuser =async(req,res,next)=>{
    try{
        console.log("signupuser route");
        let signupdatabase=db.collection("signup");
        //hashing password...
        const hashpassword= await bcrypt.hash(req.body.password,12);
        //removing confirmpassword filed from req.body
        let {confirmpassword, ...userdata} =req.body;
        //making final singnup object
        let finalsignupdata = {
        ...userdata,
        password:hashpassword
        };
        //saving data to the database 
        await signupdatabase.insertOne(finalsignupdata);
        return res.status(200).json({
            sucess:true,
            message:"signup successful",
        })
        
    }
    catch(error){
        next(error);
    }
};
export const loginpage=(req,res)=>{
    return res.status(200).sendFile(path.join(process.cwd(),"mainurlpage","indexloginpage.html"));
}

export const logging=async(req,res)=>{
    try{
        //extracting data from the database by the username....
        let logindatafromdatabase= await db.collection("signup").findOne({name:req.body.username});
        //verifying the credentials by the username....
        if(!logindatafromdatabase){
            return res.status(400).json({message:"Invalid credentials"});
        }
        //checking passoword in the databse
        const match = await bcrypt.compare(req.body.password,logindatafromdatabase.password);
        if(!match){
            return res.status(400).json({message:"Invalild credentials"});
        }
        //creating random number for the sessions..
        const session_id =crypto.randomBytes(20).toString("hex");
        //making sesion object so that its easy to store data in the database....
        const session={
            sessionid:session_id,
            user_id:logindatafromdatabase._id,
            created_at:new Date(),
            expires_at:new Date(Date.now() + 20 *60 *1000),
        };
        //session collection in the databse...
        const sessioncollection = db.collection("session");
        await sessioncollection.insertOne(session);
        //sending cookies to the browser...
        res.cookie("session_id",session_id,{
            httponly:true,
            secure:true,
            sameSite:"strict",
            maxAge: 24*60*60*1000,
            path:"/"
        });
        return res.status(200).json({sucess:true});
    }
    catch(error){
        next(error);
    }
};

export const servingmainpage=(req,res)=>{
    return res.status(200).sendFile(path.join(process.cwd(),"mainurlpage","main.html"));
}

const writingdatatodatabase=async(initialdata)=>{
    try{
        await userclient.insertOne(initialdata);
    }
    catch(error){
        next(error);
    }
}

export const routerdata=async(req,res)=>{
    const links=await loadlinks();
    let initialdata=req.body;
    try{
        await writingdatatodatabase(initialdata);
        return res.status(200).json({
            message:initialdata,
        })
    }
    catch(error){
        next(error)
    }
}

export const redirectingdata=async(req,res)=>{
    try{
        const links=await loadlinks();
        let realshortcode=req.params.shortcode;
        for(let i=0;i<links.length;i++){
            if(links[i].shortcode===realshortcode){
                const realurl=links[i].url;
                return res.redirect(realurl);
            }
        }
    }
    catch(error){
        next(error);
    }
};
   
export const internalservererror=(req,res)=>{
    return res.sendFile(path.join(process.cwd(),"mainurlpage","500.html"));
}