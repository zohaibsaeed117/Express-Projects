const User = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const login = async (req, res) => {
    const { username, password } = req.body;

    const id = new Date().getTime();

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" })
    console.log(token);

    try {
        const user = await User.findOne({ username: username, password: password });
        if (user) {
            return res.status(200).json({ msg: "User Created", token });
        }
        res.status(404).json({ msg: "User not Found" });
    }
    catch {
        res.status(500).json({ msg: "Invalid username or password" })
    }
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello ${req.user.username}`, secret: `Here is your authorized data,your lucky number is ${luckyNumber}` })
}

const signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password })
        res.status(200).json({ msg: "Added data successfully" })
    }
    catch (err) {
        res.status(500).json({ msg: "Username already exists" })
    }
}
module.exports = {
    login,
    signup,
    dashboard,
}