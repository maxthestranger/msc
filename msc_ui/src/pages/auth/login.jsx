import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import Checkbox from '../../components/Checkbox';
import GuestLayout from '../../layouts/GuestLayout';
import InputError from '../../components/InputError';
import InputLabel from '../../components/InputLabel';
import PrimaryButton from '../../components/PrimaryButton';
import TextInput from '../../components/TextInput';
import useFormValidation from '../../hooks/useFormValidation';
import validateLogin from '../../utils/validateLogin';

const INITIAL_STATE = {
    email: '',
    password: '',
    remember: false,
};

export default function Login() {
    const navigate = useNavigate();
    const { login, currentUser } = useAuth();
    const [apiError, setApiError] = useState('');

    const {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        isSubmitting,
    } = useFormValidation(INITIAL_STATE, validateLogin, submitForm);

    async function submitForm() {
        setApiError('')

        try {
            const user = await login(values.email, values.password);

            navigate(`/dashboard/${user.role}`)

        } catch (error) {
            const errorMsg = error.message || 'Error during login.';
            setApiError(errorMsg);
        }
    }

    return (
        <GuestLayout>
            <div>
                <div className="border-b border-stroke py-4 px-6.5">
                    <h3 className="font-medium text-black text-center uppercase">
                        Log in
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
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={values.email}
                                autoComplete="username"
                                isFocused={true}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && <InputError message={errors.email} className="mt-2" />}
                        </div>

                        <div className="mb-4.5">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={values.password}
                                autoComplete="current-password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && <InputError message={errors.password} className="mt-2" />}
                        </div>

                        <div className="flex items-center justify-between mb-4.5">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={values.remember}
                                    onChange={handleChange}
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>

                            <Link
                                to="/login"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        <div className="mb-4.5">
                            <PrimaryButton className="w-full" disabled={isSubmitting}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-person-fill-check" viewBox="0 0 16 16">
                                      <path
                                          d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                      <path
                                          d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                    </svg>
                                </span>
                                Log in
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
