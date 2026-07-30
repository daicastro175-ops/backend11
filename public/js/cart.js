const buttons = document.querySelectorAll(".remove-product");

buttons.forEach(button => {

    button.addEventListener("click", async () => {

        const cartId = button.dataset.cart;
        const productId = button.dataset.product;

        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (data.success) {
            location.reload();
        } else {
            alert(data.error);
        }

    });

});