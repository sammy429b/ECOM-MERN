import {createContext, useContext, useState, ReactNode, useEffect} from 'react';


interface Rating {
    rate: number;
    count: number;
  }
  
  interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    qty: number;
    rating: Rating;
  }

interface CartContextType {
    cart: [];
    setCart: React.Dispatch<React.SetStateAction<[]>>;
    totalItems: number;
    setTotalItems: React.Dispatch<React.SetStateAction<number>>;
    totalPrice: number;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
    handleAddToCart: (product: any) => void;
    handleRemoveFromCart: (id: number) => void;
    handleUpdateCartQty: (id: number, qty: number) => void;
    handleRemoveAllFromCart: () => void;
    handleIncreaseQty: (id: number) => void;
    handleDecreaseQty: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps  {
    children: ReactNode;
}


export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    const [cart, setCart] = useState(() => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    });
    const [totalItems, setTotalItems] = useState(()=> {
        const localData = localStorage.getItem('totalItems');
        return localData ? JSON.parse(localData) : 0;
    }); 
    const [totalPrice, setTotalPrice] = useState(()=> {
        const localData = localStorage.getItem('totalPrice');
        return localData ? JSON.parse(localData) : 0;
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    , [cart]);

    useEffect(() => {
        localStorage.setItem('totalItems', JSON.stringify(totalItems));
    }   
    , [totalItems]);

    useEffect(() => {
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    }   
    , [totalPrice]);   

    const handleAddToCart = (product: Product) => {
        if (!product || !product.id || !product.price) return;
    
        setCart((prevCart:Product[]) => {
          const exist = prevCart.find((item:Product) => item.id === product.id);
          const newCart = exist
            ? prevCart.map((item:Product) =>
                item.id === product.id
                  ? { ...item, qty: (item.qty || 1) + 1 }
                  : item
              )
            : [...prevCart, { ...product, qty: 1 }];
    
          // Update total items and price
          const newTotalItems = newCart.reduce((acc, item) => acc + (item.qty || 0), 0);
          const newTotalPrice = newCart.reduce((acc, item) => acc + (item.price * (item.qty || 0)), 0);
    
          setTotalItems(newTotalItems);
          setTotalPrice(newTotalPrice);
    
          return newCart;
        });
      };
    
      const handleRemoveFromCart = (id: number) => {
        setCart((prevCart:Product[]) => {
          const newCart = prevCart.filter((item:Product) => item.id !== id);
    
          // Update total items and price
          const newTotalItems = newCart.reduce((acc:number, item:Product) => acc + (item.qty || 0), 0);
          const newTotalPrice = newCart.reduce((acc:number, item:Product) => acc + (item.price * (item.qty || 0)), 0);
    
          setTotalItems(newTotalItems);
          setTotalPrice(newTotalPrice);
    
          return newCart;
        });
      };
    
      const handleUpdateCartQty = (id: number, qty: number) => {
        if (qty < 0) return;
    
        setCart((prevCart: Product[]) => {
          const newCart = prevCart.map((item:Product) =>
            item.id === id ? { ...item, qty } : item
          ).filter((item:Product) => item.qty > 0);
    
          // Update total items and price
          const newTotalItems = newCart.reduce((acc:number, item:Product) => acc + (item.qty || 0), 0);
          const newTotalPrice = newCart.reduce((acc:number, item:Product) => acc + (item.price * (item.qty || 0)), 0);
    
          setTotalItems(newTotalItems);
          setTotalPrice(newTotalPrice);
    
          return newCart;
        });
      };
    
      const handleRemoveAllFromCart = () => {
        setCart([]);
        setTotalItems(0);
        setTotalPrice(0);
      };
    
      const handleIncreaseQty = (id: number) => {
        setCart((prevCart:Product[]) => {
          const newCart = prevCart.map((item:Product) =>
            item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
          );
    
          // Update total items and price
          const newTotalItems = newCart.reduce((acc:number, item:Product) => acc + (item.qty || 0), 0);
          const newTotalPrice = newCart.reduce((acc:number, item:Product) => acc + (item.price * (item.qty || 0)), 0);
    
          setTotalItems(newTotalItems);
          setTotalPrice(newTotalPrice);
    
          return newCart;
        });
      };
    
      const handleDecreaseQty = (id: number) => {
        setCart((prevCart:Product[]) => {
          const newCart = prevCart.map((item: Product) =>
            item.id === id
              ? { ...item, qty: Math.max((item.qty || 1) - 1, 0) }
              : item
          ).filter((item: Product) => item.qty > 0);
    
          // Update total items and price
          const newTotalItems = newCart.reduce((acc:number, item: Product) => acc + (item.qty || 0), 0);
          const newTotalPrice = newCart.reduce((acc:number, item: Product) => acc + (item.price * (item.qty || 0)), 0);
    
          setTotalItems(newTotalItems);
          setTotalPrice(newTotalPrice);
    
          return newCart;
        });
      };


    return (
        <CartContext.Provider value={{cart, setCart, totalItems, setTotalItems, totalPrice, setTotalPrice, handleAddToCart, handleRemoveFromCart, handleUpdateCartQty, handleRemoveAllFromCart, handleIncreaseQty, handleDecreaseQty}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;



