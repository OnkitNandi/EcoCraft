// ========================================
// SIDEBAR NAVIGATION
// ========================================

const menuItems = document.querySelectorAll(".menu-item");
const pages = document.querySelectorAll(".page");


function openPage(pageId) {

    // Hide all pages
    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });


    // Show selected page
    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }


    // Change active sidebar item
    menuItems.forEach(function(item) {

        item.classList.remove("active");

        if (item.dataset.page === pageId) {
            item.classList.add("active");
        }

    });


    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


menuItems.forEach(function(item) {

    item.addEventListener("click", function() {

        const pageId = item.dataset.page;

        openPage(pageId);

    });

});


// ========================================
// SEARCH
// ========================================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");


function searchProducts() {

    const searchValue = searchInput.value.toLowerCase().trim();

    const rows = document.querySelectorAll("#productTable tr");

    let found = false;


    rows.forEach(function(row) {

        const productText = row.textContent.toLowerCase();

        if (productText.includes(searchValue)) {

            row.style.display = "";

            found = true;

        } else {

            row.style.display = "none";

        }

    });


    if (searchValue === "") {

        rows.forEach(function(row) {
            row.style.display = "";
        });

    }

}


searchInput.addEventListener("input", searchProducts);

searchBtn.addEventListener("click", searchProducts);


// ========================================
// PERIOD SELECT
// ========================================

const periodSelect = document.getElementById("periodSelect");


periodSelect.addEventListener("change", function() {

    alert(
        "Dashboard period changed to: " +
        periodSelect.value
    );

});


// ========================================
// ADD PRODUCT
// ========================================

const productForm = document.getElementById("productForm");


productForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name = document.getElementById("productName").value;

    const price = document.getElementById("productPrice").value;

    const stock = document.getElementById("productStock").value;


    alert(
        "Product added successfully!\n\n" +
        "Product: " + name +
        "\nPrice: ₹" + price +
        "\nStock: " + stock
    );


    productForm.reset();


    openPage("products");

});


// ========================================
// LOGOUT
// ========================================

const logoutBtn = document.getElementById("logoutBtn");


logoutBtn.addEventListener("click", function() {

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );


    if (confirmLogout) {

        alert("You have been logged out.");

        openPage("dashboard");

    }

});


// ========================================
// PRODUCT ACTION BUTTONS
// ========================================

const actionButtons = document.querySelectorAll(".actions button");


actionButtons.forEach(function(button, index) {

    button.addEventListener("click", function() {

        if (index % 3 === 0) {

            alert("Opening product preview...");

        }

        else if (index % 3 === 1) {

            alert("Edit product feature opened.");

        }

        else {

            alert("More product options.");

        }

    });

});


// ========================================
// CART
// ========================================

const cart = document.querySelector(".cart");


if (cart) {

    cart.addEventListener("click", function() {

        alert("Your cart contains 3 items.");

    });

}


// ========================================
// WISHLIST
// ========================================

const wishlist = document.querySelector(".header-link");


if (wishlist) {

    wishlist.addEventListener("click", function() {

        alert("Opening Wishlist...");

    });

}


// ========================================
// NOTIFICATION
// ========================================

const notification = document.querySelector(".notification");


if (notification) {

    notification.addEventListener("click", function() {

        alert(
            "You have 2 new notifications."
        );

    });

}


// ========================================
// VIEW ALL BUTTONS
// ========================================

const viewAllButtons = document.querySelectorAll(".view-all");


viewAllButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        console.log("View All clicked");

    });

});


// ========================================
// SETTINGS SWITCH
// ========================================

const switches = document.querySelectorAll(
    ".switch input"
);


switches.forEach(function(toggle) {

    toggle.addEventListener("change", function() {

        if (toggle.checked) {

            console.log("Setting enabled");

        } else {

            console.log("Setting disabled");

        }

    });

});


// ========================================
// INITIAL PAGE
// ========================================

openPage("dashboard");