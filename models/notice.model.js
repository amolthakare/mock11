const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
    name: String,
    title: String,
    dec: String,
    date:String
}) 

const Noticemodel = mongoose.model("notice",noticeSchema);

module.exports={
    Noticemodel,
}