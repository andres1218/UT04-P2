"use strict";

//LOS ATRIBUTOS SON "PRIVADOS", YA QUE NO DEBERÍA ACCEDERSE A ELLOS SI TIENEN EL "_"
//HE DICIDIDO HACERLO ASÍ YA QUE LO VEO UNA OPCIÓN POCO TEDIOSA Y CLARA PARA ES6,
//YA QUE EL USO DE # COMO PRIVADO NO ES FUNCIONAL EN TODOS LOS NAEGADORES.
//DESDE MI PUNTO DE VISTA SI TUVIERA QUE HACER UNA APLICACIÓN SEGURA, UTILIZARÍA ES5.

//Clase para crear UNA galería (solo puede haber UNA (singleton))
class Gallery{

    static instance; //undefined por defecto
    defaultCategory = new Category("Default");  //Categoría por defecto
    defaultAuthor = new Author("Unknown", "none");  //Autor por defecto

    constructor(title = "Mi Galería"){
        if(!!Gallery.instance){   //Si existe la instancia
            return Gallery.instance;    //La devuelvo
        }
        //Sino, la creo y la asigno.
        Gallery.instance = this;
        this._title = title;
        this._images = [];
        this._categories = [];
        this._authors = [];
        this._portraits = [];
        this._landscapes = [];
    }

    get title(){
        return this._title;
    }
    set title(title){
        if(!title){
            throw new EmptyValueException("title");
        }
        this._title = title;
    }

