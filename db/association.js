const { Sequelize} = require("sequelize");
const { DataTypes} =Sequelize;

const sequelize= new Sequelize('test',process.env.user, process.env.password,{
    dialect:'postgres'
});

const country= sequelize.define('country', {
    countryName:{
        type:DataTypes.STRING,
        unique:true
    }
})

const Capital= sequelize.define('capital',{
    CapitalName:{
        type:DataTypes.STRING,
        unique:true
    }
})

country.hasOne(Capital, {foreignKey:"Id"});

let count, cap, capm;

sequelize.sync({alter:true})
.then(()=>{
   return Capital.findOne({where: { CapitalName: "tokyo"}});
}).then((data)=>{
    cap=data;
    return country.findOne({where: {countryName :"india"}})
})
.then((data)=>{
    count=data;
    count.setCapital(cap);
})
// .then(()=>{
//     return Capital.findOne({where: {CapitalName:"spain"}})
// })
// .then((data)=>{
//     cap=data;
//     return country.findOne({where: {countryName: "india"}})
// }).then((data)=>{
//     capm=data;
//     capm.setCapital(cap);
// })
// .then(()=>{
//     return country.findOne({where: {countryName: "india"}});
// }).then((data)=>{
//     count=data;
//     return count.getCapital();
// }).then((data)=>{
//     console.log(data.toJSON());
// })
.catch((err)=>{
    console.log(err);
})

module.exports= { sequelize, Capital, country};

