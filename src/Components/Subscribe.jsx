import React from 'react'
import "../CSS/Subscribe.css"
import { useState } from "react";

function Subscribe() {
  const [subscribe, setSubscribeInfo] = useState("");
  const [response, setResponse] = useState("");


const submitted = (e)=>{
  e.preventDefault();
  console.log(subscribe)
  fetch(`https://blooming-ridge-45156.herokuapp.com/subscriber/subscribe`, {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        // "Accept":"application/json"
      },
      body:JSON.stringify({email:subscribe})
    })
      .then((res) => res.json())
      .then((result) => { console.log(result);
        setResponse(result);
      });
    setSubscribeInfo("");
  };

  return (
    <>
    <div id='Subcribe'>Subscribe NewsLetter</div>
    <div className='mainSubscribe'>
        <form id="sub" onSubmit={submitted}>
         <input id="mail" type="text" name="email" placeholder='Enter Email ID' value={subscribe} onChange={(e)=>{setSubscribeInfo(e.target.value)}}/>
         <input  type="submit" id="btn" value="Subscribe"/>
         <div id="response">
         {
                response.status === "Success" && 
                <div style={{ color: "black" }}>Thanks For Subscribing:)</div>
            }
            {
                response.status === "Failed" && 
                <div style={{ color: "red" }}>Failed to Subscribe</div>
            }
            </div>
        </form>
        </div></>
  )
}

export default Subscribe