//Variables

const carrito = document.querySelector('#carrito');

const contenedorCarrito = document.querySelector('#lista-carrito tbody'); //Donde se agregaran

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    
    //Cuando eliminas un curso 
     carrito.addEventListener('click', eliminarCurso);

    //Cuando vacias el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{

        limpiarHTML();//Eliminamos todo el HTML
    });
}

//Funciones
function agregarCurso(e){
    e.preventDefault(); //Para que no se vaya arriba
    if(e.target.classList.contains('agregar-carrito')){ //Si el elemnto tiene 'agregar-ca.'
        const cursoSeleccionado = e.target.parentElement.parentElement;
        //Accedemos a todo el div
        leerDatosCurso(cursoSeleccionado);
    }
    
}

//Elimina Curso
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML(); //Iterar sobre el carrito y mostrar el HTML
    }
}







//Leer el contenido del HTML al que le dimos click y extrae la informacion
function leerDatosCurso(curso){
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya exsitse en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Returna el objeto actualizado
            }else{
                return curso; //Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agrega elementos al arreglo
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de compras en el html
function carritoHTML(){


    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera HTML
    articulosCarrito.forEach( (curso) =>{
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `;

        //Agrega el HTML del carrito en el tboddy
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML = ''

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}