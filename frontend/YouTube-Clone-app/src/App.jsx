import './App.css'
import './index.css'

//Outlet selects the child component based on the route provided and renders it
import { Outlet , Link } from 'react-router-dom'
import NavigationSideBar from './components/NavigationSideBar'


import {Provider} from 'react-redux'
import { store } from './utils/AppReduxStore.js'
import { isTokenExpired } from './utils/HelperFunctions.js'

function App() {
  
    const jwtToken = localStorage.getItem("token");

    if(jwtToken){
        

        if(isTokenExpired(jwtToken)){
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            location.reload();
            
        }
    
    }

  return( 
    <div className='Appication'>
      <Provider store={store} >
        <NavigationSideBar />
      
          
            
            <div className='MainContentArea w-[100%] relative left-0 pt-[50px]'>
              <Outlet />
            </div>

      </Provider>  
      
      
    </div>
  )
  
}

export default App
