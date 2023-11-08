export default function validateReset(values) {
    let errors = {};

    // Password Errors
    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) { // or whatever your password criteria is
        errors.password = "Password must be at least 6 characters";
    }

    // Confirm Password Errors
    if (!values.password_confirmation) {
        errors.password_confirmation = "Confirm password is required";
    } else if (values.password_confirmation !== values.password) {
        errors.password_confirmation = "Passwords must match";
    }

    return errors;
}
