const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => { 

    try {

        if(!req.headers.authorization && !req.headers.startsWith('Bearer ')) return res.status(401).json({ message: 'Authorization required' });
        
        let token = req.headers.authorization.split(' ')[1];

        if(!token) return req.status(401).json({ message: 'Not authorized'});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
 
        next();

    } catch (error) {
       
        return res.status(401).json({ message: 'Invalid token' });
        
    }

}

module.exports = auth;