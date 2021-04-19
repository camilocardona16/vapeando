// Agregar un producto al carrito
function agregarCarrito(pos){
    let productosCarrito=[];
    // se pregunta si ya hay productos agregados anteriormente, para agregar mas
    if (localStorage.getItem('productos')){
        productosCarrito = JSON.parse(localStorage.getItem('productos'));
        let id=productos[pos].id;

        // se valida si el producto ya esta para sumarte su cantidad
        if(productosCarrito.find(producto=>producto.id==id)){
            for(let i=0;i<productosCarrito.length;i++){
                if(productosCarrito[i].id==id){
                    productosCarrito[i].cantidad+=1;
                }
            }

        // si no esta, se agrega uno nuevo con cantidad en 1
        }else{
            productosCarrito.push({
                id:productos[pos].id,
                nombre:productos[pos].nombre,
                precio:productos[pos].precio,
                imagen:productos[pos].imagen,
                cantidad:1
            });      
        }

    // si no hay productos anteriormente, simplemente se agrega el primero
    }else{
            productosCarrito.push({
                id:productos[pos].id,
                nombre:productos[pos].nombre,
                precio:productos[pos].precio,
                imagen:productos[pos].imagen,
                cantidad:1
            });      
    }
    // se cambia a producto ya agregado
    let yaagregado = document.getElementById(`add${pos}`);
    yaagregado.innerHTML="Agregar Otro";
    actualizarCarrito(productosCarrito);
}

// eliminar un producto del carrito
function eliminarElemntoCarrito(id){
    let productosCarrito=localStorage.getItem('productos');
    productosCarrito = JSON.parse(productosCarrito);
    let pos=0;
    let costoDelCarrito=0;
    let borrar=false; //variable para controlar si se tiene que borrar el elemento, o solo borrar 1 cantidad
    for(let i =0;i<productosCarrito.length;i++){
        costoDelCarrito+=productosCarrito[i].precio;
        if(productosCarrito[i].id == id){
            pos = i;
            costoDelCarrito=costoDelCarrito-(productosCarrito[i].precio);
            if(productosCarrito[i].cantidad>1){
                productosCarrito[i].cantidad--;
            }else{
                borrar=true;
            }
        }
    }
    if(borrar){
        productosCarrito.splice(pos,1);
    }
    actualizarCarrito(productosCarrito);
}

// agregar una unidad  a un producto
function agregarElementoCarrito(id){
    let productosCarrito=localStorage.getItem('productos');
    productosCarrito = JSON.parse(productosCarrito);
    let pos=0;
    let costoDelCarrito=0;
    for(let i =0;i<productosCarrito.length;i++){
        costoDelCarrito+=productosCarrito[i].precio;
        if(productosCarrito[i].id == id){
            pos = i;
            costoDelCarrito=costoDelCarrito+(productosCarrito[i].precio);
            productosCarrito[i].cantidad++;
        }
    }
    actualizarCarrito(productosCarrito);
}

// funcion que se llama cada que se ahce un cambio en el carrito
function actualizarCarrito(productosCarrito){
    if(localStorage.getItem('productos')){
        localStorage.removeItem('productos');
        localStorage.setItem('productos',JSON.stringify(productosCarrito));
    }else{
        localStorage.setItem('productos',JSON.stringify(productosCarrito));
    }
    $("#tablacarrito").empty();
    let costoDelCarrito=0;
    
    // se crea cada producto
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
            <div class="col col-qty layout-inline" id="cantidad${productosCarrito[i].id}">
                <input readonly type="numeric" value="${productosCarrito[i].cantidad}" />
            </div>
            <div class="col col-total col-numeric">
                <p>$${productosCarrito[i].precio*productosCarrito[i].cantidad}</p>
                <button class="btn-danger" onclick="eliminarElemntoCarrito(${productosCarrito[i].id})">X</button>
                <button class="btn-success" onclick="agregarElementoCarrito(${productosCarrito[i].id})">+</button>
            </div>
        </div>
        `);
        costoDelCarrito+=productosCarrito[i].precio*productosCarrito[i].cantidad;
    }
    $('#totalcarrito').empty();
    $('#totalcarrito').append(`<div class="col col-total col-numeric"><p>$${costoDelCarrito}</p></div>`);
    
}


// funcion para pagar el valor del carrito
function pagar(){
    if(localStorage.getItem('user')){
        alert('se ha pagado tu factura');
        $("#tablacarrito").empty();
        $('#totalcarrito').empty();
        localStorage.removeItem('productos');
    }else{
        alert('debes tener un USUARIO para pagar tu factura')
    }
    
}