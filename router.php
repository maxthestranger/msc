<?php

// If the file exists, serve it directly
if (file_exists(__DIR__ . '/' . $_SERVER['REQUEST_URI'])) {
    return false;
}

// Otherwise, route all requests to index.php
require __DIR__ . '/index.php';
