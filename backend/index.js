const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const port = 8080;


const app = express();
app.use(express.json())
app.use(cors())

const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: Number
}, {
    timestamps: true
})

const userModel = mongoose.model("user", schemaData)

// read
// http://localhost:8080
app.get('/', async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

// create an save data's
// http://localhost:8080/create
app.post("/create",async(req,res)=>{
    const data = await userModel.create(req.body);
    data.save();
    console.log(req.body);
    res.send({success:true,message:"data save sucessfully",data:data})
})

// update an save data's
// http://localhost:8080/update
app.put("/update",async(req,res)=>{
    console.log(req.body);
    const{ _id, ...rest} = req.body;
    console.log(rest)
    const data =  await userModel.updateOne({_id : _id},rest);
    res.send({success:true,message:"data UPDATE sucessfully",data:data})
})


// delete api
// http://localhost:8080/delete/id
app.delete('/delete/:id',async(req,res)=>{
   const id = req.params.id
   console.log(id)
   const data = await userModel.deleteOne({_id:id})
   res.send({success:true,message:"data delete sucessfully",data:data})
})

mongoose.connect('mongodb://127.0.0.1:27017/crudone').
    then(() => console.log("connect to DB")).
    catch((err) => console.log(err))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})