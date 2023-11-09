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
        try {
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

            // Execute the query and check if the user was created
            if ($stmt->execute()) {
                return ['status' => 'success', 'message' => 'User created successfully.'];
            } else {
                return ['status' => 'error', 'message' => 'Failed to create user.'];
            }
        } catch (\PDOException $e) {
            return [
                'status' => 'error',
                'message' => 'Database error: ' . $e->getMessage(),
                'code' => $e->getCode()
            ];
        }
    }

    // user login

    /**
     * @throws \Exception
     */
    public function login(array $data): array
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email=:email";
        $stmt = $this->conn->prepare($query);

        // Sanitize and bind values
        $email = htmlspecialchars(strip_tags($data['email']));
        $stmt->bindParam(":email", $email);

        // Execute the query
        $stmt->execute();

        // Get the row
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);

        // Check if the email exists
        if ($row) {
            // Check if the password is correct
            if (password_verify($data['password'], $row['password'])) {
                // Remove the password from the row before returning it
                unset($row['password']);

                // Generate a token (implementation depends on your application)
                $token = $this->generateToken($row['id']);

                // Return success status, user data and token
                return [
                    'status' => 'success',
                    'message' => 'User logged in successfully.',
                    'user' => $row,
                    'token' => $token
                ];
            }
        }

        return ['status' => 'error', 'message' => 'Invalid email or password.'];
    }

    // Stub method for token generation

    /**
     * @throws \Exception
     */
    private function generateToken($userId) {
        // Here you would generate a JWT or another form of token
        // This is just a placeholder implementation
        return base64_encode(random_bytes(64));
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
        // Check if the user with the given email exists
        $userCheckQuery = "SELECT * FROM " . $this->table_name . " WHERE email=:email";
        $userCheckStmt = $this->conn->prepare($userCheckQuery);

        // Bind the email parameter
        $userCheckStmt->bindParam(":email", $data['email']);

        // Execute the query
        if (!$userCheckStmt->execute()) {
            return ['status' => 'error', 'message' => 'An error occurred while verifying the email.'];
        }

        // Fetch the user data
        $userRow = $userCheckStmt->fetch(\PDO::FETCH_ASSOC);

        // If the user exists
        if ($userRow) {
            // Generate a random token
            $token = bin2hex(random_bytes(50));

            // Prepare the token update query
            $tokenUpdateQuery = "UPDATE " . $this->table_name . " SET token=:token WHERE email=:email";
            $tokenUpdateStmt = $this->conn->prepare($tokenUpdateQuery);

            // Bind the parameters
            $tokenUpdateStmt->bindParam(":token", $token);
            $tokenUpdateStmt->bindParam(":email", $data['email']);

            // Attempt to execute the token update query
            if (!$tokenUpdateStmt->execute()) {
                return ['status' => 'error', 'message' => 'An error occurred while updating the token.'];
            }

            // Assuming PHPMailer is autoloaded via Composer's autoloader
            $mail = new PHPMailer(true);

            try {
                // Server settings
                $mail->isSMTP();
                $mail->Host = 'admin_canva@sxs4923.uta.cloud';
                $mail->SMTPAuth = true;
                $mail->Port = 993;
                $mail->Username = 'admin_canva@sxs4923.uta.cloud';
                $mail->Password = 'uioV.FPm#3*t';

                // Recipients
                $mail->setFrom('no-reply@msc.cloud', 'Msc Programme');
                $mail->addAddress($data['email'], $userRow['first_name']); // Add a recipient

                // Content
                $mail->isHTML(true); // Set email format to HTML
                $mail->Subject = 'Password Reset';
                $mail->Body = 'Click <a href="http://localhost:5173/reset-password?token=' . $token . '&email=' . $data['email'] . '">here</a> to reset your password.';
                $mail->AltBody = 'If you’re having trouble clicking the password reset button, copy and paste the URL below into your web browser: http://localhost:8080/reset-password?token=' . $token;

                $mail->send();
                return ['status' => 'success', 'message' => 'Password reset email sent successfully.'];
            } catch (Exception $e) {
                return ['status' => 'error', 'message' => "Mailer Error: " . $mail->ErrorInfo];
            }
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

    // get all users
    public function getAll(): array
    {
        try {
            // SQL query to get all users except admin
            $query = "SELECT * FROM " . $this->table_name . " WHERE role != 'admin'";

            // Prepare the query
            $stmt = $this->conn->prepare($query);

            // Execute the query
            $stmt->execute();

            // Return the result
            return [
                'status' => 'success',
                'data' => $stmt->fetchAll(\PDO::FETCH_ASSOC)
            ];
        } catch (\PDOException $e) {
            // Return error message and code if there is a database error
            return [
                'status' => 'error',
                'message' => $e->getMessage(),
                'code' => $e->getCode()
            ];
        }
    }


    // get user by id
    public function getById(string $id): array
    {
        // SQL query to get user by id
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Bind the value
        $stmt->bindParam(1, $id);

        // Execute the query
        $stmt->execute();

        // Return the result
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
