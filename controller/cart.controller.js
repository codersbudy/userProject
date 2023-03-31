
import Cart from "../model/cartmodel.js";
import Cart1 from "../model/cartmodel.js";
import c from "../model/cartmodel.js";
import { LocalStorage } from "node-localstorage";


export const addToCart = (request, response, next) => {
   let userId = request.params.userId * 1 - 1240;
   let productId = request.params.productId * 1 - 2342;
   let cart = new Cart();
   cart.userId = userId;
   cart.productId = productId;
   cart.ProductExist().then(result => {
      console.log(result);
      if (!result.length) {
         cart.save().then(result => {
            return response.json({ message: "product add in Cart Succesfully" });
         }).catch(err => {
            console.log(err);
         })
      } else {
         return response.json({ message: "Product is Already  Present in your Cart" });
      }
   }).catch(err => {

   });
}
export const addLike = (request, response, next) => {
   let userId = request.params.userId * 1 - 1240;
   let productId = request.params.productId * 1 - 2342;
   let cart = new Cart();
   cart.userId = userId;
   cart.productId = productId;
   cart.LikeExist().then(result => {
      console.log(result);
      if (!result.length) {
         cart.saveLike().then(result => {
            return response.json({ message: "product add in Favourite" });
         }).catch(err => {
            console.log(err);
         })
      } else {
         return response.json({ message: "Product is Already  Present in Favourite" });
      }
   }).catch(err => {

   });
}


export const viewCart = (request, response, next) => {
   console.log("sdfghjk");
   let userId = request.session.user.id;
   Cart1.viewCart(userId).then(result => {
      console.log(result);
      return response.render("addtocart.ejs", {
         currentUser: request.session.user
         , cartItem: result
      });
   }).catch(err => {
      console.log(err);
   });
}

export const like = (request, response, next) => {
   console.log("sdfghjk");
   let userId = request.session.user.id;
   Cart1.like(userId).then(result => {
      
      return response.render("like.ejs", {
         currentUser: request.session.user
         , cartItem: result
      });
   }).catch(err => {
      console.log(err);
   });
}



export const removeCart = (request, response, next) => {
   let produtIndex = request.params.id;
   let userId = request.session.user.id;
   Cart.findOne(userId).then(result => {
      let cartItem = result;
      let id = (cartItem[produtIndex].id);
      Cart.deleteCart(id).then(result => {
         return response.redirect("/cart/viewCart")
      }).catch(err => {

      });
   }).catch(err => {
      console.log(err);
   })
}


export const loadCart = (request, response, next) => {
   let userId = request.session.user.id;
   Cart.getCartItem(userId)
      .then(result => {
         return response.status(200).json(result);
      })
      .catch(err => console.log(err));
}
