const cartId = "6a5f9acd7d99b675951f85af";

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", async () => {
        const productId = button.dataset.id;

        try {
            const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
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