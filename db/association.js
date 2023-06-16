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

let count, cap;

sequelize.sync({alter:true}).then(()=>{
   return Capital.findOne({where: { CapitalName: "dfsfhg"}});
}).then((data)=>{
    cap=data;
    return country.findOne({where: {countryName :"ftfhjhj"}})
}).then((data)=>{
    count=data;
    count.setCapital(cap);
})
.catch((err)=>{
    console.log(err);
})

module.exports= { sequelize, Capital, country};

