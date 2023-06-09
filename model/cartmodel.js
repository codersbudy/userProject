
import pool from "../db/dbconfig.js";
export default class Cart{
    constructor(id,userId,productId){
         this.id=id;
         this.userId=userId;
         this.productId=productId;
    }

    ProductExist(){
        return new Promise((resolve,reject)=>{
            console.log("sdfghj");
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql ="select*from cart  where userId=? and productId = ?";
                    con.query(sql,[this.userId,this.productId],(err,result)=>{
                       err?reject(err):resolve(result);
                       con.release();
                    })

                }else{
                    reject(err);
                }
            })
        })
    }
    LikeExist(){
        return new Promise((resolve,reject)=>{
            console.log("sdfghj");
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql ="select*from heart  where userId=? and productId = ?";
                    con.query(sql,[this.userId,this.productId],(err,result)=>{
                       err?reject(err):resolve(result);
                       con.release();
                    })

                }else{
                    reject(err);
                }
            })
        })
    }
    static findOne(userId){
      return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
              if(!err){
                  let sql="select*from cart where userId=?";
                  con.query(sql,[userId],(err,result)=>{
                      err?reject(err):resolve(result);
                      con.release();
                  })

              }else{
                  reject(err);
              }
          })
      })
  }
  static deleteCart(id){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
                let sql="delete from cart where id=?";
                con.query(sql,[id],(err,result)=>{
                    err?reject(err):resolve(result);
                con.release();
                })

            }else{
                reject(err);
            }
        })
    })
}

static clearCart(userId){
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,con)=>{
      if(!err){
        let sql = "delete from cart where  userId=?";
        con.query(sql,[userId],(err,result)=>{
          err ? reject(err) : resolve(result);
          con.release();
        })
      }
      else
       reject(err);
    })
  });
}


   

    save(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql="insert into cart(userId,productId)values(?,?)";
                    con.query(sql,[this.userId,this.productId],(err,result)=>{
                       err?reject(err):resolve(result);
                       con.release();
                    })

                }else{
                    reject(err);
                }
            })
        })
    }
    saveLike(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql="insert into heart(userId,productId)values(?,?)";
                    con.query(sql,[this.userId,this.productId],(err,result)=>{
                       err?reject(err):resolve(result);
                       con.release();
                    })

                }else{
                    reject(err);
                }
            })
        })
    }
   
     static viewCart(userId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                  let sql=" select*,product.id,product.price,product.title,product.discountPercentage,product.brand,product.thumbnail from product inner join cart on product.id =cart.productId where cart.userId = ?";
                  con.query(sql,[userId],(err,result)=>{
                   err?reject(err):resolve(result);
                   con.release();
                  })
                }else{
                    reject(err);
                }
            })
        })
    }
    static like(userId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                  let sql=" select*,product.id,product.price,product.title,product.discountPercentage,product.brand,product.thumbnail from product inner join heart on product.id =heart.productId where heart.userId = ?";
                  con.query(sql,[userId],(err,result)=>{
                   err?reject(err):resolve(result);
                   con.release();
                  })
                }else{
                    reject(err);
                }
            })
        })
    }
    static getCartItem(userId){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
              let sql = "select product.id,product.title,product.price,product.discountPercentage,product.stock,product.brand,product.thumbnail from product inner join cart on product.id = cart.productId where cart.userId = ?";
              con.query(sql,[userId],(err,result)=>{
                con.release();
                err ? reject(err) : resolve(result);
              })
            }
            else
             reject(err);
          })       
        })
      }
}