



export default function GameCard({game}){

    function increaseAdd(){
        let p = document.querySelector(".star" + game.id);
        let star = document.querySelector(".star" + game.id + " + div");
        let temp = 0;
        if (p.classList.contains("favorited")){
            temp = Number(p.innerHTML) - 1;
            p.classList.remove("favorited");
            star.style.backgroundColor = "white";
        }
        else{
            temp = Number(p.innerHTML) + 1;
            p.classList.add("favorited");
            star.style.backgroundColor = "gold";
        }
        p.textContent = temp;
        
    }
    
    let metacriticColor = game.rating >= 4 ? {backgroundColor : "#66CC33"} : game.rating >= 3 ? {backgroundColor : "#FFCC33"} : {backgroundColor : "#FF0000"};
    if (game.metacritic != null)
        metacriticColor = game.metacritic >= 80 ? {backgroundColor : "#66CC33"} : game.metacritic >= 65 ? {backgroundColor : "#FFCC33"} : {backgroundColor : "#FF0000"};
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

    let imgContStyle = {background : "linear-gradient(to top, #000, transparent), center/cover no-repeat url(" + game.background_image + ")"}
    return <div className="GameCard">
               <div className="imgCont" style={imgContStyle}>
                <div className="reactions" onClick={increaseAdd}>
                <p className={"star" + game.id}>{game.added}</p>
                <div className="star"></div>
                </div>
                <div className="metacritic" style={metacriticColor}>
                    <p>{game.metacritic === null ? game.rating : game.metacritic}</p>
                </div>
               </div>
                <div className="GameDescription">
                        <h2 className="gameName">{game.name}</h2>
                        <p>Released: {game.released}</p>
                        <p className="price">{price.toFixed(2)}$</p>
                        <div className="gameGenre">
                            {game.genres.map((genre)=> <div key={genre.id} className="genre">{genre.name}</div>)}
                        </div>
                </div>
            </div>
}