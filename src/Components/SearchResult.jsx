import { useEffect, useState } from "react"

import GameCard from "./gameCard";
import { useParams } from "react-router-dom";

export default function SearchResult(){
    const [pageIndex, setPageIndex] = useState(1);
    const [collection, setCollection] = useState(null);
    const {searchterm} = useParams();
    const [filters, setFilters] = useState(searchterm.includes("metacritic") || searchterm.includes("dates") || searchterm.includes("typed=") ? [] : [searchterm]);
    const [filterOn, setFilterOn] = useState(false);
    const [filtered, setFiltered] = useState([]);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    let genre = document.querySelector("#" + searchterm);
    if (genre != null){
        genre.checked = true;
        genre.disabled = true;
    }
    useEffect(()=>{
        let from = "";
        let to = "";
        if (searchterm.includes("dates")){
            let date = new Date();
            let lastyear = date.getFullYear() - 1;
            let currentMonth = date.getMonth();
            from = lastyear + "-01-01";
            to = lastyear + "-12-31";
            if (currentMonth > 1){
                from = date.getFullYear() + "-01-01";
                to = date.getFullYear() + "-" + (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
            }
        }
        fetch("https://api.rawg.io/api/games?key=d2cfad0807004f5c9a25a4ea2fcea8c6&" + (searchterm == "metacritic" ? "ordering=-metacritic" : searchterm.includes("dates") ? "dates=" + from + "," + to : searchterm.includes("typed=") ? "search=" + searchterm.split("=")[1] : "genres=" + searchterm) + "&page=" + pageIndex + "&page_size=40")
        .then((response)=> response.json()).
        then(function(response){
            setCollection(response);
            setFiltered(response.results);
        })
        if (searchterm.includes("metacritic") || searchterm.includes("dates") || searchterm.includes("typed=")){
            if (filters.length == 0){
                setFilterOn(false);
            }
        }
        else{
            if (filters.length <= 1){
             setFilterOn(false);
             if (filters.length == 1){
                let genre = document.querySelector("#" + filters[0]);
                genre.checked = false;
                genre.disabled = false;
             }
             setFilters([searchterm]);
        }
        }
    }
    , [pageIndex,searchterm])

    useEffect(()=>{
        if (filterOn){
            if (filtered.length == collection.results.length){
                setFiltered((prev)=> prev.filter(function(game) {
                    let genres = game.genres.map((genre)=> genre.slug);
                    for (let i = 0; i < filters.length; i++){
                        if (!genres.includes(filters[i])){
                            return false;
                        }
                    }
                    return true;
                }))
            }
            else{
                setFiltered((prev)=> prev.filter(function(game){
                    let genres = game.genres.map((genre) => genre.slug);
                    if (genres.includes(filters[filters.length - 1])){
                        return true;
                    }
                    return false;
                }))
            }
        }
    }, [filters, collection])

    


    function handleFilter(e){
        if (e.target.checked){
            if (filters.length == 1 || filters.length == 0){
                setFilterOn(true);
            }
            setFilters((prev) => [...prev, e.target.value]);
        }
        else{
            let min = 0;
            if (searchterm.includes("metacritic") || searchterm.includes("dates") || searchterm.includes("typed=")){
                min = 1;
            }
            else{
                min = 2;
            }
            if (filters.length == min){
                setFilterOn(false);
            }
            setFiltered(collection.results);
            setFilters((prev) => prev.filter((item) => item != e.target.value));
        }
    }

    function increasePage(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
        if (pageIndex == 0){
            let button = document.querySelector(".prevPage");
            button.removeAttribute("disabled");
        }
        if (pageIndex == 4){
            setPageIndex(1);
        }
        else{
            setPageIndex(pageIndex + 1);
        }
    }

    function decreasePage(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setPageIndex(function(prev){
            if (prev == 2){
                let element = document.querySelector(".prevPage");
                element.disabled = "true"; 
            }
            setPageIndex(prev - 1);
        })
    }
    return <div className="searchResults">
            <div className="filters">
                <h3 className="orbitron">Filter by:</h3>
                <div className="filterOption">
                    <input type="checkbox" id="action" value="action"  onChange={handleFilter}/>
                    <label htmlFor="action">Action</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="adventure" value="adventure"  onChange={handleFilter}/>
                    <label htmlFor="adventure">Adventure</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="role-playing-games-rpg" value="role-playing-games-rpg" onChange={handleFilter}/>
                    <label htmlFor="role-playing-games-rpg">RPG</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="strategy" value="strategy"  onChange={handleFilter}/>
                    <label htmlFor="strategy">Strategy</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="indie" value="indie"  onChange={handleFilter}/>
                    <label htmlFor="indie">Indie</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="shooter" value="shooter"  onChange={handleFilter}/>
                    <label htmlFor="shooter">Shooter</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="casual" value="casual"  onChange={handleFilter}/>
                    <label htmlFor="casual">Casual</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="simulation" value="simulation"  onChange={handleFilter}/>
                    <label htmlFor="simulation">Simulation</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="puzzle" value="puzzle"  onChange={handleFilter}/>
                    <label htmlFor="puzzle">Puzzle</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="arcade" value="arcade"  onChange={handleFilter}/>
                    <label htmlFor="arcade">Arcade</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="platformer" value="platformer"  onChange={handleFilter}/>
                    <label htmlFor="platformer">Platformer</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="massively-multiplayer" value="massively-multiplayer"  onChange={handleFilter}/>
                    <label htmlFor="massively-multiplayer">Multiplayer</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="racing" value="racing"  onChange={handleFilter}/>
                    <label htmlFor="racing">Racing</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="fighting" value="fighting"  onChange={handleFilter}/>
                    <label htmlFor="fighting">Fighting</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="family" value="family"  onChange={handleFilter}/>
                    <label htmlFor="family">Family</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="board-games" value="board-games"  onChange={handleFilter}/>
                    <label htmlFor="board-games">Board-games</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="card" value="card"  onChange={handleFilter}/>
                    <label htmlFor="card">Card</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="educational" value="educational"  onChange={handleFilter}/>
                    <label htmlFor="educational">Educational</label>
                </div>
                <div className="filterOption">
                    <input type="checkbox" id="sports" value="sports"  onChange={handleFilter}/>
                    <label htmlFor="sports">Sports</label>
                </div>
                <h3 className="orbitron">Order by: </h3>
                <div className="filterOption">
                    <select name="order" id="order">
                        <option value="noOption">Select an option</option>
                        <option value="Rating">Rating</option>
                        <option value="Sells">Sells</option>
                    </select>
                </div>
                
            </div>
              <div className="resultSection">
                <h1 className="orbitron">Results</h1>
                <hr />
                <div className="results">
                    {
                   collection == null || collection == undefined ? <h1 className="loading">Loading...</h1> : filterOn ? filtered.length > 0 ? filtered.map((entry) => <GameCard game={entry} key={entry.id}/>): <h1 className="loading">No games found in this Page, try Next Page!</h1> : collection.results.map((entry) => <GameCard game={entry} key={entry.id}/>)
                    }
                </div>
               </div>
               <div className="pagebtns">
                <button className="prevPage" onClick={decreasePage} disabled={pageIndex == 1 ? true : false}>&#10094;</button>
                <button className="nextPage" onClick={increasePage} disabled={pageIndex == 4  || (collection != null && collection.next == null) ? true : false} >&#10095;</button>
               </div>
           </div>
}






