import React from 'react'
import "../CSS/PublishNewsletter.css"
import { Link } from "react-router-dom";
import { useState } from "react";
function PublishNewsletter() {
  const [publish, setPublishInfo] = useState({
    title: "",
    description: "",
  });
  const [response, setResponse] = useState("");
  const handleChange = (e) => {
    setPublishInfo((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };
  const PublishLetter = (e)=>{
    e.preventDefault();
    // console.log(publish)
    fetch(`https://blooming-ridge-45156.herokuapp.com/sendMail`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
          // "Accept":"application/json"
        },
        body:JSON.stringify({title:publish.title,description:publish.description})
      })
        .then((res) => res.json())
        .then((result) => { 
          console.log(result);
          setResponse(result);
        });
        setPublishInfo({
          title: "",
          description: "",
      });
};
const handleClick=()=>{
  localStorage.clear();
  window.location.reload();
}
  return (
    <>
    <div id="hello">Hello Admin!</div>
    <div id='mainPublish'>
        <form id="publishForm" onSubmit={(e) => e.preventDefault()}>
            <label name="title">Title:</label>
            <input type="text" id="title" name="title" value={publish.title} placeholder="Enter Title" onChange={(e) => handleChange(e)}/>
            <label name="description">Description:</label>
            <textarea id="description" rows="8" cols="50" name='description' value={publish.description} placeholder="Enter Text here..." onChange={(e) => handleChange(e)}/>
            <input onClick={PublishLetter} type="submit" name="publish" id="publish" value="Publish NewsLetter"/>
            <Link to="/view/subscribers" id="viewbtn">View subscribers here</Link>
        </form> 
        </div>
        <div id='publish_res'>
        {
                response.status === "Success" && 
                <div style={{ color: "olive" }}>NewsLetter Published:)</div>
            }
            {
                response.status === "Failed" && 
                <div style={{ color: "red" }}>Failed to Publish</div>
            }  
          <button id="logout" onClick={handleClick}>Logout</button>
            </div> 
    </>
  )
}

export default PublishNewsletter