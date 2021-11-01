export default class SocketService {
    // 单例模式
    static instance = null
    static get Instance () {
      if (!this.instance) {
        this.instance = new SocketService()
      }
      return this.instance
    }

    // 实例属性  和服务器连接的socket对象
    ws = null

    // 存储回调函数
    callBackMapping = {}

    // 用于重发 和 断线重连 机制
    connected = false
    sendRetryCount = 0
    ConnectRetryCount =0

    // 初始化websocket连接
    connect () {
      if (!window.WebSocket) {
        return console.log('Browser can not support Websocket')
      }
      this.ws = new WebSocket('ws://localhost:9998')

      // 监听连接成功
      this.ws.onopen = () => {
        console.log('WebSocket connected')
        this.connected = true
        this.ConnectRetryCount = 0
      }
      // 1.服务器连接不成功 2.服务器关闭了连接
      this.ws.onclose = e => {
        console.log('connectc failed')
        this.connected = false
        this.ConnectRetryCount++
        setTimeout(() => {
          this.connect()
        }, 500 * this.ConnectRetryCount)
      }
      // 监听接收消息
      this.ws.onmessage = msg => {
        console.log('message received:')
        // 注意msg的格式，该data表示请求的具体内容，是默认的请求格式字段
        console.log(typeof (msg.data), msg.data)

        const recvData = JSON.parse(msg.data) // 取出服务端传递的数据
        const socketType = recvData.socketType // 取出业务类型,要根据业务类型, 得到回调函数
        // 先判断有没有回调函数
        if (this.callBackMapping[socketType]) {
          const action = recvData.action
          if (action === 'getData') {
            const realData = recvData.data // 该data代表具体的图表的数据，是自定义的字段（可以取别的名字）
            this.callBackMapping[socketType].call(this, JSON.parse(realData))
          } else if (action === 'fullScreen') {
            this.callBackMapping[socketType].call(this, recvData)
          } else if (action === 'themeChange') {

          }
        }
      }
    }

    // 注册回调函数
    registerCallBack (socketType, callBack) {
      this.callBackMapping[socketType] = callBack
    }

    unRegisterCallBack (socketType) {
      this.callBackMapping[socketType] = null
    }

    send (data) {
      if (this.connected) {
        this.sendRetryCount = 0
        this.ws.send(JSON.stringify(data))
      } else {
        this.snedRetryCount++
        setTimeout(() => {
          this.send(data)
        }, 500 * this.sendRetryCount)
      }
    }
}
