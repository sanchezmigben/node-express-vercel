
module.exports = requireLogin

function requireLogin(req,res,next){
    if(req.session && req.session.userLogued){
        next()
    }else{
        res.status(401).json({msg:"No estás autorizado", code:401})
    }
}



