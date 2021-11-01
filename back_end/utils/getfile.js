const fs = require('fs')
module.exports.getfile = (fp)=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(fp, 'utf-8', (error, data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        })
    })
}