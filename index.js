// Import packages
const Service = require("./models/service")
const express = require("express");
const home = require("./routes/home");
const config = require("./config.json")
const api_key_atlas = config.api_atlas_key
const connectionStringURLAtlasAPI = config.connectionStringURLAtlasAPI
const DBConnectionType = config.DBConnectionType

const mongoose = require("./utils/mongodb.config")
const axios = require('axios'); //ATLAS API REST

//console.log(config)
//console.log(config.api_atlas_data)

// Middlewares
const app = express();
app.use(express.json());


app.get("/",(req,res)=>{
    console.log("Ruta raiz")
    res.send("Tipo de Conexión con BBDD: " + DBConnectionType)
})

// Routes
app.use("/home", home);


/******/
app.get('/services2', async (req, res) => {
    /*const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }*/
    const services = await Service.find({})
    res.json(services);
})

app.get('/services', (req, res) => {

  /*const { category } = req.query;

  var data;
  if (category) { 
      data = JSON.stringify({
          "collection": "products",
          "database": "farmStand",
          "dataSource": "Cluster0",
          "filter":{
              "category":category
          }
      });
  } else {
      data = JSON.stringify(config.api_atlas_data);
  }*/

  //console.log(config.api_atlas_data)
  //data = JSON.stringify(config.api_atlas_data);
  data = JSON.stringify({
          /*"collection": config.api_atlas_collection,
          "database": config.api_atlas_database,
          "dataSource": config.api_atlas_dataSource*/
          "collection": "services",
          "database": "buildingsDB",
          "dataSource": "Cluster0",
          /*"projection":{
            "_id":1
          }*/

  });
  console.log(data)

  var config = {
      method: 'post',
      url: connectionStringURLAtlasAPI + '/action/find',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': api_key_atlas
      },
      data : data
  };

  
  axios(config)
  .then(function (response) {
      const services = response.data;
            
      res.json(services);
      /*if (category) {           
          res.render('products/index', { products, category })
      } else {            
          res.render('products/index', { products, category: 'All' })
      }*/
  })
  .catch(function (error) {
      console.log(error);
  });
  
})
/******/


// connection
const port = process.env.PORT || config.api_port;
app.listen(port, () => {
  console.log(`Listening to port ${port}`)
  //Después de levantar el servidor, conectar con la BD Mongo
  mongoose.establishConexion()    
});
