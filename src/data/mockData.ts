import { Category, Farmer, Product, Order, Settings, Review } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Fresh Vegetables',
    slug: 'fresh-vegetables',
    description: 'Directly harvested daily from local Telangana fields. Crisp, chemical-free greens and root vegetables.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  },
  {
    id: 'cat-2',
    name: 'Seasonal Fruits',
    slug: 'seasonal-fruits',
    description: 'Sun-ripened, naturally sweet orchard fruits picked at the peak of freshness.',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef9640b7?auto=format&fit=crop&w=800&q=80',
    itemCount: 2
  },
  {
    id: 'cat-3',
    name: 'Grains and Pulses',
    slug: 'grains-and-pulses',
    description: 'Unpolished traditional rice varieties, lentils, and protein-rich pulses straight from farmer granaries.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    itemCount: 2
  },
  {
    id: 'cat-4',
    name: 'Dairy and Eggs',
    slug: 'dairy-and-eggs',
    description: 'Pure A2 milk and pasture-raised country eggs from ethical, free-roaming farm animals.',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
    itemCount: 2
  },
  {
    id: 'cat-5',
    name: 'Herbs and Greens',
    slug: 'herbs-and-greens',
    description: 'Aromatic herbs, fragrant coriander, mint, and leafy microgreens harvested hours before delivery.',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80',
    itemCount: 1
  },
  {
    id: 'cat-6',
    name: 'Farm Essentials',
    slug: 'farm-essentials',
    description: 'Cold-pressed cooking oils, unrefined honey, jaggery, and artisanal pantry staples.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    itemCount: 2
  }
];

