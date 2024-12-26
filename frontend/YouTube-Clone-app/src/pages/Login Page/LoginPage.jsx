import { useState} from 'react';
import { useNavigate } from "react-router-dom";

import { storeTokenInLS,storeUserEmailInLS, storeUserIdInLS } from '../../utils/HelperFunctions';

export function LoginPage(){

    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [err,setError] = useState('');
    const [apiResult,setApiResult] = useState('');
    const [username, setUsername] = useState("");

    const navigateTo = useNavigate();
    
    
    
    

    function handleGoToHome(){
        
        navigateTo('/');
        location.reload();

    }
    

    function validateEmail(email) {

        const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    
        return emailPattern.test(email);
        
    }
    

    function handleEmail(evt){
        const value = evt.target.value;

        // Validate if the input is not empty
        if (!value.trim()) {
            setError('Input Required for all Inputs!');
        }else {
            setError('');
            setEmail(value);
        }
        
    }
    
    function handlePassword(evt){
        const value = evt.target.value;

        // Validate if the input is not empty
        if (!value.trim()) {
            setError('Input Required for all Inputs!');
        } else {
            setError('');
            setPassword(value);
        }
        
    }

    function handleUsername(evt) {
        const value = evt.target.value;
        setError(value.trim() ? '' : 'Input Required for all Inputs!');
        setUsername(value);
      }
    

    function handleLogin(e){
        e.preventDefault();
        
        if(validateEmail(email)){
            if(!err){
                
                const registerUserObj = { username, email, password};

                fetch("https://youtube-clone-mern-capstone-project.onrender.com/login",{
                    //as browser only accepts fetch API using its options{} to pass the email and password to the Request Body
                    method:'post',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(registerUserObj) //sending User Data to post rquest body after convrting it into json()
        
                }).then(response=>response.json()).then((data)=>{
                   
                    const result = (data.message)? data.message : data.error;
                    
                    setApiResult(result);
                    
                    if(data.token){
                        // If token returned in response, call function to store this token in Local Storage
                        storeTokenInLS(data.token);
                        storeUserEmailInLS(email);
                        storeUserIdInLS(data.id);

                    }
                    

                    
                });
                //setting user email in cookie
                
                setEmail("");
                setPassword("");
                setUsername("");
            }
        }else{
            setError('Please enter a valid email address!');
        }
    
          

    }




    return(
        <div className='LoginSignupContainer'>
           
            {!apiResult &&
                <form className="loginSignupDiv" onSubmit={handleLogin}>
                
                    <div className="header">
                        <div className="text">Login</div>
                        <div className="underline"></div>
                    </div>  
                    <div className="inputs">

                        <div className="input">
                            <img src="/pen.svg" alt="pen icon" />
                            <input type="text" name="username" value={username} placeholder="Enter your username" required onChange={handleUsername}/>
                        </div>
                        
                        <div className="input">
                            <img src="/email.png" alt="email icon" />
                            <input type="email" name='email' value={email} placeholder='Enter your Email ID' required onChange={handleEmail} />
                        </div>

                        <div className="input">
                            <img src="/password.png" alt="password icon" />
                            <input type="password" name='password' value={password} placeholder='Enter your Password' required onChange={handlePassword}/>
                        </div>
                        
                        
                    </div>
                    {err && <p className="Error">{err}</p>}
                    <div className="submit-container">
                        
                        <button className="submit" type="submit">Login</button>
                    
                    </div>
                    <div className="auth-footer">
                        <p>Don't have an account? <a href="/UserSignUp">Sign Up</a></p>
                    </div>

                </form>
            }
            {apiResult &&    
                <div className="loginSignupDiv">
                    <div className="inputs">

                        {(apiResult!=='User Authentication Successful!') &&
                            <>
                                <div className="input2">
                                    <img src="/Error.gif" alt="Icon for Error" width="25%" />
                                    <input value={apiResult} readOnly/>
                                </div>
                                <p className="ApiInstruction" style={{color: "red"}}>Error: Login Failed! Please Check your credentials.</p>
                                <div className="submit-container">
                                    <button className="submit" onClick={()=>location.reload()}>Try to Login Again</button>
                                </div>
                            </>   
                        }
                            
                        {apiResult==='User Authentication Successful!' &&
                            <>
                                <div className="input2">
                                    <img src="/User_Created.gif" alt="Icon for Successful Login" width="27%" />
                                    <input value={apiResult} readOnly/>
                                </div>
                                <p className="ApiInstruction" style={{color: "red"}}>You are now logged in.</p>
                                <p className="ApiInstruction">Note: <span style={{color: "blue"}}>JWT Token generated, this session will expire in 10 minutes</span></p>
                                <div className="submit-container">
                                    <button className="submit" onClick={handleGoToHome}>Back to Home</button>
                                </div>
                            </> 
                            
                                
                        }
                            
                            

                        
                    </div>
                </div>
            }
        </div>
    );
}