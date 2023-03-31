import pool from "../db/dbconfig.js";
export default class Like{
    constructor(id,userId,productId){
         this.id=id;
         this.userId=userId;
         this.productId=productId;
    }

static findOne(userId){
    
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
                let sql="select*from heart where userId=?";
                console.log(sql)
                con.query(sql,[userId],(err,result)=>{
                    console.log(result)
                    err?reject(err):resolve(result);
                    con.release();
                })

            }else{
                reject(err);
            }
        })
    })
}

static deleteLike(id){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
                let sql="delete from heart where id=?";
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
}