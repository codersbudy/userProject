import express from 'express';
import {indexPage,signInPage,signUppage,signup,signIn,signout,viewDescription}from "../controller/index.controller.js";
import { verify } from '../middelware/authenticate.js';
const router=express.Router();

router.get("/",indexPage);
router.get("/signIn",signInPage);
router.get("/signUp",signUppage);
router.post("/signUp",signup);
router.post("/signIn",signIn);
router.get("/signout",verify,signout);
router.get("/views/:productId",viewDescription);

// router.get("/views/:productId",viewDescription1);

export default router;
