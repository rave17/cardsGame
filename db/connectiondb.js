const mongoose = require('mongoose')

mongoose.connection.on('open', ()=> console.log('DB is connected'))

async function connDB({ host, port, dbName }){
    const uri = `mongodb://${host}:${port}/${dbName}`
    await mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true })
}
module.exports = connDB