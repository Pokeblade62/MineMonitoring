const express=require('express')
const ejs=require('ejs')
const mysql=require('mysql')
const app=express()
app.use(express.static("public"))
app.set("view engine","ejs")
const bodyparser = require("body-parser");
const { render } = require('express/lib/response')
app.use(bodyparser.json()) // for parsing application/json
app.use(bodyparser.urlencoded({ extended: true }))
var aler="";


const db = mysql.createConnection({
    // host: "192.168.137.36",
    host: "localhost",
    user: "root",
    password:"" ,
    database: "kcf"
    });


    app.use(express.static(__dirname + '/public'));
    
    db.connect(function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Connected to mysql :)");
        }
      });


app.get("/",(req,res)=>{
    res.render("logini")
})

app.post("/logini",(req,res)=>{
  const { uname,pwd } = req.body;
  if(uname=="admin@admin1" && pwd=="admin123"){

    db.query('SELECT humidity,temperature,gas FROM sensor WHERE id = (SELECT MAX(id) FROM sensor)',function(err,found){
     
      console.log(found[0].temperature);

      if(found[0].temperature>69){
         aler='HIGH TEMPERATURE!';
          return res.render("sensorvalues",{found:found,aler:aler})
      }
      else if(found[0].gas>76){
        aler='GAS DANGEROUS!';
         return res.render("sensorvalues",{found:found,aler:aler})
     }
     else if(found[0].humidity>70){
      aler='HUMIDITY HIGH!';
       return res.render("sensorvalues",{found:found,aler:aler})
   }
    else if(uname=="admin@admin1" && pwd=="admin123"){
        aler="none";
        return res.render("sensorvalues",{found,aler:aler})
      }
  });
  }
  else{
    res.redirect("logini")
  }
  
  
  
})

app.get("/cards",(req,res)=>{
  res.render("cards")
})


app.get("/logini",(req,res)=>{
    res.render("logini")
})

app.get("/sensorvalues",(req,res)=>{

    db.query('SELECT humidity,temperature,gas FROM sensor WHERE id = (SELECT MAX(id) FROM sensor)',function(err,found){
     
        console.log(found[0].temperature);

        if(found[0].temperature>30){
           aler='HIGH TEMPERATURE!';
            return res.render("sensorvalues",{found:found,aler:aler})
        }
        if(found[0].gas>30){
          aler='GAS DANGEROUS!';
           return res.render("sensorvalues",{found:found,aler:aler})
       }
       if(found[0].humidity>60){
        aler='HUMIDITY HIGH!';
         return res.render("sensorvalues",{found:found,aler:aler})
     }

        else
          aler="none";
          return res.render("sensorvalues",{found,aler:aler});
        });
})

app.get("/minerregister", (req, res) => {
  var lol = "hehe";
  res.render("minerregister", { lol: lol });
});

app.get("/helmetregister", (req, res) => {
  var lol = "hehe";






  
  res.render("helmetregister", { lol: lol });
});

app.post("/helmetregister", (req, res) => {
  const { minerid, macid, gas, gyro, temperature } = req.body;

  db.query(
    "INSERT INTO helmetdetails SET ?",
    {
      minerid: minerid,
      macid: macid,
      gas: gas,
      gyro: gyro,
      temperature: temperature,
    },
    (err, results) => {
      if (err) {
        console.log("error!");
        // console.log(err);
      } else {
        console.log("results: ");
        console.log(results);
        //alert("Helmet Details Registered Successfully");
        // req.flash("message", "SS");
        // res.render("helmetregister", { message: req.flash("message") });
      }
    }
  ); //name: name, name from database with name from name in js
  var lol = "lmo";
  return res.render("helmetregister", { lol: lol });
});

app.post("/minerregister", (req, res) => {
  const { username, age, contact, address, econtact, relationship } = req.body;

  db.query(
    "INSERT INTO minerdetails SET ?",
    {
      name: username,
      contact: contact,
      address: address,
      age: age,
      econtact: econtact,
      relationship: relationship,
    },
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log("results");
        console.log(results);
        res.render("minerregister", {
          message: "User registered",
        });
      }
    }
  ); //name: name, name from database with name from name in js
  var lol = "lmo";
  return res.render("minerregister", { lol: lol });
});

app.get("/minerdetails", (req, res) => {
  db.query(
    "select mid,name,age,contact,address,econtact,relationship from  minerdetails",
    (err, found) => {
      if (err) console.log(err);
      console.log(found);
      res.render("minerdetails", { found });
    }
  );
});

app.get("/helmetdetails", (req, res) => {
  db.query(
    "select helmetid,minerid,macid,gas,gyro,temperature from helmetdetails",
    (err, found) => {
      if (err) console.log(err);
      console.log(found);
      res.render("helmetdetails", { found });
    }
  );
});


// $(function() {
//   $('.asdf').click(function() {
//     aler='lulli!';
//     // $('.asdf').html('Hello World');
//     console.log("lskdjf");

//          return res.render("sensorvalues",{found:found,aler:aler})
//          $(".asdf").innerHTML="dslkfj";
    
//       $.get('http://echo.jsontest.com/Hello/world', function(data) {
//           $('.sensor-table').html(data['Hello']);
//       });
//   });
// });


// app.post("/spank", (req, res) => {
//   console.log("hehe");
//   $.get('http://echo.jsontest.com/Hello/world', function(data) {
//     $('.sensor-table').html(data['Hello']);
// });
// });




//   $('.asdf').click(function() {
    
//     console.log("lskdjf");

//          return res.render("sensorvalues",{found:found,aler:aler})
//          $(".asdf").innerHTML="dslkfj";
    
//       $.get('http://echo.jsontest.com/Hello/world', function(data) {
//           $('.sensor-table').html(data['Hello']);
//       });
//   });


app.listen(3000,()=>{
    console.log("Server started at port 3000");
})

