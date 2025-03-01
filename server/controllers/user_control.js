const User = require("../models/user_model.js");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const token = require("../models/token.js");

const JWT_SECRET = "mizan";
// 1 2 3 4  5 6 

const signup = async (req, res) => {
    const { name, username, password } = req.body;
    console.log(name, username, password)
    try {
        const salt = await bcrypt.genSalt();
        const HashPassword = await bcrypt.hash(password, salt)
        console.log(HashPassword);
        const newUser = new User({ name, username, HashPassword });
        console.log(newUser);
        await newUser.save();
        res.status(200).json({ msg: "User created successfully...!" });
        // console.log(res.status(200).json({ msg: "User created successfully!" }))
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
       // console.log(username, password);
        const user = await User.findOne({ username: username });
       // console.log(user);
        if (!user) {
            return res.status(400).json({ msg: "Username doesn't match...!" });
        }
        let match = await bcrypt.compare(password, user.HashPassword);
    //    console.log(match + "hhhh");
if (match) {
    const accessToken = jwt.sign(user.toJSON(), JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(user.toJSON(), JWT_SECRET, { expiresIn: '15m' });
    //console.log(accessToken, refreshToken);
    const newToken = new token({ Token: refreshToken }); // Change 'token' to 'Token'
    await newToken.save();

    return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });
} else {
    return res.status(400).json({ msg: "Password doesn't match...!" });
}

    } catch (error) {
        console.error("Error in login API: ", error);
        return res.status(500).json({ msg: "Error in login API...!" });
    }
}



module.exports = { signup, Login };