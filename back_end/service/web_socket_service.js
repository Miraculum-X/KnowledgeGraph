const WebSocket = require('ws')
const path = require('path')
const fileUtils = require('../utils/getfile')

// 创建websocket服务端的对象 绑定端口号
const wss = new WebSocket.Server({
    port:9998
})

// 服务端开启了监听
module.exports.listen = () =>{
   // 对客户端连接事件进行监听
// client代表客户端的socket对象
wss.on('connection', client => {
    console.log('client connected successfully...')
    //对客户端socket对象进行message事件监听
    //msg代表客户端发送给服务器的数据
    client.on('message', async msg => {
        // console.log(msg)
        // console.log(Buffer.isBuffer(msg))
        let payload = JSON.parse(msg)
        
        const action = payload.action
       
        if(action === 'getData'){
            let filepath = '../data/' + payload.chartName + '.json'
            filepath = path.join(__dirname, filepath)
            const res = await fileUtils.getfile(filepath)
            
            // 在服务端获取到的数据基础之上，增加一个data字段，即对应json文件的内容
            payload.data = res
            client.send(JSON.stringify(payload))
        }else{
            
            wss.clients.forEach(client => {
                // 注意！！ 需要将buffer转换为string
                client.send(msg.toString())
                
                
            })
            
        }
    })
}) 
}
