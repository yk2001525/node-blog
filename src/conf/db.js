const env = process.env.NODE_ENV //环境参数

let REDIS_CONF
//配置
// let MYSQL_CONF
let MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: '12345678',
    port: '3306',
    database: 'myblog'
}
//redis
REDIS_CONF = {
    port:6379,
    host:'127.0.0.1'
}
// if(env === 'dev'){
//     MYSQL_CONF = {
//         host: '127.0.0.1',
//         user: 'root',
//         password: '12345678',
//         port: '3306',
//         database: 'myblog'
//     }
// }
// if(env === 'production'){
//     MYSQL_CONF = {
//         host: '127.0.0.1',
//         user: 'root',
//         password: '12345678',
//         port: '3306',
//         database: 'myblog'
//     }
// }
module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}