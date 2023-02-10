//winston (otra librería para logs de express)
/*const log4js = require("log4js") //npm i log4js
const ruta = "./tmp/"

log4js.configure({
    appenders: {
        access: {
            type:"dateFile",
            filename: ruta + "access.log",
            pattern:"-yyyy-MM-dd"
        },
        error: {
            type:"dateFile",
            filename: ruta + "error.log",
            pattern:"-yyyy-MM-dd"
        }
    },
    categories:{
        default: { appenders: ["access"], level: "ALL"},
        access: { appenders: ["access"], level:"ALL"},
        error: { appenders: ["error"], level:"ALL"}
    }
})

const acceso = log4js.getLogger("access")
const err = log4js.getLogger("error")

module.exports = {
    access: acceso,
    error: err,
    express: log4js.connectLogger(acceso)
}*/