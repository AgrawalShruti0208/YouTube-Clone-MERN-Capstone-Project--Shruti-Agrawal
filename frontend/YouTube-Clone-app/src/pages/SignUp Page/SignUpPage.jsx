import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState('');
  const [apiResult, setApiResult] = useState('');
  const [apiResultDisplay, setApiResultDisplay] = useState({
    image: "",
    instruction: ""
  });
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("/user_default_Avatar.jpg");

  const navigateTo = useNavigate();

  function handleLogin() {
    navigateTo('/login');
  }

  function validateEmail(email) {
    const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; // Existing regex
    return emailPattern.test(email);
  }

  function handleSignUp(e) {
    e.preventDefault();
    if (validateEmail(email)) {
      if (!err) {
        const registerUserObj = { username, email, password ,profilePic};
        
        fetch("http://localhost:3000/register", {
          method: 'post',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerUserObj)
        })
          .then(response => response.json())
          .then((data) => {
            const result = data.message ? data.message : data.error;
            setApiResult(result);

            const statusMap = {
              "User with this Email ID Exists!": {
                image: "/Mail_Exists.gif",
                instruction: "Please Sign Up using a different Email ID or Login."
              },
              "Registration Successful!": {
                image: "/User_Created.gif",
                instruction: "Please Login to your account!"
              }
            };

            setApiResultDisplay(statusMap[result] || {
              image: "/Error.gif",
              instruction: "Error: Registration Failed! Please try again."
            });
          });

        setEmail("");
        setPassword("");
        setUsername("");
        setProfilePic("/user_default_Avatar.jpg");

      }
    } else {
      setError('Please enter a valid email address!');
    }
  }

  function handleEmail(evt) {
    const value = evt.target.value;
    setError(value.trim() ? '' : 'Input Required for all Inputs!');
    setEmail(value);
  }

  function handlePassword(evt) {
    const value = evt.target.value;
    setError(value.trim() ? '' : 'Input Required for all Inputs!');
    setPassword(value);
  }

  function handleUsername(evt) {
    const value = evt.target.value;
    setError(value.trim() ? '' : 'Input Required for all Inputs!');
    setUsername(value);
  }

  function handleProfilePicChange(e) {
    const file = e.target.files[0];
    
    if (file && file.type.startsWith("image/")) {
        setProfilePic(URL.createObjectURL(file));
    } else {
        setError('Please upload a valid image file!');
    }
    }

  return (
    <div className='LoginSignupContainer'>
      {!apiResult ? (
        <form className="container" onSubmit={handleSignUp}>
          <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
          </div>
         
          <div className="inputs">

          <div className="input">
              <img src="/user_default_Avatar.jpg" alt="avatar icon" />
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </div>

          <div className="input">
              <img src="/pen.svg" alt="pen icon" />
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                required
                onChange={handleUsername}
              />
            </div>

            <div className="input">
              <img src="/email.png" alt="email icon" />
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your Email ID"
                required
                onChange={handleEmail}
              />
            </div>
            <div className="input">
              <img src="/password.png" alt="password icon" />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your Password"
                required
                onChange={handlePassword}
              />
            </div>
          </div>
          {err && <p className="Error">{err}</p>}
          <div className="submit-container">
            <button className="submit" type="submit">Sign Up</button>
          </div>
          <div className="auth-footer">
                <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </form>
      ) : (
        <div className="container">
          <div className="inputs">
            <div className="input2">
              <img src={apiResultDisplay.image} alt="Icon for Registration result" width="37%" />
              <input value={apiResult} readOnly />
            </div>
            <p className="ApiInstruction">{apiResultDisplay.instruction}</p>
            <div className="submit-container">
              {(apiResult === 'User with this Email ID Exists!') && (
                <button className="submit" onClick={() => location.reload()}>Sign Up</button>
              )}
              {(apiResult === 'Registration Successful!' || apiResult === 'User with this Email ID Exists!') && (
                <button className="submit" onClick={handleLogin}>Login</button>
              )}
              {!['Registration Successful!', 'User with this Email ID Exists!'].includes(apiResult) && (
                <button className="submit" onClick={() => location.reload()}>Sign Up</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
