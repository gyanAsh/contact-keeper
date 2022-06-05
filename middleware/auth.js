const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) => {
    // Token should be present in the header
    // while accessing private data.
    const token = req.header('x-auth-token');
    //Check is token exists
    if (!token) {
        return res.status(401).json({ msg: "Token not found, autherization denied" });
    }

    try {
        const jwtSecret = config.jwtSecret;
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({msg:"Invalid Token"});
    }
    
}
