import { CartProduct } from "@/types/ads";
import { createContext, PropsWithChildren, useState } from "react";

type ContextType = {
  cart: CartProduct[];
  addToCart: (adId: string) => void;
  removeFromCart: (adId: string) => void;
  clearCart: () => void;
};

export const AppContext = createContext({} as ContextType); //on s'engage à mettre dans "value" du contexte, ContextType

function AppProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const c = localStorage.getItem("cart");
    return c ? JSON.parse(c) : [];
  });
  const value = {
    cart,
    addToCart: (adId: string) => {
      console.log("Ajout au panier " + adId);
      const c = cart.map((c) => Object.assign({}, c)); // copie profonde pour ne pas travailler avec l'état directement
      const item = c.find((i) => i.adId === adId);
      if (item) {
        item.quantity++;
      } else {
        c.push({ adId, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(c));
      setCart(c);
    },
    removeFromCart: (adId: string) => {
      console.log("Retrait du panier " + adId);

      const c = cart.map((c) => Object.assign({}, c)); // copie profonde pour ne pas travailler avec l'état directement
      const item = c.find((i) => i.adId === adId);
      if (!item) {
        throw new Error("L'item n'existe pas");
      }
      if (item.quantity === 1) {
        const newCart = c.filter((i) => i.adId !== item.adId);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        item.quantity--;
        setCart(c);
        localStorage.setItem("cart", JSON.stringify(c));
      }
    },
    clearCart: () => {
      setCart([]);
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
