<?php
session_start();
$alert_message = $_SESSION['alert'] ?? '';
unset($_SESSION['alert']);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EcoCrafts | Sign In & Register</title>

    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <style>
        :root {
            --primary: #47663B;
            --primary-dark: #37502e;
            --earth-sand: #f5f3ee;
            --text-dark: #242424;
            --text-muted: #6b7280;
            --border-color: #e5e4de;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: linear-gradient(135deg, #f7f9f6 0%, #ecefe6 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            color: var(--text-dark);
        }

        .container {
            background: #ffffff;
            border-radius: 28px;
            box-shadow: 0 20px 45px rgba(71, 102, 59, 0.08), 0 4px 15px rgba(0, 0, 0, 0.03);
            border: 1px solid var(--border-color);
            position: relative;
            overflow: hidden;
            width: 860px;
            max-width: 100%;
            min-height: 580px;
        }

        .form-container {
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .sign-in-container {
            left: 0;
            width: 50%;
            z-index: 2;
        }

        .sign-up-container {
            left: 0;
            width: 50%;
            opacity: 0;
            z-index: 1;
        }

        .container.right-panel-active .sign-up-container {
            transform: translateX(100%);
            opacity: 1;
            z-index: 5;
        }

        .container.right-panel-active .sign-in-container {
            transform: translateX(100%);
            opacity: 0;
            z-index: 1;
        }

        form {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            padding: 0 42px;
            height: 100%;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .brand-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
        }

        .brand-header svg {
            width: 28px;
            height: 28px;
            fill: var(--primary);
        }

        .brand-title {
            font-size: 22px;
            font-weight: 700;
            color: var(--text-dark);
            letter-spacing: -0.5px;
        }

        .brand-title span {
            color: var(--primary);
        }

        form h2 {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 6px;
        }

        .subtext {
            font-size: 13px;
            color: var(--text-muted);
            margin-bottom: 18px;
        }

        .input-group {
            position: relative;
            width: 100%;
            margin: 5px 0;
        }

        input,
        select {
            background: #fbfbf9;
            border: 1.5px solid var(--border-color);
            padding: 11px 14px;
            width: 100%;
            border-radius: 12px;
            font-size: 14px;
            font-family: inherit;
            color: var(--text-dark);
            outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        input:focus,
        select:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(71, 102, 59, 0.12);
            background: #ffffff;
        }

        .toggle-btn {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: var(--text-muted);
            font-size: 12px;
            font-weight: 600;
            user-select: none;
        }

        .toggle-btn:hover {
            color: var(--primary);
        }

        button.btn-primary {
            border-radius: 12px;
            border: none;
            background-color: var(--primary);
            color: #ffffff;
            font-size: 14px;
            font-weight: 600;
            padding: 12px 30px;
            margin-top: 14px;
            cursor: pointer;
            width: 100%;
            box-shadow: 0 6px 14px rgba(71, 102, 59, 0.2);
            transition: background 0.2s ease, transform 0.1s ease;
        }

        button.btn-primary:hover {
            background-color: var(--primary-dark);
        }

        button.btn-primary:active {
            transform: scale(0.98);
        }

        a.link-help {
            color: var(--text-muted);
            font-size: 13px;
            margin-top: 12px;
            text-decoration: none;
        }

        a.link-help:hover {
            color: var(--primary);
            text-decoration: underline;
        }

        .overlay-container {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
            z-index: 100;
        }

        .container.right-panel-active .overlay-container {
            transform: translateX(-100%);
        }

        .overlay {
            background: linear-gradient(145deg, #37502e, #47663B, #5a7b4b);
            color: #ffffff;
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .container.right-panel-active .overlay {
            transform: translateX(50%);
        }

        .overlay-panel {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            top: 0;
            height: 100%;
            width: 50%;
            padding: 0 35px;
            transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .overlay-panel h1 {
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .overlay-panel p {
            font-size: 14px;
            line-height: 1.5;
            color: #e5ece2;
            margin-bottom: 22px;
        }

        .overlay-left {
            transform: translateX(-20%);
            left: 0;
        }

        .overlay-right {
            right: 0;
            transform: translateX(0);
        }

        .container.right-panel-active .overlay-left {
            transform: translateX(0);
        }

        .container.right-panel-active .overlay-right {
            transform: translateX(20%);
        }

        button.ghost {
            background: transparent;
            border: 2px solid #ffffff;
            color: #ffffff;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            padding: 10px 30px;
            cursor: pointer;
        }

        button.ghost:hover {
            background: #ffffff;
            color: var(--primary-dark);
        }
    </style>
</head>

<body>
    <div class="container" id="container">

        <!-- SIGN UP FORM -->
        <div class="form-container sign-up-container">
            <form action="api/auth/login_process.php" method="POST" id="signupForm">
                <div class="brand-header">
                    <svg viewBox="0 0 24 24">
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                    </svg>
                    <div class="brand-title">Eco<span>Crafts</span></div>
                </div>
                <h2>Create Account</h2>
                <span class="subtext">Join the sustainable craft community</span>

                <div class="input-group">
                    <input type="text" name="fullname" placeholder="Full Name" required />
                </div>
                <div class="input-group">
                    <input type="email" name="email" placeholder="Email Address" required />
                </div>

                <div class="input-group">
                    <input type="password" name="password" id="signup_password" placeholder="Password" style="padding-right: 50px;" required />
                    <span class="toggle-btn" onclick="togglePassword('signup_password', this)">Show</span>
                </div>

                <div class="input-group">
                    <input type="password" name="confirm_password" id="signup_confirm_password" placeholder="Confirm Password" style="padding-right: 50px;" required />
                    <span class="toggle-btn" onclick="togglePassword('signup_confirm_password', this)">Show</span>
                </div>

                <div class="input-group">
                    <select name="role" id="role" onchange="handleRoleVerification()" required>
                        <option value="">Select Role</option>
                        <option value="user">User (Customer)</option>
                        <option value="seller">Seller (Artisan)</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <input type="hidden" name="role_passkey" id="role_passkey" />
                <button type="submit" name="signup_submit" class="btn-primary">Register Now</button>
            </form>
        </div>

        <!-- LOGIN FORM -->
        <div class="form-container sign-in-container">
            <form action="api/auth/login_process.php" method="POST" id="loginForm">
                <div class="brand-header">
                    <svg viewBox="0 0 24 24">
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                    </svg>
                    <div class="brand-title">Eco<span>Crafts</span></div>
                </div>
                <h2>Welcome Back</h2>
                <span class="subtext">Log into your EcoCrafts portal</span>

                <div class="input-group">
                    <input type="email" name="login_email" placeholder="Email Address" required />
                </div>

                <div class="input-group">
                    <input type="password" name="login_password" id="login_password" placeholder="Password" style="padding-right: 50px;" required />
                    <span class="toggle-btn" onclick="togglePassword('login_password', this)">Show</span>
                </div>

                <a href="#" class="link-help" id="needHelp">Need help with account?</a>
                <button type="submit" name="login_submit" class="btn-primary">Sign In</button>
            </form>
        </div>

        <!-- SLIDING OVERLAYS -->
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>Already an Artisan?</h1>
                    <p>Log in with your verified profile to track your handmade listings & sales.</p>
                    <button class="ghost" id="signIn">Login Here</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>Crafted by Nature</h1>
                    <p>Discover & sell eco-friendly pottery, jute, and bamboo collections today.</p>
                    <button class="ghost" id="signUp">Create Account</button>
                </div>
            </div>
        </div>

    </div>

    <script>
        const container = document.getElementById("container");
        document.getElementById("signUp").addEventListener("click", () => {
            container.classList.add("right-panel-active");
        });
        document.getElementById("signIn").addEventListener("click", () => {
            container.classList.remove("right-panel-active");
        });

        function handleRoleVerification() {
            const role = document.getElementById("role").value;
            const passkeyField = document.getElementById("role_passkey");

            if (role === 'admin' || role === 'seller') {
                Swal.fire({
                    title: `${role.toUpperCase()} Authorization`,
                    text: `Enter security passkey for ${role} registration:`,
                    input: 'password',
                    inputPlaceholder: 'Enter verification passkey',
                    showCancelButton: true,
                    confirmButtonColor: '#47663B',
                    cancelButtonColor: '#d33'
                }).then((result) => {
                    if (result.isConfirmed && result.value) {
                        passkeyField.value = result.value;
                    } else {
                        document.getElementById("role").value = "";
                        passkeyField.value = "";
                    }
                });
            } else {
                passkeyField.value = "";
            }
        }

        function togglePassword(fieldId, el) {
            const input = document.getElementById(fieldId);
            if (input.type === "password") {
                input.type = "text";
                el.innerText = "Hide";
            } else {
                input.type = "password";
                el.innerText = "Show";
            }
        }

        document.getElementById("needHelp").addEventListener("click", function(e) {
            e.preventDefault();
            Swal.fire({
                icon: "question",
                title: "EcoCrafts Support",
                text: "Forgotten your credentials? Contact your site administrator.",
                confirmButtonColor: "#47663B"
            });
        });

        <?php if (!empty($alert_message)) {
            echo $alert_message;
        } ?>
    </script>
</body>

</html>