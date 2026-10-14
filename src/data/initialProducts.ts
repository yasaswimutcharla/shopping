import { Product } from '../types';

import heroTechImg from '../assets/images/hero_banner_tech_1791990750273.jpg';
import catElectronicsImg from '../assets/images/category_electronics_1791990751074.jpg';
import catFashionImg from '../assets/images/category_fashion_1791990751429.jpg';
import catHomeKitchenImg from '../assets/images/category_home_kitchen_1791990754810.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  // ELECTRONICS (8 items)
  {
    id: 'prod-elec-1',
    name: 'AeroPulse Studio Wireless ANC Headphones',
    category: 'Electronics',
    brand: 'AeroSound',
    price: 8499,
    originalPrice: 14999,
    discountPercentage: 43,
    rating: 4.8,
    reviewCount: 1420,
    image: catElectronicsImg,
    description: 'Flagship active noise cancellation headphones with custom 40mm titanium drivers, 45-hour battery life, multi-point Bluetooth 5.3, and ultra-plush memory foam cushions.',
    specifications: {
      'Driver Size': '40mm Titanium Acoustic',
      'Battery Life': 'Up to 45 Hours (ANC On)',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm Aux',
      'Noise Cancellation': 'Hybrid Active Noise Cancellation (-38dB)',
      'Charging Time': '10 min quick charge for 5 hours',
      'Weight': '255g'
    },
    stock: 24,
    isBestSeller: true,
    isDealOfTheDay: true,
    isFeatured: true,
    tags: ['anc', 'headphones', 'wireless', 'bluetooth', 'audio'],
    reviews: [
      {
        id: 'rev-101',
        userName: 'Aarav Mehta',
        rating: 5,
        date: '2026-09-18',
        title: 'Exceptional soundstage and noise isolation',
        comment: 'Easily rivals headphones twice the price. The noise cancellation on metro commutes is virtually silent.',
        verifiedPurchase: true
      },
      {
        id: 'rev-102',
        userName: 'Priya Sundaram',
        rating: 5,
        date: '2026-09-24',
        title: 'Battery lasts all week!',
        comment: 'Charging once a week with 6-7 hours daily office usage. Super comfortable headband.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-elec-2',
    name: 'Zenith UltraBook Pro 15.6" M3 Silicon',
    category: 'Electronics',
    brand: 'ZenithTech',
    price: 84990,
    originalPrice: 99990,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 680,
    image: heroTechImg,
    description: 'Precision-crafted aerospace aluminum laptop featuring a 3.2K Liquid Retina OLED display, 16GB Unified RAM, 1TB NVMe Gen4 SSD, and an all-day 18-hour battery.',
    specifications: {
      'Processor': 'Octa-Core High Efficiency 3.8GHz',
      'Display': '15.6" OLED 3200x2000 120Hz 500nits',
      'Memory': '16GB LPDDR5X',
      'Storage': '1TB NVMe PCIe 4.0 SSD',
      'Weight': '1.38 kg',
      'Ports': '2x Thunderbolt 4, HDMI 2.1, SD Card Reader'
    },
    stock: 12,
    isBestSeller: true,
    isFeatured: true,
    tags: ['laptop', 'ultrabook', 'oled', 'computer'],
    reviews: [
      {
        id: 'rev-103',
        userName: 'Vikram Joshi',
        rating: 5,
        date: '2026-10-02',
        title: 'Best machine for coding and photo editing',
        comment: 'The OLED screen is breathtaking and compile times are lightning quick.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-elec-3',
    name: 'PulseFit Chrono Smartwatch with ECG & AMOLED',
    category: 'Electronics',
    brand: 'PulseFit',
    price: 3499,
    originalPrice: 6999,
    discountPercentage: 50,
    rating: 4.5,
    reviewCount: 3200,
    image: catElectronicsImg,
    description: 'Smart health companion with 1.43" Always-On AMOLED display, optical PPG heart rate sensor, SpO2 monitor, dual-band GPS, and 12-day battery endurance.',
    specifications: {
      'Display': '1.43" AMOLED 466x466 1000 nits',
      'Water Resistance': '5 ATM (50m Swimproof)',
      'Sensors': 'Optical HR, SpO2, Accelerometer, Barometer',
      'Battery': '12 Days Typical Usage',
      'Compatibility': 'Android & iOS'
    },
    stock: 45,
    isDealOfTheDay: true,
    tags: ['smartwatch', 'fitness', 'amoled', 'health'],
    reviews: [
      {
        id: 'rev-104',
        userName: 'Ananya Sharma',
        rating: 4,
        date: '2026-08-14',
        title: 'Great value for AMOLED display',
        comment: 'Bright outdoors under midday sun and step tracking matches my gym treadmill exactly.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-elec-4',
    name: 'Nova 5G Smartphone (8GB/256GB, 120Hz AMOLED)',
    category: 'Electronics',
    brand: 'NovaTech',
    price: 22999,
    originalPrice: 27999,
    discountPercentage: 18,
    rating: 4.6,
    reviewCount: 940,
    image: catElectronicsImg,
    description: 'Blazing fast 5G performance with 6.7" FHD+ 120Hz curved AMOLED, 64MP OIS main camera, 5000mAh battery, and 67W Turbo Flash charging.',
    specifications: {
      'Processor': 'Snapdragon 7 Gen 3 Octa-Core',
      'RAM / Storage': '8GB LPDDR5 / 256GB UFS 3.1',
      'Camera': '64MP Sony IMX + 8MP Ultra-wide',
      'Battery': '5000mAh with 67W Charger in box'
    },
    stock: 18,
    tags: ['smartphone', '5g', 'mobile', 'android'],
    reviews: []
  },
  {
    id: 'prod-elec-5',
    name: 'HyperKeys RGB Hot-Swappable Mechanical Keyboard',
    category: 'Electronics',
    brand: 'HyperGear',
    price: 4299,
    originalPrice: 6499,
    discountPercentage: 34,
    rating: 4.7,
    reviewCount: 512,
    image: heroTechImg,
    description: '75% compact wireless mechanical keyboard with pre-lubed linear switches, gasket mount acoustic dampening, hot-swap PCB, and per-key RGB backlighting.',
    specifications: {
      'Form Factor': '75% Layout (82 Keys)',
      'Switches': 'Gateron Yellow Pro Pre-lubed Linear',
      'Keycaps': 'Double-shot PBT Cherry Profile',
      'Modes': '2.4GHz Wireless, Bluetooth 5.0, USB-C'
    },
    stock: 28,
    tags: ['keyboard', 'gaming', 'mechanical', 'rgb']
  },
  {
    id: 'prod-elec-6',
    name: 'SoundWave 360 Waterproof Portable Bluetooth Speaker',
    category: 'Electronics',
    brand: 'AeroSound',
    price: 2499,
    originalPrice: 4999,
    discountPercentage: 50,
    rating: 4.4,
    reviewCount: 1120,
    image: catElectronicsImg,
    description: 'Rugged 24W 360-degree stereo sound speaker with dual passive radiators, IPX7 waterproof rating, PartySync linking, and 16 hours of continuous playtime.',
    specifications: {
      'Power Output': '24W RMS Stereo',
      'Waterproof': 'IPX7 Submersible',
      'Battery': '16 Hours Playtime (4400mAh)',
      'Dimensions': '180 x 75 x 75 mm'
    },
    stock: 35,
    isDealOfTheDay: true,
    tags: ['speaker', 'bluetooth', 'audio', 'portable']
  },
  {
    id: 'prod-elec-7',
    name: 'VoltCharge 25000mAh 65W Power Bank with Digital Display',
    category: 'Electronics',
    brand: 'ZenithTech',
    price: 2999,
    originalPrice: 4499,
    discountPercentage: 33,
    rating: 4.8,
    reviewCount: 810,
    image: catElectronicsImg,
    description: 'High-density airline-safe external battery pack capable of fast-charging laptops, tablets, and phones simultaneously with real-time wattage OLED readout.',
    specifications: {
      'Capacity': '25,000mAh / 92.5Wh',
      'Max Output': '65W Power Delivery 3.0',
      'Ports': '2x USB-C PD, 1x USB-A QC 3.0',
      'Weight': '420g'
    },
    stock: 40,
    tags: ['powerbank', 'charger', 'battery', 'accessories']
  },
  {
    id: 'prod-elec-8',
    name: 'VividView 27" 4K IPS Ergonomic Monitor (HDR400)',
    category: 'Electronics',
    brand: 'ZenithTech',
    price: 24990,
    originalPrice: 32990,
    discountPercentage: 24,
    rating: 4.7,
    reviewCount: 430,
    image: heroTechImg,
    description: 'Factory-calibrated 4K UHD 3840x2160 IPS display with 99% sRGB color gamut, USB-C 65W single-cable hub, height adjustable pivot stand, and blue light filter.',
    specifications: {
      'Resolution': '3840 x 2160 (4K UHD) at 60Hz',
      'Panel': 'IPS with Anti-Glare 350 nits',
      'Color Accuracy': '99% sRGB, Delta E < 2',
      'Stand': 'Height, Tilt, Swivel, Pivot'
    },
    stock: 8,
    tags: ['monitor', '4k', 'display', 'screen']
  },

  // FASHION (6 items)
  {
    id: 'prod-fash-1',
    name: 'Heritage Relaxed Overshirt in Sand Cotton',
    category: 'Fashion',
    brand: 'Nordic Threads',
    price: 1999,
    originalPrice: 3499,
    discountPercentage: 43,
    rating: 4.6,
    reviewCount: 780,
    image: catFashionImg,
    description: '100% premium long-staple organic cotton overshirt with buttoned patch chest pockets, tortoise buttons, and relaxed tailored fit for effortless layering.',
    specifications: {
      'Fabric': '100% Organic Ring-spun Cotton (240 GSM)',
      'Fit': 'Relaxed Modern Cut',
      'Care': 'Machine wash cold, hang dry',
      'Origin': 'Made in Coimbatore, India'
    },
    stock: 30,
    isBestSeller: true,
    isFeatured: true,
    tags: ['shirt', 'overshirt', 'clothing', 'men', 'cotton']
  },
  {
    id: 'prod-fash-2',
    name: 'Minimalist White Full-Grain Leather Sneakers',
    category: 'Fashion',
    brand: 'Stride & Craft',
    price: 3299,
    originalPrice: 5999,
    discountPercentage: 45,
    rating: 4.8,
    reviewCount: 1250,
    image: catFashionImg,
    description: 'Timeless low-top court sneakers handcrafted from supple Italian full-grain leather with cushioned Ortholite insoles and durable vulcanized rubber outsoles.',
    specifications: {
      'Upper': 'Full-grain Nappa Leather',
      'Sole': 'Natural Vulcanized Rubber Cupsole',
      'Lining': 'Breathable calfskin lining',
      'Insole': 'Removable Ergonomic Memory Foam'
    },
    stock: 19,
    isDealOfTheDay: true,
    tags: ['sneakers', 'shoes', 'footwear', 'leather']
  },
  {
    id: 'prod-fash-3',
    name: 'Urban Commuter Waxed Canvas Backpack 22L',
    category: 'Fashion',
    brand: 'Nordic Threads',
    price: 2799,
    originalPrice: 4499,
    discountPercentage: 38,
    rating: 4.7,
    reviewCount: 640,
    image: catFashionImg,
    description: 'Weather-resistant 16oz waxed duck canvas rucksack with genuine pull-up leather straps, padded 16-inch laptop compartment, and antique brass hardware.',
    specifications: {
      'Capacity': '22 Liters',
      'Laptop Sleeve': 'Fits up to 16" MacBook Pro',
      'Material': '16oz Water-Repellent Waxed Canvas',
      'Hardware': 'Solid Brass Buckles and YKK Zippers'
    },
    stock: 22,
    tags: ['backpack', 'bag', 'travel', 'canvas']
  },
  {
    id: 'prod-fash-4',
    name: 'Aviator Polarized Sunglasses with Titanium Frame',
    category: 'Fashion',
    brand: 'LuxeOptics',
    price: 1899,
    originalPrice: 3299,
    discountPercentage: 42,
    rating: 4.5,
    reviewCount: 390,
    image: catFashionImg,
    description: 'Ultra-lightweight aerospace titanium frames fitted with category 3 TAC polarized lenses offering 100% UV400 protection and glare reduction.',
    specifications: {
      'Lens': 'TAC Triacetate Polarized UV400',
      'Frame': 'Aerospace Beta-Titanium',
      'Weight': 'Only 18 grams',
      'Case': 'Protective hard leatherette case included'
    },
    stock: 35,
    tags: ['sunglasses', 'accessories', 'eyewear']
  },
  {
    id: 'prod-fash-5',
    name: 'Classic Vintage Wash Denim Trucker Jacket',
    category: 'Fashion',
    brand: 'DenimWorks',
    price: 2899,
    originalPrice: 4999,
    discountPercentage: 42,
    rating: 4.6,
    reviewCount: 510,
    image: catFashionImg,
    description: 'Classic 13.5oz non-stretch indigo denim jacket with authentic faded vintage wash, welt pockets, and adjustable waist tabs for a timeless silhouette.',
    specifications: {
      'Material': '100% Rigid Indigo Cotton Denim (13.5 oz)',
      'Fit': 'Regular Fit',
      'Collar': 'Point Collar with Shank Buttons',
      'Pockets': 'Dual chest flap and twin side entry pockets'
    },
    stock: 16,
    tags: ['jacket', 'denim', 'winter', 'outerwear']
  },
  {
    id: 'prod-fash-6',
    name: 'Everyday Pima Cotton Crew T-Shirts (Pack of 3)',
    category: 'Fashion',
    brand: 'Nordic Threads',
    price: 1299,
    originalPrice: 2199,
    discountPercentage: 41,
    rating: 4.7,
    reviewCount: 2100,
    image: catFashionImg,
    description: 'Trio of ultra-soft Peruvian Pima cotton basic tees in Black, Heather Gray, and Navy. Resists pilling and color fading wash after wash.',
    specifications: {
      'Material': '100% Combed Peruvian Pima Cotton',
      'Neckline': 'Ribbed Crewneck that keeps shape',
      'Pack Contents': '3 T-Shirts (Black, Navy, Heather)'
    },
    stock: 55,
    tags: ['tshirt', 'cotton', 'basics', 'clothing']
  },

  // HOME & KITCHEN (6 items)
  {
    id: 'prod-home-1',
    name: 'Artisan Barista 15-Bar Espresso & Cappuccino Machine',
    category: 'Home & Kitchen',
    brand: 'CulinaryPro',
    price: 14999,
    originalPrice: 21999,
    discountPercentage: 32,
    rating: 4.8,
    reviewCount: 920,
    image: catHomeKitchenImg,
    description: 'Commercial-style stainless steel espresso maker with Italian 15-bar pressure pump, professional steam milk frothing wand, thermo-block fast heating, and cup warmer.',
    specifications: {
      'Pump': '15-Bar Italian Electromagnetic Pump',
      'Water Tank': '1.8L Removable BPA-Free Reservoir',
      'Body': 'Brushed Food-Grade Stainless Steel',
      'Includes': 'Single & Double Portafilter, Metal Tamper, Milk Pitcher'
    },
    stock: 14,
    isBestSeller: true,
    isFeatured: true,
    tags: ['espresso', 'coffee', 'kitchen', 'appliance']
  },
  {
    id: 'prod-home-2',
    name: 'CrispAir Digital 6L Dual-Zone Air Fryer Oven',
    category: 'Home & Kitchen',
    brand: 'CulinaryPro',
    price: 5499,
    originalPrice: 8999,
    discountPercentage: 39,
    rating: 4.7,
    reviewCount: 1680,
    image: catHomeKitchenImg,
    description: 'Cook two dishes simultaneously with 360° rapid air vortex heating. Uses 85% less oil with 8 one-touch cooking presets and dishwasher-safe nonstick baskets.',
    specifications: {
      'Capacity': '6.0 Liters XXL Basket',
      'Power': '1750 Watts Rapid Heat',
      'Temperature Range': '40°C to 200°C',
      'Presets': 'Fries, Chicken, Fish, Bake, Reheat, Dehydrate'
    },
    stock: 25,
    isDealOfTheDay: true,
    tags: ['airfryer', 'cooking', 'kitchen', 'healthy']
  },
  {
    id: 'prod-home-3',
    name: 'Pre-Seasoned Heavy Duty Cast Iron Skillet Set (10" & 12")',
    category: 'Home & Kitchen',
    brand: 'IronHearth',
    price: 2199,
    originalPrice: 3499,
    discountPercentage: 37,
    rating: 4.9,
    reviewCount: 840,
    image: catHomeKitchenImg,
    description: 'Heirloom-grade virgin cast iron frying pans pre-seasoned with 100% natural vegetable flax oil for superior heat retention and stovetop-to-oven cooking.',
    specifications: {
      'Material': 'Cast Iron with Natural Flax Oil Coating',
      'Compatibility': 'Induction, Gas, Electric, Oven Safe to 260°C',
      'Set Includes': '10-inch skillet, 12-inch skillet, silicone grip handle'
    },
    stock: 32,
    tags: ['cookware', 'castiron', 'skillet', 'kitchen']
  },
  {
    id: 'prod-home-4',
    name: 'RoboClean LiDAR Smart Robot Vacuum with Mop',
    category: 'Home & Kitchen',
    brand: 'ZenithTech',
    price: 18999,
    originalPrice: 26999,
    discountPercentage: 30,
    rating: 4.6,
    reviewCount: 450,
    image: catHomeKitchenImg,
    description: 'Next-gen robot vacuum cleaner equipped with LDS laser precision navigation, 4000Pa cyclone suction, electronic water flow control, and carpet boost mode.',
    specifications: {
      'Suction Power': '4000Pa Max',
      'Navigation': '360° LiDAR LDS Laser Mapping',
      'Battery': '5200mAh (Up to 150 mins runtime)',
      'Dustbin / Tank': '450ml Dust / 250ml Water tank'
    },
    stock: 9,
    tags: ['vacuum', 'smart', 'cleaning', 'robot']
  },
  {
    id: 'prod-home-5',
    name: 'AromaZen Ultrasonic Ceramic Essential Oil Diffuser',
    category: 'Home & Kitchen',
    brand: 'AromaZen',
    price: 1599,
    originalPrice: 2499,
    discountPercentage: 36,
    rating: 4.5,
    reviewCount: 710,
    image: catHomeKitchenImg,
    description: 'Handcrafted matte porcelain ceramic essential oil mister with whisper-quiet ultrasonic vibrations, warm ambient LED glow, and auto shut-off safety.',
    specifications: {
      'Capacity': '200ml Water Basin',
      'Coverage': 'Up to 300 sq. ft.',
      'Timer Modes': '1H / 3H / 6H / Continuous',
      'Material': 'Handcrafted Ceramic Top with BPA-free base'
    },
    stock: 40,
    tags: ['diffuser', 'aromatherapy', 'home', 'decor']
  },
  {
    id: 'prod-home-6',
    name: 'Minimalist Scandinavian Matte Ceramic Dinner Set (16 Pcs)',
    category: 'Home & Kitchen',
    brand: 'IronHearth',
    price: 3499,
    originalPrice: 5499,
    discountPercentage: 36,
    rating: 4.7,
    reviewCount: 310,
    image: catHomeKitchenImg,
    description: '16-piece stoneware service for 4 including dinner plates, salad plates, cereal bowls, and matching mugs in a contemporary matte slate grey finish.',
    specifications: {
      'Pieces': '4x Dinner (10.5"), 4x Salad (8"), 4x Bowl (6"), 4x Mug (350ml)',
      'Material': 'High-Fired Durable Stoneware',
      'Safety': 'Microwave, Dishwasher, and Freezer Safe'
    },
    stock: 15,
    tags: ['dinnerware', 'plates', 'ceramic', 'dining']
  },

  // BOOKS (4 items)
  {
    id: 'prod-book-1',
    name: 'System Design Interview – An Insider’s Comprehensive Guide',
    category: 'Books',
    brand: 'TechPress',
    price: 799,
    originalPrice: 1299,
    discountPercentage: 38,
    rating: 4.9,
    reviewCount: 3850,
    image: heroTechImg,
    description: 'The definitive handbook for engineering students and senior software developers preparing for system design interviews with distributed systems diagrams and case studies.',
    specifications: {
      'Author': 'Alex Xu',
      'Format': 'Paperback, 320 Pages',
      'Language': 'English',
      'Publisher': 'ByteByteGo Press'
    },
    stock: 60,
    isBestSeller: true,
    isFeatured: true,
    tags: ['books', 'engineering', 'programming', 'study']
  },
  {
    id: 'prod-book-2',
    name: 'The Pragmatic Programmer: 20th Anniversary Edition',
    category: 'Books',
    brand: 'TechPress',
    price: 899,
    originalPrice: 1499,
    discountPercentage: 40,
    rating: 4.8,
    reviewCount: 2200,
    image: heroTechImg,
    description: 'One of the most influential software books of all time. Filled with timeless analogies and real-world advice to make developers better craftspeople.',
    specifications: {
      'Authors': 'David Thomas, Andrew Hunt',
      'Format': 'Hardcover, 352 Pages',
      'Edition': '20th Anniversary Edition'
    },
    stock: 45,
    tags: ['books', 'coding', 'career', 'pragmatic']
  },
  {
    id: 'prod-book-3',
    name: 'Atomic Habits: Tiny Changes, Remarkable Results',
    category: 'Books',
    brand: 'TechPress',
    price: 499,
    originalPrice: 799,
    discountPercentage: 38,
    rating: 4.9,
    reviewCount: 9500,
    image: heroTechImg,
    description: 'James Clear’s worldwide bestselling manual on breaking bad habits, engineering empowering systems, and achieving 1% daily compounding improvement.',
    specifications: {
      'Author': 'James Clear',
      'Format': 'Paperback, 320 Pages',
      'Language': 'English'
    },
    stock: 120,
    isBestSeller: true,
    tags: ['books', 'selfhelp', 'habits', 'bestseller']
  },
  {
    id: 'prod-book-4',
    name: 'Deep Work: Rules for Focused Success in a Distracted World',
    category: 'Books',
    brand: 'TechPress',
    price: 449,
    originalPrice: 699,
    discountPercentage: 36,
    rating: 4.7,
    reviewCount: 1840,
    image: heroTechImg,
    description: 'Cal Newport presents the superpower of modern knowledge work: learning how to eliminate digital distractions and produce breakthrough creative output.',
    specifications: {
      'Author': 'Cal Newport',
      'Format': 'Paperback, 304 Pages',
      'Language': 'English'
    },
    stock: 50,
    tags: ['books', 'focus', 'productivity', 'study']
  },

  // BEAUTY (3 items)
  {
    id: 'prod-beau-1',
    name: 'Hydra-Glow Multi-Molecular Hyaluronic Acid Serum 50ml',
    category: 'Beauty',
    brand: 'PureBotanics',
    price: 899,
    originalPrice: 1599,
    discountPercentage: 44,
    rating: 4.7,
    reviewCount: 1520,
    image: catFashionImg,
    description: 'Deeply hydrating facial serum with 5 weights of hyaluronic acid, vitamin B5 panthenol, and soothing centella asiatica for plump, dewy morning skin.',
    specifications: {
      'Volume': '50ml Glass Dropper Bottle',
      'Skin Type': 'All Skin Types (Dermatologist Tested)',
      'Key Ingredients': 'Hyaluronic Acid 2%, Vitamin B5, Niacinamide 1%',
      'Free From': 'Parabens, Sulfates, Fragrance'
    },
    stock: 42,
    isDealOfTheDay: true,
    tags: ['skincare', 'serum', 'beauty', 'glow']
  },
  {
    id: 'prod-beau-2',
    name: 'SPF 50+ PA++++ Invisible Water Gel Sunscreen 100g',
    category: 'Beauty',
    brand: 'PureBotanics',
    price: 649,
    originalPrice: 999,
    discountPercentage: 35,
    rating: 4.8,
    reviewCount: 2300,
    image: catFashionImg,
    description: 'Ultra-lightweight water-burst sun gel leaving zero white cast and no greasy residue. Offers broad-spectrum UVA/UVB and blue light defense.',
    specifications: {
      'Protection': 'SPF 50+ / PA++++ Broad Spectrum',
      'Weight': '100g Squeeze Tube',
      'Finish': 'Matte Invisible Finish, Reef-Safe'
    },
    stock: 65,
    isBestSeller: true,
    tags: ['sunscreen', 'skincare', 'beauty', 'protection']
  },
  {
    id: 'prod-beau-3',
    name: 'Botanical Keratin Hair Repair & Moisture Mask 250ml',
    category: 'Beauty',
    brand: 'PureBotanics',
    price: 799,
    originalPrice: 1299,
    discountPercentage: 38,
    rating: 4.6,
    reviewCount: 880,
    image: catFashionImg,
    description: 'Intensive deep-conditioning hair treatment enriched with cold-pressed Moroccan argan oil, amino acids, and plant keratin to restore damaged tresses.',
    specifications: {
      'Volume': '250ml Jar',
      'Application': '5-10 minute post-shampoo rinse treatment',
      'Hair Type': 'Dry, damaged, or color-treated hair'
    },
    stock: 33,
    tags: ['haircare', 'keratin', 'beauty', 'treatment']
  },

  // SPORTS (3 items)
  {
    id: 'prod-sport-1',
    name: 'ProGrip Quick-Adjust 24kg Dumbbell Set (Pair)',
    category: 'Sports',
    brand: 'ApexFitness',
    price: 11999,
    originalPrice: 18999,
    discountPercentage: 37,
    rating: 4.8,
    reviewCount: 620,
    image: heroTechImg,
    description: 'Space-saving selector dial dumbbells replacing 15 sets of weights. Adjust effortlessly from 2.5kg to 24kg with a single turn of the ergonomic dial.',
    specifications: {
      'Weight Range': '2.5kg to 24kg per dumbbell (5.5 to 52.5 lbs)',
      'Mechanism': 'Precision Turn Dial with Steel Gear Lock',
      'Includes': 'Pair of 2 dumbbells with dedicated storage cradles'
    },
    stock: 10,
    isBestSeller: true,
    tags: ['fitness', 'gym', 'dumbbells', 'workout']
  },
  {
    id: 'prod-sport-2',
    name: 'EcoAlign 6mm Non-Slip Natural Tree Rubber Yoga Mat',
    category: 'Sports',
    brand: 'ApexFitness',
    price: 1899,
    originalPrice: 2999,
    discountPercentage: 37,
    rating: 4.7,
    reviewCount: 940,
    image: catFashionImg,
    description: 'High-density natural rubber exercise mat with laser-etched body alignment lines, moisture-absorbing textured grip, and matching carrying strap.',
    specifications: {
      'Thickness': '6mm High-Density Joint Cushioning',
      'Dimensions': '183cm x 68cm Extra Wide',
      'Material': 'Biodegradable Natural Tree Rubber + PU Surface'
    },
    stock: 38,
    tags: ['yoga', 'fitness', 'mat', 'exercise']
  },
  {
    id: 'prod-sport-3',
    name: 'ThermosShield 1000ml Insulated Stainless Steel Flask',
    category: 'Sports',
    brand: 'ApexFitness',
    price: 999,
    originalPrice: 1599,
    discountPercentage: 38,
    rating: 4.8,
    reviewCount: 1750,
    image: catHomeKitchenImg,
    description: 'Triple-walled vacuum insulation keeping drinks ice cold for 24 hours or steaming hot for 12 hours. Sweat-proof powder coat with leakproof chug lid.',
    specifications: {
      'Capacity': '1000ml (32 oz)',
      'Insulation': 'Triple-wall copper vacuum insulation',
      'Material': '18/8 Pro-Grade Kitchen Stainless Steel',
      'Lid': 'Spout Lid with Ergonomic Carry Loop'
    },
    stock: 58,
    isDealOfTheDay: true,
    tags: ['bottle', 'flask', 'sports', 'hydration']
  },

  // TOYS & HOBBIES (2 items)
  {
    id: 'prod-toy-1',
    name: 'RoboSTEM Arduino Programmable Robotics Explorer Kit',
    category: 'Toys',
    brand: 'LearnTech',
    price: 3499,
    originalPrice: 5499,
    discountPercentage: 36,
    rating: 4.9,
    reviewCount: 430,
    image: catElectronicsImg,
    description: 'Hands-on educational robotics kit for students and makers. Assemble a smart obstacle-avoidance tank with ultrasonic sensor, line tracking, and scratch/C++ coding.',
    specifications: {
      'Microcontroller': 'ATmega328P Compatible Board',
      'Components': 'Chassis, 4 DC Motors, Ultrasonic Sensor, Bluetooth Module',
      'Recommended Age': '10+ Years & Engineering Students',
      'Tutorials': 'Comprehensive 24-lesson interactive guide'
    },
    stock: 22,
    isBestSeller: true,
    isFeatured: true,
    tags: ['robotics', 'stem', 'arduino', 'educational', 'toys']
  },
  {
    id: 'prod-toy-2',
    name: 'AeroSky Falcon 4K HD GPS Foldable Drone',
    category: 'Toys',
    brand: 'LearnTech',
    price: 7999,
    originalPrice: 12999,
    discountPercentage: 38,
    rating: 4.6,
    reviewCount: 520,
    image: catElectronicsImg,
    description: 'Foldable quadcopter drone equipped with 4K UHD stabilized camera, GPS auto-return home, gesture selfies, brushless motors, and 28 minutes flight time.',
    specifications: {
      'Camera': '4K EIS Anti-Shake with 90° Adjustable Gimbal',
      'Flight Time': '28 Mins per battery (Includes 2 batteries)',
      'Transmission': '5GHz FPV up to 1200 meters',
      'Features': 'Follow-Me, Orbit Mode, Tap-to-Fly'
    },
    stock: 14,
    tags: ['drone', 'gadget', 'rc', 'camera', 'toys']
  }
];

export const AVAILABLE_COUPONS = [
  {
    code: 'EXPO2026',
    discountPercentage: 10,
    minOrderValue: 999,
    description: 'College Expo Special: 10% instant discount on orders above ₹999'
  },
  {
    code: 'SHOPSPHERE',
    discountPercentage: 15,
    minOrderValue: 2499,
    description: 'Welcome to ShopSphere: 15% discount on orders above ₹2,499'
  },
  {
    code: 'SUPERSTUDENT',
    discountPercentage: 20,
    minOrderValue: 4999,
    description: 'Student Expo Pass: 20% savings on orders above ₹4,999'
  }
];
