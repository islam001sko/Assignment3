const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/userRoute.js');
const weatherRouter = require('./routes/weatherRoute.js');
const adminRouter = require('./routes/adminRoute.js');
const logoutRoute = require("./routes/logoutRoute.js")
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'f7zNqEMNrtwFH',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: !true, maxAge: 24 * 60 * 60 * 1000 } 
}));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/views'));

app.use('/admin', adminRouter);
app.use('/', logoutRoute);
app.use("/", userRouter);
app.use("/weather", weatherRouter);
app.use(flash());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
app.use((req, res, next) => {
  if (req.session.user) {
      res.locals.user = req.session.user;
  }
  next();
});


mongoose.connect(process.env.dbURL).then(async () => {
  app.listen(3000, () => {
    console.log("Connected to database and listening on port 3000");
  });
}).catch((err) => console.error('Error connecting to database:', err));


