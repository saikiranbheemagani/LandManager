const jwt = require('jsonwebtoken');
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const User = require('../models/UserModel');

module.exports = (acceptedRoles) => {
    return async (req, res, next) => {
        const accessToken = req.cookies.accessToken;
        // console.log(accessToken)
        try {
            const decoded = jwt.verify(accessToken, JWT_AUTH_TOKEN);

            // console.log(decoded.role)
            if(decoded.role ==="CSM"){
                
                const user = await User.findOne({ phoneno: decoded.phoneno });
                
                if (!user) {
                    return res.status(403).send({ success: false, msg: 'User not found' });
                }
                
                req.user = user;
                // console.log(req.user)
    
                // Check if the user's role is included in the acceptedRoles array
                if (acceptedRoles.includes(user.role)) {
                    next(); // User has the required role
                } else {
                    return res.status(403).send({ success: false, msg: 'Access Denied! Insufficient privileges.' });
                }
            }else{
                const user = await User.findOne({ email: decoded.email });
    
                if (!user) {
                    return res.status(403).send({ success: false, msg: 'User not found' });
                }
    
                req.user = user;
    
                // Check if the user's role is included in the acceptedRoles array
                if (acceptedRoles.includes(user.role)) {
                    next(); // User has the required role
                } else {
                    return res.status(403).send({ success: false, msg: 'Access Denied! Insufficient privileges.' });
                }

            }
        } catch (err) {
            console.error('Error during authentication:', err);

            if (err.name === 'TokenExpiredError') {
                return res.status(401).send({ success: false, msg: 'Access token expired' });
            } else {
                return res.status(403).send({ success: false, msg: 'User not authenticated' });
            }
        }
    };
};
