import mongoose from "mongoose";

const urlShortenerSchema = new mongoose.Schema({
    longUrl:{
        type:String,
        required:true
    },
    shortenedUrl:{
        type:String,
        required:true
    }
})

const urlShortenerModel = mongoose.model("urlShort",urlShortenerSchema)

export {urlShortenerModel}