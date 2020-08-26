// Declaramos las variables mediante el ID

// Variables del sistema API
const boton = document.getElementById('boton');
const datos = document.getElementById('datos');
const boton_responsive = document.getElementById('boton_responsive');
//

// Variables del formulario
const botonBorrar = document.getElementById('borrar_Dato');
let container_Datos = document.getElementById('container_datos');
let arrayDatos = [];
//

// Función para llamar los recursos de la API
const traerDatos = (e) => {
  e.preventDefault();
  let url = `https://api.namefake.com/`;
  const api = new XMLHttpRequest();
  api.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
        let nombre = `${data.name}`+' '+`${data.maiden_name}`;
        let correo = `${data.email_u}`+`${data.email_url[2]}`+`@namefake.com`;
        datos.innerHTML = `
          <p class="m-1 p-0">Nombre:<b> ${nombre}</b></p>
          <p class="m-1 p-0">Apellido:<b> ${data.maiden_name}</b></p>
          <p class="m-1 p-0">Fecha de nacimiento:<b> ${data.birth_data}</b></p>
          <p class="m-1 p-0">Dirección:<b> ${data.address}</b></p>
          <p class="m-1">Télefono:<b> ${data.phone_h}</b></p>
          <p class="m-1">Corréo electrónico:<b> ${correo}</b></p>
          <p class="m-1">Tarjeta de crédito:<b> ${data.plasticcard}</b></p>
          <p class="m-1">Vence:<b> ${data.cardexpir}</b></p>
          <p class="m-1">CVV2:<b> ${data.bonus}</b></p>
        `
    }
  }

  api.open('GET', url, true);
  api.send();

}
//

// Eventos para llamar la misma funcion con diferentes ID de botones
boton.addEventListener('click', traerDatos);
boton_responsive.addEventListener('click', traerDatos);
//

// Objeto para almacenar los datos introducidos dentro del formulario
const crearDatos = (nombre, fecha, correo, direccion, telefono, tarjeta, fechaEX) => {
  let item = {
    nombre: nombre,
    fecha: fecha,
    correo: correo,
    direccion: direccion,
    telefono: telefono,
    tarjeta: tarjeta,
    fechaEX: fechaEX
  }
  arrayDatos.push(item);
  return item;
}
//

// Función para guardar los datos dentro del LocalStorage
const GuardarDB = () => {
  localStorage.setItem('datos', JSON.stringify(arrayDatos));
  mostrarDatos();
}
//

// Función para eliminar los datos del LocalStorage
const EliminarDB = (nombre) => {
  let data;
  arrayDatos.forEach((element, index) => {
    if (element.nombre === nombre) {
          data = index;
    }
  })

  arrayDatos.splice(data,1)
  GuardarDB();
}
//

// Función para mostrar los datos del formulario a pantalla
const mostrarDatos = () => {
  container_Datos.innerHTML = '';
  arrayDatos = JSON.parse(localStorage.getItem('datos'));
  if(arrayDatos === null){
    arrayDatos = [];
  }else {
    arrayDatos.forEach(element => {
      container_Datos.innerHTML += `
      
      <div class="pt-2">
        <p class="m-0">NC: ${element.nombre}</p>
        <p class="m-0">FN: ${element.fecha}</p>
        <p class="m-0">DC: ${element.direccion}</p>
        <p class="m-0">TL: ${element.telefono}</p>
        <p class="m-0">CE: ${element.correo}</p>
        <p class="m-0">TC: ${element.tarjeta}</p>
        <p class="m-0">FE: ${element.fechaEX}</p>
        <button class="btn btn-danger mt-2">Borrar datos</button>
      </div>
      <hr>
      
      `
    })
  }
}
//

/* Función de click dentro del formulario para recibir
los valores de cada INPUT y guardarlos dentro del LocalStorage*/
const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', function(e){
  e.preventDefault();
  let error = document.getElementById('error');
  let nombre = document.getElementById('nombre').value;
  let fecha = document.getElementById('fecha').value; 
  let correo = document.getElementById('correo').value; 
  let direccion = document.getElementById('direccion').value; 
  let telefono = document.getElementById('telefono').value; 
  let tarjeta = document.getElementById('tarjeta').value; 
  let fechaEX = document.getElementById('fechaEX').value;
  if (nombre, fecha, correo, direccion, telefono, tarjeta, fechaEX === '') {
    error.innerHTML = '<p class="lead alert-danger p-4 border border-danger">Rellena todos los campos</p>';
    alert('Recuerda llenar todos los datos');
  }else {
    error.innerHTML = '';
    crearDatos(nombre, fecha, correo, direccion, telefono, tarjeta, fechaEX);
    GuardarDB();
    formulario.reset();
  }
});
//

