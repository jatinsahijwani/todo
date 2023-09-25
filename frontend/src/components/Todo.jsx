import React, { useState } from 'react'

const Todo = (props) => {
    let [update,setUpdate] = useState(false);
    let [textarea,setTextarea] = useState(props.description);
    let handleConfirmUpdate = async() => {
        let token = localStorage.getItem('token');
        let newDescription = textarea;
        let response = await fetch('http://localhost:4500/update',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`},
            body: JSON.stringify({title:props.title, description: newDescription})
        });
        let data = await response.json();
        props.reloadPage();
        setUpdate(false);
    }
    let handleUpdate = () => {
        setUpdate(true);
    }
    let handleDelete = async()=> {
        let token = localStorage.getItem('token');
        let key = props.title;
        let response = await fetch('http://localhost:4500/delete',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title:key})
        });
        let data = await response.json();
        if(data.message == 'Todo deleted successfully')
        {
            props.reloadPage();
        }
        else
        {
            //something something
        }
    }
  return (
    <div className='overall-todo'>
    <div className='title-container'>
      <h1>{props.title}</h1>
    </div>
    <div className='description-container'>
        {
            update ? <textarea className='textarea-description' name="" id="" value={textarea} onChange={(e) => setTextarea(e.target.value)} cols="20" rows="5"></textarea> : <p>{props.description}</p>
        }
    </div>
    <div className="functionality">
        {
            update ? <button onClick={handleConfirmUpdate}>Confirm Update</button> : <button onClick={handleUpdate}>Update</button>
        }
        
        <button onClick={handleDelete}>Delete</button>
    </div>
    </div>
  )
}

export default Todo
