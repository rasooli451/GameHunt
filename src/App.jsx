import { useEffect, useState } from 'react'
import { Link , NavLink} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './Components/Navbar';

export default function App() {

  const [cart, setCart] = useState([]);


  
  return (<main>
        <Navbar />
        <Outlet />
       </main>
  )
}


