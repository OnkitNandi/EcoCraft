<?php
session_start();

// 1. Auth check
if (!isset($_SESSION['user_id']) || ($_SESSION['user_role'] ?? '') !== 'user') {
    header("Location: ../login.php");
    exit();
}

// 2. Database Connection include karein
// (Agar file ka naam db.php hai toh db.php, agar db_connection.php hai toh wo likhein)
require_once '../config/db.php';

$currentUserId = $_SESSION['user_id'];

// 3. Database se direct live record fetch karein (Email & Created_at guaranteed load hoga)
$stmt = $conn->prepare("SELECT fullname, email, role, created_at FROM users WHERE id = ? LIMIT 1");
$stmt->bind_param("i", $currentUserId);
$stmt->execute();
$userData = $stmt->get_result()->fetch_assoc();

// 4. Variables set karein
$userId        = htmlspecialchars($currentUserId);
$userName      = htmlspecialchars($userData['fullname'] ?? $_SESSION['user_name'] ?? 'User');
$userEmail     = htmlspecialchars($userData['email'] ?? 'No email found');
$userRole      = htmlspecialchars($userData['role'] ?? $_SESSION['user_role'] ?? 'user');
$userCreatedAt = $userData['created_at'] ?? null;

// Session ko bhi sync update kar dein
$_SESSION['user_name']       = $userName;
$_SESSION['user_email']      = $userEmail;
$_SESSION['user_role']       = $userRole;
$_SESSION['user_created_at'] = $userCreatedAt;

