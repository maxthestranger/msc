<?php

namespace models;

class Grade {
    private $conn;
    private $table_name = "grades";

    public $id;
    public $student_id;
    public $exam_id;
    public $course_id;
    public $grade;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all grades grouped by course id
    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get grades by student id joined with exam name and course name
    public function getByStudentId() {
        $query = "SELECT grades.id, grades.student_id, grades.exam_id, grades.course_id, grades.grade, exams.exam_name, courses.course_name FROM " . $this->table_name . " INNER JOIN exams ON grades.exam_id = exams.id INNER JOIN courses ON grades.course_id = courses.id WHERE student_id = ? ORDER BY grades.id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->student_id);
        $stmt->execute();
        return $stmt;
    }

    // Get grades by exam id joined with student name and course name
    public function getByExamId() {
        $query = "SELECT grades.id, grades.student_id, grades.exam_id, grades.course_id, grades.grade, students.student_name, courses.course_name FROM " . $this->table_name . " INNER JOIN students ON grades.student_id = students.id INNER JOIN courses ON grades.course_id = courses.id WHERE exam_id = ? ORDER BY grades.id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->exam_id);
        $stmt->execute();
        return $stmt;
    }

    // Get grades by course id joined with student name and exam name
    public function getByCourseId() {
        $query = "SELECT grades.id, grades.student_id, grades.exam_id, grades.course_id, grades.grade, students.student_name, exams.exam_name FROM " . $this->table_name . " INNER JOIN students ON grades.student_id = students.id INNER JOIN exams ON grades.exam_id = exams.id WHERE course_id = ? ORDER BY grades.id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->course_id);
        $stmt->execute();
        return $stmt;
    }

    // update grade
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET grade = :grade WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $this->grade = htmlspecialchars(strip_tags($this->grade));
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':grade', $this->grade);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // delete grade
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
