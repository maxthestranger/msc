import {useEffect, useState} from 'react';
import {useSearchParams, useNavigate} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import GuestLayout from '../../layouts/GuestLayout';
import InputError from '../../components/InputError';
import InputLabel from '../../components/InputLabel';
import PrimaryButton from '../../components/PrimaryButton';
import TextInput from '../../components/TextInput';
import useFormValidation from "../../hooks/useFormValidation.jsx";
import validateReset from "../../utils/validateReset";

const INITIAL_STATE = {
    password: '',
    password_confirmation: '',
};

export default function ResetPassword() {
    const { resetPassword } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        isSubmitting,
    } = useFormValidation(INITIAL_STATE, validateReset, submitForm);

       const [email, setEmail] = useState(searchParams.get('email'));


    useEffect(() => {
        console.log('email', email)

        console.log('searchParams', searchParams.get('token'))
        if (email) {
            values.email = email;
        }
    }, [email]);


    async function submitForm() {
        setApiError('')

        try {
            await resetPassword(email, values.password);

            navigate(`/login`, {replace: true})

        } catch (error) {
            const errorMsg = error.message || 'Error during reset password.';
            setApiError(errorMsg);
        }
    }


    return (
        <GuestLayout>
            <div className="border-b border-stroke py-4 px-6.5">
                <h3 className="font-medium text-black text-center uppercase">
                    Reset Password
                </h3>
            </div>

            {
                apiError && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-6">
                        <div className="flex justify-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16Zm1-10a1 1 0 10-2 0v4a1 1 0 102 0v-4Z"/>
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    {apiError}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className="p-6.5">
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={values.password}
                            autoComplete="new-password"
                            isFocused={true}
                            onChange={handleChange}
                        />

                        {errors.password && <InputError message={errors.password} className="mt-2" />}
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                        <TextInput
                            type="password"
                            name="password_confirmation"
                            value={values.password_confirmation}
                            autoComplete="new-password"
                            onChange={handleChange}
                        />

                        {errors.password_confirmation && <InputError message={errors.password_confirmation} className="mt-2" />}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton disabled={isSubmitting}>
                            Reset Password
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
