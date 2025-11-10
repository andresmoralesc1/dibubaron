import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Lazy initialization of WooCommerce API client
let api: WooCommerceRestApi | null = null;

function getApiClient(): WooCommerceRestApi {
  if (!api) {
    // Only initialize if we have valid credentials
    if (!process.env.WOOCOMMERCE_CONSUMER_KEY || !process.env.WOOCOMMERCE_CONSUMER_SECRET) {
      throw new Error('WooCommerce credentials not configured');
    }

    api = new WooCommerceRestApi({
      url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://tu-tienda.com",
      consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
      consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
      version: "wc/v3",
    });
  }
  return api;
}

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  description: string;
  short_description: string;
  images: Array<{
    id: number;
    src: string;
    name: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  stock_status: string;
  in_stock: boolean;
}

// Obtener productos
export async function getProducts(params: {
  per_page?: number;
  page?: number;
  category?: string;
  featured?: boolean;
  on_sale?: boolean;
} = {}): Promise<WooCommerceProduct[]> {
  try {
    const client = getApiClient();
    const response = await client.get("products", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Obtener un producto por slug
export async function getProductBySlug(slug: string): Promise<WooCommerceProduct | null> {
  try {
    const client = getApiClient();
    const response = await client.get("products", { slug });
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Obtener categorías de productos
export async function getProductCategories() {
  try {
    const client = getApiClient();
    const response = await client.get("products/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
