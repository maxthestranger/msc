import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
    const navigate = useNavigate();
    const {currentUser: auth, logout} = useAuth();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);


    const handleLogout = async () => {
        await logout();

        navigate('/login')
    }

    return (
        <header className="bg-white text-black sticky top-0 z-50 w-full">
            <div className="container mx-auto flex flex-wrap justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <Link to="/" className="text-xl flex justify-between items-center gap-2 font-bold px-3 py-2 text-white border-4 border-primary capitalize sm:text-2xl">
                        <img src="/images/logo.svg" alt="logo" />
                        <span className="text-blue-600">
                            Canva
                        </span>
                    </Link>
                </div>

                <nav className="hidden sm:flex items-center">
                    <a href="/" className="block p-4 text-blue-600 font-bold hover:text-primary">Home</a>
                    <a href="/about" className="block p-4 text-blue-600 font-bold hover:text-primary">About</a>
                    <a href="/services" className="block p-4 text-blue-600 font-bold hover:text-primary">Services</a>
                    <a href="https://blog.navjotsingh.uta.cloud/" className="block p-4 text-blue-600 font-bold hover:text-primary" target="_blank" rel="noreferrer">Blog</a>
                    <a href="/contact" className="block p-4 text-blue-600 font-bold hover:text-primary">Contact</a>
                </nav>

                <div className="flex items-center sm:hidden">
                    <button
                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                        className="text-white"
                    >
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            {/* ... menu icon ... */}

                            <path
                                className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            <path
                                className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Dropdown */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden`}>
                    <nav>
                        <a href="/" className="block p-4 text-blue-600 font-bold hover:text-primary">Home</a>
                        <a href="/about" className="block p-4 text-blue-600 font-bold hover:text-primary">About</a>
                        <a href="/services" className="block p-4 text-blue-600 font-bold hover:text-primary">Services</a>
                        <a href="https://blog.navjotsingh.uta.cloud/" className="block p-4 text-blue-600 font-bold hover:text-primary" target="_blank" rel="noreferrer">Blog</a>
                        <a href="/contact" className="block p-4 text-blue-600 font-bold hover:text-primary">Contact</a>
                    </nav>
                </div>

                <div className="flex items-center">
                    {
                        auth?.email ? (
                            <div className="flex items-center gap-4">
                                <Link to={`/${auth.role}/dashboard`} className="block px-8 py-2 rounded-sm text-blue-600 border capitalize font-bold hover:text-primary">
                                    {`${auth.role} Dashboard`}
                                </Link>

                                <button onClick={handleLogout} className="inline-block px-4 py-2 text-blue-600 capitalize font-bold hover:text-primary">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="block px-8 py-2 rounded-sm text-blue-600 border font-bold hover:text-primary">Login</Link>
                        )
                    }
                </div>
            </div>
        </header>
    )
}


// prop validation
Header.propTypes = {
    auth: PropTypes.shape({
        user: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
};