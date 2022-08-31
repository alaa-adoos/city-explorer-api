'use strict';
require('dotenv').config();
const express = require('express'); 
const cors = require('cors');
const server = express();

const weatherData = require('./data/weather.json')


server.use(cors());

const PORT = process.env.PORT

//const Forcast = require("./Forcast");

//http:localhost:PORT/
server.get('/',(req,res)=>{
    res.send("Hi from the home route");
})

//http://localhost:3000/weather?Latitude=47.6038321&Longitude=-122.3300624&searchQuery=Seattle
server.get('/weather',(req,res)=>{
    let lat=req.query.Latitude;
    let lon=req.query.Longitude;
    let cityName=req.query.searchQuery;

    console.log(lat,lon)
let city=weatherData.find((item)=>{
    if(item.lat == lat && item.lon == lon && item.city_name.toLowerCase()==cityName.toLowerCase()){
        return item;
    }
    
})
try{
const weatherArr=city.data.map(item => new Forcast (item));
res.send(weatherArr);
}
catch{
    console.log("error");
}
    })
    

server.get('*',(req,res)=>{
    res.send("404");
})

server.listen(PORT, () => {
    console.log(`Hello, I am listening in ${PORT}`);
})

class Forcast{
    constructor(item){
        this.low=item.low_temp;
        this.max=item.max_temp;
        this.description = item.weather.description;
        this.date = item.valid_date;
    }

}