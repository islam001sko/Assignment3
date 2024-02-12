const express = require('express');
const { getAllUser, login, signup,getSignUp,getLogin,getHistory, getArchiveHistory} = require('../controllers/userController.js');

const router = express.Router()
router.get("/getAllUser", getAllUser )
router.get('/', getSignUp);
router.get('/login', getLogin);
router.get('/history',getHistory);
router.get('/archive', getArchiveHistory);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
