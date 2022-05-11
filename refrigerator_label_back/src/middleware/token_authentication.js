require('dotenv').config();
const jwt = require('jsonwebtoken');

const token_authentication = (req, res, next) => {
    let token = req.headers.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if(err) {
                return  res.status(402).json({ message: 'Failed to authenticate token.' });
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        return res.status(403).json({ message: 'No token provided.' });
    }
}

module.exports = token_authentication;