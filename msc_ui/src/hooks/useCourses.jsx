import { useState, useEffect } from "react";
import useApiRequest from "./useApiRequest";

const BASE_URL = "https://api.uta.cloud/api/courses";
const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const { execute } = useApiRequest();

  // Fetch all courses from REST API
  const fetchCourses = async () => {
    await execute(BASE_URL, "GET");
  };

  // Fetch a specific course by ID from REST API
  const fetchCourseById = async (id) => {
    await execute(`${BASE_URL}/${id}`, "GET");
  };

  // Create a new course using REST API
  const createCourse = async (courseData) => {
    await execute(BASE_URL, "POST", courseData);
    await fetchCourses(); // Refresh the list of courses after creation
  };

  // Update a course using REST API
  const updateCourse = async (id, updatedData) => {
    await execute(
      `BASE_URL/${id}`,
      "PUT",
      updatedData
    );
    await fetchCourses(); // Refresh the list of courses after update
  };

  // Delete a course using REST API
  const deleteCourse = async (id) => {
    await execute(`${BASE_URL}/${id}`, "DELETE");
    await fetchCourses(); // Refresh the list of courses after deletion
  };

  useEffect(() => {
    // Initialize courses state
    const initFetch = async () => {
      const response = await execute(
        BASE_URL,
        "GET"
      );
      if (response) {
        setCourses(response); // Set courses with fetched data
      }
    };
    initFetch();
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
