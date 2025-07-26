import React, { createContext, useContext, useReducer, ReactNode, useMemo, useCallback } from 'react';
import { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'MERGE_CART'; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  mergeCart: (items: CartItem[]) => void;
  getItemCount: () => number;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateTotals = (items: CartItem[]): { total: number; itemCount: number } => {
  return items.reduce(
    (acc, item) => ({
      total: acc.total + item.product.price * item.quantity,
      itemCount: acc.itemCount + item.quantity,
    }),
    { total: 0, itemCount: 0 }
  );
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.items.findIndex(
        item => item.product.id === action.payload.id
      );

      let newItems;
      if (existingIndex >= 0) {
        newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
        };
      } else {
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }

      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items
        .map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter(item => item.quantity > 0);

      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'MERGE_CART': {
      const mergedItems = [...state.items];
      
      action.payload.forEach(newItem => {
        const existingIndex = mergedItems.findIndex(
          item => item.product.id === newItem.product.id
        );
        
        if (existingIndex >= 0) {
          mergedItems[existingIndex] = {
            ...mergedItems[existingIndex],
            quantity: mergedItems[existingIndex].quantity + newItem.quantity,
          };
        } else {
          mergedItems.push(newItem);
        }
      });

      const { total, itemCount } = calculateTotals(mergedItems);
      return { items: mergedItems, total, itemCount };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 });

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const mergeCart = useCallback((items: CartItem[]) => {
    dispatch({ type: 'MERGE_CART', payload: items });
  }, []);

  const getItemCount = useCallback(() => state.itemCount, [state.itemCount]);

  const isInCart = useCallback(
    (productId: string) => state.items.some(item => item.product.id === productId),
    [state.items]
  );

  const getItemQuantity = useCallback(
    (productId: string) => 
      state.items.find(item => item.product.id === productId)?.quantity || 0,
    [state.items]
  );

  const contextValue = useMemo(() => ({
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    mergeCart,
    getItemCount,
    isInCart,
    getItemQuantity,
  }), [state, addToCart, removeFromCart, updateQuantity, clearCart, mergeCart, getItemCount, isInCart, getItemQuantity]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};