    //Iterador de categories
    get categories(){
        let nextIndex = 0;
        let array = this._categories;
        return{
            next: function(){
                return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} :
                {done: true};
            }
        }
    }

    //Iterador de authors
    get authors(){
        let nextIndex = 0;
        let array = this._authors;
        return{
            next: function(){
                return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} :
                {done: true};
            }
        }
    }

    //Iterador de images
    get images(){
        let nextIndex = 0;
        let array = this._images;
        return{
            next: function(){
                return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} :
                {done: true};
            }
        }
    }

    //Iterador de portraits
    get portraits(){
        let nextIndex = 0;
        let array = this._portraits;
        return{
            next: function(){
                return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} :
                {done: true};
            }
        }
    }

    //Iterador de Landscape
    get landscapes(){
        let nextIndex = 0;
        let array = this._landscapes;
        return{
            next: function(){
                return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} :
                {done: true};
            }
        }
    }

    //Método que devuelve array de los Objetos Category con uso del iterador
    getCategories(){
        let iterator = this.categories;
        let category = iterator.next();
        let categories = [];
        while(!category.done){
            categories.push(category.value);
            category = iterator.next();
        }
        return categories;
    }
    //Método que devuelve array de los Objetos Author con uso del iterador
    getAuthors(){
        let iterator = this.authors;
        let author = iterator.next();
        let authors = [];
        while(!author.done){
            authors.push(author.value);
            author = iterator.next();
        }
        return authors;
    }

    //Método que devuelve array de los Objetos Portrait con uso del iterador
    getPortraits(){
        let iterator = this.portraits;
        let portrait = iterator.next();
        let portraits = [];
        while(!portrait.done){
            portraits.push(portrait.value);
            portrait = iterator.next();
        }
        return portraits;
    }

    //Método que devuelve array de los Objetos Lansdcape con uso del iterador
    getLandscapes(){
        let iterator = this.landscapes;
        let landscape = iterator.next();
        let landscapes = [];
        while(!landscape.done){
            landscapes.push(landscape.value);
            landscape = iterator.next();
        }
        return landscapes;
    }

    //Método que devuelve un array con las imágenes del autor recibido,
    //de no recibir ninguno, devolverá las del autor por defecto.
    getAuthorImages(author = this.defaultAuthor){
        if(author == null){
            throw new NullValueException("author");
        }
        let iterator = this.images;
        let image = iterator.next();
        let images = [];
        while(!image.done){
            if(Object.values(image.value)[1] == author.nickname){
                images.push(Object.values(image.value)[0]);
            }
            image = iterator.next();
        }
        return images;
    }

    //Método que devuelve un array con las imágenes de la categoría recibida,
    //de no recibir ninguna, devolverá las de la categoría por defecto.
    getCategoryImages(cat = this.defaultCategory){
        if(cat == null){
            throw new NullValueException("category");
        }
        let iterator = this.categories;
        let category = iterator.next();
        let images = [];
        while(!category.done){
            if(Object.values(category.value)[0] == cat){
                images.push(Object.values(category.value)[1]);
            }
            category = iterator.next();
        }
        return images;
    }

    //Método que agrega una categoría
    addCategory(category){
        if(category == null){   //No sea null
            throw new NullValueException("category");
        }
        if(this._categories.indexOf(category) >= 0){   //Que no exista ya
            throw new ExistentValueException("category");
        }
        return this._categories.push({
            cat: category,
            img: [] //La agrega con un array vacío para las img
        });
    }

    //Método para eliminar una categoría de la galería
    removeCategory(category){
        let index = this.getCategoryPosition(category);
        if(index == -1){   //Debe existir
            throw new NonExistentValueException("category");
        }
        this._categories.splice(index,1);
        return this._categories.length;
    }

    //Método para eliminar una imagen de la galería
    removeImage(image){
        let index = this.getImagePosition(image);
        if(index == -1){    //Debe existir
            throw new NonExistentValueException("image");
        }
        this._images.splice(index,1);
        return this._images.length;
    }

    //Método para conocer la posición de una categoría en el array
    getCategoryPosition(category){
        if(!(category instanceof Category)){    //Debe ser una categoría
            throw new NonCategoryException(category);
        }
        return this._categories.findIndex(x => x.cat === category);
    }

    //Método para conocer la posiciónd de una imagen en el array
    getImagePosition(image){
        if(!(image instanceof Image)){  //Deber ser una imagen
            throw new NonCategoryException(image);
        }
        return this._images.findIndex(x => x.img === image);
    }

    //Método para agregar un autor a la galería
    addAuthor(author){
        if(author == null){     //No puede ser null
            throw new NullValueException("author");
        }
        if(this._authors.indexOf(author) >= 0){     //No debe existir
            throw new ExistentValueException("author");
        }
        return this._authors.push(author);
    }

    //Método para eliminar un autor del array
    removeAuthor(author){
        let index = this._authors.indexOf(author);
        if(index == -1){    //Debe existir
            throw new NonExistentValueException("author");
        }
        this._authors.splice(index,1);
        return this._authors.length;
    }

    //Método que agrega una imagen a la galería 
    addImage(image, category = this.defaultCategory, author = this.defaultAuthor){
        if(image == null){  //No puede ser null
            throw new NullValueException("image");
        }
        
        if(this._authors.indexOf(author) == -1){
            this.addAuthor(author);     //Si el autor no estaba agregado, lo agrego
        }
        
        this._images.push({     //Añado la imagen a la galería
            img: image,
            aut: author.nickname
        });

        //Si la imagen en tipo Landscape o Portrait, las agregos a sus respectivos arrays
        if(image instanceof Portrait){
            this._portraits.push(image);
        }else if(image instanceof Landscape){
            this._landscapes.push(image);
        }

        let find = false;
        let index = 0;
        while(!find && this._categories.length > index){    //Mientras no encuentre la categoria, y el índice permanezca dentro de los límites.
            if(Object.values(this._categories[index])[0] == category){     //Si la categoría ya existe en el array    
                this._categories[index].img.push(image);     //Agrego la imagen enm diha categoría   
                find = true;
                return this._images.length;
            }
            index++;
        }
        if(!find){  //Si no la encontré (la categoría en el array, (no existía))
            this._categories.push({ //Agrego la categoría y la imagen
                cat: category,
                img: [image]
            });
        }
        return this._images.length;
    }
}


//Clase para crear categorías (title obligatorio)
class Category{
    constructor(title, description){
        if(!title){
            throw new EmptyValueException("title");
        }else{
            this._title = title;
        }

        this._description = description;
    }

    get title(){
        return this._title;
    }
    set title(title){
        if(!title){
            throw new EmptyValueException("title");
        }
        this._title = title;
    }

