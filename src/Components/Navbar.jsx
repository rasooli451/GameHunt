

import checkout from "../assets/icons/checklist.png";
import { Link } from "react-router-dom";

export default function Navbar(){


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
    return <header className="navBarCont">
        <ul className="genres">
                    <li>Action</li>
                    <li>Adventure</li>
                    <li>Horror</li>
                    <li>Indie</li>
                    <li>First-Person Shooter</li>
                    <li>Third-Person Shooter</li>
                    <li>Stealth</li>
                    <li>fighting</li>
                    <li >RPG</li>
                    <li>Survival</li>
                    <li>Sports</li>
                    <li>Racing</li>
                    <li>Puzzle</li>
            </ul>
        <div className="humberger" onClick={dropdownAnimation}>
            <span className="bar"></span>
        </div>
           <nav className="navbar">
               <h3 className="name">GameHunt</h3>
               <div className="searchDiv">
                <input type="text" placeholder="Search..." />
                <button type="submit" className="searchBtn">Search</button>
               </div>
               <Link to="checkout"><img className="checkoutLogo" src={checkout} alt="checkout"/></Link>
           </nav>
         </header>
}