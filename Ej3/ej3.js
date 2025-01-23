const totalCartas = 12;
let cartas = [];
let seleccionCarta = [];
let valoresUsados = [];
let movimiento = 0;
let aciertos = 0; 
let imagenes=[];
const a = {img:"",email:""};


(()=>{
    
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xml = xhr.responseXML;
            const personas = xml.querySelectorAll("results")
            personas.forEach((p)=>{
                imagenes.push({img:p.querySelector("medium"),email:p.querySelector("email")});
            })
            for (let i = 0; i < imagenes.length; i++) {
                let div1 = document.createElement('div');
                let div2 = document.createElement('div');
                div1.innerHTML = crearCarta(i);
                div2.innerHTML = crearCarta(i);
                div1.querySelector('.carta').addEventListener('click', activada);
                div2.querySelector('.carta').addEventListener('click', activada);
                cartas.push(div1);
                cartas.push(div2);
                imprimir();
            }
        }
    })
    xhr.open("GET","https://randomuser.me/api/?results=6&format=XML",true)
    xhr.send()
})()


function crearCarta(num) {
    return `<div class="carta"><div class="reverso"></div><div class="cara" numero="${num > 6 ? num - 6 : num}" ><img src="${imagenes[num].img.textContent}"/></div></div>`;
}

function activada(e) {
    if (movimiento < 2) {
        e.target.classList.add('active');

        if (!seleccionCarta[0] || seleccionCarta[0] !== e.target) {
            seleccionCarta.push(e.target);

            if (++movimiento == 2) {
                if (seleccionCarta[0].querySelectorAll('.cara')[0].getAttribute("numero") === seleccionCarta[1].querySelectorAll('.cara')[0].getAttribute("numero")) {
                    aciertos++; 
                    document.querySelector('#empezar').innerHTML = aciertos + ' aciertos';
                    seleccionCarta = [];
                    movimiento = 0;
                } else {
                    setTimeout(() => {
                        seleccionCarta[0].classList.remove('active');
                        seleccionCarta[1].classList.remove('active');
                        seleccionCarta = [];
                        movimiento = 0;
                    }, 600);
                }
            }
        }
    }
}



function imprimir() {
    cartas.sort(() => Math.random() - 0.5);
    cartas.forEach((carta) => {
        document.querySelector('#juego').append(carta);
    });
}