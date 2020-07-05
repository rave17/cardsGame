require('dotenv').config()
const app = require('./app')
const connDB = require('./db/connectiondb')
const { appConfig, dbConfig } = require('./config')


function initApp(appConfig, dbConfig){
    try{connDB(dbConfig)
    app.listen(appConfig.port, ()=> console.log(`listen on ${appConfig.port}`))
    }catch(e){
        console.log(err)
        process.exit(0) 
        }
    }

initApp(appConfig, dbConfig)