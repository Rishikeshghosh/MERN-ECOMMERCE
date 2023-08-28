export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("/products");
    const data = await response.json();
    const totalItems = (await response.headers.get("X-RateLimit-Limit")) || 100;

    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();

    resolve({ data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();

    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination, admin) {
  //filter = {category : [laptop, smartphone, shoes]}
  //sort  = { _sort : price, _order : asc }
  // pagination = {page: 1, _limit=10}

  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];

    if (categoryValues.length > 0) {
      const lastCategoryValues = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${categoryValues}&`; //lastCategoryValues
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`/products?${queryString}`);
    const data = await response.json();

    resolve({ data });
  });
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/`, {
      method: "POST",
      body: JSON.stringify(product),

      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${product.id}`, {
      method: "PATCH",
      body: JSON.stringify(product),

      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
