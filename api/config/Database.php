<?php

namespace Msc\Api\config;

class Database {

    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        $this->host = getenv('DB_HOST') ?: 'localhost';
        $this->db_name = getenv('DB_NAME') ?: 'msc';
        $this->username = getenv('DB_USER') ?: 'root';
        $this->password = getenv('DB_PASS') ?: 'password';
    }

    /**
     * @throws \Exception
     */
    public function getConnection(): \PDO
    {
        $this->conn = null;

        try {
            $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->db_name;
            $this->conn = new \PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
            $this->conn->exec('set names utf8');
        } catch (\PDOException $exception) {
            error_log('Connection error: ' . $exception->getMessage());
            throw new \Exception('Database connection error. Please check logs.');
        }

        return $this->conn;
    }
}
