const socket = io();


socket.on("connect", () => {

    console.log(
        "Conectado al socket:",
        socket.id
    );

});

socket.on("productsUpdated", (products)=>{

    console.log("PRODUCTOS ACTUALIZADOS RECIBIDOS:", products);


    const container = document.querySelector("#productsContainer");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
            <hr>
        `;

    });

});