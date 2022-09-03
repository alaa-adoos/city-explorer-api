'use strict';
require('dotenv').config();
const express = require('express'); 
const cors = require('cors');
const server = express();
const axios =require('axios');
const weatherData = require('./data/weather.json')


server.use(cors());

const PORT = process.env.PORT || 3002

//const Forcast = require("./Forcast");

//http:localhost:PORT/
server.get('/',(req,res)=>{
    res.send("Hi from the home- routes");
})

//http://localhost:3002/weather?Latitude=47.6038321&Longitude=-122.3300624&searchQuery=Seattle
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh&lat=38.123&lon=-78.543&key=17f82c142e954410b8b0080bd85147ca
//


server.get('/weather',weatherhandler)

async function weatherhandler(req,res){
    let lat=req.query.Latitude;
    let lon=req.query.Longitude;
    let cityName=req.query.searchQuery;
let URL=`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
try{
const result=await axios.get(URL);
console.log(result);
const weatherArr=result.data.data.map(item=>new Forcast(item) );


res.send(weatherArr);

}
catch{
    //
}
}
//http://localhost:3002/movies?city=cityName
//https://api.themoviedb.org/3/search/movie?api_key=cf59d527d7806380cd7a430442e8abd5&query=AMMAN
server.get('/movies',movieshandler)

async function movieshandler(req,res){
let cityName=req.query.city;
let URL=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
try{
let result=await axios.get(URL);
console.log(result.data)
const movieArr=result.data.results.map(item=>new Movies(item));
res.send(movieArr);
} 
catch{
    console.log("err");
}
}


server.get('*',(req,res)=>{
    res.send("404");
})

class Forcast{
    constructor(item){
        this.low=item.low_temp;
        this.max=item.max_temp;
        this.description = item.weather.description;
        this.date = item.valid_date;
    }

}
class Movies{
    constructor(item){
        this.title=item.title;
this.overview=item.overview;
this.average_votes=item.vote_average;
this.total_votes=item.vote_count;
this.image_url=item.poster_path;
this.popularity=item.popularity;
this.released_on=item.release_date;
    }
}
server.listen(PORT, () => {
    console.log(`Hello, I am listening in ${PORT}`);
})
