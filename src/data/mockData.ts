import { Restaurant } from '../types';

export const FOOD_CATEGORIES = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'biryani', name: 'Biryani', icon: '🍛' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'sushi', name: 'Sushi & Asian', icon: '🍣' },
  { id: 'healthy', name: 'Healthy Bowls', icon: '🥗' },
  { id: 'desserts', name: 'Desserts & Shakes', icon: '🧇' }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'The Royal Biryani & Kebabs',
    cuisine: ['Biryani', 'North Indian', 'Mughlai', 'Kebabs'],
    rating: 4.8,
    ratingCount: '4.2k+',
    deliveryTime: '25-30 mins',
    costForTwo: '$25 for two',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1000',
    address: '42 Royal Crescent, Metro Center',
    discount: '50% OFF up to $10',
    offer: 'FREE GARLIC NAAN',
    menu: [
      {
        name: 'Royal Dum Biryanis',
        items: [
          {
            id: 'item-101',
            name: 'Hyderabadi Chicken Dum Biryani',
            description: 'Fragrant basmati rice layered with marinated tender chicken, saffron, and aromatic secret spices.',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Royal Dum Biryanis',
            rating: 4.9,
            calories: 780
          },
          {
            id: 'item-102',
            name: 'Awadhi Paneer Tikka Biryani',
            description: 'Saffron-infused long-grain rice with chargrilled cottage cheese cubes, mint, and caramelized onions.',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            isBestseller: true,
            category: 'Royal Dum Biryanis',
            rating: 4.7,
            calories: 640
          }
        ]
      },
      {
        name: 'Tandoori Starters & Curries',
        items: [
          {
            id: 'item-103',
            name: 'Smokey Butter Chicken Supreme',
            description: 'Boneless tandoori chicken cooked in velvety rich tomato-butter gravy with fenugreek.',
            price: 15.50,
            image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Tandoori Starters & Curries',
            rating: 4.9,
            calories: 720
          },
          {
            id: 'item-104',
            name: 'Dal Makhani & Butter Naan (Combo)',
            description: 'Black lentils slow cooked overnight with butter and fresh cream, served with 2 butter naans.',
            price: 11.99,
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            category: 'Tandoori Starters & Curries',
            rating: 4.8,
            calories: 610
          }
        ]
      }
    ]
  },
  {
    id: 'rest-2',
    name: 'Bella Napoli Woodfired Pizza',
    cuisine: ['Pizza', 'Italian', 'Pasta', 'Desserts'],
    rating: 4.7,
    ratingCount: '3.8k+',
    deliveryTime: '20-25 mins',
    costForTwo: '$30 for two',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000',
    address: '18 Piazza Avenue, Westside',
    discount: 'FLAT $8 OFF above $25',
    offer: 'FREE GARLIC BREAD',
    menu: [
      {
        name: 'Artisan Woodfired Pizzas',
        items: [
          {
            id: 'item-201',
            name: 'Authentic Margherita di Bufala',
            description: 'San Marzano tomato sauce, fresh mozzarella di bufala, basil leaves, extra virgin olive oil.',
            price: 15.99,
            image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            isBestseller: true,
            category: 'Artisan Woodfired Pizzas',
            rating: 4.9,
            calories: 650
          },
          {
            id: 'item-202',
            name: 'Diavola Spicy Pepperoni & Hot Honey',
            description: 'Spicy Italian pepperoni, fior di latte mozzarella, hot chili honey drizzle on charred crust.',
            price: 17.99,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Artisan Woodfired Pizzas',
            rating: 4.8,
            calories: 780
          },
          {
            id: 'item-203',
            name: 'Truffle & Forest Funghi Pizza',
            description: 'Wild porcini and cremini mushrooms, fontina cheese, thyme, white truffle cream base.',
            price: 18.50,
            image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            category: 'Artisan Woodfired Pizzas',
            rating: 4.7,
            calories: 710
          }
        ]
      }
    ]
  },
  {
    id: 'rest-3',
    name: 'Truffle Burger Co.',
    cuisine: ['Burgers', 'American', 'Fries', 'Milkshakes'],
    rating: 4.6,
    ratingCount: '2.9k+',
    deliveryTime: '18-24 mins',
    costForTwo: '$22 for two',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000',
    address: '92 Culinary Square, Downtown',
    discount: '40% OFF up to $8',
    offer: 'BUY 1 GET 1 DRINK',
    menu: [
      {
        name: 'Gourmet Smashed Burgers',
        items: [
          {
            id: 'item-301',
            name: 'The Truffle Royale Smashed Burger',
            description: 'Double Angus beef patties, truffle aioli, aged cheddar, caramelized onions on toasted brioche.',
            price: 14.50,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Gourmet Smashed Burgers',
            rating: 4.8,
            calories: 820
          },
          {
            id: 'item-302',
            name: 'Crispy Portobello Truffle Burger',
            description: 'Crispy fried panko mushroom patty stuffed with cheese, garlic herb aioli, arugula.',
            price: 13.00,
            image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            category: 'Gourmet Smashed Burgers',
            rating: 4.6,
            calories: 640
          },
          {
            id: 'item-303',
            name: 'Parmesan Truffle Fries & Belgian Shake',
            description: 'Hand-cut golden fries tossed in parmesan truffle oil paired with rich dark chocolate shake.',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            isBestseller: true,
            category: 'Gourmet Smashed Burgers',
            rating: 4.9,
            calories: 580
          }
        ]
      }
    ]
  },
  {
    id: 'rest-4',
    name: 'Sakura Sushi & Ramen Bar',
    cuisine: ['Japanese', 'Sushi', 'Ramen', 'Asian'],
    rating: 4.9,
    ratingCount: '5.1k+',
    deliveryTime: '25-35 mins',
    costForTwo: '$35 for two',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000',
    address: '15 Blossom Court, Uptown',
    discount: '20% OFF ALL ROLLS',
    menu: [
      {
        name: 'Signature Sushi & Bowls',
        items: [
          {
            id: 'item-401',
            name: 'Dragon Roll (8 Pieces)',
            description: 'Tempura shrimp, cucumber, topped with ripe avocado, unagi eel sauce, and tobiko.',
            price: 18.00,
            image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Signature Sushi & Bowls',
            rating: 4.9,
            calories: 490
          },
          {
            id: 'item-402',
            name: 'Rich Tonkotsu Chashu Ramen',
            description: '18-hour simmered pork broth, handmade noodles, chashu pork belly, soft-boiled ajitsuke egg, scallions.',
            price: 16.50,
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Signature Sushi & Bowls',
            rating: 4.9,
            calories: 740
          }
        ]
      }
    ]
  },
  {
    id: 'rest-5',
    name: 'Green Earth Salad & Bowls',
    cuisine: ['Healthy', 'Salads', 'Bowls', 'Vegan'],
    rating: 4.7,
    ratingCount: '1.8k+',
    deliveryTime: '15-20 mins',
    costForTwo: '$20 for two',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000',
    address: '33 Eco Boulevard, Green Park',
    discount: 'FREE DELIVERY',
    isPureVeg: true,
    menu: [
      {
        name: 'Superfood Power Bowls',
        items: [
          {
            id: 'item-501',
            name: 'Mediterranean Avocado Quinoa Bowl',
            description: 'Organic tricolor quinoa, Hass avocado, roasted spiced chickpeas, kalamata olives, lemon tahini dressing.',
            price: 13.50,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            isBestseller: true,
            category: 'Superfood Power Bowls',
            rating: 4.8,
            calories: 420
          }
        ]
      }
    ]
  },
  {
    id: 'rest-6',
    name: 'Sweet Treats & Belgian Waffles',
    cuisine: ['Desserts', 'Waffles', 'Bakery', 'Ice Cream'],
    rating: 4.8,
    ratingCount: '3.4k+',
    deliveryTime: '20-25 mins',
    costForTwo: '$18 for two',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1000',
    address: '88 Confectionery Street, Downtown',
    discount: 'FLAT $5 OFF',
    menu: [
      {
        name: 'Warm Belgian Waffles',
        items: [
          {
            id: 'item-601',
            name: 'Nutella Overload Belgian Waffle',
            description: 'Crisp golden waffle drenched in warm Nutella, Ferrero Rocher crumbles, and vanilla bean gelato.',
            price: 11.00,
            image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            isBestseller: true,
            category: 'Warm Belgian Waffles',
            rating: 4.9,
            calories: 680
          }
        ]
      }
    ]
  }
];

