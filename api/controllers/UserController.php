<?php

namespace Msc\Api\controllers;

use Msc\Api\models\User;

class UserController {
    private $userModel;

    public function __construct(User $userModel) {
        $this->userModel = $userModel;
    }

    // allows admin to create a new user
    public function createUser() {
        $data = json_decode(file_get_contents("php://input"), true); // Decode as array

        // Validate input data
        if (!isset($data['first_name'], $data['last_name'], $data['email'], $data['password'], $data['role'])) {
            http_response_code(400); // Bad Request
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. All fields are required.']);
            return;
        }

        // Attempt to create the user
        $result = $this->userModel->create($data);

        if ($result['status'] === 'success') {
            // Attempt to send the password reset email
            $emailResult = $this->userModel->sendPasswordResetEmail(['email' => $data['email']]);

            // Check if the email was sent successfully
            if ($emailResult['status'] === 'success') {
                http_response_code(201); // Created
                $result['message'] .= ' ' . $emailResult['message'];
            } else {
                // If the email failed to send, you may choose to still respond with 201 but indicate the failure.
                $result['message'] .= ' ' . $emailResult['message'];
            }
        } else {
            http_response_code(500); // Internal Server Error
        }

        echo json_encode($result);
    }



    // user login
    public function login() {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->email, $data->password)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. All fields are required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->userModel->login([
            'email' => $data->email,
            'password' => $data->password
        ]);

        echo json_encode($result);
    }

    // change password
    public function changePassword() {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->email, $data->password)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. All fields are required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->userModel->changePassword([
            'email' => $data->email,
            'password' => $data->password
        ]);

        echo json_encode($result);
    }

    // update user
    public function updateUser($id) {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->first_name, $data->last_name, $data->email, $data->role)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. All fields are required.']);
            http_response_code(400); // Bad Request
            return;
        }

        // Additional validation can be performed here (e.g., email format, role validation, etc.)

        $result = $this->userModel->update([
            'id' => $id,
            'first_name' => $data->first_name,
            'last_name' => $data->last_name,
            'email' => $data->email,
            'role' => $data->role
        ]);

        if ($result) {
            echo json_encode(['status' => 'success', 'message' => 'User updated successfully.']);
            http_response_code(200); // OK
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update user.']);
            http_response_code(500); // Internal Server Error
        }
    }


    // delete user
    public function deleteUser() {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->id)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. User ID is required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->userModel->delete($data->id);

        echo json_encode($result);
    }

    // get all users
    public function getUsers() {
        $result = $this->userModel->getAll();

        if ($result['status'] === 'error') {
            // Set HTTP response status code to 500 or another appropriate code
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'An error occurred while fetching users.'
            ]);
            return;
        }

        // If everything is okay, set HTTP response status code to 200
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'data' => $result['data']
        ]);
    }

    // get user by id
    public function getUser() {
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->id)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. User ID is required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->userModel->getById($data->id);

        echo json_encode($result);
    }
}
