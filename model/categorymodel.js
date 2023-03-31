import pool from "../db/dbconfig.js";

export default class{
    constructor(id,categoryName){
        this.id=id;
        this.categoryName=categoryName;
    }

  static  getCategoryList(){
            return new Promise((resolve,reject)=>{
                pool.getConnection((err,con)=>{
                    if(!err){
                      let sql ="select*from category";
                      con.query(sql,(err,result)=>{
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