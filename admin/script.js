// =====================================================
// ECOCRAFTS MASTER ADMIN ENGINE
// =====================================================

const content = document.getElementById("content");
const menuItems = document.querySelectorAll(".menu-item");

// =====================================================
// 1. DASHBOARD
// =====================================================
function loadDashboard() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1>Dashboard</h1>
                <p>Welcome back! Here's what's happening across EcoCrafts today.</p>
            </div>
            <button class="date-btn" id="periodSelectBtn">
                <i class="fa-regular fa-calendar"></i>
                This Month
                <i class="fa-solid fa-chevron-down"></i>
            </button>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-top">
                    <div>
                        <div class="stat-title">Total Users</div>
                        <div class="stat-value">2,584</div>
                    </div>
                    <div class="stat-icon"><i class="fa-solid fa-users"></i></div>
                </div>
                <div class="stat-change">↑ 12.5% from last month</div>
            </div>

            <div class="stat-card">
                <div class="stat-top">
                    <div>
                        <div class="stat-title">Total Sellers</div>
                        <div class="stat-value">356</div>
                    </div>
                    <div class="stat-icon"><i class="fa-solid fa-store"></i></div>
                </div>
                <div class="stat-change">↑ 15.8% from last month</div>
            </div>

            <div class="stat-card">
                <div class="stat-top">
                    <div>
                        <div class="stat-title">Total Orders</div>
                        <div class="stat-value">1,248</div>
                    </div>
                    <div class="stat-icon"><i class="fa-solid fa-bag-shopping"></i></div>
                </div>
                <div class="stat-change">↑ 18.2% from last month</div>
            </div>

            <div class="stat-card">
                <div class="stat-top">
                    <div>
                        <div class="stat-title">Gross Sales</div>
                        <div class="stat-value">₹12,45,680</div>
                    </div>
                    <div class="stat-icon"><i class="fa-solid fa-arrow-trend-up"></i></div>
                </div>
                <div class="stat-change">↑ 20.6% from last month</div>
            </div>

            <div class="stat-card">
                <div class="stat-top">
                    <div>
                        <div class="stat-title">Pending Claims</div>
                        <div class="stat-value">23</div>
                    </div>
                    <div class="stat-icon" style="background:#ffebee; color:var(--danger-color);"><i class="fa-solid fa-shield-halved"></i></div>
                </div>
                <div class="stat-change" style="color:var(--danger-color);">↓ 8.3% issues</div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="card">
                <div class="card-header">
                    <h3>Revenue Trajectory</h3>
                    <span class="view-all">This Month</span>
                </div>
                <div class="chart">
                    <svg viewBox="0 0 600 220">
                        <polyline class="chart-line" points="
                            20,180 70,145 120,142 170,140 220,105 270,125 320,85 370,92 420,100 470,55 520,42 560,43 590,18
                        "/>
                        <circle class="chart-dot" cx="20" cy="180" r="4"/>
                        <circle class="chart-dot" cx="70" cy="145" r="4"/>
                        <circle class="chart-dot" cx="120" cy="142" r="4"/>
                        <circle class="chart-dot" cx="170" cy="140" r="4"/>
                        <circle class="chart-dot" cx="220" cy="105" r="4"/>
                        <circle class="chart-dot" cx="270" cy="125" r="4"/>
                        <circle class="chart-dot" cx="320" cy="85" r="4"/>
                        <circle class="chart-dot" cx="370" cy="92" r="4"/>
                        <circle class="chart-dot" cx="420" cy="100" r="4"/>
                        <circle class="chart-dot" cx="470" cy="55" r="4"/>
                        <circle class="chart-dot" cx="520" cy="42" r="4"/>
                        <circle class="chart-dot" cx="560" cy="43" r="4"/>
                        <circle class="chart-dot" cx="590" cy="18" r="4"/>
                    </svg>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>Order Status Distribution</h3>
                </div>
                <div class="donut-container">
                    <div class="donut">
                        <div class="donut-inner">
                            <strong>1,248</strong>
                            <span>Total Orders</span>
                        </div>
                    </div>
                    <div class="legend">
                        <div class="legend-row">
                            <span class="legend-color green"></span>
                            Delivered 842
                        </div>
                        <div class="legend-row">
                            <span class="legend-color orange"></span>
                            Processing 256
                        </div>
                        <div class="legend-row">
                            <span class="legend-color blue"></span>
                            Shipped 98
                        </div>
                        <div class="legend-row">
                            <span class="legend-color red"></span>
                            Cancelled 52
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3>System Live Feed</h3>
                </div>
                <div class="activity">
                    <div class="activity-row">
                        <div class="activity-icon"><i class="fa-solid fa-user"></i></div>
                        <div class="activity-text">
                            <strong>New seller registered</strong>
                            <span>Kashmir Crafts Cooperative</span>
                        </div>
                        <span class="activity-time">2m ago</span>
                    </div>
                    <div class="activity-row">
                        <div class="activity-icon"><i class="fa-solid fa-box"></i></div>
                        <div class="activity-text">
                            <strong>New order #ORD12456</strong>
                            <span>₹549 &bull; Riya Sharma</span>
                        </div>
                        <span class="activity-time">10m ago</span>
                    </div>
                    <div class="activity-row">
                        <div class="activity-icon" style="background:#ffebee; color:var(--danger-color);"><i class="fa-solid fa-shield"></i></div>
                        <div class="activity-text">
                            <strong>Damage claim filed</strong>
                            <span>Terracotta Pot #ORD12410</span>
                        </div>
                        <span class="activity-time">25m ago</span>
                    </div>
                    <div class="activity-row">
                        <div class="activity-icon"><i class="fa-solid fa-user"></i></div>
                        <div class="activity-text">
                            <strong>New user signup</strong>
                            <span>Priya Sharma</span>
                        </div>
                        <span class="activity-time">35m ago</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="table-card">
            <div class="card-header">
                <h3>Recent Platform Orders</h3>
                <span class="view-all" onclick="navigateToPage('orders')">View All Orders</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ORDER ID</th>
                        <th>CUSTOMER</th>
                        <th>SELLER</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#ORD12456</td>
                        <td>Riya Sharma</td>
                        <td>EcoCrafts Creations</td>
                        <td>₹549</td>
                        <td><span class="status pending">Pending</span></td>
                        <td>25 May 2026</td>
                        <td>
                            <button class="tbl-action-btn" title="Inspect Order" onclick="viewOrderDetails('ORD12456')"><i class="fa-regular fa-eye"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>#ORD12455</td>
                        <td>Amit Verma</td>
                        <td>HandiWorks Studio</td>
                        <td>₹399</td>
                        <td><span class="status shipped">Shipped</span></td>
                        <td>24 May 2026</td>
                        <td>
                            <button class="tbl-action-btn" title="Inspect Order" onclick="viewOrderDetails('ORD12455')"><i class="fa-regular fa-eye"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>#ORD12454</td>
                        <td>Neha Kumari</td>
                        <td>Bamboo House Rural</td>
                        <td>₹699</td>
                        <td><span class="status delivered">Delivered</span></td>
                        <td>23 May 2026</td>
                        <td>
                            <button class="tbl-action-btn" title="Inspect Order" onclick="viewOrderDetails('ORD12454')"><i class="fa-regular fa-eye"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// =====================================================
