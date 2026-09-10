<?php
session_start();

// 1. Auth check (Admin role check)
if (!isset($_SESSION['user_id']) || ($_SESSION['user_role'] ?? '') !== 'admin') {
    header("Location: ../login.php");
    exit();
}

// 2. Database connection
require_once '../config/db.php';

$currentUserId = $_SESSION['user_id'];

// 3. Database se admin details load karein
$stmt = $conn->prepare("SELECT fullname, email, role, created_at FROM users WHERE id = ? LIMIT 1");
$stmt->bind_param("i", $currentUserId);
$stmt->execute();
$adminData = $stmt->get_result()->fetch_assoc();

$adminId   = htmlspecialchars($currentUserId);
$adminName = htmlspecialchars($adminData['fullname'] ?? $_SESSION['user_name'] ?? 'Super Admin');
$adminEmail= htmlspecialchars($adminData['email'] ?? 'admin@ecocrafts.com');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoCrafts - Master Administration Console</title>

    <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- SweetAlert2 (CSS) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.8/dist/sweetalert2.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css?v=<?= time() ?>">
</head>

<body>

    <div class="app">

        <!-- ================= SIDEBAR ================= -->
        <aside class="sidebar">

            <div class="logo">
                <div class="logo-icon">
                    <i class="fa-solid fa-leaf"></i>
                </div>
                <div class="logo-text">
                    <h2>EcoCrafts</h2>
                    <span>Admin Control</span>
                </div>
            </div>

            <nav class="sidebar-menu">

                <button class="menu-item active" data-page="dashboard">
                    <i class="fa-solid fa-house"></i>
                    <span>Dashboard</span>
                </button>

                <button class="menu-item" data-page="users">
                    <i class="fa-solid fa-users"></i>
                    <span>Users</span>
                </button>

                <button class="menu-item" data-page="sellers">
                    <i class="fa-solid fa-store"></i>
                    <span>Sellers (KYC)</span>
                </button>

                <button class="menu-item" data-page="products">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <span>Products</span>
                </button>

                <button class="menu-item" data-page="orders">
                    <i class="fa-solid fa-calendar-check"></i>
                    <span>Orders</span>
                </button>

                <button class="menu-item" data-page="transactions">
                    <i class="fa-solid fa-wallet"></i>
                    <span>Transactions</span>
                </button>

                <button class="menu-item" data-page="reviews">
                    <i class="fa-regular fa-star"></i>
                    <span>Reviews</span>
                </button>

                <button class="menu-item" data-page="complaints">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>Complaints</span>
                </button>

                <button class="menu-item" data-page="reports">
                    <i class="fa-solid fa-chart-column"></i>
                    <span>Reports</span>
                </button>

                <button class="menu-item" data-page="analytics">
                    <i class="fa-solid fa-chart-line"></i>
                    <span>Analytics</span>
                </button>

                <button class="menu-item" data-page="coupons">
                    <i class="fa-solid fa-tag"></i>
                    <span>Coupons & Offers</span>
                </button>

                <button class="menu-item" data-page="settings">
                    <i class="fa-solid fa-gear"></i>
                    <span>System Settings</span>
                </button>

            </nav>

            <div class="sidebar-bottom">

                <button class="menu-item" data-page="help">
                    <i class="fa-regular fa-circle-question"></i>
                    <span>Help & Support</span>
                </button>

                <button class="menu-item logout-btn" id="logoutBtn">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                </button>

            </div>

        </aside>

        <!-- ================= MAIN ================= -->
        <main class="main">

            <!-- Topbar -->
            <header class="topbar">

                <div class="search-box">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" id="searchInput" placeholder="Search users, sellers, products, orders...">
                    <button id="searchBtn" type="button">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                <div class="top-right">

                    <!-- Notification -->
                    <div class="top-icon" id="adminNotifBtn">
                        <i class="fa-regular fa-bell"></i>
                        <span>5</span>
                    </div>

                    <!-- Messages -->
                    <div class="top-icon" id="adminMsgBtn">
                        <i class="fa-regular fa-envelope"></i>
                        <span>9</span>
                    </div>

                    <!-- Admin Profile Dropdown Trigger -->
                    <div class="admin-profile" id="adminProfileBtn">
                        <div class="admin-avatar-icon">
                            <i class="fa-solid fa-user-shield"></i>
                        </div>
                        <div class="admin-info">
                            <strong><?= $adminName ?></strong>
                            <small>Master Admin</small>
                        </div>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>

                </div>

            </header>

            <!-- Dynamic Injected Content Area -->
            <section id="content" class="content">
                <!-- script.js will inject dynamic screens here -->
            </section>

        </main>

    </div>

    <!-- Hidden System State Data -->
    <input type="hidden" id="adminId" value="<?= $adminId ?>">
    <input type="hidden" id="adminEmail" value="<?= $adminEmail ?>">

    <!-- SweetAlert2 (Official JS bundle) -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.8/dist/sweetalert2.all.min.js"></script>

    <!-- Trigger PHP Session Alerts -->
    <?php if (isset($_SESSION['alert'])): ?>
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                <?= $_SESSION['alert'] ?>
            });
        </script>
        <?php unset($_SESSION['alert']); ?>
    <?php endif; ?>

    <!-- JavaScript -->
    <script src="script.js?v=<?= time() ?>"></script>

</body>

</html>