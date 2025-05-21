import { useEffect, useState } from "react"

import GameCard from "./gameCard";
import { useParams } from "react-router-dom";

export default function SearchResult(){
    const [pageIndex, setPageIndex] = useState(1);
    const [collection, setCollection] = useState(null);
    const {searchterm} = useParams();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
        fetch("https://api.rawg.io/api/games?key=d2cfad0807004f5c9a25a4ea2fcea8c6&" + (searchterm == "ordering=-metacritic" ? searchterm : searchterm.includes("dates") ? "dates=" + from + "," + to : searchterm.includes("typed=") ? "search=" + searchterm.split("=")[1] : "genres=" + searchterm) + "&page=" + pageIndex + "&page_size=40")
        .then((response)=> response.json()).
        then(function(response){
            console.log(response);
            setCollection(response);
        })
    }
    , [pageIndex,searchterm])

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
              <div className="results">
                {
                   collection == null || collection == undefined ? <h1 className="loading">Loading...</h1> : collection.results.map((entry) => <GameCard game={entry} key={entry.id}/>)
                }
               </div>
               <div className="pagebtns">
                <button className="prevPage" onClick={decreasePage} disabled={pageIndex == 1 ? true : false}>&#10094;</button>
                <button className="nextPage" onClick={increasePage} disabled={pageIndex == 4 ? true : false} >&#10095;</button>
               </div>
           </div>
}






