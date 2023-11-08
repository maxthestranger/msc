import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import PropTypes from "prop-types";

export default function About({ auth }) {
    return (
        <>

            <main>
                <section className="bg-white">

                    <div className="container max-w-screen-xl mx-auto px-4">

                        <Header auth={auth} />

                        <div className="flex items-center justify-center">

                                <div className="mt-28 text-center">
                                    <h1 className="font-semibold text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-normal mb-6">About Us</h1>

                                    <div className="max-w-4xl mx-auto">
                                        <p className="font-normal text-xl text-gray-400 leading-relaxed mb-12">
                                            <span className="font-semibold">Our Mission:</span>
                                            A subsection that describes the mission of the academic institution. It conveys a dedication to providing high-quality education and fostering a learning community where students can thrive.
                                        </p>
                                        <p className="font-normal text-xl text-gray-400 leading-relaxed mb-12">
                                            <span className="font-semibold">Our Vision:</span>
                                            Another subsection that introduces the team of the institution. It emphasizes the commitment of experienced instructors and administrators to the success of students. The team is described as passionate about education and helping students achieve their academic goals.
                                        </p>
                                        <p className="font-normal text-xl text-gray-400 leading-relaxed mb-12">
                                            <span className="font-semibold">Our History:</span>
                                            This subsection provides a brief overview of the institution's history. It mentions the year of establishment and highlights the institution's tradition of excellence in education. It also states that the institution has a track record of assisting numerous students in reaching their full
                                        </p>
                                    </div>

                                    <button className="px-6 py-4 bg-blue-700 text-white font-semibold text-lg rounded-xl hover:bg-blue-900 transition ease-in-out duration-500">Start Your Journey</button>
                                </div>
                        </div>

                        <section className="bg-white py-50">

                            <div className="container max-w-screen-xl mx-auto px-4 xl:relative">

                                <p className="font-normal text-gray-400 text-lg md:text-xl text-center uppercase mb-6">Testimonial</p>

                                <h1 className="font-semibold text-gray-900 text-2xl md:text-4xl text-center leading-normal mb-14">What People Say <br /> About Canva</h1>

                                <div className="hidden xl:block xl:absolute top-0">
                                    <img src="/images/testimoni-1.png" alt="Image" />
                                </div>

                                <div className="hidden xl:block xl:absolute top-32">
                                    <img src="/images/testimoni-2.png" alt="Image" />
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-center md:space-x-8 lg:space-x-12 mb-10 md:mb-20">

                                    <div className="bg-gray-100 rounded-lg mb-10 md:mb-0">
                                        <img src="/images/testimoni-3.png" alt="Image" className="mx-8 my-8" />

                                        <div className="flex items-center gap-5 mx-8">
                                            <i data-feather="star" className="text-yellow-500"></i>
                                            <i data-feather="star" className="text-yellow-500"></i>
                                            <i data-feather="star" className="text-yellow-500"></i>
                                            <i data-feather="star" className="text-yellow-500"></i>
                                            <i data-feather="star" className="text-yellow-500"></i>
                                        </div>

                                        <p className="font-normal text-sm lg:text-md text-gray-400 mx-8 my-8">flexible in pace and customizable by design. <br />You can study part time, choosing courses that fit your schedule<br /> and align with your professional goals.</p>

                                        <h3 className="font-semibold text-gray-900 text-xl md:text-2xl lg:text-3xl mx-8 mb-8">Brooklyn Simmons</h3>
                                    </div>

                                    <div className="bg-gray-100 rounded-lg">
                                        <img src="/images/testimoni-4.png" alt="Image" className="mx-8 my-8" />

                                        <div className="flex items-center gap-5 mx-8">
                                            <i data-feather="star" className="text-yellow-500"></i>
                                            <i data-feather="star" className="text-yellow-500"></i>
                                            <i data-feather="star" className="text-yellow-500"></i>
                                            <i data-feather="star" className="text-yellow-500"></i>
                                            <i data-feather="star" className="text-yellow-500"></i>
                                        </div>

                                        <p className="font-normal text-sm lg:text-md text-gray-400 mx-8 my-8">flexible in pace and customizable by design. You can study part time,<br /> choosing courses that fit your schedule and align with<br /> your professional goals.</p>

                                        <h3 className="font-semibold text-gray-900 text-xl md:text-2xl lg:text-3xl mx-8 mb-8">Ralph Edwards</h3>
                                    </div>

                                </div>

                            </div>

                        </section>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

// prop validation
About.propTypes = {
    auth: PropTypes.shape({
        user: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
};
