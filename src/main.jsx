import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Components/Home.jsx'
import Checkout from './Components/Checkout.jsx'
import Search from './Components/Search.jsx'
import GameDetails , {gameDetailsLoader} from './Components/GameDetails.jsx'
import { RouterProvider, createBrowserRouter , createRoutesFromElements} from 'react-router-dom'


const router = createBrowserRouter([{
  path : "/",
  element : <App />,
  children : [{index : true, element : <Home />},{path : "search", element : <Search />}, {path : "checkout", element : <Checkout />}, {path : ":id", element : <GameDetails />, loader : gameDetailsLoader}]
}])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
