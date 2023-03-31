import pool from "../db/dbconfig.js";
export default class Review{
    constructor(id,text,productId,orderId){
          this.id=id;
          this.text=text;
         
          this.productId=productId;
          this.orderId=orderId;
    }

   static SaveReview(text,productId,orderId,userId){
      return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
              let sql ="insert into review(text,productId,orderId,userId)values(?,?,?,?)";
              con.query(sql,[text,productId,orderId,userId],(err,result)=>{
                con.release();
                err?reject(err):resolve(result);
              });
            }else{
                reject(err);
            }
        })
      })
   }


static getReview(productId){
  return new Promise((resolve,reject)=>{
    pool.getConnection((err,con)=>{
        if(!err){
          let sql ="select * from user inner join review on review.userId=user.id where productId=?";
          con.query(sql,[productId],(err,result)=>{
            con.release();
            err?reject(err):resolve(result);
          });
        }else{
            reject(err);
        }
    })
  })
}
}