//https://api.openweathermap.org/data/2.5/weather?q=jamshedpur&appid=39b7afaf2654c1636803beceaf06a4d6
//273.15
const fetch=require("isomorphic-fetch");
require("dotenv").config();
const express=require("express");
const { authentication } = require("../middlewares/authentication");
const {Weathermodel}=require("../models/weatherModel")
const weatherRoute=express.Router();

weatherRoute.get("/current",async(req,res)=>{
    let q=req.query.q;
    try {
        let resData=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${process.env.apiKey}`);
        let allData=await resData.json();
        res.json({"msg":`Current weather data for ${q} city`,"data":allData})
    } catch (error) {
        console.log("error while fetching current weather data",error);
        res.json({"msg":"error in getting current weather report"})
    }
})

weatherRoute.post("/save",authentication,async(req,res)=>{
    let {cityName,temperature,date,time,userId}=req.body;
    try {
        let saveData=new Weathermodel({cityName,temperature,date,time,userId});
        await saveData.save();
        res.json({"msg":"Data is saved to history"})
    } catch (error) {
        console.log("error while saving data for history",error);
        res.json({"msg":"error while saving data as history"});
    }
})
weatherRoute.get("/history",authentication,async(req,res)=>{
    let userId=req.body.userId;
    try {
        let reqUser=await Weathermodel.find({userId});
        if(reqUser[0].userId==userId){
            res.json({"msg":"previous data","data":reqUser})
        }else{
            res.json({"msg":"you are not authorized"});
        }
    } catch (error) {
        console.log("error while getting history data",error);
        res.json({"msg":"error while getting history data"});
    }
})
module.exports={
    weatherRoute
}

