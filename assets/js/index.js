import {Animal, Leon, Lobo, Oso, Serpiente, Aguila} from "./Animal.js"

async function fetchAnimalesJSON(animalSelected) {
  const response = await fetch('../../animales.json');
  const animal = await response.json();

  for(let ani of animal.animales){
    
    if(ani.name == animalSelected){
      return ani;
    }
  }
}

let lista = document.getElementById("animal");
lista.addEventListener("change", function(){
  
  fetchAnimalesJSON(lista.value).then(animal => {
    console.log(animal);
    
    let cambiarImagen = document.getElementById("preview");
    cambiarImagen.innerHTML = "";
    var img = document.createElement("img");
    img.src = "assets/imgs/"+animal.imagen;
    img.classList.add("img-fluid");
    cambiarImagen.appendChild(img);
  });
});

/* capturar datos del form */

function capturarForm(){
  let animal = document.getElementById("animal").value;
  let edad = document.getElementById("edad").value;
  let comentarios = document.getElementById("comentarios").value;
  console.log(animal, edad, comentarios);
  if(animal == "Seleccione un animal" || edad == "Seleccione un rango de años " || comentarios == ""){
    alert("Falta informacion en algun campo");
    return;
  }
  let animales = document.getElementById("Animales");

  fetchAnimalesJSON(animal).then(function(a){
    let animalObj;
    if(animal == "Leon"){
      animalObj = new Leon(animal, edad, a.imagen, comentarios, a.sonido);
    }
    else if(animal == "Lobo"){
      animalObj = new Lobo(animal, edad, a.imagen, comentarios, a.sonido);
    }
    else if(animal == "Oso"){
      animalObj = new Oso(animal, edad, a.imagen, comentarios, a.sonido);
    }
    else if(animal == "Serpiente"){
      animalObj = new Serpiente(animal, edad, a.imagen, comentarios, a.sonido);
    }
    else if(animal == "Aguila"){
      animalObj = new Aguila(animal, edad, a.imagen, comentarios, a.sonido);
    }
    
    //creo la card
    let card = document.createElement("div");
    card.className = "card";
    card.style = "width: 18rem";

    //creo la img
    let imagenCard = document.createElement("img");
    imagenCard.className = "card-img-top";
    imagenCard.src = `assets/imgs/${animalObj.img}`;
    imagenCard.alt = "Animal Card Image";
    imagenCard.setAttribute("data-bs-toggle", "modal");
    imagenCard.setAttribute("data-bs-target", "#exampleModal");

    //creo la card body
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    //creo la p de la card text
    let cardText = document.createElement("p");
    cardText.className = "card-text";

    //creo la img del parlantito
    let imagenParlante = document.createElement("img");
    imagenParlante.id = "parlantito";
    imagenParlante.src = `assets/imgs/audio.svg`;
    imagenParlante.style = "width: 10%";
    imagenParlante.alt = "Parlantito";

    //creo la etiqueta de audio
    let etiquetaAudio = document.createElement("audio");
    etiquetaAudio.src = `assets/sounds/${animalObj.sonido}`;
    etiquetaAudio.id = "myAudio";

    //añado las tags al docu
    animales.appendChild(card);
    card.appendChild(imagenCard);
    card.appendChild(cardBody);
    cardBody.appendChild(cardText);
    cardText.appendChild(imagenParlante);
    cardText.appendChild(etiquetaAudio);

    /* para reproducir audio */
    imagenParlante.addEventListener("click", function(){
      StartOrStop(`assets/sounds/${animalObj.sonido}`);
    });

    /* Codigo para el modal */
    let fotoModal = document.getElementById("anim");
    let anioModal = document.getElementById("anios");
    let comentModal = document.getElementById("comments");

    fotoModal.src = `assets/imgs/${animalObj.img}`;
    anioModal.innerText = animalObj.edad;
    comentModal.innerText = animalObj.comentarios;

  });
}

/* boton form */
let boton = document.getElementById("btnRegistrar");
boton.addEventListener("click", function(){
  capturarForm();
  limpiarCampos();
});

function limpiarCampos(){
  document.getElementById("animal").value = "Seleccione un animal";
  document.getElementById("edad").value = "Seleccione un rango de años";
  document.getElementById("comentarios").value = "";
}

function StartOrStop(audioFile) {
  var audio = document.getElementById("myAudio");
  if (!audio.src || audio.src !== audioFile) audio.src = audioFile;
  if (audio.paused == false)
      audio.pause();
  else
      audio.play();
}
