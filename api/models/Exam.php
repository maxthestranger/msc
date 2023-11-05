<?php

namespace models;

class Exam {
    private $conn;
    private $table_name = "exams";

    public $id;
    public $course_id;
    public $exam_name;
    public $exam_pdf_link;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all exams
    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get exams by course id
    public function getByCourseId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE course_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->course_id);
        $stmt->execute();
        return $stmt;
    }

    // Get exam by id
    public function getById() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        return $stmt;
    }

    // Create exam
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET course_id = :course_id, exam_name = :exam_name, exam_pdf_link = :exam_pdf_link";
        $stmt = $this->conn->prepare($query);
        $this->course_id = htmlspecialchars(strip_tags($this->course_id));
        $this->exam_name = htmlspecialchars(strip_tags($this->exam_name));
        $this->exam_pdf_link = htmlspecialchars(strip_tags($this->exam_pdf_link));
        $stmt->bindParam(':course_id', $this->course_id);
        $stmt->bindParam(':exam_name', $this->exam_name);
        $stmt->bindParam(':exam_pdf_link', $this->exam_pdf_link);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Update exam
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET course_id = :course_id, exam_name = :exam_name, exam_pdf_link = :exam_pdf_link WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $this->course_id = htmlspecialchars(strip_tags($this->course_id));
        $this->exam_name = htmlspecialchars(strip_tags($this->exam_name));
        $this->exam_pdf_link = htmlspecialchars(strip_tags($this->exam_pdf_link));
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':course_id', $this->course_id);
        $stmt->bindParam(':exam_name', $this->exam_name);
        $stmt->bindParam(':exam_pdf_link', $this->exam_pdf_link);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Delete exam
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
