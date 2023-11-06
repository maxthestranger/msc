<?php

namespace Msc\Api\models;

class CourseInstructor {
    private $conn;
    private $table_name = "course_instructors";

    public $id;
    public $course_id;
    public $instructor_id;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all course instructors
    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // assign instructor to course
    public function assign() {
        $query = "INSERT INTO " . $this->table_name . " SET course_id = :course_id, instructor_id = :instructor_id";
        $stmt = $this->conn->prepare($query);
        $this->course_id = htmlspecialchars(strip_tags($this->course_id));
        $this->instructor_id = htmlspecialchars(strip_tags($this->instructor_id));
        $stmt->bindParam(':course_id', $this->course_id);
        $stmt->bindParam(':instructor_id', $this->instructor_id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // unassign instructor from course
    public function unassign() {
        $query = "DELETE FROM " . $this->table_name . " WHERE course_id = :course_id AND instructor_id = :instructor_id";
        $stmt = $this->conn->prepare($query);
        $this->course_id = htmlspecialchars(strip_tags($this->course_id));
        $this->instructor_id = htmlspecialchars(strip_tags($this->instructor_id));
        $stmt->bindParam(':course_id', $this->course_id);
        $stmt->bindParam(':instructor_id', $this->instructor_id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // get instructors by course id
    public function getByCourseId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE course_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->course_id);
        $stmt->execute();
        return $stmt;
    }

    // get courses by instructor id
    public function getByInstructorId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE instructor_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->instructor_id);
        $stmt->execute();
        return $stmt;
    }

    // check if instructor is assigned to course
    public function isAssigned() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE course_id = :course_id AND instructor_id = :instructor_id";
        $stmt = $this->conn->prepare($query);
        $this->course_id = htmlspecialchars(strip_tags($this->course_id));
        $this->instructor_id = htmlspecialchars(strip_tags($this->instructor_id));
        $stmt->bindParam(':course_id', $this->course_id);
        $stmt->bindParam(':instructor_id', $this->instructor_id);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            return true;
        }
        return false;
    }
}
