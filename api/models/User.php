<?php

namespace Msc\Api\models;

class User {
    private $conn;
    private $table_name = "users";

    public function __construct($db) {
        $this->conn = $db;
    }

    // create a new user
    public function create(array $data): array
    {
        $query = "INSERT INTO " . $this->table_name . " SET first_name=:first_name, last_name=:last_name, email=:email, password=:password, role=:role";
        $stmt = $this->conn->prepare($query);

        // Hash the password
        $hash = password_hash($data['password'], PASSWORD_BCRYPT);

        // Bind values
        $stmt->bindParam(":first_name", $data['first_name']);
        $stmt->bindParam(":last_name", $data['last_name']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":password", $hash);
        $stmt->bindParam(":role", $data['role']);

        // Execute the query
        if ($stmt->execute()) {
            return ['status' => 'success', 'message' => 'User created successfully.'];
        }

        return ['status' => 'error', 'message' => 'Failed to create user.'];
    }

    // user login
    public function login(array $data): array
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email=:email";
        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":email", $data['email']);

        // Execute the query
        $stmt->execute();

        // Get the row
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        // Check if the email exists
        if ($row) {
            // Check if the password is correct
            if (password_verify($data['password'], $row['password'])) {
                return ['status' => 'success', 'message' => 'User logged in successfully.'];
            }
        }

        return ['status' => 'error', 'message' => 'Invalid email or password.'];
    }

    // change password
    public function changePassword(array $data): array
    {
        $query = "UPDATE " . $this->table_name . " SET password=:password WHERE email=:email";
        $stmt = $this->conn->prepare($query);

        // Hash the password
        $hash = password_hash($data['password'], PASSWORD_BCRYPT);

        // Bind values
        $stmt->bindParam(":password", $hash);
        $stmt->bindParam(":email", $data['email']);

        // Execute the query
        if ($stmt->execute()) {
            // Check if any row was affected
            if($stmt->rowCount() > 0) {
                return ['status' => 'success', 'message' => 'Password changed successfully.'];
            } else {
                return ['status' => 'error', 'message' => 'Email does not exist.'];
            }
        }

        return ['status' => 'error', 'message' => 'Failed to change password.'];
    }

}
