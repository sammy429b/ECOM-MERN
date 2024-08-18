import { useAuth } from "@/context/useAuth";
import { useCart } from "@/context/useCart";
import { Link, NavLink, useNavigate } from "react-router-dom";


function Navbar() {
    const { isAuthenticated,handleLogoutAuth } = useAuth();  
    const navigate = useNavigate();

    const {totalItems, totalPrice} = useCart();

    const handleLogout = () => {
        handleLogoutAuth();
        sessionStorage.removeItem("token");
        navigate("/login");

    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-md">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-30 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? "bg-black text-white" : ""}>
                                    All
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/category/men" className={({ isActive }) => isActive ? "bg-black text-white" : ""}>
                                    Men's clothing
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/category/women" className={({ isActive }) => isActive ? "bg-black text-white" : ""}>
                                    Women's clothing
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/category/jewellery" className={({ isActive }) => isActive ? "bg-black text-white" : ""}>
                                    Jewellery
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/category/electronics" className={({ isActive }) => isActive ? "bg-black text-white" : ""}>
                                    Electronics
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Upshop</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li className="mx-2">
                            <NavLink to="/" className={({ isActive }) => isActive ? "bg-neutral-content" : ""}>
                                Home
                            </NavLink>
                        </li>
                        <li className="mx-2">
                            <NavLink to="/category/men" className={({ isActive }) => isActive ? "bg-neutral-content" : ""}>
                                Men's clothing
                            </NavLink>
                        </li>
                        <li className="mx-2">
                            <NavLink to="/category/women" className={({ isActive }) => isActive ? "bg-neutral-content" : ""}>
                                Women's clothing
                            </NavLink>
                        </li>
                        <li className="mx-2">
                            <NavLink to="/category/jewellery" className={({ isActive }) => isActive ? "bg-neutral-content" : ""}>
                                Jewellery
                            </NavLink>
                        </li>
                        <li className="mx-2">
                            <NavLink to="/category/electronics" className={({ isActive }) => isActive ? "bg-neutral-content" : ""}>
                                Electronics
                            </NavLink>
                        </li>

                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex items-center justify-center gap-x-2">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={totalItems}
                                role="button"
                                className="btn btn-ghost btn-circle"
                            >
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <span className="badge badge-sm indicator-item">{totalItems}</span>
                                </div>
                            </div>

                            <div
                                tabIndex={0}
                                className="mt-3 z-30 card card-compact dropdown-content w-52 bg-base-100 shadow"
                            >
                                {isAuthenticated ? (<div className="card-body">
                                    <span className="font-bold text-lg">{totalItems} Items</span>
                                    <span className="text-info">Subtotal: ${totalPrice}</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block">
                                            <Link to="/cart">
                                                View cart
                                            </Link>
                                        </button>
                                    </div>
                                </div>)
                                    : (
                                        <div className="card-body">
                                            <span className="font-bold text-lg">{totalItems} Items</span>
                                            <span className="text-info">Subtotal: ${totalPrice}</span>
                                            <div className="card-actions">
                                                <Link to="/cart" className="btn btn-primary btn-block">
                                                    View cart
                                                </Link>
                                            </div>
                                        </div>)}
                            </div>
                        </div>
                        {isAuthenticated ? (<div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://github.com/shadcn.png"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-30 p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li>
                                    <a>Settings</a>
                                </li>
                                <li onClick={handleLogout}>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </div>)
                            :
                            (<div className="dropdown dropdown-end">
                                <button className="btn">Login</button>

                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-30 p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">Sign up</Link>
                                    </li>
                                </ul>
                            </div>)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
