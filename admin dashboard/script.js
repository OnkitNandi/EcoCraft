// =====================================================
// ECOCRAFTS ADMIN PANEL
// =====================================================


// Get content area
const content = document.getElementById("content");


// Get all sidebar buttons
const menuItems = document.querySelectorAll(".menu-item");


// =====================================================
// PAGE INFORMATION
// =====================================================

const pages = {

    users: {
        title: "Users",
        description: "Manage all registered users on EcoCrafts.",
        icon: "fa-users"
    },

    sellers: {
        title: "Sellers",
        description: "Manage sellers and their shops.",
        icon: "fa-store"
    },

    products: {
        title: "Products",
        description: "Manage all products listed on EcoCrafts.",
        icon: "fa-bag-shopping"
    },

    orders: {
        title: "Orders",
        description: "View and manage customer orders.",
        icon: "fa-calendar-check"
    },

    transactions: {
        title: "Transactions",
        description: "View payment and transaction records.",
        icon: "fa-wallet"
    },

    reviews: {
        title: "Reviews",
        description: "Manage customer reviews and ratings.",
        icon: "fa-star"
    },

    complaints: {
        title: "Complaints",
        description: "Manage customer complaints.",
        icon: "fa-shield-halved"
    },

    reports: {
        title: "Reports",
        description: "Generate and view platform reports.",
        icon: "fa-chart-column"
    },

    analytics: {
        title: "Analytics",
        description: "View platform analytics and statistics.",
        icon: "fa-chart-line"
    },

    coupons: {
        title: "Coupons & Offers",
        description: "Create and manage discount coupons.",
        icon: "fa-tag"
    },

    settings: {
        title: "System Settings",
        description: "Manage EcoCrafts system settings.",
        icon: "fa-gear"
    },

    help: {
        title: "Help & Support",
        description: "Get help and contact EcoCrafts support.",
        icon: "fa-circle-question"
    }

};


// =====================================================
// DASHBOARD
// =====================================================

