import {createContext, useContext, useState, ReactNode, useEffect} from 'react';


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
    habdleRemoveAllFromCart: () => void;
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

    const handleAddToCart = (product: any) => {
        const exist = cart.find((item: any) => item.id === product.id);
        if (exist) {
            setCart(cart.map((item: any) => item.id === product.id ? {...exist, qty: exist.qty + 1} : item));
        } else {
            setCart([...cart, {...product, qty: 1}]);
        }
        setTotalItems(totalItems + 1);
        setTotalPrice(totalPrice + product.price); 
    };

    const handleRemoveFromCart = (id: number) => {
        setCart(cart.filter((item: any) => item.id !== id));
    };

    const handleUpdateCartQty = (id: number, qty: number) => {
        setCart(cart.map((item: any) => item.id === id ? {...item, qty: qty} : item));
    };

    const habdleRemoveAllFromCart = () => {
        setCart([]);
    };


    return (
        <CartContext.Provider value={{cart, setCart, totalItems, setTotalItems, totalPrice, setTotalPrice, handleAddToCart, handleRemoveFromCart, handleUpdateCartQty}}>
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



