import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calculator from '../pages/Calculator';
import CurrencyConverter from '../pages/CurrencyConverter';
import UnitConverter from '../pages/UnitConverter';
import Settings from '../pages/Settings';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
      <Route path="/currency" element={<CurrencyConverter />} />
      <Route path="/units" element={<UnitConverter />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes;