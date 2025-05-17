



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

    let metacriticColor = game.metacritic >= 80 ? {backgroundColor : "#66CC33"} : game.metacritic >= 65 ? {backgroundColor : "#FFCC33"} : {backgroundColor : "#FF0000"};


    return <div className="GameCard">
               <div className="imgCont">
                <img src={game.background_image}/>
                <div className="reactions" onClick={increaseAdd}>
                <p className={"star" + game.id}>{game.added}</p>
                <div className="star"></div>
                </div>
                <div className="metacritic" style={metacriticColor}>
                    <p>{game.metacritic}</p>
                </div>
               </div>
                <div className="GameDescription">
                        <h2 className="gameName">{game.name}</h2>
                        <p>Released: {game.released}</p>
                        <div className="gameGenre">
                            {game.genres.map((genre)=> <div key={genre.id} className="genre">{genre.name}</div>)}
                        </div>
                </div>
            </div>
}