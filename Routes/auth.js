const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");


const User = require("../Model/Auth");

/*---------------GET routes start----------------*/
router.get("/signup",(req,res) => {
    res.render("./auth/signup");
});

router.get("/signin", (req,res) => {
    res.render("./auth/signin");
});



/*---------------GET routes end----------------*/


/*---------------POST routes start----------------*/
router.post("/signup", (req,res) => {
    let errors = [];
    let {name,phone,email,password,password2} = req.body;

    if(password != password2){
        errors.push({text: "The password not maching"});
    } 
    if(password.lenght < 7){
      errors.push({text:"password should be minimum of 7 characters"});
    }
    if(errors.length > 0){
        res.render("./auth/signup", {
            name,
            phone,
            email, 
            password,
            password2,
        });
    } 
    else {
        User.findOne({email})
        .then((user) => {
            if(user){
                res.redirect("/auth/signup",401, {});
            }
            else{
                let newUser = new User({
                       name,
                       phone,
                       email,
                       password,
                });
                //bcrypt
               bcrypt.genSalt(12, (err,salt) => {
                   //hashing
                   bcrypt.hash(newUser.password, salt, (err,hash) => {
                       newUser.password = hash;
                          
                       //save in DB
                       newUser.save().then((user) => {
                           res.redirect("/auth/signin",201,{});
                       }
                       )
                       .catch(err => console.log(err));
                   });
               });
            }
        })
        .catch(err => console.log(err));
    }
});

//signin
router.post('/signin',(req,res,next) => {
        passport.authenticate("local",{
            successRedirect: "/swiggy/restaurants" ,
            failureRedirect : "/auth/signin",
            failureFlash: true,
        })(req,res,next);
});

/*---------------POST routes end----------------*/




module.exports = router;