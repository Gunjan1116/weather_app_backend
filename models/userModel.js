const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    currentLocation:String,
    password:String
})

const Usermodel=mongoose.model("user",userSchema);

module.exports={
    Usermodel
}

// {
       
//     "name":"gunjan Kumar",
//     "email":"gj@gmail.com",
//     "currentLocation":"Jamshedpur",
//     "password":""
        
//         }