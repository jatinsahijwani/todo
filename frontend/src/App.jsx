import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import View from './components/View'
import Create from './components/Create'
import Update from './components/Update'
import Delete from './components/Delete'
import './styles/style.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/view' element={<View />} />
        <Route path='/create' element={<Create />} />
        <Route path='/update' element={<Update />} />
        <Route path='/delete' element={<Delete />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
