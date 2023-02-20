const mongoose = require('mongoose');
const configParams = require("../config.json")
const axios = require('axios'); //ATLAS API REST

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['wall', 'plumber', 'carpenter']
    }
})

const Service = mongoose.model('Service', serviceSchema);

//Funciones
//------------------------------------------
//OBTENER TODOS LOS SERVICIOS (GET)
Service.findAll = async function(result){

    /*console.log(configParams.api_atlas_data)
    console.log(configParams.connectionStringURLAtlasAPI)
    console.log(configParams.api_atlas_key)*/


    data = JSON.stringify(         
        configParams.api_atlas_data
    );        
  
    var config = {
        method: 'post',
        url: configParams.connectionStringURLAtlasAPI + '/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': configParams.api_atlas_key
        },
        data : data
    };  
    
    axios(config)
    .then(function (response) {
        const services = response.data;              
        //res.status(200).json(services);        
        result(null, services)
    })
    .catch(function (error) {
        //res.status(500).json({"err":error})
        result(error, null)
    });
}

module.exports = Service;