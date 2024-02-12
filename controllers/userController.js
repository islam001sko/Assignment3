const User = require("../models/userModel.js");
const Weather = require("../models/weatherModel.js");
const bcrypt = require('bcryptjs');

const getAllUser = async (req, res, next) => {
    let users
    try {
        users = await User.find()
    } catch (err) {
        console.log(err)
    }
    if (!users) {
        return res.status(404).json({ message: "no users found" })
    }
    return res.status(200).json({ users })
}

const signup = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    } catch (err) {
        return console.log(err)
    }
    if (existingUser) {
        return res.status(400).json({ message: "user already exists" })
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await user.save();
        req.session.user = user;
        req.session.save(err => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session error, please try again." });
            }
            res.render('/weather', {user: req.session.user});
        });
    } catch (err) {
        return console.log(err)
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            alert("User with this email is not found");
        }
        
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            alert("Incorrect Password. Try again");
        }

        req.session.user = { id: existingUser._id, admin: existingUser.admin, username: existingUser.username };

        req.session.save(err => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session error, please try again." });
            }
            return res.redirect(existingUser.admin ? '/admin' : '/weather');
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Login error, please try again." });
    }
}


const getHistory = async (req, res, next) => {
    const userId = req.session.user.id;
    try {
        const user = await User.findById(userId).populate('history');
        if (!user) {
            return res.status(404).json({ message: "history not found" });
        }
        res.render('history', { user: user, history: user.history });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching user history" });
    }
};


const getSignUp = async (req, res, next) => {
    res.render('signup');
}

const getLogin = async (req, res, next) => {
    res.render('login');
}

module.exports = {
    getAllUser,
    getSignUp,
    getLogin,
    signup,
    login,
    getHistory,
};