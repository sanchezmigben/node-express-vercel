const mongoose = require("mongoose")
const config = require("../config.json");
const logger = require("./logger");
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }

//const dbConnMongoDB = ""
mongoose.set("strictQuery", true)

mongoose.establishConexion = function(){
    let connectionString = null
    let msg = ""
    switch(config.DBConnectionType){
        case "Atlas":
            connectionString = config.connectionStringAtlas
            msg = "MONGO CONNECTION OPEN WITH ATLAS!!!"
            break;
        case "Local":
            connectionString = config.connectionStringLocal
            msg = "MONGO CONNECTION OPEN WITH LOCALHOST!!!"
            break;
        default:
            connectionString = null
    }
    if(connectionString == null){
        console.log("USING MONGO DB ATLAS API CONNECTION!!!")
    } else {
        mongoose.connect(connectionString, connectionOptions)
            .then(() => {
                console.log(msg)
                logger.access.info(msg)
            })
            .catch(err => {
                console.log("OH NO MONGO CONNECTION ERROR!!!! Desc: " + err)
                logger.error.fatal("OH NO MONGO CONNECTION ERROR!!!! Desc: " + err)
                //console.log(err)
            })
    }
}

module.exports = mongoose