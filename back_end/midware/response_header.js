module.exports =async (ctx,next)=>{
    const contentType = 'application/json; charset=utf-8'
    ctx.set('contentType', contentType)
    
    // 允许跨域请求
    ctx.set('Access-Control-Allow-Origin','*')
    ctx.set('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE')
    
    await next()

}