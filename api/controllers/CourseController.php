<?php

namespace Msc\Api\controllers;

use Msc\Api\models\Course;

class CourseController {
    private Course $courseModel;

    public function __construct(Course $courseModel) {
        $this->courseModel = $courseModel;
    }

    // Create a new course
    public function createCourse() {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->course_name, $data->course_code, $data->course_description, $data->created_by_admin)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. All fields are required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->courseModel->create([
            'course_name' => $data->course_name,
            'course_code' => $data->course_code,
            'course_description' => $data->course_description,
            'created_by_admin' => $data->created_by_admin
        ]);

        echo json_encode($result);
    }

    // Update a course
    public function updateCourse() {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->id, $data->course_name, $data->course_description)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. All fields are required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->courseModel->update([
            'id' => $data->id,
            'course_name' => $data->course_name,
            'course_description' => $data->course_description
        ]);

        echo json_encode($result);
    }

    // Delete a course
    public function deleteCourse() {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->id)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. Course ID is required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->courseModel->delete($data->id);

        echo json_encode($result);
    }

    // Get a single course with materials
    public function getCourse() {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->id)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. Course ID is required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->courseModel->getCourse($data->id);

        echo json_encode($result);
    }

    // Get all courses
    public function getCourses() {
        $result = $this->courseModel->getAll();

        echo json_encode($result);
    }
}
