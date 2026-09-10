<?php
session_start();

// 1. Auth check (Seller Role Protected)
if (!isset($_SESSION['user_id']) || ($_SESSION['user_role'] ?? '') !== 'seller') {
    header("Location: ../login.php");
    exit();
}

// 2. Database connection include karein
require_once '../config/db.php';

$currentUserId = $_SESSION['user_id'];

// 3. Database se seller record load karein
$stmt = $conn->prepare("SELECT fullname, email, role, created_at FROM users WHERE id = ? LIMIT 1");
$stmt->bind_param("i", $currentUserId);
$stmt->execute();
$userData = $stmt->get_result()->fetch_assoc();

// 4. Variables set karein (Fallback included)
$userId        = htmlspecialchars($currentUserId);
$userName      = htmlspecialchars($userData['fullname'] ?? $_SESSION['user_name'] ?? 'Seller Partner');
$userEmail     = htmlspecialchars($userData['email'] ?? 'No email found');
$userRole      = htmlspecialchars($userData['role'] ?? $_SESSION['user_role'] ?? 'seller');
$userCreatedAt = $userData['created_at'] ?? null;

// Session sync
$_SESSION['user_name']       = $userName;
$_SESSION['user_email']      = $userEmail;
$_SESSION['user_role']       = $userRole;
$_SESSION['user_created_at'] = $userCreatedAt;

