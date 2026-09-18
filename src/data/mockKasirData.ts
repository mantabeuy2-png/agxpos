export interface KasirProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: string;
  imageUrl: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  discount: number;
}

export const KASIR_CATEGORIES = [
  'Semua',
  'Fashion',
  'Kebutuhan Dapur',
  'Makanan Ringan',
  'Minuman',
  'Peralatan mandi',
  'Bahan makanan',
] as const;

export const INITIAL_PRODUCTS: KasirProduct[] = [
  {
    id: 'p1',
    name: 'Kopi Susu Gula Aren',
    price: 18000,
    category: 'Minuman',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p2',
    name: 'Minyak Goreng 2L',
    price: 38000,
    category: 'Kebutuhan Dapur',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p3',
    name: 'Nasi Goreng Frozen',
    price: 22000,
    category: 'Bahan makanan',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p4',
    name: 'Oreo Vanilla 133g',
    price: 15000,
    category: 'Makanan Ringan',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p5',
    name: 'Pasta Gigi Pepsodent 190g',
    price: 18000,
    category: 'Peralatan mandi',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p6',
    name: 'Pewangi Pakaian 900ml',
    price: 26000,
    category: 'Kebutuhan Dapur',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p7',
    name: 'Pringles Sour Cream',
    price: 35000,
    category: 'Makanan Ringan',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p8',
    name: 'Roti Tawar Sari Roti',
    price: 16000,
    category: 'Makanan Ringan',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p9',
    name: 'Sabun Cuci Piring 800ml',
    price: 18000,
    category: 'Kebutuhan Dapur',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p10',
    name: 'Sabun Lifebuoy 85g',
    price: 6500,
    category: 'Peralatan mandi',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1607006314644-245459345e69?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p11',
    name: 'Shampoo Pantene 170ml',
    price: 32000,
    category: 'Peralatan mandi',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p12',
    name: 'Sosis Sapi 500g',
    price: 48000,
    category: 'Bahan makanan',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p13',
    name: 'Teh Botol Sosro 450ml',
    price: 6000,
    category: 'Minuman',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p14',
    name: 'Hoodie Agx',
    price: 165000,
    category: 'Fashion',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 'p15',
    name: 'Kaos Polos Hitam',
    price: 75000,
    category: 'Fashion',
    stock: '∞',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=80',
  },
];

// Initial items matching the screenshot exactly (Total: Rp 698.000)
export const INITIAL_CART_ITEMS: CartItem[] = [
  { id: 'c1', name: 'Donat Coklat', price: 8000, qty: 2, discount: 0 },
  { id: 'c2', name: 'Jus Jeruk Segar 500ml', price: 12000, qty: 1, discount: 0 },
  { id: 'c3', name: 'Indomie Goreng', price: 3500, qty: 2, discount: 0 },
  { id: 'c4', name: 'Hoodie Agx', price: 165000, qty: 3, discount: 0 },
  { id: 'c5', name: 'Kaus kaki', price: 4000, qty: 1, discount: 0 },
  { id: 'c6', name: 'Kecap Manis ABC 600ml', price: 25000, qty: 1, discount: 0 },
  { id: 'c7', name: 'Keju Cheddar 165g', price: 30000, qty: 1, discount: 0 },
  { id: 'c8', name: 'Kaos Polos Hitam', price: 75000, qty: 1, discount: 0 },
  { id: 'c9', name: 'Roti Tawar Sari Roti', price: 16000, qty: 1, discount: 0 },
  { id: 'c10', name: 'Sabun Cuci Piring 800ml', price: 18000, qty: 1, discount: 0 },
];
