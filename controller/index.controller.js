import Product from "../model/productmodel.js";
import category from "../model/categorymodel.js";
import User from "../model/usermodel.js";
import product from "../model/product.model.js";
import Review from "../model/review.model.js";

export const indexPage = (request, response, next) => {
    Promise.all([Product.getProductList(), category.getCategoryList()])
        .then(result => {
            response.render("index.ejs", { productList: result[0], categoryList: result[1], currentUser: request.session.user });
        }).catch((err) => {
            console.log(err);
        })
}

export const signInPage = (request, response, next) => {
    response.render("signIn.ejs", { message: "" })
}

export const signUppage = (request, response, next) => {
    response.render("signup.ejs", { message: "" });
}

export const signup = (request, response, next) => {
    let { username, email, password, contact } = request.body;
    let user = new User(null, email, username, password, contact);
    user.save()
        .then(result => {
            return response.render("signIn.ejs", { message: "" });
        }).catch(err => {
            console.log(err);
        })
}

export const signIn = (request, response, next) => {
    let user = new User();
    let { email, password } = request.body;
    user.email = email;
    user.password = password;
    user.signin()
        .then(result => {
            if (result.length) {
                request.session.user = { id: result[0].id, email: result[0].email, username: result[0].username, message: "" };
                return response.redirect("/");
            } else {
                return response.render("signup.ejs", { message: "Invalid Email or password" });
            }
        }).catch(err => {

        })
}

export const signout = (request, response, next) => {
    request.session.user = null;
    request.session.destroy()
    return response.redirect("/");
}


export const viewDescription = (request, response, next) => {
    let id = request.params.productId;
    Promise.all([product.findById(id), Review.getReview(id)])
        .then(result => {
            console.log(result);
            response.render("product-description.ejs", { product: result[0], Review: result[1], currentUser: request.session.user });
        }).catch((err) => {
            console.log(err);
        })
}