import { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
    const {currentUser: auth, logout} = useAuth();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

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
                        auth?.name ? (
                            <>
                                <Link to={`/${auth.role}/dashboard`} className="text-white font-bold hover:text-gray-800 border px-4 py-2 rounded-sm hover:border-accent-dark">
                                    {`${auth.role} Dashboard`}
                                </Link>
                                <div className="hidden sm:flex sm:items-center sm:ml-6">
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {auth?.name}

                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href="/profile">Profile</Dropdown.Link>
                                                <Dropdown.Button onClick={() => logout()}>
                                                    Log Out
                                                </Dropdown.Button>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className="-mr-2 flex items-center sm:hidden">
                                    <button
                                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                    >
                                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
                            </>
                        ) : (
                            <a href="/login" className="block px-8 py-2 rounded-sm text-blue-600 border font-bold hover:text-primary">Login</a>
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