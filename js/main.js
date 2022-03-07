const mode = document.getElementById('mode');
const gameField = document.getElementById('game-field');
document.getElementById('play-button').addEventListener('click', startGame);
let quantity = 16;

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
    const bombs = bombSpots(quantity,size);
    for(let i=0;i<size;i++){
        const newBox = document.createElement('div');
        newBox.classList.add('box');
        newBox.style.height = "calc(100% / "+ Math.sqrt(size)+")";
        newBox.style.width = "calc(100% / "+ Math.sqrt(size)+")";
        newBox.innerHTML= i+1;
        gameField.appendChild(newBox);
        newBox.addEventListener('click', function(){
            if(!bombs.includes(parseInt(this.innerHTML))){
                this.classList.add('safe');
            }
            else{
                this.classList.add('bomb');
            }
        });
    }
}