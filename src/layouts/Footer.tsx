import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const data = new Date();

  return (
    <footer>
      <span>© {data.getFullYear()}. Калькулятор нагрузки на оси</span>
      <Link to="/privacy">Политика конфиденциальности</Link>
    </footer>
  );
};
