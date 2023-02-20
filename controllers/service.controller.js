const serviceModel = require("../models/service.model")
//const configParams = require("../config.json")

function wrapAsync(fn) {
    return function (req, res, next) {
        //console.log("entra en wrapAsync " + e);
        fn(req, res, next).catch(e => {
            //console.log("wrapAsync " + e)
            logger.error.error("wrapAsync " + e)
            next(e)            
        })
    }
}

exports.findAll = wrapAsync(async function(req,res,next){   
    await serviceModel.findAll(function(err,services){
        if(err){
            //res.send(err)
            throw new AppError(err.msg, 404) //NOT FOUND
            //res.status(500).json(err)
        }else{            
            res.status(200).json(services)
        }   
    })
})

exports.create = wrapAsync(async function(req,res,next){
    const { name, price, category } = req.body
    const newService = new serviceModel(req.body);
    await serviceModel.create(newService, function(err,serviceCreated){
        if(err){            
            throw new AppError(err.msg, 500) //ERROR
            //res.status(500).json(err)
        }else{            
            res.status(200).json(serviceCreated)
        }   
    })
})

