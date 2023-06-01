const mongoose=require("mongoose");

const weatherSchema=mongoose.Schema({
    cityName:String,
    temperature:Number,
    date:String,
    time:String,
    userId:String
})

const Weathermodel=mongoose.model("weatherhistory",weatherSchema);

module.exports={
    Weathermodel
}