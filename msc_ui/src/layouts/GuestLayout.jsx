import Footer from "../components/footer.jsx";
import Header from "../components/header.jsx";
import PropTypes from "prop-types";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen">
            <Header />

            <main className="min-h-sticky w-full flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="mx-auto max-w-screen-sm xl:w-1/2 p-4 md:p-6 2xl:p-10">
                    <div className="rounded-sm border border-stroke bg-white shadow-default">
                        {children}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}


// prop validation
Guest.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}