export const INITIAL_FARMERS: Farmer[] = [
  {
    id: 'farmer-1',
    name: 'Ramesh Reddy',
    farmName: 'Shamshabad Green Acres',
    email: 'ramesh.reddy@farmtohome.in',
    phone: '+91 98480 12345',
    location: 'Shamshabad Mandal',
    district: 'Rangareddy',
    state: 'Telangana',
    bio: 'Practicing sustainable farming for over 22 years. Specializing in naturally grown tomatoes, leafy greens, and seasonal vegetables with drip irrigation.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    farmImage: 'https://images.unsplash.com/photo-1595974482597-4f6c8f706346?auto=format&fit=crop&w=800&q=80',
    verificationStatus: 'approved',
    categories: ['Fresh Vegetables', 'Herbs and Greens'],
    rating: 4.8,
    reviewCount: 142,
    joinedDate: '2023-01-15'
  },
  {
    id: 'farmer-2',
    name: 'Laxmi Bai',
    farmName: 'Medchal Organic Orchards',
    email: 'laxmi.bai@farmtohome.in',
    phone: '+91 98490 23456',
    location: 'Medchal District',
    district: 'Medchal-Malkajgiri',
    state: 'Telangana',
    bio: 'Heritage fruit grower and traditional seed preserver. Our orchards yield delicious mangoes, guavas, and country bananas without synthetic ripening agents.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    farmImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    verificationStatus: 'approved',
    categories: ['Seasonal Fruits'],
    rating: 4.9,
    reviewCount: 98,
    joinedDate: '2023-03-20'
  },
  {
    id: 'farmer-3',
    name: 'Venkat Rao',
    farmName: 'Vikarabad Natural Grains & Dairy',
    email: 'venkat.rao@farmtohome.in',
    phone: '+91 98850 34567',
    location: 'Tandur Road',
    district: 'Vikarabad',
    state: 'Telangana',
    bio: 'Third-generation farmer dedicated to organic pulses, Sona Masuri paddy, and pure Gir cow A2 dairy products.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    farmImage: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80',
    verificationStatus: 'approved',
    categories: ['Grains and Pulses', 'Dairy and Eggs', 'Farm Essentials'],
    rating: 4.7,
    reviewCount: 215,
    joinedDate: '2022-11-10'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'farm-fresh-hybrid-tomatoes',
    name: 'Farm Fresh Tomatoes (Nadan & Hybrid)',
    categoryId: 'cat-1',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Reddy',
    price: 40,
    originalPrice: 50,
    unit: '1 kg',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546094096-0df4bca73671?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Juicy, plump red tomatoes harvested ripe from Shamshabad fields. Rich in lycopene and perfect for curries, salads, and soups.',
    storageInstructions: 'Store in a cool, dry place away from direct sunlight. Refrigerate only when fully ripe.',
    harvestInfo: 'Harvested yesterday morning.',
    origin: 'Shamshabad, Telangana',
    isSeasonal: false,
    isFeatured: true,
    available: true,
    createdAt: '2026-09-01'
  },
  {
    id: 'prod-2',
    slug: 'nashik-red-onions',
    name: 'Golden Red Onions',
    categoryId: 'cat-1',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Reddy',
    price: 35,
    originalPrice: 42,
    unit: '1 kg',
    stock: 250,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pungent, crispy red onions with thin skin. Essential base for every Indian kitchen preparation.',
    storageInstructions: 'Store in a ventilated basket in a cool, dry, dark place. Do not refrigerate.',
    harvestInfo: 'Cured and sorted in farm warehouse.',
    origin: 'Telangana & Maharashtra borders',
    isSeasonal: false,
    isFeatured: true,
    available: true,
    createdAt: '2026-09-02'
  },
  {
    id: 'prod-3',
    slug: 'tender-organic-spinach',
    name: 'Tender Palak (Spinach)',
    categoryId: 'cat-5',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Reddy',
    price: 20,
    unit: '1 bunch (250g)',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Vibrant green spinach leaves packed with iron and vitamins. Root-pruned and thoroughly washed.',
    storageInstructions: 'Wrap in a damp cloth or paper towel and store in refrigerator crisper.',
    harvestInfo: 'Harvested at dawn today.',
    origin: 'Shamshabad, Telangana',
    isSeasonal: true,
    isFeatured: true,
    available: true,
    createdAt: '2026-09-05'
  },
  {
    id: 'prod-4',
    slug: 'nendran-ripe-bananas',
    name: 'Organic Robusta Bananas',
    categoryId: 'cat-2',
    farmerId: 'farmer-2',
    farmerName: 'Laxmi Bai',
    price: 50,
    originalPrice: 60,
    unit: '1 dozen',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Naturally ripened, sweet, and potassium-rich bananas from Medchal orchards without carbide treatment.',
    storageInstructions: 'Keep at room temperature. Separate from other fruits to prevent over-ripening.',
    harvestInfo: 'Naturally tree-ripened.',
    origin: 'Medchal, Telangana',
    isSeasonal: false,
    isFeatured: true,
    available: true,
    createdAt: '2026-09-03'
  },
  {
    id: 'prod-5',
    slug: 'alphonso-mangoes-season',
    name: 'Banganapalli & Alphonso Mangoes',
    categoryId: 'cat-2',
    farmerId: 'farmer-2',
    farmerName: 'Laxmi Bai',
    price: 180,
    originalPrice: 220,
    unit: '1 kg',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The King of Fruits! Luscious, fibreless sweetness with rich aroma straight from heritage orchards.',
    storageInstructions: 'Ripen at room temperature in straw/paper. Once soft, chill before serving.',
    harvestInfo: 'Hand-picked at optimal maturity.',
    origin: 'Medchal Orchard, Telangana',
    isSeasonal: true,
    isFeatured: true,
    available: true,
    createdAt: '2026-09-04'
  },
  {
    id: 'prod-6',
    slug: 'premium-sona-masuri-rice',
    name: 'Aged Sona Masuri Raw Rice',
    categoryId: 'cat-3',
    farmerId: 'farmer-3',
    farmerName: 'Venkat Rao',
    price: 70,
    originalPrice: 85,
    unit: '1 kg',
    stock: 300,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Lightweight, aromatic medium-grain raw rice aged for 12 months. Ideal for daily meals and biryanis.',
    storageInstructions: 'Store in an airtight container with dry neem leaves or cloves.',
    harvestInfo: 'Milled from last season harvest.',
    origin: 'Vikarabad, Telangana',
    isSeasonal: false,
    isFeatured: true,
    available: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'prod-7',
    slug: 'unpolished-toor-dal',
    name: 'Country Unpolished Toor Dal',
    categoryId: 'cat-3',
    farmerId: 'farmer-3',
    farmerName: 'Venkat Rao',
    price: 120,
    originalPrice: 140,
    unit: '1 kg',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1585996740689-5483f36070fa?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1585996740689-5483f36070fa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-protein split pigeon peas sun-dried and traditionally milled without chemical polish.',
    storageInstructions: 'Store in airtight containers in a dry place.',
    origin: 'Tandur, Vikarabad',
    isSeasonal: false,
    isFeatured: false,
    available: true,
    createdAt: '2026-08-22'
  },
  {
    id: 'prod-8',
    slug: 'pure-gir-cow-a2-milk',
    name: 'Pure Gir Cow A2 Milk (Glass Bottle)',
    categoryId: 'cat-4',
    farmerId: 'farmer-3',
    farmerName: 'Venkat Rao',
    price: 65,
    unit: '1 litre',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80'
    ],
    description: '100% pure A2 beta-casein milk from indigenous grass-fed Gir cows. Delivered in reusable eco-glass bottles.',
    storageInstructions: 'Keep refrigerated below 4°C. Boil before consumption if preferred.',
    harvestInfo: 'Milked at 5:00 AM today.',
    origin: 'Vikarabad Dairy Farm',
    isSeasonal: false,
    isFeatured: true,
    available: true,
    createdAt: '2026-09-06'
  },
  {
    id: 'prod-9',
    slug: 'pasture-raised-country-eggs',
    name: 'Pasture-Raised Country Eggs',
    categoryId: 'cat-4',
    farmerId: 'farmer-3',
    farmerName: 'Venkat Rao',
    price: 90,
    unit: '1 dozen (12 eggs)',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Brown-shelled eggs from free-roaming country hens fed on natural grains and greens. Deep golden yolks.',
    storageInstructions: 'Store in refrigerator. Bring to room temperature before cooking.',
    origin: 'Vikarabad Farm',
    isSeasonal: false,
    isFeatured: false,
    available: true,
    createdAt: '2026-09-05'
  },
  {
    id: 'prod-10',
    slug: 'cold-pressed-groundnut-oil',
    name: 'Wood-Pressed Groundnut Oil (Mara Cheku)',
    categoryId: 'cat-6',
    farmerId: 'farmer-3',
    farmerName: 'Venkat Rao',
    price: 220,
    originalPrice: 250,
    unit: '1 litre',
    stock: 90,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Extracted using traditional wooden churner (ghhani) without heat or chemicals. Retains natural aroma and nutrients.',
    storageInstructions: 'Store in a cool dry place in tin or glass container.',
    origin: 'Vikarabad',
    isSeasonal: false,
    isFeatured: true,
    available: true,
    createdAt: '2026-08-15'
  }
];

