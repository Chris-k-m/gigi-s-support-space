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

// Security check
$key = $_GET['key'] ?? '';
if ($key !== 'admin123') {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit();
}

// Validate upload
if (!isset($_FILES['image'])) {
    echo json_encode(['success' => false, 'error' => 'No image file received']);
    exit();
}

$file = $_FILES['image'];

// Check for upload errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'error' => 'Upload error code: ' . $file['error']]);
    exit();
}

// Validate file type
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    echo json_encode(['success' => false, 'error' => 'Invalid file type. Allowed: JPG, PNG, WebP, GIF']);
    exit();
}

// Max file size: 5MB
$maxSize = 5 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    echo json_encode(['success' => false, 'error' => 'File too large. Maximum 5MB.']);
    exit();
}

// Create uploads directory if it doesn't exist
$uploadDir = __DIR__ . '/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Generate unique filename
$ext = match ($mimeType) {
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'image/gif' => 'gif',
    default => 'jpg',
};
$filename = uniqid('img_') . '.' . $ext;
$destination = $uploadDir . $filename;

if (move_uploaded_file($file['tmp_name'], $destination)) {
    $url = '/uploads/' . $filename;
    echo json_encode(['success' => true, 'url' => $url, 'filename' => $filename]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to save file']);
}
?>
