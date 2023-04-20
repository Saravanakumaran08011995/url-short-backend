import express from "express"
import { dataBaseConnection } from "./db.js"
import dotenv from "dotenv"
import { urlRoutes } from "./routes/urlshortener.js"
import bodyParser from "body-parser"
import { signupRouter } from "./routes/signupUser.js"
import { loginRouter } from "./routes/loginUser.js"
import { isAuthorized } from "./controllers/auth.js"
import cors from "cors"
import { urlShortenerModel } from "./models/urlShort.js"

const app = express()

dotenv.config()
dataBaseConnection()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hi,Welcome")
})

app.get("/:urlId",async(req,res)=>{
    try {
        let shortenedUrl = req.params.urlId;
        const currentData = await urlShortenerModel.findOne({shortenedUrl})
        console.log(currentData);
        res.redirect(currentData.longUrl);
        
    } catch (error) {
        console.log(error)
        res.status(500).send({errorMessage:error})
    }
})


app.use("/urlRoutes",isAuthorized,urlRoutes)
app.use("/signup",signupRouter)
app.use("/login",loginRouter)


app.listen(process.env.PORT)