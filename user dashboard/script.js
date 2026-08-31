/* =========================================================
   ECOCRAFTS JAVASCRIPT
========================================================= */


/* =========================================================
   SECTION NAVIGATION
========================================================= */

const menuItems = document.querySelectorAll(".menu-item[data-section]");

const sections = document.querySelectorAll(".page-section");


function showSection(sectionId) {

    /* Hide every section */

    sections.forEach(function (section) {

        section.style.display = "none";

    });


    /* Show selected section */

    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {

        selectedSection.style.display = "block";

    }


    /* Update active menu */

    menuItems.forEach(function (item) {

        item.classList.remove("active");

    });


    const activeMenu = document.querySelector(
        `.menu-item[data-section="${sectionId}"]`
    );

    if (activeMenu) {

        activeMenu.classList.add("active");

    }


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SIDEBAR MENU CLICK
========================================================= */

menuItems.forEach(function (item) {

    item.addEventListener("click", function (event) {

        event.preventDefault();

        const section = item.getAttribute("data-section");

        showSection(section);

    });

});


/* =========================================================
   OTHER DATA-SECTION LINKS
========================================================= */

const sectionLinks = document.querySelectorAll(
    "[data-section]:not(.menu-item)"
);

sectionLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const section = link.getAttribute("data-section");

        showSection(section);

    });

});


/* =========================================================
   SHOP NOW BUTTON
========================================================= */

const shopNowButton = document.querySelector(".shop-now");

if (shopNowButton) {

    shopNowButton.addEventListener("click", function () {

        showSection("shop");

    });

}


/* =========================================================
   CART
========================================================= */

let cartCount = 2;

const cartCountElement = document.getElementById("cartCount");

const cartButton = document.getElementById("cartBtn");


function updateCartCount() {

    if (cartCountElement) {

        cartCountElement.textContent = cartCount;

    }

}


/* ADD TO CART BUTTONS */

const addCartButtons = document.querySelectorAll(
    ".add-cart, .add-shop-cart"
);

addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        cartCount++;

        updateCartCount();


        /* Button feedback */

        const oldText = button.innerHTML;

        button.innerHTML =
            '<i class="fa-solid fa-check"></i> Added';

        button.style.background = "#557b4b";
        button.style.color = "#ffffff";


        setTimeout(function () {

            button.innerHTML = oldText;

            button.style.background = "";
            button.style.color = "";

        }, 1200);

    });

});


/* CART BUTTON */

if (cartButton) {

    cartButton.addEventListener("click", function () {

        alert(
            "🛒 Your Cart\n\n" +
            "You currently have " +
            cartCount +
            " item(s) in your cart."
        );

    });

}


/* =========================================================
   WISHLIST
========================================================= */

const heartButtons = document.querySelectorAll(".heart");

heartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const icon = button.querySelector("i");

        button.classList.toggle("liked");


        if (button.classList.contains("liked")) {

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

        } else {

            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");

        }

    });

});


/* =========================================================
   REMOVE WISHLIST ITEM
========================================================= */

const removeWishlistButtons =
    document.querySelectorAll(".remove-wishlist");


removeWishlistButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const product = button.closest(".shop-product");

        if (product) {

            product.style.transform = "scale(0.9)";
            product.style.opacity = "0";


            setTimeout(function () {

                product.remove();

            }, 300);

        }

    });

});


/* =========================================================
   TOP WISHLIST BUTTON
========================================================= */

const wishlistTop =
    document.getElementById("wishlistTop");


if (wishlistTop) {

    wishlistTop.addEventListener("click", function () {

        showSection("wishlist");

    });

}


/* =========================================================
   PROFILE BUTTONS
========================================================= */

const profileButtons =
    document.querySelectorAll(".profile-btn");


profileButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        showSection("profile");

    });

});


/* =========================================================
   SEARCH
========================================================= */

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchBtn");


function performSearch() {

    const searchValue =
        searchInput.value.trim().toLowerCase();


    if (searchValue === "") {

        alert("Please enter a product name.");

        return;

    }


    showSection("shop");


    const products =
        document.querySelectorAll(".shop-product");


    let found = false;


    products.forEach(function (product) {

        const productName =
            product.querySelector("h3");


        if (!productName) return;


        const name =
            productName.textContent.toLowerCase();


        if (name.includes(searchValue)) {

            product.style.display = "block";

            product.style.outline =
                "2px solid #557b4b";

            found = true;

        } else {

            product.style.display = "none";

        }

    });


    if (!found) {

        alert(
            "No product found for: " +
            searchValue
        );


        products.forEach(function (product) {

            product.style.display = "block";

            product.style.outline = "none";

        });

    }

}


/* SEARCH BUTTON */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        performSearch
    );

}


/* ENTER KEY SEARCH */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                performSearch();

            }

        }
    );

}


/* =========================================================
   MESSAGE SYSTEM
========================================================= */

const messageInput =
    document.getElementById("messageInput");

const sendMessage =
    document.getElementById("sendMessage");

const chatBody =
    document.querySelector(".chat-body");


