// import React,{useState,useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// const Sign = () => {
//     const [email, setEmail] = useState(''); 
//     const [password, setPassword] = useState('');
//     const { signup } = useAuth();
//     const navigate=useNavigate();
//     const handleSubmit = async(e)=>{
//         e.preventDefault();
//         try{
//             await signup(email,password);
//             navigate('/dashboard');
//         }
    // }    catch(error){
//         setError('Signup failed. please try again.');
//         alert('signup failed. please try again.');
       
//     }
//     return(
//         <div className="signup-container">
//             <h2>Signup</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="email">Email:</label>
//                     <input type="email"name="email" id="email"value={email} onChange={(e)=>setEmail(e.target.value)}/>
//                     </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password:</label>
//                     <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </div>
//                 <button type="submit">Singup</button>
//             </form>
//             <p>Already have a accout !go to login</p>
//         </div>
//     )
// }
// export default Sign;    