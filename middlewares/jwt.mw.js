
module.exports = requireLogin


function extractToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    } else if (req.session && req.session.token){
        return req.session.token
    }
    return null;
  }

function requireLogin(req,res,next){
    const token = extractToken(req)

    console.log("User Logued Session: " + req.session.userLogued)

    if((req.session && req.session.userLogued) || token){
        next()
    }else{
        res.status(401).json({msg:"No estás autorizado", code:401})
    }
}