// 2. DEDICATED ADMIN FEATURE MODULES
// =====================================================

// USERS MANAGEMENT
function loadUsersPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-solid fa-users" style="color:var(--primary-color); margin-right:8px;"></i> Users Management</h1>
                <p>Monitor verified buyers, manage active sessions, or restrict accounts.</p>
            </div>
            <button class="primary-btn" onclick="createUserModal()">
                <i class="fa-solid fa-user-plus"></i> Add New User
            </button>
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>USER ID</th>
                        <th>NAME & EMAIL</th>
                        <th>ROLE</th>
                        <th>ORDERS</th>
                        <th>ACCOUNT STATUS</th>
                        <th>JOINED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#USR-101</td>
                        <td><strong>Riya Sharma</strong><br><small style="color:var(--text-muted);">riya@example.com</small></td>
                        <td>Customer</td>
                        <td>12 Orders</td>
                        <td><span class="status active" id="user-status-101">Active</span></td>
                        <td>14 Jan 2026</td>
                        <td>
                            <button class="primary-btn" style="padding:4px 10px; font-size:11px; background:#e67e22;" onclick="toggleBanUser('101', 'Riya Sharma')">
                                <i class="fa-solid fa-ban"></i> Suspend
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#USR-102</td>
                        <td><strong>Amit Verma</strong><br><small style="color:var(--text-muted);">amit.v@example.com</small></td>
                        <td>Customer</td>
                        <td>5 Orders</td>
                        <td><span class="status active" id="user-status-102">Active</span></td>
                        <td>02 Feb 2026</td>
                        <td>
                            <button class="primary-btn" style="padding:4px 10px; font-size:11px; background:#e67e22;" onclick="toggleBanUser('102', 'Amit Verma')">
                                <i class="fa-solid fa-ban"></i> Suspend
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#USR-103</td>
                        <td><strong>Rohan Mehra</strong><br><small style="color:var(--text-muted);">rohan99@example.com</small></td>
                        <td>Customer</td>
                        <td>0 Orders</td>
                        <td><span class="status banned" id="user-status-103">Suspended</span></td>
                        <td>12 Mar 2026</td>
                        <td>
                            <button class="primary-btn" style="padding:4px 10px; font-size:11px; background:var(--primary-color);" onclick="toggleBanUser('103', 'Rohan Mehra')">
                                <i class="fa-solid fa-check"></i> Unban
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// SELLERS & KYC VERIFICATION
function loadSellersPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-solid fa-store" style="color:var(--primary-color); margin-right:8px;"></i> Artisan Sellers & KYC</h1>
                <p>Verify artisan cooperatives, approve shop onboarding, and check legal credentials.</p>
            </div>
            <button class="primary-btn" onclick="exportSellerReport()">
                <i class="fa-solid fa-file-excel"></i> Export Seller Registry
            </button>
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>SHOP ID</th>
                        <th>STUDIO NAME</th>
                        <th>ARTISAN LEAD</th>
                        <th>PRIMARY CRAFT</th>
                        <th>KYC DOCUMENTS</th>
                        <th>APPROVAL STATUS</th>
                        <th>DECISION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#SLR-501</td>
                        <td><strong>Kashmir Willow Studio</strong></td>
                        <td>Farooq Ahmed</td>
                        <td>Wood Carving</td>
                        <td><span class="status shipped">Govt Craft ID Attached</span></td>
                        <td><span class="status pending" id="kyc-status-501">Pending Review</span></td>
                        <td>
                            <button class="primary-btn" style="padding:4px 9px; font-size:11px;" onclick="approveSeller('501', 'Kashmir Willow Studio')">Approve</button>
                            <button class="primary-btn" style="padding:4px 9px; font-size:11px; background:var(--danger-color);" onclick="rejectSeller('501')">Reject</button>
                        </td>
                    </tr>
                    <tr>
                        <td>#SLR-498</td>
                        <td><strong>Clay Wonders Bengal</strong></td>
                        <td>Subir Pal</td>
                        <td>Terracotta Kitchenware</td>
                        <td><span class="status delivered">Aadhar & GST Verified</span></td>
                        <td><span class="status delivered" id="kyc-status-498">Verified Merchant</span></td>
                        <td>
                            <button class="primary-btn" style="padding:4px 9px; font-size:11px; background:#7d8186;" onclick="viewSellerDoc('498')">Inspect Docs</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// PRODUCTS CATALOG & QUALITY MODERATION
function loadProductsPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-solid fa-bag-shopping" style="color:var(--primary-color); margin-right:8px;"></i> Products Catalog & Quality Vetting</h1>
                <p>Review craft materials, delist non-biodegradable products, and inspect inventory.</p>
            </div>
            <button class="primary-btn" onclick="triggerQualityAudit()">
                <i class="fa-solid fa-clipboard-check"></i> Run Eco Quality Audit
            </button>
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>SKU / ID</th>
                        <th>PRODUCT NAME</th>
                        <th>SELLER</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                        <th>STOCK</th>
                        <th>ECO STATUS</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#SKU-9901</td>
                        <td><strong>Handwoven Bamboo Basket</strong></td>
                        <td>EcoCrafts Creations</td>
                        <td>Bamboo & Cane</td>
                        <td>₹549</td>
                        <td>15</td>
                        <td><span class="status delivered">100% Organic</span></td>
                        <td>
                            <button class="tbl-action-btn" title="Delist Item" style="color:var(--danger-color);" onclick="delistProduct('SKU-9901', 'Handwoven Bamboo Basket')">
                                <i class="fa-solid fa-trash-can"></i> Delist
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#SKU-8821</td>
                        <td><strong>Jute Shoulder Bag</strong></td>
                        <td>HandiWorks Studio</td>
                        <td>Jute Fibers</td>
                        <td>₹399</td>
                        <td>20</td>
                        <td><span class="status delivered">100% Organic</span></td>
                        <td>
                            <button class="tbl-action-btn" title="Delist Item" style="color:var(--danger-color);" onclick="delistProduct('SKU-8821', 'Jute Shoulder Bag')">
                                <i class="fa-solid fa-trash-can"></i> Delist
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// ORDERS LIFECYCLE
function loadOrdersPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-solid fa-calendar-check" style="color:var(--primary-color); margin-right:8px;"></i> Customer Orders Lifecycle</h1>
                <p>Real-time delivery progress, courier partner sync, and status updates.</p>
            </div>
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>ORDER REF</th>
                        <th>CUSTOMER</th>
                        <th>ITEMS</th>
                        <th>PAID AMOUNT</th>
                        <th>CURRENT STATUS</th>
                        <th>COURIER LOGISTICS</th>
                        <th>UPDATE STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>#ORD12456</strong></td>
                        <td>Riya Sharma</td>
                        <td>Bamboo Basket (x1)</td>
                        <td>₹549</td>
                        <td><span class="status pending" id="order-status-badge-12456">Pending</span></td>
                        <td>BlueDart (AWB: BD881290)</td>
                        <td>
                            <button class="primary-btn" style="padding:4px 10px; font-size:11px;" onclick="changeOrderStatus('12456')">
                                Update Stage
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>#ORD12455</strong></td>
                        <td>Amit Verma</td>
                        <td>Jute Tote Bag (x2)</td>
                        <td>₹798</td>
                        <td><span class="status shipped" id="order-status-badge-12455">Shipped</span></td>
                        <td>Delhivery (AWB: DL110022)</td>
                        <td>
                            <button class="primary-btn" style="padding:4px 10px; font-size:11px;" onclick="changeOrderStatus('12455')">
                                Update Stage
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// TRANSACTIONS & SETTLEMENTS
function loadTransactionsPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-solid fa-wallet" style="color:var(--primary-color); margin-right:8px;"></i> Financial Ledger & Gateway Payouts</h1>
                <p>Platform 10% commission accounting, seller transfers, and payment logs.</p>
            </div>
            <button class="primary-btn" onclick="exportFinancialLedger()">
                <i class="fa-solid fa-download"></i> Download Audit Statement
            </button>
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>TXN ID</th>
                        <th>ORDER ID</th>
                        <th>CUSTOMER PAID</th>
                        <th>PLATFORM CUT (10%)</th>
                        <th>SELLER PAYOUT</th>
                        <th>GATEWAY</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#TXN-99881</td>
                        <td>#ORD12456</td>
                        <td>₹549.00</td>
                        <td>₹54.90</td>
                        <td>₹494.10</td>
                        <td>Razorpay UPI</td>
                        <td><span class="status delivered">Settled</span></td>
                    </tr>
                    <tr>
                        <td>#TXN-99882</td>
                        <td>#ORD12455</td>
                        <td>₹798.00</td>
                        <td>₹79.80</td>
                        <td>₹718.20</td>
                        <td>Credit Card</td>
                        <td><span class="status delivered">Settled</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// COMPLAINTS & TRANSIT DISPUTES
function loadComplaintsPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-solid fa-shield-halved" style="color:var(--primary-color); margin-right:8px;"></i> Buyer Complaints & Disputes</h1>
                <p>Review broken crafts reported in transit, packaging disputes, and refund cases.</p>
            </div>
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>CASE ID</th>
                        <th>ORDER</th>
                        <th>COMPLAINANT</th>
                        <th>ISSUE DESCRIPTION</th>
                        <th>EVIDENCE</th>
                        <th>STATUS</th>
                        <th>RESOLUTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#CMP-202</td>
                        <td>#ORD12410</td>
                        <td>Deepak Roy</td>
                        <td>Terracotta Pot arrived cracked at base.</td>
                        <td><span class="status shipped">2 Photos Attached</span></td>
                        <td><span class="status pending" id="case-badge-202">Open Dispute</span></td>
                        <td>
                            <button class="primary-btn" style="padding:4px 9px; font-size:11px;" onclick="resolveComplaintModal('202', 'Deepak Roy', 499)">
                                Resolve Case
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// COUPONS & DISCOUNTS
function loadCouponsPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-solid fa-tag" style="color:var(--primary-color); margin-right:8px;"></i> Coupons & Promotional Codes</h1>
                <p>Issue platform discounts, seasonal markdown vouchers, and affiliate deals.</p>
            </div>
            <button class="primary-btn" onclick="createCouponModal()">
                <i class="fa-solid fa-plus"></i> Generate Coupon Code
            </button>
        </div>

        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>CODE</th>
                        <th>DISCOUNT VALUE</th>
                        <th>MINIMUM PURCHASE</th>
                        <th>USAGE LIMIT</th>
                        <th>EXPIRY</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody id="couponTableBody">
                    <tr>
                        <td><strong>ECOFIRST</strong></td>
                        <td>₹100 Flat OFF</td>
                        <td>₹499</td>
                        <td>First Order Only</td>
                        <td>31 Dec 2026</td>
                        <td><span class="status delivered">Active</span></td>
                    </tr>
                    <tr>
                        <td><strong>EARTH20</strong></td>
                        <td>20% Percentage OFF</td>
                        <td>₹999</td>
                        <td>Unlimited</td>
                        <td>15 Oct 2026</td>
                        <td><span class="status delivered">Active</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// SYSTEM SETTINGS
function loadSettingsPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-solid fa-gear" style="color:var(--primary-color); margin-right:8px;"></i> System Settings & Controls</h1>
                <p>Platform commission percentage, automatic escrow payouts, and system maintenance.</p>
            </div>
            <button class="primary-btn" onclick="savePlatformSettings()">
                <i class="fa-solid fa-floppy-disk"></i> Save Global Settings
            </button>
        </div>

        <div class="page-card" style="display:flex; flex-direction:column; gap:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:16px;">
                <div>
                    <strong>Platform Commission Rate</strong>
                    <p style="font-size:12px; color:var(--text-muted);">Current charge deducted per successful artisan sale.</p>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <input type="number" id="settingCommission" value="10" style="width:70px; padding:6px 10px; border:1px solid var(--border-color); border-radius:6px;">
                    <strong>%</strong>
                </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:16px;">
                <div>
                    <strong>Transit Insurance Mandate</strong>
                    <p style="font-size:12px; color:var(--text-muted);">Automatically apply 100% damage cover on delicate terracotta crafts.</p>
                </div>
                <label class="switch"><input type="checkbox" checked id="settingInsurance"><span></span></label>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <strong>Maintenance Mode</strong>
                    <p style="font-size:12px; color:var(--text-muted);">Temporarily disable checkout storefront for routine database maintenance.</p>
                </div>
                <label class="switch"><input type="checkbox" id="settingMaintenance"><span></span></label>
            </div>
        </div>
    `;
}

// REVIEWS MODERATION
function loadReviewsPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-regular fa-star" style="color:var(--primary-color); margin-right:8px;"></i> Product Reviews Moderation</h1>
                <p>Moderate user feedback and remove abusive or fraudulent reviews.</p>
            </div>
        </div>
        <div class="table-card">
            <table>
                <thead>
                    <tr>
                        <th>REVIEW ID</th>
                        <th>BUYER</th>
                        <th>PRODUCT</th>
                        <th>RATING</th>
                        <th>COMMENT</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#REV-301</td>
                        <td>Riya Sharma</td>
                        <td>Bamboo Basket</td>
                        <td>★★★★★ (5.0)</td>
                        <td>Stunning handcrafted quality, sustainable packaging!</td>
                        <td><button class="primary-btn" style="padding:4px 8px; font-size:11px; background:var(--danger-color);" onclick="deleteReview('REV-301')">Remove</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// REPORTS
function loadReportsPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-solid fa-chart-column" style="color:var(--primary-color); margin-right:8px;"></i> Platform Performance Reports</h1>
                <p>Generate financial and inventory compliance data logs.</p>
            </div>
        </div>
        <div class="page-card">
            <h3>Generate Comprehensive Audit Report</h3>
            <p style="font-size:12px; color:var(--text-muted); margin: 6px 0 16px 0;">Select period and export verified ledger data.</p>
            <button class="primary-btn" onclick="exportFinancialLedger()"><i class="fa-solid fa-file-pdf"></i> Download PDF Summary</button>
        </div>
    `;
}

// ANALYTICS
function loadAnalyticsPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-solid fa-chart-line" style="color:var(--primary-color); margin-right:8px;"></i> Platform Analytics</h1>
                <p>Live metrics and conversion tracking.</p>
            </div>
        </div>
        <div class="stats">
            <div class="stat-card">
                <div class="stat-title">Visitors</div>
                <div class="stat-value">54,200</div>
                <div class="stat-change">↑ 14% this month</div>
            </div>
            <div class="stat-card">
                <div class="stat-title">Conversion</div>
                <div class="stat-value">3.8%</div>
                <div class="stat-change">Consistent</div>
            </div>
        </div>
    `;
}

// HELP
function loadHelpPage() {
    content.innerHTML = `
        <div class="page-header">
            <div>
                <h1><i class="fa-regular fa-circle-question" style="color:var(--primary-color); margin-right:8px;"></i> Admin Help & Escalations</h1>
                <p>Tickets escalated directly to platform administrators.</p>
            </div>
        </div>
        <div class="page-card">
            <p>No urgent platform administrator tickets currently open.</p>
        </div>
    `;
}

// =====================================================
// 3. ROUTER / PAGE SWITCHER
// =====================================================
function navigateToPage(pageKey) {
    menuItems.forEach(menu => menu.classList.remove("active"));
    const activeBtn = document.querySelector(`.menu-item[data-page="${pageKey}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    switch (pageKey) {
        case "dashboard": loadDashboard(); break;
        case "users": loadUsersPage(); break;
        case "sellers": loadSellersPage(); break;
        case "products": loadProductsPage(); break;
        case "orders": loadOrdersPage(); break;
        case "transactions": loadTransactionsPage(); break;
        case "reviews": loadReviewsPage(); break;
        case "complaints": loadComplaintsPage(); break;
        case "reports": loadReportsPage(); break;
        case "analytics": loadAnalyticsPage(); break;
        case "coupons": loadCouponsPage(); break;
        case "settings": loadSettingsPage(); break;
        case "help": loadHelpPage(); break;
        default: loadDashboard();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
}