    get description(){
        return this._description;
    }
    set description(description){
        this._description = description;
    }
}


//Clase para crear imágenes (title y url obligatorios)
class Image{
    constructor(title, description, url, coords){
        if(!title){
            throw new EmptyValueException("title");
        }else{
            this._title = title;
        }

        this._description = description;

        if(!url){
            throw new EmptyValueException("url");
        }else{
            this._url = url;
        }

        this._coords = coords;
    }

    get title(){
        return this._title;
    }
    set title(title){
        if(!title){
            throw new EmptyValueException("title");
        }
        this._title = title;
    }

    get description(){
        return this._description;
    }
    set description(description){
        this._description = description;
    }

    get url(){
        return this._url;
    }
    set url(url){
        if(!url){
            throw new EmptyValueException("url");
        }
        this._url = url;
    }

    get coords(){
        return this._coords;
    }
    set coords(coords){
        this._coords = coords;
    }
}


//Clase para crear autores (Nickname y email obligatorios)
class Author{
    constructor(nickname, email, avatar){
        if(!nickname){
            throw new EmptyValueException("nickname");
        }
        this._nickname = nickname;

        if(!email){
            throw new EmptyValueException("email");
        }
        this._email = email;

        this._avatar = avatar;
    }

    get nickname(){
        return this._nickname;
    }
    set nickname(nickname){
        if(!nickname){
            throw new EmptyValueException("nickname");
        }
        this._nickname = nickname;
    }

    get email(){
        return this._email;
    }
    set email(email){
        if(!email){
            throw new EmptyValueException("email");
        }
        this._email = email;
    }

    get avatar(){
        return this._avatar
    }
    set avatar(avatar){
        this._avatar = avatar;
    }
}


//Clase para crear una Image(Padre) Landscape
class Landscape extends Image{
    constructor (title, description, url, coords){
        super(title, description, url, coords);
    }
       
}


//Clase para crear una Image(Padre) Portrait
class Portrait extends Image{
    constructor (title, description, url, coords){
        super(title, description, url, coords);
    }
}


//Clase para crear unas coordenadas (latitude y longitude obligatorios)
class Coords{
    constructor(latitude, longitude){
        if(!latitude){
            throw new EmptyValueException("latitude");
        }
        this._latitude = latitude;

        if(!longitude){
            throw new EmptyValueException("longitude");
        }
        this._longitude = longitude;
    }

    get latitude(){
        return this._latitude;
    }
    set latitude(latitude){
        if(!latitude){
            throw new EmptyValueException("latitude");
        }
        this._latitude = latitude;
    }

    get longitude(){
        return this._longitude;
    }
    set longitude(longitude){
        if(!longitude){
            throw new EmptyValueException("longitude");
        }
        this._longitude = longitude;
    }
}


//EXCEPCIONES
//Excepción Base
class BaseException extends Error {
    constructor (message = "", fileName, lineNumber){
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException)
        }
    }
}

//Excepción personalizada para indicar valores vacíos.
class EmptyValueException extends BaseException {
    constructor (param, fileName, lineNumber){
        super("Error: The parameter " + param + " can't be empty.", fileName,lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

//Excepción personalizada para indicar valores nulos.
class NullValueException extends BaseException {
    constructor (param, fileName, lineNumber){
        super("Error: The parameter " + param + " can't be null.", fileName,lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

//Excepción personalizada para indicar que un valor ya existe
class ExistentValueException extends BaseException {
    constructor (param, fileName, lineNumber){
        super("Error: The parameter " + param + " can't be repeated.", fileName,lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

//Excepción personalizada para indicar que un valor no existe
class NonExistentValueException extends BaseException {
    constructor (param, fileName, lineNumber){
        super("Error: The parameter " + param + " doesn't exist.", fileName,lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}

//Excepción personalizada para indicar que un valor no es una categoría
class NonCategoryException extends BaseException {
    constructor (param, fileName, lineNumber){
        super("Error: The parameter " + param + " isn't a Category.", fileName,lineNumber);
        this.param = param;
        this.name = "EmptyValueException";
    }
}