export const FEAST_OPTIONS: {
  id: string;
  name: string;
  category: string;
  price: number;
  calories: number;
  prepMins: number;
  image: string;
}[] = [
  {
    id: 'f-1',
    name: 'Hyderabadi Chicken Dum Biryani (Large)',
    category: 'Mains',
    price: 18.99,
    calories: 820,
    prepMins: 22,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'f-2',
    name: 'Woodfired Truffle Pepperoni Pizza',
    category: 'Mains',
    price: 19.50,
    calories: 780,
    prepMins: 18,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'f-3',
    name: 'Tandoori Garlic Butter Naan Basket (4 pcs)',
    category: 'Sides & Breads',
    price: 7.99,
    calories: 340,
    prepMins: 10,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'f-4',
    name: 'Crispy Truffle Parmesan Fries',
    category: 'Starters',
    price: 8.50,
    calories: 420,
    prepMins: 12,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'f-5',
    name: 'Smokey Butter Chicken Gravy Bowl',
    category: 'Mains',
    price: 16.00,
    calories: 690,
    prepMins: 15,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'f-6',
    name: 'Belgian Chocolate Waffle Sundae',
    category: 'Desserts',
    price: 9.99,
    calories: 590,
    prepMins: 10,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=400'
  }
];

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Kavita Sundaram',
    location: 'Downtown • 140+ Orders Placed',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'The 25-minute live tracking is unbelievable! The Hyderabadi Dum Biryani arrived steaming hot with crisp flaky parathas. CraveDrop is leagues ahead of standard delivery apps.',
    dishLoved: 'Hyderabadi Chicken Dum Biryani'
  },
  {
    id: 'rev-2',
    author: 'Rahul Sharma',
    location: 'Westside Promenade • 95 Orders',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Woodfired crust on Bella Napoli pizza stayed crunchy even after delivery. Real-time driver simulation and zero hassle checkout makes party ordering so smooth.',
    dishLoved: 'Authentic Margherita di Bufala'
  },
  {
    id: 'rev-3',
    author: 'Aanya Joseph',
    location: 'Metro Center • 62 Orders',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'The Foodie AI recommended the Truffle Smashed Burger when I needed a late-night craving. Best burger I have had this year! Arrived in just 19 minutes.',
    dishLoved: 'The Truffle Royale Smashed Burger'
  }
];

