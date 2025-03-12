let pokemonName = ""; 
let score=0;
let heart=5;

const correctSound = new Audio('resource/audio/correct-choice.mp3')
const wrongSound = new Audio('resource/audio/wrong-choice.mp3')
const gameOver = new Audio('resource/audio/game-over-.mp3')
const gameStart = new Audio('resource/audio/gamestart.mp3')

function startGame() {
    document.getElementById("pokemonImage").style.display = "block";
    document.getElementById("pokemonImage").style.filter = "brightness(0%)";
    document.getElementById("pokemonInput").style.display = "block";
    document.getElementById("guessButton").style.display = "block";
    document.getElementById("scoreDisplay").style.display = "block";
    document.getElementById("nextPokemon").style.display = "block";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("resultMessage").style.display = "none";
    document.getElementById("gameStart").style.display = "none";
    document.getElementById("scoreDisplay").textContent=0;
    document.getElementById("lives").textContent=5;
    gameStart.play();
    document.getElementById("nextPokemon").click();
}
function tryAgain(){
    document.getElementById("tryAgain").style.display = "none";
    document.getElementById("gameOver").style.display="none";
    startGame();
}

async function getPokemon() {
    try {
        let randomId = Math.floor(Math.random() * 897) + 1;
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) throw new Error(`HTTP error!! Status: ${response.status}`);

        let data = await response.json();
        console.log(data);

        pokemonName = data.name;
        let pokemonImage = data.sprites.front_default;

        document.getElementById("pokemonImage").src = pokemonImage;
        document.getElementById("resultMessage").style.display = "none"; 
        document.getElementById("pokemonInput").value="";
        document.getElementById("pokemonImage").style.filter="brightness(0%)";
        document.getElementById("greenButton").style.background="radial-gradient(circle, #417f04 20%, #006400 80%)";
        document.getElementById("redButton").style.background = "radial-gradient(circle,rgb(118, 2, 2) 20%, #640000 80%)";
        
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
}

function guessPokemon() {
    let answer = document.getElementById("pokemonInput").value.trim().toLowerCase();

    let resultMessage = document.getElementById("resultMessage");

    if (answer === pokemonName.toLowerCase()) {
        resultMessage.style.display = "block";
        resultMessage.innerHTML = `Correct! It's ${pokemonName}`;
        document.getElementById("nextPokemon").style.display = "block";
        const pokemonImage = document.getElementById("pokemonImage");
        pokemonImage.style.filter = "brightness(100%)";
        document.getElementById("greenButton").style.background = "radial-gradient(circle, #7CFC00 20%, #006400 80%)";
        document.getElementById("redButton").style.background = "radial-gradient(circle,rgb(118, 2, 2) 20%, #640000 80%)";
        score++;
        document.getElementById("scoreDisplay").textContent=score;
        correctSound.play();
} 
    else {
        resultMessage.style.display = "block";
        resultMessage.innerHTML = "Try Again!";
        document.getElementById("redButton").style.background="radial-gradient(circle,rgb(255, 39, 39) 20%,rgb(139, 10, 10) 80%)";
        document.getElementById("greenButton").style.background="radial-gradient(circle, #417f04 20%, #006400 80%)";
        document.getElementById("pokemonInput").value="";
        heart--;
        document.getElementById("lives").textContent=heart;
        wrongSound.play();
        if(heart===0){
            endGame();
        }
    }
}

function endGame(){
    if (heart===0){
        document.getElementById("pokemonImage").style.display = "none";
        document.getElementById("guessButton").style.display = "none";
        document.getElementById("nextPokemon").style.display = "none"; 
        document.getElementById("tryAgain").style.display="block";
        document.getElementById("gameOver").style.display="block";
        resultMessage.innerHTML = "Out of Lives!! GAME OVER";
        document.getElementById("pokemonImage").src = "";
        document.getElementById("pokemonInput").value = "";
        gameOver.play();

    }
}
