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
    const data = useLoaderData();
    const game = data.game;
    let screens = data.screenshots.results.map((object) => object.image);
    let slideShow = [game.background_image, game.background_image_additional].concat(screens);
    let style = {background : "linear-gradient(to top, #000, transparent), center/cover no-repeat url(" + slideShow[index] + ")"};
    function genreateString(array, isplatform){
        if (array.length > 0){
            let result = isplatform ? array[0].platform.name : array[0].name;
            for (let i = 1; i < array.length; i++){
               result += ", " + (isplatform ? array[i].platform.name : array[i].name);
            }
           return result;
        }
        return "unknown";
    }

    function calculatePrice(){
        let price = 0;
        let releasedYear = game.released == null ? 2010 : Number(game.released.substring(0,4));
        let twoLastDigitsOfReleasedYear = game.released == null ? 10 : Number(game.released.substring(2,4));
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
        return price;
    }
    function handleIncrease(state, setState, className){
        if (state == 0){
            let element = document.querySelector("." + className);
            element.removeAttribute("disabled");
        }
        if (className === "prevImg"){
            if (state === slideShow.length - 1){
                setState(0);
            }
            else{
                setState(state + 1);
            }
        }
        else{
            setState(state + 1);
        }
    }

    function handleDecrease(state, setState, className){
        setState(function(prev){
            if (prev == 1){
                let element = document.querySelector("." + className);
                element.disabled = "true"; 
            }
            setState(prev - 1);
        })
    }
    let platforms = genreateString(game.platforms, true);
    let developers = genreateString(game.developers, false);
    let genres = genreateString(game.genres, false);
    let publishers = genreateString(game.publishers, false);
    let price = calculatePrice();
    let metacriticColor = game.rating >= 4 ? {backgroundColor : "#66CC33"} : game.rating >= 3 ? {backgroundColor : "#FFCC33"} : {backgroundColor : "#FF0000"};
    if (game.metacritic != null)
        metacriticColor = game.metacritic >= 80 ? {backgroundColor : "#66CC33"} : game.metacritic >= 65 ? {backgroundColor : "#FFCC33"} : {backgroundColor : "#FF0000"};
    return <div className="gamePage">
        <div className="gameDetails">
            <h1>{game.name}</h1>
            <div className="details">
                <div className="imgContainer" style={style}>
                    <button className="nextImg" onClick={()=> handleIncrease(index, setIndex, "prevImg")}>&#10095;</button>
                    <button className="prevImg" onClick={()=> handleDecrease(index, setIndex, "prevImg")} disabled={index == 0 ? true : false}>&#10094;</button>
                    <div className="metacritic bigMetacritic" style={metacriticColor}>
                    <p>{game.metacritic === null ? game.rating : game.metacritic}</p>
                    </div>
                    <div className="addSection">
                        <button className="decrease" onClick={()=> handleDecrease(count, setCount, "decrease")} disabled={count == 0 ? true : false}>-</button>
                        <div className="count"><p>{count}</p></div>
                        <button className="increase" onClick={()=> handleIncrease(count, setCount, "decrease")}>+</button>
                    </div>
                    <button className="addToCart">Add To Cart</button>
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
    const screens = await fetch("https://api.rawg.io/api/games/" + id + "/screenshots?key=d2cfad0807004f5c9a25a4ea2fcea8c6");
    let game = await res.json();
    let screenshots = await screens.json();
    return {game, screenshots};
}