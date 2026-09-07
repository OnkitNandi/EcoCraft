<?php
// Database configuration
$host    = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "ecocrafts_db";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli($host, $db_user, $db_pass, $db_name);

    $conn->set_charset("utf8mb4");

} catch (mysqli_sql_exception $e) {
    die("Database connection failed. Please try again later.");
}
?>