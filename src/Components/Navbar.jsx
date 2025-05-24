

import { useState } from "react";
import checkout from "../assets/icons/checklist.png";
import { Link } from "react-router-dom";

export default function Navbar({number}){

    const [typed, setTyped] = useState("");
    let element = document.querySelector(".notification");
    if (element != null){
        if (number > 0){
        element.classList.add("popUp");
    }
    else{
        element.classList.remove("popUp");
    }
    }
    function dropdownAnimation(){
        let genres = document.querySelector(".genres");
        if (!genres.classList.contains("appear")){
            genres.classList.remove("disappear");
            genres.classList.add("appear");
        }
        else{
            genres.classList.remove("appear");
            genres.classList.add("disappear");
        }
    }
    function handleType(e){
        setTyped(e.target.value);
    }
    return <header className="navBarCont">
        <ul className="genres">
                    <Link to="/search/action"><li>Action</li></Link>
                    <Link to="/search/adventure"><li>Adventure</li></Link>
                    <Link to="/search/role-playing-games-rpg"><li >RPG</li></Link>
                    <Link to="/search/strategy"><li >Strategy</li></Link>
                    <Link to="/search/indie"><li>Indie</li></Link>
                    <Link to="/search/shooter"><li>Shooter</li></Link>
                    <Link to="/search/casual"><li>Casual</li></Link>
                    <Link to="/search/simulation"><li>Simulation</li></Link>
                    <Link to="/search/puzzle"><li>Puzzle</li></Link>
                    <Link to="/search/arcade"><li>Arcade</li></Link>
                    <Link to="/search/platformer"><li>Platformer</li></Link>
                    <Link to="/search/massively-multiplayer"><li>Multiplayer</li></Link>
                    <Link to="/search/racing"><li>Racing</li></Link>
                    <Link to="/search/fighting"><li>Fighting</li></Link>
                    <Link to="/search/family"><li>Family</li></Link>
                    <Link to="/search/board-games"><li>Board Games</li></Link>
                    <Link to="/search/card"><li>Card</li></Link>
                    <Link to="/search/educational"><li>Educational</li></Link>
                    <Link to="/search/sports"><li>Sports</li></Link>
            </ul>
            <div className="logoCont">
                <div className="humberger" onClick={dropdownAnimation}>
                  <span className="bar"></span>
                </div>
                <Link to={"/"}><h3 className="name">GameHunt</h3></Link>
            </div>
           <nav className="navbar">
               <div className="searchDiv">
                <input type="text" placeholder="Search..." value={typed} onChange={handleType}/>
                <Link to={"/search/typed=" + typed}><button className="searchBtn">Search</button></Link>
               </div>
               <Link to="checkout"><div className="checkoutLogoCont"><div className="notification">{number > 0 ? number : null}</div><img className="checkoutLogo" src={checkout} alt="checkout"/></div></Link>
           </nav>
         </header>
}