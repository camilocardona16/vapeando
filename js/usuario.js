// clase del usuario
class Usuario{
    constructor(id,usuario,correo,clave){
        this.id=id;
        this.usuario=usuario;
        this.correo=correo;
        this.clave=clave;
    }
}

$(document).ready(function(){

    //ver si ya hay un usuario creado
    if(localStorage.getItem('user')){
        let user = JSON.parse(localStorage.getItem('user')).usuario;
        $('#lista-botones').empty();
        $('#lista-botones').append(`
            <li class="nav-item">
                <a class="nav-link" href="#"><strong>${user}</strong></a>
            </li>
            <button id="btn-salir" type="button" onClick="salir();">salir</button>
            <button type="button" data-toggle="modal" data-target="#modalCarrito">Mi Carrito <i class="fa fa-cart-plus"></i></button>
        `);
    }
    
});