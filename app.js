const express=require('express')
const ejs=require('ejs')
const mysql=require('mysql')
const app=express()
const bodyparser=require('body-parser')
app.use(express.static("public"))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/sensorvalues",(req,res)=>{
    res.render("sensorvalues")
})

app.listen(3000,()=>{
    console.log("Server started at port 3000");
})

