const jwt = require("jsonwebtoken");


function verifyToken  (req, res, next) {
    if(!req.headers['authorization'])
        return next(res.status(401).json({Error: 'Unauthorized, access token is missing or invalid'}))
    
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        jwt.verify(token, process.env.TOKEN_PASSWORD, (err, payload) => {
            if (err) {
                return next(res.status(404).json({error: 'Not Found'}))
            }
            req.payload = payload
            next()
        })
}

module.exports = verifyToken;