menuItems.forEach(item => {
    item.addEventListener("click", function () {
        const page = this.dataset.page;
        if (!page) return;
        navigateToPage(page);
    });
});

// =====================================================
// 4. REAL ACTION MODALS (SWEETALERT2 FULL SIZE)
// =====================================================

// USER CREATION MODAL
async function createUserModal() {
    const { value: formValues } = await Swal.fire({
        title: "Create Registered User Account",
        html: `
            <div style="display:flex; flex-direction:column; gap:12px; text-align:left; font-size:13px;">
                <div>
                    <label style="font-weight:600; display:block; margin-bottom:4px;">Full Name *</label>
                    <input id="swal-user-name" class="swal2-input" style="margin:0; width:100%;" placeholder="e.g. Sameer Khan">
                </div>
                <div>
                    <label style="font-weight:600; display:block; margin-bottom:4px;">Email Address *</label>
                    <input id="swal-user-email" type="email" class="swal2-input" style="margin:0; width:100%;" placeholder="sameer@example.com">
                </div>
                <div>
                    <label style="font-weight:600; display:block; margin-bottom:4px;">Account Role *</label>
                    <select id="swal-user-role" class="swal2-input" style="margin:0; width:100%;">
                        <option value="user">Customer (Buyer)</option>
                        <option value="seller">Artisan Seller</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: "#47663B",
        cancelButtonColor: "#7d8186",
        confirmButtonText: "Create Account",
        preConfirm: () => {
            const name = document.getElementById("swal-user-name").value.trim();
            const email = document.getElementById("swal-user-email").value.trim();
            const role = document.getElementById("swal-user-role").value;
            if (!name || !email) {
                Swal.showValidationMessage("Please fill in both Name and Email.");
                return false;
            }
            return { name, email, role };
        }
    });

    if (formValues) {
        Swal.fire({
            icon: "success",
            title: "User Account Provisioned",
            text: `User ${formValues.name} (${formValues.email}) successfully created.`,
            confirmButtonColor: "#47663B"
        });
    }
}

// USER SUSPEND / UNBAN
function toggleBanUser(userId, name) {
    const badge = document.getElementById(`user-status-${userId}`);
    const isSuspended = badge && badge.classList.contains("banned");

    Swal.fire({
        title: isSuspended ? `Unsuspend ${name}?` : `Suspend Account for ${name}?`,
        text: isSuspended ? "User will regain access to purchases immediately." : "User will be blocked from logging into the portal.",
        icon: isSuspended ? "question" : "warning",
        showCancelButton: true,
        confirmButtonColor: isSuspended ? "#47663B" : "#d35454",
        confirmButtonText: isSuspended ? "Yes, Unsuspend" : "Yes, Suspend Account"
    }).then((result) => {
        if (result.isConfirmed) {
            if (badge) {
                if (isSuspended) {
                    badge.className = "status active";
                    badge.innerText = "Active";
                } else {
                    badge.className = "status banned";
                    badge.innerText = "Suspended";
                }
            }
            Swal.fire({
                icon: "success",
                title: "Status Updated",
                text: `Account status for ${name} has been modified.`,
                confirmButtonColor: "#47663B"
            });
        }
    });
}

// SELLER APPROVAL
function approveSeller(id, shopName) {
    Swal.fire({
        title: `Approve KYC for ${shopName}?`,
        text: "Artisan products will be unlocked for public customer purchasing.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#47663B",
        confirmButtonText: "Approve & Grant Merchant Status"
    }).then((res) => {
        if (res.isConfirmed) {
            const badge = document.getElementById(`kyc-status-${id}`);
            if (badge) {
                badge.className = "status delivered";
                badge.innerText = "Verified Merchant";
            }
            Swal.fire({
                icon: "success",
                title: "Seller Approved",
                text: `${shopName} is now authorized on EcoCrafts.`,
                confirmButtonColor: "#47663B"
            });
        }
    });
}

function rejectSeller(id) {
    Swal.fire({
        title: "Reject KYC Submission?",
        input: "textarea",
        inputLabel: "State reason for verification rejection",
        inputPlaceholder: "e.g., Incomplete Aadhar or unclear craft certificate...",
        showCancelButton: true,
        confirmButtonColor: "#d35454",
        confirmButtonText: "Reject KYC",
        inputValidator: (val) => {
            if (!val) return "Rejection reason is required.";
        }
    }).then((res) => {
        if (res.isConfirmed) {
            const badge = document.getElementById(`kyc-status-${id}`);
            if (badge) {
                badge.className = "status out";
                badge.innerText = "KYC Rejected";
            }
            Swal.fire({
                icon: "info",
                title: "KYC Rejected",
                text: "Seller has been notified with the rejection notes.",
                confirmButtonColor: "#47663B"
            });
        }
    });
}

function viewSellerDoc(id) {
    Swal.fire({
        title: `KYC Dossier: #${id}`,
        html: `
            <div style="text-align:left; font-size:13px; line-height:1.8;">
                <p><strong>Identity Proof:</strong> Government Aadhar Verified ✓</p>
                <p><strong>Artisan Guild:</strong> Bengal Craft Federation ID #BCF-8891 ✓</p>
                <p><strong>GST/Tax ID:</strong> 19AAECP1245P1ZT (Active) ✓</p>
            </div>
        `,
        icon: "info",
        confirmButtonColor: "#47663B"
    });
}

