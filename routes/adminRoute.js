const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');
const { addUser,deleteUser,editUser,updateUser} = require('../controllers/adminController.js');
const router = express.Router();

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.admin) {
        next();
    } 
}

router.get('/', async (req, res) => {
    const users = await User.find(); 
    res.render('admin', { users });
});

router.get('/edit-user/:userId', isAdmin,editUser);

router.post('/update-user/:userId', isAdmin,updateUser);

router.post('/add-user', isAdmin, addUser);

router.post('/delete-user/:userId', isAdmin, deleteUser);


module.exports = router;
