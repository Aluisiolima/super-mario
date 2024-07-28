const mario = document.querySelector(".mario");
const tubo = document.querySelector(".tubo");
const castelo = document.querySelector(".castelo");
const nuvem = document.querySelector(".nuvem");
const game = document.querySelector(".game");
const sol = document.querySelector(".sol");
const lua = document.querySelector(".lua");
const musica = document.getElementById('musica');
const musica2 = document.getElementById('musica2');
const perdeu = document.getElementById('gameover');
const vitoria = document.getElementById('vitoria');
let contagem = 0;
const contador = document.getElementById("contar");
const up = document.getElementById('up');
var  hack = true;

function jump(){
    mario.classList.add('pulo');
    setTimeout(() => {
        mario.classList.remove('pulo');
    }, 400);
}
function começa(){
    tubo.classList.add('t');
    nuvem.classList.add('n');
    musica.play();
}

function sistemaDeDerrotar(){
    const tuboPosiçao = tubo.offsetLeft;
    const nuvemPosiçao = nuvem.offsetLeft;
    const marioPosiçao = +window.getComputedStyle(mario).bottom.replace('px','');

    if(tuboPosiçao <= 120 && tuboPosiçao > 0 && marioPosiçao < 80 && hack){
      
        tubo.style.animation = 'none';
        tubo.style.left = `${tuboPosiçao}px`;
        mario.style.animation = 'none';
        mario.style.left = `${marioPosiçao}px`;
        mario.src = '../img/game-over.png';
        mario.style.width = '80px';
        mario.style.marginLeft = '50px'
        nuvem.style.animation = 'none';
        nuvem.style.left = `${nuvemPosiçao}px`;
        musica.pause();
        musica2.pause();
        perdeu.play();

    }
}

document.addEventListener('keydown', function(b){
    if(b.keyCode === 88){
        jump();
    }
})
document.addEventListener('keydown', function(event){
    if(event.keyCode === 65){
        location.reload();
    }
})


tubo.addEventListener( 'animationiteration',()=>{
    contagem++;
    contador.textContent = contagem;
});

function segundoTempo(){
    if(contagem === 7){
        musica.pause();
        game.style.background = 'linear-gradient(black,rgba(4, 4, 142, 0.78))';
        solua();

        setTimeout(()=> {
            lua.style.display = 'flex';
            lua.classList.add('anlua');
        }, 1000);  
          
        setTimeout(()=>{musica2.play();}, 3000)
        setTimeout(()=>{
             document.querySelector('.t').style.animationDuration = '0.7s';
             document.querySelector('.pulo').style.animationDuration = '0.4s';
        }, 2500);
       

    }
}
function solua(){
    sol.classList.add('ansol');

    setTimeout(
        ()=>{sol.classList.remove('ansol');
        sol.style.display= 'none';},1000);
}
function upgrade(){
    if(contagem === 40){
        tubo.classList.remove('t');
        tubo.style.display = 'none';
        musica.pause();
        musica2.pause();
        perdeu.pause();
        vitoria.play();
        castelo.style.display = 'block';
        castelo.classList.add('v');
    } 
    const casteloPosicao = castelo.offsetLeft;
    const nuvemPosicao = nuvem.offsetLeft;
    const marioPosicao = +window.getComputedStyle(mario).bottom.replace('px','');

    if(casteloPosicao <= -20 && marioPosicao < 8000){
        castelo.style.animation = 'none';
        castelo.style.left = `${casteloPosicao}px`;   

        nuvem.style.animation = 'none';
        nuvem.style.left = `${nuvemPosicao}px`;
        up.style.display = 'block';
    }
}


setInterval(segundoTempo ,10);
setInterval(sistemaDeDerrotar, 10);
setInterval(upgrade, 10);