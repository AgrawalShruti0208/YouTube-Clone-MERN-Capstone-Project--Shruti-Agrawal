import './App.css'

//Outlet selects the child component based on the route provided and renders it
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <>
      <div>
        REACT APP
      </div>
      <Outlet />
      
      
    </>
  )
}

export default App
