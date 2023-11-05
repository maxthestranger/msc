<?php

namespace controllers;

use Database;
use models\User;

class UserController {
    private $db;
    private $userModel;

    public function __construct() {
        $this->db = (new Database())->getConnection();
        $this->userModel = new User($this->db);
    }


    // Create user
    public function createUser($first_name, $last_name, $email, $password, $role) {
        $this->userModel->first_name = $first_name;
        $this->userModel->last_name = $last_name;
        $this->userModel->email = $email;
        $this->userModel->password = password_hash($password, PASSWORD_DEFAULT);
        $this->userModel->role = $role;

        if ($this->userModel->create()) {
            return ['status' => 'success', 'message' => 'User created successfully.'];
        } else {
            return ['status' => 'error', 'message' => 'Failed to create user.'];
        }
    }

    // Update user
    public function updateUser($id, $first_name, $last_name, $email, $password, $role) {
        $this->userModel->id = $id;
        $this->userModel->first_name = $first_name;
        $this->userModel->last_name = $last_name;
        $this->userModel->email = $email;
        $this->userModel->password = password_hash($password, PASSWORD_DEFAULT);
        $this->userModel->role = $role;

        if ($this->userModel->update()) {
            return ['status' => 'success', 'message' => 'User updated successfully.'];
        } else {
            return ['status' => 'error', 'message' => 'Failed to update user.'];
        }
    }

    // Delete user
    public function deleteUser($id) {
        $this->userModel->id = $id;

        if ($this->userModel->delete()) {
            return ['status' => 'success', 'message' => 'User deleted successfully.'];
        } else {
            return ['status' => 'error', 'message' => 'Failed to delete user.'];
        }
    }

    // Get user by id
    public function getById($id) {
        $this->userModel->id = $id;

        $user = $this->userModel->getById();

        if ($user) {
            return ['status' => 'success', 'data' => $user];
        } else {
            return ['status' => 'error', 'message' => 'User not found.'];
        }
    }

    // Get all users
    public function getAll() {
        $users = $this->userModel->getAll();

        if ($users) {
            return ['status' => 'success', 'data' => $users];
        } else {
            return ['status' => 'error', 'message' => 'No users found.'];
        }
    }

    // Login user
    public function login($email, $password) {
        $this->userModel->email = $email;
        $user = $this->userModel->getByEmail();

        if ($user && password_verify($password, $user['password'])) {
            return ['status' => 'success', 'data' => $user];
        } else {
            return ['status' => 'error', 'message' => 'Invalid email or password.'];
        }
    }
}

