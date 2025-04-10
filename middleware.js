import jwt from 'jsonwebtoken';

import User from './models/User.js';

export const Aunthenticated = async (req, res, next)=> {
    
    let token = await req.cookies.token;
   
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401)
            throw new Error('Not Authenticated')
        }

    } else {
        throw new Error('Not Authenticated')
    }

}

