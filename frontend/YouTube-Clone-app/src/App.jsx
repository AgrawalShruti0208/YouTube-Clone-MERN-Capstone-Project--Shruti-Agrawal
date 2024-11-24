import './App.css'
import './index.css'

//Outlet selects the child component based on the route provided and renders it
import { Outlet , Link } from 'react-router-dom'
import NavigationSideBar from './components/NavigationSideBar'


import {Provider} from 'react-redux'
import { store } from './utils/AppReduxStore.js'


function App() {
  return( 
    <div className='Appication'>
   
      <NavigationSideBar />
      
          <Provider store={store} >
            
            <div className='MainContentArea w-[100%] relative left-0 pt-[50px]'>
              <Outlet />
            </div>

        </Provider>  
      
      
    </div>
  )
  
}

export default App
