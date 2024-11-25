import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


// index.css to style the whole application using tailwind css
import './index.css'

//imports for creating routes for the all the components
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

//importing all the components
import App from './App.jsx'
import Home from './pages/HomePage/Home.jsx'
import Login from './pages/Login Page/Login.jsx'
import DisplayCategoryVideos from './components/DisplayCategoryVideos.jsx'
import VideoDetailsPage from './pages/Video_Details_Page/VideoDetailsPage.jsx'
import Channel_Page from './pages/Channel_Page/Channel_Page.jsx'


//Root route for App Component
        //Components required for Changing main content area as Child elements of App
        //Error Component to display Error Occured if anything goes wrong
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        // errorElement: 
        children:[
            {
                path:'/',
                element: <Home />
            },
            {
                path:'/login',
                element: <Login />
            },
            {
                path:'/Videos/:category',
                element: <DisplayCategoryVideos />
            },
            {
                path:'/Video/:id',
                element: <VideoDetailsPage />
            },
            {
                path:'/Channel/:id',
                element: <Channel_Page />
            }
        ]
    }
]);

// Providing this router using RouterProvider functionality
createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
    
 
)
