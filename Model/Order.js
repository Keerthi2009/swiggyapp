const {Schema, model} = require("mongoose");
const PostSchema = new Schema({
    restaraunt_name: {
        type:String,
        required:true,
    },
    restaraunt_photo : {
        type:[],
        required:true,
    },
    restaraunt_dish1 : {
        type:String,
        required:true,
    },
    restaraunt_dish2 : {
        type:String,
        required:true,
    },
    
    },
    {timestamps:true}
    );

    module.exports = model("order",PostSchema);