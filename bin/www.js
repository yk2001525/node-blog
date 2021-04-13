const http = require('http')

const PORT = 3000
const serverHandle = require('../app')

const server = http.createServer(serverHandle)

console.log('启动成功......')
server.listen(PORT)