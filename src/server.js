import cron from "cron"
import https from "https"
import express from "express"

const job = new cron.CronJob("*/14 * * * *", function(){
    https
        .get(process.env.API_URL, (res) => {
            if (res.statusCode === 200) console.log("GET request sent successfully");
            else console.log("GET request failed", res.statusCode);
        })
        .on("error",(e)=>console.error("Error while graciously sending request", e))
})


const app = express()
if(process.env.NODE_ENV == "production") job.start();

app.get("/api/health",(req,res)=>{
    res.status(200).json({success: true})
})

app.use(express.json())

app.listen(5001, ()=>{console.log("Glory to God alone, server is running on PORT 5001")})