import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Error({ auth }) {
    return (
        <>

            <main className="min-h-sticky bg-white">
                <section className="bg-white">

                    <div className="container max-w-screen-xl mx-auto px-4">

                        <Header auth={auth} />

                        <div className="flex items-center justify-center">

                            <div className="mt-28 text-center">
                                <h1 className="font-semibold text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-normal mb-6">404</h1>

                                <div className="max-w-4xl mx-auto">
                                    <p className="font-normal text-xl text-gray-400 leading-relaxed mb-12">
                                        Looks like you're lost. <br /> Let's get you back to the right place.
                                    </p>
                                </div>
                                <Link to="/" className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-700 text-white font-semibold text-lg rounded-xl hover:bg-blue-900 transition ease-in-out duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-houses" viewBox="0 0 16 16">
                                        <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708L5.793 1Zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207l-4.5-4.5Z"/>
                                    </svg>
                                    &nbsp; Go Home
                                </Link>

                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

// prop validation
Error.propTypes = {
    auth: PropTypes.shape({
        user: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
};