// 5. Date formatting
$formattedJoinDate = (!empty($userCreatedAt) && $userCreatedAt !== '0000-00-00 00:00:00')
    ? date("d M Y, h:i A", strtotime($userCreatedAt))
    : 'Not Available';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoCrafts - Seller Partner Dashboard</title>

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
                <p>Artisan Merchant Studio</p>
            </div>
        </div>

        <nav class="menu">
            <a href="javascript:void(0)" class="menu-item active" data-section="dashboard">
                <i class="fa-solid fa-gauge-high"></i>
                <span>Dashboard</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="products">
                <i class="fa-solid fa-boxes-stacked"></i>
                <span>Inventory</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="add-product">
                <i class="fa-solid fa-circle-plus"></i>
                <span>Add Product</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="orders">
                <i class="fa-solid fa-cart-flatbed"></i>
                <span>Customer Orders</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="payouts">
                <i class="fa-solid fa-wallet"></i>
                <span>Payouts & Revenue</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="shop-profile">
                <i class="fa-solid fa-shop"></i>
                <span>Storefront Profile</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="messages">
                <i class="fa-regular fa-comment-dots"></i>
                <span>Buyer Inquiries</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="reviews">
                <i class="fa-regular fa-star"></i>
                <span>Reviews & Ratings</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="analytics">
                <i class="fa-solid fa-chart-line"></i>
                <span>Store Analytics</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="settings">
                <i class="fa-solid fa-gear"></i>
                <span>Account Settings</span>
            </a>

            <a href="javascript:void(0)" class="menu-item" data-section="help">
                <i class="fa-regular fa-circle-question"></i>
                <span>Seller Help Desk</span>
            </a>
        </nav>

        <div class="sidebar-bottom">
            <a href="javascript:void(0)" class="menu-item logout" id="logoutBtn">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span>Sign Out</span>
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
                    <input type="text" id="searchInput" placeholder="Search products, SKU, or orders...">
                    <button id="searchBtn" type="button">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>

            <div class="top-actions">
                <button class="top-action" id="quickAddTopBtn" data-section="add-product" type="button">
                    <i class="fa-solid fa-plus"></i>
                    <span>New Item</span>
                </button>

                <button class="top-action" id="pendingOrdersTopBtn" data-section="orders" type="button">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <span>Pending</span>
                    <span class="badge" id="pendingOrdersBadge">8</span>
                </button>

                <!-- NOTIFICATION DROPDOWN WRAPPER -->
                <div class="notification-wrapper">
                    <button class="notification-btn" id="notifBtn" type="button" aria-label="Notifications">
                        <i class="fa-regular fa-bell"></i>
                        <span class="notification-dot" id="notifDot"></span>
                    </button>

                    <div class="notification-dropdown" id="notifDropdown">
                        <div class="notif-header">
                            <h4>Store Alerts</h4>
                            <a href="javascript:void(0)" id="markAllRead">Mark all read</a>
                        </div>
                        <div class="notif-body" id="notifList">
                            <div class="notif-item unread">
                                <div class="notif-icon"><i class="fa-solid fa-basket-shopping"></i></div>
                                <div class="notif-text">
                                    <p>New Order #ORD12456 received for <strong>Handwoven Basket</strong>.</p>
                                    <small>5 minutes ago</small>
                                </div>
                            </div>
                            <div class="notif-item unread">
                                <div class="notif-icon" style="background: var(--accent-color);"><i class="fa-solid fa-triangle-exclamation"></i></div>
                                <div class="notif-text">
                                    <p>Low stock warning: Bamboo Desk Organizer has only 8 items left.</p>
                                    <small>2 hours ago</small>
                                </div>
                            </div>
                        </div>
                        <div class="notif-footer">
                            <a href="javascript:void(0)" data-section="settings">Notification Preferences</a>
                        </div>
                    </div>
                </div>

                <button class="user-top profile-btn" data-section="shop-profile" type="button">
                    <div class="avatar-placeholder">
                        <i class="fa-solid fa-store"></i>
                    </div>
                    <div class="user-info">
                        <strong><?= $userName ?></strong>
                        <small>Verified Merchant</small>
                    </div>
                    <i class="fa-solid fa-chevron-down caret-icon"></i>
                </button>
            </div>
        </header>

        <!-- MAIN BODY -->
        <main class="content">

            <!-- ================= DASHBOARD ================= -->
            <section class="page-section dashboard active-section" id="dashboard">
                <div class="welcome-header">
                    <div>
                        <h2>Welcome back, <?= $userName ?> </h2>
                        <p>Track store performance, pending dispatches, and sales milestones.</p>
                    </div>
                    <select id="periodSelect" class="period-select">
                        <option value="this_month">This Month</option>
                        <option value="last_month">Last Month</option>
                        <option value="this_year">This Financial Year</option>
                    </select>
                </div>

                <!-- 4 STAT CARDS -->
                <div class="stats-overview-grid">
                    <div class="stat-card">
                        <div>
                            <p>Gross Revenue</p>
                            <h2>₹24,560</h2>
                            <small class="green-text"><i class="fa-solid fa-arrow-trend-up"></i> 18.6% <span>vs last month</span></small>
                        </div>
                        <div class="stat-icon green"><i class="fa-solid fa-indian-rupee-sign"></i></div>
                    </div>

                    <div class="stat-card">
                        <div>
                            <p>Orders Placed</p>
                            <h2>56</h2>
                            <small class="green-text"><i class="fa-solid fa-arrow-trend-up"></i> 12.4% <span>vs last month</span></small>
                        </div>
                        <div class="stat-icon orange"><i class="fa-solid fa-bag-shopping"></i></div>
                    </div>

                    <div class="stat-card">
                        <div>
                            <p>Units Sold</p>
                            <h2>112</h2>
                            <small class="green-text"><i class="fa-solid fa-arrow-trend-up"></i> 8.7% <span>eco products</span></small>
                        </div>
                        <div class="stat-icon blue"><i class="fa-solid fa-box-open"></i></div>
                    </div>

                    <div class="stat-card">
                        <div>
                            <p>Pending Dispatch</p>
                            <h2>8</h2>
                            <a href="javascript:void(0)" class="link-btn" data-section="orders">Process Dispatches &rarr;</a>
                        </div>
                        <div class="stat-icon red"><i class="fa-solid fa-truck-ramp-box"></i></div>
                    </div>
                </div>

                <div class="dashboard-layout">
                    <!-- LEFT COLUMN -->
                    <div class="dashboard-main">

                        <!-- INVENTORY PREVIEW TABLE -->
                        <div class="card">
                            <div class="card-header">
                                <h3>Active Product Inventory</h3>
                                <a href="javascript:void(0)" class="link-btn" data-section="products">Manage Inventory</a>
                            </div>

                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product Details</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Status</th>
                                            <th>Quick Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="dashboardProductTable">
                                        <tr>
                                            <td>
                                                <div class="product-inline-info">
                                                    <div class="product-icon-wrap"><i class="fa-solid fa-basket-shopping"></i></div>
                                                    <div>
                                                        <strong>Handwoven Bamboo Basket</strong>
                                                        <small>SKU: ECO-BAM-001</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>₹549</td>
                                            <td>15 units</td>
                                            <td><span class="status active">Active</span></td>
                                            <td class="action-buttons-cell">
                                                <button type="button" class="tbl-btn preview-prod-btn" title="View"><i class="fa-solid fa-eye"></i></button>
                                                <button type="button" class="tbl-btn edit-prod-btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="product-inline-info">
                                                    <div class="product-icon-wrap"><i class="fa-solid fa-bag-shopping"></i></div>
                                                    <div>
                                                        <strong>Jute Fiber Carry Tote</strong>
                                                        <small>SKU: ECO-JUT-082</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>₹399</td>
                                            <td>20 units</td>
                                            <td><span class="status active">Active</span></td>
                                            <td class="action-buttons-cell">
                                                <button type="button" class="tbl-btn preview-prod-btn" title="View"><i class="fa-solid fa-eye"></i></button>
                                                <button type="button" class="tbl-btn edit-prod-btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="product-inline-info">
                                                    <div class="product-icon-wrap"><i class="fa-solid fa-boxes-stacked"></i></div>
                                                    <div>
                                                        <strong>Desk Bamboo Organizer</strong>
                                                        <small>SKU: ECO-BAM-044</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>₹699</td>
                                            <td>8 units</td>
                                            <td><span class="status low">Low Stock</span></td>
                                            <td class="action-buttons-cell">
                                                <button type="button" class="tbl-btn preview-prod-btn" title="View"><i class="fa-solid fa-eye"></i></button>
                                                <button type="button" class="tbl-btn edit-prod-btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="product-inline-info">
                                                    <div class="product-icon-wrap"><i class="fa-solid fa-seedling"></i></div>
                                                    <div>
                                                        <strong>Handcrafted Terracotta Pot</strong>
                                                        <small>SKU: ECO-CLY-012</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>₹299</td>
                                            <td>0 units</td>
                                            <td><span class="status out">Out of Stock</span></td>
                                            <td class="action-buttons-cell">
                                                <button type="button" class="tbl-btn preview-prod-btn" title="View"><i class="fa-solid fa-eye"></i></button>
                                                <button type="button" class="tbl-btn edit-prod-btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- SALES OVERVIEW CHART -->
                        <div class="card" style="margin-top: 20px;">
                            <div class="card-header">
                                <div>
                                    <h3>Sales Velocity</h3>
                                    <h2 style="font-size: 20px; font-weight: 700; color: var(--primary-color);">₹24,560 <small style="font-size: 11px; color: var(--text-muted); font-weight: 500;">(This Month)</small></h2>
                                </div>
                                <a href="javascript:void(0)" class="link-btn" data-section="analytics">Full Analytics</a>
                            </div>
                            <div class="chart-area">
                                <div class="y-axis">
                                    <span>25K</span>
                                    <span>20K</span>
                                    <span>15K</span>
                                    <span>10K</span>
                                    <span>5K</span>
                                    <span>0</span>
                                </div>
                                <div class="chart">
                                    <svg viewBox="0 0 500 160">
                                        <line x1="0" y1="130" x2="500" y2="130" stroke="#f0f3ef"/>
                                        <line x1="0" y1="95" x2="500" y2="95" stroke="#f0f3ef"/>
                                        <line x1="0" y1="60" x2="500" y2="60" stroke="#f0f3ef"/>
                                        <line x1="0" y1="25" x2="500" y2="25" stroke="#f0f3ef"/>
                                        <polyline points="0,120 45,95 90,105 140,75 190,55 240,65 290,85 340,60 390,45 440,30 500,10" fill="none" stroke="var(--primary-color)" stroke-width="3"/>
                                        <circle cx="500" cy="10" r="5" fill="var(--primary-color)"/>
                                    </svg>
                                    <div class="months">
                                        <span>Week 1</span>
                                        <span>Week 2</span>
                                        <span>Week 3</span>
                                        <span>Week 4</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- RIGHT ASIDE -->
                    <aside class="dashboard-right">
                        <!-- MERCHANT CARD -->
                        <div class="account-card">
                            <h2>Merchant Account</h2>
                            <div class="account-user">
                                <div class="avatar-placeholder large">
                                    <i class="fa-solid fa-store"></i>
                                </div>
                                <div class="account-user-meta">
                                    <strong><?= $userName ?></strong>
                                    <p><?= $userEmail ?></p>
                                </div>
                            </div>
                            <button class="account-profile-button" data-section="shop-profile" type="button">Manage Storefront</button>
                            <div class="account-stats">
                                <div data-section="products"><i class="fa-solid fa-boxes-stacked"></i><strong>24</strong><small>Products</small></div>
                                <div data-section="orders"><i class="fa-solid fa-truck-fast"></i><strong>8</strong><small>Pending</small></div>
                                <div data-section="reviews"><i class="fa-solid fa-star"></i><strong>4.8</strong><small>Rating</small></div>
                            </div>
                        </div>

                        <!-- SELLER ACTION ITEMS -->
                        <div class="card" style="margin-bottom: 16px;">
                            <div class="card-header">
                                <h3>Merchant Checklist</h3>
                            </div>
                            <div class="todo-list-modern">
                                <div class="todo-item-card">
                                    <i class="fa-solid fa-circle-exclamation" style="color: var(--accent-color);"></i>
                                    <div>
                                        <p>8 incoming orders awaiting package slip</p>
                                        <a href="javascript:void(0)" data-section="orders">Ship Orders &rarr;</a>
                                    </div>
                                </div>
                                <div class="todo-item-card">
                                    <i class="fa-solid fa-boxes-stacked" style="color: #e74c3c;"></i>
                                    <div>
                                        <p>Terracotta Pots is completely out of stock</p>
                                        <a href="javascript:void(0)" data-section="products">Restock Inventory &rarr;</a>
                                    </div>
                                </div>
                                <div class="todo-item-card">
                                    <i class="fa-solid fa-comments" style="color: var(--primary-color);"></i>
                                    <div>
                                        <p>2 unanswered buyer questions</p>
                                        <a href="javascript:void(0)" data-section="messages">Reply Inquiries &rarr;</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- SELLER QUALITY SCORE -->
                        <div class="card">
                            <div class="card-header">
                                <h3>Store Health Metric</h3>
                            </div>
                            <div class="metric-row">
                                <div class="metric-title">
                                    <span>Dispatch SLA</span>
                                    <strong>98%</strong>
                                </div>
                                <div class="progress"><span style="width: 98%;"></span></div>
                            </div>
                            <div class="metric-row" style="margin-top: 14px;">
                                <div class="metric-title">
                                    <span>Customer Response Rate</span>
                                    <strong>96%</strong>
                                </div>
                                <div class="progress"><span style="width: 96%;"></span></div>
                            </div>
                            <div class="metric-row" style="margin-top: 14px;">
                                <div class="metric-title">
                                    <span>Eco Quality Score</span>
                                    <strong>4.8 / 5.0</strong>
                                </div>
                                <div class="progress"><span style="width: 94%;"></span></div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <!-- ================= PRODUCTS (INVENTORY) ================= -->
            <section class="page-section hidden-section" id="products">
                <div class="page-header">
                    <div>
                        <h1>Product Catalog</h1>
                        <p>Update stock, revise wholesale/retail rates, or remove craft listings.</p>
                    </div>
                    <button class="green-btn" data-section="add-product" type="button">
                        <i class="fa-solid fa-plus"></i> Add New Product
                    </button>
                </div>

                <div class="card">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item Title</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Visibility</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="inventoryTable">
                                <tr>
                                    <td>
                                        <div class="product-inline-info">
                                            <div class="product-icon-wrap"><i class="fa-solid fa-basket-shopping"></i></div>
                                            <div>
                                                <strong>Handwoven Bamboo Basket</strong>
                                                <small>ID: #EC-101</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Bamboo & Cane</td>
                                    <td>₹549</td>
                                    <td>15</td>
                                    <td><span class="status active">Active</span></td>
                                    <td class="action-buttons-cell">
                                        <button type="button" class="tbl-btn preview-prod-btn"><i class="fa-solid fa-eye"></i></button>
                                        <button type="button" class="tbl-btn edit-prod-btn"><i class="fa-solid fa-pen"></i></button>
                                        <button type="button" class="tbl-btn delete-prod-btn" style="color:#e74c3c;"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="product-inline-info">
                                            <div class="product-icon-wrap"><i class="fa-solid fa-bag-shopping"></i></div>
                                            <div>
                                                <strong>Jute Tote Bag</strong>
                                                <small>ID: #EC-102</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Jute & Natural Fiber</td>
                                    <td>₹399</td>
                                    <td>20</td>
                                    <td><span class="status active">Active</span></td>
                                    <td class="action-buttons-cell">
                                        <button type="button" class="tbl-btn preview-prod-btn"><i class="fa-solid fa-eye"></i></button>
                                        <button type="button" class="tbl-btn edit-prod-btn"><i class="fa-solid fa-pen"></i></button>
                                        <button type="button" class="tbl-btn delete-prod-btn" style="color:#e74c3c;"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <!-- ================= ADD NEW PRODUCT ================= -->
            <section class="page-section hidden-section" id="add-product">
                <div class="page-header">
                    <div>
                        <h1>List New Craft Product</h1>
                        <p>Ensure genuine biodegradable, hand-crafted, or natural composition disclosure.</p>
                    </div>
                </div>

                <div class="card" style="padding: 24px;">
                    <form id="productForm">
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Product Name *</label>
                                <input type="text" id="productName" name="product_name" placeholder="e.g., Terracotta Tea Cups (Set of 4)" required>
                            </div>

                            <div class="form-group">
                                <label>Craft Category *</label>
                                <select id="productCategory" name="product_category" required>
                                    <option value="Clay & Soil">Clay & Soil / Terracotta</option>
                                    <option value="Bamboo">Bamboo & Cane</option>
                                    <option value="Jute">Jute & Organic Hemp</option>
                                    <option value="Reclaimed Wood">Reclaimed Wood</option>
                                    <option value="Handwoven Grass">Handwoven Sabai Grass</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Selling Price (₹ INR) *</label>
                                <input type="number" id="productPrice" name="product_price" placeholder="499" min="1" step="1" required>
                            </div>

                            <div class="form-group">
                                <label>Available Stock Quantity *</label>
                                <input type="number" id="productStock" name="product_stock" placeholder="25" min="0" required>
                            </div>
                        </div>

                        <div class="form-group" style="margin-top: 15px;">
                            <label>Artisan Story & Materials Description *</label>
                            <textarea id="productDescription" name="product_description" rows="4" placeholder="Explain the rural origin, crafting techniques, and 100% biodegradable ingredients..." required></textarea>
                        </div>

                        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
                            <button type="reset" class="cancel-btn">Clear</button>
                            <button type="submit" class="green-btn" id="saveProductBtn">
                                <i class="fa-solid fa-cloud-arrow-up"></i> Publish Listing
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <!-- ================= ORDERS ================= -->
            <section class="page-section hidden-section" id="orders">
                <div class="page-header">
                    <div>
                        <h1>Merchant Order Management</h1>
                        <p>Generate packaging invoices and submit courier consignment tracking numbers.</p>
                    </div>
                </div>

                <div class="card">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order Reference</th>
                                    <th>Customer</th>
                                    <th>Purchased Goods</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="sellerOrdersTable">
                                <tr>
                                    <td><strong>#ORD12456</strong><br><small class="text-muted">25 May 2026</small></td>
                                    <td>Riya Sharma<br><small>riya@example.com</small></td>
                                    <td>Handwoven Basket (x1)</td>
                                    <td><strong>₹549</strong></td>
                                    <td><span class="status low">Pending</span></td>
                                    <td>
                                        <button class="green-btn ship-order-btn" data-order="ORD12456" style="padding: 6px 12px; font-size: 12px;">Dispatch</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>#ORD12455</strong><br><small class="text-muted">24 May 2026</small></td>
                                    <td>Amit Verma<br><small>amit@example.com</small></td>
                                    <td>Jute Tote Bag (x2)</td>
                                    <td><strong>₹798</strong></td>
                                    <td><span class="status active">Shipped</span></td>
                                    <td>
                                        <button class="cancel-btn view-order-btn" data-order="ORD12455" style="padding: 6px 12px; font-size: 12px;">Receipt</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <!-- ================= PAYOUTS & REVENUE ================= -->
            <section class="page-section hidden-section" id="payouts">
                <div class="page-header">
                    <div>
                        <h1>Earnings & Bank Settlements</h1>
                        <p>Direct bank transfers powered by automated merchant disbursement gateways.</p>
                    </div>
                </div>

                <div class="dashboard-layout">
                    <div class="card" style="padding: 24px;">
                        <h3 style="margin-bottom: 6px;">Available Unencumbered Balance</h3>
                        <h1 style="font-size: 32px; font-weight: 700; color: var(--primary-color); margin-bottom: 12px;">₹18,450.00</h1>
                        <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 20px;">Payouts requested before Friday 12:00 PM are credited to registered bank accounts within 24 hours.</p>
                        <button class="green-btn" id="requestPayoutBtn" type="button">
                            <i class="fa-solid fa-money-bill-transfer"></i> Request Payout Transfer
                        </button>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>Past Settlement History</h3>
                        </div>
                        <div class="settlement-item">
                            <div>
                                <strong>#SETTL-9023</strong>
                                <small style="display:block; color:var(--text-muted);">NEFT to HDFC Bank ****4120</small>
                            </div>
                            <div style="text-align: right;">
                                <strong>₹5,490</strong>
                                <small class="green-text" style="display:block;">Credited</small>
                            </div>
                        </div>
                        <div class="settlement-item" style="border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 10px;">
                            <div>
                                <strong>#SETTL-8891</strong>
                                <small style="display:block; color:var(--text-muted);">NEFT to HDFC Bank ****4120</small>
                            </div>
                            <div style="text-align: right;">
                                <strong>₹12,600</strong>
                                <small class="green-text" style="display:block;">Credited</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ================= SHOP PROFILE (STOREFRONT) ================= -->
            <section class="page-section hidden-section" id="shop-profile">
                <div class="page-header">
                    <div>
                        <h1>Storefront & Identity</h1>
                        <p>Manage your artisan studio public bio, credentials, and merchant security.</p>
                    </div>
                </div>

                <div class="profile-page">
                    <div class="profile-cover"></div>
                    <div class="profile-main">
                        <div class="avatar-placeholder giant" id="profileAvatarLetter">
                            <?= strtoupper(substr(trim($userName ?: 'S'), 0, 1)) ?>
                        </div>
                        <div class="profile-name">
                            <h2 id="displayProfileName"><?= htmlspecialchars($userName) ?></h2>
                            <p>Certified Artisan Workshop &bull; Role: <?= ucfirst($userRole) ?></p>
                        </div>
                        <div style="display: flex; gap: 10px; margin-left: auto;">
                            <button class="green-btn" id="profileActionBtn" type="button">
                                <i class="fa-solid fa-pen-to-square"></i> <span id="profileBtnText">Edit Studio</span>
                            </button>
                            <button class="green-btn" id="togglePasswordBtn" type="button" style="background-color: #2c3e50;">
                                <i class="fa-solid fa-key"></i> <span id="pwdBtnText">Security</span>
                            </button>
                        </div>
                    </div>

                    <form id="profileForm" class="profile-form">
                        <div class="form-group">
                            <label>Merchant ID</label>
                            <input type="text" id="profileUserId" value="<?= $userId ?>" readonly class="input-disabled">
                        </div>
                        <div class="form-group">
                            <label>Store / Artisan Name</label>
                            <input type="text" id="profileNameInput" name="user_name" value="<?= htmlspecialchars($userName) ?>" disabled>
                        </div>
                        <div class="form-group">
                            <label>Registered Business Email</label>
                            <input type="email" id="profileEmailInput" name="user_email" value="<?= htmlspecialchars($userEmail) ?>" disabled>
                        </div>
                        <div class="form-group">
                            <label>Merchant Level</label>
                            <input type="text" value="<?= ucfirst($userRole) ?> Verified" readonly class="input-disabled">
                        </div>
                        <div class="form-group" style="grid-column: 1 / -1;">
                            <label>Member Onboarded Since</label>
                            <input type="text" value="<?= $formattedJoinDate ?>" readonly class="input-disabled">
                        </div>
                    </form>

                    <!-- INLINE CHANGE PASSWORD CARD -->
                    <div id="passwordSection" class="password-card-container" style="display: none;">
                        <div class="password-card-header">
                            <h3><i class="fa-solid fa-shield-halved"></i> Update Security Credentials</h3>
                            <p>Ensure your merchant console password contains at least 6 alphanumeric characters.</p>
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
                                <input type="password" id="confirmPassword" placeholder="Confirm new password" required>
                            </div>
                            <div class="pwd-action-btns">
                                <button type="button" id="cancelPasswordBtn" class="cancel-btn">Cancel</button>
                                <button type="submit" class="green-btn"><i class="fa-solid fa-lock"></i> Save Credentials</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <!-- ================= BUYER MESSAGES ================= -->
            <section class="page-section hidden-section" id="messages">
                <div class="page-header">
                    <div>
                        <h1>Customer Questions & Custom Orders</h1>
                        <p>Interact directly with buyers inquiring about crafts and bulk orders.</p>
                    </div>
                </div>
                <div class="chat-container">
                    <div class="chat-sidebar">
                        <div class="chat-sidebar-header">
                            <input type="text" placeholder="Search customer thread...">
                        </div>
                        <div class="chat-item active-chat">
                            <div class="avatar-placeholder small"><i class="fa-solid fa-user"></i></div>
                            <div class="chat-meta">
                                <h4>Riya Sharma</h4>
                                <p>Can you make custom clay planters?</p>
                            </div>
                            <span class="chat-time">Active</span>
                        </div>
                        <div class="chat-item">
                            <div class="avatar-placeholder small"><i class="fa-solid fa-user"></i></div>
                            <div class="chat-meta">
                                <h4>Amit Verma</h4>
                                <p>Delivered on time, thank you!</p>
                            </div>
                            <span class="chat-time">Yesterday</span>
                        </div>
                    </div>

                    <div class="chat-window">
                        <div class="chat-window-header">
                            <div class="chat-window-user">
                                <div class="avatar-placeholder small"><i class="fa-solid fa-user"></i></div>
                                <div>
                                    <h4>Riya Sharma</h4>
                                    <small><span class="online-indicator"></span> Buyer &bull; Order #ORD12456</small>
                                </div>
                            </div>
                        </div>
                        <div class="chat-messages" id="chatMessageList">
                            <div class="message incoming">
                                <div class="message-bubble">
                                    <p>Hello, do you accept bespoke size orders for bamboo laundry baskets?</p>
                                    <span class="message-time">10:15 AM</span>
                                </div>
                            </div>
                        </div>
                        <form class="chat-input-area" id="chatForm">
                            <input type="text" id="chatInput" placeholder="Type your response to buyer..." autocomplete="off">
                            <button type="submit" id="sendMessageBtn"><i class="fa-solid fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </section>

            <!-- ================= REVIEWS & RATINGS ================= -->
            <section class="page-section hidden-section" id="reviews">
                <div class="page-header">
                    <div>
                        <h1>Customer Feedback & Reviews</h1>
                        <p>Verified purchase appraisals and sustainable packaging feedback.</p>
                    </div>
                </div>
                <div class="card" style="padding: 20px;">
                    <div class="review-item" style="border-bottom: 1px solid var(--border-color); padding-bottom: 15px; margin-bottom: 15px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong>Riya Sharma <small style="color:var(--text-muted);">(Purchased: Bamboo Basket)</small></strong>
                            <span style="color:#e4ae35;">★★★★★</span>
                        </div>
                        <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">
                            "The bamboo weaving is stunning and completely authentic. Shipped entirely in corrugated paper without bubble wrap!"
                        </p>
                    </div>
                    <div class="review-item">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong>Amit Verma <small style="color:var(--text-muted);">(Purchased: Jute Tote)</small></strong>
                            <span style="color:#e4ae35;">★★★★★</span>
                        </div>
                        <p style="font-size: 13px; color: var(--text-muted); margin-top: 6px;">
                            "Strong stitches and durable natural smell. Recommended for everyday eco grocery shopping."
                        </p>
                    </div>
                </div>
            </section>

            <!-- ================= STORE ANALYTICS ================= -->
            <section class="page-section hidden-section" id="analytics">
                <div class="page-header">
                    <div>
                        <h1>Store Traffic & Analytics</h1>
                        <p>Track listing visibility, store conversions, and average order value.</p>
                    </div>
                </div>
                <div class="stats-overview-grid">
                    <div class="stat-card">
                        <div>
                            <p>Unique Store Visitors</p>
                            <h2>12,540</h2>
                            <small class="green-text">↑ 14.2% this month</small>
                        </div>
                        <div class="stat-icon green"><i class="fa-solid fa-users"></i></div>
                    </div>
                    <div class="stat-card">
                        <div>
                            <p>Checkout Conversion</p>
                            <h2>4.8%</h2>
                            <small class="green-text">↑ 0.6% this month</small>
                        </div>
                        <div class="stat-icon orange"><i class="fa-solid fa-cart-shopping"></i></div>
                    </div>
                    <div class="stat-card">
                        <div>
                            <p>Avg. Basket Value</p>
                            <h2>₹438.00</h2>
                            <small class="green-text">Consistent</small>
                        </div>
                        <div class="stat-icon blue"><i class="fa-solid fa-receipt"></i></div>
                    </div>
                    <div class="stat-card">
                        <div>
                            <p>Return Rate</p>
                            <h2>0.2%</h2>
                            <small class="green-text">Optimal</small>
                        </div>
                        <div class="stat-icon red"><i class="fa-solid fa-rotate-left"></i></div>
                    </div>
                </div>
            </section>

            <!-- ================= SETTINGS ================= -->
            <section class="page-section hidden-section" id="settings">
                <div class="page-header">
                    <div>
                        <h1>Merchant Console Settings</h1>
                        <p>Control SMS notifications and order alerts.</p>
                    </div>
                </div>
                <div class="settings-box">
                    <div class="setting">
                        <div>
                            <h3>Real-time Order Alerts</h3>
                            <p>Get immediate sound & browser notifications when orders are placed.</p>
                        </div>
                        <label class="switch"><input type="checkbox" checked><span></span></label>
                    </div>
                    <div class="setting">
                        <div>
                            <h3>Low Inventory SMS Warning</h3>
                            <p>Receive an alert when craft listings fall below 10 units.</p>
                        </div>
                        <label class="switch"><input type="checkbox" checked><span></span></label>
                    </div>
                </div>
            </section>

            <!-- ================= HELP & SUPPORT ================= -->
            <section class="page-section hidden-section" id="help">
                <div class="page-header">
                    <div>
                        <h1>Artisan Partner Help Desk</h1>
                        <p>Guidelines for sustainable packaging, logistics pickups, and dispute settlements.</p>
                    </div>
                </div>

                <div class="help-cards-grid">
                    <div class="help-action-card">
                        <div class="help-icon"><i class="fa-solid fa-box-open"></i></div>
                        <h3>Pickup Logistics</h3>
                        <p>Scheduled doorstep courier pick-ups for bulky bamboo and fragile terracotta crafts.</p>
                        <a href="javascript:void(0)" class="link-btn">Courier Guidelines &rarr;</a>
                    </div>
                    <div class="help-action-card">
                        <div class="help-icon"><i class="fa-solid fa-leaf"></i></div>
                        <h3>Eco Standards</h3>
                        <p>Strict non-toxic glazes, natural dyes, and 0% single-use plastic packing protocol.</p>
                        <a href="javascript:void(0)" class="link-btn">Compliance Protocol &rarr;</a>
                    </div>
                    <div class="help-action-card">
                        <div class="help-icon"><i class="fa-solid fa-headset"></i></div>
                        <h3>Merchant Concierge</h3>
                        <p>Contact dedicated seller relations manager for GST/TDS or payout inquiries.</p>
                        <a href="javascript:void(0)" class="link-btn" data-section="messages">Open Priority Ticket &rarr;</a>
                    </div>
                </div>

                <div class="faq-container">
                    <h2>Merchant FAQs</h2>
                    <div class="faq-item">
                        <button class="faq-question" type="button">When does my bank account receive order disbursements? <i class="fa-solid fa-chevron-down"></i></button>
                        <div class="faq-answer">
                            <p>Disbursements are initiated 48 hours following delivered tracking status confirmation, ensuring no returns or damage disputes are filed.</p>
                        </div>
                    </div>
                    <div class="faq-item">
                        <button class="faq-question" type="button">What if fragile terracotta crafts break during transit? <i class="fa-solid fa-chevron-down"></i></button>
                        <div class="faq-answer">
                            <p>EcoCrafts Merchant Insurance covers 100% replacement value for sellers who follow our certified corrugated honeycomb packing standards.</p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    </div>

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

    <script src="script.js?v=<?= time() ?>"></script>
</body>

</html>