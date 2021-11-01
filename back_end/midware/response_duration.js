module.exports = async (ctx,next)=>{
    const satrt = Date.now()
    await next()
    const end = Date.now()
    const duration = end - satrt
    ctx.set('X-response-time',duration + 'ms')
}
