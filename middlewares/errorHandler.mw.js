/* TO DO */
module.exports = errorHandler;

function errorHandler(err, req, res, next) {    
    console.log("ErrorHandler " + err.status + " NAME: " + err.name + " ERR.MESSAGE.NAME: " + err.message.name)    
    
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err, code: 400 });
        //return res.status(400).render("error.ejs", { status: 400, message: err } )
    }

    if (err.name === 'ValidationError' || (err.message.name != 'undefined' && err.message.name === 'ValidationError')) {
        // mongoose validation error
        return res.status(400).json({ message: err.message, code: 400 });
        //return res.status(400).render("error.ejs", { status: 400, message: err.message } )
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token', code: 401 });
        //return res.status(401).render("error.ejs", { status: 401, message: 'Invalid Token' } )
    }

    /*if(err.name === 'CastError'){
        return res.status(301).json({ message: err.message })
    }*/

    if(err.status){
        return res.status(err.status).json({ message: err.message, code:err.status });
        //return res.status(err.status).render("error.ejs", { status: err.status, message: err.message } )
    }else{
        // default to 500 server error
        return res.status(500).json({ message: err.message, code:500 });
        //return res.status(500).render("error.ejs", { status: 500, message: err.message } )
    }

  
}