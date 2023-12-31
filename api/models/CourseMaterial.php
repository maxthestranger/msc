<?php

namespace Msc\Api\models;

class CourseMaterial {
    private $conn;
    private $table_name = "course_materials";

    public function __construct($db) {
        $this->conn = $db;
    }

    // create course material
    public function create(array $data): array {
        $query = "INSERT INTO " . $this->table_name . " SET course_id = :course_id, material_name = :material_name, material_link = :material_link";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':course_id', htmlspecialchars(strip_tags($data['course_id'])));
        $stmt->bindParam(':material_name', htmlspecialchars(strip_tags($data['material_name'])));
        $stmt->bindParam(':material_link', htmlspecialchars(strip_tags($data['material_link'])));
        if ($stmt->execute()) {
            return ['status' => 'success', 'message' => 'Course material created successfully.'];
        }
        return ['status' => 'error', 'message' => 'Failed to create course material.'];
    }

    // get course materials by course id
    public function getByCourseId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE course_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->course_id);
        $stmt->execute();
        return $stmt;
    }

    // update course material
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET material_name = :material_name, material_link = :material_link WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $this->material_name = htmlspecialchars(strip_tags($this->material_name));
        $this->material_link = htmlspecialchars(strip_tags($this->material_link));
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':material_name', $this->material_name);
        $stmt->bindParam(':material_link', $this->material_link);
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // delete course material
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
