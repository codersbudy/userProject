import mysql from "mysql2";
export default mysql.createPool({
    host: "localhost",
    user: "root",
    password: "9098995453",
    database: "shoesmall",
    connectionLimit: 10
});