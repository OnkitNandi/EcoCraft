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

        // Hide all sections & remove active class from sidebar
        sections.forEach(s => s.classList.add("hidden-section"));
        menuLinks.forEach(m => m.classList.remove("active"));

        // Show targeted section
        targetSection.classList.remove("hidden-section");

        // Highlight sidebar nav item
        const activeMenuItem = document.querySelector(`.menu-item[data-section="${targetId}"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add("active");
        }

        // Close sidebar in mobile view
        if (sidebar && sidebar.classList.contains("open")) {
            sidebar.classList.remove("open");
            if (sidebarOverlay) sidebarOverlay.classList.remove("open");
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Sidebar items click
    menuLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.id === "logoutBtn") return;
            e.preventDefault();
            const target = this.getAttribute("data-section");
            navigateTo(target);
        });
    });

    // Elements with data-section (buttons, cards, links)
    document.querySelectorAll("[data-section]").forEach(el => {
        el.addEventListener("click", function (e) {
            if (this.classList.contains("menu-item")) return;
            e.preventDefault();
            const target = this.getAttribute("data-section");
            navigateTo(target);
        });
    });

    // Mobile sidebar toggle
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
    // 2. SWEETALERT2 LOGOUT HANDLER (COMPACT SCALE)
    // ==========================================
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (typeof Swal !== "undefined") {
                Swal.fire({
                    title: "Ready to leave?",
                    text: "You will be signed out of your account.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#5a9c41",
                    cancelButtonColor: "#da4332",
                    confirmButtonText: "Yes, Logout",
                    cancelButtonText: "Cancel",
                    reverseButtons: true,
                    customClass: {
                        popup: 'swal-compact-popup'
                    }
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

        // Close when clicked outside
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
    // 4. CART SLIDE DRAWER
    // ==========================================
    const cartToggleBtn = document.getElementById("cartToggleBtn");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
    const cartCloseBtn = document.getElementById("cartCloseBtn");
    const checkoutBtn = document.getElementById("checkoutBtn");

    function openCart() {
        if (cartDrawer) cartDrawer.classList.add("open");
        if (cartDrawerOverlay) cartDrawerOverlay.classList.add("open");
    }

    function closeCart() {
        if (cartDrawer) cartDrawer.classList.remove("open");
        if (cartDrawerOverlay) cartDrawerOverlay.classList.remove("open");
    }

    if (cartToggleBtn) cartToggleBtn.addEventListener("click", openCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
    if (cartDrawerOverlay) cartDrawerOverlay.addEventListener("click", closeCart);

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    icon: 'info',
                    title: 'Cart is Empty',
                    text: 'Explore our catalog to add handcrafted items before checkout!',
                    confirmButtonColor: '#47663B'
                });
            } else {
                alert("Your cart is empty!");
            }
        });
    }

// ==========================================
// 1. PROFILE EDIT & SAVE WORKFLOW
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

            profileActionBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span id="profileBtnText">Save Changes</span>`;
        } else {
            const newName = nameInput.value.trim();
            const newEmail = emailInput.value.trim();
            const userId = userIdInput.value.trim();

            if (newName === "" || newEmail === "") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Incomplete Fields',
                    text: 'Full Name and Email Address cannot be blank.',
                    confirmButtonColor: '#47663B'
                });
                return;
            }

            const confirmResult = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you want to update your profile details?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#47663B',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!',
                cancelButtonText: 'Cancel'
            });

            if (!confirmResult.isConfirmed) return;

            try {
                const response = await fetch('../api/user/update_profile.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: userId, fullname: newName, email: newEmail })
                });

                const data = await response.json();

                if (data.status === 'error') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Update Failed',
                        text: data.message,
                        confirmButtonColor: '#47663B'
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

                profileActionBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> <span id="profileBtnText">Edit Profile</span>`;

                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated',
                    text: data.message,
                    confirmButtonColor: '#47663B',
                    timer: 2000,
                    showConfirmButton: false
                });

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Failed to connect to the server. Please try again.',
                    confirmButtonColor: '#47663B'
                });
            }
        }
    });
}

// ==========================================
// 2. INLINE CHANGE PASSWORD ACCORDION WORKFLOW
// ==========================================
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const passwordSection = document.getElementById("passwordSection");
const cancelPasswordBtn = document.getElementById("cancelPasswordBtn");
const changePasswordForm = document.getElementById("changePasswordForm");
const pwdBtnText = document.getElementById("pwdBtnText");

function togglePasswordCard() {
    if (passwordSection.style.display === "none" || passwordSection.style.display === "") {
        passwordSection.style.display = "block";
        pwdBtnText.innerText = "Close Password";
        document.getElementById("currentPassword").focus();
    } else {
        passwordSection.style.display = "none";
        pwdBtnText.innerText = "Change Password";
        changePasswordForm.reset();
    }
}

if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", togglePasswordCard);
}

if (cancelPasswordBtn) {
    cancelPasswordBtn.addEventListener("click", () => {
        passwordSection.style.display = "none";
        pwdBtnText.innerText = "Change Password";
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
                icon: 'warning',
                title: 'Weak Password',
                text: 'New password must be at least 6 characters long.',
                confirmButtonColor: '#47663B'
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Password Mismatch',
                text: 'New password and confirm password do not match.',
                confirmButtonColor: '#47663B'
            });
            return;
        }

        const confirmChange = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to update your password?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#47663B',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'Cancel'
        });

        if (!confirmChange.isConfirmed) return;

        try {
            const res = await fetch('../api/user/change_password.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: userId,
                    current_password: currentPassword,
                    new_password: newPassword
                })
            });

            const data = await res.json();

            if (data.status === 'success') {
    passwordSection.style.display = "none";
    pwdBtnText.innerText = "Change Password";
    changePasswordForm.reset();

    Swal.fire({
        icon: 'success',
        title: 'Password Changed',
        text: data.message,
        showConfirmButton: false,
        timer: 1800,
        // timerProgressBar: true
    });
} else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message,
                    confirmButtonColor: '#47663B'
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Failed to update password. Please try again later.',
                confirmButtonColor: '#47663B'
            });
        }
    });
}
    // ==========================================
    // 6. CHAT / MESSAGING REALTIME SIMULATION
    // ==========================================
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatMessageList = document.getElementById("chatMessageList");

    if (chatForm && chatInput && chatMessageList) {
        chatForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Create Outgoing message bubble
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

            // Auto-reply hook (Ready for WebSocket or AJAX fetch)
            setTimeout(() => {
                const replyDiv = document.createElement("div");
                replyDiv.className = "message incoming";
                replyDiv.innerHTML = `
                    <div class="message-bubble">
                        <p>Thank you for reaching out! A representative will connect with you shortly.</p>
                        <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                `;
                chatMessageList.appendChild(replyDiv);
                chatMessageList.scrollTop = chatMessageList.scrollHeight;
            }, 1000);
        });
    }

    // ==========================================
    // 7. HELP CENTER FAQ ACCORDION
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