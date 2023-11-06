<?php

namespace Msc\Api\models;

class Course {
    private $conn;
    private $table_name = "courses";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create a new course record
    public function create(array $data): array {
        try {
            $this->validateCourseData($data);

            $query = "INSERT INTO " . $this->table_name . " SET course_name=:course_name, course_description=:course_description, created_by_admin=:created_by_admin";
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(":course_name", $data['course_name']);
            $stmt->bindParam(":course_description", $data['course_description']);
            $stmt->bindParam(":created_by_admin", $data['created_by_admin']);

            if ($stmt->execute()) {
                return ['status' => 'success', 'message' => 'Course created successfully.'];
            }

            return ['status' => 'error', 'message' => 'Failed to create course.'];
        } catch (\Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    // Update a course record
    public function update(array $data): array {
        try {
            $this->validateCourseData($data);

            $query = "UPDATE " . $this->table_name . " SET course_name=:course_name, course_description=:course_description WHERE id=:id";
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(":course_name", $data['course_name']);
            $stmt->bindParam(":course_description", $data['course_description']);
            $stmt->bindParam(":id", $data['id']);

            if ($stmt->execute()) {
                return ['status' => 'success', 'message' => 'Course updated successfully.'];
            }

            return ['status' => 'error', 'message' => 'Failed to update course.'];
        } catch (\Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    // Delete a course record
    public function delete(string $id): array {
        try {
            // Validate the ID (ensure it's a positive integer)
            if (!ctype_digit($id) || $id <= 0) {
                throw new \InvalidArgumentException("Invalid course ID.");
            }

            $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $id);

            if ($stmt->execute()) {
                return ['status' => 'success', 'message' => 'Course deleted successfully.'];
            }

            return ['status' => 'error', 'message' => 'Failed to delete course.'];
        } catch (\Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    // Validate course data before insertion or update
    private function validateCourseData(array $data) {
        if (empty($data['course_name']) || empty($data['course_description'])) {
            throw new \InvalidArgumentException("Course name and description are required fields.");
        }

        if (strlen($data['course_name']) > 255) {
            throw new \InvalidArgumentException("Course name cannot be longer than 255 characters.");
        }

        if (strlen($data['course_description']) > 1000) {
            throw new \InvalidArgumentException("Course description cannot be longer than 1000 characters.");
        }

        if (!ctype_digit($data['created_by_admin']) || $data['created_by_admin'] <= 0) {
            throw new \InvalidArgumentException("Invalid admin ID.");
        }

        if (!ctype_digit($data['id']) || $data['id'] <= 0) {
            throw new \InvalidArgumentException("Invalid course ID.");
        }
    }

    // Get all courses
    public function getAll(): array {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $courses = [];
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
            $courses[] = $row;
        }

        return $courses;
    }

    public function getCourse(string $id): array {
        try {
            // Validate the ID (ensure it's a positive integer)
            if (!ctype_digit($id) || $id <= 0) {
                throw new \InvalidArgumentException("Invalid course ID.");
            }

            $query = "
                SELECT c.*, cm.* 
                FROM " . $this->table_name . " c
                LEFT JOIN course_materials cm ON c.id = cm.course_id
                WHERE c.id = ?
            ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $id);
            $stmt->execute();

            $course = null;
            $materials = [];

            while ($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                if ($course === null) {
                    // Set the course information only once
                    $course = [
                        'id' => $row['id'],
                        'course_name' => $row['course_name'],
                        'course_description' => $row['course_description'],
                        // Add other course fields as needed
                    ];
                }

                // Add course materials to the materials array
                $materials[] = [
                    'material_id' => $row['material_id'],
                    'material_name' => $row['material_name'],
                    // Add other material fields as needed
                ];
            }

            if ($course !== null) {
                $course['course_materials'] = $materials;
                return ['status' => 'success', 'data' => $course];
            }

            return ['status' => 'error', 'message' => 'Course not found.'];
        } catch (\Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }
}

