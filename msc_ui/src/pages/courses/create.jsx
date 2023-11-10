import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import InputLabel from "../../components/InputLabel";
import TextInput from "../../components/TextInput";
import InputError from "../../components/InputError";
import useCourses from "../../hooks/useCourses";
import {useAuth} from "../../contexts/AuthContext";
import MDEditor from "@uiw/react-md-editor";
import MdEditor from "../../components/mdEditor.jsx";

export default function Create() {
    const {
        createCourse,
    } = useCourses();

    const {currentUser} = useAuth();

    const navigate = useNavigate();

    const [data, setData] = useState({
        course_name: '',
        course_description: '',
        course_code: '',
    });

    const [errors, setErrors] = useState({
        course_name: '',
        course_description: '',
        course_code: '',
    });

    const handleValidation = () => {
        let formIsValid = true;
        let errors = {};

        if (!data.course_name) {
            formIsValid = false;
            errors['course_name'] = 'Course name is required';
        }

        if (!data.course_description) {
            formIsValid = false;
            errors['description'] = 'Description is required';
        }

        if (!data.course_code) {
            formIsValid = false;
            errors['course_code'] = 'Course Code is required';
        }

        setErrors(errors);

        return formIsValid;
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const submit = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            await createCourse({...data, created_by_admin: currentUser.id}).then(() => {
                navigate('/courses');
            });
        }
    }

    return (
        <DashboardLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-row items-center justify-between mb-4">
                        <div className="flex flex-row items-center gap-3">
                            <Link to="/courses" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-gray border border-opacity-25 border-black rounded-md hover:bg-gray-3 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-bar-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"/>
                                </svg>
                                <span className="ml-2">All Courses</span>
                            </Link>
                        </div>
                        <h2 className="text-2xl font-semibold text-black">Provide Course Details</h2>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-stroke px-5 pt-6 pb-2.5 sm:px-7.5 xl:pb-1">
                        <div className="max-w-full overflow-x-auto">
                            <form onSubmit={submit}>
                                <div className="p-6.5">
                                    <div className="mb-4.5">
                                        <InputLabel htmlFor="course_code" value="Course Code" />
                                        <TextInput id="course_code" placeholder="Enter course code" type="text" name="course_code" value={data.course_code} onChange={(e) => handleChange(e)} />

                                        <InputError message={errors.course_code} className="mt-2" />
                                    </div>
                                    <div className="mb-4.5">
                                        <InputLabel htmlFor="course_name" value="Course Name" />
                                        <TextInput id="course_name" placeholder="Enter course name" type="text" name="course_name" value={data.course_name} onChange={(e) => handleChange(e)} />

                                        <InputError message={errors.course_name} className="mt-2" />
                                    </div>
                                    <div className="mb-4.5">
                                        <InputLabel htmlFor="course_description" value="Description" />
                                        <MdEditor value={data.course_description} onChange={(e) => setData({...data, course_description: e})} />

                                        <InputError message={errors.course_description} className="mt-2" />
                                    </div>
                                    <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none" type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-terminal-plus" viewBox="0 0 16 16">
                                            <path d="M2 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v4a.5.5 0 0 1-1 0V4a1 1 0 0 0-1-1H2Z"/>
                                            <path d="M3.146 5.146a.5.5 0 0 1 .708 0L5.177 6.47a.75.75 0 0 1 0 1.06L3.854 8.854a.5.5 0 1 1-.708-.708L4.293 7 3.146 5.854a.5.5 0 0 1 0-.708ZM5.5 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5ZM16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
                                        </svg>
                                        <span className="ml-2">Create Course</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
