<?php

namespace models;

class Evaluation {
    private $conn;
    private $table_name = "evaluations";

    public $id;
    public $coordinator_id;
    public $course_id;
    public $evaluation_name;
    public $evaluation_form_link;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all evaluations
    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get evaluation by course id
    public function getByCourseId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE course_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->course_id);
        $stmt->execute();
        return $stmt;
    }

    // Get evaluation by coordinator id
    public function getByCoordinatorId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE coordinator_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->coordinator_id);
        $stmt->execute();
        return $stmt;
    }

    // update evaluation
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET evaluation_name = :evaluation_name, evaluation_form_link = :evaluation_form_link WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $this->evaluation_name = htmlspecialchars(strip_tags($this->evaluation_name));
        $this->evaluation_form_link = htmlspecialchars(strip_tags($this->evaluation_form_link));
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':evaluation_name', $this->evaluation_name);
        $stmt->bindParam(':evaluation_form_link', $this->evaluation_form_link);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // delete evaluation
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $this->id = htmlspecialchars(strip_tags($this->id));
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // create evaluation
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET coordinator_id = :coordinator_id, course_id = :course_id, evaluation_name = :evaluation_name, evaluation_form_link = :evaluation_form_link";
        $stmt = $this->conn->prepare($query);
        $this->coordinator_id = htmlspecialchars(strip_tags($this->coordinator_id));
        $this->course_id = htmlspecialchars(strip_tags($this->course_id));
        $this->evaluation_name = htmlspecialchars(strip_tags($this->evaluation_name));
        $this->evaluation_form_link = htmlspecialchars(strip_tags($this->evaluation_form_link));
        $stmt->bindParam(':coordinator_id', $this->coordinator_id);
        $stmt->bindParam(':course_id', $this->course_id);
        $stmt->bindParam(':evaluation_name', $this->evaluation_name);
        $stmt->bindParam(':evaluation_form_link', $this->evaluation_form_link);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
