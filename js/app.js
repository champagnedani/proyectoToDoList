//VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//EVENTSLISTENERS
eventsListeners();
function eventsListeners(){
    formulario.addEventListener('submit', agregarTweet);
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}

//FUNCIONES

function agregarTweet(e){
    limpiarHTML();
    e.preventDefault();
    const textArea = document.querySelector('#tweet').value;
    if(textArea === ''){
        mostrarError('El mensaje no puede ir vacio');
        return;
    }

const tweetObj = {
    id: Date.now(),
    texto: textArea
}

tweets = [...tweets, tweetObj]
console.log(tweets)

crearHTML();
formulario.reset();
}

function mostrarError(error){
    //CREAR ELEMENTO ALERTA DEL ERROR
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    //INSERTARLO EN EL HTML
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);
    //DARLE TIEMPO
    setTimeout( () => {
        mensajeError.remove();
    }, 3000)
}

function crearHTML(){
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach( tweet => {
            
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.textContent = 'X'

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li')
            li.textContent = tweet.texto
            listaTweets.appendChild(li)
            li.appendChild(btnEliminar)

            
        } )
    }

sincronzarStorage()

}

function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id)
    crearHTML();
}

function sincronzarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

