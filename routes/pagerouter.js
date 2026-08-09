import express from "express";
import { authentication } from "../middleware/authentication.js";
import { redirectingdata ,servingmainpage,loginpage,signuppage} from "../controllers/controller.js";
const router1 =express.Router();

router1.get("/loginpage",loginpage);
router1.get("/signuppage",signuppage);
router1.get("/mainpage",authentication(),servingmainpage);
//Function to redirect the url to  the users...
router1.get("/s/:shortcode",redirectingdata);
export default router1;