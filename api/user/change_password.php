<?php
session_start();
header('Content-Type: application/json');

require_once '../../config/db.php';

$input = json_decode(file_get_contents('php://input'), true);

$id              = $input['id'] ?? null;
$currentPassword = $input['current_password'] ?? '';
$newPassword     = $input['new_password'] ?? '';

if (!$id || empty($currentPassword) || empty($newPassword)) {
    echo json_encode(['status' => 'error', 'message' => 'All password fields are required.']);
    exit;
}

// 1. Fetch current password hash
$stmt = $conn->prepare("SELECT password FROM users WHERE id = ? LIMIT 1");
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'User not found.']);
    exit;
}

$user = $res->fetch_assoc();

// 2. Verify current password
if (!password_verify($currentPassword, $user['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Current password is incorrect.']);
    exit;
}

// 3. Hash new password and update
$newHashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
$updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
$updateStmt->bind_param("si", $newHashedPassword, $id);

if ($updateStmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Password changed successfully!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update password in database.']);
}