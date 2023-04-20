import express from "express"
import { urlShortenerModel } from "../models/urlShort.js"
// import bodyParser from "body-parser"
// app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router()

router.get("/all",async(req,res)=>{
    try {
        const allData = await urlShortenerModel.find({})
        res.status(200).send(allData)
    } catch (error) {
        res.status(500).send({ message: "Can't fetch the details" });
    }
})


router.post("/create",async(req,res)=>{
    try {
        const newData = await new urlShortenerModel({
            longUrl:req.body.longUrl,
            shortenedUrl:generateUrl()
        }).save()
        res.send(newData)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try {
        const dataToDelete = await urlShortenerModel.findByIdAndDelete({_id:req.params.id})

        if(!dataToDelete){
            return res.send("There is no such a data")
        }

        res.status(200).send("Successfully deleted")
    } catch (error) {
        res.status(500).send("Internal Server Error")

    }
    
})
function generateUrl() {
    let randomString = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;

    for (var i = 0; i < 5; i++) {
        randomString += characters.charAt(
            Math.floor(Math.random() * (charactersLength + i)) // just for randomly obtaining
        );
    }
    console.log(randomString)
    return randomString
}


export const urlRoutes = router