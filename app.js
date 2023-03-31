import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import session from "express-session";
import {LocalStorage} from 'node-localstorage' ;
import IndexRoute  from './routes/index.route.js';
import CartRoute from './routes/cart.route.js';
import OrderRoute from './routes/order.route.js';
import ProductRoute from './routes/product.route.js';
import ReviewRoute from "./routes/review.route.js";
import LikeRoute from "./routes/like.route.js";
var localStorage = new LocalStorage('./scratch'); 
const app=express();
app.set("view engine","ejs");
const __dirname=path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname,"public")));
app.use(session({secret:"asdfghjklkjhgfd",saveUninitialized:"true", resave:true}))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/",IndexRoute);
app.use("/cart",CartRoute);
app.use("/order",OrderRoute);
app.use("/product",ProductRoute);
app.use("/review",ReviewRoute);
app.use('/like',LikeRoute);

app.listen(100,(err)=>{
 console.log("Server Started");
})

