export const getProducts = async () => {
  const response = await fetch(
    `https://fakestoreapiserver.reactbd.org/api/products?page=1&perPage=1`,
    { method: "GET" }
  );

  if (!response.ok) throw new Error("Failed to fetch products");

  const data = await response.json();

  return data;
};
export const getUsers = async () => {
  const response = await fetch(
    `https://fakestoreapiserver.reactbd.org/api/users?page=1&perPage=1`,
    { method: "GET" }
  );

  if (!response.ok) throw new Error("Failed to fetch products");

  const data = await response.json();

  return data;
};

export const getOrders = async () => {
  const response = await fetch(
    `https://fakestoreapiserver.reactbd.org/api/orders?page=1&perPage=1`,
    { method: "GET" }
  );

  if (!response.ok) throw new Error("Failed to fetch products");

  const data = await response.json();

  return data;
};
export const getReviews = async () => {
  const response = await fetch(
    `https://fakestoreapiserver.reactbd.org/api/reviews?page=1&perPage=1`,
    { method: "GET" }
  );

  if (!response.ok) throw new Error("Failed to fetch products");

  const data = await response.json();

  return data;
};
