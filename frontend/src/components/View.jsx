import React, {useState, useEffect} from 'react'
import Todo from './Todo'
import { useNavigate } from 'react-router-dom'

const View = () => {
  let reloadPage = () => {
    setReload(!reload);
  }
  let navigateTo = useNavigate();
  let handleAddButtonClick = () => {
    navigateTo('/create');
  }
  let [array,setArray] = useState([]);
  let [reload,setReload] = useState(false);
  useEffect(()=> {
    let x = async () => {
    let token = localStorage.getItem('token')
    try{
    let response = await fetch('http://localhost:4500/getByUsername',{
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}` 
      }
    });
    let data = await response.json();
    console.log(data.data);
    setArray(data.data);
    console.log(array.length);
    console.log(typeof array);
    }catch(error)
    {
      console.log(error)
    }
  }
    x();
  },[reload]);
  return (
    <>
    <div className='view-container'>
      {
        array.length == 0 ? 
        <h1>No Todos here</h1> : 
        array.map((todo) => {
          return(
          <Todo title={todo.title} description={todo.description} reloadPage={reloadPage}  />
          )
        })
      }
      <div className='add-btn'>
        <button onClick={handleAddButtonClick}>+ Add</button>
      </div>
    </div>
    </>
  )
}

export default View
