import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  let [username,setUsername] = useState("");
  let [password,setPassword] = useState("");
  let [message,setMessage] = useState("");
  let navigateTo = useNavigate();
  let handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  let handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  let handleLogin = async() => {
      let response = await fetch('http://localhost:4500/login',{
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
        headers: {'Content-Type': 'application/json'}
      });
      let data = await response.json();
      if(data.token)
      {
        localStorage.setItem('token',data.token);
        navigateTo('/view');
      }
      else
      {
        setMessage(data.message);
      }
  }
  return (
    <div className='login-container'>
      <div className="form-container">
	<p className="title">Login</p>
	<div className="form">
		<div className="input-group">
			<label for="username">Username</label>
			<input type="text" onChange={handleUsernameChange} value={username} id="username" placeholder="" />
		</div>
		<div className="input-group">
			<label for="password">Password</label>
			<input type="password" onChange={handlePasswordChange} value={password} id="password" placeholder="" />
			<div className="forgot">
			</div>
		</div>
		<button className="sign" onClick={handleLogin}>Sign in</button>
	</div>
	<label className='message'>
		{message}
	</label>
	<p className="signup">Don't have an account? &nbsp;
		<Link style={{
      color: '#00172D'
    }} to='/register'>Sign up</Link>
	</p>
</div>
    </div>
  )
}

export default Login
