import Register from "./pages/Register"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ForgotPassword from "./pages/ForgotPassword"
import ChangePassword from "./pages/ChangePassword"
import PrivateRoute, { PublicRoute } from "./utils/PrivateRoute"
import OTP from "./pages/OTP"
import ForgotPasswordOTP from "./pages/ForgotPasswordOTP"
import OTPRoute from "./utils/OTPRoute"
import ForgotPasswordRoute from "./utils/ForgotPasswordRoute"
import Index from "./pages/Index"
import Navbar from "./components/custom/Navbar"
import Category from "./pages/Category"
import Cart from "./pages/Cart"
import Page_Not_Found from "./pages/404"
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route element={<PublicRoute/>}>
          <Route path="/" element={<Index />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/password/email" element={<ForgotPasswordOTP />}></Route>
          </Route>
          <Route element={<ForgotPasswordRoute/>}>
            <Route path="/password/reset" element={<ForgotPassword />}></Route>
          </Route>
          <Route element={<OTPRoute/>}>
            <Route path="/password/otp" element={<OTP />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/main" element={<Index />}></Route>
            <Route path="/password/change" element={<ChangePassword />}></Route>
          </Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/category/:category" element={<Category />}></Route>
          <Route path="*" element={<Page_Not_Found/>}></Route>
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App