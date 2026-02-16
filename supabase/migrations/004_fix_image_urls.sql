-- ============================================================
-- Fix broken Unsplash image URLs (404)
-- Migration: 004_fix_image_urls
-- ============================================================

-- Fix Toyota Avanza image (was photo-1549317661-bd32c8ce0afa → 404)
UPDATE public.vehicles
SET
  image_url = 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&fit=crop',
  images = ARRAY[
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&fit=crop',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&fit=crop'
  ]
WHERE name = 'Toyota Avanza 1.5 G';

-- Fix Honda Brio image (was photo-1606611013016-969c19ba27b5 → 404)
UPDATE public.vehicles
SET
  image_url = 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&fit=crop',
  images = ARRAY[
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&fit=crop'
  ]
WHERE name = 'Honda Brio Satya E CVT';
