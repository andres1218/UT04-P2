"use strict";

let galeria = new Gallery();
console.log("Creo la galería: " + galeria.title);

//Creo tres coordenadas para las imagenes
let coord1 = new Coords(11111, 22222);
let coord2 = new Coords(22222, 55555);
let coord3 = new Coords(33333, 77777);

let imagen1 = new Image("perro", "Un perro", "perro.com/img", coord1);
console.log("Creo una imagen: ");
console.log(imagen1);

let retrato1 = new Portrait("yo", "", "instagram.com/me", coord2);
console.log("Creo una imagen de retrato: ");
console.log(retrato1);

let paisaje1 = new Landscape("lago", "Peralvillo", "peralvillo.es/pantano");
console.log("Creo una imagen de paisaje: ");
console.log(paisaje1);

let categoria1 = new Category("Rural", "Fotos de campo");
console.log("Creo la categoria rural: ");
console.log(categoria1);

let categoria2 = new Category("Viajes", "Fotos de Viajes");
console.log("Creo la categoria viajes: ");
console.log(categoria2);

let autor1 = new Author("andres12", "andres.12.fer@gmail.com", "andy.jpg");
console.log("Me creo como autor: ");
console.log(autor1);

//Agregamos imagen a la galeria.
console.log("Tamaño de la galería tras añadir imagen: " + galeria.addImage(retrato1));

console.log("Compruebo que se ha utilizado la categoría por defecto: ");
console.log(galeria.getCategories());

console.log("Compruebo que se ha utilizado el autor por defecto: ");
console.log(galeria.getAuthors());

//Agregamos imagen a la galeria.
console.log("Tamaño de la galería tras añadir imagen (perro): " + galeria.addImage(imagen1, categoria1, autor1));
console.log("Las imagenes de la categoria rural: ");
console.log(galeria.getCategoryImages(categoria1));
console.log("Las imagenes de las que soy el autor: ");
console.log(galeria.getAuthorImages(autor1));

//Agregamos imagen a la galeria.
console.log("Tamaño de la galería tras añadir imagen (paisaje): " + galeria.addImage(paisaje1, categoria2));
console.log("Las imagenes de la categoria viajes: ");
console.log(galeria.getCategoryImages(categoria2));
console.log("Las imagenes sin autor: ");
console.log(galeria.getAuthorImages());

console.log("Fotos de retrato: ");
console.log(galeria.getPortraits());

console.log("Fotos de paisajes: ");
console.log(galeria.getLandscapes());