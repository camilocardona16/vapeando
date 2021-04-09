class Producto{
    constructor(id,nombre,precio,imagen,descripcion,puntuacion){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.imagen=imagen;
        this.descripcion=descripcion;
        this.puntuacion=puntuacion;
    }    
}
function agregarCarrito(pos){
    let productosCarrito=[];
    if (localStorage.getItem('productos')){
        productosCarrito = JSON.parse(localStorage.getItem('productos'));
        productosCarrito.push({
            id:productos[pos].id,
            nombre:productos[pos].nombre,
            precio:productos[pos].precio,
            imagen:productos[pos].imagen,
        });    
    }else{
            productosCarrito.push({
                id:productos[pos].id,
                nombre:productos[pos].nombre,
                precio:productos[pos].precio,
                imagen:productos[pos].imagen,
            });      
    }
    // console.log(productosCarrito);
    let yaagregado = document.getElementById(`add${pos}`);
    yaagregado.innerHTML="ya agregado";
    actualizarCarrito(productosCarrito);
}
function eliminarElemntoCarrito(id){
    let productosCarrito=localStorage.getItem('productos');
    productosCarrito = JSON.parse(productosCarrito);
    let pos=0;
    for(let i =0;i<productosCarrito.length;i++){
        if(productosCarrito[i].id == id){
            pos = i;
        }
    }
    productosCarrito.splice(pos,1);
    localStorage.removeItem('productos');
    localStorage.setItem('productos',JSON.stringify(productosCarrito));
    $(`#cart${id}`).remove();
}

function actualizarCarrito(productosCarrito){
    if(localStorage.getItem('productos')){
        localStorage.removeItem('productos');
        localStorage.setItem('productos',JSON.stringify(productosCarrito));
    }else{
        localStorage.setItem('productos',JSON.stringify(productosCarrito));
    }
    $("#tablacarrito").empty();
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
                <input type="numeric" value="1" />
            </div>
            <div class="col col-total col-numeric"><p> $$$$$$</p><button class="btn-danger" onclick="eliminarElemntoCarrito(${productosCarrito[i].id})">X</button></div>
        </div>
        `);
    }
    
}

let productos=[];

function crearProductos(){
    productos.push(new Producto(1,'GREEN JOKER',60000,'images/es1.jpg','FREE BASE, FRUTAL, GREEN JOKER, LIQUIDOS, REFRESCANTE',10));
    productos.push(new Producto(2,'KING’S CROWN',60000,'images/es2.jpg',"FREE BASE, FRUTAL, KING'S CROWN, LIQUIDOS, OUTLET, OUTLET-LIQUIDOS, REFRESCANTE",10));
    productos.push(new Producto(3,'DINNER LADY | APPLE SOURS ICE SALTS',59900,'images/es3.jpg','APPLE SOURS ICE SALTS, DINNER LADY, FRUTAL, LIQUIDOS, MENTOLADO, NUEVO, NUEVO-LIQUIDOS, SALES DE NICOTINA, SALES DE NICOTINA-DINNER LADY',10));
    productos.push(new Producto(4,'DINNER LADY | BUBBLE TROUBLE ICE SALTS',60000,'images/es4.jpg','APPLE SOURS ICE SALTS, DINNER LADY, FRUTAL, LIQUIDOS, MENTOLADO, NUEVO, NUEVO-LIQUIDOS, SALES DE NICOTINA, SALES DE NICOTINA-DINNER LADY',10));
    productos.push(new Producto(5,'VOOPOO | ALPHA ZIP KIT',249900,'images/va1.jpg','ALPHA ZIP KIT, EQUIPOS, KITS DE INICIO, OUTLET, OUTLET-EQUIPOS, VOOPOO',10));
    productos.push(new Producto(6,'VOOPOO | ARGUS 40W POD MOD',249900,'images/va2.jpg','ARGUS 40W POD MOD, EQUIPOS, NUEVO, NUEVO-EQUIPOS, POD MOD, VOOPOO',10));
    productos.push(new Producto(7,'VOOPOO | ARGUS AIR POD KIT',169900,'images/va3.jpg','ARGUS AIR POD KIT, EQUIPOS, NUEVO, NUEVO-EQUIPOS, POD SYSTEM, VOOPOO',10));
}

function pintarProductos(){
    let contenedor=document.getElementById('campoProductos')
    let html='';
    for(let i=0;i<productos.length;i++){
        html+=
        `
        <div class="col-md-6 col-lg-4">
                <hr>
                <div class="profile-card-4 text-center">
                    <a href=""> <img src='${productos[i].imagen}' class="img img-responsive"></a>
                    <div class="profile-content">
                        <div class="profile-name">${productos[i].nombre}</div>
                        <div class="profile-description">${productos[i].descripcion}</div>
                        <div class="row">
                            <div class="col">
                                <div class="profile-overview">
                                    <p>Precio</p>
                                    <h4>$${productos[i].precio}</h4>
                                </div>
                            </div>
                            <div class="col">
                                <div class="profile-overview">
                                    <p>Puntuacion</p>
                                    <h4>10/${productos[i].puntuacion}</h4>
                                </div>
                            </div>
                            <div class="col">
                                <div class="profile-overview">
                                    <p id="add${i}">ADD</p>
                                    <a class="btn-agregar btn btn-info" onclick="agregarCarrito(${i})" type="button"><i class="fa fa-cart-plus"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    };
    contenedor.innerHTML=html;
}


$(document).ready(function(){
    
    //peticion a una apid e paises.
    $.get('https://ciudades.digit4l.co/api/countries',function(res){
        console.log(res);
    });

    $('.btn-agregar').click(e=>{
        let hijos = $(e.target).parent().children();
        console.log(hijos[0].value);
        $(e.target).parent().slideUp("slow");
    })

    crearProductos();
    pintarProductos();

    // carga del carrrito inicial 
    if(localStorage.getItem('productos')){
        let productosCarrito=JSON.parse(localStorage.getItem('productos'));
        $("#tablacarrito").empty();
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
                    <input type="numeric" value="1" />
                </div>
                <div class="col col-total col-numeric"><p> $$$$$$</p><button class="btn-danger" onclick="eliminarElemntoCarrito(${productosCarrito[i].id})">X</button></div>
            </div>
            `);
    }
    }
    
 });



