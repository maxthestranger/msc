import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/sidebar";
import PropTypes from "prop-types";

export default function Authenticated({ children }) {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);


    const handleLogout = async () => {
        await logout();

        navigate('/login')
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar user={currentUser} showingNavigationDropdown={showingNavigationDropdown} setShowingNavigationDropdown={setShowingNavigationDropdown} />

            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
                    <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                            <button className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden" onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}>
                                <span className="relative block h-5.5 w-5.5 cursor-pointer">
                                    <span className={`du-block absolute right-0 h-full w-full ${showingNavigationDropdown ? 'hidden' : 'block'}`}>
                                        <span className="relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black duration-200 ease-in-out dark:bg-white !w-full delay-300" />
                                        <span className="relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white delay-400 !w-full" />
                                        <span className="relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black duration-200 ease-in-out dark:bg-white !w-full delay-500" />
                                    </span>
                                    <span className={`absolute right-0 h-full w-full rotate-45 ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
                                        <span className="absolute left-2.5 top-0 block w-0.5 rounded-sm bg-black duration-200 ease-in-out dark:bg-white !h-0 !delay-[0]" />
                                        <span className="delay-400 absolute left-0 top-2.5 block w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white !h-0 !delay-200" />
                                    </span>
                                </span>
                            </button>
                        </div>

                        <Link to="/" className="text-xl flex justify-between items-center gap-2 font-bold px-3 py-2 text-white border-4 border-primary capitalize sm:text-2xl lg:hidden">
                            <img src="/images/logo.svg" alt="logo" />
                            <span className="text-blue-600">
                                Canva
                            </span>
                        </Link>

                        <div className="flex items-center gap-3 2xsm:gap-7 lg:ml-auto">
                            <div className="relative">
                                <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:text-primary hover:border-primary focus:outline-none" onClick={handleLogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-dash" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                    </svg>
                                    <span className="ml-2">Log Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}


//prop validation
Authenticated.propTypes = {
    children: PropTypes.node.isRequired,
}