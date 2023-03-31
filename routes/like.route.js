import express from 'express';
import { verify } from '../middelware/authenticate.js';
import {  removeLike } from '../controller/like.controller.js';
const router=express.Router();
router.get("/delete/:id", verify, removeLike);

export default router;