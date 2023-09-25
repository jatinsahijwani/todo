import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Create = () => {
  let token = localStorage.getItem('token');
  let [title,setTitle] = useState("");
  let [description,setDescription] = useState("");
  let [message,setMessage] = useState("");
  let navigateTo = useNavigate();
  let handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  let handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  let handleCreate = async() => {
      let response = await fetch('http://localhost:4500/create',{
        method: 'POST',
        body: JSON.stringify({title,description}),
        headers: {
          'Content-Type': 'application/json',
          "Authorization":`Bearer ${token}`
      }
      });
      let data = await response.json();
      if(data.message == 'Invalid token' || data.message == 'Invalid authorization')
      {
        navigateTo('/');
      }
      else
      {
        navigateTo('/view');
      }
  }
  return (
    <div className='login-container'>
      <div className="form-container">
	<p className="title">Add Todo</p>
	<div className="form">
		<div className="input-group">
			<label for="title">Title</label>
			<input type="text" onChange={handleTitleChange} value={title} id="title" placeholder="" />
		</div>
		<div className="input-group">
			<label for="description">Description</label>
			<textarea type="text" onChange={handleDescriptionChange} value={description} id="description" placeholder="" />
			<div className="forgot">
			</div>
		</div>
		<button className="sign" onClick={handleCreate}>Create</button>
	</div>
	<label className='message'>
		{message}
	</label>
  </div>
    </div>
  )
}

export default Create
