import express from "express";
import { authentication } from "../middleware/authentication.js";
import { redirectingdata ,servingmainpage,loginpage,internalservererror,signuppage} from "../controllers/controller.js";
const router1 =express.Router();

router1.get("/loginpage",loginpage);
router1.get("/signuppage",signuppage);
router1.get("/mainpage",authentication(),servingmainpage);
router1.get("/internalerror",internalservererror);
//Function to redirect the url to  the users...
router1.get("/:shortcode",authentication(),redirectingdata);

export default router1;