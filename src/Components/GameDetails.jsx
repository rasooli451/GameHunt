import { useEffect } from "react";
import { useState } from "react";
import { useLoaderData, useParams, useSearchParams } from "react-router-dom"
import releaseIcon from "../assets/icons/clock.png"
import developersIcon from "../assets/icons/coding.png"
import platformsIcon from "../assets/icons/device.png"
import publisherIcon from "../assets/icons/publishing.png"
import priceTagIcon from "../assets/icons/price-tag.png"
import genresIcon from "../assets/icons/categorization.png"







export default function GameDetails(){

    const [index, setIndex] = useState(0);
    const [count, setCount] = useState(0);
    const game = useLoaderData();
    let style = {background : "linear-gradient(to top, #000, transparent), center/cover no-repeat url(" + game.background_image + ")"};

    function genreateString(array, isplatform){
        let result = isplatform ? array[0].platform.name : array[0].name;
        console.log(array);
        for (let i = 1; i < array.length; i++){
            result += ", " + (isplatform ? array[i].platform.name : array[i].name);
        }
        return result;
    }
    let platforms = genreateString(game.platforms, true);
    let developers = genreateString(game.developers, false);
    let genres = genreateString(game.genres, false);
    let publishers = genreateString(game.publishers, false);
    let price = 0;
    let releasedYear = Number(game.released.substring(0,4));
    let twoLastDigitsOfReleasedYear = Number(game.released.substring(2,4));
    let currentYear = new Date().getFullYear();
    let yearsPassedSinceStartOfCentury = currentYear - 2000;
    let differenceBetween = currentYear - releasedYear;
    if (differenceBetween <= yearsPassedSinceStartOfCentury){
        price = twoLastDigitsOfReleasedYear / yearsPassedSinceStartOfCentury * 80 * (game.metacritic === null ? game.rating / 5 : game.metacritic / 100);
        if (price < 10){
            price = 10 * Number(game.metacritic) / 100;
        }
    }
    else{
        price = 10 * Number(game.metacritic) / 100;
    }
    return <div className="gamePage">
        <div className="gameDetails">
            <h1>{game.name}</h1>
            <div className="details">
                <div className="imgContainer" style={style}>
            </div>
            <div className="gameDescription">
                <h2>Game Details</h2>
                <p className="description">{game.description_raw}</p>
                <div className="gameDetail">
                    <img src={releaseIcon} alt="releaseIcon" />
                    <p><b>Release Date: </b>{game.released}</p>
                </div>
                <div className="gameDetail">
                    <img src={platformsIcon} alt="platformIcon" />
                    <p><b>Platforms: </b>{platforms}</p>
                </div>
                <div className="gameDetail">
                    <img src={developersIcon} alt="developerIcon" />
                    <p><b>Developers: </b>{developers}</p>
                </div>
                <div className="gameDetail">
                    <img src={genresIcon} alt="genreIcon" />
                    <p><b>Genres: </b>{genres}</p>
                </div>
                <div className="gameDetail">
                    <img src={publisherIcon} alt="publishersIcon" />
                    <p><b>Publishers: </b>{publishers}</p>
                </div>
                <div className="gameDetail">
                    <img src={priceTagIcon} alt="priceTagIcon" />
                    <p className="price"><b>{price.toFixed(2)}$</b></p>
                </div>
            </div>
            </div>
        </div>
    </div>
}



export async function gameDetailsLoader({params}){
    const {id} = params;
    const res = await fetch("https://api.rawg.io/api/games/" + id + "?key=d2cfad0807004f5c9a25a4ea2fcea8c6");

    return res.json();
}