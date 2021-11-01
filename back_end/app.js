// 1.创建 koa对象


const koa = require('koa')
const app = new koa()
// 2.编写响应函数 （中间件）

const responseDuration = require('./midware/response_duration')
const responseHeader = require('./midware/response_header')
const responseData = require('./midware/response_data')

app.use(responseDuration)
app.use(responseHeader)
app.use(responseData)


// 绑定端口号 3333
app.listen(3333)

const wss = require('./service/web_socket_service')
// 当某一个客户端连接成功之后，开始对message事件进行监听

wss.listen()
