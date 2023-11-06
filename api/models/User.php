<?php

namespace Msc\Api\models;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class User
{
    private $conn;
    private $table_name = "users";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // create a new user
    public function create(array $data): array
    {
        $query = "INSERT INTO " . $this->table_name . " SET first_name=:first_name, last_name=:last_name, email=:email, password=:password, role=:role";
        $stmt = $this->conn->prepare($query);

        // Hash the password
        $hash = password_hash($data['password'], PASSWORD_BCRYPT);

        // Bind values
        $stmt->bindParam(":first_name", $data['first_name']);
        $stmt->bindParam(":last_name", $data['last_name']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":password", $hash);
        $stmt->bindParam(":role", $data['role']);

        // Execute the query
        if ($stmt->execute()) {
            return ['status' => 'success', 'message' => 'User created successfully.'];
        }

        return ['status' => 'error', 'message' => 'Failed to create user.'];
    }

    // user login
    public function login(array $data): array
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email=:email";
        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":email", $data['email']);

        // Execute the query
        $stmt->execute();

        // Get the row
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        // Check if the email exists
        if ($row) {
            // Check if the password is correct
            if (password_verify($data['password'], $row['password'])) {
                return ['status' => 'success', 'message' => 'User logged in successfully.'];
            }
        }

        return ['status' => 'error', 'message' => 'Invalid email or password.'];
    }

    // change password
    public function changePassword(array $data): array
    {
        $query = "UPDATE " . $this->table_name . " SET password=:password WHERE email=:email";
        $stmt = $this->conn->prepare($query);

        // Hash the password
        $hash = password_hash($data['password'], PASSWORD_BCRYPT);

        // Bind values
        $stmt->bindParam(":password", $hash);
        $stmt->bindParam(":email", $data['email']);

        // Execute the query
        if ($stmt->execute()) {
            // Check if any row was affected
            if ($stmt->rowCount() > 0) {
                return ['status' => 'success', 'message' => 'Password changed successfully.'];
            } else {
                return ['status' => 'error', 'message' => 'Email does not exist.'];
            }
        }

        return ['status' => 'error', 'message' => 'Failed to change password.'];
    }

    // sendPasswordResetEmail
    public function sendPasswordResetEmail(array $data): array
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email=:email";
        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":email", $data['email']);

        // Execute the query
        $stmt->execute();

        // Get the row
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        // Check if the email exists
        if ($row) {
            // Generate a random token
            $token = bin2hex(random_bytes(50));

            // Update the user's token
            $query = "UPDATE " . $this->table_name . " SET token=:token WHERE email=:email";
            $stmt = $this->conn->prepare($query);

            // Bind values
            $stmt->bindParam(":token", $token);
            $stmt->bindParam(":email", $data['email']);

            // Execute the query
            if ($stmt->execute()) {
                // Send the email
                $mail = new PHPMailer(true);

                try {
                    //Server settings
                    $mail->SMTPDebug = 0;                                       // Enable verbose debug output
                    $mail->isSMTP();                                            // Set mailer to use SMTP
                    $mail->Host = 'smtp.mailtrap.io';                     // Specify main and backup SMTP servers
                    $mail->SMTPAuth = true;                                   // Enable SMTP authentication
                    $mail->Username = 'e0b0c0d0e0f0g0';                        // SMTP username
                    $mail->Password = 'e0b0c0d0e0f0g0';                        // SMTP password
                    $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
                    $mail->Port = 2525;                                   // TCP port to connect to

                    //Recipients
                    $mail->setFrom('from@example.com', 'Mailer');
                    $mail->addAddress($data['email'], $row['first_name']);      // Add a recipient

                    // Content
                    $mail->isHTML(true);                                        // Set email format to HTML
                    $mail->Subject = 'Password Reset';
                    $mail->Body = 'Click <a href="http://localhost:8080/reset-password?token=' . $token . '">here</a> to reset your password.';
                    $mail->AltBody = 'Click here to reset your password: http://localhost:8080/reset-password?token=' . $token;

                    $mail->send();

                    return ['status' => 'success', 'message' => 'Password reset email sent successfully.'];
                } catch (Exception $e) {
                    return ['status' => 'error', 'message' => 'Failed to send password reset email.'];
                }
            }

            return ['status' => 'error', 'message' => 'Failed to send password reset email.'];

        } else {
            return ['status' => 'error', 'message' => 'Email does not exist.'];
        }

    }

    // update user record
    public function update(array $data): array
    {
        // SQL query to update user
        $query = "UPDATE " . $this->table_name . " SET first_name=:first_name, last_name=:last_name, email=:email, role=:role WHERE id=:id";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":first_name", $data['first_name']);
        $stmt->bindParam(":last_name", $data['last_name']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":role", $data['role']);
        $stmt->bindParam(":id", $data['id']);

        // Execute the query
        if ($stmt->execute()) {
            return ['status' => 'success', 'message' => 'User updated successfully.'];
        }

        return ['status' => 'error', 'message' => 'Failed to update user.'];
    }

    // delete user record
    public function delete(string $id): bool
    {
        // SQL query to delete user
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind the value
        $stmt->bindParam(1, $id);

        // Execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
