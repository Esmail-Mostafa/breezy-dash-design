
let BASE_URL = "https://fakestoreapiserver.reactbd.org/api";

export const getProducts = async (page: number, perPage: number) => {
  const response = await fetch(
    `${BASE_URL}/products?page=${page}&perPage=${perPage}`,
    { method: "GET" }
  );

  if (!response.ok) throw new Error("Failed to fetch products");

  const data = await response.json();

  const editData = localStorage.getItem("editProduct");
  const parsededitProduct = editData ? JSON.parse(editData) : [];
  const addData = localStorage.getItem("addProduct");
  const parsedaddProduct = addData ? JSON.parse(addData) : [];

  for (let i = 0; i < data?.data.length; i++) {
    if (data.data[i]._id == parsededitProduct[i]?._id) {
      data.data[i] = parsededitProduct[i];
    }
  }
  let finlData = {
    ...data,
    data: [...data.data, ...parsedaddProduct],
    totalProducts: data.totalProducts + parsedaddProduct.length,
    perPage: data.perPage,
  };

  return finlData;
};
export const getProductById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, { method: "GET" });

  if (!response.ok) throw new Error("Failed to fetch products");

  let data = await response.json();

  let editData = localStorage.getItem("editProduct");
  const parsededitProduct = editData ? JSON.parse(editData) : [];

  for (let i = 0; i < parsededitProduct.length; i++) {
    if (data._id == parsededitProduct[i]?._id) {
      data = parsededitProduct[i];
    }
  }

  return data;
};

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users?page=1&perPage=1`, {
    method: "GET",
  });

  if (!response.ok) throw new Error("Failed to fetch products");

  const data = await response.json();

  return data;
};

export const getOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders?page=1&perPage=1`, {
    method: "GET",
  });

  if (!response.ok) throw new Error("Failed to fetch products");

  const data = await response.json();

  return data;
};
export const getReviews = async () => {
  const response = await fetch(`${BASE_URL}/reviews?page=1&perPage=1`, {
    method: "GET",
  });

  if (!response.ok) throw new Error("Failed to fetch products");

  const data = await response.json();

  return data;
};
