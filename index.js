/*Crea una pagina que tenga un titulo que diga "Hola!" y un botón que diga "Iniciar sesión"
Al hacer click en el botón Iniciar Sesión, debe hacerse visible un formulario con un campo usuario y 
otro contraseña, y un botón para enviar el form.
Definí un objeto usuario en javascript en donde estén definidas dos propiedades: nombreUsuario y 
contrasenia (o usá los objetos definidos antes).
Si los datos ingresados por el usuario en el form coinciden con los guardados en el objeto, 
la web debe:
Mostrar como saludo "Hola {nombreUsuario}"
Ocultar el botón "iniciar sesión"
Ocultar el formulario para iniciar sesión
Mostrar dos botones nuevos: Cambiar mis datos, Cerrar sesión.
Pista: Definí una variable global para guardar si el usuario inició sesión o no, y determinar 
a partir de ella qué elementos se deben mostrar en la página.
Si el usuario hace click en "cerrar sesión", el titulo debe volver a decir "Hola!" y el botón 
"Iniciar sesión" debe volver a ser visible.
Si el usuario hace click en "Cambiar mis datos", se abre un formulario con un campo usuario y otro 
contraseña, y un botón para enviar el form. Al enviarse, se deben modificar las propiedades 
nombreUsuario y contrasenia del objeto usuario.
Una vez completados todos los puntos anteriores, queremos que la sesión del usuario persista aunque 
cierre la página.

Al iniciar sesión, se deben guardar en localStorage el nombre del usuario y la propiedad: sesionIniciada: true.
Al saludar al usuario, el título debe consumir la propiedad guardada en localStorage.
Al cerrar sesión, la propiedad sesionIniciada debe pasar a ser false.
Para determinar si la sesión está iniciada o no, usar la propiedad sesionIniciada desde localStorage.
Si el usuario cambia su nombre o contraseña desde el formulario, los datos en localStorage deben actualizarse también.*/

let titulo = document.querySelector("h1")
const botonIniciarSesion = document.querySelector("#boton-iniciar-sesion")
const formulario = document.querySelector("form") //formulario
const btnEnviarForm = document.querySelector("#boton-enviar") //boton enviar
const inputUser = document.querySelector("#input-user") //input usuario
const inputPassword = document.querySelector("#input-password") //input pasword
const contenedorSesionIniciada = document.querySelector("#contenedor-sesion-iniciada")//div q contiene botones
const btnCambiarDatos = document.querySelector("#btn-cambiar-datos")
const btnCerrarSesion = document.querySelector("#btn-cerrar-sesion")
const btnEnviarNuevosDatos = document.querySelector("#boton-enviar-nuevos-datos")
/**** VARIABLES DE ESTADO *****/
let  sesionIniciada = false

const usuario = {
  nombreUsuario: "gaby",
  contrasenia: "123", 
}
/***** FUNCIONES AUXILIARES ******/

const modificarNombreDeUsuario = (usuario, nuevoNombre) => {
    usuario.nombreUsuario = nuevoNombre
    return usuario
}


/*convierto el objeto usuario a JSON , retorna el objeto convertido a JSON.*/

const convertirAJSON = (usuario) => {
    let objetoConvertidoAJSON = JSON.stringify(usuario)
    return objetoConvertidoAJSON
}

/* tomo la cadena JSON y la convierto en objeto de JS*/
const convertirDesdeJSON = (json) => {
    const JSONconvertidoaObjeto = JSON.parse(json)
    return JSONconvertidoaObjeto //retorna un nuevo Objeto de javascript
}

const guardarEnLocalStorage = (objeto,clave) => {
    let objetoJSON = convertirAJSON(objeto) 
    localStorage.setItem(clave, objetoJSON) //se usa para guardar la sesion
}

/*recibe como parámetro un string clave y retorna un objeto de Javascript con los
// datos guardados bajo esa clave en localStorage.*/

const obtenerDesdeLocalStorage = (clave) => {
    const datosLocalStorage = localStorage.getItem(clave)
    const nuevoObjetoJS = convertirDesdeJSON(datosLocalStorage)
    return nuevoObjetoJS
}

/**** CODIGO DE LA APLICACION ****/

botonIniciarSesion.onclick = () => {
    formulario.classList.remove("ocultar")
}

// const sesionEstaIniciadaLocalS = obtenerDesdeLocalStorage("sesion")
// const nombreUsuarioLocalS = obtenerDesdeLocalStorage("usuario")

btnEnviarForm.onclick = () => {
    if (inputUser.value === usuario.nombreUsuario && inputPassword.value === usuario.contrasenia) { 
        sesionIniciada = true
        botonIniciarSesion.classList.add("ocultar")
        btnCambiarDatos.classList.remove("ocultar")
        btnCerrarSesion.classList.remove("ocultar")
        formulario.classList.add("ocultar")
        contenedorSesionIniciada.classList.remove("ocultar")
        guardarEnLocalStorage ({sesionIniciada:true}, "sesion")//funciona!!
        guardarEnLocalStorage(usuario, "Usuario")
        titulo.textContent = `Hola, ${usuario.nombreUsuario}!!` //debe tomar el nombre desde el localStorage
    }else{
        alert("ingresaste datos erroneos")
    }

}
/*Si el usuario hace click en "cerrar sesión", el titulo debe volver a decir "Hola!" y el botón 
"Iniciar sesión" debe volver a ser visible.*/

btnCerrarSesion.onclick = () => {
    sesionIniciada = false
    titulo.textContent = "Hola!"
    botonIniciarSesion.classList.remove("ocultar")
    contenedorSesionIniciada.classList.add("ocultar")
    guardarEnLocalStorage({sesionIniciada: false }, "sesion")//funciona!!
    guardarEnLocalStorage(usuario, "Usuario")
} 

/*Si el usuario hace click en "Cambiar mis datos", se abre un formulario con un campo usuario y otro 
contraseña, y un botón para enviar el form. Al enviarse, se deben modificar las propiedades 
nombreUsuario y contrasenia del objeto usuario.*/
btnCambiarDatos.onclick = ()=> {
    formulario.classList.remove("ocultar")
    btnEnviarNuevosDatos.classList.remove("ocultar")
    btnEnviarForm.classList.add("ocultar")

}

btnEnviarNuevosDatos.onclick = () => {
    usuario.nombreUsuario = inputUser.value
    usuario.contrasenia = inputPassword.value
    guardarEnLocalStorage({sesionIniciada: true }, "sesion")//funciona!!
    guardarEnLocalStorage(usuario, "Usuario")
    titulo.textContent = `Hola, ${usuario.nombreUsuario}!!` //Debe tomar el nombre del localStorage

}



