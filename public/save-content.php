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
    echo json_encode(['success' => false, 'error' => 'Invalid JSON: ' . json_last_error_msg()]);
    exit();
}

// Define the file path - try multiple possible locations
$possiblePaths = [
    __DIR__ . '/content.json',           // Same directory as PHP file
    __DIR__ . '/../content.json',        // One level up
    $_SERVER['DOCUMENT_ROOT'] . '/content.json',  // Document root
];

$filePath = null;
foreach ($possiblePaths as $path) {
    // Check if we can write to this location
    $dir = dirname($path);
    if (is_writable($dir) || (file_exists($path) && is_writable($path))) {
        $filePath = $path;
        break;
    }
}

if (!$filePath) {
    // Log the error for debugging
    error_log("Cannot write to any of these locations: " . implode(', ', $possiblePaths));
    
    echo json_encode([
        'success' => false, 
        'error' => 'Cannot write to content.json. Check file permissions.',
        'debug' => [
            'paths_attempted' => $possiblePaths,
            'document_root' => $_SERVER['DOCUMENT_ROOT'],
            'current_dir' => __DIR__,
            'write_permission' => is_writable(__DIR__) ? 'Yes' : 'No'
        ]
    ]);
    exit();
}

// Write to content.json
$jsonOutput = json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
$result = file_put_contents($filePath, $jsonOutput);

if ($result === false) {
    echo json_encode([
        'success' => false, 
        'error' => 'Failed to write file to: ' . $filePath,
        'debug' => [
            'file_path' => $filePath,
            'is_writable' => is_writable(dirname($filePath)) ? 'Yes' : 'No'
        ]
    ]);
} else {
    echo json_encode([
        'success' => true, 
        'message' => 'Content saved successfully',
        'path' => $filePath
    ]);
}
?>