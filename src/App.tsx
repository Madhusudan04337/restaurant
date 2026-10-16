import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { RestaurantMenuPage } from './pages/RestaurantMenuPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurant/:restaurantId" element={<RestaurantMenuPage />} />
    </Routes>
  );
}
