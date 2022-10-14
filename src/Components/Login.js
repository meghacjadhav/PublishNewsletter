// import React from 'react'
// import "../CSS/LoginPage.css"
// import { Link} from "react-router-dom";
// import { useRef} from "react";
// import PublishNewsletter from './PublishNewsletter';
// function Login() {
  
//   const email=useRef()
//   const password=useRef()
//   const getEmail=localStorage.getItem("emailData")
//   const getPassword=localStorage.getItem("passwordData")

 
//   const handleSubmit=()=>{
//     if(email.current.value=="abc@gmail.com"&&password.current.value=="12345"){
//         localStorage.setItem("emailData","abc@gmail.com")
//         localStorage.setItem("passwordData","12345")
//     }
//     document.location.reload()
// }
 
//   return (
//     <div>
//     { getEmail && getPassword ? <PublishNewsletter/> :
//     <div>
//    <div id='heading'>NEWSLETTER</div>
//     <div id="mainLogin">
//         <div className='admin'>
//             <p>Admin?</p>
//             <form onSubmit={(e) => e.preventDefault()}>
//               <input type="text" name="email" ref={email}  placeholder='Enter Email ID' o/>
//               <input type="password" name="password" ref={password} placeholder='Enter Password' />
//             </form>
//             <button onClick={handleSubmit} id="loginbtn" >Login</button>
//         </div>
//         <div id="or">OR</div>
//         <div className='guest'>
//             <p>Guest?</p>
//             <Link to="/subscribe"><button id="subscribebtn">Subscribe</button></Link>
//         </div>
//       </div>
//       </div>
// }
//     </div>
//   )
// }

// export default Login