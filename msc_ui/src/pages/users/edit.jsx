import {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import InputLabel from "../../components/InputLabel";
import TextInput from "../../components/TextInput";
import InputError from "../../components/InputError";
import PrimaryButton from "../../components/PrimaryButton";
import useFormValidation from "../../hooks/useFormValidation";
import validateUser from "../../utils/validateUser.js";
import useUsers from "../../hooks/useUsers";


const INITIAL_STATE = {
    email: '',
    role: '',
    first_name: '',
    last_name: '',
};

export default function Edit() {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState('');
    const { id } = useParams();

    const { updateUser, users } = useUsers();

    useEffect(() => {
        // Convert the `id` from string to number before comparison
        const numId = parseInt(id, 10);
        const user = users.find(user => user.id === numId);

        if (user) {
            INITIAL_STATE.email = user.email;
            INITIAL_STATE.role = user.role;
            INITIAL_STATE.first_name = user.first_name;
            INITIAL_STATE.last_name = user.last_name;
        }
    }, [users, id]);


    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        isSubmitting,
    } = useFormValidation(INITIAL_STATE, validateUser, submitForm);


    async function submitForm() {
        try {
            await updateUser(id, values);

            navigate('/users')
        } catch (error) {
            const errorMsg = error.message || 'Update Error.';
            setApiError(errorMsg);
        }
    }

    return (
        <DashboardLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-row items-center justify-between mb-4">
                        <div className="flex flex-row items-center gap-3">
                            <Link to="/users" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-gray border border-opacity-25 border-black rounded-md hover:bg-gray-3 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-bar-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"/>
                                </svg>
                                <span className="ml-2">All Users</span>
                            </Link>
                        </div>
                        <h2 className="text-2xl font-semibold text-black">Edit User Details</h2>
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

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-stroke px-5 pt-6 pb-2.5 sm:px-7.5 xl:pb-1">
                        <div className="max-w-full overflow-x-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="p-6.5">
                                    <div className="mb-4.5">
                                        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-4.5 sm:gap-6.5">
                                            <label htmlFor="instructor" className="flex cursor-pointer select-none items-center">
                                                <div className="relative">
                                                    <input type="radio" className="sr-only" name="role" id="instructor" value="instructor" onChange={(e) => handleChange(e)} />
                                                    <div className={`mr-2 flex h-5 w-5 items-center justify-center rounded border ${values.role === 'instructor' && 'border-primary bg-gray'}`}>
                                                        <span className={`h-2.5 w-2.5 rounded-sm ${values.role === 'instructor' && 'bg-primary'}`} />
                                                    </div>
                                                </div>
                                                Instructor
                                            </label>

                                            <label htmlFor="qa_officer" className="flex cursor-pointer select-none items-center">
                                                <div className="relative">
                                                    <input type="radio" className="sr-only" name="role" id="qa_officer" value="qa" onChange={(e) => handleChange(e)} />
                                                    <div className={`mr-2 flex h-5 w-5 items-center justify-center rounded border ${values.role === 'qa' && 'border-primary bg-gray'}`}>
                                                        <span className={`h-2.5 w-2.5 rounded-sm ${values.role === 'qa' && 'bg-primary'}`} />
                                                    </div>
                                                </div>
                                                QA Officer
                                            </label>

                                            <label htmlFor="coordinator" className="flex cursor-pointer select-none items-center">
                                                <div className="relative">
                                                    <input type="radio" className="sr-only" name="role" id="coordinator" value="coordinator" onChange={(e) => handleChange(e)} />
                                                    <div className={`mr-2 flex h-5 w-5 items-center justify-center rounded border ${values.role === 'coordinator' && 'border-primary bg-gray'}`}>
                                                        <span className={`h-2.5 w-2.5 rounded-sm ${values.role === 'coordinator' && 'bg-primary'}`} />
                                                    </div>
                                                </div>
                                                Coordinator
                                            </label>

                                            <label htmlFor="student" className="flex cursor-pointer select-none items-center">
                                                <div className="relative">
                                                    <input type="radio" className="sr-only" name="role" id="student" value="student" onChange={(e) => handleChange(e)} />
                                                    <div className={`mr-2 flex h-5 w-5 items-center justify-center rounded border ${values.role === 'student' && 'border-primary bg-gray'}`}>
                                                        <span className={`h-2.5 w-2.5 rounded-sm ${values.role === 'student' && 'bg-primary'}`} />
                                                    </div>
                                                </div>
                                                Student
                                            </label>
                                        </div>
                                        <InputError message={errors.role} className="mt-2" />
                                    </div>

                                    <div className="mb-4.5">
                                        <InputLabel htmlFor="email" value="Email" />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            isFocused={true}
                                            autoComplete="username"
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.email && <InputError message={errors.email} className="mt-2" />}
                                    </div>

                                    <div className="mb-4.5">
                                        <InputLabel htmlFor="first_name" value="First Name" />

                                        <TextInput
                                            id="first_name"
                                            name="first_name"
                                            value={values.first_name}
                                            autoComplete="first_name"
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.first_name && <InputError message={errors.first_name} className="mt-2" />}
                                    </div>

                                    <div className="mb-4.5">
                                        <InputLabel htmlFor="last_name" value="Last Name" />

                                        <TextInput
                                            id="last_name"
                                            name="last_name"
                                            value={values.last_name}
                                            autoComplete="last_name"
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.last_name && <InputError message={errors.last_name} className="mt-2" />}
                                    </div>

                                    <div className="mb-4.5">
                                        <PrimaryButton className="w-full" disabled={isSubmitting} type="submit">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                     className="bi bi-person-add" viewBox="0 0 16 16">
                                                  <path
                                                      d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                                  <path
                                                      d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                                                </svg>
                                            </span>
                                            Update Account
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
