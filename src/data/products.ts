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

export const PRODUCTS: Product[] = [
  {
    id: "blue-flame-tee",
    slug: "blue-flame-tee",
    name: "BLUE FLAME TEE",
    badge: "SALE",
    colorway: "STEEL BLUE",
    price: "A$39.99",
    priceNum: 39.99,
    onSale: true,
    discountPercent: 15,
    salePrice: "A$33.99",
    salePriceNum: 33.99,
    description: "The blue flame rises in darkness, cold, silent, unstoppable. Inspired by the supernatural mastery of blue fire and phantom warriors.",
    details: [
      "100% Ultra-Heavyweight 240gsm Cotton",
      "Oversized Drop-Shoulder Cyber-Ronin Silhouette",
      "High-Density Screenprint Front & Multi-Pass Back Art",
      "Pre-shrunk, Ribbed 1.25\" Collar",
      "Custom ZENJI Woven Hem Label & Cybernetic Wash Tag"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
    images: {
      front: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Blue-flame-1.webp",
      back: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Blue-flame-2.webp",
      side: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Blue-flame-3.webp",
      graphic: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Blue-flame-4.webp",
      model: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Blue-flame-5.webp"
    }
  },
  {
    id: "demon-blood-tee",
    slug: "demon-blood-tee",
    name: "DEMON BLOOD TEE",
    badge: "SALE",
    colorway: "CRIMSON PINK",
    price: "A$39.99",
    priceNum: 39.99,
    onSale: true,
    discountPercent: 15,
    salePrice: "A$33.99",
    salePriceNum: 33.99,
    description: "The mark of the cursed. Worn by those who survived the crucible. Featuring intense crimson brushwork and fierce demonic typography.",
    details: [
      "100% Heavyweight 240gsm Combed Cotton",
      "Aggressive Boxy Fit with Reinforced Shoulder Taping",
      "Vibrant Crimson & Dark Smoke Screenprint",
      "Double-needle Stitching on Sleeves & Hem",
      "No Restocks. Ever."
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    images: {
      front: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Demon-blood-1.webp",
      back: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Demon-blood-2.webp",
      side: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Demon-blood-3.webp",
      graphic: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Demon-blood-4.webp",
      model: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Demon-blood-5.webp"
    }
  },
  {
    id: "will-of-the-sun-tee",
    slug: "will-of-the-sun-tee",
    name: "WILL OF THE SUN TEE",
    badge: "SALE",
    colorway: "SOLAR GOLD",
    price: "A$39.99",
    priceNum: 39.99,
    onSale: true,
    discountPercent: 15,
    salePrice: "A$33.99",
    salePriceNum: 33.99,
    description: "Blazing spirit. Unbreakable resolve. The will that outlasts everything and illuminates the deepest shadow.",
    details: [
      "100% 240gsm Premium Heavy Cotton",
      "Signature Oversized Fit with Drop Shoulder",
      "Solar Flare Multi-Layer Screenprint",
      "Ribbed Heavy Crew Neckline",
      "Engineered in Australia / Japanese Art Influence"
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    images: {
      front: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Will-of-the-sun-1.webp",
      back: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Will-of-the-sun-2.webp",
      side: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Will-of-the-sun-3.webp",
      graphic: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Will-of-the-sun-4.webp",
      model: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Will-of-the-sun-5.webp"
    }
  },
  {
    id: "warrior-spirit-tee",
    slug: "warrior-spirit-tee",
    name: "WARRIOR SPIRIT TEE",
    badge: "SALE",
    colorway: "FOREST GREEN",
    price: "A$39.99",
    priceNum: 39.99,
    onSale: true,
    discountPercent: 15,
    salePrice: "A$33.99",
    salePriceNum: 33.99,
    description: "Beaten but unbroken. The warrior spirit outlasts everything. For those who walk through the battlefield with unyielding fortitude.",
    details: [
      "100% 240gsm Heavyweight Luxury Cotton",
      "Tactical Streetwear Cut with Relaxed Armholes",
      "Dark Forest & High-Contrast White Graphics",
      "Preshrunk Fabric to Preserve Fit Over Time",
      "Limited The_Origin_Drop Edition"
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    images: {
      front: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Warrior-spirit-2.webp",
      back: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Warrior-spirit-4.webp",
      side: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Warrior-spirit-3.webp",
      graphic: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Warrior-spirit-5.webp",
      model: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Warrior-spirit-1.webp"
    }
  },
  {
    id: "bushido-tee",
    slug: "bushido-tee",
    name: "BUSHIDO TEE",
    badge: "LIMITED",
    colorway: "SHADOW BLACK",
    price: "A$39.99",
    priceNum: 39.99,
    onSale: false,
    description: "The way of the warrior. Honor in every thread. Crafted with traditional calligraphy brush strokes and neo-tokyo cyberpunk framing.",
    details: [
      "100% Heavyweight 240gsm Pure Cotton",
      "Oversized Relaxed Silhouette",
      "Plastisol + Discharge Ink Hybrid Print",
      "Reinforced Seams Throughout",
      "Official ZENJI Authenticity Mark"
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    images: {
      front: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Bushido-1.webp",
      back: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Bushido-2.webp",
      side: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Bushido-3.webp",
      graphic: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Bushido-4.webp",
      model: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Bushido-5.webp"
    }
  },
  {
    id: "domain-expansion-tee",
    slug: "domain-expansion-tee",
    name: "DOMAIN EXPANSION TEE",
    badge: "LIMITED",
    colorway: "VOID PURPLE",
    price: "A$39.99",
    priceNum: 39.99,
    onSale: false,
    description: "Enter the infinite. A realm where absolute power reigns. Intricate cosmic eye motifs merged with dark sorcery energy.",
    details: [
      "100% 240gsm Heavyweight Combed Cotton",
      "Signature Cyber-Ronin Oversized Fit",
      "Multi-dimensional High Contrast Screenprint",
      "Thick 32mm Ribbed Neck Collar",
      "Limited Capsule Run — No Restocks"
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    images: {
      front: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Domain-expansion-1.webp",
      back: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Domain-expansion-2.webp",
      side: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Domain-expansion-3.webp",
      graphic: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Domain-expansion-4.webp",
      model: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Domain-expansion-5.webp"
    }
  },
  {
    id: "free-soul-tee",
    slug: "free-soul-tee",
    name: "FREE SOUL TEE",
    badge: "LIMITED",
    colorway: "OFF WHITE",
    price: "A$39.99",
    priceNum: 39.99,
    onSale: false,
    description: "Unchained and unbound. Walking the path without compromise. Featuring soaring celestial raven and freedom glyph artwork.",
    details: [
      "100% 240gsm Dense Natural Cotton",
      "Boxy Oversized Streetwear Fit",
      "Silkscreen Inks with Soft Hand Feel",
      "Heavy Duty Twin Needle Topstitching",
      "Edition 001 Archive Piece"
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    images: {
      front: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Free-soul-1.webp",
      back: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Free-soul-2.webp",
      side: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Free-soul-3.webp",
      graphic: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Free-soul-4.webp",
      model: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Free-soul-5.webp"
    }
  },
  {
    id: "limitless-tee",
    slug: "limitless-tee",
    name: "LIMITLESS TEE",
    badge: "LIMITED",
    colorway: "CYAN ELECTRIC",
    price: "A$39.99",
    priceNum: 39.99,
    onSale: false,
    description: "No boundaries, no limits. The apex of power. Designed for those who transcend mortal limitations in the modern sprawl.",
    details: [
      "100% 240gsm Ring-spun Heavyweight Cotton",
      "Modern Streetwear Cut with Extended Shoulders",
      "Electric Cyan & Monochromatic Graphic Layering",
      "Seamless Tubular Body Construction",
      "Australia-wide Shipping Ready"
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    images: {
      front: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Limitless-1.webp",
      back: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Limitless-2.webp",
      side: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Limitless-3.webp",
      graphic: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Limitless-4.webp",
      model: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Limitless-5.webp"
    }
  },
  {
    id: "paradise-spirit-tee",
    slug: "paradise-spirit-tee",
    name: "PARADISE SPIRIT TEE",
    badge: "LIMITED",
    colorway: "EMERALD JADE",
    price: "A$39.99",
    priceNum: 39.99,
    onSale: false,
    description: "A glimpse of tranquil eternity amid the chaos of the city. Floral spirit blossoms intertwining with ancient blade relics.",
    details: [
      "100% Heavyweight 240gsm Cotton",
      "Drop-shoulder Oversized Aesthetic",
      "High Definition Vibrant Pigment Print",
      "Reinforced Neckband & Side Seams",
      "Part of The_Origin_Drop Collection"
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    images: {
      front: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Paradise-spirit-1.webp",
      back: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Paradise-spirit-2.webp",
      side: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Paradise-spirit-3.webp",
      graphic: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Paradise-spirit-4.webp",
      model: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Paradise-spirit-5.webp"
    }
  },
  {
    id: "water-breathing-tee",
    slug: "water-breathing-tee",
    name: "WATER BREATHING TEE",
    badge: "LIMITED",
    colorway: "OCEAN TEAL",
    price: "A$39.99",
    priceNum: 39.99,
    onSale: false,
    description: "Flow like water, strike like a deluge. Master the tenth form. Dynamic fluid wave kinematics rendered in traditional ukiyo-e style.",
    details: [
      "100% Heavyweight 240gsm Cotton",
      "Oversized Urban Samurai Silhouette",
      "Full Back Wave Art Screenprint + Front Chest Crest",
      "Durable Double-needle Hem Finishing",
      "Strict Limited Release — No Restocks"
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    images: {
      front: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Water-breathing-1.webp",
      back: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Water-breathing-2.webp",
      side: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Water-breathing-3.webp",
      graphic: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Water-breathing-4.webp",
      model: "https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Water-breathing-5.webp"
    }
  }
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
