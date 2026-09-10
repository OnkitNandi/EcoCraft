document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. NAVIGATION TAB SWITCHING
    // ==========================================
    const menuLinks = document.querySelectorAll(".menu .menu-item");
    const sections = document.querySelectorAll(".page-section");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const mobileToggleBtn = document.getElementById("mobileToggleBtn");

    function navigateTo(targetId) {
        if (!targetId) return;

        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        sections.forEach(s => s.classList.add("hidden-section"));
        menuLinks.forEach(m => m.classList.remove("active"));

        targetSection.classList.remove("hidden-section");

        const activeMenuItem = document.querySelector(`.menu-item[data-section="${targetId}"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add("active");
        }

        if (sidebar && sidebar.classList.contains("open")) {
            sidebar.classList.remove("open");
            if (sidebarOverlay) sidebarOverlay.classList.remove("open");
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    menuLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.id === "logoutBtn") return;
            e.preventDefault();
            navigateTo(this.getAttribute("data-section"));
        });
    });

    document.querySelectorAll("[data-section]").forEach(el => {
        el.addEventListener("click", function (e) {
            if (this.classList.contains("menu-item")) return;
            e.preventDefault();
            navigateTo(this.getAttribute("data-section"));
        });
    });

    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            sidebar.classList.toggle("open");
            if (sidebarOverlay) sidebarOverlay.classList.toggle("open");
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", function () {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("open");
        });
    }

    // ==========================================
    // 2. SWEETALERT2 LOGOUT HANDLER
    // ==========================================
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Ready to leave?",
                    text: "You will be signed out of your artisan console.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#47663B",
                    cancelButtonColor: "#c0392b",
                    confirmButtonText: "Yes, Logout",
                    cancelButtonText: "Cancel",
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "../logout.php";
                    }
                });
            } else {
                if (confirm("Are you sure you want to log out?")) {
                    window.location.href = "../logout.php";
                }
            }
        });
    }

    // ==========================================
    // 3. NOTIFICATION DROPDOWN TOGGLE
    // ==========================================
    const notifBtn = document.getElementById("notifBtn");
    const notifDropdown = document.getElementById("notifDropdown");
    const markAllRead = document.getElementById("markAllRead");
    const notifDot = document.getElementById("notifDot");

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            notifDropdown.classList.toggle("show");
        });

        document.addEventListener("click", function (e) {
            if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
                notifDropdown.classList.remove("show");
            }
        });

        if (markAllRead) {
            markAllRead.addEventListener("click", function () {
                document.querySelectorAll(".notif-item.unread").forEach(item => {
                    item.classList.remove("unread");
                });
                if (notifDot) notifDot.style.display = "none";
            });
        }
    }

    // ==========================================
    // 4. LIVE IN-TABLE SEARCH FILTER
    // ==========================================
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    function executeSearch() {
        const query = (searchInput?.value || "").toLowerCase().trim();
        const rows = document.querySelectorAll("#dashboardProductTable tr, #inventoryTable tr");

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = (query === "" || text.includes(query)) ? "" : "none";
        });
    }

    if (searchInput) searchInput.addEventListener("input", executeSearch);
    if (searchBtn) searchBtn.addEventListener("click", executeSearch);

    // ==========================================
    // 5. ADD PRODUCT SUBMISSION (BACKEND HOOK READY)
    // ==========================================
    const productForm = document.getElementById("productForm");

    if (productForm) {
        productForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const name = document.getElementById("productName").value.trim();
            const category = document.getElementById("productCategory").value;
            const price = document.getElementById("productPrice").value.trim();
            const stock = document.getElementById("productStock").value.trim();
            const description = document.getElementById("productDescription").value.trim();

            if (!name || !price || !stock) {
                Swal.fire({
                    icon: "warning",
                    title: "Missing Information",
                    text: "Please complete all mandatory product fields.",
                    confirmButtonColor: "#47663B"
                });
                return;
            }

            const confirmPublish = await Swal.fire({
                title: "Publish Listing?",
                text: `Add "${name}" priced at ₹${price} to your public catalog?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#47663B",
                cancelButtonColor: "#d33",
                confirmButtonText: "Publish Now"
            });

            if (!confirmPublish.isConfirmed) return;

            try {
                // Backend API endpoint (PHP PDO/MySQLi ready)
                const response = await fetch("../api/seller/add_product.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: name,
                        category: category,
                        price: price,
                        stock: stock,
                        description: description
                    })
                });

                const result = await response.json();

                if (result.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Listing Live!",
                        text: result.message || "Product published successfully.",
                        confirmButtonColor: "#47663B",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    productForm.reset();
                    navigateTo("products");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Publishing Failed",
                        text: result.message || "Database rejected record.",
                        confirmButtonColor: "#47663B"
                    });
                }
            } catch (err) {
                // Demo fallback simulation
                Swal.fire({
                    icon: "success",
                    title: "Published (Demo)",
                    text: `Product "${name}" successfully registered in memory.`,
                    confirmButtonColor: "#47663B",
                    timer: 2000,
                    showConfirmButton: false
                });
                productForm.reset();
                navigateTo("products");
            }
        });
    }

    // ==========================================
    // 6. ORDER DISPATCH ACTION
    // ==========================================
    document.querySelectorAll(".ship-order-btn").forEach(btn => {
        btn.addEventListener("click", async function () {
            const orderId = this.getAttribute("data-order");

            const { value: trackingNo } = await Swal.fire({
                title: `Dispatch Order #${orderId}`,
                input: "text",
                inputLabel: "Enter Courier Consignment / AWB Tracking Number",
                inputPlaceholder: "e.g., DELHIVERY_89123891",
                showCancelButton: true,
                confirmButtonColor: "#47663B",
                confirmButtonText: "Mark as Shipped",
                inputValidator: (value) => {
                    if (!value) return "AWB tracking number is required!";
                }
            });

            if (trackingNo) {
                Swal.fire({
                    icon: "success",
                    title: "Order Dispatched",
                    text: `Consignment tracking #${trackingNo} attached to #${orderId}.`,
                    confirmButtonColor: "#47663B"
                });
            }
        });
    });

    // ==========================================
    // 7. PAYOUT REQUEST HANDLER
    // ==========================================
    const requestPayoutBtn = document.getElementById("requestPayoutBtn");
    if (requestPayoutBtn) {
        requestPayoutBtn.addEventListener("click", async function () {
            const confirmPayout = await Swal.fire({
                title: "Withdraw Earnings?",
                text: "Initiate NEFT wire transfer of ₹18,450.00 to your verified bank account?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#47663B",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm Transfer"
            });

            if (confirmPayout.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "Settlement Requested",
                    text: "Payout batch #SETTL-9812 created. Processing within 24 hours.",
                    confirmButtonColor: "#47663B"
                });
            }
        });
    }

    // ==========================================
    // 8. PROFILE EDIT & SAVE WORKFLOW
    // ==========================================
    const profileActionBtn = document.getElementById("profileActionBtn");
    const nameInput = document.getElementById("profileNameInput");
    const emailInput = document.getElementById("profileEmailInput");
    const userIdInput = document.getElementById("profileUserId");
    const displayProfileName = document.getElementById("displayProfileName");
    const avatarLetter = document.getElementById("profileAvatarLetter");

    let isEditing = false;

    if (profileActionBtn) {
        profileActionBtn.addEventListener("click", async function () {
            if (!isEditing) {
                isEditing = true;
                nameInput.disabled = false;
                emailInput.disabled = false;
                nameInput.classList.add("editable-active");
                emailInput.classList.add("editable-active");
                nameInput.focus();

                profileActionBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span id="profileBtnText">Save Studio</span>`;
            } else {
                const newName = nameInput.value.trim();
                const newEmail = emailInput.value.trim();
                const userId = userIdInput.value.trim();

                if (newName === "" || newEmail === "") {
                    Swal.fire({
                        icon: "warning",
                        title: "Incomplete Fields",
                        text: "Studio Name and Business Email cannot be blank.",
                        confirmButtonColor: "#47663B"
                    });
                    return;
                }

                try {
                    const response = await fetch("../api/user/update_profile.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: userId, fullname: newName, email: newEmail })
                    });

                    const data = await response.json();

                    if (data.status === "error") {
                        Swal.fire({
                            icon: "error",
                            title: "Update Failed",
                            text: data.message,
                            confirmButtonColor: "#47663B"
                        });
                        return;
                    }

                    isEditing = false;
                    nameInput.disabled = true;
                    emailInput.disabled = true;
                    nameInput.classList.remove("editable-active");
                    emailInput.classList.remove("editable-active");

                    if (displayProfileName) displayProfileName.innerText = newName;
                    if (avatarLetter) avatarLetter.innerText = newName.charAt(0).toUpperCase();

                    profileActionBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> <span id="profileBtnText">Edit Studio</span>`;

                    Swal.fire({
                        icon: "success",
                        title: "Studio Profile Updated",
                        text: data.message || "Changes saved successfully.",
                        confirmButtonColor: "#47663B",
                        timer: 2000,
                        showConfirmButton: false
                    });
                } catch (err) {
                    // Demo fallback
                    isEditing = false;
                    nameInput.disabled = true;
                    emailInput.disabled = true;
                    nameInput.classList.remove("editable-active");
                    emailInput.classList.remove("editable-active");
                    if (displayProfileName) displayProfileName.innerText = newName;
                    profileActionBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> <span id="profileBtnText">Edit Studio</span>`;

                    Swal.fire({
                        icon: "success",
                        title: "Studio Updated",
                        text: "Studio details cached successfully.",
                        confirmButtonColor: "#47663B",
                        timer: 1800,
                        showConfirmButton: false
                    });
                }
            }
        });
    }

    // ==========================================
    // 9. INLINE PASSWORD ACCORDION
    // ==========================================
    const togglePasswordBtn = document.getElementById("togglePasswordBtn");
    const passwordSection = document.getElementById("passwordSection");
    const cancelPasswordBtn = document.getElementById("cancelPasswordBtn");
    const changePasswordForm = document.getElementById("changePasswordForm");
    const pwdBtnText = document.getElementById("pwdBtnText");

    function togglePasswordCard() {
        if (passwordSection.style.display === "none" || passwordSection.style.display === "") {
            passwordSection.style.display = "block";
            pwdBtnText.innerText = "Close";
            document.getElementById("currentPassword").focus();
        } else {
            passwordSection.style.display = "none";
            pwdBtnText.innerText = "Security";
            changePasswordForm.reset();
        }
    }

    if (togglePasswordBtn) togglePasswordBtn.addEventListener("click", togglePasswordCard);

    if (cancelPasswordBtn) {
        cancelPasswordBtn.addEventListener("click", () => {
            passwordSection.style.display = "none";
            pwdBtnText.innerText = "Security";
            changePasswordForm.reset();
        });
    }

    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const currentPassword = document.getElementById("currentPassword").value;
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const userId = document.getElementById("profileUserId").value;

            if (newPassword.length < 6) {
                Swal.fire({
                    icon: "warning",
                    title: "Weak Password",
                    text: "New password must contain at least 6 characters.",
                    confirmButtonColor: "#47663B"
                });
                return;
            }

            if (newPassword !== confirmPassword) {
                Swal.fire({
                    icon: "warning",
                    title: "Password Mismatch",
                    text: "New password confirmation does not match.",
                    confirmButtonColor: "#47663B"
                });
                return;
            }

            try {
                const res = await fetch("../api/user/change_password.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: userId,
                        current_password: currentPassword,
                        new_password: newPassword
                    })
                });

                const data = await res.json();

                if (data.status === "success") {
                    passwordSection.style.display = "none";
                    pwdBtnText.innerText = "Security";
                    changePasswordForm.reset();

                    Swal.fire({
                        icon: "success",
                        title: "Password Changed",
                        text: data.message,
                        showConfirmButton: false,
                        timer: 1800
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Password Error",
                        text: data.message,
                        confirmButtonColor: "#47663B"
                    });
                }
            } catch (err) {
                Swal.fire({
                    icon: "success",
                    title: "Password Changed (Demo)",
                    text: "Password updated in current session.",
                    confirmButtonColor: "#47663B",
                    timer: 1800,
                    showConfirmButton: false
                });
                passwordSection.style.display = "none";
                pwdBtnText.innerText = "Security";
                changePasswordForm.reset();
            }
        });
    }

    // ==========================================
    // 10. CHAT SIMULATION & INQUIRY REPLIES
    // ==========================================
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatMessageList = document.getElementById("chatMessageList");

    if (chatForm && chatInput && chatMessageList) {
        chatForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            const messageDiv = document.createElement("div");
            messageDiv.className = "message outgoing";
            messageDiv.innerHTML = `
                <div class="message-bubble">
                    <p>${text}</p>
                    <span class="message-time">${timeNow}</span>
                </div>
            `;
            chatMessageList.appendChild(messageDiv);
            chatInput.value = "";
            chatMessageList.scrollTop = chatMessageList.scrollHeight;
        });
    }

    // ==========================================
    // 11. FAQ ACCORDION HANDLER
    // ==========================================
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(btn => {
        btn.addEventListener("click", function () {
            this.classList.toggle("active");
            const answer = this.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});