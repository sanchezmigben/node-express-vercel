const serviceModel = require("../models/service.model")
//const configParams = require("../config.json")


exports.findAll = async function(req,res){   
    await serviceModel.findAll(function(err,services){
        if(err){
            //res.send(err)
            //throw new AppError(err.msg, 404)
            res.status(500).json(err)
        }else{            
            res.status(200).json(services)
        }   
    })
}