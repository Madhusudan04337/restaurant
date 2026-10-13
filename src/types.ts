export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  category: string;
  rating?: number;
  calories?: number;
  prepTime?: string;
  portion?: string;
  ingredients?: string[];
  allergens?: string[];
  nutrition?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  addOns?: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface FoodCategory {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  ratingCount: string;
  deliveryTime: string;
  costForTwo: string;
  image: string;
  address: string;
  discount?: string;
  isPureVeg?: boolean;
  offer?: string;
  menu: MenuCategory[];
}

export interface CartItem {
  dish: MenuItem;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  restaurantId: string;
  restaurantName: string;
  totalAmount: number;
  status: 'PLACED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  createdAt: string;
  deliveryAddress: string;
  etaMinutes: number;
  driver: {
    name: string;
    phone: string;
    vehicle: string;
    rating: number;
  };
}

export interface FeastOption {
  id: string;
  name: string;
  category: string;
  price: number;
  calories: number;
  timeMins: number;
  image: string;
}

export interface ReviewTestimonial {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  dishLoved: string;
}
