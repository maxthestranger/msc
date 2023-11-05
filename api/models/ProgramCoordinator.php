<?php

namespace models;

class ProgramCoordinatorRequest {
    private $conn;
    private $table_name = "program_coordinator_requests";

    public $id;
    public $course_id;
    public $request_text;
    public $coordinator_id;

    public function __construct($db) {
        $this->conn = $db;
    }

    // create request
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET course_id = :course_id, request_text = :request_text, coordinator_id = :coordinator_id";
        $stmt = $this->conn->prepare($query);
        $this->course_id = htmlspecialchars(strip_tags($this->course_id));
        $this->request_text = htmlspecialchars(strip_tags($this->request_text));
        $this->coordinator_id = htmlspecialchars(strip_tags($this->coordinator_id));
        $stmt->bindParam(':course_id', $this->course_id);
        $stmt->bindParam(':request_text', $this->request_text);
        $stmt->bindParam(':coordinator_id', $this->coordinator_id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // get requests by coordinator id
    public function getByCoordinatorId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE coordinator_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->coordinator_id);
        $stmt->execute();
        return $stmt;
    }

    // update request
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET request_text = :request_text WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $this->request_text = htmlspecialchars(strip_tags($this->request_text));
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':request_text', $this->request_text);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // delete request
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
