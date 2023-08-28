export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();

    resolve({ data });
  });
}

export function userCart() {
  return new Promise(async (resolve) => {
    const response = await fetch(`/cart`);

    const data = await response.json();

    resolve({ data });
  });
}

export function updateCart(updatedItem) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/cart/${updatedItem.product}`, {
      method: "PATCH",
      body: JSON.stringify(updatedItem),

      headers: { "content-type": "application/json" },
    });
    const data = await response.json();

    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/cart/${itemId}`, {
      method: "DELETE",

      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: itemId });
  });
}

export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await userCart();
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }

    resolve({ status: "success" });
  });
}
