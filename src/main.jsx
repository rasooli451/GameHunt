import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Components/Home/Home.jsx'
import Checkout from './Components/Checkout/Checkout.jsx'
import Search from './Components/Search/Search.jsx'
import SearchResult from './Components/Search/SearchResult/SearchResult.jsx'
import GameDetails , {gameDetailsLoader} from './Components/Product/GameDetails/GameDetails.jsx'
import Product from './Components/Product/Product.jsx'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'






const router = createBrowserRouter([{
  path : "/",
  element : <App />,
  children : [{index : true, element : <Home />},{path : "search", element : <Search />, children : [{path : ":searchterm", element : <SearchResult />}]}, {path : "checkout", element : <Checkout />}, {path: "product", element : <Product />, children : [{path : ":id", element : <GameDetails />, loader : gameDetailsLoader}]}]
}])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
