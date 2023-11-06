import PropTypes from "prop-types";

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-meta-1 ' + className}>
            {message}
        </p>
    ) : null;
}


// prop validation
InputError.propTypes = {
    message: PropTypes.string,
    className: PropTypes.string,
}