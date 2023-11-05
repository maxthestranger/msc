<?php

namespace models;

class Enrollment {
    private $conn;
    private $table_name = "enrollments";

    public $id;
    public $course_id;
    public $student_id;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all enrollments
    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get enrollments by student id
    public function getByStudentId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE student_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->student_id);
        $stmt->execute();
        return $stmt;
    }

    // Get enrollments by course id
    public function getByCourseId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE course_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->course_id);
        $stmt->execute();
        return $stmt;
    }

    // Create enrollment
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET course_id = :course_id, student_id = :student_id";
        $stmt = $this->conn->prepare($query);
        $this->course_id = htmlspecialchars(strip_tags($this->course_id));
        $this->student_id = htmlspecialchars(strip_tags($this->student_id));
        $stmt->bindParam(':course_id', $this->course_id);
        $stmt->bindParam(':student_id', $this->student_id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Delete enrollment
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