export const INITIAL_SETTINGS: Settings = {
  announcementText: '🌿 Fresh produce from Telangana farmers. Direct delivery across Hyderabad & Secunderabad!',
  deliveryFee: 30,
  freeDeliveryThreshold: 499,
  enableCod: true,
  enableOnlinePayment: true,
  serviceablePincodes: ['500081', '500032', '500084', '500008', '500034', '500089', '500085', '500018']
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'FTH-98241',
    customerId: 'cust-1',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.sharma@example.com',
    customerPhone: '+91 98123 45678',
    items: [
      {
        productId: 'prod-1',
        productName: 'Farm Fresh Tomatoes (Nadan & Hybrid)',
        productImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
        price: 40,
        quantity: 2,
        unit: '1 kg',
        farmerId: 'farmer-1'
      },
      {
        productId: 'prod-4',
        productName: 'Organic Robusta Bananas',
        productImage: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
        price: 50,
        quantity: 1,
        unit: '1 dozen',
        farmerId: 'farmer-2'
      }
    ],
    subtotal: 130,
    deliveryCharge: 30,
    discount: 0,
    total: 160,
    shippingAddress: {
      id: 'addr-1',
      name: 'Ananya Sharma',
      phone: '+91 98123 45678',
      houseNo: 'Flat 402, Lotus Towers',
      locality: 'Gachibowli',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500032',
      isDefault: true
    },
    paymentMethod: 'online_razorpay',
    paymentStatus: 'paid',
    status: 'out_for_delivery',
    createdAt: '2026-10-08T08:30:00Z',
    deliveryInstructions: 'Leave with security guard if doorbell is not answered.',
    statusHistory: [
      { status: 'placed', timestamp: '2026-10-08T08:30:00Z', note: 'Order placed by customer' },
      { status: 'confirmed', timestamp: '2026-10-08T09:00:00Z', note: 'Order confirmed by farmers' },
      { status: 'preparing', timestamp: '2026-10-08T14:00:00Z', note: 'Produce harvested & packed' },
      { status: 'out_for_delivery', timestamp: '2026-10-09T07:00:00Z', note: 'Out for delivery with delivery partner' }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    customerId: 'cust-1',
    customerName: 'Ananya Sharma',
    rating: 5,
    comment: 'Extremely fresh tomatoes! You can tell they were picked right from the farm. Delivered neatly packaged.',
    createdAt: '2026-10-02'
  },
  {
    id: 'rev-2',
    productId: 'prod-8',
    customerId: 'cust-2',
    customerName: 'Rahul Varma',
    rating: 5,
    comment: 'The A2 milk in glass bottles tastes just like pure village milk. Excellent initiative supporting local dairy farmers.',
    createdAt: '2026-10-05'
  }
];
