const jwt = require('jsonwebtoken');

const verificaToken = (req,res,next)=>{
    //console.log(req.body);
    console.log(req.headers.authorization);
    const token = req.body.token || req.query.token ||
                    req.headers.authorization;
    if(!token){
        console.log(token);
        return res.status(403)
        .send("No se pudo autenticar su sesion usuario");
    }
    try {
        const decode = jwt.verify(token,'xKWhaU7DgR');
        req.user = decode;
    } catch (error) {
        console.log(error);
        return res.status(401).send("Autenticacion no valida");
    }
    return next();
};
module.exports = verificaToken;