// DELIST PRODUCT
function delistProduct(sku, name) {
    Swal.fire({
        title: `Delist ${name}?`,
        text: `Product SKU #${sku} will be hidden from search results.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d35454",
        confirmButtonText: "Delist Product"
    }).then((res) => {
        if (res.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "Product Delisted",
                text: "Item removed from public store inventory.",
                confirmButtonColor: "#47663B"
            });
        }
    });
}

// CHANGE ORDER STATUS
async function changeOrderStatus(orderId) {
    const { value: status } = await Swal.fire({
        title: `Update Order #${orderId} Lifecycle`,
        input: "select",
        inputOptions: {
            pending: "Pending Packaging",
            shipped: "Shipped (In Transit)",
            delivered: "Delivered to Customer",
            cancelled: "Cancelled & Refunded"
        },
        inputPlaceholder: "Select order stage",
        showCancelButton: true,
        confirmButtonColor: "#47663B",
        confirmButtonText: "Update Stage"
    });

    if (status) {
        const badge = document.getElementById(`order-status-badge-${orderId}`);
        if (badge) {
            badge.className = `status ${status}`;
            badge.innerText = status.charAt(0).toUpperCase() + status.slice(1);
        }
        Swal.fire({
            icon: "success",
            title: "Order Updated",
            text: `Order #${orderId} marked as ${status}.`,
            confirmButtonColor: "#47663B"
        });
    }
}

// RESOLVE COMPLAINT
async function resolveComplaintModal(caseId, customer, amount) {
    const { value: resolution } = await Swal.fire({
        title: `Resolve Dispute #${caseId}`,
        text: `Claim filed by ${customer} for damaged item (Value: ₹${amount}).`,
        input: "radio",
        inputOptions: {
            refund: "Issue Full Refund to Customer",
            replace: "Order Artisan Replacement Shipment",
            reject: "Reject Claim (Packaging was undamaged)"
        },
        inputValidator: (value) => {
            if (!value) return "Please choose an outcome!";
        },
        showCancelButton: true,
        confirmButtonColor: "#47663B",
        confirmButtonText: "Execute Decision"
    });

    if (resolution) {
        const badge = document.getElementById(`case-badge-${caseId}`);
        if (badge) {
            badge.className = "status delivered";
            badge.innerText = "Resolved (" + resolution + ")";
        }
        Swal.fire({
            icon: "success",
            title: "Dispute Executed",
            text: `Case #${caseId} settled via ${resolution}.`,
            confirmButtonColor: "#47663B"
        });
    }
}

