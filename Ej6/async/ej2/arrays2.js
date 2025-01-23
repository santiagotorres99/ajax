function mostrarNumeroElementos(array) {
    return array.length;
}

function mostrarManera(array){
    let respuesta=prompt("Elige una opción: \n1. Mostrar original \n2. Mostrar del revés \n3. Mostrar por orden alfabético");
    if(respuesta==1){
        return "Posicion actual: "+mostrarTodosElementos(array);
    }else if(respuesta==2){
        return "Posicion del reves: "+mostrarElementosReverso(array);
    }else if(respuesta==3){
        return "Posicion alfabeticamente: "+mostrarElementosOrdenados(array);
    }else{
        return "Opcion no valida";
    }
}

function añadir(array){
    let respuesta=prompt("Lo quieres añadir al \n1. Principio \n2. Final");
    if(respuesta==1){
        let elemento=prompt("Añade al principio");
        return "Se ha añadido al principio: "+anadirElementoAlPrincipio(array,elemento);
    }else if(respuesta==2){
        let elemeto=prompt("Añade al final:");
        return "Se ha añadido al final: "+anadirElementoAlFinal(array,elemeto);
    }else{
        return "Opcion no valida";
    }
}

function borrar(array){
    let respuesta=prompt("Quieres borrar al \n1. Principio \n2. Final");
    if(respuesta==1){
        return "Se ha borrado al principio: "+borrarElementoAlPrincipio(array);
    }else if(respuesta==2){
        return "Se ha borrado al final: "+borrarElementoAlFinal(array);
    }else{
        return "Opcion no valida";
    }
}

function buscar(array){
    let respuesta=prompt("quieres buscarlos por \n1. Posicion \n2. Nombre");

    if(respuesta==1){
        let posicion=prompt("Que posicion?");
        return "El elemento de la posicion "+posicion+" es: "+mostrarElementoPorPosicion(array,posicion);
    }else if(respuesta==2){
        let elemento=prompt("Cual es su nombre?");
        return "El elemento "+elemento+" esta en la posicion: "+mostrarPosicionDeElemento(array,elemento);
    }else{
        return "Opcion no valida";
    }
}

function mostrarTodosElementos(array) {
    return array;
}

function mostrarElementosReverso(array) {
    return array.slice().reverse();
}

function mostrarElementosOrdenados(array) {
    if(typeof array[0]!=='object'){
        return array.slice().sort();
    }else{
        return array.sort((a,b)=>a.nombre.localeCompare(b.nombre));
    }
}

function anadirElementoAlPrincipio(array, elemento) {
    array.unshift(elemento);
    return elemento};

function anadirElementoAlFinal(array, elemento) {
    array.push(elemento);
    return elemento;
}

function borrarElementoAlPrincipio(array) {
    const borrado = array.shift();
    return borrado;
}

function borrarElementoAlFinal(array) {
    const borrado = array.pop();
    return borrado;
}

function mostrarElementoPorPosicion(array, posicion) {
    if (posicion >= 0 && posicion < array.length) {
        return array[posicion];
    } else {
        return "Posición no válida";
    }
}

function mostrarPosicionDeElemento(array, elemento) {
    const posicion = array.indexOf(elemento);
    if (posicion !== -1) {
        return posicion;
    } else {
        return elemento+" no se encuentra en la lista";
    }
}
export{
    mostrarNumeroElementos,anadirElementoAlFinal,anadirElementoAlPrincipio,añadir,borrar,borrarElementoAlFinal,borrarElementoAlPrincipio,buscar,mostrarElementoPorPosicion,
    mostrarElementosOrdenados,mostrarElementosReverso,mostrarManera,mostrarPosicionDeElemento,mostrarTodosElementos
}