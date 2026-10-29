export interface Product {
  id: string;
  slug: string;
  name: string;
  badge?: 'SALE' | 'LIMITED' | 'NEW';
  colorway: string;
  price: string;
  priceNum: number;
  onSale: boolean;
  discountPercent?: number;
  salePrice?: string;
  salePriceNum?: number;
  description: string;
  details: string[];
  sizes: string[];
  inStock: boolean;
  images: {
    front: string;
    back: string;
    side?: string;
    graphic?: string;
    model?: string;
  };
}

// shortcut: placeholder catalogue and one shared placeholder image until our own products and photos exist; replace with the products API (docs/01).
const PLACEHOLDER = '/placeholder.svg';
const images = { front: PLACEHOLDER, back: PLACEHOLDER, model: PLACEHOLDER };

const SPEC = [
  'Heavyweight cotton jersey',
  'Relaxed fit with dropped shoulders',
  'Screen-printed front and back',
  'Ribbed crew neck',
];

export const PRODUCTS: Product[] = [
  {
    id: 'signal-tee',
    slug: 'signal-tee',
    name: 'SIGNAL TEE',
    badge: 'NEW',
    colorway: 'COBALT',
    price: 'A$39.99',
    priceNum: 39.99,
    onSale: false,
    description: 'Bold line work in cobalt on black. Sample product — replace with the real description.',
    details: SPEC,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    images,
  },
  {
    id: 'drift-tee',
    slug: 'drift-tee',
    name: 'DRIFT TEE',
    badge: 'NEW',
    colorway: 'BONE',
    price: 'A$39.99',
    priceNum: 39.99,
    onSale: false,
    description: 'Soft tonal print on a bone base. Sample product — replace with the real description.',
    details: SPEC,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    images,
  },
  {
    id: 'grid-tee',
    slug: 'grid-tee',
    name: 'GRID TEE',
    colorway: 'SLATE',
    price: 'A$39.99',
    priceNum: 39.99,
    onSale: false,
    description: 'An all-over grid graphic in slate grey. Sample product — replace with the real description.',
    details: SPEC,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    images,
  },
  {
    id: 'orbit-tee',
    slug: 'orbit-tee',
    name: 'ORBIT TEE',
    colorway: 'OLIVE',
    price: 'A$39.99',
    priceNum: 39.99,
    onSale: false,
    description: 'Circular back graphic on olive. Sample product — replace with the real description.',
    details: SPEC,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    images,
  },
  {
    id: 'static-tee',
    slug: 'static-tee',
    name: 'STATIC TEE',
    colorway: 'WASHED BLACK',
    price: 'A$39.99',
    priceNum: 39.99,
    onSale: false,
    description: 'Distressed texture print on washed black. Sample product — replace with the real description.',
    details: SPEC,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    images,
  },
  {
    id: 'canopy-tee',
    slug: 'canopy-tee',
    name: 'CANOPY TEE',
    colorway: 'FOREST',
    price: 'A$39.99',
    priceNum: 39.99,
    onSale: false,
    description: 'Leaf-pattern print on forest green. Sample product — replace with the real description.',
    details: SPEC,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    images,
  },
];

export interface LookbookItem {
  id: string;
  productId: string;
  productName: string;
  category: 'FRONT' | 'BACK' | 'ON MODEL';
  tag: string;
  image: string;
}

export const LOOKBOOK_ITEMS: LookbookItem[] = PRODUCTS.flatMap((prod) => [
  {
    id: `${prod.id}-front`,
    productId: prod.id,
    productName: prod.name,
    category: 'FRONT',
    tag: prod.onSale ? 'SALE' : 'LIMITED',
    image: prod.images.front,
  },
  {
    id: `${prod.id}-back`,
    productId: prod.id,
    productName: prod.name,
    category: 'BACK',
    tag: prod.onSale ? 'SALE' : 'LIMITED',
    image: prod.images.back,
  },
  ...(prod.images.model
    ? [
        {
          id: `${prod.id}-model`,
          productId: prod.id,
          productName: prod.name,
          category: 'ON MODEL' as const,
          tag: prod.onSale ? 'SALE' : 'LIMITED',
          image: prod.images.model,
        },
      ]
    : []),
]);

export const SIZE_CHART = {
  cm: [
    { size: "XS", chest: "108", length: "70", shoulder: "52", sleeve: "21" },
    { size: "S", chest: "114", length: "73", shoulder: "54", sleeve: "22" },
    { size: "M", chest: "120", length: "76", shoulder: "56", sleeve: "23" },
    { size: "L", chest: "126", length: "79", shoulder: "58", sleeve: "24" },
    { size: "XL", chest: "132", length: "82", shoulder: "60", sleeve: "25" },
    { size: "XXL", chest: "138", length: "85", shoulder: "62", sleeve: "26" }
  ],
  inches: [
    { size: "XS", chest: "42.5", length: "27.5", shoulder: "20.5", sleeve: "8.3" },
    { size: "S", chest: "44.9", length: "28.7", shoulder: "21.3", sleeve: "8.7" },
    { size: "M", chest: "47.2", length: "29.9", shoulder: "22.0", sleeve: "9.1" },
    { size: "L", chest: "49.6", length: "31.1", shoulder: "22.8", sleeve: "9.4" },
    { size: "XL", chest: "52.0", length: "32.3", shoulder: "23.6", sleeve: "9.8" },
    { size: "XXL", chest: "54.3", length: "33.5", shoulder: "24.4", sleeve: "10.2" }
  ]
};
