<?php

require_once __DIR__ . '/vendor/autoload.php';

use Msc\Api\controllers\CourseController;
use Msc\Api\controllers\UserController;
use Msc\Api\middleware\AuthMiddleware;
use Msc\Api\models\Course;
use Msc\Api\models\User;
use Msc\Api\config\Database;
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

// root
$router->route('', 'GET', function() {
    echo json_encode(['status' => 'success', 'message' => 'Welcome to the API.']);
});

// authentication
$router->route('api/login', 'POST', [new UserController($userModel), 'login']);
$router->route('api/user/create', 'POST', [new UserController($userModel), 'createUser', AuthMiddleware::class]);
$router->route('api/user/change-password', 'POST', [new UserController($userModel), 'changePassword', AuthMiddleware::class]);

// users
$router->route('api/user/update', 'PUT', [new UserController($userModel), 'updateUser']);
$router->route('api/user/delete', 'DELETE', [new UserController($userModel), 'deleteUser']);

// Courses
$router->route('api/course/create', 'POST', [new CourseController($courseModel), 'createCourse']);
$router->route('api/course/update', 'PUT', [new CourseController($courseModel), 'updateCourse']);
$router->route('api/course/delete', 'DELETE', [new CourseController($courseModel), 'deleteCourse']);
$router->route('api/course/get', 'GET', [new CourseController($courseModel), 'getCourse']);

$router->resolve();
