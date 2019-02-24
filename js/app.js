import *as UI from './interfaz.js'
import {API} from './api.js';

UI.formularioBuscar.addEventListener('submit', (e) =>{
    e.preventDefault();

    //Obtener datos del formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value

          if(artista === '' || cancion === ''){
              //El usuario muestra los campos vacios, mostrar error
              UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
              UI.divMensajes.classList.add('error');

              setTimeout(()=>{
                UI.divMensajes.innerHTML = '';
              UI.divMensajes.classList.remove('error');
              }, 3000);
          }else{
              //El formulario esta conmpleto, realizar consulta a la API
              const api = new API(artista,cancion);
              api.consultarAPI()
              .then (data => {
                if(data.respuesta.lyrics){
                    //La cancion existe
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                } else{
                    //lA CANCION NO EXISTE
                    UI.divMensajes.innerHTML = 'La cancion no existe prueba con otra busqueda';
              UI.divMensajes.classList.add('error');
              UI.formularioBuscar.reset();

              setTimeout(()=>{
                UI.divMensajes.innerHTML = '';
              UI.divMensajes.classList.remove('error');
              }, 3000);
                }
              });
          }
});