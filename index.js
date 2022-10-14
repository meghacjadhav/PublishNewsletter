const express=require("express");
const app=express();
const bodyparser=require("body-parser")
app.use(bodyparser.json());
const mongoose=require("mongoose");
const cors = require("cors");
const login = require("./routes/Login");
const subscribe = require("./routes/Subscribe");
app.use(cors());
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const AWS=require("aws-sdk");
const env=require("dotenv");
// const {nanoid}=require("nanoid");
const Subscribe = require("./models/subscribersSchema");

mongoose.connect("mongodb+srv://Megha:Megha@cluster0.7cktj2k.mongodb.net/newsletter?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },(err) => {
    if (err) console.log(err);
    else console.log("Database Connected");
  }
);

app.use("/admin", login);
app.use("/subscriber", subscribe);


env.config();

const awsConfig={
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region:process.env.AWS_REGION,
}
const SES = new AWS.SES(awsConfig);

app.post("/sendMail",async(req,res)=>{
  let title=req.body.title;
  let description=req.body.description;
  const senders=await Subscribe.find();
  let tomail=senders.map((val)=>{return val.email});
  tomail.join(",");
 //   console.log(tomail)
     const email=process.env.FROM_EMAIL
    //  const shortCode = nanoid(6).toUpperCase();
     try{
       const params={
         Source:email,
         Destination:{
             ToAddresses : tomail,
            //  ToAddresses:[email],
         },
         Message:{
             Subject:{
                 Charset:"UTF-8",
                 Data:`Sent From NewsLetter Assignment`
             },
             Body:{
                 Html:{
                     Charset:"UTF-8",
                     Data:`<h1>${title}</h1><p>${description}</p>`
                 },
             },
         },
       };
       const emailSent= SES.sendEmail(params).promise();
       emailSent
       .then((data)=>{
         console.log(data)
       })
       .catch((err)=>{
         console.log(err)
       })
       res.json({
        status:"Success",
        message:"Published Newsletter"
       })
     }
     catch(e){
        console.log(e);
     }
})


app.listen(PORT,()=>console.log("Server running"))