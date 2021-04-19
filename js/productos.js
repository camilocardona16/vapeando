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

// pìntar los productos  en el html
function pintarProductos(){
    let contenedor=document.getElementById('campoProductos');
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

// llama las funciones inciales
$(document).ready(function(){
    crearProductos();
    pintarProductos();
});