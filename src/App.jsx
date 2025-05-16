import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const apiKey = "d2cfad0807004f5c9a25a4ea2fcea8c6";
  const link = "https://api.rawg.io/api/games/3328?key=";
  useEffect(()=>{
    async function getData(){
      await fetch(link + apiKey).then((response) => response.json()).
      then(function(response) {
        console.log(response);
      })
    }
    getData();
  })
  return (<div>
       Test
  </div>
  )
}

export default App
