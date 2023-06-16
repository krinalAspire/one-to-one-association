require('dotenv').config();
const express=require("express");
const app=express();
const {country, Capital}=require("./db/association");

app.use(express.json());

app.post("/capital",async(req,res)=>{
     try{
       const { CapitalName }= req.body;
       const capital=await Capital.create({
         CapitalName
       })
       res.send(capital);
     }catch(e){
        res.status(404).send(e)
     }
})

app.get("/capital",async(req,res)=>{
  const user=await Capital.findAll();
  res.send(user);
})

app.post("/country", async(req,res)=>{
    try{
        const { countryName }= req.body;
        const capital=await country.create({
            countryName
        })
        res.send(capital);
      }catch(e){
         res.status(404).send(e)
      }
})

app.get("/onetoOne", async(req,res)=>{
     try{
      let data = await country.findAll({
        include:Capital
      })
      // console.log(data);
      res.status(201).send(data);
     }catch(e){
      res.status(404).send(e.message);
      console.log(e.message);
     }
})

app.get("/country",(req,res)=>{
  const user=country.findAll();
  res.send(user);
})

app.listen(7171, ()=>{
    console.log("server running at 7171");
})