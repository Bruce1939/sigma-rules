const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../keys');

const signUpController = async (req,res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) return res.json({ error: 'invalid credentials' });
        const userExists = await User.findOne({ email });
        if (userExists) return res.json({ error: 'user already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        const userToReturn = user._id;
        return res.json({ user: userToReturn });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}

const logInController = async (req,res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.json({ error: 'invalid credentials' });
        const user = await User.findOne({ email });
        if (!user) return res.json({ error: 'user doesn\'t exists' });
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.json({ error: 'invalid credentials' });
        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
        const userToReturn = user._id;
        return res.json({ token, user: userToReturn });
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}

const getCurrentUserController = async (req,res) => {
    try {
        if (!req.user) return res.json({ user: null });
        return res.json(req.user);
    } catch (error) {
        console.log(error);
        return res.json({ internalError: error });
    }
}

module.exports = { 
    signUpController, 
    logInController,
    getCurrentUserController
}