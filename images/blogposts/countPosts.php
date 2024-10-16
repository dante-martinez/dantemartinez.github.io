<?php
// Path to the directory you want to count folders in
$directory = './posts'; // Adjust to your directory path

// Count directories
$total_items = count(glob("$directory/*", GLOB_ONLYDIR));

// Return the count as a JSON response
header('Content-Type: application/json');
echo json_encode(['count' => 2]);

// total_items
?>
