import express from "express";
const router=express.Router();
import { routerdata,redirectingdata,signupuser,logging,servingmainpage,loginpage } from "../controllers/controller.js";//importing controller function in the router.js file//
import {loginschema,signupschema,dataschema} from "../validation/validatioschema.js";
import { authentication } from "../middleware/authentication.js";
import { checkingdefaultvalue } from "../middleware/checkingdefaultvalue.js";
import { validationmiddleware } from "../middleware/validation.js";

router.post("/signup",validationmiddleware(signupschema),signupuser);
router.post("/login",validationmiddleware(loginschema),logging);
//Function to check and add data in the mongodb database
router.post("/data",authentication(),checkingdefaultvalue,
validationmiddleware(dataschema),routerdata);
//Function to redirect the url to  the users
export default router;