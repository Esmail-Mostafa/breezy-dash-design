export function editProduct(product: any) {
  // Get existing products from localStorage or initialize empty array
  const items = localStorage.getItem("editProduct");
  let products = items ? JSON.parse(items) : [];

  // Check if product exists
  const existingProductIndex = products.findIndex(
    (item: any) => item._id === product._id
  );

  if (existingProductIndex !== -1) {
    // Update existing product
    products[existingProductIndex] = product;
    console.log("Updated product:", product);
  } else {
    // Add new product
    products.push(product);
    console.log("Added new product:", product);
  }

  // Save updated products array back to localStorage
  localStorage.setItem("editProduct", JSON.stringify(products));
  console.log("Current products:", products);
}

export function addProduct(product: any) {
  const items = localStorage.getItem("addProduct");
  let addProduct = items ? JSON.parse(items) : [];
  addProduct.push(product);
  localStorage.setItem("addProduct", JSON.stringify(addProduct));

  console.log(localStorage.getItem("addProduct"), "addProduct");
}
