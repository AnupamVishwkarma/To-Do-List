const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
    },

    description : {
        type : String,
        required : true,
        trim : true,
    },

    status :{
        type : String,
        enum : ["Pending", "Completed"],
        default : "Pending"
    },
    
},
{
        timestamps : true,
    }
);

module.exports = mongoose.model("Todo", todoSchema);