<?php

namespace models;

class QARecommendation {
    private $conn;
    private $table_name = "qa_recommendations";

    public $id;
    public $course_id;
    public $qa_officer_id;
    public $status;
    public $recommendation;

    public function __construct($db) {
        $this->conn = $db;
    }

    // get recommendations by course id
    public function getByCourseId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE course_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->course_id);
        $stmt->execute();
        return $stmt;
    }

    // get recommendations by qa officer id
    public function getByQaOfficerId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE qa_officer_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->qa_officer_id);
        $stmt->execute();
        return $stmt;
    }

    // create recommendation
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET course_id = :course_id, qa_officer_id = :qa_officer_id, status = :status, recommendation = :recommendation";
        $stmt = $this->conn->prepare($query);
        $this->course_id = htmlspecialchars(strip_tags($this->course_id));
        $this->qa_officer_id = htmlspecialchars(strip_tags($this->qa_officer_id));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->recommendation = htmlspecialchars(strip_tags($this->recommendation));
        $stmt->bindParam(':course_id', $this->course_id);
        $stmt->bindParam(':qa_officer_id', $this->qa_officer_id);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':recommendation', $this->recommendation);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // update recommendation
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET status = :status, recommendation = :recommendation WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->recommendation = htmlspecialchars(strip_tags($this->recommendation));
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':recommendation', $this->recommendation);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // delete recommendation
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
