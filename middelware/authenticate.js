export const verify=(request,response,next)=>{
    if(request.session.user){
        next();
    }else{
        response.render("signIn.ejs",{message:""});
    }
}