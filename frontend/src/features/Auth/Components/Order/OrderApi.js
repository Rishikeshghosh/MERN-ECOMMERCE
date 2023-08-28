export function addOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders", {
      method: "POST",
      body: JSON.stringify(order),

      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/orders/${order.id}`, {
      method: "PATCH",
      body: JSON.stringify(order),

      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}
export function fetchallOrders(pagination, sort) {
  let queryString = "";

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`/orders?${queryString}`);
    const data = await response.json();
    const totalOrders = (await response.headers.get("x")) || 100;
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
