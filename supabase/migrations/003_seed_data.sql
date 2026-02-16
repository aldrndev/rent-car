-- ============================================================
-- RentaGo Seed Data
-- Migration: 003_seed_data
-- ============================================================

-- ============================================================
-- VEHICLES — Cars
-- ============================================================
INSERT INTO public.vehicles (name, type, brand, model, year, price_per_day, description, image_url, images, is_available, features, transmission, seats, engine_cc) VALUES

-- 1. Toyota Avanza
(
  'Toyota Avanza 1.5 G',
  'car',
  'Toyota',
  'Avanza',
  2024,
  350000,
  'MPV keluarga terlaris di Indonesia. Kabin luas untuk 7 penumpang dengan bagasi yang cukup untuk perjalanan keluarga. Mesin 1.5L Dual VVT-i irit bahan bakar.',
  'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&fit=crop',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&fit=crop'
  ],
  true,
  '["AC", "Power Steering", "Power Window", "Central Lock", "USB Charger", "7 Seats"]',
  'automatic',
  7,
  1496
),

-- 2. Honda Brio Satya
(
  'Honda Brio Satya E CVT',
  'car',
  'Honda',
  'Brio',
  2024,
  280000,
  'City car compact dan stylish. Cocok untuk mobilitas di dalam kota dengan parkir mudah. Mesin i-VTEC 1.2L efisien dan responsif.',
  'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&fit=crop'
  ],
  true,
  '["AC", "Power Steering", "Airbag", "ABS", "USB Charger", "Start/Stop Button"]',
  'automatic',
  5,
  1199
),

-- 3. Toyota Innova Reborn
(
  'Toyota Innova Reborn V',
  'car',
  'Toyota',
  'Innova',
  2024,
  550000,
  'MPV premium pilihan keluarga. Interior mewah dengan captain seat di baris kedua. Diesel 2.4L bertenaga dan irit. Suspensi nyaman untuk perjalanan jauh.',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&fit=crop',
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&fit=crop'
  ],
  true,
  '["AC Double Blower", "Captain Seat", "Leather Interior", "Cruise Control", "Rear Camera", "7 Seats"]',
  'automatic',
  7,
  2393
),

-- 4. Mitsubishi Pajero Sport
(
  'Mitsubishi Pajero Sport Dakar',
  'car',
  'Mitsubishi',
  'Pajero Sport',
  2024,
  750000,
  'SUV tangguh untuk segala medan. Cocok untuk adventure dan perjalanan luar kota. Fitur 4WD dan Super Select II untuk off-road. Interior premium dan mewah.',
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&fit=crop',
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&fit=crop',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&fit=crop'
  ],
  true,
  '["4WD", "Sunroof", "Leather Seat", "Paddle Shift", "360 Camera", "ADAS", "7 Seats"]',
  'automatic',
  7,
  2442
),

-- 5. Daihatsu Xenia
(
  'Daihatsu Xenia 1.3 R Deluxe',
  'car',
  'Daihatsu',
  'Xenia',
  2023,
  300000,
  'MPV affordable dan praktis. Cocok untuk keluarga dengan budget terjangkau. Mesin 1.3L DOHC Dual VVT-i irit BBM.',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&fit=crop',
    'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&fit=crop',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&fit=crop'
  ],
  true,
  '["AC", "Power Steering", "Power Window", "Central Lock", "7 Seats", "Fog Lamp"]',
  'manual',
  7,
  1329
),

-- 6. Toyota Rush
(
  'Toyota Rush S TRD Sportivo',
  'car',
  'Toyota',
  'Rush',
  2024,
  400000,
  'Compact SUV dengan ground clearance tinggi. Desain sporty dan tangguh. Cocok untuk daily use dan perjalanan luar kota.',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&fit=crop',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&fit=crop',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&fit=crop'
  ],
  true,
  '["AC", "Push Start", "Rear Camera", "Parking Sensor", "TRD Body Kit", "7 Seats"]',
  'automatic',
  7,
  1496
),

-- 7. Suzuki Ertiga
(
  'Suzuki Ertiga GX',
  'car',
  'Suzuki',
  'Ertiga',
  2024,
  320000,
  'MPV modern dengan Smart Hybrid Vehicle. Mesin K15B 1.5L efisien dengan teknologi mild hybrid untuk penghematan bahan bakar.',
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&fit=crop',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&fit=crop'
  ],
  true,
  '["AC", "SHVS Hybrid", "Keyless Entry", "Push Start", "USB Charger", "7 Seats"]',
  'automatic',
  7,
  1462
),

-- 8. Honda HR-V
(
  'Honda HR-V SE',
  'car',
  'Honda',
  'HR-V',
  2024,
  500000,
  'Crossover SUV stylish dengan desain modern. Honda SENSING keselamatan aktif. Interior luas dan bagasi terbesar di kelasnya.',
  'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&fit=crop',
    'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&fit=crop',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&fit=crop'
  ],
  true,
  '["Honda SENSING", "Lane Keep Assist", "Adaptive Cruise", "Panoramic Sunroof", "Wireless Charger", "5 Seats"]',
  'automatic',
  5,
  1498
);

-- ============================================================
-- VEHICLES — Motorcycles
-- ============================================================
INSERT INTO public.vehicles (name, type, brand, model, year, price_per_day, description, image_url, images, is_available, features, transmission, seats, engine_cc) VALUES

