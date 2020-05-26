const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../Model/Auth");

module.exports =(passport) => {
    passport.use(new localStrategy({usernameField:"email"},(email,password,done) => {
        User.findOne({email:email}).then(user => {
            if(!user){
                return done(null,false, {message:'No email register first register then login'});
            }

            bcrypt.compare(password, user.password, (err, isMath) => {
                if(err) throw err;
                if(isMath) {
                    return done(null,user, {message: "Login Successful"});
                }else {
                    return done(null,false, {message:"password doesnot exist"});
                }

            })
        })
        .catch((err) => console.log(err));
    }));

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        })
    });
};