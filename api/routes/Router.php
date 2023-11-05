<?php

namespace Msc\Api\routes;

class Router
{
    private array $routes = [];

    public function route($uri, $method, $action)
    {
        if (!is_array($action)) {
            // If the action is not an array, it's a Closure, so wrap it in an array
            $action = [$action];
        }

        // Ensure that three elements (controller, method, middleware) are always defined
        $action = array_pad($action, 3, null);
        $this->routes[$uri][$method] = $action;
    }

    public function resolve()
    {
        $uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (array_key_exists($uri, $this->routes) && array_key_exists($requestMethod, $this->routes[$uri])) {
            [$controller, $method, $middleware] = $this->routes[$uri][$requestMethod];

            // Example user data (this would come from your authentication system)
            $userData = ['role' => 'admin']; // This should be fetched based on your auth token

            if ($middleware && is_callable([$middleware, 'isAdmin']) && !$middleware::isAdmin($userData)) {
                echo json_encode(['status' => 'error', 'message' => 'Permission denied.']);
                http_response_code(403);
                return;
            }

            if (is_callable($controller)) {
                call_user_func($controller);
            } else {
                call_user_func([$controller, $method]);
            }
        } else {
            echo json_encode(['error' => 'Route not found']);
            http_response_code(404);
        }
    }
}
