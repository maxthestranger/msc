import { useState, useEffect } from 'react';

const useFormValidation = (initialState, validate, submitForm) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                submitForm();
                setSubmitting(false);
            } else {
                setSubmitting(false);
            }
        }
    }, [errors, isSubmitting, submitForm]);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
        isSubmitting,
    };
};

export default useFormValidation;
