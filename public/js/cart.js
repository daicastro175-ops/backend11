const cartSocket = io();


// ============================
// WEBSOCKET
// ============================

cartSocket.on("connect", () => {

    console.log(
        "Socket carrito conectado:",
        cartSocket.id
    );

});


cartSocket.on("cartUpdated", (cartId) => {


    const container = document.querySelector("#cartContainer");


    if (!container) return;


    const currentCart = container.dataset.cart;


    if (currentCart === cartId) {

        location.reload();

    }

});




// ============================
// ELIMINAR PRODUCTO DEL CARRITO
// ============================

const buttons = document.querySelectorAll(".remove-product");


buttons.forEach(button => {

    button.addEventListener("click", async () => {

        const cartId = button.dataset.cart;
        const productId = button.dataset.product;


        const response = await fetch(
            `/api/carts/${cartId}/products/${productId}`,
            {
                method: "DELETE"
            }
        );


        const data = await response.json();


        if (data.success) {

            location.reload();

        } else {

            alert(data.error);

        }

    });

});