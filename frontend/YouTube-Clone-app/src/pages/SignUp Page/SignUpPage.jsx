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
  const [profilePic, setProfilePic] = useState("/user_default_Avatar.jpg"); // Default profile picture path

  const navigateTo = useNavigate();

  function handleLogin() {
    navigateTo('/login');
  }

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (validateEmail(email)) {
      if (!err) {
        let imageBase64 = null;

        // If a file is uploaded, convert it to base64, otherwise use default image path
        if (profilePic instanceof File) {
          imageBase64 = await getBase64(profilePic);
        } else {
          // Use the default image path if no file is uploaded
          imageBase64 = profilePic;
        }

        const registerUserObj = {
          username,
          email,
          password,
          profilePic: imageBase64
        };

        fetch("https://youtube-clone-mern-capstone-project.onrender.com/register", {
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

    if (file && file.type.startsWith("image/") && file.size <= 45000) {
      setProfilePic(file); // Store the image file for conversion to base64
      setError('');
    } else {
      if(file && file.size > 45000){
        setError('File exceeds max limit : 45kb')
      }else{
        setError('Please upload a valid image file!');
      }
      
    }
  }

  // Function to convert image file uploaded by user in base64 string format
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className='LoginSignupContainer'>
      {!apiResult ? (
        <form className="loginSignupDiv" onSubmit={handleSignUp}>
          <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
          </div>

          <div className="inputs">
            <div className="input">
              {/* The file input will not display any preview */}
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
        <div className="loginSignupDiv">
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
