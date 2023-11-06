<?php

namespace Msc\Api\controllers;

use Msc\Api\models\Enrollment;

class EnrollmentController
{
    private Enrollment $enrollmentModel;

    public function __construct(Enrollment $enrollmentModel)
    {
        $this->enrollmentModel = $enrollmentModel;
    }

    // Create a new enrollment
    public function createEnrollment()
    {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->user_id, $data->course_id)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. All fields are required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->enrollmentModel->create([
            'user_id' => $data->user_id,
            'course_id' => $data->course_id
        ]);

        echo json_encode($result);
    }

    // Delete an enrollment
    public function deleteEnrollment()
    {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->id)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. Enrollment ID is required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->enrollmentModel->delete($data->id);

        echo json_encode($result);
    }

    public function getEnrollmentsByStudentId()
    {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->student_id)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. Student ID is required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->enrollmentModel->getEnrollmentsByStudentId($data->student_id);

        echo json_encode($result);
    }

}