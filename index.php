<?php

require_once __DIR__ . '/vendor/autoload.php';

use Msc\Api\config\Database;
use Msc\Api\controllers\CourseController;
use Msc\Api\controllers\EnrollmentController;
use Msc\Api\controllers\UserController;
use Msc\Api\middleware\AuthMiddleware;
use Msc\Api\models\Course;
use Msc\Api\models\Enrollment;
use Msc\Api\models\User;
use Msc\Api\routes\Router;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$router = new Router();
try {
    $db = (new Database())->getConnection();
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    die();
}
$userModel = new User($db);
$courseModel = new Course($db);
$enrollmentModel = new Enrollment($db);

// root
$router->route('', 'GET', function() {
    echo json_encode(['status' => 'success', 'message' => 'Welcome to the API.']);
});

// authentication
$router->route('api/login', 'POST', [new UserController($userModel), 'login']);
$router->route('api/users', 'POST', [new UserController($userModel), 'createUser', AuthMiddleware::class]);
$router->route('api/users/reset-password', 'POST', [new UserController($userModel), 'changePassword', AuthMiddleware::class]);

// users
$router->route('api/users', 'GET', [new UserController($userModel), 'getUsers']);
$router->route('api/users/:id', 'PUT', function($id) use ($userModel) {
    $controller = new UserController($userModel);
    $controller->updateUser($id);
});
$router->route('api/users/delete', 'DELETE', [new UserController($userModel), 'deleteUser']);

// Courses
$router->route('api/course/create', 'POST', [new CourseController($courseModel), 'createCourse']);
$router->route('api/course/update', 'PUT', [new CourseController($courseModel), 'updateCourse']);
$router->route('api/course/delete', 'DELETE', [new CourseController($courseModel), 'deleteCourse']);
$router->route('api/course/get', 'GET', [new CourseController($courseModel), 'getCourse']);

// Enrollments
$router->route('api/enrollment/create', 'POST', [new EnrollmentController($enrollmentModel), 'createEnrollment']);
$router->route('api/enrollment/delete', 'DELETE', [new EnrollmentController($enrollmentModel), 'deleteEnrollment']);
$router->route('api/enrollment/get-by-student-id', 'GET', [new EnrollmentController($enrollmentModel), 'getEnrollmentsByStudentId']);


$router->resolve();
