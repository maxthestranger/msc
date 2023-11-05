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
        $data = json_decode(file_get_contents("php://input"));

        // Validate input data
        if (!isset($data->first_name, $data->last_name, $data->email, $data->password, $data->role)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input. All fields are required.']);
            http_response_code(400);  // Bad Request
            return;
        }

        $result = $this->userModel->create([
            'first_name' => $data->first_name,
            'last_name' => $data->last_name,
            'email' => $data->email,
            'password' => $data->password,
            'role' => $data->role
        ]);

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
}