function loadDashboard() {

    content.innerHTML = `

        <!-- PAGE HEADER -->

        <div class="page-header">

            <div>

                <h1>Dashboard</h1>

                <p>
                    Welcome back! Here's what's happening
                    with your platform today.
                </p>

            </div>


            <button class="date-btn">

                <i class="fa-regular fa-calendar"></i>

                This Month

                <i class="fa-solid fa-chevron-down"></i>

            </button>

        </div>



        <!-- STAT CARDS -->

        <div class="stats">


            <!-- USERS -->

            <div class="stat-card">

                <div class="stat-top">

                    <div>

                        <div class="stat-title">
                            Total Users
                        </div>

                        <div class="stat-value">
                            2,584
                        </div>

                    </div>


                    <div class="stat-icon">

                        <i class="fa-solid fa-users"></i>

                    </div>

                </div>


                <div class="stat-change">
                    ↑ 12.5% from last month
                </div>

            </div>



            <!-- SELLERS -->

            <div class="stat-card">

                <div class="stat-top">

                    <div>

                        <div class="stat-title">
                            Total Sellers
                        </div>

                        <div class="stat-value">
                            356
                        </div>

                    </div>


                    <div class="stat-icon">

                        <i class="fa-solid fa-store"></i>

                    </div>

                </div>


                <div class="stat-change">
                    ↑ 15.8% from last month
                </div>

            </div>



            <!-- ORDERS -->

            <div class="stat-card">

                <div class="stat-top">

                    <div>

                        <div class="stat-title">
                            Total Orders
                        </div>

                        <div class="stat-value">
                            1,248
                        </div>

                    </div>


                    <div class="stat-icon">

                        <i class="fa-solid fa-bag-shopping"></i>

                    </div>

                </div>


                <div class="stat-change">
                    ↑ 18.2% from last month
                </div>

            </div>



            <!-- SALES -->

            <div class="stat-card">

                <div class="stat-top">

                    <div>

                        <div class="stat-title">
                            Total Sales
                        </div>

                        <div class="stat-value">
                            ₹12,45,680
                        </div>

                    </div>


                    <div class="stat-icon">

                        <i class="fa-solid fa-arrow-trend-up"></i>

                    </div>

                </div>


                <div class="stat-change">
                    ↑ 20.6% from last month
                </div>

            </div>



            <!-- COMPLAINTS -->

            <div class="stat-card">

                <div class="stat-top">

                    <div>

                        <div class="stat-title">
                            Pending Complaints
                        </div>

                        <div class="stat-value">
                            23
                        </div>

                    </div>


                    <div class="stat-icon">

                        <i class="fa-solid fa-shield-halved"></i>

                    </div>

                </div>


                <div class="stat-change"
                     style="color:#d35454;">

                    ↓ 8.3% from last month

                </div>

            </div>

        </div>



        <!-- DASHBOARD GRID -->

        <div class="dashboard-grid">


            <!-- SALES OVERVIEW -->

            <div class="card">

                <div class="card-header">

                    <h3>Sales Overview</h3>

                    <span class="view-all">
                        This Month
                    </span>

                </div>


                <div class="chart">

                    <svg viewBox="0 0 600 220">

                        <polyline
                            class="chart-line"
                            points="
                            20,180
                            70,145
                            120,142
                            170,140
                            220,105
                            270,125
                            320,85
                            370,92
                            420,100
                            470,55
                            520,42
                            560,43
                            590,18
                            "
                        />


                        <circle
                            class="chart-dot"
                            cx="20"
                            cy="180"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="70"
                            cy="145"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="120"
                            cy="142"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="170"
                            cy="140"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="220"
                            cy="105"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="270"
                            cy="125"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="320"
                            cy="85"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="370"
                            cy="92"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="420"
                            cy="100"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="470"
                            cy="55"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="520"
                            cy="42"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="560"
                            cy="43"
                            r="4"
                        />

                        <circle
                            class="chart-dot"
                            cx="590"
                            cy="18"
                            r="4"
                        />

                    </svg>

                </div>

            </div>



            <!-- ORDER OVERVIEW -->

            <div class="card">

                <div class="card-header">

                    <h3>Order Overview</h3>

                </div>


                <div class="donut-container">


                    <div class="donut">

                        <div class="donut-inner">

                            <strong>
                                1,248
                            </strong>

                            <span>
                                Total Orders
                            </span>

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



            <!-- RECENT ACTIVITY -->

            <div class="card">

                <div class="card-header">

                    <h3>Recent Activity</h3>

                </div>


                <div class="activity">


                    <div class="activity-row">

                        <div class="activity-icon">

                            <i class="fa-solid fa-user"></i>

                        </div>


                        <div class="activity-text">

                            <strong>
                                New seller registered
                            </strong>

                            <span>
                                John Deo
                            </span>

                        </div>


                        <span class="activity-time">
                            2 mins ago
                        </span>

                    </div>



                    <div class="activity-row">

                        <div class="activity-icon">

                            <i class="fa-solid fa-box"></i>

                        </div>


                        <div class="activity-text">

                            <strong>
                                New order received
                            </strong>

                            <span>
                                Order #ORD12456
                            </span>

                        </div>


                        <span class="activity-time">
                            10 mins ago
                        </span>

                    </div>



                    <div class="activity-row">

                        <div class="activity-icon">

                            <i class="fa-solid fa-shield"></i>

                        </div>


                        <div class="activity-text">

                            <strong>
                                Complaint received
                            </strong>

                            <span>
                                Bamboo Organizer
                            </span>

                        </div>


                        <span class="activity-time">
                            25 mins ago
                        </span>

                    </div>



                    <div class="activity-row">

                        <div class="activity-icon">

                            <i class="fa-solid fa-user"></i>

                        </div>


                        <div class="activity-text">

                            <strong>
                                New user registered
                            </strong>

                            <span>
                                Priya Sharma
                            </span>

                        </div>


                        <span class="activity-time">
                            35 mins ago
                        </span>

                    </div>

                </div>

            </div>

        </div>



        <!-- RECENT ORDERS -->

        <div class="table-card">

            <div class="card-header">

                <h3>Recent Orders</h3>

                <span class="view-all">
                    View All Orders
                </span>

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

                        <td>EcoCraft Creations</td>

                        <td>₹549</td>

                        <td>
                            <span class="status pending">
                                Pending
                            </span>
                        </td>

                        <td>25 May 2025</td>

                        <td>
                            <i class="fa-regular fa-eye"></i>
                        </td>

                    </tr>


                    <tr>

                        <td>#ORD12455</td>

                        <td>Amit Verma</td>

                        <td>HandiWorks</td>

                        <td>₹399</td>

                        <td>
                            <span class="status shipped">
                                Shipped
                            </span>
                        </td>

                        <td>24 May 2025</td>

                        <td>
                            <i class="fa-regular fa-eye"></i>
                        </td>

                    </tr>


                    <tr>

                        <td>#ORD12454</td>

                        <td>Neha Kumari</td>

                        <td>Bamboo House</td>

                        <td>₹699</td>

                        <td>
                            <span class="status delivered">
                                Delivered
                            </span>
                        </td>

                        <td>23 May 2025</td>

                        <td>
                            <i class="fa-regular fa-eye"></i>
                        </td>

                    </tr>


                    <tr>

                        <td>#ORD12453</td>

                        <td>Rahul Das</td>

                        <td>Jute Creations</td>

                        <td>₹299</td>

                        <td>
                            <span class="status processing">
                                Processing
                            </span>
                        </td>

                        <td>23 May 2025</td>

                        <td>
                            <i class="fa-regular fa-eye"></i>
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>



        <!-- TOP SELLING PRODUCTS -->

        <div class="table-card">

            <div class="card-header">

                <h3>Top Selling Products</h3>

                <span class="view-all">
                    View All Products
                </span>

            </div>


            <table>

                <thead>

                    <tr>

                        <th>PRODUCT</th>
                        <th>SOLD</th>
                        <th>REVENUE</th>

                    </tr>

                </thead>


                <tbody>

                    <tr>

                        <td>
                            🧺 Handwoven Basket
                        </td>

                        <td>
                            120
                        </td>

                        <td>
                            ₹65,880
                        </td>

                    </tr>


                    <tr>

                        <td>
                            👜 Jute Tote Bag
                        </td>

                        <td>
                            98
                        </td>

                        <td>
                            ₹39,102
                        </td>

                    </tr>


                    <tr>

                        <td>
                            🪴 Clay Planter
                        </td>

                        <td>
                            85
                        </td>

                        <td>
                            ₹42,415
                        </td>

                    </tr>


                    <tr>

                        <td>
                            🎋 Bamboo Organizer
                        </td>

                        <td>
                            76
                        </td>

                        <td>
                            ₹52,724
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    `;
}



