const socket = io();

const container = document.getElementById("products-container");

socket.on("connect", () => {
    console.log("Conectado al servidor:", socket.id);
});

socket.on("productsUpdated", (products) => {

    console.log("Productos actualizados:", products);

    if (!container) return;

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
            <div class="card">
                <h2>${product.title}</h2>

                <p>Precio: $${product.price}</p>

                <p>Stock: ${product.stock}</p>

                <p>Categoría: ${product.category?.name || "Sin categoría"}</p>

                <p>Vendedor: ${product.seller?.name || "Sin vendedor"}</p>

                <button class="add-to-cart" data-id="${product._id}">
                    Agregar al carrito
                </button>

            </div>
        `;

    });

});
const CART_ID = "6a5f9acd7d99b675951f85af";

document.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("add-to-cart")) return;

    const productId = e.target.dataset.id;

    try {

        const response = await fetch(
            `/api/carts/${CART_ID}/products/${productId}`,
            {
                method: "POST"
            }
        );

        const data = await response.json();

        if (data.success) {
            Swal.fire({
                icon: "success",
                title: "Producto agregado al carrito",
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                icon: "error",
                title: data.error
            });
        }

    } catch (error) {
        console.error(error);

        Swal.fire({
            icon: "error",
            title: "Ocurrió un error"
        });
    }

});