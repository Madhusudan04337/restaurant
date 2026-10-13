import { Restaurant, FoodCategory } from '../types';

export const FOOD_CATEGORIES: FoodCategory[] = [
  { 
    id: 'all', 
    name: 'All', 
    icon: 'ALL',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=300' 
  },
  { 
    id: 'biryani', 
    name: 'Biryani', 
    icon: 'BIR',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=300' 
  },
  { 
    id: 'pizza', 
    name: 'Pizza', 
    icon: 'PIZ',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300' 
  },
  { 
    id: 'burgers', 
    name: 'Burgers', 
    icon: 'BUR',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300' 
  },
  { 
    id: 'sushi', 
    name: 'Sushi', 
    icon: 'SUS',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=300' 
  },
  { 
    id: 'healthy', 
    name: 'Healthy', 
    icon: 'HLT',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300' 
  },
  { 
    id: 'desserts', 
    name: 'Desserts', 
    icon: 'DES',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=300' 
  }
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
            description: 'Fragrant basmati rice layered with marinated tender chicken, saffron, and aromatic secret spices slow cooked in a sealed clay handi.',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Royal Dum Biryanis',
            rating: 4.9,
            calories: 780,
            prepTime: '20-25 mins',
            portion: 'Serves 1-2 (650g)',
            ingredients: [
              'Aged Daawat Basmati Rice',
              'Bone-in Tender Farm Chicken',
              'Kashmiri Saffron Milk',
              'Crispy Fried Golden Onions (Birista)',
              'Pure Cow Desi Ghee',
              'Fresh Mint & Cilantro Leaves',
              'Shahi 21-Garam Masala Blend'
            ],
            allergens: ['Dairy (Desi Ghee)', 'Halal Certified', 'Gluten-Free Rice'],
            nutrition: {
              calories: 780,
              protein: '42g',
              carbs: '86g',
              fat: '28g'
            },
            addOns: [
              { id: 'add-1', name: 'Cool Mint Raita (200ml)', price: 1.50 },
              { id: 'add-2', name: 'Spicy Mirchi Ka Salan (Curry)', price: 1.99 },
              { id: 'add-3', name: 'Boiled Farm Eggs (2 pcs)', price: 1.25 },
              { id: 'add-4', name: 'Warm Gulab Jamun (2 pcs)', price: 2.99 }
            ]
          },
          {
            id: 'item-102',
            name: 'Awadhi Paneer Tikka Biryani',
            description: 'Saffron-infused long-grain rice layered with chargrilled cottage cheese cubes, mint, and caramelized onions.',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            isBestseller: true,
            category: 'Royal Dum Biryanis',
            rating: 4.7,
            calories: 640,
            prepTime: '18-22 mins',
            portion: 'Serves 1-2 (600g)',
            ingredients: [
              'Fresh Malai Paneer Cubes',
              'Saffron Long Grain Basmati',
              'Tandoori Spiced Yogurt Marinade',
              'Caramelized Brown Onions',
              'Roasted Cashew Nuts & Raisins',
              'Kewra & Rose Essence'
            ],
            allergens: ['Dairy (Paneer & Ghee)', 'Tree Nuts (Cashews)', 'Vegetarian'],
            nutrition: {
              calories: 640,
              protein: '28g',
              carbs: '82g',
              fat: '24g'
            },
            addOns: [
              { id: 'add-p1', name: 'Burani Garlic Raita', price: 1.50 },
              { id: 'add-p2', name: 'Extra Paneer Tikka (4 pcs)', price: 3.50 },
              { id: 'add-p3', name: 'Crispy Roasted Papadums', price: 1.00 }
            ]
          }
        ]
      },
      {
        name: 'Tandoori Starters & Curries',
        items: [
          {
            id: 'item-103',
            name: 'Smokey Butter Chicken Supreme',
            description: 'Boneless tandoori chicken cooked in velvety rich tomato-butter gravy with aromatic fenugreek and double cream.',
            price: 15.50,
            image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Tandoori Starters & Curries',
            rating: 4.9,
            calories: 720,
            prepTime: '15-20 mins',
            portion: 'Serves 2 (500ml Bowl)',
            ingredients: [
              'Clay Oven Smoked Chicken Breast',
              'Ripe Roma Tomatoes Reduction',
              'Amul Makhan (Butter) & Fresh Cream',
              'Kasuri Methi (Sundried Fenugreek)',
              'Kashmiri Red Chilli (Mild Heat)',
              'Organic Forest Honey'
            ],
            allergens: ['Dairy (Butter & Cream)', 'Halal Certified'],
            nutrition: {
              calories: 720,
              protein: '48g',
              carbs: '22g',
              fat: '48g'
            },
            addOns: [
              { id: 'add-b1', name: 'Garlic Butter Naan (2 pcs)', price: 2.99 },
              { id: 'add-b2', name: 'Steamed Jeera Basmati Rice', price: 2.49 }
            ]
          },
          {
            id: 'item-104',
            name: 'Dal Makhani & Butter Naan (Combo)',
            description: 'Black lentils slow cooked overnight on charcoal with butter and fresh cream, served with 2 hot butter naans.',
            price: 11.99,
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            category: 'Tandoori Starters & Curries',
            rating: 4.8,
            calories: 610,
            prepTime: '12-16 mins',
            portion: 'Complete Meal for 1',
            ingredients: [
              'Whole Black Urad Lentils',
              'Red Kidney Beans (Rajma)',
              'Overnight Charcoal Cook',
              'Pure Cow Ghee & Cream',
              'Clay-tandoor Butter Naan (2 pcs)'
            ],
            allergens: ['Gluten (Naan)', 'Dairy (Butter/Cream)', 'Vegetarian'],
            nutrition: {
              calories: 610,
              protein: '22g',
              carbs: '76g',
              fat: '24g'
            },
            addOns: [
              { id: 'add-d1', name: 'Extra Cheese Garlic Naan', price: 2.49 },
              { id: 'add-d2', name: 'Sweet Mango Lassi Glass', price: 2.50 }
            ]
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
            description: 'San Marzano tomato sauce, fresh mozzarella di bufala, fresh basil leaves, and cold-pressed extra virgin olive oil.',
            price: 15.99,
            image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            isBestseller: true,
            category: 'Artisan Woodfired Pizzas',
            rating: 4.9,
            calories: 650,
            prepTime: '15-20 mins',
            portion: '12-inch Pizza (6 Slices • Serves 1-2)',
            ingredients: [
              '48-Hour Fermented Sourdough Crust',
              'DOP San Marzano Tomatoes from Mount Vesuvius',
              'Campanian Buffalo Mozzarella (Bufala)',
              'Fresh Genovese Sweet Basil',
              'Ligurian Extra Virgin Olive Oil'
            ],
            allergens: ['Gluten', 'Dairy (Mozzarella)', 'Vegetarian'],
            nutrition: {
              calories: 650,
              protein: '28g',
              carbs: '74g',
              fat: '26g'
            },
            addOns: [
              { id: 'add-pza1', name: 'Burrata Cheese Ball Center', price: 3.50 },
              { id: 'add-pza2', name: 'Spicy Hot Honey Dip Pot', price: 1.25 },
              { id: 'add-pza3', name: 'Cheesy Garlic Breadsticks', price: 3.99 }
            ]
          },
          {
            id: 'item-202',
            name: 'Diavola Spicy Pepperoni & Hot Honey',
            description: 'Spicy Italian pepperoni, fior di latte mozzarella, hot chili honey drizzle on charred oakwood-fired sourdough crust.',
            price: 17.99,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Artisan Woodfired Pizzas',
            rating: 4.8,
            calories: 780,
            prepTime: '18-22 mins',
            portion: '12-inch Pizza (6 Slices • Serves 1-2)',
            ingredients: [
              'Artisan Sourdough Leopard Crust',
              'Calabrian Spicy Pork Pepperoni',
              'Fior di Latte Whole Milk Mozzarella',
              'Habanero-infused Hot Blossom Honey',
              'Crushed San Marzano Tomato Base'
            ],
            allergens: ['Gluten', 'Dairy', 'Pork'],
            nutrition: {
              calories: 780,
              protein: '36g',
              carbs: '72g',
              fat: '38g'
            },
            addOns: [
              { id: 'add-dia1', name: 'Extra Double Pepperoni', price: 2.50 },
              { id: 'add-dia2', name: 'Garlic Herb Truffle Dip', price: 1.50 }
            ]
          },
          {
            id: 'item-203',
            name: 'Truffle & Forest Funghi Pizza',
            description: 'Wild porcini and cremini mushrooms, fontina cheese, fresh thyme, and white Alba truffle cream base.',
            price: 18.50,
            image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            category: 'Artisan Woodfired Pizzas',
            rating: 4.7,
            calories: 710,
            prepTime: '18-22 mins',
            portion: '12-inch Pizza (6 Slices • Serves 1-2)',
            ingredients: [
              'Slow Sourdough Crust',
              'Wild Porcini & Cremini Mushrooms',
              'Italian Fontina & Mozzarella Cheeses',
              'White Alba Truffle Cream Base',
              'Fresh Thyme & Sea Salt'
            ],
            allergens: ['Gluten', 'Dairy', 'Vegetarian'],
            nutrition: {
              calories: 710,
              protein: '26g',
              carbs: '75g',
              fat: '32g'
            },
            addOns: [
              { id: 'add-fun1', name: 'Shaved Black Truffle', price: 4.00 },
              { id: 'add-fun2', name: 'Crispy Prosciutto Crisps', price: 2.75 }
            ]
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
            description: 'Double Angus beef patties, truffle aioli, aged sharp cheddar, caramelized balsamic onions on toasted brioche bun.',
            price: 14.50,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Gourmet Smashed Burgers',
            rating: 4.8,
            calories: 820,
            prepTime: '15-18 mins',
            portion: 'Double Patty (380g with Fries)',
            ingredients: [
              '100% Black Angus Beef Patties (Double)',
              'Black Périgord Truffle Aioli',
              'Aged Wisconsin Sharp Cheddar',
              'Slow Caramelized Sweet Onions',
              'Crisp Wild Rocket / Arugula',
              'Buttery Artisanal Brioche Bun'
            ],
            allergens: ['Gluten (Brioche)', 'Dairy (Cheddar & Aioli)', 'Eggs (Aioli)'],
            nutrition: {
              calories: 820,
              protein: '52g',
              carbs: '48g',
              fat: '46g'
            },
            addOns: [
              { id: 'add-tb1', name: 'Crispy Applewood Bacon Strips', price: 2.50 },
              { id: 'add-tb2', name: 'Extra Melted Truffle Gouda Slice', price: 1.75 },
              { id: 'add-tb3', name: 'Double Black Truffle Dip Pot', price: 1.50 }
            ]
          },
          {
            id: 'item-302',
            name: 'Crispy Portobello Truffle Burger',
            description: 'Crispy fried panko-crusted whole portobello mushroom stuffed with fontina cheese, garlic herb aioli, fresh arugula.',
            price: 13.00,
            image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            category: 'Gourmet Smashed Burgers',
            rating: 4.6,
            calories: 640,
            prepTime: '14-16 mins',
            portion: 'Single Gourmet Burger (320g)',
            ingredients: [
              'Whole Organic Portobello Mushroom',
              'Melted Italian Fontina Cheese Core',
              'Japanese Panko Breadcrumb Crust',
              'Herb Infused Garlic Aioli',
              'Fresh Baby Arugula Leaves',
              'Artisan Toasted Brioche'
            ],
            allergens: ['Gluten', 'Dairy (Fontina)', 'Vegetarian'],
            nutrition: {
              calories: 640,
              protein: '22g',
              carbs: '58g',
              fat: '34g'
            },
            addOns: [
              { id: 'add-pb1', name: 'Avocado Slices (Fresh Hass)', price: 2.00 },
              { id: 'add-pb2', name: 'Pickled Red Onions & Jalapeños', price: 1.00 }
            ]
          },
          {
            id: 'item-303',
            name: 'Parmesan Truffle Fries & Belgian Shake',
            description: 'Hand-cut Idaho golden fries tossed in white truffle oil and Parmigiano-Reggiano, paired with a rich Belgian dark chocolate shake.',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            isBestseller: true,
            category: 'Gourmet Smashed Burgers',
            rating: 4.9,
            calories: 580,
            prepTime: '10-12 mins',
            portion: 'Large Combo (Fries 250g + Shake 400ml)',
            ingredients: [
              'Russet Idaho Hand-Cut Potatoes',
              'Imported White Truffle Oil',
              '24-Month Aged Parmigiano-Reggiano',
              'Fresh Italian Parsley & Sea Salt',
              'Callebaut 70% Dark Chocolate Shake'
            ],
            allergens: ['Dairy (Parmesan & Shake)', 'Vegetarian'],
            nutrition: {
              calories: 580,
              protein: '16g',
              carbs: '68g',
              fat: '28g'
            },
            addOns: [
              { id: 'add-tf1', name: 'Extra Large Shake Upgrade', price: 1.50 },
              { id: 'add-tf2', name: 'Smoked Chipotle Dip', price: 1.00 }
            ]
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
            description: 'Crisp tiger shrimp tempura and cucumber roll draped with ripe avocado slices, broiled freshwater unagi, and golden tobiko pearls.',
            price: 18.00,
            image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Signature Sushi & Bowls',
            rating: 4.9,
            calories: 490,
            prepTime: '15-20 mins',
            portion: '8 Pieces Roll with Wasabi & Ginger',
            ingredients: [
              'Wild Black Tiger Shrimp Tempura',
              'Japanese Akazu Seasoned Sushi Rice',
              'Broiled BBQ Freshwater Unagi (Eel)',
              'Creamy Hass Avocado Slices',
              'Crispy Tempura Flakes (Tenkasu)',
              'Flying Fish Roe (Tobiko Pearls)'
            ],
            allergens: ['Crustacean Shellfish', 'Fish', 'Soy', 'Gluten (Tempura)'],
            nutrition: {
              calories: 490,
              protein: '24g',
              carbs: '62g',
              fat: '16g'
            },
            addOns: [
              { id: 'add-dr1', name: 'Spicy Sriracha Mayo Dip', price: 1.25 },
              { id: 'add-dr2', name: 'Fresh Edamame with Sea Salt', price: 3.50 },
              { id: 'add-dr3', name: 'Warm Miso Soup Bowl', price: 2.50 }
            ]
          },
          {
            id: 'item-402',
            name: 'Rich Tonkotsu Chashu Ramen',
            description: '18-hour slow simmered silky pork bone broth, handcrafted springy noodles, melt-in-mouth chashu pork belly, ajitsuke ramen egg, nori, and black garlic oil.',
            price: 16.50,
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600',
            isVeg: false,
            isBestseller: true,
            category: 'Signature Sushi & Bowls',
            rating: 4.9,
            calories: 740,
            prepTime: '18-22 mins',
            portion: 'Generous Large Ramen Bowl (750ml)',
            ingredients: [
              '18-Hour Simmered Kurobuta Tonkotsu Broth',
              'Handcrafted Hakata Thin Ramen Noodles',
              'Braised & Torched Chashu Pork Belly (3 Slices)',
              'Soft-boiled Soy Ajitsuke Egg (Han-juku)',
              'Kombu Seaweed, Menma Bamboo Shoots',
              'Mayu Aromatic Roasted Black Garlic Oil'
            ],
            allergens: ['Pork', 'Eggs', 'Soy', 'Gluten', 'Sesame'],
            nutrition: {
              calories: 740,
              protein: '42g',
              carbs: '68g',
              fat: '32g'
            },
            addOns: [
              { id: 'add-rm1', name: 'Extra Ajitsuke Ramen Egg', price: 1.75 },
              { id: 'add-rm2', name: 'Extra Chashu Pork Belly (2 pcs)', price: 3.50 },
              { id: 'add-rm3', name: 'Japanese Pan-fried Gyoza (4 pcs)', price: 4.50 }
            ]
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
            description: 'Organic tricolor quinoa, ripe Hass avocado, spiced roasted chickpeas, kalamata olives, heirloom cherry tomatoes, Persian cucumbers, and lemon herb tahini drizzle.',
            price: 13.50,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            isBestseller: true,
            category: 'Superfood Power Bowls',
            rating: 4.8,
            calories: 420,
            prepTime: '10-14 mins',
            portion: 'Large 550g Superfood Bowl',
            ingredients: [
              'Organic Peruvian Tricolor Quinoa',
              'Fresh California Hass Avocado Half',
              'Crispy Paprika Spiced Chickpeas',
              'Kalamata Olives & Pickled Shallots',
              'Heirloom Sunburst Cherry Tomatoes',
              'Cold-Pressed Lemon Tahini Dressing'
            ],
            allergens: ['Sesame (Tahini)', 'Vegan', '100% Gluten-Free'],
            nutrition: {
              calories: 420,
              protein: '18g',
              carbs: '54g',
              fat: '16g'
            },
            addOns: [
              { id: 'add-sb1', name: 'Organic Grilled Tofu Steaks', price: 2.50 },
              { id: 'add-sb2', name: 'Warm Pita Bread Triangles', price: 1.50 },
              { id: 'add-sb3', name: 'Cold-Pressed Green Detox Juice', price: 4.00 }
            ]
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
    isPureVeg: true,
    menu: [
      {
        name: 'Warm Belgian Waffles',
        items: [
          {
            id: 'item-601',
            name: 'Nutella Overload Belgian Waffle',
            description: 'Freshly baked pearl sugar Belgian waffle drenched in warm Italian Nutella hazelnut spread, roasted crushed hazelnuts, Ferrero Rocher, and Madagascar vanilla bean gelato scoop.',
            price: 11.00,
            image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=600',
            isVeg: true,
            isBestseller: true,
            category: 'Warm Belgian Waffles',
            rating: 4.9,
            calories: 680,
            prepTime: '12-15 mins',
            portion: 'Plated Dessert (Serves 1-2 • 350g)',
            ingredients: [
              'Liege Waffle with Caramelized Pearl Sugar',
              'Pure Italian Nutella Hazelnut Cream',
              'Ferrero Rocher Chocolate Truffle',
              'Roasted Piedmont Hazelnuts',
              'Madagascar Bourbon Vanilla Gelato Scoop'
            ],
            allergens: ['Dairy (Gelato & Nutella)', 'Tree Nuts (Hazelnuts)', 'Gluten', 'Vegetarian'],
            nutrition: {
              calories: 680,
              protein: '12g',
              carbs: '84g',
              fat: '32g'
            },
            addOns: [
              { id: 'add-wf1', name: 'Extra Vanilla Gelato Scoop', price: 2.00 },
              { id: 'add-wf2', name: 'Fresh Cut Strawberries & Blueberries', price: 2.50 },
              { id: 'add-wf3', name: 'Salted Caramel Drizzle Pot', price: 1.25 }
            ]
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

