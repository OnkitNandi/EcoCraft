<?php
session_start();

// Include DB
require_once __DIR__ . '/../../config/db.php';

// Secret passkeys for special registration roles
define('ADMIN_PASSKEY', 'admin');
define('SELLER_PASSKEY', 'seller');

// =================== 1. SIGNUP LOGIC ===================
if (isset($_POST['signup_submit'])) {
    $fullname = trim($_POST['fullname'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm  = $_POST['confirm_password'] ?? '';
    $role     = trim($_POST['role'] ?? '');
    $passkey  = trim($_POST['role_passkey'] ?? '');

    if ($password !== $confirm) {
        $_SESSION['alert'] = "Swal.fire({icon: 'error', title: 'Mismatch', text: 'Passwords do not match!', confirmButtonColor: '#47663B'});";
    } elseif ($role === 'admin' && $passkey !== ADMIN_PASSKEY) {
        $_SESSION['alert'] = "Swal.fire({icon: 'error', title: 'Invalid Key', text: 'Incorrect secret passkey for Admin!', confirmButtonColor: '#47663B'});";
    } elseif ($role === 'seller' && $passkey !== SELLER_PASSKEY) {
        $_SESSION['alert'] = "Swal.fire({icon: 'error', title: 'Invalid Key', text: 'Incorrect secret passkey for Seller!', confirmButtonColor: '#47663B'});";
    } else {
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $_SESSION['alert'] = "Swal.fire({icon: 'warning', title: 'Account Exists', text: 'This email is already registered. Please login.', confirmButtonColor: '#47663B'});";
        } else {
            $hashed = password_hash($password, PASSWORD_BCRYPT);
            $insert = $conn->prepare("INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, ?)");
            $insert->bind_param("ssss", $fullname, $email, $hashed, $role);

            if ($insert->execute()) {
                $_SESSION['alert'] = "Swal.fire({icon: 'success', title: 'Welcome to EcoCrafts!', text: 'Account registered successfully. Please sign in.', confirmButtonColor: '#47663B'});";
            } else {
                $_SESSION['alert'] = "Swal.fire({icon: 'error', title: 'Error', text: 'Registration failed. Try again.', confirmButtonColor: '#47663B'});";
            }
            $insert->close();
        }
        $stmt->close();
    }

    header("Location: ../../login.php");
    exit();
}

// =================== 2. LOGIN LOGIC ===================
if (isset($_POST['login_submit'])) {
    $email    = trim($_POST['login_email'] ?? '');
    $password = $_POST['login_password'] ?? '';

    // Validation for empty inputs
    if (empty($email) || empty($password)) {
        $_SESSION['alert'] = "Swal.fire({icon: 'warning', title: 'Empty Fields', text: 'Please enter both email and password.', confirmButtonColor: '#47663B'});";
        header("Location: ../../login.php");
        exit();
    }

    // FIX: email aur created_at ko SELECT query me add kiya gaya hai
    $stmt = $conn->prepare("SELECT id, fullname, email, password, role, created_at FROM users WHERE email = ? LIMIT 1");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['password'])) {
            // Save all fields into session
            $_SESSION['user_id']         = $user['id'];
            $_SESSION['user_name']       = $user['fullname'];
            $_SESSION['user_email']      = $user['email'];
            $_SESSION['user_role']       = $user['role'];
            $_SESSION['user_created_at'] = $user['created_at'];

            $stmt->close();

            // Role-based Redirection
            if ($user['role'] === 'admin') {
                header("Location: ../../admin/index.php");
            } elseif ($user['role'] === 'seller') {
                header("Location: ../../seller/index.php");
            } else {
                header("Location: ../../user/index.php");
            }
            exit();
        } else {
            $_SESSION['alert'] = "Swal.fire({icon: 'error', title: 'Access Denied', text: 'Incorrect password entered!', confirmButtonColor: '#47663B'});";
        }
    } else {
        $_SESSION['alert'] = "Swal.fire({icon: 'error', title: 'Not Found', text: 'No account registered with this email address.', confirmButtonColor: '#47663B'});";
    }

    $stmt->close();
    header("Location: ../../login.php");
    exit();
}
