const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF)
redisClient.on('error',err=>{
    console.log(err)
})

function set(key,val) {
    if(typeof val ==='object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key, val,redis.print)

}

function get(key){
    const promise = new Promise((resolve,reject)=> {
        redisClient.get(key,(err,val) => {
            if(err) {
                reject(err)
                return 
            }
            // resolve(val)
            if(val == null){
                resolve(null)
                return
            }
            try{   //兼容json转换的格式
                resolve(
                    JSON.parse(val)
                )
            } catch(ex) {
                resolve(val)
            }

        })
    })
    return promise
}
module.exports = {
    set,
    get
}