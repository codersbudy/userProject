import pool from "../db/dbconfig.js";
export default class user {
    constructor(id, email, username, password, contact) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.contact = contact;
    }
    save() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "insert into user(email,username,password,contact)values(?,?,?,?)";
                    con.query(sql, [this.email, this.username, this.password, this.contact], (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                } else {
                    reject(err);
                }
            })
        })
    }

     signin(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                   let sql ="select*from user where email=? and password=?";
                   con.query(sql,[this.email,this.password],(err,result)=>{
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