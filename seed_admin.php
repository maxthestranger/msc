<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/api/config/Database.php';

use Msc\Api\config\Database;

// Instantiate your Database class
$database = new Database();
$db = $database->getConnection();

// Your admin user data
$adminData = [
    'first_name' => 'System',
    'last_name' => 'Admin',
    'email' => 'admin@msc.com',
    'password' => password_hash('password', PASSWORD_BCRYPT), // Replace 'your_secure_password' with a real password
    'role' => 'admin',
    'token' => bin2hex(random_bytes(64)),
    'email_verified' => 1
];

// SQL query to insert admin user
$sql = "INSERT INTO users (first_name, last_name, email, password, role, token, email_verified) VALUES (:first_name, :last_name, :email, :password, :role, :token, :email_verified)";

$stmt = $db->prepare($sql);

// Bind parameters
$stmt->bindParam(':first_name', $adminData['first_name']);
$stmt->bindParam(':last_name', $adminData['last_name']);
$stmt->bindParam(':email', $adminData['email']);
$stmt->bindParam(':password', $adminData['password']);
$stmt->bindParam(':role', $adminData['role']);
$stmt->bindParam(':token', $adminData['token']);
$stmt->bindParam(':email_verified', $adminData['email_verified']);

// Execute the query
try {
    $stmt->execute();
    echo "Admin user seeded successfully.\n";
} catch (PDOException $e) {
    echo "Error seeding admin user: " . $e->getMessage() . "\n";
}
