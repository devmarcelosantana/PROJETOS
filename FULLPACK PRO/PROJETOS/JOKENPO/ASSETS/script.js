const buttonRock = document.querySelector("#rock");
const buttonPaper = document.querySelector("#paper");
const buttonScissors = document.querySelector("#scissors");

const myScoreInput = document.querySelector(".yourScore");
const machineScoreInput = document.querySelector(".machineScore");

const navPlacar = document.querySelector("#navPlacar");
const navJogar = document.querySelector("#navJogar");
const navSobre = document.querySelector("#navSobre");

const aboutSection = document.querySelector("#sobre");
const buttonPlayElements = document.querySelectorAll(".buttonPlay button");

let myScore = 0;
let machineScore = 0;

navSobre.addEventListener("click", (e) => {
    e.preventDefault();
    aboutSection.classList.add("active");
});

navJogar.addEventListener("click", (e) => {
    e.preventDefault();
    aboutSection.classList.remove("active");
    window.scrollTo({ top: 0, behavior: 'smooth' });

    buttonPlayElements.forEach(btn => btn.classList.add("play-highlight"));
    
    setTimeout(() => {
        buttonPlayElements.forEach(btn => btn.classList.remove("play-highlight"));
    }, 1000);
});

navPlacar.addEventListener("click", (e) => {
    e.preventDefault();
    aboutSection.classList.remove("active");
    
    myScoreInput.classList.add("score-overlay");
    machineScoreInput.classList.add("score-overlay");
    
    setTimeout(() => {
        myScoreInput.classList.remove("score-overlay");
        machineScoreInput.classList.remove("score-overlay");
    }, 1500);
});

function play(playersChoice){
    let jokenpo = Math.floor(Math.random() * 3);
    const resultJokenpo = document.querySelector("#inputResult");
    const battleArena = document.querySelector(".battleArena");
    
    const playButtonsMap = [buttonRock, buttonPaper, buttonScissors];
    const selectedButton = playButtonsMap[playersChoice];
    
    const choicesData = [
        { id: "battle-rock", img: "PEDRA.png", alt: "pedra", text: "Pedra" },
        { id: "battle-paper", img: "PAPEL.png", alt: "papel", text: "Papel" },
        { id: "battle-scissors", img: "TESOURA.png", alt: "tesoura", text: "Tesoura" }
    ];

    const playerChoiceData = choicesData[playersChoice];
    const machineChoiceData = choicesData[jokenpo];

    battleArena.innerHTML = `
        <div class="battle-button ${playerChoiceData.id} animate-battle">
            <img src="${playerChoiceData.img}" alt="${playerChoiceData.alt}" width="70px">
            ${playerChoiceData.text}
        </div>
        <div class="battle-button ${machineChoiceData.id} animate-battle">
            <img src="${machineChoiceData.img}" alt="${machineChoiceData.alt}" width="70px">
            ${machineChoiceData.text}
        </div>
    `;

    battleArena.classList.add("active");

    const battleButtons = battleArena.querySelectorAll(".battle-button");
    setTimeout(() => {
        battleButtons.forEach(btn => btn.classList.add("show"));
    }, 10);

    let textResult = "";
    let colorBorder = "";
    let pointWinner = null;

    if(playersChoice === jokenpo){
        textResult = "Yuki também escolheu igual! Empate.";
        colorBorder = "gold";
        pointWinner = 'empate';
    }
    else if(
        (playersChoice === 0 && jokenpo === 2) ||
        (playersChoice === 1 && jokenpo === 0) ||
        (playersChoice === 2 && jokenpo === 1)
    ){
        textResult = "Yuki escolheu " + machineChoiceData.text + "! Você ganhou.";
        myScore++;
        pointWinner = 'player';
        colorBorder = "green";
    }
    else {
        textResult = "Yuki escolheu " + machineChoiceData.text + "! Você perdeu.";
        machineScore++;
        pointWinner = 'machine';
        colorBorder = "red";
    }

    resultJokenpo.value = textResult;
    resultJokenpo.style.borderColor = colorBorder;

    setTimeout(() => {
        battleButtons.forEach(btn => btn.classList.remove("show"));
        battleArena.classList.remove("active");

        setTimeout(() => {
            battleArena.innerHTML = `<img id="machineChoiceImg" src="" alt="Escolha da Yuki" width="90px" style="display: none;">`;
        }, 300);

        resultJokenpo.classList.add("animate-result");
        selectedButton.classList.add("animate-button-play");

        if (pointWinner === 'player') {
            myScoreInput.value = myScore;
            myScoreInput.classList.add("score-bump");
            setTimeout(() => myScoreInput.classList.remove("score-bump"), 500);
        }
        else if (pointWinner === 'machine'){
            machineScoreInput.value = machineScore;
            machineScoreInput.classList.add("score-bump");
            setTimeout(() => machineScoreInput.classList.remove("score-bump"), 500);
        }

        setTimeout(() => {
            resultJokenpo.classList.remove("animate-result");
            selectedButton.classList.remove("animate-button-play");
        }, 900);

    }, 1500);
}

buttonRock.addEventListener("click", () => play(0));
buttonPaper.addEventListener("click", () => play(1));
buttonScissors.addEventListener("click", () => play(2));