<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection details
$host = "localhost";
$username = "root";
$password = "erham2029";
$database = "portfolio";

// Create a connection to the database
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to sanitize and validate input data
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = sanitizeInput($_POST["name"]);
    $email = sanitizeInput($_POST["email"]);
    $subject = sanitizeInput($_POST["subject"]);
    // Escape single quotes in the message
    $message = mysqli_real_escape_string($conn, $_POST["message"]);

    // Example: Sending an email (uncomment this section and configure your email settings)
    $to = "recipient@example.com";
    $email_subject = "New Contact Form Submission";
    $headers = "From: $email";

    $message_body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message";

    // Uncomment the line below to send the email
    // mail($to, $email_subject, $message_body, $headers);

    // Example: Storing data in a MySQL database
    $sql = "INSERT INTO contact_form (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";

    if ($conn->query($sql) === TRUE) {
        // Send a success message to the client
        echo "OK";

        // Redirect to the home page (change the URL as needed)
        echo "<script>window.location.href='/portfolio/index.html';</script>";
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
} else {
    // If the form is not submitted, redirect to the home page or display an error message
    echo "<script>window.location.href='/portfolio/index.html';</script>";
    exit();
}
?>
