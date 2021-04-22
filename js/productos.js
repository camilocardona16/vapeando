let productos=[];

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


function crearProductos(){
    readTextFile("productos.json", function(text){
        var data = JSON.parse(text);
        for (let i = 0; i < data.length; i++) {
            productos.push(new Producto(data[i].id,data[i].nombre,data[i].precio,data[i].imagen,data[i].descripcion,data[i].puntuacion,data[i].destacado));            
        }
    });
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