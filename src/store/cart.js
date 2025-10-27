// creates Zustand store
import { create } from "zustand";

export const useCart = create((set, get) => ({
  items: [],

  // adds item to cart
  addItem: (product) => {
    const items = get().items; //get current items
    const itemToUpdate = items.find((item) => item.id === product.id);

    if (itemToUpdate) {
      // product is already in the cart - update quantity
      set({
        items: items.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      });
    } else {
      // new product (not in cart) - add with quantity 1
      set(() => ({
        items: [...items, { ...product, quantity: 1 }], //add quantity property
      }));
    }
  },

  // removes item from cart
  removeItem: (productId) => {
    set({
      items: get().items.filter((item) => item.id !== productId),
    });
  },

  // updates quantity (+/-)
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId); //remove item if quantity is 0
      return;
    }

    set({
      items: get().items.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity };
        }
        return item;
      }),
    });
  },

  // total price in cartpage/checkoutpage
  getTotalPrice: () => {
    const items = get().items;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  // total items in cart desktop/hamburger menu
  getTotalItems: () => {
    const items = get().items;
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  // reset/clear cart
  clearCart: () => {
    set({ items: [] });
  },
}));

//   item.id === product.id ? { ...items, quantity: item.quantity + 1 } : item
