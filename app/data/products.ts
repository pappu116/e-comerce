// data/products.ts

export interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Hoodie",
    price: 89,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
    description: "Ultra soft premium cotton hoodie for everyday comfort."
  },
  {
    id: 2,
    name: "Minimal Sneakers",
    price: 120,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    description: "Modern minimal sneakers crafted for style and durability."
  },
  {
    id: 3,
    name: "Luxury Watch",
    price: 249,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
    description: "Elegant timepiece designed for premium lifestyle."
  }
]