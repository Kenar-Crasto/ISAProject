// Import necessary modules
const express = require("express");
const path = require("path");
const multer = require("multer"); // Middleware for handling multipart/form-data (file uploads)
const fs = require("fs");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Multer for handling file uploads
const upload = multer({ dest: "uploads/" }); // Destination directory for uploaded files

// Function to perform the Hugging Face API call
async function query(filename) {
  const data = fs.readFileSync(path.join(__dirname, "uploads", filename)); // Assuming the file is uploaded to 'uploads/' directory

  const response = await fetch(
    "https://api-inference.huggingface.co/models/timm/mobilenetv3_large_100.ra_in1k",
    {
      headers: { Authorization: "Bearer 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" }, // Replace with your API token
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();
  return result;
}

// Serve static files from the Client directory (where your HTML, CSS, and JS files reside)
app.use(express.static(path.join(__dirname, "../Client"))); // Adjust path to the Client folder

// Serve the index.html file for any other routes (like '/')
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client", "index.html")); // Adjust path to the Client folder
});

// Endpoint to handle the file upload and API call
app.post("/call-api", upload.single("file"), async (req, res) => {
  try {
    const file = req.file; // Uploaded file data
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    const result = await query(file.filename); // Call the query function here with the file name
    res.json(result);
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    res.status(500).json({ error: "Error calling Hugging Face API" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
