import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import PropTypes from "prop-types";

export default function Index({ auth }) {
    return (
        <>
            <Header auth={auth} />

            <main>
                <h1 className="text-2xl">
                    Home
                </h1>
            </main>

            <Footer />
        </>
    );
}

// prop validation
Index.propTypes = {
    auth: PropTypes.shape({
        user: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
};
