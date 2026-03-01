import fs from 'fs/promises';
import path from 'path';

export interface Product {
  _id: string;
  actual_price: string;
  average_rating: string;
  brand: string;
  category: string;
  description: string;
  discount: string;
  images: string[];
  out_of_stock: boolean;
  selling_price: string;
  sub_category: string;
  title: string;
  url: string;
}

let cachedProducts: Product[] | null = null;

async function getProducts(): Promise<Product[]> {
  if (cachedProducts) {
    return cachedProducts;
  }

  try {
    const filePath = path.join(process.cwd(), 'products_dataset.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    cachedProducts = JSON.parse(fileContent);
    return cachedProducts || [];
  } catch (error) {
    console.error("Failed to load products dataset:", error);
    return [];
  }
}

export async function searchCatalog({
  query,
  category,
  brand,
  maxPrice
}: {
  query?: string;
  category?: string;
  brand?: string;
  maxPrice?: number;
}) {
  const products = await getProducts();
  let results = products;

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(p => p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
  }

  if (category) {
    const c = category.toLowerCase();
    results = results.filter(p => p.category?.toLowerCase().includes(c) || p.sub_category?.toLowerCase().includes(c));
  }

  if (brand) {
    const b = brand.toLowerCase();
    results = results.filter(p => p.brand?.toLowerCase() === b);
  }

  if (maxPrice !== undefined) {
    // selling_price is a string like "2,999" or "499"
    results = results.filter(p => {
      if (!p.selling_price) return false;
      const priceNum = parseFloat(p.selling_price.replace(/,/g, ''));
      if (isNaN(priceNum)) return false;
      return priceNum <= maxPrice;
    });
  }

  // Return a simplified version for the AI to save tokens and prevent huge response overheads
  return results.slice(0, 5).map(p => ({
    title: p.title,
    price: p.selling_price,
    brand: p.brand,
    category: p.category,
    sub_category: p.sub_category,
    url: p.url,
    discount: p.discount,
    rating: p.average_rating
  }));
}
