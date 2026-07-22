const contenedor = document.getElementById("productos");


fetch("/api/products")
    .then(response => response.json())
    .then(data => {

        const productos = data.payload;

        productos.forEach(producto => {

            contenedor.innerHTML += `
                <div>
                    <h2>${producto.name}</h2>
                    <p>Precio: $${producto.price}</p>
                    <p>Stock: ${producto.stock}</p>
                </div>
            `;

        });

    })
    .catch(error => console.log(error));
    const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {
    button.addEventListener("click", async () => {
        const productId = button.dataset.id;

        const cartId = "ACA_VA_EL_ID_DEL_CARRITO";

        try {
            const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                method: "POST"
            });

            const data = await response.json();

            if (data.success) {
                alert("Producto agregado al carrito");
            } else {
                alert(data.error);
            }

        } catch (error) {
            console.error(error);
            alert("Ocurrió un error");
        }
    });
});