// =====================================================
// OTHER PAGES
// =====================================================

function loadPage(page) {

    const data = pages[page];

    if (!data) {
        return;
    }


    content.innerHTML = `

        <div class="page-header">

            <div>

                <h1>

                    <i
                        class="fa-solid ${data.icon}"
                        style="color:#527b48;">
                    </i>

                    ${data.title}

                </h1>


                <p>
                    ${data.description}
                </p>

            </div>


            <button
                class="primary-btn"
                onclick="addItem('${page}')">

                <i class="fa-solid fa-plus"></i>

                Add New

            </button>

        </div>



        <div class="page-card">

            <h2>
                ${data.title} Management
            </h2>


            <p>
                Manage your ${data.title.toLowerCase()}
                from this section.
            </p>


            <br>


            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>NAME</th>

                        <th>STATUS</th>

                        <th>DATE</th>

                        <th>ACTION</th>

                    </tr>

                </thead>


                <tbody>


                    <tr>

                        <td>#001</td>

                        <td>EcoCraft Item</td>

                        <td>

                            <span class="status delivered">
                                Active
                            </span>

                        </td>

                        <td>
                            25 May 2025
                        </td>

                        <td>

                            <button
                                class="primary-btn"
                                onclick="editItem()">

                                Edit

                            </button>

                        </td>

                    </tr>


                    <tr>

                        <td>#002</td>

                        <td>Handmade Product</td>

                        <td>

                            <span class="status delivered">
                                Active
                            </span>

                        </td>

                        <td>
                            24 May 2025
                        </td>

                        <td>

                            <button
                                class="primary-btn"
                                onclick="editItem()">

                                Edit

                            </button>

                        </td>

                    </tr>


                    <tr>

                        <td>#003</td>

                        <td>Natural Product</td>

                        <td>

                            <span class="status pending">
                                Pending
                            </span>

                        </td>

                        <td>
                            23 May 2025
                        </td>

                        <td>

                            <button
                                class="primary-btn"
                                onclick="editItem()">

                                Edit

                            </button>

                        </td>

                    </tr>


                </tbody>

            </table>

        </div>

    `;
}



// =====================================================
// SIDEBAR CLICK
// =====================================================

menuItems.forEach(function(item) {

    item.addEventListener("click", function() {


        const page = this.dataset.page;


        // Remove active from all

        menuItems.forEach(function(menu) {

            menu.classList.remove("active");

        });


        // Add active to clicked item

        this.classList.add("active");


        // Load selected page

        if (page === "dashboard") {

            loadDashboard();

        } else {

            loadPage(page);

        }

    });

});



// =====================================================
// ADD ITEM
// =====================================================

function addItem(page) {

    const pageName =
        pages[page].title;

    alert(
        "Add New button clicked for " +
        pageName
    );

}



// =====================================================
// EDIT ITEM
// =====================================================

function editItem() {

    alert(
        "Edit button clicked!"
    );

}



// =====================================================
// LOGOUT
// =====================================================

document
    .getElementById("logoutBtn")
    .addEventListener("click", function() {


        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );


        if (confirmLogout) {

            alert(
                "Logged out successfully!"
            );

        }

    });



// =====================================================
// SEARCH
// =====================================================

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener(
    "keyup",
    function() {


        const searchValue =
            this.value.toLowerCase();


        const rows =
            document.querySelectorAll("tbody tr");


        rows.forEach(function(row) {


            const rowText =
                row.innerText.toLowerCase();


            if (
                rowText.includes(searchValue)
            ) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    }
);



// =====================================================
// SEARCH BUTTON
// =====================================================

document
    .getElementById("searchBtn")
    .addEventListener("click", function() {

        searchInput.focus();

    });



// =====================================================
// INITIAL PAGE
// =====================================================

loadDashboard();