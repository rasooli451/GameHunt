


import { useEffect , useState} from "react";
import { Link} from "react-router-dom";
import background from "../assets/backgrounds/HomepageBG.jpg";

import GameCard from "./GameCard";





export default function Home(){
    const [top100, setTop100] = useState(null);
    const [popular, setPopular] = useState(null);
    useEffect(()=>{
        fetch("https://api.rawg.io/api/games?key=d2cfad0807004f5c9a25a4ea2fcea8c6&ordering=-metacritic&page=1&page_size=10").
        then((response) => response.json()).
        then(function(response){
            setTop100(response);
        })
        let date = new Date();
        let lastyear = date.getFullYear() - 1;
        let currentMonth = date.getMonth();
        let from = lastyear + "-01-01";
        let to = lastyear + "-12-31";
        if (currentMonth > 1){
            from = date.getFullYear() + "-01-01";
            to = date.getFullYear() + "-" + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        }
        fetch("https://api.rawg.io/api/games?key=d2cfad0807004f5c9a25a4ea2fcea8c6&dates=" + from + "," + to + "&ordering=-added&page=1&page_size=10").
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
                <h3>From AAA to indie gems — discover, compare, and buy your next game in seconds.</h3>
            </div>
        </div>
        <div className="Top100">
            <div className="gameDiv">
                <h1 className="orbitron">Top 100</h1>
                <Link to="/search/metacritic"><button className="seeMoreLink">See More</button></Link>
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
                <h1 className="orbitron">Popular recently</h1>
                <Link to="search/dates"><button className="seeMoreLink">See More</button></Link>
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

    </div>
}












