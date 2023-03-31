import { request, response } from "express";
import Review from "../model/review.model.js";
export const GetDataReview=(request,response,next)=>{
    let orderId =request.body.orderId;
    let productId=request.body.productId;
    let text=request.body.comment;
    let userId=request.session.user.id;

   
    console.log(request.body);
    
    Review.SaveReview(text,productId,orderId,userId)
    .then(result=>{
        return response.redirect("/order/history")
    })
        .catch(err=>{
       console.log(err);
})
}

export const viewReview=(request,response,nexr)=>{
    let productId=request.params.productId;
    Review.getReview(productId).then(result=>{console.log(result)}).catch(err=>{console.log(err)});
}