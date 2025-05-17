


import { useEffect , useState} from "react";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

import GameCard from "./gameCard";



export default function Home(){
    const [top100, setTop100] = useState(null);
    const [popular, setPopular] = useState(null);
    useEffect(()=>{
        fetch("https://api.rawg.io/api/games?key=d2cfad0807004f5c9a25a4ea2fcea8c6&ordering=-metacritic&page=1&page_size=10").
        then((response) => response.json()).
        then(function(response){
            console.log(response);
            setTop100(response);
        })
        fetch("https://api.rawg.io/api/games?key=d2cfad0807004f5c9a25a4ea2fcea8c6&dates=2024-01-01,2024-12-31&ordering=-added&page=1&page_size=10").
        then((response) => response.json()).
        then(function(response){
            setPopular(response);
        })
    }, [])

    return <div className="homePage">
        <div className="welcomeSection">
            <div className="welcome">
                <h1>Search, Buy and Play!!</h1>
            </div>
        </div>
        <div className="Top100">
            <h1>Top 100</h1>
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
}












