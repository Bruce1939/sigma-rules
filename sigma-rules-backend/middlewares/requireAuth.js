const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../keys');

const requiresAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) return res.json({ error: 'unauthorized' });
            const { userId } = jwt.verify(token, JWT_SECRET);
            const user = await User.findById(userId);
            const newuser = { _id: user._id, followers: user.followers, following: user.following };
            req.user = newuser;
            console.log(req.user);
            next();
        } else {
            return res.json({ error: 'unauthorized' });
        }
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
};

module.exports = requiresAuth;