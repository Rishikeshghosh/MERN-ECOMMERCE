export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("/products"); ///products
    const data = await response.json();
    const totalItems = (await response.headers.get("X-RateLimit-Limit")) || 100;
    totalItems;
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${+id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories"); ///categories
    const data = await response.json();

    resolve({ data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands"); ///brands
    const data = await response.json();

    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  //filter = {category : [laptop, smartphone, shoes]}
  //sort  = { _sort : price, _order : asc }
  // pagination = {page: 1, _limit=10}

  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    categoryValues;
    if (categoryValues.length > 0) {
      const lastCategoryValues = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValues}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  pagination;
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
    queryString;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`/brands/products?${queryString}`);
    const data = await response.json();
    resolve({ data });
  });
}
