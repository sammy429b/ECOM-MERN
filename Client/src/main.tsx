import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/useAuth.tsx'
import { CartProvider } from './context/useCart.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
  <CartProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
  </CartProvider>
  </>,
)
