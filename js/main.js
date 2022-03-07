const mode = document.getElementById('mode');
const gameField = document.getElementById('game-field');
const score = document.getElementById('score');
let quantity = 16;

document.getElementById('play-button').addEventListener('click', startGame);

function startGame(){
    createField(chooseMode(mode.value));
}

function chooseMode(mode){
    let fieldSize;
    switch(mode){
        case 'facile' :
            fieldSize = 100;
            break;
        case 'normale' :
            fieldSize = 81;
            break;
        case 'difficile' :
            fieldSize = 49;
            break;    
    }
    return fieldSize;
}

function randomNumber(spectrum , start){
    let num = (Math.floor(Math.random()*spectrum )+ start);
    return num;
}

function bombSpots(quantity,size){
    const bombs=[];
    for(let i = 0 ; i<quantity ; i++){
        num = randomNumber(size,1);
        if(bombs.includes(num)){
            i--;
        }else{
            bombs[i] = num;
        }
    }
    for(let i =0; i<quantity; i++){
        console.log(bombs[i]);
    }
    return bombs;
}


function createField(size){
    gameField.innerHTML = '';
    let scoreCounter=0;
    const bombs = bombSpots(quantity,size);
    for(let i=0;i<size;i++){
        const newBox = document.createElement('div');
        newBox.classList.add('box');
        newBox.style.height = "calc(100% / "+ Math.sqrt(size)+")";
        newBox.style.width = "calc(100% / "+ Math.sqrt(size)+")";
        newBox.innerHTML= i+1;
        gameField.appendChild(newBox);
        newBox.addEventListener('click', function(){
            console.log(this);
            if(!bombs.includes(parseInt(newBox.innerHTML))){
                newBox.classList.add('safe');
                scoreCounter++;
                score.innerHTML = "Punteggio : <span class='fw-bold fs-1 text-primary'> "+ scoreCounter +"</span>" ;
            }
            else{
                for(let i=0;i<bombs.length;i++){
                    document.querySelector("#game-field .box:nth-child("+bombs[i]+")").classList.add('bomb');
                }
                score.innerHTML = "<span class='fw-bold fs-2 text-danger'>Hai Perso!</span><br> Il tuo punteggio è :<span class='fw-bold fs-1 text-primary'> " + scoreCounter+"</span>" ;
            }
        });
    }
}