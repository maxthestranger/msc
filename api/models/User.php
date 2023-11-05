<?php

namespace models;

class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $first_name;
    public $last_name;
    public $email;
    public $password;
    public $role;

    public function __construct($db) {
        $this->conn = $db;
    }

    // create new user record
    public function create() {
        // SQL query to insert new user
        $query = "INSERT INTO " . $this->table_name . " SET first_name=:first_name, last_name=:last_name, email=:email, password=:password, role=:role";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        $hash = password_hash($this->password, PASSWORD_BCRYPT); // Hash the password

        // Bind values
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $hash);
        $stmt->bindParam(":role", $this->role);

        // Execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // check if given email exist in the database
    public function emailExists() {
        // SQL query to check if email exists
        $query = "SELECT id, first_name, last_name, password, role FROM " . $this->table_name . " WHERE email = ? LIMIT 0,1";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind the value
        $stmt->bindParam(1, $this->email);

        // Execute the query
        $stmt->execute();

        // Get number of rows
        $num = $stmt->rowCount();

        // If email exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {
            // Get record details / values
            $row = $stmt->fetch(\PDO::FETCH_ASSOC);

            // Assign values to object properties
            $this->id = $row['id'];
            $this->first_name = $row['first_name'];
            $this->last_name = $row['last_name'];
            $this->password = $row['password'];
            $this->role = $row['role'];

            // Return true because email exists in the database
            return true;
        }

        // Return false if email does not exist in the database
        return false;
    }

    // update a user record
    public function update() {
        // If password needs to be updated
        $password_set = !empty($this->password) ? ", password = :password" : "";

        // SQL query to update user record
        $query = "UPDATE " . $this->table_name . " SET first_name = :first_name, last_name = :last_name, email = :email {$password_set} WHERE id = :id";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->first_name = htmlspecialchars(strip_tags($this->first_name));
        $this->last_name = htmlspecialchars(strip_tags($this->last_name));
        $this->email = htmlspecialchars(strip_tags($this->email));

        // Bind the values from the form
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":email", $this->email);

        // Hash the password before saving to database
        if (!empty($this->password)) {
            $this->password = htmlspecialchars(strip_tags($this->password));
            $hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(":password", $hash);
        }

        // Unique ID of record to be edited
        $stmt->bindParam(":id", $this->id);

        // Execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // read all user records
    public function getAll($from_record_num, $records_per_page) {
        // SQL query to read all user records, with limit clause for pagination
        $query = "SELECT id, first_name, last_name, email, role FROM " . $this->table_name . " ORDER BY id DESC LIMIT ?, ?";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind the values from the form
        $stmt->bindParam(1, $from_record_num, \PDO::PARAM_INT);
        $stmt->bindParam(2, $records_per_page, \PDO::PARAM_INT);

        // Execute the query
        $stmt->execute();

        // Return values
        return $stmt;
    }

    // read user record by id
    public function getById() {
        // SQL query to read one user record
        $query = "SELECT first_name, last_name, email, role FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind the values from the form
        $stmt->bindParam(1, $this->id);

        // Execute the query
        $stmt->execute();

        // Get record details / values
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        // Assign values to object properties
        $this->first_name = $row['first_name'];
        $this->last_name = $row['last_name'];
        $this->email = $row['email'];
        $this->role = $row['role'];
    }

    // delete a user record
    public function delete() {
        // SQL query to delete a user record
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind the values from the form
        $stmt->bindParam(1, $this->id);

        // Execute the query
        if ($result = $stmt->execute()) {
            return true;
        }

        return false;
    }

    // used for paging users
    public function count() {
        // SQL query to count all user records
        $query = "SELECT id FROM " . $this->table_name . "";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Execute the query
        $stmt->execute();

        // Get number of rows
        $num = $stmt->rowCount();

        // Return row count
        return $num;
    }

    // read user record by email
    public function getByEmail() {
        // SQL query to read one user record
        $query = "SELECT id, first_name, last_name, email, role FROM " . $this->table_name . " WHERE email = ? LIMIT 0,1";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind the values from the form
        $stmt->bindParam(1, $this->email);

        // Execute the query
        $stmt->execute();

        // Get record details / values
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        // Assign values to object properties
        $this->id = $row['id'];
        $this->first_name = $row['first_name'];
        $this->last_name = $row['last_name'];
        $this->role = $row['role'];
    }

}

