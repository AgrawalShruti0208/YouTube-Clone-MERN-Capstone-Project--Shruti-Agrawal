import './App.css'
import './index.css'

//Outlet selects the child component based on the route provided and renders it
import { Outlet , Link } from 'react-router-dom'
import NavigationSideBar from './components/NavigationSideBar'
import SeachFunctionality from './components/SearchFunctionality'
import Home from './pages/HomePage/Home'

function App() {
  return( 
    <>
   
      <NavigationSideBar />
      <div className='MainContentArea w-[100%] relative left-0'>
        <Outlet />
      </div>
      
    </>
  )
  
}

export default App
