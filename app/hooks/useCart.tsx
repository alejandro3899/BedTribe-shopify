import {useLocation} from '@remix-run/react';
import {useEffect, useState} from 'react';

export const useCart = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openCart,
    closeCart,
  };
};
