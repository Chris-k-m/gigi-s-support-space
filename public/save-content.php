<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Only POST allowed']);
    exit();
}

// Optional security: check query param
$key = $_GET['key'] ?? '';
if ($key !== 'admin123') {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit();
}

$data = file_get_contents('php://input');

if (!$data) {
    echo json_encode(['success' => false, 'error' => 'No data received']);
    exit();
}

// Validate JSON
$decoded = json_decode($data);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit();
}

// Write to content.json (same directory)
$result = file_put_contents(__DIR__ . '/content.json', json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($result === false) {
    echo json_encode(['success' => false, 'error' => 'Failed to write file']);
} else {
    echo json_encode(['success' => true, 'message' => 'Content saved successfully']);
}
?>
