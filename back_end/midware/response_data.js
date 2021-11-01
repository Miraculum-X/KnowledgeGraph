const path = require('path')
const fileUtil = require('../utils/getfile')
module.exports = async (ctx,next)=>{
    const url = ctx.request.url
    let filepath = '../data' + url +'.json'
    filepath = path.join(__dirname, filepath)
   try {
    const res = await fileUtil.getfile(filepath)
    ctx.response.body = res
   } catch (error) {
       const errorMsg = {
           message:"file not found",
           status:"404"
       }
       ctx.response.body = JSON.stringify(errorMsg)
   }
    
    await next()


}