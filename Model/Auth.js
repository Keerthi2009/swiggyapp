const {Schema,model} = require('mongoose');

let UserSwiggy = new Schema({
    name: {
        type:String,
        required:true,
    },
    phone: {
        type:Number,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique: true,
    },
    password: {
        type:String,
        required:true,
    },
},
{timestamps:true},
);

module.exports = model("swiggy",UserSwiggy);