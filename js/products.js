// Alraqi Store - Product Data

const PRODUCTS = [
  {
    id: 1,
    name: { ar: "ساعة كلاسيكية فاخرة", en: "Classic Luxury Watch" },
    price: 2499,
    oldPrice: 3199,
    category: "luxury",
    badge: { ar: "خصم 22%", en: "22% OFF" },
    emoji: "⌚",
    rating: 4.9,
    reviews: 128,
    description: {
      ar: "ساعة يد فاخرة بتصميم كلاسيكي أنيق، مصنوعة من مواد عالية الجودة مع مقاومة للماء.",
      en: "Elegant classic wristwatch made from premium materials with water resistance."
    },
    stock: 15
  },
  {
    id: 2,
    name: { ar: "سماعة لاسلكية بريميوم", en: "Premium Wireless Earbuds" },
    price: 899,
    oldPrice: null,
    category: "new",
    badge: { ar: "جديد", en: "NEW" },
    emoji: "🎧",
    rating: 4.8,
    reviews: 86,
    description: {
      ar: "سماعة لاسلكية بتقنية إلغاء الضوضاء وجودة صوت استثنائية، بطارية تدوم 30 ساعة.",
      en: "Wireless earbuds with noise cancellation and exceptional sound quality, 30-hour battery."
    },
    stock: 42
  },
  {
    id: 3,
    name: { ar: "حقيبة جلدية أنيقة", en: "Elegant Leather Bag" },
    price: 1599,
    oldPrice: 1899,
    category: "bestsellers",
    badge: { ar: "الأكثر مبيعاً", en: "BESTSELLER" },
    emoji: "👜",
    rating: 4.7,
    reviews: 203,
    description: {
      ar: "حقيبة يد جلدية أصلية بتصميم عصري وأنيق، مثالية للاستخدام اليومي والمناسبات.",
      en: "Genuine leather handbag with modern elegant design, perfect for daily use and occasions."
    },
    stock: 28
  },
  {
    id: 4,
    name: { ar: "نظارة شمسية راقية", en: "Premium Sunglasses" },
    price: 649,
    oldPrice: 799,
    category: "sale",
    badge: { ar: "عرض", en: "SALE" },
    emoji: "🕶️",
    rating: 4.6,
    reviews: 94,
    description: {
      ar: "نظارة شمسية بحماية UV400 وإطار معدني خفيف، تصميم يناسب الجنسين.",
      en: "Sunglasses with UV400 protection and lightweight metal frame, unisex design."
    },
    stock: 56
  },
  {
    id: 5,
    name: { ar: "عطر شرقي فاخر", en: "Oriental Luxury Perfume" },
    price: 1299,
    oldPrice: null,
    category: "luxury",
    badge: null,
    emoji: "🧴",
    rating: 4.9,
    reviews: 167,
    description: {
      ar: "عطر شرقي فاخر بتركيبة فريدة من العود والعنبر والمسك، ثبات عالي.",
      en: "Oriental luxury perfume with unique blend of oud, amber and musk, long-lasting."
    },
    stock: 33
  },
  {
    id: 6,
    name: { ar: "محفظة جلد طبيعي", en: "Genuine Leather Wallet" },
    price: 399,
    oldPrice: 499,
    category: "bestsellers",
    badge: { ar: "خصم", en: "SALE" },
    emoji: "👛",
    rating: 4.5,
    reviews: 112,
    description: {
      ar: "محفظة رجالية من الجلد الطبيعي، تصميم عملي وأنيق مع حماية RFID.",
      en: "Men's genuine leather wallet, practical elegant design with RFID protection."
    },
    stock: 67
  },
  {
    id: 7,
    name: { ar: "ساعة ذكية رياضية", en: "Smart Sports Watch" },
    price: 1899,
    oldPrice: null,
    category: "new",
    badge: { ar: "جديد", en: "NEW" },
    emoji: "⌚",
    rating: 4.8,
    reviews: 75,
    description: {
      ar: "ساعة ذكية متطورة لتتبع اللياقة والصحة، مقاومة للماء مع شاشة AMOLED.",
      en: "Advanced smartwatch for fitness and health tracking, waterproof with AMOLED display."
    },
    stock: 21
  },
  {
    id: 8,
    name: { ar: "طقم أدوات مكتبية", en: "Premium Desk Set" },
    price: 749,
    oldPrice: 949,
    category: "sale",
    badge: { ar: "عرض", en: "SALE" },
    emoji: "✒️",
    rating: 4.4,
    reviews: 48,
    description: {
      ar: "طقم مكتبي فاخر يشمل قلم ودفتر وحافظة، مناسب كهدايا أنيقة.",
      en: "Luxury desk set including pen, notebook and case, perfect as elegant gifts."
    },
    stock: 19
  }
];