// Función para borrar los datos del LocalStorage
container_Datos.addEventListener('click', (e) => {
  e.preventDefault();
  let texto = e.path[1].childNodes[1].innerHTML.substr(4);
  if(e.target.innerHTML === "Borrar datos"){
    EliminarDB(texto);
  }
  
})
//

/* Evento para mostrar en pantalla los valores de la API
y los datos del formulario cuando se cargue la página*/
document.addEventListener('DOMContentLoaded', traerDatos);
document.addEventListener('DOMContentLoaded', mostrarDatos);
//

// CODIGOS DE PRUEBA COMENTADOS COMO RECURSOS //

/*const guardarDatos = (e) => {
  e.preventDefault();
  let nombre = document.getElementById('nombre');
  let fecha = document.getElementById('fecha');
  let direccion = document.getElementById('direccion');
  let telefono = document.getElementById('telefono');
  let tarjeta = document.getElementById('tarjeta');
  let fechaEX = document.getElementById('fechaEX');
  let container_Datos = document.querySelector('#container_datos');
  let div = document.createElement('div');
  div.classList = 'pt-2';
  let p = document.createElement('p');
  p.classList = 'm-0';
  let botonBorrar = document.createElement('button');
  botonBorrar.textContent = 'Borrar datos';
  botonBorrar.classList = 'btn btn-danger mt-2';
  div.appendChild(p);
  div.appendChild(botonBorrar);
  console.log(div.innerHTML);
}*/


/*function traerDatos(e){
  e.preventDefault();
  fetch('https://api.namefake.com')
  .then(res => res.json())
  .then(data => {
    let nombre = `${data.name}`+' '+`${data.maiden_name}`;
    let correo = `${data.email_u}`+`${data.email_url[2]}`;
    datos.innerHTML = `
    
    <div class="col-12 col-md-auto d-flex flex-column justify-content-center">
        <img class="img-fluid" src="https://definicionde.es/wp-content/uploads/2019/04/definicion-de-persona-min.jpg" width="250">
        <button id="boton" class="btn btn-info d-md-block d-none">Generar identidad</button>
    </div>
    <div class="pl-2 pr-2 col-md-5 col-12 container-info">
       <p class="m-1 p-0"><b>Nombre: ${nombre}</b></p>
       <p class="m-1 p-0"><b>Apellido: ${data.maiden_name}</b></p>
       <p class="m-1 p-0"><b>Fecha de nacimiento: ${data.birth_data}</b></p>
       <p class="m-1 p-0"><b>Dirección: ${data.address}</b></p>
       <p class="m-1"><b>Télefono: ${data.phone_h}</b></p>
       <p class="m-1"><b>Corréo electrónico: ${correo}</b></p>
       <p class="m-1"><b>Tarjeta de crédito: ${data.plasticcard}</b></p>
       <p class="m-1"><b>Vence: ${data.cardexpir}</b></p>
       <p class="m-1"><b>CVV2: ${data.bonus}</b></p>
    </div>
    
    `

  });
}*/

    /*
    const api = new XMLHttpRequest();
    const url = `https://api.namefake.com/`;
    api.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        let texto = JSON.parse(this.responseText);
        console.log(texto);
        datos.innerHTML = '';
        for(let person of texto){
          datos.innerHTML += `
          
          <p class="m-1 p-0"><b>Nombre: ${person.name}</b></p>
                        <p class="m-1 p-0"><b>Apellido: ${person.maiden_name}</b></p>
                        <p class="m-1 p-0"><b>Fecha de nacimiento: ${person.birth_data}</b></p>
                        <p class="m-1 p-0"><b>Dirección: ${person.address}</b></p>
                        <p class="m-1"><b>Télefono: ${person.phone_h}</b></p>
                        <p class="m-1"><b>Corréo electrónico: ${person.email_u+person.email_d+person.email_url}</b></p>
                        <p class="m-1"><b>Tarjeta de crédito: ${person.plasticcard}</b></p>
                        <p class="m-1"><b>Vence: ${person.cardexpir}</b></p>
                        <p class="m-1"><b>CVV2: ${person.bonus}</b></p>
          
          `
        }
      }
    }
    api.open('GET', url, true);
    api.send();
  });*/