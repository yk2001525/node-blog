const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

//创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()

//统一执行sql的函数
function exec(sql) {
    const promise = new Promise((resolve,reject) => {
        con.query(sql, (err, result) => {
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
    // console.log('连接成功')
    return promise
}

module.exports = {
    exec      //返回exec执行函数
}