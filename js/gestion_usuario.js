
// crear una cuenta
function crearCuenta(){
    const user= $("#userCrear").val();
    const correo= $("#correoCrear").val();
    const clave= $("#claveCrear").val();
    const us = new Usuario(1,user,correo,clave);
    localStorage.setItem('user',JSON.stringify(us));
    alert('se creo el usuario !');
    location.reload();
}

// salir de la cuenta.
function salir(){
    localStorage.removeItem('user');
    location.reload();
}