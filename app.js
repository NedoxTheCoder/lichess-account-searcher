// API -> https://lichess.org/api/user/{username}

// const api = `https://lichess.org/api/user/${username}`

const bulletGames = document.querySelector(".gamesBullet");
const bulletRating = document.querySelector(".ratingBullet");

const blitzGames = document.querySelector(".gamesBlitz");
const blitzRating= document.querySelector(".ratingBlitz");

const rapidGames = document.querySelector(".gamesRapid");
const rapidRating = document.querySelector(".ratingRapid");


const input = document.querySelector("#input");

const addSign = document.querySelector(".fa-magnifying-glass");



const active = document.querySelector(".onoff")
const joindate = document.querySelector(".joined")

const button = document.querySelector(".link button");
const buttonwrapper = document.querySelector(".link a");

const user = document.querySelector(".username");

const statsdiv = document.querySelector(".stats");
const otherStatsdiv = document.querySelector(".otherstats");

addSign.addEventListener("click",function(e){
    e.preventDefault();
    let username = input.value;
    const api = `https://lichess.org/api/user/${username}`
    
    fetch(api)
    .then(resp => {
        if (!resp.ok){
            statsdiv.style.display= "none";
            otherStatsdiv.style.display = "none";
            user.innerText = "User Cannot Be Found!"
            
        }else{
            statsdiv.style.display= "inline-flex";
            otherStatsdiv.style.display = "inline-flex";
        return resp.json()}})
    .then(data => {console.log(data); 
        addToHtml(data) ; 
        return data})
    .catch(err => console.log(err));


})


function addToHtml(d){
    const {perfs:{blitz:{games:blgames,rating:blrating},bullet:{games:bulgames,rating:bulrating},rapid:{games:rpgames,rating:rprating}}, createdAt, online, url, username} = d;
    //Bullet
    bulletGames.innerText = bulgames;
    bulletRating.innerText = bulrating;
    //Blitz
    blitzGames.innerText = blgames;
    blitzRating.innerText = blrating;
    //rapid
    rapidGames.innerText = rpgames;
    rapidRating.innerText = rprating;

    
    //Others
    // joindate.innerText = `${Date(createdAt)}/${Date(createdAt).getMonth()}/${Date(createdAt).getFullYear()}`;
    var options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
    };
    let createdDate = new Date(createdAt);
    // console.log(createdDate.toLocaleDateString("tr",options));
    joindate.innerText = createdDate.toLocaleDateString("tr",options);
    joindate.style.color = "#fc9c5b"

    if (online){
        active.innerText = "Online"
        active.style.color = "green";
    }else{
        active.innerText = "Offline"
        active.style.color = "red";
    }

        button.style.display = "inline-flex";
        buttonwrapper.setAttribute("href",url);
        user.innerText = username;
    
        input.value = "";
}

input.addEventListener("keydown",function(e){
    
    if (e.keyCode == 13){
        e.preventDefault();
        addSign.click();
    }
})