<?php

namespace Msc\Api\middleware;

class AuthMiddleware {
    public static function isAdmin($userData): bool
    {
        // validate the user's credentials and check their role
        return isset($userData['role']) && $userData['role'] === 'admin';
    }
}
