import express from "express";
import { addToCart, viewCart, loadCart, removeCart,like, addLike } from "../controller/cart.controller.js";
import { verify } from "../middleware/authenticate.js";
const router = express.Router();

router.get("/add-to-cart/:userId/:productId",verify,addToCart);
router.get("/addLike/:userId/:productId",verify,addLike);
router.get("/like",verify,like);
router.get("/delete/:id", verify, removeCart);
router.get("/viewcart",verify,viewCart);
router.get("/load-cart",verify,loadCart);
export default router;