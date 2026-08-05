import express from "express";
const app=express();
import router from "./routes/routes.js"; //importing router function in this file//
import router1 from "./routes/pagerouter.js";
import {Noroutemiddleware} from "./middleware/Noroutemiddleware.js";
import {globalmiddleware} from "./middleware/globalerrorhandler.js";
import cookieParser from "cookie-parser";
//using cookie parser middleware//
app.use(cookieParser());
//converting data in javascript object//
app.use(express.json());
//using static files when it needed//
app.use(express.static("views"));
//normal html pages redirect...
app.use("/",router1);
//using router function in main express.js file//
app.use("/api",router);
app.use(Noroutemiddleware);
//Global middleware...
app.use(globalmiddleware);


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("server is listening");
});


