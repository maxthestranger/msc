<?php

namespace models;

class Course {
    private $conn;
    private $table_name = "courses";

    public $id;
    public $course_name;
    public $course_description;
    public $created_by_admin;

    public function __construct($db) {
        $this->conn = $db;
    }

    // read courses
    function read() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // create new course record
    public function create() {
        // SQL query to insert new course
        $query = "INSERT INTO " . $this->table_name . " SET course_name=:course_name, course_description=:course_description, created_by_admin=:created_by_admin";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":course_name", $this->course_name);
        $stmt->bindParam(":course_description", $this->course_description);
        $stmt->bindParam(":created_by_admin", $this->created_by_admin);

        // Execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // update course record
    public function update() {
        // SQL query to update course
        $query = "UPDATE " . $this->table_name . " SET course_name=:course_name, course_description=:course_description WHERE id=:id";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":course_name", $this->course_name);
        $stmt->bindParam(":course_description", $this->course_description);
        $stmt->bindParam(":id", $this->id);

        // Execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // delete course record
    public function delete() {
        // SQL query to delete course
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind the value
        $stmt->bindParam(1, $this->id);

        // Execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // get single course record include course_materials
    public function readOne() {
        // SQL query to read single course
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind the value
        $stmt->bindParam(1, $this->id);

        // Execute the query
        $stmt->execute();

        // Get number of rows
        $num = $stmt->rowCount();

        // If course exists
        if ($num > 0) {
            // Get course details
            $row = $stmt->fetch(\PDO::FETCH_ASSOC);

            // Assign values to object properties
            $this->course_name = $row['course_name'];
            $this->course_description = $row['course_description'];
            $this->created_by_admin = $row['created_by_admin'];
        }
    }
}
