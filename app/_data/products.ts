import { Product } from '../_components/ProductCard';

export const PRODUCTS: Product[] = [
  {
    id: 'anabolic-bar',
    name: 'DNA Anabolic Bar',
    tagline: 'Your Aesthetic Blueprint in a Wrapper',
    slug: 'anabolic-bar',
    price: 299,
    originalPrice: 399,
    subscribePrice: 249,
    image: '/anabolic-bar.png',
    badge: 'Best Seller',
    badgeColor: 'var(--gradient-gold)',
    accentColor: '#c9a227',
    benefits: ['10g Protein', 'Creatine Support', 'Glutamine', 'Ashwagandha', 'Zero Bloat'],
    rating: 4.8,
    reviewCount: 1247,
  },
  {
    id: 'collagen-glow-bar',
    name: 'Collagen Glow Bar',
    tagline: 'Repair & Radiance',
    slug: 'collagen-glow-bar',
    price: 329,
    originalPrice: 429,
    subscribePrice: 279,
    image: '/collagen-bar.png',
    badge: 'New',
    badgeColor: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    accentColor: '#f43f5e',
    benefits: ['10g Protein', 'Collagen Builder', 'Joint Support', 'Skin Health', 'Glutamine'],
    rating: 4.9,
    reviewCount: 863,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rohan Mehta',
    role: 'Competitive Bodybuilder',
    rating: 5,
    text: 'The Anabolic Bar is now part of my post-workout ritual. The creatine support makes a real difference in recovery. Tastes incredible too.',
    avatar: '🏋️',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Fitness Coach',
    rating: 5,
    text: 'Finally a bar that actually works for both performance AND taste. My clients are obsessed with the Collagen Glow Bar.',
    avatar: '💪',
  },
  {
    id: 3,
    name: 'Arjun Singh',
    role: 'Marathon Runner',
    rating: 5,
    text: 'Zero bloat formula is a game changer. I can eat this during long runs without any discomfort. Subscribed for life.',
    avatar: '🏃',
  },
  {
    id: 4,
    name: 'Kavya Nair',
    role: 'Yoga Instructor & Wellness Coach',
    rating: 5,
    text: 'The Collagen Glow Bar has improved my skin elasticity noticeably after 4 weeks. Love the subscription savings too.',
    avatar: '🧘',
  },
  {
    id: 5,
    name: 'Vikram Patel',
    role: 'CrossFit Athlete',
    rating: 5,
    text: 'Most protein bars leave me feeling heavy. DNA Bars are different — light, effective, and the ashwagandha really helps with stress.',
    avatar: '🔥',
  },
];

export const FAQS = [
  {
    question: 'What makes DNA Bars different from other protein bars?',
    answer: 'DNA Bars are formulated with functional ingredients beyond just protein — including Creatine for muscle support, Glutamine for recovery, and Ashwagandha for stress adaptation. Our Zero Bloat formula ensures digestive comfort so you can fuel without compromise.',
  },
  {
    question: 'How much protein is in each bar?',
    answer: 'Each bar contains 10g of Elite Protein from high-quality sources. Combined with our functional ingredients, this makes each bar a complete performance nutrition solution.',
  },
  {
    question: 'Are DNA Bars suitable for women?',
    answer: 'Absolutely! The Collagen Glow Bar is specifically designed for women — with collagen builders for skin health, joint support, and a complete wellness profile. The Anabolic Bar is also suitable for women focused on fitness and recovery.',
  },
  {
    question: 'How does the subscription work?',
    answer: 'Choose your preferred delivery frequency (monthly, bi-monthly, or quarterly), and we\'ll automatically deliver and bill you. Save up to 20% vs one-time purchases. You can pause, skip, or cancel anytime from your dashboard.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI, Credit Cards, Debit Cards, Net Banking, and popular wallets. All payments are secured with SSL encryption.',
  },
  {
    question: 'How fast is delivery?',
    answer: 'Orders are typically delivered within 3-5 business days across India. Subscribers get priority processing. Orders above ₹999 qualify for free shipping.',
  },
];

export const SUBSCRIPTION_PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    frequency: 'Delivered every 30 days',
    discount: 15,
    badge: null,
    description: 'Perfect for consistent daily supplementation',
  },
  {
    id: 'bimonthly',
    name: 'Bi-Monthly',
    frequency: 'Delivered every 60 days',
    discount: 18,
    badge: 'Most Popular',
    description: 'Great balance of savings and flexibility',
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    frequency: 'Delivered every 90 days',
    discount: 22,
    badge: 'Best Value',
    description: 'Maximum savings for committed athletes',
  },
];
