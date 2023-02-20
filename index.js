// Import packages
//require('dotenv').config();
const Service = require("./models/service.model")
const express = require("express");
const home = require("./routes/home");
const serviceRoutes = require("./routes/service.routes")
const config = require("./config.json")
const mongoose = require("./utils/mongodb.config")
const axios = require('axios'); //ATLAS API REST
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require("cors")
const logger = require("./utils/logger")
const requireLogin = require("./middlewares/jwt.mw")

/* Parámetros iniciales */
const api_key_atlas = config.api_atlas_key
const connectionStringURLAtlasAPI = config.connectionStringURLAtlasAPI
const DBConnectionType = config.DBConnectionType
const api_atlas_data = config.api_atlas_data
/********************************/

const userBBDD = "admin"
const pwdBBDD = "admin"

//console.log(config)
//console.log(config.api_atlas_data)

// Middlewares
const app = express();


//-- CORS ----------------
const whitelist = ['https://frontend-node-express.vercel.app']
const corsOptions = {
  origin: (origin, callback) => {
    console.log("Origin: " + origin + " Existe: " + whitelist.indexOf(origin))
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  credentials:true
}

app.use(cors(corsOptions))


//---------------------------------------------------------------
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure:true,
    sameSite: 'none',
    maxAge: 60 * 60 * 24 * 1000,
    domain: 'node-express-vercel-rho.vercel.app', //PARA QUE LA SESSION FUNCIONE CORRECTAMENTE CON COOKIES
  },
}))
app.set("trust proxy", true); //PARA QUE LA SESSION FUNCIONE CORRECTAMENTE CON COOKIES

app.use(express.json());


//------------ Middlwares propios
/*function requireLogin(req,res,next){
  if(req.session && req.session.userLogued){
    next()
  }else{
    res.status(401).json({msg:"No estás autorizado", code:401})
  }
}*/

//----------------------------------------
app.get("/",(req,res)=>{
    console.log("Ruta raiz")
    res.send("Tipo de Conexión con BBDD: " + DBConnectionType)
})

// Routes
app.use("/home", home);
app.use("/api/v1/services", serviceRoutes)


/******/
app.post("/services",requireLogin, async(req,res)=>{
  const { name, price, category } = req.body

  /*if(req.session && req.session.count){
    req.session.count += 1
  }else{
      req.session.count = 1
  }


  res.status(200).json({ name: name, price: price, category: category, msg: "Creado!" + name + " - Session Count: " + req.session.count})*/

  const newService = new Service(req.body);
    
  var data = JSON.stringify({
      "collection": "services",
      "database": "buildingsDB",
      "dataSource": "Cluster0",
      "document": newService
  });

  /*var dataAux = api_atlas_data
  dataAux.document = newService
  data = JSON.stringify(dataAux)*/

  var config = {
      method: 'post',
      url: connectionStringURLAtlasAPI + '/action/insertOne',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': api_key_atlas
      },
      data : data
  };

  //console.log(data);

  axios(config)
  .then(function (response) {
      const insertedId = response.data.insertedId;
      //console.log(response.data);
      //console.log(insertedId);
      //res.redirect(`/products_api/${insertedId}`)
      res.status(200).json(insertedId);
      
  })
  .catch(function (error) {
      console.log(error);
      res.status(404).json(error);
  });

})

app.post("/login", async(req,res)=>{
  const { user, pwd } = req.body
  console.log("name: " + user)
  console.log("pwd: " + pwd)
  if(user == userBBDD && pwd == pwdBBDD){
    const userLogued = {
      username:user,
      password:pwd,
      profile:"A"
    }
    req.session.userLogued = userLogued
    res.status(200).json({msg:"Autorizado", code:200})
  } else {
    res.status(401).json({msg:"No estás autorizado", code:401})
  }

})

app.get('/servicesOLD',requireLogin, (req, res) => {
    /*const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }*/

    //const services = await Service.find({})

    res.cookie('color', 'blue', { sameSite: 'none', secure: true, domain: "node-express-vercel-rho.vercel.app" })

    let num_ses = 0
    if(req.session && req.session.count){
      num_ses = req.session.count
    }

    const services = {
      name: "Session",
      price: num_ses,
      category: "wall"
    }
    res.json(services);
})

app.get('/services',requireLogin, (req, res) => {

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
  
  /*data = JSON.stringify({          
          "collection": "services",
          "database": "buildingsDB",
          "dataSource": "Cluster0",
  });*/
  
  /*var dataAux = api_atlas_data
  const newService = { "name" : "prueba "}
  dataAux.document = newService
  data2 = JSON.stringify(dataAux)
  console.log(data2)*/


  data = JSON.stringify(         
      api_atlas_data
  );


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
  //logger.access.info(`Escuchando en puerto ${port}`)
  console.log(`Listening to port ${port}`)
    //Después de levantar el servidor, conectar con la BD Mongo
  mongoose.establishConexion()    
});
