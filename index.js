import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs"


const port = 3000;
const app = express();
const APIKEY =""; //Your API KEY

const API_URL = "https://api.football-data.org/v4";
const config = {
    headers: { "X-Auth-Token": APIKEY },
  };
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/' , (req,res)=>{
    
    res.render("index.ejs")
    

})
app.post("/" , async(req,res) =>{
    const nation = req.body['Competition'];
    const season = req.body['Season'];
    const result  = await axios.get(API_URL+`/competitions/${nation}/scorers?limit=1&season=${season}` , config);
    res.render("index.ejs" ,{
        name : JSON.stringify(result.data.scorers[0].player.name),
        matches : JSON.stringify(result.data.scorers[0].playedMatches),
        goals : JSON.stringify(result.data.scorers[0].goals),
        

    })
    res.render("index.ejs")
    console.log(nation);
    console.log(season)
    
    
    
})

app.listen(port ,()=>{
    console.log("Server running at port 3000...");
});