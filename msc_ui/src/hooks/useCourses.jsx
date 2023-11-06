import { useState, useEffect } from 'react';
import useApiRequest from './useApiRequest';

const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const { execute } = useApiRequest();

    // Fetch all courses from REST API
    const fetchCourses = async () => {
        await execute('http://localhost:8000/api/courses', 'GET');
    };

    // Fetch a specific course by ID from REST API
    const fetchCourseById = async (id) => {
        await execute(`http://localhost:8000/api/courses/${id}`, 'GET');
    };

    // Create a new course using REST API
    const createCourse = async (courseData) => {
        await execute('http://localhost:8000/api/courses', 'POST', courseData);
        await fetchCourses(); // Refresh the list of courses after creation
    };

    // Update a course using REST API
    const updateCourse = async (id, updatedData) => {
        await execute(`http://localhost:8000/api/courses/${id}`, 'PUT', updatedData);
        await fetchCourses(); // Refresh the list of courses after update
    };

    // Delete a course using REST API
    const deleteCourse = async (id) => {
        await execute(`http://localhost:8000/api/courses/${id}`, 'DELETE');
        await fetchCourses(); // Refresh the list of courses after deletion
    };

    useEffect(() => {
        // Initialize courses state
        const initFetch = async () => {
            const response = await execute('http://localhost:8000/api/courses', 'GET');
            if (response) {
                setCourses(response); // Set courses with fetched data
            }
        };
        initFetch()
    }, [execute]);

    return {
        courses,
        createCourse,
        updateCourse,
        deleteCourse,
        fetchCourseById,
    };
};

export default useCourses;
