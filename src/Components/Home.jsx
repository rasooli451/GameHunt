


import { useEffect , useState} from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import facebook from "../assets/icons/facebook.svg";
import instagram from "../assets/icons/instagram.svg";
import twitter from "../assets/icons/twitter.svg";
import whatsapp from "../assets/icons/whatsapp.svg";
import background from "../assets/backgrounds/HomepageBG.jpg";

import GameCard from "./gameCard";



export default function Home(){
    const [top100, setTop100] = useState(null);
    const [popular, setPopular] = useState(null);
    useEffect(()=>{
        fetch("https://api.rawg.io/api/games?key=d2cfad0807004f5c9a25a4ea2fcea8c6&ordering=-metacritic&page=1&page_size=10").
        then((response) => response.json()).
        then(function(response){
            setTop100(response);
        })
        let year = new Date().getFullYear() - 1;
        fetch("https://api.rawg.io/api/games?key=d2cfad0807004f5c9a25a4ea2fcea8c6&dates=" + year + "-01-01," + year + "-12-31&ordering=-added&page=1&page_size=10").
        then((response) => response.json()).
        then(function(response){
            setPopular(response);
        })
    }, [])

    let homepageStyle = {background : "linear-gradient(to top, #000, transparent, #000), center/cover no-repeat url(" + background + ")"}
    return <div className="homePage">
        <div className="welcomeSection" style={homepageStyle}>
            <div className="welcome">
                <h1>Hunt. Discover. Play.</h1>
                <h3>Search thousands of games across all platforms and genres. Buy securely. Play instantly.</h3>
                <h3>From AAA to indie gems — discover, compare, and buy your next game in seconds</h3>
            </div>
        </div>
        <div className="Top100">
            <div className="gameDiv">
                <h1>Top 100</h1>
                <Link to="search"><button className="seeMoreLink">See More</button></Link>
                <div className="gameScroll">
            {
                top100 === null ? "Loading" : top100.results.map(function(entry){
                    if (entry.background_image != null){
                        return <GameCard game={entry} key={entry.id}/>
                    }
                })
            }
            </div>
            </div>
        </div>
        <div className="popularLastYear">
            <div className="gameDiv">
                <h1>Popular recently</h1>
                <Link to="search"><button className="seeMoreLink">See More</button></Link>
                <div className="gameScroll">
            {
                popular === null ? "Loading" : popular.results.map(function(entry){
                    if (entry.background_image != null){
                        return <GameCard game={entry} key={entry.id}/>
                    }
                })
            }
            </div>
            </div>
        </div>
        <footer>
            <div className="footerContent">
                <div className="slogan">
                    <h1>GameHunt</h1>
                    <p>GameHunt makes it easy to find and buy the perfect game — whether you're into strategy, shooters, or story-driven epics.</p>
                    <div className="socialContacts">
                        <img src={facebook} alt="facebook" className="socialLink"/>
                        <img src={instagram} alt="instagram" className="socialLink"/>
                        <img src={twitter} alt="twitter" className="socialLink"/>
                        <img src={whatsapp} alt="whatsapp" className="socialLink"/>
                    </div>
                    <p>Built using <a href="https://rawg.io/apidocs">RAWG Gaming API</a></p>
                    <p>Icons used from <a href="https://www.flaticon.com/free-icons/purchase">Flaticon</a></p>
                </div>
                <div className="list">
                <p>Company</p>
                <ul>
                   <li>About</li>
                   <li>Features</li>
                   <li>Works</li>
                   <li>Career</li> 
                </ul>
            </div>
            <div className="list">
                <p>Help</p>
                <ul>
                   <li>Customer Support</li>
                   <li>Delievery Details</li>
                   <li>Terms & Conditions</li>
                   <li>Privacy Policy</li> 
                </ul>
            </div>
            <div className="list">
                <p>FAQ</p>
                <ul>
                   <li>Account</li>
                   <li>Manage Deliveries</li>
                   <li>Orders</li>
                   <li>Payments</li> 
                </ul>
            </div>
            </div>
        </footer>

    </div>
}












