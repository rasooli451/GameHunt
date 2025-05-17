import { useEffect, useState } from 'react'
import { Link , NavLink} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './Components/Navbar';

export default function App() {
  const apiKey = "d2cfad0807004f5c9a25a4ea2fcea8c6";
  const link = "https://api.rawg.io/api/games/3328?key=";

  return (<main>
        <Navbar />
        <Outlet />
       </main>
  )
}


