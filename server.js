if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}


//IMPORTS
const express = require("express");
const sequelize = require("./config/connection");
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const session = require("express-session");
const multer = require('multer');

// const methodOverride = require('method-override')
// const passport = require("passport");


//DECLARATIONS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage})

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: true,
  saveUninitialized: false
};


//STATIC FILES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public/',express.static('public'));
app.set('view engine', "ejs")
app.use(session(sess));
// app.use(methodOverride('_method'))


app.get('/upload', (req, res) => {
  res.render('upload');
});
app.post('/upload', upload.single('image'), (req, res) => {
  res.send('Image uploaded');
});


//GET CONTROLLERS
app.use(require('./controllers'));


//SYNC & FORCE DROP TABLE ON CREATION
sequelize.sync({
  force: false
})
.then(() => {
  app.listen(port, () => {
    console.log("Listening on http://localhost:" + port);
  });
});