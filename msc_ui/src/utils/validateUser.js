export default function validateUser(values) {
    let errors = {};

    // Name Errors
    if (!values.first_name) {
        errors.first_name = 'First name is required.';
    } else if (values.first_name.length < 3) {
        errors.first_name = 'Name must be at least 3 characters.';
    } else if (values.first_name.length > 30) {
        errors.first_name = 'Name must be less than 30 characters.';
    }

    if (!values.last_name) {
        errors.last_name = 'Last name is required.';
    } else if (values.last_name.length < 3) {
        errors.last_name = 'Name must be at least 3 characters.';
    } else if (values.last_name.length > 30) {
        errors.last_name = 'Name must be less than 30 characters.';
    }

    // Email Errors
    if (!values.email) {
        errors.email = 'An email is required.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid.';
    }

    // Role Errors
    if (!values.role) {
        errors.role = 'Role selection is required.';
    }

    return errors;
}