// CREATE COUPON
async function createCouponModal() {
    const { value: couponData } = await Swal.fire({
        title: "Create Discount Coupon",
        html: `
            <div style="display:flex; flex-direction:column; gap:10px; text-align:left; font-size:13px;">
                <label><strong>Coupon Promo Code *</strong></label>
                <input id="swal-c-code" class="swal2-input" style="margin:0; width:100%; text-transform:uppercase;" placeholder="e.g. ECOSUMMER">

                <label><strong>Discount Value (₹ or %) *</strong></label>
                <input id="swal-c-val" class="swal2-input" style="margin:0; width:100%;" placeholder="e.g. 15% or 150">

                <label><strong>Minimum Order Value (₹) *</strong></label>
                <input id="swal-c-min" type="number" class="swal2-input" style="margin:0; width:100%;" placeholder="499">
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: "#47663B",
        confirmButtonText: "Publish Coupon",
        preConfirm: () => {
            const code = document.getElementById("swal-c-code").value.trim().toUpperCase();
            const val = document.getElementById("swal-c-val").value.trim();
            const min = document.getElementById("swal-c-min").value.trim();
            if (!code || !val) {
                Swal.showValidationMessage("Please provide Code and Discount Value.");
                return false;
            }
            return { code, val, min };
        }
    });

    if (couponData) {
        const tbody = document.getElementById("couponTableBody");
        if (tbody) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td><strong>${couponData.code}</strong></td>
                <td>${couponData.val} OFF</td>
                <td>₹${couponData.min || 0}</td>
                <td>Unlimited</td>
                <td>31 Dec 2026</td>
                <td><span class="status delivered">Active</span></td>
            `;
            tbody.prepend(newRow);
        }
        Swal.fire({
            icon: "success",
            title: "Coupon Active",
            text: `Code ${couponData.code} is now redeemable at checkout.`,
            confirmButtonColor: "#47663B"
        });
    }
}

// SETTINGS SAVE
function savePlatformSettings() {
    const commission = document.getElementById("settingCommission")?.value || "10";
    Swal.fire({
        icon: "success",
        title: "Configuration Saved",
        text: `Platform commission rate saved at ${commission}%.`,
        confirmButtonColor: "#47663B"
    });
}

function viewOrderDetails(id) {
    Swal.fire({
        title: `Order Summary: #${id}`,
        html: `
            <div style="text-align:left; font-size:13px; line-height:1.8;">
                <p><strong>Platform Status:</strong> Verified & Paid ✓</p>
                <p><strong>Courier:</strong> BlueDart Express Consignment</p>
                <p><strong>Eco Verification:</strong> Biodegradable Certified Pack</p>
            </div>
        `,
        icon: "info",
        confirmButtonColor: "#47663B"
    });
}

function exportFinancialLedger() {
    Swal.fire({
        icon: "success",
        title: "Export Initiated",
        text: "Financial ledger compiled into audit CSV report.",
        confirmButtonColor: "#47663B"
    });
}

function exportSellerReport() {
    Swal.fire({
        icon: "success",
        title: "Registry Exported",
        text: "Exported list of 356 registered artisan cooperatives.",
        confirmButtonColor: "#47663B"
    });
}

function triggerQualityAudit() {
    Swal.fire({
        icon: "success",
        title: "Eco Audit Passed",
        text: "99.4% of product listings comply with non-plastic packaging standards.",
        confirmButtonColor: "#47663B"
    });
}

function deleteReview(id) {
    Swal.fire({
        title: `Remove Review #${id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d35454",
        confirmButtonText: "Yes, Remove"
    }).then((res) => {
        if (res.isConfirmed) {
            Swal.fire({ icon: "success", title: "Review Removed", confirmButtonColor: "#47663B" });
        }
    });
}

// LOGOUT CONFIRMATION
document.getElementById("logoutBtn")?.addEventListener("click", function () {
    Swal.fire({
        title: "Exit Administrator Console?",
        text: "Your master administration session will be terminated.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#47663B",
        cancelButtonColor: "#d35454",
        confirmButtonText: "Yes, Logout",
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "../logout.php";
        }
    });
});

// TOPBAR HOOKS
document.getElementById("adminNotifBtn")?.addEventListener("click", () => {
    Swal.fire({
        title: "Platform Notifications",
        text: "You have 5 unread alerts (2 seller approvals pending, 3 disputes).",
        icon: "info",
        confirmButtonColor: "#47663B"
    });
});

document.getElementById("adminMsgBtn")?.addEventListener("click", () => navigateToPage("complaints"));
document.getElementById("adminProfileBtn")?.addEventListener("click", () => navigateToPage("settings"));

// LIVE IN-TABLE SEARCH
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        const query = this.value.toLowerCase().trim();
        const rows = document.querySelectorAll("tbody tr");

        rows.forEach(row => {
            const rowText = row.innerText.toLowerCase();
            row.style.display = (query === "" || rowText.includes(query)) ? "" : "none";
        });
    });
}

if (searchBtn) {
    searchBtn.addEventListener("click", () => searchInput.focus());
}

// INITIAL RENDER
loadDashboard();