// 5. Date format
$formattedJoinDate = (!empty($userCreatedAt) && $userCreatedAt !== '0000-00-00 00:00:00')
    ? date("d M Y, h:i A", strtotime($userCreatedAt))
    : 'Not Available';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoCrafts - User Dashboard</title>

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

    <!-- SIDEBAR -->
    <aside class="sidebar" id="sidebar">

        <div class="logo">
            <div class="logo-icon">
                <i class="fa-solid fa-leaf"></i>
            </div>
            <div class="logo-text">
                <h1>EcoCrafts</h1>
                <p>Handmade with Nature</p>
            </div>
        </div>

        <nav class="menu">
            <a href="javascript:void(0)" class="menu-item active" data-section="dashboard">
                <i class="fa-solid fa-house"></i>
                <span>Dashboard</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="shop">
                <i class="fa-solid fa-bag-shopping"></i>
                <span>Shop</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="categories">
                <i class="fa-solid fa-table-cells-large"></i>
                <span>Categories</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="orders">
                <i class="fa-solid fa-box"></i>
                <span>Orders</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="wishlist">
                <i class="fa-regular fa-heart"></i>
                <span>Wishlist</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="messages">
                <i class="fa-regular fa-comment"></i>
                <span>Messages</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="profile">
                <i class="fa-regular fa-user"></i>
                <span>Profile</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="addresses">
                <i class="fa-solid fa-location-dot"></i>
                <span>Addresses</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="settings">
                <i class="fa-solid fa-gear"></i>
                <span>Settings</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="help">
                <i class="fa-regular fa-circle-question"></i>
                <span>Help & Support</span>
            </a>
        </nav>

        <div class="sidebar-bottom">
            <a href="javascript:void(0)" class="menu-item logout" id="logoutBtn">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
            </a>
        </div>

    </aside>

    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <!-- MAIN CONTAINER -->
    <div class="main-container">

        <!-- TOPBAR -->
        <header class="topbar">
            <div class="topbar-left">
                <button class="mobile-toggle-btn" id="mobileToggleBtn" type="button" aria-label="Toggle Sidebar">
                    <i class="fa-solid fa-bars"></i>
                </button>

                <div class="search-container">
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                    <input type="text" id="searchInput" placeholder="Search eco products...">
                    <button id="searchBtn" type="button">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>

            <div class="top-actions">
                <button class="top-action" id="wishlistTop" data-section="wishlist" type="button">
                    <i class="fa-regular fa-heart"></i>
                    <span>Wishlist</span>
                </button>

                <button class="top-action cart-button" id="cartToggleBtn" type="button">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span>Cart</span>
                    <span class="badge" id="cartCount">0</span>
                </button>

                <!-- NOTIFICATION DROPDOWN WRAPPER -->
                <div class="notification-wrapper">
                    <button class="notification-btn" id="notifBtn" type="button" aria-label="Notifications">
                        <i class="fa-regular fa-bell"></i>
                        <span class="notification-dot" id="notifDot"></span>
                    </button>

                    <div class="notification-dropdown" id="notifDropdown">
                        <div class="notif-header">
                            <h4>Notifications</h4>
                            <a href="javascript:void(0)" id="markAllRead">Mark all read</a>
                        </div>
                        <div class="notif-body" id="notifList">
                            <div class="notif-item unread">
                                <div class="notif-icon"><i class="fa-solid fa-bag-shopping"></i></div>
                                <div class="notif-text">
                                    <p>Welcome to EcoCrafts! Start browsing eco products.</p>
                                    <small>Just now</small>
                                </div>
                            </div>
                        </div>
                        <div class="notif-footer">
                            <a href="javascript:void(0)" data-section="settings">Notification Settings</a>
                        </div>
                    </div>
                </div>

                <button class="user-top profile-btn" data-section="profile" type="button">
                    <div class="avatar-placeholder">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="user-info">
                        <strong><?= $userName ?></strong>
                        <small>Customer</small>
                    </div>
                    <i class="fa-solid fa-chevron-down caret-icon"></i>
                </button>
            </div>
        </header>

        <!-- CART SLIDE DRAWER -->
        <div class="cart-drawer-overlay" id="cartDrawerOverlay"></div>
        <aside class="cart-drawer" id="cartDrawer">
            <div class="cart-drawer-header">
                <h3><i class="fa-solid fa-cart-shopping"></i> Shopping Cart (<span id="cartItemCount">0</span>)</h3>
                <button class="cart-close-btn" id="cartCloseBtn">&times;</button>
            </div>
            <div class="cart-drawer-body" id="cartItemsContainer">
                <div class="empty-state-mini">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>Your cart is empty.</p>
                </div>
            </div>
            <div class="cart-drawer-footer">
                <div class="cart-total-row">
                    <span>Subtotal:</span>
                    <strong id="cartSubtotal">₹0.00</strong>
                </div>
                <button class="green-btn full-btn" id="checkoutBtn" type="button">Proceed to Checkout</button>
            </div>
        </aside>

        <!-- MAIN BODY -->
        <main class="content">

            <!-- DASHBOARD -->
            <section class="page-section dashboard active-section" id="dashboard">
                <div class="dashboard-layout">
                    <div class="dashboard-main">
                        <div class="hero">
                            <div class="hero-content">
                                <h2>Handmade with <span>Nature</span>,<br>Delivered with <span>Care</span></h2>
                                <p>Discover sustainable crafts made by verified rural artisans.</p>
                                <button class="shop-now" data-section="shop" type="button">
                                    Explore Store <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <div class="category-shortcuts">
                            <div class="category-shortcut" data-section="categories">
                                <i class="fa-solid fa-seedling"></i>
                                <span>Clay & Soil</span>
                            </div>
                            <div class="category-shortcut" data-section="categories">
                                <i class="fa-solid fa-spa"></i>
                                <span>Bamboo</span>
                            </div>
                            <div class="category-shortcut" data-section="categories">
                                <i class="fa-solid fa-bag-shopping"></i>
                                <span>Jute</span>
                            </div>
                            <div class="category-shortcut" data-section="categories">
                                <i class="fa-solid fa-tree"></i>
                                <span>Wooden</span>
                            </div>
                            <div class="category-shortcut" data-section="categories">
                                <i class="fa-solid fa-basket-shopping"></i>
                                <span>Handwoven</span>
                            </div>
                            <div class="category-shortcut view-all-category" data-section="categories">
                                <i class="fa-solid fa-table-cells-large"></i>
                                <span>View All</span>
                            </div>
                        </div>

                        <div class="popular-section">
                            <div class="section-heading">
                                <h2>Featured Products</h2>
                                <a href="javascript:void(0)" class="link-btn" data-section="shop">View Store</a>
                            </div>

                            <div class="products-grid">
                                <div class="empty-state-card">
                                    <i class="fa-solid fa-box-open"></i>
                                    <h3>No Products Loaded</h3>
                                    <p>Products uploaded by sellers will dynamically display here.</p>
                                </div>
                            </div>
                        </div>

                        <div class="features">
                            <div class="feature">
                                <i class="fa-solid fa-leaf"></i>
                                <div><strong>Eco Friendly</strong><small>100% Biodegradable</small></div>
                            </div>
                            <div class="feature">
                                <i class="fa-solid fa-hands"></i>
                                <div><strong>Artisan Made</strong><small>Directly from creators</small></div>
                            </div>
                            <div class="feature">
                                <i class="fa-solid fa-shield-halved"></i>
                                <div><strong>Secure Payment</strong><small>Safe Checkout</small></div>
                            </div>
                            <div class="feature">
                                <i class="fa-solid fa-truck-fast"></i>
                                <div><strong>Fast Delivery</strong><small>Trackable courier</small></div>
                            </div>
                        </div>
                    </div>

                    <aside class="dashboard-right">
                        <div class="account-card">
                            <h2>My Account</h2>
                            <div class="account-user">
                                <div class="avatar-placeholder large">
                                    <i class="fa-solid fa-user"></i>
                                </div>
                                <div class="account-user-meta">
                                    <strong><?= $userName ?></strong>
                                    <p><?= $userEmail ?></p>
                                </div>
                            </div>
                            <button class="account-profile-button" data-section="profile" type="button">Manage Profile</button>
                            <div class="account-stats">
                                <div data-section="orders"><i class="fa-solid fa-box"></i><strong>0</strong><small>Orders</small></div>
                                <div data-section="wishlist"><i class="fa-regular fa-heart"></i><strong>0</strong><small>Wishlist</small></div>
                                <div data-section="addresses"><i class="fa-solid fa-location-dot"></i><strong>0</strong><small>Addresses</small></div>
                            </div>
                        </div>

                        <div class="recent-orders">
                            <div class="section-heading">
                                <h2>Recent Orders</h2>
                                <a href="javascript:void(0)" class="link-btn" data-section="orders">View All</a>
                            </div>
                            <div class="empty-state-mini">
                                <i class="fa-solid fa-receipt"></i>
                                <p>No recent orders found.</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <!-- SHOP -->
            <section class="page-section hidden-section" id="shop">
                <div class="page-header">
                    <div>
                        <h1>Eco Shop</h1>
                        <p>Browse genuine handmade & sustainable crafts.</p>
                    </div>
                    <button class="green-btn" type="button"><i class="fa-solid fa-filter"></i> Filter</button>
                </div>
                <div class="shop-grid">
                    <div class="empty-state-card">
                        <i class="fa-solid fa-store"></i>
                        <h3>Store Catalog is Empty</h3>
                        <p>Uploaded inventory will appear here.</p>
                    </div>
                </div>
            </section>

            <!-- CATEGORIES -->
            <section class="page-section hidden-section" id="categories">
                <div class="page-header">
                    <div>
                        <h1>Categories</h1>
                        <p>Sort products by sustainable raw material.</p>
                    </div>
                </div>
                <div class="category-page-grid">
                    <div class="category-box">
                        <div class="cat-icon-wrap"><i class="fa-solid fa-seedling"></i></div>
                        <h2>Clay & Terracotta</h2>
                        <p>Natural earthy kitchenware, planters and pottery</p>
                        <span class="cat-badge">24 Items</span>
                    </div>
                    <div class="category-box">
                        <div class="cat-icon-wrap"><i class="fa-solid fa-spa"></i></div>
                        <h2>Bamboo Craft</h2>
                        <p>Durable desks, handmade baskets & eco decor</p>
                        <span class="cat-badge">18 Items</span>
                    </div>
                    <div class="category-box">
                        <div class="cat-icon-wrap"><i class="fa-solid fa-bag-shopping"></i></div>
                        <h2>Jute & Fibers</h2>
                        <p>Eco pouches, shopping totes, mats, and bags</p>
                        <span class="cat-badge">32 Items</span>
                    </div>
                    <div class="category-box">
                        <div class="cat-icon-wrap"><i class="fa-solid fa-tree"></i></div>
                        <h2>Reclaimed Wood</h2>
                        <p>Hand-carved utility spoons, racks and centerpieces</p>
                        <span class="cat-badge">15 Items</span>
                    </div>
                    <div class="category-box">
                        <div class="cat-icon-wrap"><i class="fa-solid fa-basket-shopping"></i></div>
                        <h2>Handwoven Grass</h2>
                        <p>Traditional moonj and sabai grass baskets</p>
                        <span class="cat-badge">12 Items</span>
                    </div>
                    <div class="category-box">
                        <div class="cat-icon-wrap"><i class="fa-solid fa-shirt"></i></div>
                        <h2>Organic Cotton</h2>
                        <p>Naturally dyed clothing, napkins and accessories</p>
                        <span class="cat-badge">20 Items</span>
                    </div>
                </div>
            </section>

            <!-- ORDERS -->
            <section class="page-section hidden-section" id="orders">
                <div class="page-header">
                    <div>
                        <h1>Order History</h1>
                        <p>Track your dispatches and past shipments.</p>
                    </div>
                </div>
                <div class="empty-state-card">
                    <i class="fa-solid fa-box-archive"></i>
                    <h3>You haven't ordered yet</h3>
                    <p>When you purchase something, order tracks show up here.</p>
                </div>
            </section>

            <!-- WISHLIST -->
            <section class="page-section hidden-section" id="wishlist">
                <div class="page-header">
                    <div>
                        <h1>My Wishlist</h1>
                        <p>Items saved for future orders.</p>
                    </div>
                </div>
                <div class="empty-state-card">
                    <i class="fa-regular fa-heart"></i>
                    <h3>Your Wishlist is empty</h3>
                    <p>Items saved will display here.</p>
                </div>
            </section>

            <!-- MESSAGES -->
            <section class="page-section hidden-section" id="messages">
                <div class="page-header">
                    <div>
                        <h1>Support Chats</h1>
                        <p>Direct communication with sellers & platform admins.</p>
                    </div>
                </div>
                <div class="chat-container">
                    <div class="chat-sidebar">
                        <div class="chat-sidebar-header">
                            <input type="text" placeholder="Search conversations...">
                        </div>
                        <div class="chat-item active-chat">
                            <div class="avatar-placeholder small"><i class="fa-solid fa-headset"></i></div>
                            <div class="chat-meta">
                                <h4>EcoCrafts Support</h4>
                                <p>How can we assist you today?</p>
                            </div>
                            <span class="chat-time">Online</span>
                        </div>
                    </div>
                    <div class="chat-window">
                        <div class="chat-window-header">
                            <div class="chat-window-user">
                                <div class="avatar-placeholder small"><i class="fa-solid fa-headset"></i></div>
                                <div>
                                    <h4>EcoCrafts Support</h4>
                                    <small><span class="online-indicator"></span> Verified Assistant</small>
                                </div>
                            </div>
                        </div>
                        <div class="chat-messages" id="chatMessageList">
                            <div class="message incoming">
                                <div class="message-bubble">
                                    <p>Hello <?= $userName ?>! Welcome to EcoCrafts. How can we help you today?</p>
                                    <span class="message-time">10:00 AM</span>
                                </div>
                            </div>
                        </div>
                        <form class="chat-input-area" id="chatForm">
                            <input type="text" id="chatInput" placeholder="Type your message here..." autocomplete="off">
                            <button type="submit" id="sendMessageBtn"><i class="fa-solid fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </section>

            <!-- PROFILE SECTION -->
            <section class="page-section hidden-section" id="profile">
                <div class="page-header">
                    <div>
                        <h1>My Profile</h1>
                        <p>Manage your account identity, contact details, and security.</p>
                    </div>
                </div>
                <div class="profile-page">
                    <div class="profile-cover"></div>
                    <div class="profile-main">
                        <!-- First Letter Avatar -->
                        <div class="avatar-placeholder giant" id="profileAvatarLetter">
                            <?= strtoupper(substr(trim($userName ?: 'U'), 0, 1)) ?>
                        </div>
                        <div class="profile-name">
                            <h2 id="displayProfileName"><?= htmlspecialchars($userName) ?></h2>
                            <p>Role: <?= ucfirst($userRole) ?></p>
                        </div>

                        <div style="display: flex; gap: 10px; margin-left: auto;">
                            <button class="green-btn" id="profileActionBtn" type="button">
                                <i class="fa-solid fa-pen-to-square"></i> <span id="profileBtnText">Edit Profile</span>
                            </button>
                            <button class="green-btn" id="togglePasswordBtn" type="button" style="background-color: #2c3e50;">
                                <i class="fa-solid fa-key"></i> <span id="pwdBtnText">Change Password</span>
                            </button>
                        </div>
                    </div>

                    <!-- PROFILE DETAILS FORM -->
                    <form id="profileForm" class="profile-form">
                        <div class="form-group">
                            <label>User ID</label>
                            <input type="text" id="profileUserId" value="<?= $userId ?>" readonly class="input-disabled">
                        </div>
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="profileNameInput" name="user_name" value="<?= htmlspecialchars($userName) ?>" disabled>
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="profileEmailInput" name="user_email" value="<?= htmlspecialchars($userEmail) ?>" disabled>
                        </div>
                        <div class="form-group">
                            <label>Registered Role</label>
                            <input type="text" value="<?= ucfirst($userRole) ?>" readonly class="input-disabled">
                        </div>
                        <div class="form-group">
                            <label>Member Since (Joined Date)</label>
                            <input type="text" value="<?= $formattedJoinDate ?>" readonly class="input-disabled">
                        </div>
                    </form>

                    <!-- INLINE CHANGE PASSWORD CARD (Collapsed by default) -->
                    <div id="passwordSection" class="password-card-container" style="display: none;">
                        <div class="password-card-header">
                            <h3><i class="fa-solid fa-shield-halved"></i> Update Security Password</h3>
                            <p>Ensure your account uses a strong password of at least 6 characters.</p>
                        </div>
                        <form id="changePasswordForm" class="password-form-grid">
                            <div class="form-group">
                                <label>Current Password</label>
                                <input type="password" id="currentPassword" placeholder="Enter current password" required>
                            </div>
                            <div class="form-group">
                                <label>New Password</label>
                                <input type="password" id="newPassword" placeholder="Minimum 6 characters" required>
                            </div>
                            <div class="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" id="confirmPassword" placeholder="Re-type new password" required>
                            </div>
                            <div class="pwd-action-btns">
                                <button type="button" id="cancelPasswordBtn" class="cancel-btn">Cancel</button>
                                <button type="submit" class="green-btn"><i class="fa-solid fa-lock"></i> Save New Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <!-- ADDRESSES -->
            <section class="page-section hidden-section" id="addresses">
                <div class="page-header">
                    <div>
                        <h1>Shipping Addresses</h1>
                        <p>Saved locations for rapid checkout.</p>
                    </div>
                    <button class="green-btn" type="button"><i class="fa-solid fa-plus"></i> Add Address</button>
                </div>
                <div class="empty-state-card">
                    <i class="fa-solid fa-location-arrow"></i>
                    <h3>No Saved Addresses</h3>
                    <p>Add your home or office address to proceed with shipping.</p>
                </div>
            </section>

            <!-- SETTINGS -->
            <section class="page-section hidden-section" id="settings">
                <div class="page-header">
                    <div>
                        <h1>Account Settings</h1>
                        <p>Manage notifications and security preferences.</p>
                    </div>
                </div>
                <div class="settings-box">
                    <div class="setting">
                        <div>
                            <h3>Order Notifications</h3>
                            <p>SMS and Email updates regarding shipment.</p>
                        </div>
                        <label class="switch"><input type="checkbox" checked><span></span></label>
                    </div>
                    <div class="setting">
                        <div>
                            <h3>Dark Mode</h3>
                            <p>Adjust visual display tone.</p>
                        </div>
                        <label class="switch"><input type="checkbox" id="darkMode"><span></span></label>
                    </div>
                </div>
            </section>

            <!-- HELP & SUPPORT -->
            <section class="page-section hidden-section" id="help">
                <div class="page-header">
                    <div>
                        <h1>Help & Support Center</h1>
                        <p>Find answers to common questions or reach out to our team.</p>
                    </div>
                </div>

                <div class="help-cards-grid">
                    <div class="help-action-card">
                        <div class="help-icon"><i class="fa-solid fa-box-open"></i></div>
                        <h3>Order & Shipping</h3>
                        <p>Track packages, estimate delivery times and artisan packing methods.</p>
                        <a href="javascript:void(0)" class="link-btn" data-section="orders">Track Orders &rarr;</a>
                    </div>
                    <div class="help-action-card">
                        <div class="help-icon"><i class="fa-solid fa-rotate-left"></i></div>
                        <h3>Returns & Refunds</h3>
                        <p>Check replacement policies on delicate clay and hand-carved wood items.</p>
                        <a href="javascript:void(0)" class="link-btn">Return Policy &rarr;</a>
                    </div>
                    <div class="help-action-card">
                        <div class="help-icon"><i class="fa-solid fa-comments"></i></div>
                        <h3>Direct Chat</h3>
                        <p>Talk directly with our support team or artisan seller representatives.</p>
                        <a href="javascript:void(0)" class="link-btn" data-section="messages">Start Chat &rarr;</a>
                    </div>
                </div>

                <div class="faq-container">
                    <h2>Frequently Asked Questions</h2>
                    <div class="faq-item">
                        <button class="faq-question">How are EcoCrafts items packaged for shipping? <i class="fa-solid fa-chevron-down"></i></button>
                        <div class="faq-answer">
                            <p>All crafts are hand-packed using 100% biodegradable materials like corrugated shreds and recycled paper, avoiding single-use plastics.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question">Are the products truly handmade by rural artisans? <i class="fa-solid fa-chevron-down"></i></button>
                        <div class="faq-answer">
                            <p>Yes, every product is vetted and directly sourced from registered rural craft cooperatives and individual artisans.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question">What is the policy on damaged items? <i class="fa-solid fa-chevron-down"></i></button>
                        <div class="faq-answer">
                            <p>If an item arrives damaged due to transit, you can file a refund or replacement request with photo proof within 48 hours.</p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    </div>

    <!-- SweetAlert2 (JS via official bundle) -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.8/dist/sweetalert2.all.min.js"></script>

    <!-- Trigger PHP Session Sweetalert -->
    <?php if (isset($_SESSION['alert'])): ?>
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                <?= $_SESSION['alert'] ?>
            });
        </script>
        <?php unset($_SESSION['alert']); ?>
    <?php endif; ?>

    <script src="script.js?v=<?= time() ?>"></script>
</body>

</html>