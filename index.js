require('dotenv').config();
const express=require("express");
const app=express();
const {country, Capital}=require("./db/association");

app.use(express.json());

app.post("/capital",(req,res)=>{
     try{
       const { CapitalName }= req.body;
       const capital=Capital.create({
         CapitalName
       })
       res.send(capital);
     }catch(e){
        res.status(404).send(e)
     }
})

app.get("/capital",(req,res)=>{
  const user=Capital.findAll();
  res.send(user);
})

app.post("/country", (req,res)=>{
    try{
        const { countryName }= req.body;
        const capital=country.create({
            countryName
        })
        res.send(capital);
      }catch(e){
         res.status(404).send(e)
      }
})

app.get("/country",(req,res)=>{
  const user=country.findAll();
  res.send(user);
})

app.listen(7171, ()=>{
    console.log("server running at 7171");
})