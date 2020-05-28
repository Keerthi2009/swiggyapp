const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const handlebars = require("handlebars");

const app = express();

const auth = require("./Routes/auth");
const swiggy = require("./Routes/swiggy");


mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,

    },
    (err)=>{
        if(err) throw err;
        console.log("database is connected");
    }
    );

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }));

require("./config/passport")(passport);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//gloable variables
app.use(function(req,res,next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('errors_msg');
    res.locals.error = req.flash("error");
    next();
  });

app.get('/',(req,res)=> {
    res.render("home.handlebars");
});

app.use('/auth',auth);

app.use("/swiggy",swiggy);

app.get("**", (req,res) => {
    res.render("pagenotfound.handlebars");
});


let port = process.env.PORT || 5555;

app.listen(port, (err) => {
    if(err) throw err;
    console.log("The server is running in port "+port);
});