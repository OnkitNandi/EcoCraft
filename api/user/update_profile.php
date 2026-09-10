<?php
session_start();
header('Content-Type: application/json');

// Aapka database connection path
require_once '../../config/db.php'; 

$input = json_decode(file_get_contents('php://input'), true);

$id = $input['id'] ?? null;
$fullname = trim($input['fullname'] ?? '');
$email = trim($input['email'] ?? '');

if (!$id || empty($fullname) || empty($email)) {
    echo json_encode(['status' => 'error', 'message' => 'Required fields are missing.']);
    exit;
}

// 1. Email check: Check if email already belongs to another user
$checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND id != ? LIMIT 1");
$checkStmt->bind_param("si", $email, $id);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'This email is already in use by another account.']);
    exit;
}

// 2. Update fullname and email
$updateStmt = $conn->prepare("UPDATE users SET fullname = ?, email = ? WHERE id = ?");
$updateStmt->bind_param("ssi", $fullname, $email, $id);

if ($updateStmt->execute()) {
    // Current session update karein taaki refresh karne par purana data na dikhe
    $_SESSION['user_name']  = $fullname;
    $_SESSION['user_email'] = $email;

    echo json_encode(['status' => 'success', 'message' => 'Profile updated successfully!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Database error. Could not update profile.']);
}