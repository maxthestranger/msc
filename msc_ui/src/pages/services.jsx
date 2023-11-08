import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import PropTypes from "prop-types";

export default function Services({ auth }) {
    return (
        <>

            <main>
                <section className="bg-white">

                    <div className="container max-w-screen-xl mx-auto px-4">

                        <Header auth={auth} />

                        <div className="flex items-center justify-center pb-20">

                            <div className="mt-28 text-center">
                                <h1 className="font-semibold text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-normal mb-6">Services We Offer</h1>
                                <p className="font-normal text-gray-400 text-lg md:text-xl text-center mx-auto mb-6 max-w-3xl">We invite you to explore degree requirements, confirm your initial eligibility, and learn more about our unique “earn your way in” admissions process.</p>

                                <div className="bg-blue-600 p-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-white rounded-lg shadow-md p-4">
                                            <h2 className="text-xl font-semibold mb-2">Student Services</h2>
                                            <p>Learn about our course registration, access to course materials, assessment, and academic support for students.</p>
                                        </div>
                                        <div className="bg-white rounded-lg shadow-md p-4">
                                            <h2 className="text-xl font-semibold mb-2">Instructor Services</h2>
                                            <p>Explore course management, gradebook, communication, and analytics tools for instructors.</p>
                                        </div>
                                        <div className="bg-white rounded-lg shadow-md p-4">
                                            <h2 className="text-xl font-semibold mb-2">Administrative Services</h2>
                                            <p>Discover user management, course scheduling, content management, and analytics for administrators.</p>
                                        </div>
                                        <div className="bg-white rounded-lg shadow-md p-4">
                                            <h2 className="text-xl font-semibold mb-2">Quality Assurance Services</h2>
                                            <p>Learn about program assessment, reporting, and continuous improvement efforts led by our QA officers.</p>
                                        </div>
                                    </div>
                                </div>

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
Services.propTypes = {
    auth: PropTypes.shape({
        user: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
};
