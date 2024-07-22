const mario = document.querySelector('.mario');
const pipe = document.querySelector('.tubo');
const nuvem = document.querySelector(".nuvem");
const inicio = document.querySelector('.começa');
const up = document.getElementById("up");
var audio = document.getElementById("musica");
var gameover = document.getElementById("gameover");
var vitoria = document.getElementById('vitoria');
const castelo = document.querySelector('.castelo');

function jump() {
    mario.classList.add('jump'); 
    
    setTimeout(() => {
        
        mario.classList.remove('jump'); 
        
    }, 500);     
}
    function começa(){
    pipe.classList.add('t');
    nuvem.classList.add('n');
    audio.play();
    inicio.style.display = 'none';
}
function loop(){   
  const pipePosition = pipe.offsetLeft;
  const nuvemPosition = nuvem.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');
 

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80 ){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;   

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        nuvem.style.animation = 'none';
        nuvem.style.left = `${nuvemPosition}px`;
        mario.src = '/fotos/game-over.png';
        mario.style.width = '80px';
        mario.style.marginLeft = '50px';
        audio.pause(); 
        gameover.play();
    }
}

setInterval( loop, 10);

document.addEventListener('keydown', function(event){
    if(event.keyCode === 88){
       jump();
    }
});

document.addEventListener('keydown', function(event) {

    if (event.keyCode === 65) {
    location.reload();     
    }
});
//essa parte serve para que conte quantas vezes vc pulou o tubo e se ja pode passa de fase obz:20 pulos proxima fase
let contagem = 0;
const contador = document.getElementById('contar');
pipe.addEventListener('animationiteration', () => {
  contagem++;
  contador.textContent = contagem ;
});
function upgrade(){

    if(contagem === 20){
        pipe.classList.remove('t');
        pipe.style.display = 'none';
        audio.pause();
        gameover.pause();
        vitoria.play();
        castelo.style.display = 'flex';
        castelo.classList.add('v');

    } 
    
    const casteloPosition = castelo.offsetLeft;
    const nuvemPosition = nuvem.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');


    if(casteloPosition <= -20 && marioPosition < 8000 ){
        castelo.style.animation = 'none';
        castelo.style.left = `${casteloPosition}px`;   

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        nuvem.style.animation = 'none';
        nuvem.style.left = `${nuvemPosition}px`;
        up.style.display = 'block';
     }
    
}
setInterval(upgrade, 10);