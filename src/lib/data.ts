export interface Product {
  id: string;
  name: string;
  price: number;
  availableSizes: string[];
  stock: number;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Nike Air Max 270",
    price: 150,
    availableSizes: ["7", "8", "9", "10", "11"],
    stock: 15,
    category: "Shoes",
  },
  {
    id: "2",
    name: "Adidas Ultraboost 22",
    price: 190,
    availableSizes: ["8", "9", "10"],
    stock: 5,
    category: "Shoes",
  },
  {
    id: "3",
    name: "Levis 501 Original Jeans",
    price: 89,
    availableSizes: ["30", "32", "34", "36"],
    stock: 25,
    category: "Clothing",
  },
  {
    id: "4",
    name: "Classic White T-Shirt",
    price: 25,
    availableSizes: ["S", "M", "L", "XL"],
    stock: 100,
    category: "Clothing",
  },
];

export async function getProductInventory(productName: string) {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const product = products.find((p) =>
    p.name.toLowerCase().includes(productName.toLowerCase())
  );
  
  if (!product) {
    return { error: "Product not found" };
  }
  
  return product;
}
