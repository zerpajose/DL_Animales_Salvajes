class Animal {
  constructor(nombre, edad, img, comentarios, sonido){
    this.nombre = nombre;
    this.edad = edad;
    this.img = img;
    this.comentarios = comentarios;
    this.sonido = sonido;
  }

  getNombre(){
    return this.nombre
  }
  getEdad(){
    return this.edad
  }
  getImg(){
    return this.img
  }
  getSonido(){
    return this.sonido
  }
  setComentarios(comentarios){
    this.comentarios = comentarios;
  }
}

class Leon extends Animal{
  constructor(nombre, edad, img, comentarios, sonido){
    super(nombre, edad, img, comentarios, sonido);
  }
  rugir(){

  }
}

class Lobo extends Animal{
  aullar(){

  }
}

class Oso extends Animal{
  grunir(){
    
  }
}

class Serpiente extends Animal{
  sisear(){
    
  }
}

class Aguila extends Animal{
  chillar(){
    
  }
}

export {
  Animal,
  Leon,
  Lobo,
  Oso,
  Serpiente,
  Aguila
}
