import { useEffect, useState } from 'react'
import { Link , NavLink} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

export default function App() {

  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  
  function AddToCart(game){
    setCart(prevCart => {
    const existingItem = prevCart.find(item => item.id === game.id);

    if (existingItem) {
      return prevCart.map(item =>
        item.id === game.id
          ? { ...item, count : (game.fromCheckout ? game.count : item.count + game.count) }
          : item
      );
    } else {
      return [...prevCart, { id: game.id, details: game.details, count: game.count, price : game.price }];
    }
  });
  }



  useEffect(()=>{
    let total = 0;
    for (let i = 0; i < cart.length; i++){
       total += cart[i].count;
    }
    setCount(total);
  }, [cart])

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter((game) => game.id != id));
  }




  return (<main>
        <Navbar number={count}/>
        <Outlet context={{addfunc : AddToCart, removefunc : removeFromCart, cart : cart}}/>
        <Footer />
       </main>
  )
}