function sendNewMessage() {

    if (!messageInput || !chatBody) return;


    const messageText =
        messageInput.value.trim();


    if (messageText === "") {

        return;

    }


    /* Create message */

    const message =
        document.createElement("div");


    message.classList.add(
        "message",
        "sent"
    );


    message.textContent =
        messageText;


    chatBody.appendChild(message);


    /* Clear input */

    messageInput.value = "";


    /* Scroll chat */

    chatBody.scrollTop =
        chatBody.scrollHeight;


    /* Fake support reply */

    setTimeout(function () {

        const reply =
            document.createElement("div");


        reply.classList.add(
            "message",
            "received"
        );


        reply.textContent =
            "Thank you for your message! Our support team will help you shortly. 😊";


        chatBody.appendChild(reply);


        chatBody.scrollTop =
            chatBody.scrollHeight;

    }, 900);

}


/* SEND BUTTON */

if (sendMessage) {

    sendMessage.addEventListener(
        "click",
        sendNewMessage
    );

}


/* ENTER TO SEND */

if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                sendNewMessage();

            }

        }
    );

}


/* =========================================================
   CHAT LIST
========================================================= */

const chats =
    document.querySelectorAll(".chat");


chats.forEach(function (chat) {

    chat.addEventListener("click", function () {

        chats.forEach(function (item) {

            item.classList.remove(
                "active-chat"
            );

        });


        chat.classList.add(
            "active-chat"
        );

    });

});


/* =========================================================
   DARK MODE
========================================================= */

const darkMode =
    document.getElementById("darkMode");


if (darkMode) {

    darkMode.addEventListener(
        "change",
        function () {

            if (darkMode.checked) {

                document.body.classList.add(
                    "dark-mode"
                );

                localStorage.setItem(
                    "ecoCraftsDarkMode",
                    "true"
                );

            } else {

                document.body.classList.remove(
                    "dark-mode"
                );

                localStorage.setItem(
                    "ecoCraftsDarkMode",
                    "false"
                );

            }

        }
    );

}


/* LOAD DARK MODE */

const savedDarkMode =
    localStorage.getItem(
        "ecoCraftsDarkMode"
    );


if (savedDarkMode === "true") {

    document.body.classList.add(
        "dark-mode"
    );


    if (darkMode) {

        darkMode.checked = true;

    }

}


/* =========================================================
   LOGOUT
========================================================= */

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                alert(
                    "You have been logged out successfully! 👋"
                );

            }

        }
    );

}


/* =========================================================
   NOTIFICATION
========================================================= */

const notificationButton =
    document.querySelector(
        ".notification-btn"
    );


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        function () {

            alert(
                "🔔 Notifications\n\n" +
                "• Your order has been shipped.\n" +
                "• New eco-friendly products are available.\n" +
                "• Special discount available today!"
            );

        }
    );

}


/* =========================================================
   TRACK ALL ORDERS
========================================================= */

const trackOrders =
    document.querySelector(".track-orders");


if (trackOrders) {

    trackOrders.addEventListener(
        "click",
        function () {

            showSection("orders");

        }
    );

}


/* =========================================================
   ADDRESS BUTTONS
========================================================= */

const addressButtons =
    document.querySelectorAll(
        ".address-actions button"
    );


addressButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const action =
                button.textContent.trim();


            if (action === "Delete") {

                const card =
                    button.closest(
                        ".address-card"
                    );


                const confirmDelete =
                    confirm(
                        "Do you want to delete this address?"
                    );


                if (confirmDelete && card) {

                    card.remove();

                }

            } else {

                alert(
                    "Address editing option is ready for integration."
                );

            }

        }
    );

});


/* =========================================================
   HELP BUTTONS
========================================================= */

const helpButtons =
    document.querySelectorAll(
        ".help-card button"
    );


helpButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            alert(
                "Our support team is here to help you! 😊"
            );

        }
    );

});


/* =========================================================
   SLIDER
========================================================= */

const dots =
    document.querySelectorAll(".dot");


let currentSlide = 0;


const heroImages = [

    "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=1200",

    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200",

    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200",

    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=1200"

];


const heroImage =
    document.querySelector(
        ".hero-image img"
    );


function changeSlide(index) {

    currentSlide = index;


    if (heroImage) {

        heroImage.src =
            heroImages[index];

    }


    dots.forEach(function (dot, i) {

        dot.classList.toggle(
            "active",
            i === index
        );

    });

}


dots.forEach(function (dot, index) {

    dot.addEventListener(
        "click",
        function () {

            changeSlide(index);

        }
    );

});


/* AUTO SLIDER */

setInterval(function () {

    currentSlide++;

    if (currentSlide >= heroImages.length) {

        currentSlide = 0;

    }

    changeSlide(currentSlide);

}, 5000);


/* =========================================================
   VIEW ALL CATEGORY
========================================================= */

const viewAllCategory =
    document.querySelector(
        ".view-all-category"
    );


if (viewAllCategory) {

    viewAllCategory.addEventListener(
        "click",
        function () {

            showSection("categories");

        }
    );

}


/* =========================================================
   INITIAL PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        showSection("dashboard");

        updateCartCount();

    }
);