-- 1. Honda Vario 160
(
  'Honda Vario 160 ABS',
  'motorcycle',
  'Honda',
  'Vario 160',
  2024,
  100000,
  'Skutik premium dengan mesin eSP+ 160cc. Performa bertenaga dengan konsumsi BBM irit. Fitur ABS dan Smart Key untuk keamanan.',
  'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&fit=crop',
    'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=800&fit=crop',
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&fit=crop'
  ],
  true,
  '["ABS", "Smart Key", "USB Charger", "LED Headlight", "Digital Speedometer"]',
  'automatic',
  NULL,
  160
),

-- 2. Yamaha NMAX
(
  'Yamaha NMAX 155 Connected',
  'motorcycle',
  'Yamaha',
  'NMAX',
  2024,
  120000,
  'Maxi-scooter connected premium. Y-Connect app untuk monitoring motor via smartphone. Suspensi nyaman untuk touring.',
  'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&fit=crop',
    'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&fit=crop',
    'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&fit=crop'
  ],
  true,
  '["ABS", "Y-Connect", "TCS", "Smart Key", "LED All", "USB Charger"]',
  'automatic',
  NULL,
  155
),

-- 3. Honda PCX 160
(
  'Honda PCX 160 e:HEV',
  'motorcycle',
  'Honda',
  'PCX',
  2024,
  130000,
  'Skutik flagship Honda dengan teknologi hybrid. Honda Selectable Torque Control untuk keamanan. Paling nyaman di kelasnya.',
  'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&fit=crop',
    'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&fit=crop',
    'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800&fit=crop'
  ],
  true,
  '["Hybrid", "HSTC", "Smart Key", "USB Type-C", "Emergency Stop Signal", "Idling Stop"]',
  'automatic',
  NULL,
  157
),

-- 4. Honda Beat
(
  'Honda BeAT Street CBS',
  'motorcycle',
  'Honda',
  'Beat',
  2024,
  75000,
  'Skutik paling populer di Indonesia. Ringan, irit, dan mudah dikendarai. Cocok untuk mobilitas sehari-hari.',
  'https://images.unsplash.com/photo-1580341289255-5b47c98a59dd?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1580341289255-5b47c98a59dd?w=800&fit=crop',
    'https://images.unsplash.com/photo-1599819811279-d5ad9cccb35b?w=800&fit=crop',
    'https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=800&fit=crop'
  ],
  true,
  '["Combi Brake", "Fuel Injection", "LED Headlight", "Helmet-In", "Side Stand Switch"]',
  'automatic',
  NULL,
  110
),

-- 5. Yamaha Aerox 155
(
  'Yamaha Aerox 155 Connected',
  'motorcycle',
  'Yamaha',
  'Aerox',
  2024,
  110000,
  'Sport scooter dengan DNA R-Series. VVA engine bertenaga. Desain agresif. Y-Connect dan TCS untuk pengalaman berkendara premium.',
  'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&fit=crop',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&fit=crop',
    'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&fit=crop'
  ],
  true,
  '["Y-Connect", "TCS", "VVA Engine", "Smart Key", "LED All", "Wide Tire"]',
  'automatic',
  NULL,
  155
),

-- 6. Kawasaki Ninja 250
(
  'Kawasaki Ninja ZX-25R SE',
  'motorcycle',
  'Kawasaki',
  'Ninja ZX-25R',
  2024,
  250000,
  'Sport bike 250cc 4-silinder dengan performa racing. Quickshifter, traction control, riding mode. Suara mesin khas inline-4.',
  'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&fit=crop',
    'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&fit=crop',
    'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&fit=crop'
  ],
  true,
  '["Quickshifter", "Traction Control", "Riding Mode", "ABS", "Slipper Clutch", "LED All"]',
  'manual',
  NULL,
  249
),

-- 7. Honda CRF 150L
(
  'Honda CRF 150L',
  'motorcycle',
  'Honda',
  'CRF 150L',
  2024,
  150000,
  'Trail bike untuk segala medan. Ground clearance tinggi dengan suspensi long-travel. Cocok untuk adventure off-road.',
  'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800&fit=crop',
    'https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=800&fit=crop',
    'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&fit=crop'
  ],
  true,
  '["Fuel Injection", "Pro-Link Suspension", "Wavy Disc", "LED Headlight", "Off-Road Ready"]',
  'manual',
  NULL,
  149
);

-- ============================================================
-- PROMO CODES
-- ============================================================
INSERT INTO public.promos (code, description, discount_amount, min_booking_days, usage_limit, is_first_order_only, is_active, valid_from, valid_until) VALUES
(
  'WELCOME50K',
  'Diskon Rp 50.000 untuk member baru! Berlaku untuk booking pertama kamu.',
  50000,
  1,
  NULL,
  true,
  true,
  now(),
  now() + INTERVAL '6 months'
),
(
  'RENTAL3HARI',
  'Diskon Rp 100.000 untuk sewa minimal 3 hari.',
  100000,
  3,
  100,
  false,
  true,
  now(),
  now() + INTERVAL '3 months'
),
(
  'WEEKEND30K',
  'Diskon Rp 30.000 untuk booking weekend.',
  30000,
  1,
  200,
  false,
  true,
  now(),
  now() + INTERVAL '2 months'
),
(
  'MOTORFUN',
  'Diskon Rp 25.000 khusus sewa motor minimal 2 hari.',
  25000,
  2,
  150,
  false,
  true,
  now(),
  now() + INTERVAL '3 months'
);
