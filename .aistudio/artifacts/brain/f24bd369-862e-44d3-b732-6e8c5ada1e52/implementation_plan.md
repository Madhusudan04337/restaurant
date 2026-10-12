# Implementation Plan - High-Volume Restaurant Online Ordering & POS System

## Overview
To solve the operational bottleneck of managing 700-900 daily customers without manual cash counter and ordering delays, we will build a dual-interface high-volume restaurant platform:
1. **Customer Online Ordering Portal**: Optimized for mobile and desktop web with lightning-fast cart addition, category navigation, live order tracking, and instant checkout.
2. **Restaurant Staff Cashier POS & Kitchen Display System (KDS)**: Designed to eliminate queue bottlenecks by instantly receiving online orders, tracking kitchen preparation status in real-time, and monitoring peak-hour volume analytics.

---

## Proposed Architecture & Components

### 1. Data Models (`src/types.ts`)
- `MenuItem`: dish name, category, price, description, image, prep time, availability status.
- `Order`: order ID, customer name, table number or delivery address, items list, total amount, status (NEW, PREPARING, READY, COMPLETED), timestamp, payment method.
- `RestaurantMetrics`: total daily orders (targeting 700-900 scale simulation), active tables, revenue, average preparation time.

### 2. Mock Data (`src/data/mockData.ts`)
- Comprehensive menu items across Appetizers, Mains, Beverages, Desserts, and Chef Specials.
- Pre-populated active orders simulating high-volume peak hours.

### 3. Core UI Components (`src/components/`)
- **Top Bar / Mode Switcher**: Seamlessly switch between **Customer Online Ordering View** and **Restaurant Staff POS & KDS Dashboard**.
- **Customer Online Ordering (`CustomerMenu.tsx`)**:
  - Responsive mobile/desktop layout.
  - Category filters, instant dish search, and dietary badges (Veg/Non-Veg).
  - Quick "+ Add" and slide-over cart drawer (`CartDrawer.tsx`).
  - Live order tracker with estimated preparation countdown (`OrderTracker.tsx`).
- **Staff Cashier POS & Kitchen Display System (`StaffDashboard.tsx`)**:
  - Live incoming order queue updating in real-time.
  - Quick action buttons for chefs/cashiers to update order status (`Mark Preparing`, `Ready for Pickup`, `Completed`).
  - Peak-hour metrics overview (Tracking 700-900 daily customers load, revenue, kitchen turnaround time).

---

## Verification Plan
1. Compile applet using `compile_applet` and run `lint_applet` to ensure zero errors.
2. Verify smooth switching between Customer Ordering and Staff POS Dashboard.
3. Test placing an order on the customer side and seeing it instantly appear on the Staff KDS queue.
