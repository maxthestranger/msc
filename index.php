<?php

require 'vendor/autoload.php';
use controllers\UserController;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

function handleRequest($data, $action) {
    include_once 'config/database.php';
    include_once 'models/User.php';

    $controller = new UserController();

    switch ($action) {
        case 'login':
            $response = $controller->login($data->email, $data->password);
            break;
        case 'register':
            $response = $controller->createUser($data->first_name, $data->last_name, $data->email, $data->password, $data->role);
            break;
        case 'update':
            $response = $controller->updateUser($data->id, $data->first_name, $data->last_name, $data->email, $data->password, $data->role);
            break;
        case 'delete':
            $response = $controller->deleteUser($data->id);
            break;
        default:
            $response = ['error' => 'Invalid route'];
            break;
    }

    echo json_encode($response);
}

$data = json_decode(file_get_contents("php://input"));

if (isset($uri[1])) {
    handleRequest($data, $uri[1]);
} else {
    echo json_encode(['error' => 'No route specified']);
}
