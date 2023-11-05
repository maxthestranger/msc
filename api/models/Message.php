<?php

namespace models;

class Message {
    private $conn;
    private $table_name = "messages";

    public $id;
    public $sender_id;
    public $recipient_id;
    public $message_text;

    public function __construct($db) {
        $this->conn = $db;
    }

    // create message
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET sender_id = :sender_id, recipient_id = :recipient_id, message_text = :message_text";
        $stmt = $this->conn->prepare($query);
        $this->sender_id = htmlspecialchars(strip_tags($this->sender_id));
        $this->recipient_id = htmlspecialchars(strip_tags($this->recipient_id));
        $this->message_text = htmlspecialchars(strip_tags($this->message_text));
        $stmt->bindParam(':sender_id', $this->sender_id);
        $stmt->bindParam(':recipient_id', $this->recipient_id);
        $stmt->bindParam(':message_text', $this->message_text);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // get messages by sender id
    public function getBySenderId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE sender_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->sender_id);
        $stmt->execute();
        return $stmt;
    }

    // get messages by recipient id
    public function getByRecipientId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE recipient_id = ? ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->recipient_id);
        $stmt->execute();
        return $stmt;
    }

    // delete message
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
