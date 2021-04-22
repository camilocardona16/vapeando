// CLASE DE PRODUCTO
class Producto{
    constructor(id,nombre,precio,imagen,descripcion,puntuacion,destacado){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.imagen=imagen;
        this.descripcion=descripcion;
        this.puntuacion=puntuacion;
        this.destacado=destacado
    }    
}
$(document).ready(function(){
    // animacion cuando se agrega un producto
    $('.btn-agregar').click(e=>{
        let hijos = $(e.target).parent().children();
        console.log(hijos[0].value);
        $(e.target).parent().slideUp("slow");
    })
    // carga del carrrito inicial 
    if(localStorage.getItem('productos')){
        let productosCarrito=JSON.parse(localStorage.getItem('productos'));
        $("#tablacarrito").empty();
        let costoDelCarrito=0;
        for(let i=0;i<productosCarrito.length;i++){
            $("#tablacarrito").append(`
            <div id="cart${productosCarrito[i].id}" class="layout-inline row">
                <div class="col col-pro layout-inline">
                    <img class="imgcarrito" src='${productosCarrito[i].imagen}' alt="${productosCarrito[i].imagen}" />
                    <p style="margin-left: 10px;">${productosCarrito[i].nombre}</p>
                </div>
                <div class="col col-price col-numeric align-center ">
                    <p>$${productosCarrito[i].precio}</p>
                </div>
                <div class="col col-qty layout-inline">
                    <input value="${productosCarrito[i].cantidad}" />
                </div>
                <div class="col col-total col-numeric"><p> $${productosCarrito[i].precio*productosCarrito[i].cantidad}</p><button class="btn-danger" onclick="eliminarElemntoCarrito(${productosCarrito[i].id})">X</button></div>
            </div>
            `);
            costoDelCarrito+=productosCarrito[i].precio*productosCarrito[i].cantidad
        }
        $('#totalcarrito').append(`<div class="col col-total col-numeric"><p>$${costoDelCarrito}</p></div>`);

    }
});



