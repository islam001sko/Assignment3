const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const addUser = async (req, res) => {
    try {
        const { username,email, password, admin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
            admin: !!admin,
        });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.send('Error adding user');
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.send('Error deleting user');
    }
};
    

module.exports = {
    addUser,
    deleteUser,
};