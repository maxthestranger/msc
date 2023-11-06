<?php

namespace Msc\Api\models;

class Enrollment {
    private $conn;
    private $table_name = "enrollments";

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
    public function getByStudentId(string $student_id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE student_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $student_id);
        $stmt->execute();
        return $stmt;
    }

    // Get enrollments by course id
    public function getByCourseId(string $course_id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE course_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $course_id);
        $stmt->execute();
        return $stmt;
    }

    // Create enrollment
    public function create(array $data): array {
        $query = "INSERT INTO " . $this->table_name . " SET course_id = :course_id, student_id = :student_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':course_id', htmlspecialchars(strip_tags($data['course_id'])));
        $stmt->bindParam(':student_id', htmlspecialchars(strip_tags($data['student_id'])));
        if ($stmt->execute()) {
            return ['status' => 'success', 'message' => 'Enrollment created successfully.'];
        }
        return ['status' => 'error', 'message' => 'Failed to create enrollment.'];
    }

    // Delete enrollment
    public function delete(string $id): array {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, htmlspecialchars(strip_tags($id)));
        if ($stmt->execute()) {
            return ['status' => 'success', 'message' => 'Enrollment deleted successfully.'];
        }
        return ['status' => 'error', 'message' => 'Failed to delete enrollment.'];
    }

    // Get all courses with course materials where student is enrolled
    public function getEnrollmentsByStudentId(string $student_id): array
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE student_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, htmlspecialchars(strip_tags($student_id)));
        $stmt->execute();
        $enrollments = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        $courses = [];
        foreach ($enrollments as $enrollment) {
            $query = "SELECT * FROM courses WHERE id = ? ORDER BY id DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, htmlspecialchars(strip_tags($enrollment['course_id'])));
            $stmt->execute();
            $course = $stmt->fetch(\PDO::FETCH_ASSOC);
            $courses[] = $course;
        }
        return $courses;
    }
}
