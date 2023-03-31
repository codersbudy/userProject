import like from '../model/like.model.js';


export const removeLike = (request, response, next) => {
    let produtIndex = request.params.id;
    let userId = request.session.user.id;
    console.log(userId);
    console.log(produtIndex);
    like.findOne(userId).then(result => {
        console.log(result);
       let cartItem = result;
       let id = (cartItem[produtIndex].id);
       like.deleteLike(id).then(result => {
          return response.redirect("/cart/like")
       }).catch(err => {
 
       });
    }).catch(err => {
       console.log(err);
    })
 }