import React from 'react'
import "../CSS/LoginPage.css"
import { Link, useNavigate} from "react-router-dom";
import { useState} from "react";
import PublishNewsletter from './PublishNewsletter';
function LoginPage() {
  const [login, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState("");
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInfo((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };
  const UserLogin = (e)=>{
      e.preventDefault();
      // console.log(login)
      fetch(`http://localhost:8080/admin/login`, {
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({email:login.email,password:login.password})
        })
          .then((res) => res.json())
          .then((result) => { 
            console.log(result);
            if(result.token!==undefined){
            localStorage.setItem("token",result.token);
            localStorage.setItem("success",result.status);
          } 
            setResponse(result);
          });
        setLoginInfo({
          email: "",
          password: "",
        });
        // document.location.reload()   
  };
 
  return (
    <div>
      { 
      localStorage.getItem("success") && localStorage.getItem("token") ? <PublishNewsletter/> :
        <div>
   <div id='heading'>NEWSLETTER</div>
    <div id="mainLogin">
        <div className='admin'>
            <p>Admin?</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" name="email" value={login.email} placeholder='Enter Email ID' onChange={(e) => handleChange(e)}/>
              <input type="password" name="password" value={login.password} placeholder='Enter Password' onChange={(e) => handleChange(e)} />
            </form>
            <button onClick={UserLogin} id="loginbtn" >Login</button>
        </div>
        <div id="or">OR</div>
        <div className='guest'>
            <p>Guest?</p>
            <Link to="/subscribe"><button id="subscribebtn">Subscribe</button></Link>
        </div>
      </div>
      <div id='loginRes'>
      {
        response.status === "Success" && document.location.reload() && navigate("/login")
       }
            {
                response.status === "Failed" && 
                <div style={{ color: "red" }}>{response.message}</div>
            }
            </div>
            </div>
            }
    </div>
  )
}

export default LoginPage