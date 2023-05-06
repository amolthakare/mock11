const express = require("express");
const { Noticemodel } = require("../models/notice.model");
const Notice = express.Router();

Notice.get("/hello", (req, res) => {
  res.send("hello");
});

Notice.get("/",async(req,res)=>{
    try {
        let data =await Noticemodel.find()
        res.send(data)
    } catch (error) {
        res.send({Error: "Something went wrong"})
    }
})

Notice.post("/",async(req,res)=>{
    const curr = new Date();
    const date = curr.toLocaleString('en-US');
    console.log(date);
    let {name,title,dec} = req.body
    try {
        let data = new Noticemodel({name,title,dec,date});
        await data.save();
        res.status(201).send(data)
    } catch (error) {
        res.send({Error: "Something went wrong"})
    }
})

Notice.patch("/:id",async(req,res)=>{
    // const curr = new Date();
    // const date = curr.toLocaleString('en-US');
    // console.log(date);
    const payload = req.body;
    const id = req.params.id;
    const profile = await Noticemodel.findOne({"_id":id});
    console.log(profile);
    try{
        await Noticemodel.findByIdAndUpdate({"_id":id},payload);
        res.send({msg:"Updated"});
    }
    catch(err){
        console.log(err);
        res.status(404);
        res.send({error:"Notice doesn't exsist"})
    }
})

Notice.delete("/:id",async(req,res)=>{
    const id = req.params.id;

    try{
        await Noticemodel.findByIdAndDelete({"_id":id});
        res.status(202);
        res.send("deleted");
 
    }
    catch(err){
        console.log(err);
        res.status(404);
        res.send({error:"notice doesn't exsist"})
    }
})


module.exports = { Notice };
