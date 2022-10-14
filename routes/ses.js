const AWS=require("aws-sdk");
const env=require("dotenv");
const {nanoid}=require("nanoid");
const Subscribe = require("../models/subscribersSchema");

env.config();

const awsConfig={
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region:process.env.AWS_REGION,
}
const SES = new AWS.SES(awsConfig);

const sendEmail = async ()=>{
   const senders=await Subscribe.find();
   let tomail=senders.map((val)=>{return val.email});
  tomail.join(",");
//   console.log(tomail)
    const email=process.env.FROM_EMAIL
    const shortCode = nanoid(6).toUpperCase()
    try{
      const params={
        Source:email,
        Destination:{
            // ToAddresses : tomail,
            ToAddresses:[email],
        },
        Message:{
            Subject:{
                Charset:"UTF-8",
                Data:`OTP Verification`
            },
            Body:{
                Html:{
                    Charset:"UTF-8",
                    Data:`<h1>Your verification code is ${shortCode}</h1>`
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
    }
    catch(e){
       console.log(e);
    }
}
module.exports = sendEmail