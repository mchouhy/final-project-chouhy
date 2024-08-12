document.addEventListener("DOMContentLoaded", () => {
  const emptyCartButton = document.querySelector(".empty-cart");
  if (emptyCartButton) {
    emptyCartButton.addEventListener("click", function () {
      const cartId = this.getAttribute("data-cart-id");
      emptyCart(cartId);
    });
  }
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const cartId = this.getAttribute("data-cart-id");
      const productId = this.getAttribute("data-product-id");
      deleteProductById(cartId, productId);
    });
  });
});

function emptyCart(cartId) {
  fetch(`/api/carts/${cartId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al vaciar el carrito");
      }
      location.reload(); // Recarga la página directamente si no hay cuerpo de respuesta
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteProductById(cartId, productId) {
  fetch(`/api/carts/${cartId}/product/${productId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }
      response.json();
      location.reload();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}
